import pickle
import numpy as np

# Please, enter the clinical parameters of one patient below
Patient_Params = {
    'Obstructive HCM':      1,      # 0 or 1
    'Gender':               1,      # Male:0 or Female: 1

    'Syncope':              0,      # 0 or 1
    'Dyspnea':              0,      # 0 or 1
    'Fatigue':              1,      # 0 or 1
    'Presyncope':           0,      # 0 or 1

    'NYHA_Class':           1,      # 1 or 2
    'Atrial_Fibrillation':  1,      # 0 or 1
    'Hypertension':         0,      # 0 or 1

    'Beta_blocker':         0,      # 0 or 1
    'Ca_Channel_Blockers':  0,      # 0 or 1
    'ACEI_ARB':             0,      # 0 or 1
    'Coumadin':             0,      # 0 or 1

    'Max_Wall_Thick':       13,     # mm, measured by echocardiography
    'Septal_Anterior_Motion': 0,    # 0 or 1
    'Mitral_Regurgitation'  : 0,    # 0, 1, 2, 3, or 4
    'Ejection_Fraction'     : 55,   # percentage, measured by echocardiography
  }

input_vars = []
for key in Patient_Params.keys() :
    input_vars.append(Patient_Params[key])

with open('./hf_predict_model.pkl', 'rb') as file:
    clf_loaded = pickle.load(file)

score = clf_loaded.predict_proba(np.reshape(input_vars,(1,-1)))

print('###########################################')
print('Probability of progressive HF is: {0:.2f} %'.format(100 * score[0 ,1]))
print('###########################################')