import numpy as np
import matplotlib.pyplot as plt
import os
import sys

from time import time
from sklearn.utils import class_weight
from sklearn.metrics import roc_curve, auc, precision_recall_curve
import scipy.io as sio

from numpy.random import seed
from load_data_public import load_data

from sklearn.model_selection import cross_validate, cross_val_predict
from sklearn.impute import SimpleImputer, KNNImputer
from sklearn.preprocessing import StandardScaler

from sklearn import metrics
from sklearn.pipeline import make_pipeline

from sklearn.model_selection import cross_val_score
from sklearn.feature_selection import SelectFromModel
from sklearn.linear_model import LogisticRegression, LassoCV
from sklearn.ensemble import GradientBoostingClassifier, StackingClassifier
from sklearn.svm import SVC



num_xrsval = 10
init_rs = 2020
seed(init_rs)

if __name__ == '__main__':
    pdirname = os.path.dirname(__file__)
    ###########################################################################
    X_dev, y_dev, feature_names = load_data( pdirname + '/develop_data.mat')
    imputer = KNNImputer(missing_values=np.nan, n_neighbors=1, copy=True)
    X_dev = imputer.fit_transform(X_dev)  # learn missingness, and fill-in
    X_sel, y_sel, feature_names = load_data( pdirname + '/model_select_data.mat')
    X_sel = imputer.transform(X_sel)  # learn missingness, and fill-in

    ## MODEL
    estimators = [
            ('svc', make_pipeline( StandardScaler(), SVC(class_weight='balanced', probability=True, random_state=init_rs))),
            ('gbc', GradientBoostingClassifier(n_estimators=100, max_depth=1, random_state=init_rs)),
             ('lg', LogisticRegression(class_weight='balanced', penalty='l1', solver='liblinear'))
    ]
    clf = StackingClassifier(estimators=estimators,final_estimator=LogisticRegression(class_weight='balanced') )
    ####################################################################################################################
    # Determine the important features and remove all other features from input data
    lasso  = LassoCV(random_state=init_rs, cv=num_xrsval)
    sfm = SelectFromModel(lasso, threshold=-np.inf, max_features=17).fit(X_dev, y_dev)
    X_dev_optm = X_dev[:, sfm.get_support()]
    X_sel_optm = X_sel[:, sfm.get_support()]
    fn_new = feature_names[0, sfm.get_support()]
    print('Important Features')
    print(fn_new)
    N = fn_new.shape[0]
    print('number of features = ', N)
    # Train the model using the optimal set of features
    clf.fit(X_dev_optm, y_dev)
    y_true, y_pred = y_sel, clf.predict_proba(X_sel_optm)
    yy = y_pred[:,1]> 0.5
    print(metrics.classification_report(y_true, yy))

    ## PLOT
    viz_roc = metrics.plot_roc_curve(clf,X_sel_optm, y_sel)
    plt.plot([0, 1], [0, 1], 'k--')
    plt.xlim([-0.0, 1.0])
    plt.ylim([-0.0, 1.0])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.grid(True)
    p = viz_roc.tpr
    n = np.size(y_sel)
    CI = 1.96 * np.sqrt(np.multiply(p, 1 - p) / n)
    plt.fill_between(viz_roc.fpr, p-CI, p+CI, color='grey', alpha=.2, label=r'$\pm$ 1 std. dev.')

    viz_pr = metrics.plot_precision_recall_curve(clf, X_sel_optm, y_sel)
    plt.xlim([-0.0, 1.0])
    plt.ylim([-0.0, 1.0])
    p = viz_pr.precision
    n = np.size(y_sel)
    CI = 1.96 * np.sqrt(np.multiply(p, 1 - p) / n)
    plt.fill_between(viz_pr.recall, p - CI, p + CI,color='grey', alpha=.2, label=r'$\pm$ 1 std. dev.')
    plt.xlabel('Precision')
    plt.ylabel('Recall')
    plt.grid(True)

    plt.show()

