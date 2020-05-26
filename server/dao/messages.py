import psycopg2

class MessagesDAO:
    def __init__(self):
        DATABASE_URL = 'postgres://ridrboqkilxrvh:d973fc864df2f973135c7280756679636ae84f8964f56e5882aa1291b0719c24@ec2-52-73-247-67.compute-1.amazonaws.com:5432/df6hbif2dks1kv'
        self.conn = psycopg2.connect(DATABASE_URL)

    def getAllMessages(self):
        cursor = self.conn.cursor()
        query = "select uid, body, mdate from messages;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getMessagesByUserId(self, uid):
        cursor = self.conn.cursor()
        query = "select * from messages where uid = %s;"
        cursor.execute(query, (uid,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getChatsByUserId(self, uid):
        cursor = self.conn.cursor()
        query = "select distinct messages.bid, bname from messages, business where messages.uid = %s and business.bid = messages.bid except (select distinct bid, bname from messages natural join business where uid = %s);"
        cursor.execute(query, (uid, uid))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getMessagesByUserIdAndBusinessId(self, uid, bid, owner):
        cursor = self.conn.cursor()
        query = "select uid, body, mdate from messages where (uid=%s or uid=%s) and bid=%s;"
        cursor.execute(query, (uid, owner, bid,))
        result = []
        for row in cursor:
            result.append(row)
        return result
    
    def insert(self, uid, bid, body, mdate, mtype):
        cursor = self.conn.cursor()
        query = "INSERT INTO messages (uid, bid, body, mdate, mtype) VALUES(%s, %s, %s, %s, %s) returning mid;"
        cursor.execute(query, (uid, bid, body, mdate, mtype,))
        mid = cursor.fetchone()[0]
        self.conn.commit()
        return mid

    # def getMessagesByBusinessId(self, bid):
    #     cursor = self.conn.cursor()
    #     query = "select * from messages where bid = %s;"
    #     cursor.execute(query, (bid,))
    #     result = []
    #     for row in cursor:
    #         result.append(row)
    #     return result

    def getChatsByBusinessId(self, bid):
        cursor = self.conn.cursor()
        query = "select distinct messages.uid, full_name from messages, users where messages.bid = %s and messages.uid = users.uid except (select uid, full_name from business natural inner join users where bid=%s);"
        cursor.execute(query, (bid, bid,))
        result = []
        for row in cursor:
            result.append(row)
        return result