from flask import jsonify
from dao.appointment import AppointmentsDAO

class AppointmentsHandler:
    def build_appointment_dict(self, row):
        result = {}
        result['aid'] = row[0]
        result['startDate'] = row[1]
        result['duration'] = row[2]
        result['pending'] = row[3]
        result['completed'] = row[4]
        result['canceled'] = row[5]
        result['endDate'] = row[6]
        return result

    def build_AppointmentByService_dict(self, row):
        result = {}
        result['aid'] = row[0]
        result['uid'] = row[1]
        result['sid'] = row[2]
        result['service type'] = row[3]
        result['business name'] = row[4]
        return result
    
    def insertAppointmentJson(self, json):
        duration = json['duration']
        date = json['startDate']
        pending = json['pending']
        completed = json['completed']
        canceled = json['canceled']
        enddate = json['endDate']
        sid = json['sid']
        uid = json['uid']

        if duration and date and sid and uid and enddate:
            dao = AppointmentsDAO()
            aid = dao.insert(date, duration, pending, completed, canceled, int(sid), uid, enddate)
            list = []
            list.extend((aid, duration, date, pending, completed, canceled, enddate))
            result = self.build_appointment_dict(list)
            return jsonify(Appointment=result), 201
        else:
            return jsonify(Error="Unexpected attributes in appointment request"), 400
    
    def deleteAppointment(self, aid):
        dao = AppointmentsDAO()
        if not dao.getAppointmentById(aid):
            return jsonify(Error = "Appointment not found."), 404
        else:
            dao.delete(aid)
            return jsonify(DeleteStatus = "OK"), 200

    def getAllAppointments(self):
        dao = AppointmentsDAO()
        appointments_list = dao.getAllAppointments()
        result_list = []
        for row in appointments_list:
            result = self.build_appointment_dict(row)
            result_list.append(result)
        return jsonify(AppointmentsList=result_list)

    def getAppointmentById(self, aid):
        dao = AppointmentsDAO()
        appointment = dao.getAppointmentById(aid)
        result = self.build_appointment_dict(appointment)
        return jsonify(Appointment=result)
    
    def getAppointmentsByServiceId(self, sid):
        dao = AppointmentsDAO()
        appointments_list = dao.getAppointmentsByServiceId(sid)
        result_list = []
        for row in appointments_list:
            result = self.build_AppointmentByService_dict(row)
            result_list.append(result)
        return jsonify(AppointmentsList=result_list)

    def getAppointmentsByUserId(self, uid):
        dao = AppointmentsDAO()
        appointments_list = dao.getAppointmentsByUserId(uid)
        result_list = []
        for row in appointments_list:
            result = self.build_appointment_dict(row)
            result_list.append(result)
        return jsonify(AppointmentsList=result_list)

    def getRouteFromUserToBusinessByAppointmentId(self, aid):
        dao = AppointmentsDAO()
        route = dao.getRouteFromUserToBusinessByAppointmentId(aid)
        result = []
        result.append(route[0][0])
        result.append(route[0][1])
        result.append(route[0][2])
        result.append(route[0][3])
        print(result)
        return result


