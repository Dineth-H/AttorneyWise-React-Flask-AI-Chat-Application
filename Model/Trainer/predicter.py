import os
import matplotlib.pyplot as plt
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer

# Function to preprocess input text
def preprocess_text(text, tokenizer, max_sequence_length):
    # Tokenize text
    sequences = tokenizer.texts_to_sequences([text])
    # Pad sequences to ensure consistent input shape
    padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length)
    return padded_sequences

# Function to create and fit tokenizer
def create_and_fit_tokenizer(texts, max_words):
    tokenizer = Tokenizer(num_words=max_words)
    tokenizer.fit_on_texts(texts)
    return tokenizer

# Function to load the model
def load_trained_model(model_path):
    model = load_model(model_path)
    return model

# Function to predict text classification
def predict_text_classification(text, model, tokenizer, max_sequence_length):
    # Preprocess text
    processed_text = preprocess_text(text, tokenizer, max_sequence_length)
    # Make prediction
    predictions = model.predict(processed_text)
    return predictions

# Function to visualize predictions
def visualize_predictions(predictions, class_labels):
    # Plot bar chart of predicted probabilities
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6))
    
    ax1.bar(class_labels, predictions.flatten())
    ax1.set_xlabel('Class')
    ax1.set_ylabel('Probability')
    ax1.set_title('Predicted Probabilities')

    # Plot pie chart of predicted probabilities
    ax2.pie(predictions.flatten(), labels=class_labels, autopct='%1.1f%%')
    ax2.set_title('Probability Distribution')
    
    plt.tight_layout()
    plt.show()

# Main function
def main():
    # Path to the model
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_filename = 'legal_document_classifier.h5'
    model_path = os.path.join(current_dir, model_filename)
    
    # Load model
    model = load_trained_model(model_path)
    
    # Sample text for prediction
    text = """
    Bay Area Legal Services, Inc. 
    Attention: Mary Haberland, Attorney 
    829 W. Dr. Martin Luther King Jr. Blvd., 2nd Floor 
    Tampa, Florida 33603 
    Dear Ms. Haberland: 
    On behalf of (name of agency), I am pleased to support the grant application submitted 
    by Bay Area Legal Services (BALS) under the Administration on Aging’s Legal 
    Assistance Grants Request for Proposals. 
    We are eager to support the concept of the Statewide Senior Legal Helpline model being 
    proposed by BALS. The Senior Legal Helpline has the potential to be a critical 
    component of the Elder Law community in Florida, and we are confident the model 
    proposed by BALS will effectively fill current gaps in services as well as provide ease of 
    access to legal services for elders. We also welcome the opportunity that the project 
    presents to develop closer working relationships with the Title IIIB providers and other 
    legal services programs so as to better facilitate the provision of legal services to seniors. 
    (Name of Agency) recognizes the importance of a willingness and commitment from a 
    strong network of providers in ensuring success of the Helpline in Florida. We commit to 
    participate in that network by working with BALS to complete an appropriate referral 
    matrix for the elders we serve in our community, making appropriate referrals to the 
    Helpline, and disseminating materials about the Helpline in our geographic area, 
    including making special efforts to target isolated, rural, limited English-speaking and 
    other hard to reach populations. 
    We are excited about this opportunity to partner with Bay Area Legal Services and the 
    Florida Department of Elder Affairs in the development, implementation, and ongoing 
    operation of the Senior Legal Helpline in Florida. We are confident in the ability of 
    BALS to oversee this important endeavor, and we look forward to strengthening legal 
    services delivery to Florida’s most vulnerable elderly. 
    Sincerely,"""

    # Parameters for preprocessing
    max_sequence_length = 100  # Adjust according to model's input shape
    max_words = 10000  # Maximum number of words in the vocabulary
    
    # Create and fit tokenizer
    tokenizer = create_and_fit_tokenizer([text], max_words)
    
    # Predict text classification
    predictions = predict_text_classification(text, model, tokenizer, max_sequence_length)
    
    # Define class labels
    class_labels = ["Class 0", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9"]

    # Visualize predictions
    visualize_predictions(predictions, class_labels)

if __name__ == "__main__":
    main()
