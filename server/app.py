from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from handler.userHandler import userHandler
from handler.businessHandler import BusinessHandler
from handler.appointmentHandler import AppointmentsHandler
from handler.servicesHandler import servicesHandler
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


@app.route('/services/<int:sid>',
           methods=['GET', 'PUT', 'DELETE'])
def deleteService(sid):
    return servicesHandler().deleteService(sid)

@app.route('/services/business/<int:sid>')
def getBusinessByServiceId(sid):
    return servicesHandler().getBusinessByServiceId(sid)

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
           methods=['GET', 'PUT', 'DELETE'])
def getUserById(uid):
    if request.method == 'GET':
        return userHandler().getUserById(uid)
    elif request.method == 'PUT':
        return userHandler().updateUser(uid, request.json)
    elif request.method == 'DELETE':
        return userHandler().deleteUser(uid)
    else:
        return jsonify(Error = "Method not allowed."), 405

@app.route('/users/<int:uid>/appointments')
def getAppointmentsByUserId(uid):
    return userHandler().getAppointmentsByUserId(uid)

#-----CreateBusiness-----
@app.route('/business', methods=['GET', 'POST'])
def getAllBusiness():
    if request.method == 'POST':
        return BusinessHandler().insertBusiness(request.json)
    elif request.method == 'GET':
        if not request.args:
            return BusinessHandler().getAllBusiness()
        return BusinessHandler().getBusinessByUserId(request.args.get('id'))
    else:
        return BusinessHandler().searchBusiness(request.args)

@app.route('/business/update', methods=['PUT'])
def updateBusiness():
    return BusinessHandler().updateBusiness(request.json)

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

@app.route('/business/<int:bid>/services')
def getServicesByBusinessId(bid):
    return BusinessHandler().getServicesByBusinessId(bid)

@app.route('/business/<int:bid>/appointments')
def getAppointmentsByBusinessId(bid):
    return BusinessHandler().getAppointmentsByBusinessId(bid)

@app.route('/business/top')
def getTopBusiness():
    return BusinessHandler().getTopBusiness()

@app.route('/business/<int:bid>/approve/<int:aid>')
def approveAppointment(bid, aid):
    return BusinessHandler().approveAppointment(bid,aid)

@app.route('/business/<string:param>')
def searchBusinessByPrefix(param):
    return BusinessHandler().searchBusinessByPrefix(param)

#-----Appointments-----
@app.route('/appointments', methods=['GET', 'POST', 'DELETE'])
def getAllAppointments():
    if request.method == 'GET' and not request.args:
        return AppointmentsHandler().getAllAppointments()
    elif request.method == 'GET' and request.args:
        return AppointmentsHandler().getAppointmentsByUserId(request.args.get('id'))
    elif request.method == 'POST':
        return AppointmentsHandler().insertAppointmentJson(request.json)
    elif request.method == 'DELETE':
        return AppointmentsHandler().deleteAppointment()

    return jsonify(Error = "Method not allowed"), 405

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


@app.route('/appointments/<int:aid>/route')
def getRouteFromUserToBusinessByAppointmentId(aid):
    api_key = "AIzaSyCeHf-jcEx21QPuV7BZOUOukikZ-bQYxDA"
    google = GoogleMaps(api_key)
    route = AppointmentsHandler().getRouteFromUserToBusinessByAppointmentId(aid)
    originaddress = route[0] + ', ' + route[1]
    destaddress = route[2] + ', ' + route[3]
    geocode_origin_result = google.geocode(originaddress)
    geocode_dest_result = google.geocode(destaddress)
    originlatitude = geocode_origin_result[0]['geometry']['location']['lat']
    originlongitude = geocode_origin_result[0]['geometry']['location']['lng']
    destlatitude = geocode_dest_result[0]['geometry']['location']['lat']
    destlongitude = geocode_dest_result[0]['geometry']['location']['lng']
    return render_template('route.html',originlongitude=originlongitude,originlatitude=originlatitude,destlongitude=destlongitude,destlatitude=destlatitude)

if __name__ == '__main__':
    app.debug = True
    app.run()
