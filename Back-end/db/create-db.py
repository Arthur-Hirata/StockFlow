import sqlite3
from werkzeug.security import generate_password_hash
from pathlib import Path
import sqlite3

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "database" / "stockflow.db"

conexao = sqlite3.connect(DB_PATH)
cursor = conexao.cursor()
cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               nome TEXT NOT NULL,
               email TEXT NOT NULL UNIQUE,
               password TEXT NOT NULL, 
               role TEXT NOT NULL DEFAULT 'user',
               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
               )

    ''')
cursor.execute('''
        CREATE TABLE IF NOT EXISTS products(
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               name TEXT NOT NULL UNIQUE,
               image TEXT NOT NULL, 
               price REAL NOT NULL,
               amount INTEGER NOT NULL,
               low_amount INTEGER NOT NULL
               )
''')
cursor.execute('''
    CREATE TABLE IF NOT EXISTS sales (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               total_price REAL NOT NULL,
               seller_id INTEGER NOT NULL,
               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
               )
''')
cursor.execute('''
    CREATE TABLE IF NOT EXISTS sale_items (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               sale_id INTEGER,
               product_id INTEGER,
               amount INTEGER NOT NULL,
               unit_price REAL NOT NULL           
               )
''')
cursor.execute('''
    CREATE TABLE IF NOT EXISTS logs (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               user_id INTEGER,
               action TEXT NOT NULL,
               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
               )
''')
conexao.commit()
conexao.close()