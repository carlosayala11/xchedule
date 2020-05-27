from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from handler.userHandler import userHandler
from handler.businessHandler import BusinessHandler
from handler.appointmentHandler import AppointmentsHandler
from handler.servicesHandler import servicesHandler
from handler.messagesHandler import MessagesHandler
from googlemaps import Client as GoogleMaps
from flask_cors import CORS, cross_origin
import psycopg2
import os

app = Flask(__name__)
CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/df6hbif2dks1kv'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

@app.route('/')
def hello_world():
    return 'Welcome to XChedule!'

#-----Services-----

@app.route('/business/services/all')
def getServicesByBusinessId():
    return servicesHandler().getServicesByBusinessId(request.args.get('id'))


@app.route('/services/hours')
def getHours():
    return servicesHandler().getHours(request.args.get('id'))


@app.route('/services', methods=['GET', 'POST', 'PUT'])
def getAllServices():
    if not request.args:
        return  servicesHandler().getAllServices()
    elif request.method == 'GET':
        return servicesHandler().getServiceById(request.args.get('id'))
    else:
        return jsonify(Error="Method not allowed."), 405


@app.route('/services/insert', methods=['POST'])
def insertService():
    return servicesHandler().insertService(request.json)


@app.route('/services/update', methods=['PUT'])
def updateService():
    return servicesHandler().updateService(request.json)


@app.route('/services/delete', methods=['DELETE'])
def deleteService():
    return servicesHandler().deleteService(request.args.get('id'))


#-----Users-----
@app.route('/users', methods=['GET', 'POST', 'PUT'])
def getAllUsers():
    if not request.args:
        return userHandler().getAllUsers()
    elif request.method == 'POST':
        return userHandler().insertUser(request.json)
    # return userHandler().searchUsers(request.args)
    elif request.method == 'GET':
        return userHandler().getUserById(request.args.get('id'))
    else:
        return jsonify(Error = "Method not allowed."), 405

@app.route('/users/insert', methods=['POST'])
def insertUser():
    return userHandler().insertUser(request.json)
    
@app.route('/users/update', methods=['PUT'])
def updateUser():
    return userHandler().updateUser(request.json)

@app.route('/users/<string:uid>',
           methods=['DELETE'])
def getUserById(uid):
    return userHandler().deleteUser(uid)

#-----CreateBusiness-----
@app.route('/business', methods=['GET'])
def getAllBusiness():
    if request.method == 'GET':
        if not request.args:
            return BusinessHandler().getAllBusiness()
        return BusinessHandler().getBusinessByUserId(request.args.get('id'))
    else:
        return BusinessHandler().searchBusiness(request.args)

@app.route('/business/update', methods=['PUT'])
def updateBusiness():
    return BusinessHandler().updateBusiness(request.json)

@app.route('/business/insert', methods=['POST'])
def insertBusiness():
    return BusinessHandler().insertBusiness(request.json)

@app.route('/business/delete', methods=['DELETE'])
def deleteBusiness():
    return BusinessHandler().deleteBusiness(request.args.get('id'))

@app.route('/business/<int:bid>',methods=['GET'])
def getBusinessById(bid):
    if request.method == 'GET':
        return BusinessHandler().getBusinessById(bid)
    else:
        return jsonify(Error = "Method not allowed"), 405

@app.route('/business/user/<uid>',methods=['GET'])
def getBusinessByUserId(uid):
    if request.method == 'GET':
        return BusinessHandler().getBusinessByUserId(uid)
    else:
        return jsonify(Error = "Method not allowed"), 405

# @app.route('/business/<int:bid>/services')
# def getServicesByBusinessId(bid):
#     return BusinessHandler().getServicesByBusinessId(bid)


@app.route('/business/appointments')
def getAppointmentsByBusinessId():
    return BusinessHandler().getAppointmentsByBusinessId(request.args.get('id'))

@app.route('/business/top')
def getTopBusiness():
    return BusinessHandler().getTopBusiness()

@app.route('/approve')
def approveAppointment():
    return BusinessHandler().approveAppointment(request.args.get('id'))

@app.route('/complete')
def completeAppointment():
    return BusinessHandler().completeAppointment(request.args.get('id'))

