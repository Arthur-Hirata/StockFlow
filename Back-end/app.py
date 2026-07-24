from flask import Flask

app = Flask(__name__)
from routes.auth import *
from routes.Cadastro import *
from routes.Logs import *
from routes.Products import *
from routes.users import *

if __name__ == "__main__":
    app.run(debug=True)