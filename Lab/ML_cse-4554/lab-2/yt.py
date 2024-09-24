import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

study_data = pd.read_csv('datasets/train.csv')

# print(study_data.head())

# plt.scatter(study_data['study_time'], study_data['score'])

# plt.xlabel('Study Time')
# plt.ylabel('Score')
# plt.title('Study Time vs Score')
# plt.show()

def loss_function(m, b, points):
    total_error = 0
    
    N = len(points)
    for i in range(N):
        x = points.iloc[i]['study_time']
        y = points.iloc[i]['score']
        
        total_error += (y - (m*x + b))**2
        
    return total_error / float(N)


def gradient_descent(m_now, b_now, points, L):
    m_gradient = 0
    b_gradient = 0
    
    N = len(points)
    for i in range(N):
        x = points.iloc[i]['study_time']
        y = points.iloc[i]['score']
        
        m_gradient += -(2/N) * x * (y - (m_now*x + b_now))
        b_gradient += -(2/N) * (y - (m_now*x + b_now))
        
    m_new = m_now - L*m_gradient
    b_new = b_now - L*b_gradient
    
    return m_new, b_new


m = 0
b = 0
L = 0.0001
epochs = 300

for i in range(epochs):    
    if i%50 == 0:
        print('Epoch:', i, 'Loss:', loss_function(m, b, study_data))
    m, b = gradient_descent(m, b, study_data, L)
        
print('Final m:', m, 'Final b:', b)

plt.scatter(study_data['study_time'], study_data['score'], label='Original Data')
plt.plot(list(range(20,80)), [m*x +b for x in range(20,80)], color='red', label='Regression Line')
plt.xlabel('Study Time')
plt.ylabel('Score')

plt.show()
