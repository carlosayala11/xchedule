from flask import jsonify
from dao.user import UsersDAO

class userHandler:
    def build_user(self, row):
        users = {}
        users['uid'] = row[0]
        users['username'] = row[1]
        users['password'] = row[2]
        users['fullname'] = row[3]
        users['phone'] = row[4]
        users['email'] = row[5]
        users['age'] = row[6]
        users['gender'] = row[7]
        users['address'] = row[8]
        users['country'] = row[9]
        users['city'] = row[10]
        users['zipcode'] = row[11]
        users['gender'] = row[12]
        users['isOwner'] = row[13]
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

    def getUserById(self, bid):
        dao = UsersDAO()
        business = dao.getUserById(bid)
        if not business:
            return jsonify(Error="User Not Found."), 404
        else:
            user = self.build_user(user)
        return jsonify(User=user)