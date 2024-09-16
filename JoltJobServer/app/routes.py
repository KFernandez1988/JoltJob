from flask import Blueprint, jsonify, request, render_template, session
from app.auth import generate_token, login_required
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from app import db, app
from app.models.user import Users
from app.models.employees import Employee
from app.models.candidates import Candidates
from app.models.jobopening import JobOpening
from app.models.company import Company
from app.machines import company_matching_reader
import app.npl_resume_reader as npl
import pdfplumber 
from flask_bcrypt import Bcrypt, check_password_hash
import os

bp = Blueprint('main', __name__)
bcrypt = Bcrypt(app)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    print(data)

    user = Users.query.filter_by(email=email).first()
    if user:
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = Users(fullname=data.get('name'), email=email, password=hashed_password, location=data.get('location'), jobType=data.get('jobType'), experienceLevel=data.get('experienceLevel'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email and password are required'}), 400

    user = Users.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password, data['password']):
        token = generate_token(user) 
        return jsonify({'token': token}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 400


@bp.route('/users', methods=['GET'])
@login_required
def get_users(logged_in_user_id):
    users = Users.query.all()
    return jsonify([user.fullname for user in users])

@bp.route('/matching', methods=['POST'])
@login_required
def match_user_with_companies(logg):
    body = request.get_json()
    print(body)
    try:
        result = company_matching_reader(body)
        return jsonify(result)
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500
    
@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        job_id = request.form.get('job_id')

        if not job_id:
            return jsonify({"error": "Job ID is required"}), 400

        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if not os.path.exists('./uploads/'):
            os.makedirs('./uploads/')

        filepath = os.path.join('./uploads/', file.filename)
        file.save(filepath)

        job = JobOpening.query.filter_by(id=job_id).first()

        if not job:
            return jsonify({"error": "Job not found"}), 404

        try:
            with pdfplumber.open(filepath) as pdf:
                text = ""
                for page in pdf.pages:
                    text += page.extract_text()

                    extracted_info = npl.resume_parser(text, job.skills, job.education)

        except Exception as e:
            print(f"Error reading PDF: {e}")
            return jsonify({"error": f"Error reading PDF: {str(e)}"}), 500

        candidates = Candidates(
            fullname=extracted_info.get('Name'),
            email=extracted_info.get('Email'),
            phone=extracted_info.get('Phone'),
            skills=extracted_info.get('Skills'),
            education=extracted_info.get('Education'),
            experience=extracted_info.get('Experience'),
            jobposition=job.title,
            status='reviewing'
        )

        db.session.add(candidates)
        db.session.commit()

        return jsonify({"message": "File uploaded successfully", "filepath": filepath}), 200

    except Exception as e:
        print(f"Error during upload: {e}")
        return jsonify({"error": f"Error during upload: {str(e)}"}), 500


@bp.route('/jobopenings', methods=['POST'])
def create_job_opening():
    try:
        data = request.get_json()

        required_fields = ['title', 'requirement', 'skills', 'yearsExp','education', 'details', 'benefits', 'minPay', 'maxPay']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f"'{field}' is required"}), 400

        try:
            min_year_exp = int(data.get('yearsExp'))
            min_pay = int(data.get('minPay'))
            max_pay = int(data.get('maxPay'))
        except ValueError:
            return jsonify({'error': "'yearsExp', 'minPay', and 'maxPay' must be valid integers"}), 400

        job = JobOpening(
            title=data.get('title'),
            requirement=data.get('requirement'),
            skills=data.get('skills'),
            education=data.get('education'),
            min_years_exp=min_year_exp,
            details=data.get('details'),
            benefits=data.get('benefits'), 
            min_pay=min_pay,
            max_pay=max_pay
        )
        
        db.session.add(job)
        db.session.commit()

        return jsonify({'message': 'Job opening created successfully'}), 201

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Integrity error occurred', 'details': str(e)}), 400
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error occurred', 'details': str(e)}), 500



def serialize_job(job):
    return {
        'id': job.id,
        'title': job.title,
        'requirement': job.requirement,
        'skills': job.skills, 
        'education': job.education,
        'min_years_exp': job.min_years_exp,
        'details': job.details,
        'benefits': job.benefits,  
        'min_pay': job.min_pay,
        'max_pay': job.max_pay,
        'created': job.created.strftime('%Y-%m-%d %H:%M:%S')  
    }

@bp.route('/jobopenings', methods=['GET'])
def get_job_openings():
    job_id = request.args.get('id')
    
    if job_id:
        job = JobOpening.query.filter_by(id=job_id).first()
        if not job:
            return jsonify({'error': 'Job not found'}), 404
        return jsonify(serialize_job(job)), 200

    jobs = JobOpening.query.all()
    return jsonify([serialize_job(job) for job in jobs]), 200

@bp.route('/company', methods=['POST'])
def create_or_edit_company():
    try:
        data = request.get_json()

        required_fields = ['name', 'vision', 'mission', 'goals', 'values', 'headquarters', 'established', 'employee_count', 'industry']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f"'{field}' is required"}), 400

        existing_company = Company.query.first()

        if existing_company:

              data = request.get_json()
              existing_company.name = data.get('name', existing_company.name)
              existing_company.vision = data.get('vision', existing_company.vision)
              existing_company.mission = data.get('mission', existing_company.mission)
              existing_company.goals = data.get('goals', existing_company.goals)
              existing_company.values = data.get('values', existing_company.values)
              existing_company.headquarters = data.get('headquarters', existing_company.headquarters)
              existing_company.established = int(data.get('established', existing_company.established))
              existing_company.employee_count = int(data.get('employee_count', existing_company.employee_count))
              existing_company.industry = data.get('industry', existing_company.industry)
              existing_company.description = data.get('description', existing_company.description)
              existing_company.website = data.get('website', existing_company.website)

              db.session.commit()

              return jsonify({'message': 'Company updated successfully'}), 200

        company = Company(
            name=data.get('name'),
            vision=data.get('vision'),
            mission=data.get('mission'),
            goals=data.get('goals'),
            values=data.get('values'),
            headquarters=data.get('headquarters'),
            established=int(data.get('established')),
            employee_count=int(data.get('employee_count')),
            industry=data.get('industry'),
            description=data.get('description'),
            website=data.get('website')
        )

        db.session.add(company)
        db.session.commit()

        return jsonify({'message': 'Company created successfully'}), 201

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Integrity error occurred', 'details': str(e)}), 400
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error occurred', 'details': str(e)}), 500


@bp.route('/company', methods=['GET'])
def get_company():
    company = Company.query.first()
    if not company:
        return jsonify({'error': 'No company found'}), 404
    return jsonify(serialize_company(company)), 200

def serialize_company(company):
    return {
        'id': company.id,
        'name': company.name,
        'vision': company.vision,
        'mission': company.mission,
        'goals': company.goals,
        'values': company.values,
        'headquarters': company.headquarters,
        'established': company.established,
        'employee_count': company.employee_count,
        'industry': company.industry,
        'description': company.description,
        'website': company.website,
        'created_at': company.created_at.strftime('%Y-%m-%d %H:%M:%S')
    }