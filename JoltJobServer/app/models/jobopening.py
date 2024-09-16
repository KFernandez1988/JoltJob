from app import db
from sqlalchemy.types import JSON
from datetime import datetime

class JobOpening(db.Model):
    __tablename__ = 'job_opening'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    min_years_exp = db.Column(db.Integer, nullable=False) 
    requirement = db.Column(db.Text, nullable=False)
    skills = db.Column(JSON, nullable=False)
    education = db.Column(db.String(120), nullable=False)
    details = db.Column(db.Text, nullable=False)
    benefits = db.Column(JSON, nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    min_pay = db.Column(db.Integer, nullable=False)
    max_pay = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<JobOpening {self.title}>'
