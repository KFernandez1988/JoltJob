class Config:
    SQLALCHEMY_DATABASE_URI = f'postgresql://postgres:admin@localhost:5432/joltjob'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = f'esto_es_un_secreto'

