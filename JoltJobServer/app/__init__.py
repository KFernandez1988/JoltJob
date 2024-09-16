from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
app = Flask(__name__)
app.config['DEBUG'] = True 
app.config['PROPAGATE_EXCEPTIONS'] = True  
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def create_app(config_filename=None):
    if config_filename:
        app.config.from_pyfile(config_filename)
    else:
        app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    from app.routes import bp as routes_bp
    app.register_blueprint(routes_bp)

    with app.app_context():
        db.create_all()

    return app
