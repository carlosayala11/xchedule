from flask import jsonify
from dao.services import ServicesDAO

class servicesHandler:
    def build_service(self, row):
        services = {}
        services['sid'] = row[0]
        services['servicetype'] = row[1]
        services['servicedetails'] = row[2]
        return services

    def build_business(self, row):
        services = {}
        services['starttime'] = row[0]
        services['endtime'] = row[1]
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

    def getServiceById(self, sid):
        dao = ServicesDAO()
        service = dao.getServiceById(sid)
        if not service:
            return jsonify(Error="Service Not Found."), 404
        else:
            service = self.build_service(service)
        return jsonify(Service=service)

    def getBusinessByServiceId(self, sid):
        dao = ServicesDAO()
        bus = dao.getBusinessByServiceId(sid)
        result = []
        if bus:
            result = self.build_business(bus)
            print(result)
            return jsonify(BusinessHours=result)
        else:
            return jsonify(ERROR='No services found.')

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

    def deleteService(self, sid):
        dao = ServicesDAO()
        if not dao.getServiceById(sid):
            return jsonify(Error="Service not found."), 404
        else:
            dao.delete(sid)
            return jsonify(DeleteStatus="OK"), 200

    def updateService(self, json):
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