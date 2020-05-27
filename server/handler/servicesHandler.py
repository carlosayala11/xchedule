from flask import jsonify
from dao.services import ServicesDAO
from dao.business import BusinessDAO

class servicesHandler:
    def build_service(self, row):
        services = {}
        services['sid'] = row[0]
        services['servicetype'] = row[1]
        services['servicedetails'] = row[2]
        return services

    def build_hours(self, row):
        services = {}
        services['starttime'] = str(row[0])
        services['endtime'] = str(row[1])
        return services

    def getHours(self, sid):
        dao = ServicesDAO()
        service = dao.getServiceById(sid)
        if not service:
            return jsonify(Error="Service Not Found."), 404
        else:
            result = dao.getHours(sid)
            service = self.build_hours(result)
        return jsonify(Service=service)

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

    def getServicesByBusinessId(self, bid):
        dao = BusinessDAO()
        business = dao.getBusinessById(bid)
        if not business:
            return jsonify(Error="Business Not Found"), 404
        dao = ServicesDAO()
        services_list = dao.getServicesByBusinessId(bid)
        result_list = []
        for row in services_list:
            result = self.build_service(row)
            result_list.append(result)
        return jsonify(ServicesByBusinessId=result_list)



    def insertService(self, json):
        bid = json['bid']
        servicetype = json['serviceType']
        servicedetails = json['serviceDetails']
        if bid and servicetype and servicedetails:
            dao = ServicesDAO()
            sid = dao.insert(bid, servicetype, servicedetails)
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