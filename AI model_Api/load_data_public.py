import scipy.io as sio
import numpy as np

def load_data(dataset_path):
    dataset = sio.loadmat(dataset_path)
    data      = dataset['data_tb']
    var_names = dataset['clin_var_names']

    X = data[:, 0:-1] # Exclude last column (outcome)
    Y = data[:, -1]   # Outcome
    X = X.astype(float)
    Y = Y.astype(float)

    return X.astype(float),Y.astype(float), var_names
