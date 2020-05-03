from flask import jsonify
from dao.user import UsersDAO

class userHandler:
    def build_user(self, row):
        users = {}
        users['uid'] = row[0]
        users['fullname'] = row[1]
        users['username'] = row[2]
        users['email'] = row[3]
        users['phone'] = row[4]
        users['age'] = row[5]
        users['gender'] = row[6]
        users['address'] = row[7]
        users['isOwner'] = row[8]
        return users

    def getAllUsers(self):
        dao = UsersDAO()
        users_list = dao.getAllUsers()
        result_list = []
        if users_list:
            for row in users_list:
                result = self.build_user(row)
                result_list.append(result)
            return jsonify(UserList=result_list)
        else:
            return jsonify(ERROR='No users found.')

    def getUserById(self, uid):
        dao = UsersDAO()
        user = dao.getUserById(uid)
        if not user:
            return jsonify(Error="User Not Found."), 404
        else:
            user = self.build_user(user)
        return jsonify(User=user)

    def getUserByCity(self, city):
        dao = UsersDAO()
        user_list = dao.getUsersByCity(city)
        if not user_list:
            return jsonify(Error="No user found for the stated city."), 404
        else:
            result_list = []
            for row in user_list:
                result = self.build_user(row)
                result_list.append(result)
            return jsonify(UserList=result_list)

    def getAppointmentsByUserId(self, uid):
        dao = UsersDAO()
        user = dao.getUserById(uid)
        if not user:
            return jsonify(Error="No appointments found for the stated user."), 404
        appointments_list = dao.getAppoitmentsByUserId(uid)
        result_list = []
        for row in appointments_list:
            result = self.build_user(row)
            result_list.append(result)
        return jsonify(AppointmentsByUserID=result_list)

    def searchUsers(self, args):
        if len(args) > 1:
            return jsonify(Error = "Malformed search string."), 400
        else:
            city = args.get("city")
            if city:
                dao = UsersDAO()
                users_list = dao.getUserByCity(city)
                result_list = []
                for row in users_list:
                    result = self.build_user(row)
                    result_list.append(row)
                return jsonify(UsersList=result_list)
            else:
                return jsonify(Error="Malformed search string."), 400

    def insertUser(self, json):
        uid = json['uid']
        fullname = json['fullname']
        username = json['username']
        email = json['email']
        phone = json['phone']
        age = json['age']
        gender = json['gender']
        uaddress = json['uaddress']
        isowner = json['isowner']
        print(uid)
        print(fullname)
        print(username)
        print(email)
        print(phone)
        print(age)
        print(gender)
        print(uaddress)
        print(isowner)
        if uid and fullname and username and email and phone and age and gender and uaddress:
            print("ENTERED IF")
            dao = UsersDAO()
            uid = dao.insert(uid, fullname, username, email, phone, age, gender, uaddress, isowner)
            result = {}
            result['uid'] = uid
            result['fullname'] = fullname
            result['username'] = username
            result['email'] = email
            result['phone'] = phone
            result['age'] = age
            result['gender'] = gender
            result['uaddress'] = uaddress
            result['isowner'] = isowner
            print(result)
            return jsonify(User=result), 201
        else:
            return jsonify('Unexpected attributes in post request.'), 401

    def deleteUser(self, uid):
        dao = UsersDAO()
        if not dao.getUserById(uid):
            return jsonify(Error="User not found."), 404
        else:
            dao.delete(uid)
            return jsonify(DeleteStatus="OK"), 200

    def updateUser(self, json):
        dao = UsersDAO()
        uid = json['uid']
        if not dao.getUserById(uid):
            return jsonify(Error = "User not found."), 404
        else:
            fullname = json['fullname']
            username = json['username']
            email = json['email']
            phone = json['phone']
            age = json['age']
            gender = json['gender']
            uaddress = json['address']
            isowner = json['isowner']
            if uid and fullname and username and email and phone and age and gender and uaddress:
                dao.update(uid, fullname, username, email, phone, age, gender, uaddress, isowner)
                result = {}
                result['fullname'] = fullname
                result['username'] = username
                result['email'] = email
                result['phone'] = phone
                result['age'] = age
                result['gender'] = gender
                result['uaddress'] = uaddress
                result['isowner'] = isowner
                return jsonify(User=result), 200
            else:
                return jsonify(Error="Unexpected attributes in update request."), 400