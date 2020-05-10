from flask import jsonify
from dao.services import ServicesDAO

class serviceHandler:
    def build_service(self, row):
        services = {}
        services['sid'] = row[0]
        services['servicetype'] = row[1]
        services['servicedetails'] = row[2]
        return services

    def getAllServices(self):
        dao = ServicesDAO()
        services_list = dao.getAllServices()
        result_list = []
        if services_list:
            for row in services_list:
                result = self.build_service(row)
                result_list.append(result)
            return jsonify(ServicesList=result_list)
        else:
            return jsonify(ERROR='No services found.')

    def getUserById(self, sid):
        dao = ServicesDAO()
        service = dao.getServiceById(sid)
        if not service:
            return jsonify(Error="Service Not Found."), 404
        else:
            service = self.build_service(service)
        return jsonify(Service=service)

    def insertService(self, json):
        sid = json['sid']
        servicetype = json['servicetype']
        servicedetails = json['servicedetails']
        if sid and servicetype and servicedetails:
            dao = ServicesDAO()
            sid = dao.insert(sid, servicetype, servicedetails)
            result = {}
            result['sid'] = sid
            result['servicetype'] = servicetype
            result['servicedetails'] = servicedetails
            return jsonify(Services=result), 201
        else:
            return jsonify('Unexpected attributes in post request.'), 401

    def deleteUser(self, sid):
        dao = ServicesDAO()
        if not dao.getServiceById(sid):
            return jsonify(Error="Service not found."), 404
        else:
            dao.delete(sid)
            return jsonify(DeleteStatus="OK"), 200

    def updateUser(self, json):
        dao = ServicesDAO()
        sid = json['sid']
        if not dao.getServiceById(sid):
            return jsonify(Error = "Service not found."), 404
        else:
            servicetype = json['servicetype']
            servicedetails = json['servicedetails']
            if sid and servicetype and servicedetails:
                dao.update(sid, servicetype, servicedetails)
                result = {}
                result['servicetype'] = servicetype
                result['servicedetails'] = servicedetails
                return jsonify(Service=result), 200
            else:
                return jsonify(Error="Unexpected attributes in update request."), 400