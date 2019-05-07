import pickle
import sklearn
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
#saving the model

data = pd.read_csv('./BC_DR.csv')
#data['EC50 (µM)'].fillna(data.mean())
data['EC50 (µM)'].fillna((data['EC50 (µM)'].mean()), inplace=True)
data['Doses (uM)'].fillna((data['Doses (uM)'].mean()), inplace=True)
#Cell line aliases is empty and can be dropped
del data['Cell line aliases']

del data['OncoMap']
del data['Hybrid capture/Sequencing']
del data['SNP arrays']
del data['Expression arrays']
del data['Source']
del data['CCLE tumor type 2']
del data['Histology']
del data['CCLE name']
del data['Site Primary']
del data['Hist Subtype1']
del data['Unnamed: 0']

#Choose only the variables that has to be used in the model
columns = ["EC50 (µM)","IC50 (µM)","Doses (uM)","Amax","Activity Data (median)","Activity SD","ActArea"]
data_model = data.loc[:,columns]
data['ActArea'].fillna((data['ActArea'].mean()), inplace=True)

#Split data into training and testing set with 80% of the data going into training
training, testing = train_test_split(data_model, test_size=0.2, random_state=0)
print("Total sample size = %i; training sample size = %i, testing sample size = %i",(data_model.shape[0],training.shape[0],testing.shape[0]))

#X are the variables/features that help predict y, which tells us whether an employee left or stayed. This is done for both
#training and testing
df_train_s = training.loc[:,data_model.columns]
X_train_s = df_train_s.drop(['ActArea'], axis=1)
y_train_s = df_train_s.loc[:, ['ActArea']]

df_test_s = testing.loc[:,data_model.columns]
X_test_s = df_test_s.drop(['ActArea'], axis=1)
y_test_s = df_test_s.loc[:, ['ActArea']]

rf_reg = RandomForestRegressor()

model = rf_reg.fit(X_train_s, y_train_s)
pickle_out = open("dict.pkl","wb")
s=pickle.dumps(model)
pickle_out.write(s)
pickle_out.close()

