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
        if selected == "users":
            cursor.execute("SELECT id, nome, email, role, created_at FROM users ")
        else:
            cursor.execute(f"SELECT * FROM {selected}")
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
            conexao.close()
        return jsonify({"mensagem" : "Erro no banco de dados"}), 500

@data_bp.route('/getDashboard', methods=['GET'])
def pegarDashboard():
    conexao = None
    try:
        conexao =sqlite3.connect(db_path)
        cursor = conexao.cursor()
        cursor.execute("SELECT COUNT(*) FROM sales WHERE DATE(created_at) = DATE('now')")
        daily_sales = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM sales WHERE DATE(created_at) = DATE('now', '-1day')")
        last_day_sales = cursor.fetchone()[0]

        if last_day_sales > 0:
            daily_precentage = ((last_day_sales-daily_sales) / last_day_sales) *100
        else :
            daily_precentage = 0



        cursor.execute("SELECT COUNT(*) FROM sales WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')")
        month_sales = cursor.fetchone()[0]

        cursor.execute("SELECT COALESCE(SUM(total_price), 0) FROM sales WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')")
        month_revenue = cursor.fetchone()[0]

        cursor.execute('''
        SELECT
            p.id,
            p.name,
            SUM(si.amount) as total_vendido
        FROM sale_items si
        JOIN products p ON p.id = si.product_id
        GROUP BY p.id, p.name
        ORDER BY total_vendido DESC
        LIMIT 5            
            ''')
        rows = cursor.fetchall()
        top_products =[
            {"nome" : row[1], "quantidade" : row[2]}
            for row in rows
        ]
        cursor.execute('''
        SELECT
            u.id,
            u.nome,
            SUM(si.total_price) as total_vendido
        FROM sales si
        JOIN users u ON u.id = si.seller_id
        GROUP BY u.id, u.nome
        ORDER BY total_vendido DESC
        LIMIT 5
''')
        rows_users = cursor.fetchall()
        top_users =[
                    {'id' : row[0], 'nome' : row[1], "valor" : row[2]}
                    for row in rows_users
        ]
        return jsonify({"mensagem" : "Busca concluida", "daily_sales" : daily_sales, 'daily_precentage' : daily_precentage, 'month_sales' : month_sales, 'month_revenue' : month_revenue, 'top_products' : top_products, 'top_users' : top_users}),200
    except sqlite3.Error as e:
        print(e)
        return jsonify({"mensagem" : "Erro no banco de dados"}), 500