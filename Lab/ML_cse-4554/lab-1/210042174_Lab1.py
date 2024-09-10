import numpy as np
import pandas as pd


# NUMPY TASK

# TASK 1
a = np.array([2, 6, 1, 9, 10, 3, 27])
sorted_a = np.sort(a)
print(sorted_a[3:5])

# TASK 2
x = np.ndarray(shape=(5,4), dtype=int, order='C')
print(x)

# TASK 3
random_array = np.random.rand(3,2)

y = np.ndarray(shape=(5,), dtype=float, buffer=random_array)
print(y)

# TASK 4
def extract_subset(x, y, y0):
    return x[y == y0]

x = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
y = np.array([0, 1, 0])
y0 = 1
subset = extract_subset(x, y, y0)
print(subset)

# TASK 5
iris_dataset = np.genfromtxt("Iris.csv", delimiter = ",", skip_header =1, filling_values=-999, dtype=float)
print(iris_dataset)

# TASK 6
mean = np.mean(iris_dataset[:, 0])
median = np.median(iris_dataset[:, 0])
std_dev = np.std(iris_dataset[:, 0])

print("Mean:", mean)
print("Median:", median)
print("Standard Deviation:", std_dev)



# PANDAS TASK


# TASK 1
df = pd.read_csv("california_housing_test.csv")

# Print the first 10 rows
print(df.head(10))
# Print the data types of each column
print(df.dtypes)
# Print the summary statistics
print(df.describe())

# TASK 2
missing_values = df.isnull().sum()
print(missing_values)

# Drop rows with missing values
df_dropna = df.dropna()
# Fill missing values with the mean of the column
df_filled = df.fillna(df.mean())

# TASK 3
top_population_locations = df.groupby('longitude')['population'].sum().nlargest(5)
top_income_locations = df.groupby('longitude')['median_income'].mean().nlargest(5)

print(top_population_locations)
print(top_income_locations)
