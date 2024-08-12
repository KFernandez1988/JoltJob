from app import db

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)
    location = db.Column(db.String(120), nullable=True)
    experienceLevel = db.Column(db.String(120), nullable=False)
    jobType = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Users {self.fullname}>'

