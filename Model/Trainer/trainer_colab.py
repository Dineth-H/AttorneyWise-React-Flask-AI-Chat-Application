# Step 1: Import necessary libraries
import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Bidirectional, LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
from google.colab import drive
from google.colab import files

# Step 2: Load and preprocess documents from CSV files
def load_documents_from_csv(file_path, text_column='case_text', label_column='case_outcome'):
    try:
        df = pd.read_csv(file_path)
        if text_column not in df.columns or label_column not in df.columns:
            raise ValueError(f"Columns '{text_column}' and '{label_column}' are required in the CSV file.")
        documents = df[text_column].tolist()
        labels = df[label_column].tolist()
        return documents, labels
    except Exception as e:
        print(f"Error loading data from CSV file: {e}")
        return [], []

# Load data from data1.csv
data1_path = '/content/drive/MyDrive/data/data1.csv'
documents1, labels1 = load_documents_from_csv(data1_path)

# Load data from data2.csv
data2_path = '/content/drive/MyDrive/data/data2.csv'
documents2, labels2 = load_documents_from_csv(data2_path)

# Concatenate data from both datasets
documents = documents1 + documents2
labels = labels1 + labels2

# Step 3: Split dataset into training and test sets
X_train, X_test, y_train, y_test = train_test_split(documents, labels, test_size=0.2, random_state=42)

# Preprocess text data to handle missing values
X_train = ["" if pd.isna(text) else text for text in X_train]
X_test = ["" if pd.isna(text) else text for text in X_test]

# Step 4: Encode labels
label_encoder = LabelEncoder()
y_train_encoded = label_encoder.fit_transform(y_train)
y_test_encoded = label_encoder.transform(y_test)

# Step 5: Tokenize and pad sequences
max_words = 1000
max_len = 1000

tokenizer = Tokenizer(num_words=max_words)
tokenizer.fit_on_texts(X_train)

X_train_seq = tokenizer.texts_to_sequences(X_train)
X_test_seq = tokenizer.texts_to_sequences(X_test)

X_train_padded = pad_sequences(X_train_seq, maxlen=max_len)
X_test_padded = pad_sequences(X_test_seq, maxlen=max_len)

# Step 6: Build and train model using TensorFlow
embedding_dim = 100

model = Sequential([
    Embedding(input_dim=max_words, output_dim=embedding_dim, input_length=max_len),
    Bidirectional(LSTM(128, return_sequences=True)),
    Bidirectional(LSTM(64)),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(len(label_encoder.classes_), activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

early_stopping = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)

history = model.fit(X_train_padded, y_train_encoded, epochs=20, batch_size=32, validation_split=0.2, callbacks=[early_stopping])

# Step 7: Save the trained model
save_to_drive = True  # Set to True to save to Google Drive, False to save locally

if save_to_drive:
    # Mount Google Drive
    drive.mount('/content/drive')
    # Save to Google Drive
    model.save('/content/drive/MyDrive/legal_document_classifier.h5')
else:
    # Save locally
    model.save('legal_document_classifier.h5')
    # Download the saved model to local machine
    files.download('legal_document_classifier.h5')

# Step 8: Evaluate model
y_pred_proba = model.predict(X_test_padded)
y_pred = np.argmax(y_pred_proba, axis=1)

print(classification_report(y_test_encoded, y_pred))
