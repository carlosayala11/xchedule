import psycopg2

class AppointmentsDAO:
    def __init__(self):
        DATABASE_URL = 'postgres://ridrboqkilxrvh:d973fc864df2f973135c7280756679636ae84f8964f56e5882aa1291b0719c24@ec2-52-73-247-67.compute-1.amazonaws.com:5432/df6hbif2dks1kv'
        self.conn = psycopg2.connect(DATABASE_URL)

    def insert(self, date, duration, pending, completed, canceled, sid, uid, enddate):
        cursor = self.conn.cursor()
        query = "insert into appointments (adate, duration, pending, completed, canceled, enddate) values(%s, %s, %s, %s, %s, %s) returning aid;"
        cursor.execute(query, (date, duration, pending, completed, canceled, enddate))
        aid = cursor.fetchone()[0]
        query1 = "insert into requests (aid, sid) values(%s, %s);"
        cursor.execute(query1, (aid, sid))
        query2 = "insert into schedules (aid, uid) values(%s, %s);"
        cursor.execute(query2, (aid, uid))
        self.conn.commit()
        return aid

    def delete(self, aid):
        cursor = self.conn.cursor()
        query = "delete from appointments where aid = %s;"
        cursor.execute(query, (aid,))
        self.conn.commit()
        return aid

    def getAllAppointments(self):
        cursor = self.conn.cursor()
        query = "select * from appointments;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getAppointmentById(self, aid):
        cursor = self.conn.cursor()
        query = "select * from appointments where aid = %s;"
        cursor.execute(query, (aid,))
        result = cursor.fetchone()
        return result

    def getAppointmentsByServiceId(self, sid):
        cursor = self.conn.cursor()
        query = "select distinct sc.aid, sc.uid, s.sid, servicetype, bname from schedules as sc, requests as r, services as s, business where s.sid = %s;"
        cursor.execute(query, (sid,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getAppointmentsByUserId(self, uid):
        cursor = self.conn.cursor()
        query = "select * from appointments natural inner join schedules where uid=%s;"
        cursor.execute(query, (uid,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getRouteFromUserToBusinessByAppointmentId(self, aid):
        cursor = self.conn.cursor()
        query = "select (users.uaddress).city as user_city, (users.uaddress).country as user_country, (business.baddress).city as business_city , (business.baddress).country as business_country from business natural inner join offers natural inner join requests natural inner join schedules natural inner join users where aid= %s ;"
        cursor.execute(query, (aid,))
        result = []
        for row in cursor:
            result.append(row)
        return result
