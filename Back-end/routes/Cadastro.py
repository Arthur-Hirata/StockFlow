import sqlite3
from flask import Flask, request, jsonify
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
app= Flask(__name__)
CORS(app, 
     origins=["http://localhost:5173", "http://127.0.0.1:5173"],
     supports_credentials=True,
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"])

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
SECRET_KEY = os.getenv("SECRET_KEY")

from routes.Logs import LogProduto

@app.route("/addProduct", methods=['POST'])
def addProduct():
    dados = request.json
    name = dados.get('name')
    price =dados.get('price')
    low_amoutn = dados.get('low_amount')
    image = dados.get('image')
    amoutn = 0
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return ({"mensagem" : "Usuário não loggado"}), 401
    try:
        token = auth_header.split(" ", 1)[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        nome = payload['nome']
        id_user = payload['sub']
    except jwt.ExpiredSignatureError:
        return jsonify({"mensagem" : "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"mensagem" : "Token inválido"}), 401
    try :
        db_path = os.getenv("DATABASE_PATH")
        if not db_path:
            return jsonify({"mensagem" : "Banco não encontrado"}), 500
        conexao = sqlite3.connect(db_path)
        cursor = conexao.cursor()
        cursor.execute("INSERT INTO products (name, price, amount, low_amount, image) VALUES (?,?,?,?,?)", (name, price, amoutn, low_amoutn, image))
        
        conexao.commit()
        id_produto = cursor.lastrowid
        conexao.close()
        activity = "adicionou"
        logSuccesso =LogProduto(nome, id_user, id_produto, activity)
        if not logSuccesso:
            return jsonify({"mensagem" : "Produto adcionando, mas houve uma falha no sistema de logs"}), 201
        return jsonify({"mensagem" : "Produto adcionando com sucesso"}), 200



    except sqlite3.Error as e:
        return jsonify({"mensagem" : "Erro ao adicionar produto"}), 500
    
