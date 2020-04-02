from flask import jsonify
from server.dao.business import BusinessDAO
class BusinessHandler:
    def build_business_dict(self, row):
        result = {}
        result['bid'] = row[0]
        result['uid'] = row[1]
        result['bname'] = row[2]
        result['twitter'] = row[3]
        result['facebook'] = row[4]
        result['instagram'] = row[5]
        result['website_url'] = row[6]
        result['workingHours'] = row[7]
        result['workingDays'] = row[8]
        result['baddress'] = row[9]
        result['blocation'] = row[10]
        result['timeRestriction'] = row[11]
        return result

    def build_service_dict(self, row):
        result = {}
        result['sid'] = row[0]
        result['serviceType'] = row[1]
        result['serviceDetails'] = row[2]
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
        if form and len(form) == 11:
            uid = form['uid']
            bname = form['bname']
            twitter = form['twitter']
            facebook = form['facebook']
            instagram = form['instagram']
            website_url = form['website_url']
            workingHours = form['workingHours']
            workingDays = form['workingDays']
            baddress = form['baddress']
            blocation = form['blocation']
            timeRestriction = form['timeRestriction']
            if uid and bname and twitter and facebook and instagram and website_url and workingHours \
                    and workingDays and baddress and blocation and timeRestriction:
                dao = BusinessDAO()
                bid = dao.insert(uid, bname, twitter, facebook, instagram, website_url, workingHours,
                                 workingDays, baddress, blocation, timeRestriction)
                result = {}
                result['bid'] = bid
                result['uid'] = uid
                result['bname'] = bname
                result['twitter'] = twitter
                result['facebook'] = facebook
                result['instagram'] = instagram
                result['website_url'] = website_url
                result['workingHours'] = workingHours
                result['workingDays'] = workingDays
                result['baddress'] = baddress
                result['blocation'] = blocation
                result['timeRestriction'] = timeRestriction
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

    def updateBusiness(self, bid, form):
        dao = BusinessDAO()
        if not dao.getBusinessById(bid):
            return jsonify(Error = "Business not found."), 404
        else:
            if len(form) != 11:
                return jsonify(Error="Malformed update request"), 400
            else:
                uid = form['uid']
                bname = form['bname']
                twitter = form['twitter']
                facebook = form['facebook']
                instagram = form['instagram']
                website_url = form['website_url']
                workingHours = form['workingHours']
                workingDays = form['workingDays']
                baddress = form['baddress']
                blocation = form['blocation']
                timeRestriction = form['timeRestriction']
                if uid and bname and twitter and facebook and instagram and website_url and workingHours \
                        and workingDays and baddress and blocation and timeRestriction:
                    dao.update(bid, uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays,
                               baddress, blocation, timeRestriction)
                    result = {}
                    result['bid'] = bid
                    result['uid'] = uid
                    result['bname'] = bname
                    result['twitter'] = twitter
                    result['facebook'] = facebook
                    result['instagram'] = instagram
                    result['website_url'] = website_url
                    result['workingHours'] = workingHours
                    result['workingDays'] = workingDays
                    result['baddress'] = baddress
                    result['blocation'] = blocation
                    result['timeRestriction'] = timeRestriction
                    return jsonify(Business=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"), 400