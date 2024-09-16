import spacy
import re
import pdfplumber

nlp = spacy.load('en_core_web_sm')

def resume_parser(text, needed_skills, needed_education):
    doc = nlp(text)

    extracted_info = {
        'Name': None,
        'Email': None,
        'Phone': None,
        'Skills': [],
        'Education': '',
        'Experience': ''
    }
    
    resume_keywords = ['phone', 'email', 'contact', 'education', 'experience']

    for ent in doc.ents:
        if ent.label_ == 'PERSON' and extracted_info['Name'] is None:
            extracted_info['Name'] = ent.text.split('\n')[0].rstrip()

    
    email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    phone_pattern = r'(\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'

    email = re.findall(email_pattern, text)
    phone = re.findall(phone_pattern, text)

    extracted_info['Email'] = email[0] if email else None
    extracted_info['Phone'] = phone[0] if phone else None

  
    # skills_keywords = ['Python', 'Java', 'JavaScript', 'SQL', 'Machine Learning', 'AI', 'NLP']

    for token in doc:
     for skill in needed_skills:
        if skill.lower() in token.text.lower():
            extracted_info['Skills'].append((skill))
            break

    extracted_info['Skills'] = list(set(extracted_info['Skills']))


    # education_keywords = ['education','educacion', 'qualifications', 'academic', 'degree', 'bachelor', 'bachillerato', 'master', 'phd', 'university', 'college']
    experience_keywords = ['experience', 'empleos', 'work experience', 'employment', 'career', 'projects', 'professional experience']


    lines = text.split('\n')
    
    in_education_section = False
    in_experience_section = False

    for line in lines:

        line_lower = line.lower().strip()

        # print(line_lower)

        if any(keyword in line_lower for keyword in needed_education):
            in_education_section = True
            in_experience_section = False
            continue

        if any(keyword in line_lower for keyword in experience_keywords):
            in_experience_section = True
            in_education_section = False
            continue

        if in_education_section:
            extracted_info['Education'] += line + '\n'

        if in_experience_section:
            extracted_info['Experience'] += line + '\n'

    
    return extracted_info



file_path = '../uploads/Development Resumé- Kevin Fernandez.pdf'

# try:
#     with pdfplumber.open(file_path) as pdf:
#         text = ""
#         for page in pdf.pages:
#             text += page.extract_text()

#     info = extract_entities(text)
#     print(info)

# except Exception as e:
#     print(f"Error reading PDF: {e}")

# resume_text = """John Doe 
# Phone: 123-456-7890
#  johndoe@example.com
# Experienced in Python, JavaScript, and Machine Learning, AIs. 
# """
# info = extract_entities(resume_text)
# print(info)
