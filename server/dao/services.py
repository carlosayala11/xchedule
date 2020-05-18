# from config.config import pg_config
import psycopg2


class ServicesDAO:
    def __init__(self):
        # connection_url = "dbname=%s user=%s password=%s" % (pg_config['dbname'],
        #                                                     pg_config['user'],
        #                                                     pg_config['passwd'])
        # self.conn = psycopg2._connect(connection_url)
        DATABASE_URL = 'postgres://ridrboqkilxrvh:d973fc864df2f973135c7280756679636ae84f8964f56e5882aa1291b0719c24@ec2-52-73-247-67.compute-1.amazonaws.com:5432/df6hbif2dks1kv'
        self.conn = psycopg2.connect(DATABASE_URL)

    def getAllServices(self):
        cursor = self.conn.cursor()
        query = "select * from services;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getServiceById(self, sid):
        cursor = self.conn.cursor()
        query = "select * from services where sid = %s;"
        cursor.execute(query, (sid,))
        result = cursor.fetchone()
        return result

    def getBusinessByServiceId(self, sid):
        cursor = self.conn.cursor()
        query = 'select (workinghours).starttime, (workinghours).endtime from business natural inner join offers where sid=%s;'
        cursor.execute(query, (sid,))
        result = cursor.fetchone()
        return result

    def insert(self, id, servicetype, servicedetails):
        cursor = self.conn.cursor()
        query = "insert into services(sid, servicetype, servicedetails) values (%s, %s, %s) returning sid;"
        cursor.execute(query, (id, servicetype, servicedetails))
        sid = cursor.fetchone()[0]
        self.conn.commit()
        return sid

    def delete(self, sid):
        cursor = self.conn.cursor()
        query1 = "delete from services where sid = %s;"
        cursor.execute(query1, (sid,))
        self.conn.commit()
        return sid

    def update(self, sid, servicetype, servicedetails):
        cursor = self.conn.cursor()
        query = "update services set servicetype = %s, servicedetails = %s where sid = %s;"
        cursor.execute(query, (servicetype, servicedetails, sid))
        self.conn.commit()
        return sid