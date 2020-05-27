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
        query = "select bid, uid, bname, twitter, facebook, instagram, website_url,(workinghours).startTime, (workingHours).endTime, workingdays, (baddress).address, (baddress).country, (baddress).city, (baddress).zipcode, timerestriction from business;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getBusinessById(self, bid):
        cursor = self.conn.cursor()
        query = "select bid, uid, bname, twitter, facebook, instagram, website_url, (workinghours).startTime, (workingHours).endTime, workingdays, (baddress).address, (baddress).country, (baddress).city, (baddress).zipcode, timerestriction from business where bid = %s;"
        cursor.execute(query, (bid,))
        result = cursor.fetchone()
        return result

    def getBusinessByName(self, name):
        cursor = self.conn.cursor()
        query = "select bid, uid, bname, twitter, facebook, instagram, website_url, (workinghours).startTime, (workingHours).endTime, workingdays, (baddress).address, (baddress).country, (baddress).city, (baddress).zipcode, timerestriction from business where bname = %s;"
        cursor.execute(query, (name,))
        result = cursor.fetchone()
        return result

    def getBusinessByUserId(self, uid):
        cursor = self.conn.cursor()
        query = "select bid, bname, twitter, facebook, instagram, website_url, (workinghours).startTime, (workingHours).endTime, workingdays, (baddress).address, (baddress).country, (baddress).city, (baddress).zipcode, timerestriction from business where uid = %s;"
        cursor.execute(query, (uid,))
        result = cursor.fetchone()
        return result


    def getAppointmentsByBusinessId(self, uid):
        cursor = self.conn.cursor()
        result = []
        query = "select bid, aid, sid, uid, sdate, duration, edate, servicetype, pending from offers natural inner join services natural inner join requests natural inner join appointments natural inner join business where uid=%s and canceled=false and completed=false;"
        cursor.execute(query, (uid,))
        for row in cursor:
            result.append(row)
        return result

    def getUnapprovedAppointmentsByBusinessId(self, uid):
        cursor = self.conn.cursor()
        result = []
        query = "select bid, aid, sid, uid, sdate, duration, edate, servicetype from offers natural inner join services natural inner join requests natural inner join appointments natural inner join business where uid=%s and canceled=false and completed=false and pending = true;"
        cursor.execute(query, (uid,))
        for row in cursor:
            result.append(row)
        return result

    def approveAppointment(self, aid):
        cursor = self.conn.cursor()
        query = "update appointments set pending=false where aid = %s;"
        cursor.execute(query, (aid,))
        self.conn.commit()
        return aid

    def completeAppointment(self, aid):
        cursor = self.conn.cursor()
        query = "update appointments set completed=true where aid = %s;"
        cursor.execute(query, (aid,))
        self.conn.commit()
        return aid

    def cancelAppointment(self, aid):
        cursor = self.conn.cursor()
        query = "update appointments set canceled=true where aid = %s;"
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
        query = "select bid, count(aid) as total, bname from business natural inner join appointments natural inner join requests natural inner join offers where canceled = false group by bid order by total desc fetch first 3 rows only;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)

        return result

    def getBusinessByUserId(self, uid):
        cursor = self.conn.cursor()
        query = "select bid, uid, bname, twitter, facebook, instagram, website_url, (workinghours).startTime, (workingHours).endTime, workingdays, (baddress).address, (baddress).country, (baddress).city, (baddress).zipcode, timerestriction from business where uid = %s;"
        cursor.execute(query, (uid,))
        result = []
        result = cursor.fetchone()
        return result

    def searchBusinessByPrefix(self, param):
        cursor = self.conn.cursor()
        query = "select bid, uid, bname, twitter, facebook, instagram, website_url,(workinghours).startTime, (workingHours).endTime, workingdays, (baddress).address, (baddress).country, (baddress).city, (baddress).zipcode, timerestriction  from business where bname like '"+param+"%';"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)

        print(result)
        return result


    def insert(self,uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, timeRestriction):
        cursor = self.conn.cursor()
        query = "select bid from business where uid = %s;"
        cursor.execute(query, (uid,))
        result = cursor.fetchone()
        if result:
            return "Already owns"
        else:
            query = "insert into business(uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, timeRestriction) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) returning bid;"
            cursor.execute(query, (uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, timeRestriction))
            bid = cursor.fetchone()[0]
            query = "update users set isOwner= TRUE where uid= %s;"
            cursor.execute(query, (uid,))
            self.conn.commit()
            return bid

    def delete(self, bid):
        cursor = self.conn.cursor()
        query = "with subquery as (select uid, isowner from users natural inner join business where bid=%s) update users set isowner = false from subquery where users.uid = subquery.uid;"
        cursor.execute(query, (bid,))
        query1 = "delete from appointments as a using requests as r, offers as o where o.bid=%s and o.sid=r.sid and r.aid=a.aid;"
        cursor.execute(query1, (bid,))
        query2 = "delete from services as s using offers as o where s.sid = o.sid and o.bid = %s;"
        cursor.execute(query2, (bid,))
        query3 = "delete from business where bid = %s;"
        cursor.execute(query3, (bid,))
        self.conn.commit()
        return bid

    def update(self, bid, uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, timeRestriction):
        cursor = self.conn.cursor()
        query = "update business set uid = %s, bname = %s, twitter = %s, facebook = %s, instagram = %s, website_url = %s, workingHours = %s, workingDays = %s, baddress = %s, timeRestriction= %s where bid = %s;"
        cursor.execute(query, (uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, timeRestriction, bid,))
        self.conn.commit()
        return bid
