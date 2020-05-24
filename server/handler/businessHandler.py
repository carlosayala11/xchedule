from flask import jsonify
from dao.business import BusinessDAO
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
        result['sworkingHours'] = str(row[7])
        result['eworkingHours'] = str(row[8])
        result['workingDays'] = row[9]
        result['baddress'] = row[10]
        result['country'] = row[11]
        result['city'] = row[12]
        result['zip'] = row[13]
        result['timeRestriction'] = row[14]
        return result

    def build_business_appointments_dict(self, row):
        result = {}
        result['bid'] = row[0]
        result['aid'] = row[1]
        result['sid'] = row[2]
        result['uid'] = row[3]
        result['startdate'] = row[4]
        result['duration'] = row[5]
        result['enddate'] = row[6]
        result['servicetype'] = row[7]
        return result
    
    def build_service_dict(self, row):
        result = {}
        result['sid'] = row[0]
        result['serviceType'] = row[1]
        result['serviceDetails'] = row[2]
        return result

    def build_topBusiness_dict(self, row):
        result = {}
        result['bid'] = row[0]
        result['total_appointments'] = row[1]
        result['bname'] = row[2]
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
            return jsonify(Error="CreateBusiness Not Found"), 404
        else:
            business = self.build_business_dict(business)
        return jsonify(Business=business)

    def getBusinessByUserId(self, uid):
        dao = BusinessDAO()
        row = dao.getBusinessByUserId(uid)
        if not row:
            return jsonify(Error="BusinessInfo Not Found"), 404
        else:
            result = {}
            result['bid'] = row[0]
            result['bname'] = row[1]
            result['twitter'] = row[2]
            result['facebook'] = row[3]
            result['instagram'] = row[4]
            result['website_url'] = row[5]
            result['sworkingHours'] = str(row[6])
            result['eworkingHours'] = str(row[7])
            result['workingDays'] = row[8]
            result['baddress'] = row[9]
            result['country'] = row[10]
            result['city'] = row[11]
            result['zip'] = row[12]
            result['timeRestriction'] = row[13]
        return jsonify(Business=result)

    def getBusinessByCity(self, city):
        dao = BusinessDAO()
        business_list = dao.getBusinessByCity(city)
        if not business_list:
            return jsonify(Error="CreateBusiness Not Found"), 404
        else:
            result_list = []
            for row in business_list:
                result = self.build_business_dict(row)
                result_list.append(result)
            return jsonify(BusinessList=result_list)


    def getAppointmentsByBusinessId(self, bid):
        dao = BusinessDAO()
        business = dao.getBusinessById(bid)
        if not business:
            return jsonify(Error="CreateBusiness Not Found"), 404
        services_list = dao.getAppointmentsByBusinessId(bid)
        result_list = []
        for row in services_list:
            result = self.build_business_appointments_dict(row)
            result_list.append(result)
        return jsonify(AppointmentsByBusinessID=result_list)

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
                    result_list.append(result)
                return jsonify(BusinessList=result_list)
            else:
                return jsonify(Error="Malformed search string."), 400

    def insertBusiness(self, json):
        uid = json['uid']
        bname = json['bname']
        twitter = json['twitter']
        facebook = json['facebook']
        instagram = json['instagram']
        website_url = json['website_url']
        workingHours = (json['sworkingHours'],json['eworkingHours'])
        workingDays = json['workingDays']
        baddress = (json['baddress'],json['country'],json['city'],json['zip'])
        timeRestriction = json['timeRestriction']
        if uid and bname and twitter and facebook and instagram and website_url and workingHours \
                and workingDays and baddress and timeRestriction:
            dao = BusinessDAO()
            bid = dao.insert(uid, bname, twitter, facebook, instagram, website_url, workingHours,workingDays, baddress, timeRestriction)
            if bid== "Already owns":
                return jsonify(Error="User already owns a Business"), 400
            else:
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
                result['timeRestriction'] = timeRestriction
                return jsonify(Business=result), 201
        else:
            return jsonify('Unexpected attributes in post request'), 401

    def deleteBusiness(self, bid):
        dao = BusinessDAO()
        if not dao.getBusinessById(bid):
            return jsonify(Error = "CreateBusiness not found."), 404
        else:
            dao.delete(bid)
            return jsonify(DeleteStatus = "OK"), 200

    def updateBusiness(self,json):
        dao = BusinessDAO()
        bid = json['bid']
        test = dao.getBusinessById(bid)
        if not test:
            return jsonify(Error="BusinessInfo not found."), 404
        else:
            uid = json['uid']
            bname = json['bname']
            twitter = json['twitter']
            facebook = json['facebook']
            instagram = json['instagram']
            website_url = json['website_url']
            workingHours = (json['sworkingHours'], json['eworkingHours'])
            workingDays = json['workingDays']
            baddress = (json['baddress'], json['country'], json['city'], json['zip'])
            timeRestriction = json['timeRestriction']
            if bid and uid and bname and twitter and facebook and instagram and website_url and workingHours \
                    and workingDays and baddress and timeRestriction:
                dao.update(bid, uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays,baddress, timeRestriction)
                result = {}
                result['uid'] = uid
                result['bname'] = bname
                result['twitter'] = twitter
                result['facebook'] = facebook
                result['instagram'] = instagram
                result['website_url'] = website_url
                result['workingHours'] = workingHours
                result['workingDays'] = workingDays
                result['baddress'] = baddress
                result['timeRestriction'] = timeRestriction
                return jsonify(Business=result), 200
            else:
                return jsonify(Error="Unexpected attributes in update request"), 400

    def approveAppointment(self, bid, aid):
        dao = BusinessDAO()
        if not dao.getBusinessById(bid):
            return jsonify(Error="Business not found."), 404
        else:
            aid = dao.approveAppointment(bid, aid)
            return jsonify(AppointmentIdApproved=aid), 201

    def cancelAppointment(self, bid, aid):
        dao = BusinessDAO()
        if not dao.getBusinessById(bid):
            return jsonify(Error="Business not found."), 404
        else:
            aid = dao.cancelAppointment(bid, aid)
            return jsonify(AppointmentIdCanceled=aid), 201

    def completeAppointment(self, bid, aid):
        dao = BusinessDAO()
        if not dao.getBusinessById(bid):
            return jsonify(Error="Business not found."), 404
        else:
            aid = dao.completeAppointment(bid, aid)
            return jsonify(AppointmentIdCompleted=aid), 201

    def getTopBusiness(self):
        dao = BusinessDAO()
        business_list = dao.getTopBusiness()
        result_list = []
        for row in business_list:
            result = self.build_topBusiness_dict(row)
            result_list.append(result)
        return jsonify(TopBusinessList=result_list)

    def searchBusinessByPrefix(self,param):
        dao = BusinessDAO()
        business_list = dao.searchBusinessByPrefix(param)
        result_list = []
        for row in business_list:
            result = self.build_business_dict(row)
            result_list.append(result)
        return jsonify(BusinessList=result_list)


