from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import and_
from dataclasses import dataclass
from datetime import datetime
import os
import base64

# Global variables
UPLOAD_FOLDER = './static'

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
  typeof_quantity: str
  brand: str
  image_name: str
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

  typeof_quantity = db.Column(
    db.String(100), 
    nullable=False
  )

  brand = db.Column(
    db.String(100), 
    nullable=False
  )

  image_name = db.Column(
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
    db.TIMESTAMP, 
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
    'Product', 
    backref='carshops'
  )

  r_carshop = db.relationship(
    'Carshop', 
    backref='belong_car'
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
    'Product', 
    backref='belong_menu', 
  )

  r_menu = db.relationship(
    'Menu', 
    backref='belong_menu'
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


# Routes
@app.route('/products', methods=['GET', 'POST'])
def products():
  """
  Route of products
  """

  try:
    if request.method == 'GET':
      products = Product.query.all()
      serialized_products = [{
        'id': product.id,
        'title': product.title,
        'price': product.price,
        'category': product.category,
        'quantity': product.quantity,
        'typeof_quantity': product.typeof_quantity,
        'brand': product.brand,
        'image_name': product.image_name,
        'image': base64.b64encode(product.image).decode('utf-8')
      } for product in products]

      return jsonify(serialized_products)

    if request.method == 'POST':
      title = request.form['title']
      price = request.form['price']
      category = request.form['category']
      quantity = request.form['quantity']
      typeof_quantity = request.form['typeof_quantity']
      brand = request.form['brand']
      image = request.files['image']

      image.save(os.path.join(app.config['UPLOAD_FOLDER'], image.filename))

      binary_image = convertToBinary(f'./static/{image.filename}')

      new_product = Product(
        title=title,
        price=price,
        category=category,
        quantity=quantity,
        typeof_quantity=typeof_quantity,
        brand=brand,
        image_name = image.filename,
        image=binary_image
      )

      db.session.add(new_product)
      db.session.commit()

      try:
          os.remove(f'./static/{image.filename}')
      except FileNotFoundError:
        print(f"El archivo './static/{image.filename}' no existe.")
      except Exception as e:
        print(f"Error al eliminar el archivo './static/{image.filename}': {str(e)}")

      return jsonify({'message': 'User created successfully'}), 200
  
  except Exception as e:
    return jsonify({'error': str(e)}), 400


@app.route('/products/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def product(id):
  try:
    if request.method == 'GET':
      product = Product.query.filter_by(id=id).first()
      serialized_product = {
        'id': product.id,
        'title': product.title,
        'price': product.price,
        'category': product.category,
        'quantity': product.quantity,
        'typeof_quantity': product.typeof_quantity,
        'brand': product.brand,
        'image_name': product.image_name,
        'image': base64.b64encode(product.image).decode('utf-8')
      }

      return jsonify(serialized_product)

    if request.method == 'PUT':
      title = request.form['title']
      price = request.form['price']
      category = request.form['category']
      quantity = request.form['quantity']
      typeof_quantity = request.form['typeof_quantity']
      brand = request.form['brand']
      image = request.files['image']

      image.save(os.path.join(app.config['UPLOAD_FOLDER'], image.filename))

      binary_image = convertToBinary(f'./static/{image.filename}')

      product = Product.query.filter_by(id=id).first()

      product.title = title
      product.price = price
      product.category = category
      product.quantity = quantity
      product.typeof_quantity = typeof_quantity
      product.brand = brand
      product.image_name = image.filename
      product.image = binary_image

      db.session.commit()

      try:
          os.remove(f'./static/{image.filename}')
      except FileNotFoundError:
        print(f"El archivo './static/{image.filename}' no existe.")
      except Exception as e:
        print(f"Error al eliminar el archivo './static/{image.filename}': {str(e)}")

      return jsonify({'message': 'User updated successfully'}), 200

    if request.method == 'DELETE':
      product = Product.query.filter_by(id=id).first()
      db.session.delete(product)
      db.session.commit()

      return jsonify({'message': 'User deleted successfully'}), 200

  except Exception as e:
    return jsonify({'error': str(e)}), 400
    

@app.route('/carshops', methods=['GET', 'POST', 'PUT', 'DELETE'])
def carshops():
  """
  Route of carshops
  """

  if request.method == 'GET':
    carshops = Carshop.query.all()
    return jsonify(carshops)


@app.route('/menus', methods=['GET', 'POST', 'PUT', 'DELETE'])
def menus():
  """
  Route of menus
  """

  if request.method == 'GET':
    menus = Menu.query.all()
    return jsonify(menus)


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)