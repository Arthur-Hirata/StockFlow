import sqlite3
from flask import Blueprint, request, jsonify
import os
import json
from dotenv import load_dotenv
import jwt
import datetime
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from pathlib import Path
from datetime import datetime, timedelta, timezone
cadastro_bp = Blueprint("cadastro", __name__)

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
SECRET_KEY = os.getenv("SECRET_KEY")

from routes.Logs import LogProduto
db_path = os.getenv("DATABASE_PATH")

@cadastro_bp.route("/product", methods=['POST'])
def addProduct():
    dados = request.json
    name = dados.get('name')
    price =dados.get('price')
    low_amount = dados.get('low_amount')
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
        if not db_path:
            return jsonify({"mensagem" : "Banco não encontrado"}), 500
        conexao = sqlite3.connect(db_path)
        cursor = conexao.cursor()
        cursor.execute("INSERT INTO products (name, price, amount, low_amount, image) VALUES (?,?,?,?,?)", (name, price, amoutn, low_amount, image))
        
        conexao.commit()
        id_produto = cursor.lastrowid
        conexao.close()
        activity = "adicionou"
        logSuccesso =LogProduto(nome, id_user, id_produto, activity)
        if not logSuccesso:
            return jsonify({"mensagem" : "Produto adcionando, mas houve uma falha no sistema de logs"}), 201
        return jsonify({"mensagem" : "Produto adcionando com sucesso"}), 200



    except sqlite3.Error as e:
        print(e)
        return jsonify({"mensagem" : "Erro ao adicionar produto"}), 500
    
@cadastro_bp.route("/product/<int:id>", methods=["DELETE"])
def deleteProduct(id):
    dados = request.json
    reason = dados.get("reason")
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"mensagem" : "Usuário não loggado"}), 404
    try :
        token = auth_header.split(" ", 1)[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        nome = payload['nome']
        id_user = payload['sub']
    except jwt.ExpiredSignatureError:
        return jsonify({"mensagem" : "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"mensagem" : "Token inválido"}), 401
    try :
        conexao = sqlite3.connect(db_path)
        cursor = conexao.cursor()
        cursor.execute("DELETE FROM products WHERE id=?", (id, ))
        conexao.commit()
        conexao.close()
        activity = "removeu"
        LogSucesso = LogProduto(nome, id_user, id, activity, reason)
        if not LogSucesso :
            return jsonify({"mensagem" : "Log não adicionado"}), 201
        return jsonify({"mensagem" : "Produto removido"})
    except sqlite3.Error as e:
        print (e)
        return jsonify({"mensagem" : "Erro ao remover produto"}), 500

@cadastro_bp.route('/product/<int:id>', methods=['PATCH'])
def editProduct(id):
    dados = request.json
    field = dados.get('field')
    edicao = dados.get('edicao')
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"mensagem" : "Usuário não loggado"}), 404
    try :
        token = auth_header.split(" ", 1)[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        nome = payload['nome']
        id_user = payload['sub']
    except jwt.ExpiredSignatureError:
        return jsonify({"mensagem" : "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"mensagem" : "Token inválido"}), 401
    permitidos = {
        'name',
        'price',
        'low_amount',
        'image'
    }
    if field not in permitidos :
        return jsonify({"mensagem" : "Campo inválido"}), 400
    try :
        conexao = sqlite3.connect(db_path)
        cursor= conexao.cursor()
        sql = f"UPDATE products SET {field} =? WHERE id=?"
        cursor.execute(sql, (edicao,id))
        conexao.commit()
        conexao.close()
        activity = "editou"
        Logsucesso = LogProduto(nome, id_user, id, activity)
        if not Logsucesso:
            return jsonify({"mensagem" : "Log não adicionado"}), 201
        return jsonify({"mensagem" : "Produto editado com sucesso"}), 200
    except sqlite3.Error as e:
        print(e)
        return jsonify({"mensagem" : "Erro ao editar produto"}), 500
