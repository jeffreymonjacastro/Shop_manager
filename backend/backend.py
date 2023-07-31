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

  __tablename__ = 'Product'
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
    autoincrement=True,
    unique=True
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

  __tablename__ = 'Carshop'
  __table_args__ = {'schema': 'shop_manager'}

  id: int
  meal: str
  date: datetime

  id = db.Column(
    db.Integer, 
    primary_key=True, 
    autoincrement=True,
    unique=True
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

  __tablename__ = 'Menu'
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

# Tabla de unión para la relación muchos a muchos entre Product y Carshop
belong_car_table = db.Table(
  'Belongcar',
  db.Column(
    'product_id', 
    db.Integer, 
    db.ForeignKey('shop_manager.Product.id')
  ),
  db.Column(
    'carshop_id', 
    db.Integer, 
    db.ForeignKey('shop_manager.Carshop.id')
  )
)

# Tabla de unión para la relación muchos a muchos entre Product y Menu
belong_menu_table = db.Table(
  'Belongmenu',
  db.Column(
    'product_id', 
    db.Integer, 
    db.ForeignKey('shop_manager.Product.id')
  ),
  db.Column(
    'menu_id', 
    db.Integer, 
    db.ForeignKey('shop_manager.Menu.id')
  )
)


@dataclass
class Belong_car(db.Model):
  """
  Class belong_car
  """

  __tablename__ = 'Belong_car'
  __table_args__ = {'schema': 'shop_manager'}

  product_id: int
  carshop_id: int

  product_id = db.Column(
    db.Integer, 
    db.ForeignKey('shop_manager.Product.id'),
    primary_key=True, 
  )

  carshop_id = db.Column(
    db.Integer, 
    db.ForeignKey('shop_manager.Carshop.id'),
    primary_key=True, 
  )

  r_product = db.relationship(
    Product, 
    backref='carshops', 
    secondary=belong_car_table
  )

  r_carshop = db.relationship(
    Carshop, 
    backref='products', 
    secondary=belong_car_table
  )



@dataclass
class Belong_menu(db.Model):
  """
  Class belong_menu
  """

  __tablename__ = 'Belong_menu'
  __table_args__ = {'schema': 'shop_manager'}

  product_id: int
  menu_id: int
  amount: int
  type_of_amount: str

  product_id = db.Column(
    db.Integer, 
    db.ForeignKey('shop_manager.Product.id'),
    primary_key=True, 
  )

  menu_id = db.Column(
    db.Integer, 
    db.ForeignKey('shop_manager.Menu.id'),
    primary_key=True, 
  )

  r_product = db.relationship(
    Product, 
    backref='menus', 
    secondary=belong_menu_table
  )

  r_menu = db.relationship(
    Menu, 
    backref='products', 
    secondary=belong_menu_table
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


@app.route('/products', methods=['GET', 'POST', 'PUT', 'DELETE'])
def products():
  """
  Route of products
  """

  if request.method == 'GET':
    products = Product.query.all()
    return jsonify([product.__dict__ for product in products])

  elif request.method == 'POST':
    data = request.get_json()
    product = Product(
      title = data['title'],
      price = data['price'],
      category = data['category'],
      quantity = data['quantity'],
      type_of_quantity = data['type_of_quantity'],
      brand = data['brand'],
      image = convertToBinary(data['image'])
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product.__dict__)

  elif request.method == 'PUT':
    data = request.get_json()
    product = Product.query.get(data['id'])
    product.title = data['title']
    product.price = data['price']
    product.category = data['category']
    product.quantity = data['quantity']
    product.type_of_quantity = data['type_of_quantity']
    product.brand = data['brand']
    product.image = convertToBinary(data['image'])
    db.session.commit()
    return jsonify(product.__dict__)

  elif request.method == 'DELETE':
    data = request.get_json()
    product = Product.query.get(data['id'])
    db.session.delete(product)
    db.session.commit()
    return jsonify(product.__dict__)


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)