@app.route('/cancel')
def cancelAppointment():
    return BusinessHandler().cancelAppointment(request.args.get('id'))

@app.route('/business/<string:param>')
def searchBusinessByPrefix(param):
    return BusinessHandler().searchBusinessByPrefix(param)

#-----Appointments-----
@app.route('/appointments', methods=['GET','DELETE'])
def getAllAppointments():
    if request.method == 'GET' and not request.args:
        return AppointmentsHandler().getAllAppointments()
    elif request.method == 'DELETE':
        return AppointmentsHandler().deleteAppointment()

    return jsonify(Error = "Method not allowed"), 405

@app.route('/appointment/insert', methods=['POST'])
def insertAppointment():
    return AppointmentsHandler().insertAppointmentJson(request.json)

@app.route('/appointment/update', methods=['PUT'])
def updateAppointment():
    return AppointmentsHandler().updateAppointmentJson(request.json)

@app.route('/appointments/user', methods=['GET'])
def getAppointmentsByUserId():
    return AppointmentsHandler().getAppointmentsByUserId(request.args.get('id'))

@app.route('/appointments/canceled', methods=['GET'])
def getCanceledAppointmentsByUserId():
    return AppointmentsHandler().getCanceledAppointmentsByUserId(request.args.get('id'))

@app.route('/validate', methods=['GET'])
def validateHours():
    return AppointmentsHandler().validateHours(request.args.get('sdate'),request.args.get('edate'),request.args.get('sid'),request.args.get('uid'))


@app.route('/appointments/<int:aid>', methods=['GET', 'DELETE'])
def getAppointmentById(aid):
    if request.method == 'GET':
        return AppointmentsHandler().getAppointmentById(aid)
    elif request.method == 'DELETE':
        return AppointmentsHandler().deleteAppointment(aid)
    
    return jsonify(Error = "Method not allowed"), 405

@app.route('/service/<int:sid>/appointments')
def getAppointmentsByServiceId(sid):
    return AppointmentsHandler().getAppointmentsByServiceId(sid)


@app.route('/route/<int:bid>/<string:uid>')
def getRoute(bid,uid):
    api_key = "AIzaSyCeHf-jcEx21QPuV7BZOUOukikZ-bQYxDA"
    google = GoogleMaps(api_key)
    route = AppointmentsHandler().getRoute(bid, uid)
    originaddress = route[0] + ', ' + route[1]
    destaddress = route[2] + ', ' + route[3]
    geocode_origin_result = google.geocode(originaddress)
    geocode_dest_result = google.geocode(destaddress)
    originlatitude = geocode_origin_result[0]['geometry']['location']['lat']
    originlongitude = geocode_origin_result[0]['geometry']['location']['lng']
    destlatitude = geocode_dest_result[0]['geometry']['location']['lat']
    destlongitude = geocode_dest_result[0]['geometry']['location']['lng']
    return render_template('route.html',originlongitude=originlongitude,originlatitude=originlatitude,destlongitude=destlongitude,destlatitude=destlatitude)

# ---------- Messages -----------
@app.route('/messages', methods=['GET', 'POST'])
def getAllMessages():
    if not request.args:
        return MessagesHandler().getAllMessages()

    elif len(request.args) == 3 and request.method == 'GET':
        print(len(request.args))
        return MessagesHandler().getMessagesByUserIdAndBusinessId(request.args.get('uid'), request.args.get('bid'), request.args.get('owner'))
    
    elif len(request.args) == 1 and request.method == 'GET':        
        return MessagesHandler().getMessagesByUserId(request.args.get('uid'))

@app.route('/messages/add', methods=['POST'])
def addMessage():
    return MessagesHandler().insert(request.json)

@app.route('/chats', methods=['GET'])
def getChatsByUserId():
    return MessagesHandler().getChatsByUserId(request.args.get('uid'))

# @app.route('/messages/mybusiness', methods=['GET'])
# def getMessagesByBusinessId():
#     return MessagesHandler().getMessagesByBusinessId(request.args.get('bid'))

@app.route('/chats/business', methods=['GET'])
def getChatsByBusinessId():
    print('chat')
    return MessagesHandler().getChatsByBusinessId(request.args.get('bid'))


if __name__ == '__main__':
    app.debug = True
    app.run()
