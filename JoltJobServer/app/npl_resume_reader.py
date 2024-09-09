import spacy
import re
import pdfplumber

nlp = spacy.load('en_core_web_sm')

def extract_entities(text):
    doc = nlp(text)

    extracted_info = {
        'Name': None,
        'Email': None,
        'Phone': None,
        'Skills': [],
        'Education': [],
        'Experience': []
    }
    
    for ent in doc.ents:
        if ent.label_ == 'PERSON' and extracted_info['Name'] is None:
            extracted_info['Name'] = ent.text

    # Regular expressions for email and phone number
    email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    phone_pattern = r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'

    email = re.findall(email_pattern, text)
    phone = re.findall(phone_pattern, text)

    extracted_info['Email'] = email[0] if email else None
    extracted_info['Phone'] = phone[0] if phone else None

    # Simple skill extraction (can be improved by using a skill keyword list or model)
    skills_keywords = ['Python', 'Java', 'JavaScript', 'SQL', 'Machine Learning', 'AI', 'NLP']
    for token in doc:
        if token.text in skills_keywords:
            extracted_info['Skills'].append(token.text)
    
    return extracted_info



# file_path = '../uploads/Development Resumé- Kevin Fernandez.pdf'

# try:
#     with pdfplumber.open(file_path) as pdf:
#         text = ""
#         for page in pdf.pages:
#             text += page.extract_text()

#     info = extract_entities(text)
#     print(info)

# except Exception as e:
#     print(f"Error reading PDF: {e}")

resume_text = """John Doe
Phone: 123-456-7890
 johndoe@example.com
Experienced in Python, JavaScript, and Machine Learning, AIs. 
"""
info = extract_entities(resume_text)
print(info)
