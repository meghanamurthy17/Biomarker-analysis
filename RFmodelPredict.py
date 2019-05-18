import pickle
import sys
clf2 = pickle.load(open("dict.pkl", 'rb'))
#print(clf2.predict([[3.456,5.67,8.120,-41.45678,-71.987654,2.777777]])[0])
print(clf2.predict([[float(sys.argv[1]),float(sys.argv[2]),float(sys.argv[3]),float(sys.argv[4]),float(sys.argv[5]),float(sys.argv[6])]])[0])
print("****")

