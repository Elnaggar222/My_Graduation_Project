For external validation, run predict_hf.py.
[predict_hf.py]:
- Enter the clinical variables (n=17) for one patient in the specified locations.
- Run using python 3.7 
- The output is the probability (%) of HF for this patient.
- the output is printed on the python concole/command line.

[hf_predict_model.pkl]: 
This file contains the trained model. It is called by [predict_hf.py]


Files: [train_ensemble_public.py] AND [load_data_public.py] 
are only used for model development and landing the data from Matlab. They are not needed for external validation.

