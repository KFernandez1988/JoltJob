from functools import wraps
from flask import request, jsonify
from app import app
import datetime
import jwt  

def generate_token(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token

def decode_token(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        print('Decoded payload:', payload)
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        print("Error: Token has expired")
        return None
    except jwt.InvalidTokenError as e:
        print(f"Error: Invalid token - {str(e)}")
        return None
    except Exception as e:
        print(f"Error: {str(e)}")
        return None

def login_required(f):
    @wraps(f)  
    def decorated_function(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]  
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        user_id = decode_token(token)
        if not user_id:
            return jsonify({'error': 'Token is invalid or expired!'}), 401
        return f(user_id, *args, **kwargs)
    return decorated_function
