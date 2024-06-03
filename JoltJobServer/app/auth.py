import os
from appwrite.client import Client
from appwrite.services.account import Account
from appwrite.exception import AppwriteException  # Import the exception class
from flask import request, jsonify

client = Client()

client.set_endpoint(os.getenv('APPWRITE_ENDPOINT'))
client.set_project(os.getenv('APPWRITE_PROJECT_ID'))
client.set_key(os.getenv('APPWRITE_API_KEY'))

def verify_token():
    account = Account(client)
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        jwt_token = auth_header.split(' ')[1]
        try:
            client.set_jwt(jwt_token) 
            user = account.get()  
            if user:
                return user
        except AppwriteException as e: 
            print(f"AppwriteException during token verification: {e}")
            return None
        except Exception as e:  # Catch other exceptions
            print(f"Exception during token verification: {e}")
            return None
    else:
        print("Authorization header missing or malformed")
    return None

def login_required(f):
    def decorated_function(*args, **kwargs):
        user = verify_token()
        if user is None:
            return jsonify({'message': 'Authentication is required!'}), 401
        return f(*args, **kwargs)
    return decorated_function
