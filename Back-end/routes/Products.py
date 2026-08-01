import sqlite3
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import jwt

from pathlib import Path
products_bp = Blueprint('products', __name__)

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
SECRET_KEY = os.getenv("SECRET_KEY")

db_path = os.getenv("DATABASE_PATH")

from routes.Logs import LogMovimentacoes

@products_bp.route('/getProducts', methods=['GET'])
def pegarProdutos():
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
        conexao = sqlite3.connect(db_path)
        cursor = conexao.cursor()
        cursor.execute("SELECT * FROM products")
        result = cursor.fetchall()
        conexao.commit()
        conexao.close()
        products_list = []
        for product in result:
            products_list.append({
                'id' : product[0],
                'nome' : product[1],
                'preco' : product[2],
                'quantidade' : product[3],
                'quantidade_minima' : product[4],
                'imagem' : product[5]
            })

        low_amount_products=[]

        for product in products_list:
            if product['quantidade'] < product['quantidade_minima']:
                low_amount_products.append(product)

        
        return jsonify({"mensagem" : "Busca concluida com sucesso", "products_list" : products_list, 'low_amount_products': low_amount_products}), 200
    except sqlite3.Error as e:
        if conexao:
            conexao.close()
        print(e)
        return jsonify({"mensagem" : "Erro no banco de dados"}), 500

@products_bp.route("/getAmountProducts", methods=["GET"])
def pegarQuantidadeProdutos():
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
        with sqlite3.connect(db_path) as conexao:
            cursor= conexao.cursor()
            cursor.execute("SELECT * FROM products WHERE quantidade > 0")
            result = cursor.fetchall()
            
        products_list = []
        for product in result:
            products_list.append({
                'id' : product[0],
                'nome' : product[1],
                'quantidade' : product[3]
            })
        return jsonify({"mensagem" : "Busca bem sucedida", "AmountProducts" : products_list}),200
    except sqlite3.Error as e:
        print(e)
        return jsonify({"mensagem" : "Erro no banco de dados"}), 500

@products_bp.route("/addProducts/<int:id>", methods=['PATCH'])
def adcProdutos(id):
    dados = request.json
    quantidade = dados.get("quantity")
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
        with sqlite3.connect(db_path) as conexao:
            cursor = conexao.cursor()
            cursor.execute("UPDATE products SET amount = amount + ? WHERE id =? ", (quantidade, id))

        logSucesso = LogMovimentacoes(nome, id_user, id, quantidade)
        if not logSucesso:
            return jsonify({"mensagem" : "Log não adicionado"}), 201
        return jsonify({"mensagem" : "Alteração bem sucedida "}),200
    except sqlite3.Error as e:
        print(e)
        return jsonify({"mensagem" : "Erro no banco de dados"}), 500
