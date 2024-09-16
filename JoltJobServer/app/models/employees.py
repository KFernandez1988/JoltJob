from app import db
from sqlalchemy.types import JSON
from datetime import datetime

class Employee(db.Model):
    __tablename__ = 'employee'

    id = db.Column(db.Integer, primary_key=True)  
    fullname = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=False, nullable=False)
    phone = db.Column(db.String(120), unique=False, nullable=False)
    skills = db.Column(JSON, nullable=False)  
    peersrate = db.Column(db.Integer, nullable=True)  
    hiredate = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)  
    jobposition = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Employee {self.fullname}>'
