from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from handler.userHandler import UserHandler
import psycopg2
import os

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/df6hbif2dks1kv'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)



@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/users')
def getUsers():
    return UserHandler().getAllUsers()


if __name__ == '__main__':
    app.debug = False
    app.run()
