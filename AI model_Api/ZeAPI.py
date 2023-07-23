from flask import Flask
import mysql.connector
import pickle
import numpy as np
from datetime import datetime
import threading

app = Flask(__name__)

# MySQL configurations
mysql_config = {
    'user': 'root',
    'password': '',
    'host': '127.0.0.1',
    'port': 3306,
    'database': 'ourproject',
    'pool_size': 5,  # maximum number of connections in the pool
    'pool_name': 'my_pool'  # name of the connection pool
}

# Create a connection pool
connection_pool = mysql.connector.pooling.MySQLConnectionPool(**mysql_config)

# Load the ML model
with open('./hf_predict_model.pkl', 'rb') as file:
    clf_loaded = pickle.load(file)

def predict_loop():
    # Get a connection from the pool
    conn = connection_pool.get_connection()

    # Fetch data from the database
    cur = conn.cursor()
    cur.execute('''SELECT medical_reports.id, medical_reports.Obstructive_HCM, medical_reports.Gender, medical_reports.Syncope,
                         medical_reports.Dyspnea, medical_reports.Fatigue, medical_reports.Presyncope,medical_reports.NYHA_Class, 
                   medical_reports.Atrial_Fibrillation, medical_reports.Hypertension,medical_reports.Beta_blocker,
                     medical_reports.Ca_Channel_Blockers,medical_reports.ACEI_ARB, medical_reports.Coumadin,medical_reports.Max_Wall_Thick,
                     medical_reports.Septal_Anterior_Motion, medical_reports.Mitral_Regurgitation,medical_reports.Ejection_Fraction,
                     medical_reports.Hospital_id, medical_reports.patient_id,medical_reports.created_at, medical_reports.updated_at

                   FROM medical_reports
                   LEFT JOIN medical_records ON medical_reports.id = medical_records.id
                   WHERE medical_records.id IS NULL''')
    data = cur.fetchall()

    # Process the data using the ML model
    for row in data:
        # Extract the input variables and predict the output
        input_vars = np.array(row[1:18], dtype=np.float64).reshape(1, -1)
        score = clf_loaded.predict_proba(input_vars)
        percentageofmodel = score[0, 1] * 100

        # Insert the prediction into the medical_records table
        cur.execute('''INSERT INTO medical_records (percentageofmodel, Hospital_id, patient_id, created_at, updated_at, id)
                       VALUES (%s, %s, %s, %s, %s, %s)''',
                    (float(percentageofmodel), row[18], row[19], datetime.now(), datetime.now(), row[0]))
        conn.commit()

    # Close the database cursor and release the connection back to the pool
    cur.close()
    conn.close()

    # Sleep for 1 seconds
    threading.Timer(1.0, predict_loop).start()

#@app.route('/api/predict', methods=['GET'])
#def predict():
#    return 'This endpoint is not used in this version of the application.'

if __name__ == '__main__':
    # Start the prediction loop in a background thread
    threading.Timer(5.0, predict_loop).start()

    # Start the Flask API server
    app.run(debug=True)