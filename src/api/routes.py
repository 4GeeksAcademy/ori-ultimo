"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint, current_app
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash
from datetime import timedelta
from api.models import db, User

import json




api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/singup', methods=['POST'])
def create_user():
    body = json.loads(request.data)

    new_user = User(
        name = body['name'],
        email = body['email'],
        password = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8'),
    )
    db.session.add(new_user)
    db.session.commit()
  
    return jsonify({"msg": "User created succesfull"}), 200


@api.route('/login/user', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"Error": "Email and Password are required"}), 400

        
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"Error": "Invalid Email"}), 400

        valid_password = current_app.bcrypt.check_password_hash(user.password, password)
        if valid_password is False: 
            return jsonify({"Error": "Invalid Password"}), 400


        access_token = create_access_token(identity=email)

        return jsonify({
            "access_token": access_token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        }), 200

    except Exception as e:
        return jsonify({"Error": "Internal Server Error", "msg": str(e)}), 500
    
@api.route("/private/user", methods=["GET"])
@jwt_required()

def get_user_data():
    current_user_id = get_jwt_identity()
    
    if current_user_id:
        user = User.query.all()
        list_user = []

    for users in user:
        user_dict = {
            "id": users.id,
            "email": users.email,
            "name": users.name
        }
        list_user.append(user_dict)
        return jsonify({"user": list_user}), 200
    
    else:
        return jsonify({"Error": "Token invalid or not exits"}), 401
    
  

