from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dataclasses import dataclass
from datetime import datetime
import os
import base64

# Global variables
UPLOAD_FOLDER = './static'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def convertToBinary(filename):
  with open(filename, 'rb') as file:
    binaryData = file.read()
  return binaryData


app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost:5432/web_projects'
app.config['SQLALCHEMY<@_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_SCHEMA'] = 'shop_manager'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Database creation
db = SQLAlchemy(app)
CORS(app)

@dataclass
class Product(db.Model):
  """
  Class product
  """

  __tablename__ = 'person'
  __table_args__ = {'schema': 'shop_manager'}

  id: int
  title: str
  price: float
  category: str
  quantity: int
  type_of_quantity: str
  brand: str
  image: bytes

  id = db.Column(
    db.Integer, 
    primary_key=True, 
    autoincrement=True
  )

  title = db.Column(
    db.String(100), 
    nullable=False
  )

  price = db.Column(
    db.Float, 
    nullable=False
  )

  category = db.Column(
    db.String(100), 
    nullable=False
  )

  quantity = db.Column(
    db.Integer, 
    nullable=False
  )

  type_of_quantity = db.Column(
    db.String(100), 
    nullable=False
  )

  brand = db.Column(
    db.String(100), 
    nullable=False
  )

  image = db.Column(
    db.LargeBinary, 
    nullable=False
  )
  

@dataclass
class Carshop(db.Model):
  """
  Class carshop
  """

  __tablename__ = 'person'
  __table_args__ = {'schema': 'shop_manager'}

  id: int
  meal: str
  date: datetime

  id = db.Column(
    db.Integer, 
    primary_key=True, 
    autoincrement=True
  )

  meal = db.Column(
    db.String(100), 
    primary_key=True,
    nullable=False
  )

  date = db.Column(
    db.DateTime, 
    nullable=False
  )


@dataclass
class Menu(db.Model):
  """
  Class menu
  """

  __tablename__ = 'person'
  __table_args__ = {'schema': 'shop_manager'}

  id: int
  title: str
  preparation: str

  id = db.Column(
    db.Integer, 
    primary_key=True, 
    autoincrement=True
  )

  title = db.Column(
    db.String(100), 
    nullable=False
  )

  preparation = db.Column(
    db.String(100), 
    nullable=False
  )


@dataclass
class Belong_car(db.Model):
  """
  Class belong_car
  """

  __tablename__ = 'person'
  __table_args__ = {'schema': 'shop_manager'}

  product_id: int
  carshop_id: int

  product_id = db.Column(
    db.Integer, 
    db.ForeignKey('Product.id'),
    primary_key=True, 
  )

  product = db.relationship(
    'Product',
    backref= 'Belong_car'
  )

  carshop_id = db.Column(
    db.Integer, 
    db.ForeignKey('Carshop.id'),
    primary_key=True, 
  )

  carshop = db.relationship(
    'Carshop',
    backref= 'Belong_car'
  )


@dataclass
class Belong_menu(db.Model):
  """
  Class belong_menu
  """

  __tablename__ = 'person'
  __table_args__ = {'schema': 'shop_manager'}

  product_id: int
  menu_id: int
  amount: int
  type_of_amount: str

  product_id = db.Column(
    db.Integer, 
    db.ForeignKey('Product.id'),
    primary_key=True, 
  )

  product = db.relationship(
    'Product',
    backref= 'Belong_menu'
  )

  menu_id = db.Column(
    db.Integer, 
    db.ForeignKey('Menu.id'),
    primary_key=True, 
  )

  menu = db.relationship(
    'Menu',
    backref= 'Belong_menu'
  )

  amount = db.Column(
    db.Integer, 
    nullable=False
  )

  type_of_amount = db.Column(
    db.String(100), 
    nullable=False
  )


with app.app_context():
  db.create_all()


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)