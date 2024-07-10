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
            return jsonify({"error": "Email and Password are required"}), 400

        # Buscar el usuario en la base de datos por email
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "Invalid Email"}), 400

        # Verificar la contraseña
        if not check_password_hash(user.password, password):
            return jsonify({"error": "Invalid Password"}), 400

        # Generar el token de acceso
        access_token = create_access_token(identity=user.id)

        return jsonify({
            "access_token": access_token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        }), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "msg": str(e)}), 500