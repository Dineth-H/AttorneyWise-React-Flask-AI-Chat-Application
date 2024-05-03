import matplotlib.pyplot as plt

# Precision, recall, and F1-score for each class
precision = [0.41, 0.53, 0.00, 0.72, 0.55, 0.54, 0.35, 0.57, 0.69, 0.00]
recall = [0.38, 0.37, 0.00, 0.86, 0.36, 0.40, 0.39, 0.49, 0.65, 0.00]
f1_score = [0.39, 0.44, 0.00, 0.78, 0.44, 0.46, 0.37, 0.53, 0.67, 0.00]

# Class labels
classes = [str(i) for i in range(10)]

# Plot precision, recall, and F1-score for each class
plt.figure(figsize=(10, 6))

# Precision
plt.plot(classes, precision, marker='o', label='Precision', color='blue')
# Recall
plt.plot(classes, recall, marker='s', label='Recall', color='red')
# F1-score
plt.plot(classes, f1_score, marker='^', label='F1-score', color='green')

plt.title('Precision, Recall, and F1-score for each class')
plt.xlabel('Class')
plt.ylabel('Score')
plt.legend()
plt.xticks(classes)
plt.grid(True)
plt.tight_layout()

plt.show()
