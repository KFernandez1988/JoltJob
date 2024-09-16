from sqlalchemy.types import JSON
from app import db

class Candidates(db.Model):
    __tablename__ = 'candidates'
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(80), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=False, nullable=True)
    phone = db.Column(db.String(120), unique=False, nullable=True)
    skills = db.Column(JSON, unique=False, nullable=True)
    experience = db.Column(db.String(120), unique=False, nullable=True)
    education = db.Column(db.String(120), nullable=True)
    jobposition = db.Column(db.String(120), nullable=True)
    status = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Candidates {self.fullname}>'