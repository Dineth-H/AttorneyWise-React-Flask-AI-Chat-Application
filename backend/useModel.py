from flask import Flask, jsonify, request
from tensorflow.keras.models import load_model
import os
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_DIR = "Model/Trainer"
MODEL_FILENAME = "legal_document_classifier.h5"
model_path = os.path.join(MODEL_DIR, MODEL_FILENAME)

try:
    model = load_model(model_path)
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error("Error loading the model: %s", str(e))
    raise RuntimeError("Failed to load the model.")

MAX_SUMMARY_LENGTH = 100

@app.route('/api/model-summarize', methods=['POST'])
def summarize_document():
    try:
        data = request.json
        if not data or 'document_text' not in data:
            raise ValueError("Invalid request data. 'document_text' field is missing.")

        document_text = data['document_text']

        summary = generate_summary(document_text)

        return jsonify({'summary': summary}), 200

    except ValueError as ve:
        logger.error("Invalid request data: %s", str(ve))
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        logger.error("An error occurred during summarization: %s", str(e))
        return jsonify({'error': 'An error occurred during summarization.'}), 500

def generate_summary(document_text):
    """
    Generate a summary for the given document text using the loaded model.
    """
    summary = model.predict(document_text)

    summary = truncate_summary(summary)

    return summary

def truncate_summary(summary):
    """
    Truncate the summary to a maximum length.
    """
    if len(summary) > MAX_SUMMARY_LENGTH:
        summary = summary[:MAX_SUMMARY_LENGTH]
    return summary

if __name__ == '__main__':
    app.run(debug=True)
