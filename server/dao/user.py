# from config.config import pg_config
import psycopg2


class UsersDAO:
    def __init__(self):
        # connection_url = "dbname=%s user=%s password=%s" % (pg_config['dbname'],
        #                                                     pg_config['user'],
        #                                                     pg_config['passwd'])
        # self.conn = psycopg2._connect(connection_url)
        DATABASE_URL = 'postgres://ridrboqkilxrvh:d973fc864df2f973135c7280756679636ae84f8964f56e5882aa1291b0719c24@ec2-52-73-247-67.compute-1.amazonaws.com:5432/df6hbif2dks1kv'
        self.conn = psycopg2.connect(DATABASE_URL)

    def getAllUsers(self):
        cursor = self.conn.cursor()
        query = "select * from users;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getUserById(self, uid):
        cursor = self.conn.cursor()
        query = "select * from users where uid = %s;"
        cursor.execute(query, (uid,))
        result = cursor.fetchone()
        return result

    def getUserByCity(self, city):
        cursor = self.conn.cursor()
        query = "select * from users where (uaddress).city = %s;"
        cursor.execute(query, (city,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getAppointmentsByUserID(self, uid):
        cursor = self.conn.cursor()
        result = []
        query = "select aid, date, duration, completed from users natural inner join appointments natural inner join schedules where uid =%s;"
        cursor.execute(query, (uid,))
        for row in cursor:
            result.append(row)
        return result

    def insert(self, id, full_name, username, email, phone_number, age, gender, uaddress, isowner):
        cursor = self.conn.cursor()
        query = "insert into users(uid, full_name, username, email, phone_number, age, gender, uaddress, isowner) values (%s, %s, %s, %s, %s, %s, %s, %s, %s) returning uid;"
        cursor.execute(query, (id, full_name, username, email, phone_number, age, gender, uaddress, isowner))
        uid = cursor.fetchone()[0]
        self.conn.commit()
        return uid

    def delete(self, uid):
        cursor = self.conn.cursor()
        query1 = "delete from appointments as a using schedules as s where CAST(s.uid as int) = %s and s.aid = a.aid;"
        cursor.execute(query1, (uid,))
        query2 = "delete from business as b using users as u where CAST(u.uid as int) = b.uid;"
        cursor.execute(query2, (uid,))
        query3 = "delete from users where CAST(uid as int) = %s;"
        cursor.execute(query3, (uid,))
        self.conn.commit()
        return uid

    def update(self, uid, full_name, username, email, phone_number, age, gender, uaddress, isowner):
        cursor = self.conn.cursor()
        query = "update users set full_name = %s, username = %s, email = %s, phone_number = %s, age = %s, gender = %s, uaddress = %s, isowner = %s where uid = %s;"
        cursor.execute(query, (full_name, username, email, phone_number, age, gender, uaddress, isowner, uid))
        self.conn.commit()
        return uid