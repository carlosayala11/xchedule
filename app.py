from flask import Flask, render_template, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
from handler.userHandler import userHandler
from handler.businessHandler import BusinessHandler
from handler.appointmentHandler import AppointmentsHandler
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

#-----Business-----
@app.route('/business', methods=['GET', 'POST'])
def getAllBusiness():
    if request.method == 'POST':
        return BusinessHandler().insertBusiness(request.form)
    else:
        if not request.args:
            return BusinessHandler().getAllBusiness()
        else:
            return BusinessHandler().searchBusiness(request.args)

@app.route('/business/<int:bid>',
           methods=['GET', 'PUT', 'DELETE'])
def getBusinessById(bid):
    if request.method == 'GET':
        return BusinessHandler().getBusinessById(bid)
    elif request.method == 'PUT':
        return BusinessHandler().updateBusiness(bid, request.form)
    elif request.method == 'DELETE':
        return BusinessHandler().deleteBusiness(bid)
    else:
        return jsonify(Error = "Method not allowed"), 405

@app.route('/business/<int:bid>/services')
def getServicesByBusinessId(bid):
    return BusinessHandler().getServicesByBusinessId(bid)

@app.route('/business/<int:bid>/location')
def showLocationByBusinessId(bid):
    class Map:
        def __init__(self, name, lat, lng):
            self.name = name
            self.lat = lat
            self.lng = lng

    api_key = "AIzaSyCeHf-jcEx21QPuV7BZOUOukikZ-bQYxDA"
    google = GoogleMaps(api_key)
    location = BusinessHandler().showLocationByBusinessId(bid)
    address = location[0] + ',' + location[1]
    geocode_result = google.geocode(address)
    latitude = geocode_result[0]['geometry']['location']['lat']
    longitude = geocode_result[0]['geometry']['location']['lng']
    Map = Map(address, latitude, longitude)
    return render_template('map.html', map=Map)

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

if __name__ == '__main__':
    app.debug = True
    app.run()
