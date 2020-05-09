import pickle
import csv
import numpy as np

with open('collegeBE/ml/model.pkl','rb') as f:
    SVM_model = pickle.load(f)

# pass a list of symptoms
# it will return the disease as string
def predict(symptoms):
    # symptoms = np.array(symptoms)
    csvRow = symptoms
    symptoms = np.reshape(symptoms,(1,33))
    disease = SVM_model.predict(symptoms)
    prob = SVM_model.predict_proba(symptoms)
    with open('collegeBE/ml/feedback.csv', 'a', newline='') as file:
        csvRow.append(disease[0])
        csvRow.append(np.max(prob))
        writer = csv.writer(file)
        writer.writerow(csvRow)
    return disease[0],np.max(prob)