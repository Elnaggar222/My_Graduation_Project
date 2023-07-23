from flask import Flask, request
import mysql.connector
import pickle 
import numpy as np

app = Flask(__name__)

conn = mysql.connector.connect(
    host="127.0.0.1",
    port="3306", 
    database="ourproject",
    user="root",
    password=""
)

cursor = conn.cursor()

@app.route("/predict")
def predict():
    query = "SELECT * FROM medical_reports"
    cursor.execute(query)
    results = cursor.fetchall()
    
    # Extract parameters from results
    obstructive_hcm = results[0][2] 
    gender = results[0][3] 
    syncope = results[0][4]  
    dyspnea = results[0][5]
    fatigue = results[0][6] 
    presyncope = results[0][7]  
    nyha_class = results[0][8]
    atrial_fibrillation = results[0][9]
    hypertension = results[0][10]
    beta_blocker = results[0][11]
    ca_channel_blockers = results[0][12] 
    acei_arb = results[0][13]
    coumadin = results[0][14]
    max_wall_thick = results[0][15]  
    septal_anterior_motion = results[0][16]
    mitral_regurgitation = results[0][17]
    ejection_fraction = results[0][18]
    hospital_id = results[0][19]
    patient_id = results[0][20]
    
    # Load model
    with open('./hf_predict_model.pkl', 'rb') as file: 
        clf_loaded = pickle.load(file)
        
    # Make prediction    
    input_vars = [obstructive_hcm, gender, syncope, dyspnea, fatigue, presyncope, nyha_class, atrial_fibrillation, hypertension, beta_blocker, ca_channel_blockers, acei_arb, coumadin, max_wall_thick, septal_anterior_motion, mitral_regurgitation, ejection_fraction]
    score = clf_loaded.predict_proba(np.reshape(input_vars,(1,-1)))
    percentage = 100 * score[0,1]
    
    # Insert into database
    query = "INSERT INTO medical_records (percentageofmodel, id, name, Hospital_id, patient_id, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, NOW(), NOW())"
    values = (percentage, results[0][0], results[0][1], hospital_id, patient_id)
    cursor.execute(query, values)
    conn.commit()
    
    return "Prediction complete!"

if __name__ == "__main__":
    app.run(debug=True)