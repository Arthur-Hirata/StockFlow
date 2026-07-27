from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.Cadastro import cadastro_bp
from routes.Logs import *
from routes.Products import *
from routes.users import *

app = Flask(__name__)

CORS(app, 
     origins=["http://localhost:5173", "http://127.0.0.1:5173"],
     supports_credentials=True,
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"])

app.register_blueprint(auth_bp)
app.register_blueprint(cadastro_bp)




if __name__ == "__main__":
    app.run(debug=True)

    #PRA FICAR MAIS RÁPIDO DEIXA O DEBUG COMO FALSE