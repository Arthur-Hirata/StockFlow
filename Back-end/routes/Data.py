import sqlite3
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import jwt

from pathlib import Path
data_bp = Blueprint('data', __name__)

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
SECRET_KEY = os.getenv("SECRET_KEY")

db_path = os.getenv("DATABASE_PATH")

@data_bp.route("/getData/<string:selected>", methods=['GET'])
def pegarDados(selected):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return ({"mensagem" : "Usuário não loggado"}), 401
    try:
        token = auth_header.split(" ", 1)[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        nome = payload['nome']
        id_user = payload['sub']
        role = payload['role']
        if role != "admin":
            return jsonify({"mensagem" : "Acess denied"}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({"mensagem" : "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"mensagem" : "Token inválido"}), 401
    conexao = None
    permitidas ={
        'logs',
        'products',
        'users',
        'sales'
    }
    if selected not in permitidas:
        return jsonify({"mensagem" : "Campo não permitido"}), 400
    try:
        conexao = sqlite3.connect(db_path)
        cursor = conexao.cursor()
        cursor.execute(f"SELECT * FROM ${selected}")
        columns =[col[0] for col in cursor.description]
        table =[
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]
        conexao.close()
        return jsonify({"mensagem" : "Busca concluida", "tabela" : table}), 200
    except sqlite3.Error as e:
        print(e)
        if conexao:
            conexao.commit()
        return jsonify({"mensagem" : "Erro no banco de dados"}), 500

