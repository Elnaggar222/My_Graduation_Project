from flask import Flask, request, jsonify
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

@app.route("/api/medicalrecords", methods=["POST"])
def predict():
    # Get input parameters from URL query parameters
    obstructive_hcm = int(request.args.get("Obstructive_HCM"))
    gender = int(request.args.get("Gender"))
    syncope = int(request.args.get("Syncope"))
    dyspnea = int(request.args.get("Dyspnea"))
    fatigue = int(request.args.get("Fatigue"))
    presyncope = int(request.args.get("Presyncope"))
    nyha_class = int(request.args.get("NYHA_Class"))
    atrial_fibrillation = int(request.args.get("Atrial_Fibrillation"))
    hypertension = int(request.args.get("Hypertension"))
    beta_blocker = int(request.args.get("Beta_blocker"))
    ca_channel_blockers = int(request.args.get("Ca_Channel_Blockers"))
    acei_arb = int(request.args.get("ACEI_ARB"))
    coumadin = int(request.args.get("Coumadin"))
    max_wall_thick = int(request.args.get("Max_Wall_Thick"))
    septal_anterior_motion = int(request.args.get("Septal_Anterior_Motion"))
    mitral_regurgitation = 0  # Set to 0, as this parameter is not included in the URL query parameters
    ejection_fraction = int(request.args.get("Ejection_Fraction"))
    hospital_id = int(request.args.get("Hospital_id"))
    patient_id = int(request.args.get("patient_id"))

    # Load model
    with open('./hf_predict_model.pkl', 'rb') as file: 
        clf_loaded = pickle.load(file)
        
    # Make prediction    
    input_vars = [obstructive_hcm, gender, syncope, dyspnea, fatigue, presyncope, nyha_class, atrial_fibrillation, hypertension, beta_blocker, ca_channel_blockers, acei_arb, coumadin, max_wall_thick, septal_anterior_motion, mitral_regurgitation, ejection_fraction]
    score = clf_loaded.predict_proba(np.reshape(input_vars,(1,-1)))
    percentage = 100 * score[0,1]
    
    # Insert into database
    query = "INSERT INTO medical_records (percentageofmodel, Hospital_id, patient_id) VALUES (%s, %s, %s)"
    values = (percentage, hospital_id, patient_id)
    cursor.execute(query, values)
    conn.commit()
    
    # Return prediction result in JSON format
    result = {"name": "rc", "percentageofmodel": percentage, "percentageofdoctor": 14, "Hospital_id": hospital_id, "patient_id": patient_id}
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)