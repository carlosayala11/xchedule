#from server.config.config import pg_config
import psycopg2


class BusinessDAO:
    def __init__(self):
        # connection_url = "dbname=%s user=%s password=%s" % (pg_config['dbname'],
        #                                                     pg_config['user'],
        #                                                     pg_config['passwd'])
        # self.conn = psycopg2._connect(connection_url)
        DATABASE_URL = 'postgres://ridrboqkilxrvh:d973fc864df2f973135c7280756679636ae84f8964f56e5882aa1291b0719c24@ec2-52-73-247-67.compute-1.amazonaws.com:5432/df6hbif2dks1kv'
        self.conn = psycopg2.connect(DATABASE_URL)

    def getAllBusiness(self):
        cursor = self.conn.cursor()
        query = "select * from business;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getBusinessById(self, bid):
        cursor = self.conn.cursor()
        query = "select * from business where bid = %s;"
        cursor.execute(query, (bid,))
        result = cursor.fetchone()
        return result

    def getServicesByBusinessId(self, bid):
        cursor = self.conn.cursor()
        result = []
        query = "select sid, serviceType, serviceDetails from business natural inner join services natural inner join offers where bid =%s;"
        cursor.execute(query, (bid,))
        for row in cursor:
            result.append(row)
        return result

    def getAppointmentsByBusinessId(self, bid):
        cursor = self.conn.cursor()
        result = []
        query = "select bid, aid, sid, uid, adate, duration, enddate, servicetype from offers natural inner join services natural inner join requests natural inner join appointments natural inner join schedules where bid=%s;"
        cursor.execute(query, (bid,))
        for row in cursor:
            result.append(row)
        return result

    def approveAppointment(self, bid, aid):
        cursor = self.conn.cursor()
        query = "update appointments set pending=false where aid = %s;"
        cursor.execute(query, (aid,))
        self.conn.commit()
        return aid

    def getBusinessByCity(self, city):
        cursor = self.conn.cursor()
        query = "select * from business where (baddress).city = %s;"
        cursor.execute(query, (city,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getTopBusiness(self):
        cursor = self.conn.cursor()
        query = "select bid, count(aid) as total, bname from business natural inner join schedules natural inner join requests natural inner join offers group by bid order by total desc fetch first 3 rows only;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def insert(self,uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, blocation, timeRestriction):
        cursor = self.conn.cursor()
        query = "insert into business(uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, blocation, timeRestriction) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) returning bid;"
        cursor.execute(query, (uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, blocation, timeRestriction))
        bid = cursor.fetchone()[0]
        self.conn.commit()
        return bid

    def delete(self, bid):
        cursor = self.conn.cursor()
        query1 = "delete from appointments as a using services as s, requests as r, offers as o where o.bid= %s and o.sid = s.sid and r.sid = s.sid and r.aid = a.aid;"
        cursor.execute(query1, (bid,))
        query2 = "delete from services as s using offers as o where s.sid = o.sid and o.bid = %s;"
        cursor.execute(query2, (bid,))
        query3 = "delete from business where bid = %s;"
        cursor.execute(query3, (bid,))
        self.conn.commit()
        return bid

    def update(self, bid, uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, blocation, timeRestriction):
        cursor = self.conn.cursor()
        query = "update business set uid = %s, bname = %s, twitter = %s, facebook = %s, instagram = %s, website_url = %s, workingHours = %s, workingDays = %s, baddress = %s, blocation = %s, timeRestriction= %s where bid = %s;"
        cursor.execute(query, (uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, blocation, timeRestriction, bid,))
        self.conn.commit()
        return bid