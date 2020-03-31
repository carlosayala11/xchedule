from flask import jsonify
from dao.business import BusinessDAO
class BusinessHandler:
    def build_business_dict(self, row):
        result = {}
        result['bid'] = row[0]
        result['bname'] = row[1]
        result['bphone'] = row[2]
        result['bemail'] = row[3]
        result['baddress'] = row[4]
        result['blocation'] = row[5]
        return result

    def build_service_dict(self, row):
        result = {}
        result['sid'] = row[0]
        result['admin_id'] = row[1]
        result['details'] = row[2]
        result['website_url'] = row[3]
        result['facebook'] = row[4]
        result['instagram'] = row[5]
        return result

    def getAllBusiness(self):
        dao = BusinessDAO()
        business_list = dao.getAllBusiness()
        result_list = []
        for row in business_list:
            result = self.build_business_dict(row)
            result_list.append(result)
        return jsonify(BusinessList=result_list)

    def getBusinessById(self, bid):
        dao = BusinessDAO()
        business = dao.getBusinessById(bid)
        if not business:
            return jsonify(Error="Business Not Found"), 404
        else:
            person = self.build_business_dict(business)
        return jsonify(Business=business)

    def getBusinessByCity(self, city):
        dao = BusinessDAO()
        business_list = dao.getBusinessByCity(city)
        if not business_list:
            return jsonify(Error="Business Not Found"), 404
        else:
            result_list = []
            for row in business_list:
                result = self.build_business_dict(row)
                result_list.append(result)
            return jsonify(BusinessList=result_list)

    def getServicesByBusinessId(self, bid):
        dao = BusinessDAO()
        business = dao.getBusinessById(bid)
        if not business:
            return jsonify(Error="Business Not Found"), 404
        services_list = dao.getServicesByBusinessId(bid)
        result_list = []
        for row in services_list:
            result = self.build_service_dict(row)
            result_list.append(result)
        return jsonify(ServicesByBusinessID=result_list)

    def searchBusiness(self, args):
        if len(args) > 1:
            return jsonify(Error = "Malformed search string."), 400
        else:
            city = args.get("city")
            if city:
                dao = BusinessDAO()
                business_list = dao.getBusinessByCity(city)
                result_list = []
                for row in business_list:
                    result = self.build_business_dict(row)
                    result_list.append(row)
                return jsonify(BusinessList=result_list)
            else:
                return jsonify(Error="Malformed search string."), 400

    def insertBusiness(self, form):
        if form and len(form) == 5:
            bname = form['bname']
            bphone = form['bphone']
            bemail = form['bemail']
            baddress = form['baddress']
            blocation = form['blocation']
            if bname and bphone and bemail and baddress and blocation:
                dao = BusinessDAO()
                bid = dao.insert(bname, bphone, bemail, baddress, blocation)
                result = {}
                result['bid'] = bid
                result['bname'] = bname
                result['bphone'] = bphone
                result['bemail'] = bemail
                result['baddress'] = baddress
                result['blocation'] = blocation
                return jsonify(Business=result), 201
            else:
                return jsonify('Unexpected attributes in post request'), 401
        else:
            return jsonify(Error="Malformed post request"), 400

    def deleteBusiness(self, bid):
        dao = BusinessDAO()
        if not dao.getBusinessById(bid):
            return jsonify(Error = "Business not found."), 404
        else:
            dao.delete(bid)
            return jsonify(DeleteStatus = "OK"), 200

    def updatePerson(self, bid, form):
        dao = BusinessDAO()
        if not dao.getBusinessById(bid):
            return jsonify(Error = "Business not found."), 404
        else:
            if len(form) != 5:
                return jsonify(Error="Malformed update request"), 400
            else:
                bname = form['bname']
                bphone = form['bphone']
                bemail = form['bemail']
                baddress = form['baddress']
                blocation = form['blocation']
                if bname and bphone and bemail and baddress and blocation:
                    dao.update(bid, bname, bphone, bemail, baddress, blocation)
                    result = {}
                    result['bid'] = bid
                    result['bname'] = bname
                    result['bphone'] = bphone
                    result['bemail'] = bemail
                    result['baddress'] = baddress
                    result['blocation'] = blocation
                    return jsonify(Business=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"), 400