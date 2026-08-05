import sqlite3
from flask import Blueprint, request, jsonify, json
from flask_cors import CORS
import os
from dotenv import load_dotenv
import jwt

from pathlib import Path
sales_bp = Blueprint('sale', __name__)

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
SECRET_KEY = os.getenv("SECRET_KEY")

db_path = os.getenv("DATABASE_PATH")

from routes.Logs import LogVendas

@sales_bp.route('/sale', methods=['POST'])
def saleRegister():
    dados = request.json
    sale_list = dados.get("sale_list")
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
    conexao = None
    try:
        final_price = 0
        conexao = sqlite3.connect(db_path)
        cursor = conexao.cursor()
        cursor.execute("SELECT id, price FROM products")
        products ={
            row[0] : row[1]
            for row in cursor.fetchall()
        }
        for item in sale_list:
            price = products[item['id']]
            final_price += price * item["quantity"]



        cursor.execute("INSERT INTO sales (total_price, seller_id) VALUES(?,?)", (final_price, id_user))
        id_venda = cursor.lastrowid

        for item in sale_list:
            unit_price = products[item["id"]]
            cursor.execute("INSERT INTO sale_items (sale_id, product_id, amount, unit_price) VALUES (?,?,?,?)", (id_venda, item['id'], item['quantity'], unit_price))

        conexao.commit()
        baixaVendas(sale_list)
        logSucesso = LogVendas(nome, id_user, id_venda)
        if not logSucesso:
            return jsonify({"mensagem" : "Log não registrado"}), 201
        return jsonify({"mensagem" : "Venda cadastrada com sucesso"}), 200
    except sqlite3.Error as e:
        if conexao:
            conexao.rollback()
        return jsonify({"mensagem" : "Erro no banco de dados"}), 500


def baixaVendas(sale_list):
    conexao = None
    try:
        conexao = sqlite3.connect(db_path)
        cursor = conexao.cursor()
        for item in sale_list:
            cursor.execute("UPDATE products SET amount = amount - ? WHERE id=?", (item['quantity'], item['id']))

        conexao.commit()
        conexao.close()

    except sqlite3.Error as e:
        if conexao:
            conexao.rollback()



