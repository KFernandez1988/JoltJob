import pickle
import pandas as pd


with open('app/matching_companies.pkl', 'rb') as file:
    model = pickle.load(file)

print(model)

companies_df = pd.read_csv('guaynabo_businesses_100.csv')



