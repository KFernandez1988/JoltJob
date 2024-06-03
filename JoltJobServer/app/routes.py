# app/routes.py
from flask import Blueprint, jsonify, request
from app import db
from app.models import Users
from app.auth import login_required  # Assuming you have a login_required decorator
from appwrite.client import Client
from appwrite.services.account import Account

bp = Blueprint('main', __name__)

client = Client()

client.set_endpoint('https://cloud.appwrite.io/v1')  # Your Appwrite Endpoint
client.set_project('665285f100322051239c')  # Your project ID
client.set_key('fb42ebecb16a7389e20c4de28845713906462310b0d3ed148f1483c04ff26d926dabad420d425b0b5b163891a65202bad130691180b25e37cbb837843802908336b56c182c131cc0ee08eaa1863e20590b6d32c15b286fe52d66e5639fcfdf8b989ed26e7d098bd23475dcc7c34028080bb55bc545496cc4a614cdc1475fd249')  # Your API Key

@bp.route('/')
def index():
    return 'Hello, World!'

@bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    account = Account(client)
    try:
        user = account.create(
            user_id='unique()', 
            email=data['email'],
            password=data['password'],
            name=data.get('username', '')  
        )
        new_user = Users(username=data['username'], email=data['email'], password=data['password'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify(user), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    account = Account(client)
    try:
        session = account.create_email_password_session(
            email=data['email'],
            password=data['password']
        )
        jwt_token = session['$id']
        return jsonify({'jwt': jwt_token}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
    
login_required
@bp.route('/users', methods=['GET'])
@login_required
def get_users():
    users = Users.query.all()
    return jsonify([user.username for user in users])
