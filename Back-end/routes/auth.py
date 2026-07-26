import sqlite3
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import os
import json
from dotenv import load_dotenv
import jwt
import datetime
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from pathlib import Path
from datetime import datetime, timedelta, timezone
auth_bp = Blueprint('auth', __name__)

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
SECRET_KEY = os.getenv("SECRET_KEY")

@auth_bp.route('/verifyToken', methods=['GET'])
def validarToken():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify ({"mensagem" : "token not sent"})
    try:
        token = auth_header.split(" ", 1)[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return jsonify({
            "mensagem" : "validy token"
        }), 200
    except jwt.ExpiredSignatureError:
        return (jsonify({"mensagem": "expired token"}), 401)
    except jwt.InvalidTokenError:
        return  (jsonify({"mensagem": "invalid token"}), 401)

@auth_bp.route('/loginUser', methods=['POST'])
def loginUser():
    dados=request.json
    email = dados.get('email')
    senha = dados.get('senha')

    try:
        db_path = os.getenv("DATABASE_PATH")
        if not db_path:
            return jsonify({"mensagem": "Banco de dados não configurado"}), 500
            
        conexao = sqlite3.connect(db_path)
        cursor = conexao.cursor()

        cursor.execute("SELECT id, password, nome, role FROM users WHERE email= ?", (email,))
        result = cursor.fetchone()
        conexao.close()
        
        if not result:
            return jsonify({"mensagem": "Usuário não encontrado"}), 401
        
        id_user, user_password, user_name, user_role = result

        if check_password_hash(user_password, senha):
            payload ={
                'sub' : str(id_user),
                'nome' : user_name,
                'role' : user_role,
                'exp' : datetime.now(timezone.utc) + timedelta(hours=48)
            }
            token_JWT = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

            return jsonify({"mensagem": "Login bem-sucedido", "token_JWT" : token_JWT}),200
        else:
            return jsonify({"mensagem" : "Senha Incorreta"}), 401
    except sqlite3.Error as e:
        print(f"Erro SQLite: {e}")
        return jsonify({"mensagem" : "Erro ao conectar ao banco"}), 500
    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({"mensagem" : "Erro interno"}), 500

