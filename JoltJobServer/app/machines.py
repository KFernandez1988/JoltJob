import pandas as pd
import numpy as np
import pickle
import os
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from os.path import join, dirname, realpath

script_dir = os.path.dirname(os.path.abspath(__file__))
data_df = file_path = os.path.join(script_dir, "guaynabo_businesses_1000_recreated.csv")
model_file = file_path = os.path.join(script_dir, "matching_companies_knn.pkl")

companies_df = pd.read_csv(data_df)

with open(model_file, "rb") as file:
    model = pickle.load(file)

imputer = SimpleImputer(strategy='most_frequent')
df_imputed = pd.DataFrame(imputer.fit_transform(companies_df), columns=companies_df.columns)

categorical_columns =['hire_rate', 'type', 'positive_value_1', 'positive_value_2', 'positive_value_3', 
                       'negative_value_1', 'negative_value_2', 'negative_value_3', 'industry']

encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
encoded_features = encoder.fit_transform(df_imputed[categorical_columns])

def company_matching_reader(user_input):
    user_input_df = pd.DataFrame([user_input], columns=categorical_columns)

    user_input_encoded = encoder.transform(user_input_df[categorical_columns])


    predictions = model.predict_proba(user_input_encoded)

    top_3_indices = np.argsort(predictions[0])[-3:][::-1]
    top_3_companies = model.classes_[top_3_indices]
    top_3_scores = predictions[0][top_3_indices]

    companies_list = []
    for company, score in zip(top_3_companies, top_3_scores):
       companies_list.append({'company': company, 'score': round(score * 100) })

    return companies_list

# print(companyMatchingReader({
#     'hire_rate': 'Medium',
#     'type': 'Healthcare',   
#     'positive_value_1': 'Convenient',
#     'positive_value_2': 'Fast',
#     'positive_value_3': 'Compassionate',
#     'negative_value_1': 'Costly',
#     'negative_value_2': 'Limited',
#     'negative_value_3': 'Unsafe',
#     'industry': 'Healthcare'
# }))
