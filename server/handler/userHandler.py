from flask import jsonify
from dao.user import UsersDAO

class UserHandler:
    def build(self, row):
        users = {}
        users['uid'] = row[0]
        users['User Name'] = row[1]
        return users

    def getAllUsers(self):
        dao = UsersDAO()
        result = dao.getAllUsers()
        users = []
        if result:
            for i in result:
                users.append(self.build(i))
            return jsonify(Users=users)
        else:
            return jsonify(ERROR='No users found')