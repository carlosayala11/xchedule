from flask import jsonify
from dao.messages import MessagesDAO

class MessagesHandler:
    def message_dict(self, row):
        result = {}
        result['mid'] = row[0]
        result['uid'] = row[1]
        result['bid'] = row[2]
        result['body'] = row[3]
        result['date'] = row[4]
        result['type'] = row[5]
        return result

    def author_dict(self, row):
        result = {}
        result['id'] = row
        return result

    def axios_dict(self, row):
        result = {}
        result['author'] = self.author_dict(row[0])
        result['text'] = row[1]
        result['type'] = 'text'
        result['timestamp'] = row[2]
        return result

    def chat_dict(self, row):
        result = {}
        result['bid'] = row[0]
        result['bname'] = row[1]
        return result
    
    def chat_business_dict(self, row):
        result = {}
        result['uid'] = row[0]
        result['full_name'] = row[1]
        return result

    def getAllMessages(self):
        dao = MessagesDAO()
        messages_list = dao.getAllMessages()
        result_list = []
        for row in messages_list:
            result = self.axios_dict(row)
            result_list.append(result)
        return jsonify(MessagesList=result_list)

    def getMessagesByUserId(self, uid):
        dao = MessagesDAO()
        messages_list = dao.getMessagesByUserId(uid)
        result_list = []
        for row in messages_list:
            result = self.message_dict(row)
            result_list.append(result)
        return jsonify(MessagesList=result_list)

    def getChatsByUserId(self, uid):
        dao = MessagesDAO()
        chat_list = dao.getChatsByUserId(uid)
        result_list = []
        for row in chat_list:
            result = self.chat_dict(row)
            result_list.append(result)
        return jsonify(Chats=result_list)
    
    def getChatsByBusinessId(self, bid):
        dao = MessagesDAO()
        chat_list = dao.getChatsByBusinessId(bid)
        result_list = []
        for row in chat_list:
            result = self.chat_business_dict(row)
            result_list.append(result)
        return jsonify(Chats=result_list)

    def getMessagesByUserIdAndBusinessId(self, uid, bid, owner):
        print(uid, bid, owner)
        dao = MessagesDAO()
        messages_list = dao.getMessagesByUserIdAndBusinessId(uid, bid, owner)
        result_list = []
        for row in messages_list:
            result = self.axios_dict(row)
            result_list.append(result)
        return jsonify(MessagesList=result_list)

    # def getMessagesByBusinessId(self, uid):
    #     dao = MessagesDAO()
    #     messages_list = dao.getMessagesByBusinessId(uid)
    #     result_list = []
    #     for row in messages_list:
    #         result = self.message_dict(row)
    #         result_list.append(result)
    #     return jsonify(MessagesList=result_list)

    def insert(self, json):
        print(json)
        uid = json['uid']
        bid = json['bid']
        body = json['body']
        mdate = json['mdate']
        mtype = json['mtype']
        if uid and bid and body and mdate and mtype:
            dao = MessagesDAO()
            mid = dao.insert(uid, bid, body, mdate, mtype)
            list = []
            list.extend((mid, uid, bid, body, mdate, mtype))
            result = self.message_dict(list)
            return jsonify(Message=result), 201
        else:
            return jsonify(Error="Unexpected attributes in message request"), 400