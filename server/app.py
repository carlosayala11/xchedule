from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from handler.userHandler import userHandler
from handler.businessHandler import BusinessHandler
from handler.appointmentHandler import AppointmentsHandler
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
@app.route('/users', methods=['GET', 'POST'])
def getAllUsers():
    if request.method == 'POST':
        return userHandler().insertUser(request.form)
    else:
        if not request.args:
            return userHandler().getAllUsers()
        else:
            return userHandler().searchUsers(request.args)

@app.route('/users/<int:uid>',
           methods=['GET', 'PUT', 'DELETE'])
def getUserById(uid):
    if request.method == 'GET':
        return userHandler().getUserById(uid)
    elif request.method == 'PUT':
        return userHandler().updateUser(uid, request.form)
    elif request.method == 'DELETE':
        return userHandler().deleteUser(uid)
    else:
        return jsonify(Error = "Method not allowed."), 405

@app.route('/users/<int:uid>/appointments')
def getAppointmentsByUserId(uid):
    return userHandler().getAppointmentsByUserId(uid)

#-----Business-----
@app.route('/business', methods=['GET', 'POST'])
def getAllPerson():
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

#-----Appointments-----
@app.route('/appointments', methods=['GET', 'POST', 'DELETE'])
def getAllAppointments():
    if request.method == 'GET':
        return AppointmentsHandler().getAllAppointments()
    elif request.method == 'POST':
        return AppointmentsHandler().insertAppointment(request.form)
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
    app.debug = False
    app.run()
