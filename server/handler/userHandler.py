from flask import jsonify
from dao.user import UsersDAO

class userHandler:
    def build_user(self, row):
        users = {}
        users['uid'] = row[0]
        users['fullname'] = row[1]
        users['username'] = row[2]
        users['password'] = row[3]
        users['phone'] = row[4]
        users['email'] = row[5]
        users['age'] = row[6]
        users['gender'] = row[7]
        users['address'] = row[8]
        users['isOwner'] = row[9]
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

    def insertUser(self, form):
        if form and len(form) == 10:
            id = form['uid']
            fullname = form['fullname']
            username = form['username']
            password = form['password']
            email = form['email']
            phone = form['phone']
            age = form['age']
            gender = form['gender']
            uaddress = form['uaddress']
            isowner = form['isowner']
            if id and fullname and username and password and email and phone and age and gender and uaddress and isowner:
                dao = UsersDAO()
                uid = dao.insert(id, fullname, username, password, email, phone, age, gender, uaddress, isowner)
                result = {}
                result['uid'] = uid
                result['fullname'] = fullname
                result['username'] = username
                result['password'] = password
                result['email'] = email
                result['phone'] = phone
                result['age'] = age
                result['gender'] = gender
                result['uaddress'] = uaddress
                result['isowner'] = isowner
                return jsonify(User=result), 201
            else:
                return jsonify('Unexpected attributes in post request.'), 401
        else:
            return jsonify(Error="Malformed post request."), 400

    def deleteUser(self, uid):
        dao = UsersDAO()
        if not dao.getUserById(uid):
            return jsonify(Error="User not found."), 404
        else:
            dao.delete(uid)
            return jsonify(DeleteStatus="OK"), 200

    def updateUser(self, uid, form):
        dao = UsersDAO()
        if not dao.getUserById(uid):
            return jsonify(Error = "User not found."), 404
        else:
            if len(form) != 9:
                return jsonify(Error="Malformed update request"), 400
            else:
                fullname = form['fullname']
                username = form['username']
                password = form['password']
                email = form['email']
                phone = form['phone']
                age = form['age']
                gender = form['gender']
                uaddress = form['uaddress']
                isowner = form['isowner']
                if fullname and username and password and email and phone and age and gender and uaddress and isowner:
                    dao.update(uid, fullname, username, password, email, phone, age, gender, uaddress, isowner)
                    result = {}
                    result['fullname'] = fullname
                    result['username'] = username
                    result['password'] = password
                    result['email'] = email
                    result['phone'] = phone
                    result['age'] = age
                    result['gender'] = gender
                    result['uaddress'] = uaddress
                    result['isowner'] = isowner
                    return jsonify(User=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request."), 400