import sqlite3
import os
from dotenv import load_dotenv
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
SECRET_KEY = os.getenv("SECRET_KEY")

def LogProduto(user_name, id_user, id_produto, activity, reason =None):
    db_path = os.getenv("DATABASE_PATH")
    if not db_path:
        return False

    try:
        conexao = sqlite3.connect(db_path)
        cursor = conexao.cursor()
        if not reason:
            action = f"O usuário {user_name}(ID{id_user}) {activity} o produto {id_produto}"
        if reason:
            action = f"O usuário {user_name}(ID{id_user}) {activity} o produto {id_produto}, devivo {reason}"

        cursor.execute("INSERT INTO logs (user_id, action) VALUES(?,?)", (id_user, action))
        conexao.commit() 
        conexao.close()
        return True
    except sqlite3.Error:
        return False



