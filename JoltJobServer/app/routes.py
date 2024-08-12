from flask import Blueprint, jsonify, request, render_template, session
from app.auth import generate_token, login_required
from app import db, app
from app.models import Users
from flask_bcrypt import Bcrypt, check_password_hash

bp = Blueprint('main', __name__)
bcrypt = Bcrypt(app)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    print(data)

    user = Users.query.filter_by(email=email).first()
    if user:
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = Users(fullname=data.get('name'), email=email, password=hashed_password, location=data.get('location'), jobType=data.get('jobType'), experienceLevel=data.get('experienceLevel'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email and password are required'}), 400

    user = Users.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password, data['password']):
        token = generate_token(user) 
        return jsonify({'token': token}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 400


@bp.route('/users', methods=['GET'])
@login_required
def get_users(logged_in_user_id):
    users = Users.query.all()
    return jsonify([user.fullname for user in users])
