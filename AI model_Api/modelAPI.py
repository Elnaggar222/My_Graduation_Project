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
    obstructive_hcm = results[0][1] 
    gender = results[0][2] 
    syncope = results[0][3]  
    dyspnea = results[0][4]
    fatigue = results[0][5] 
    presyncope = results[0][6]  
    nyha_class = results[0][7]
    atrial_fibrillation = results[0][8]
    hypertension = results[0][9]
    beta_blocker = results[0][10]
    ca_channel_blockers = results[0][11] 
    acei_arb = results[0][12]
    coumadin = results[0][13]
    max_wall_thick = results[0][14]  
    septal_anterior_motion = results[0][15]
    mitral_regurgitation = results[0][16]
    ejection_fraction = results[0][17]
    
    # Load model
    with open('./hf_predict_model.pkl', 'rb') as file: 
        clf_loaded = pickle.load(file)
        
    # Make prediction    
    input_vars = [obstructive_hcm, gender, syncope, ..., ejection_fraction]
    score = clf_loaded.predict_proba(np.reshape(input_vars,(1,-1)))
    percentage = 100 * score[0,1]
    
    # Insert into database
    query = "INSERT INTO medical_records (percentageofmodel, Hospital_id, patient_id) VALUES (%s, %s, %s)"
    values = (percentage, results[0][18], results[0][19])
    cursor.execute(query, values)
    conn.commit()
    
    return "Prediction complete!"

if __name__ == "__main__":
    app.run(debug=True)


# Calling `.predict_proba()` on the model to get the prediction probability 
# Using that to calculate the `percentage` and insert into the database
