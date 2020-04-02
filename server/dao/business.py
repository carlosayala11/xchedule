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

    def getBusinessByCity(self, city):
        cursor = self.conn.cursor()
        query = "select * from business where (baddress).city = %s;"
        cursor.execute(query, (city,))
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
        query = "delete from business where bid = %s;"
        cursor.execute(query, (bid,))
        self.conn.commit()
        return bid

    def update(self, bid, uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, blocation, timeRestriction):
        cursor = self.conn.cursor()
        query = "update person set uid = %s, bname = %s, twitter = %s, facebook = %s, instagram = %s, website_url = %s, workingHours = %s baddress = %s, blocation = %s, timeRestriction= %s where bid = %s;"
        cursor.execute(query, (uid, bname, twitter, facebook, instagram, website_url, workingHours, workingDays, baddress, blocation, timeRestriction, bid,))
        self.conn.commit()
        return bid
