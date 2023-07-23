
from flask import Flask

import pickle 
import numpy as np

app = Flask(__name__)

# Hardcoded data
obstructive_hcm = 0
gender = 1
syncope = 0
dyspnea = 0
fatigue = 0
presyncope = 0
nyha_class = 0
atrial_fibrillation = 0
hypertension = 0
beta_blocker = 0
ca_channel_blockers = 0
acei_arb = 0
coumadin = 0
max_wall_thick = 50
septal_anterior_motion = 0
mitral_regurgitation = 0
ejection_fraction = 75

@app.route("/predict")
def predict():
    # Load model
    with open('./hf_predict_model.pkl', 'rb') as file: 
        clf_loaded = pickle.load(file)
        
    # Make prediction    
    input_vars = [obstructive_hcm, gender, syncope,dyspnea, fatigue, presyncope, nyha_class, atrial_fibrillation, hypertension, beta_blocker, ca_channel_blockers, acei_arb, coumadin, max_wall_thick, septal_anterior_motion, mitral_regurgitation, ejection_fraction]
    score = clf_loaded.predict_proba(np.reshape(input_vars,(1,-1)))
    percentage = 100 * score[0,1]
    
    return f"Prediction complete! Percentage: {percentage}"

if __name__ == "__main__":
    app.run(debug=True)
