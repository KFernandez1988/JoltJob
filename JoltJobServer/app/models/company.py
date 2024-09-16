from app import db
from sqlalchemy.types import JSON
from datetime import datetime

class Company(db.Model):
    __tablename__ = 'company'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    vision = db.Column(db.Text, nullable=False)
    mission = db.Column(db.Text, nullable=False)
    goals = db.Column(JSON, nullable=False)
    values = db.Column(JSON, nullable=False)
    headquarters = db.Column(db.String(120), nullable=False)
    established = db.Column(db.Integer, nullable=False)
    employee_count = db.Column(db.Integer, nullable=False)
    industry = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    website = db.Column(db.String(120), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f'<Company {self.name}>'
