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
app= Flask(__name__)
CORS(app, 
     origins=["http://localhost:5173", "http://127.0.0.1:5173"],
     supports_credentials=True,
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"])

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
SECRET_KEY = os.getenv("SECRET_KEY")








def validar_token(auth_header, mensagem_ausente="Token ausente!", mensagem_expirada="Token expirado!", mensagem_invalido="Token inválido!"):
    if not auth_header or " " not in auth_header:
        return None, (jsonify({"mensagem": mensagem_ausente}), 401)

    try:
        token = auth_header.split(" ", 1)[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload, None
    except jwt.ExpiredSignatureError:
        return None, (jsonify({"mensagem": mensagem_expirada}), 401)
    except jwt.InvalidTokenError:
        return None, (jsonify({"mensagem": mensagem_invalido}), 401)



@app.route('/loginUser', methods=['POST'])
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

        cursor.execute("SELECT id, senha, nome, role FROM users WHERE email= ?", (email,))
        result = cursor.fetchone()
        conexao.close()
        
        if not result:
            return jsonify({"mensagem": "Usuário não encontrado"}), 401
        
        id_user, user_password, user_name, user_role = result

        if check_password_hash(senha, user_password):
            payload ={
                'sub' : str(id_user),
                'nome' : user_name,
                'role' : user_role,
                'exp' : 48
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


if __name__ == '__main__':
    app.run(debug=True)