from flask import Flask, jsonify, request, redirect, url_for, session, make_response, flash
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt, check_password_hash
from bson import ObjectId
import os
from flask_cors import CORS, cross_origin
from flask_session import Session
import jwt
import datetime
import requests
from dotenv import load_dotenv
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import openai

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
load_dotenv()

# Generating a secret key
app.secret_key = os.urandom(24)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
bcrypt = Bcrypt(app)

# Configuration for MongoDB connection
app.config['WTF_CSRF_ENABLED'] = False
app.config['MONGO_URI'] = 'mongodb+srv://dinethhesara:2323758@dineth-h.5u3mt2u.mongodb.net/AttorneyWise'
mongo = PyMongo(app)

# Define the generate_token function at the top level
def generate_token(user):
    # Set the token expiry time
    expiry = datetime.datetime.utcnow() + datetime.timedelta(hours=1)

    # Create the token payload
    payload = {
        'user_id': str(user['_id']),
        'exp': expiry
    }

    # Generate the token
    token = jwt.encode(payload, app.secret_key, algorithm='HS256')

    return token

# CORS headers decorator
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response

# Register the CORS headers decorator for all routes
app.after_request(add_cors_headers)

@app.route('/')
def index():
    return jsonify({'message': 'Welcome to Attorneywise Flask app!'})

@app.route('/api/register', methods=['POST'])
@cross_origin()
def register_api():
    data = request.get_json()  # Get JSON data from the request body
    form = RegistrationForm(data=data)  # Pass the JSON data to the form
    if form.validate():
        # Get registration data from the form
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data
        password = form.password.data
        dob = form.dob.data
        age = form.age.data
        city = form.city.data
        country = form.country.data
        contact_no = form.contact_no.data
        username = form.username.data
        agree_to_terms = data.get('agreeToTerms')

        # Check if the user already exists in the database
        existing_user = mongo.db.users.find_one({'email': email})
        if existing_user:
            flash('Email already exists. Please choose a different one.', 'error')
            return redirect(url_for('register'))

        # Hash the password before storing it in the database
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Insert registration data into MongoDB
        users = mongo.db.users
        users.insert_one({
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'password': hashed_password,
            'dob': dob,
            'age': age,
            'city': city,
            'country': country,
            'contact_no': contact_no,
            'username': username,
            'agree_to_terms': agree_to_terms
        })

        # Perform ChatEngine signup
        chat_response = requests.post('https://api.chatengine.io/users/', 
            data={
                "username": username,
                "secret": password,
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
            },
            # Include the ChatEngine private key in the headers
            headers={ "Private-Key": os.environ['CHAT_ENGINE_PRIVATE_KEY'] }
        )
        if chat_response.status_code == 200:
            # ChatEngine signup successful
            # Redirect to the login page in frontend
            return jsonify({'message': 'Registration successful'}), 200
        else:
            # ChatEngine signup failed
            # Handle the failure scenario
            return jsonify({'error': 'ChatEngine signup failed'}), 401

    else:
        # Handle form validation errors
        errors = form.errors
        # Return the validation errors as a JSON response
        return jsonify({'errors': errors}), 400

@app.route('/api/login', methods=['POST'])
@cross_origin()
def login_api():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Query the database to find the user by email
    user = mongo.db.users.find_one({'email': email})

    if user and bcrypt.check_password_hash(user['password'], password):
        # User exists and password is correct, create session
        session['user_id'] = str(user['_id'])  # Save user ID in session
        # Include user's first name and last name in the response
        token = generate_token(user)
        response = jsonify({'message': 'Login successful', 'firstName': user['first_name'], 'lastName': user['last_name']})
        response.set_cookie('token', token, httponly=True)  # Set token as a cookie with httponly flag
        return response, 200
    else:
        # User not found or password incorrect, return error response
        return jsonify({'error': 'Invalid email or password'}), 401
    
@app.route('/login', methods=['POST'])
def login():
    # Get the username and secret from the request body
    username = request.json.get('username')
    secret = request.json.get('secret')

    # Make a request to the ChatEngine API to verify the user's credentials
    response = requests.get('https://api.chatengine.io/users/me/', 
        headers={ 
            "Project-ID": os.environ['CHAT_ENGINE_PROJECT_ID'],
            "User-Name": username,
            "User-Secret": secret
        }
    )

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # User credentials are correct, return the response data
        return response.json(), 200
    elif response.status_code == 404:
        # User not found in the ChatEngine database
        return jsonify({'error': 'User not found'}), 404
    elif response.status_code == 401:
        # Invalid credentials provided
        return jsonify({'error': 'Invalid username or secret'}), 401
    else:
        # Other errors occurred, return an error response
        return jsonify({'error': 'An error occurred while processing your request'}), response.status_code


    
@app.route('/api/logout', methods=['POST'])
@cross_origin()
def logout_api():
    session.clear()  # Clear session data
    response = make_response(jsonify({'message': 'Logout successful'}), 200)
    response.set_cookie('token', '', expires=0)  # Clear token cookie
    return response

@app.route('/dashboard')
def dashboard():
    user_id = session.get('user_id')  # Get session data
    if user_id:
        # User is logged in
        return jsonify({'message': 'Welcome to the dashboard!'})
    else:
        # Redirect to login page
        return redirect(url_for('login'))

@app.route('/api/user/profile', methods=['GET'])
@cross_origin()
def get_user_profile():
    # Check if the user is logged in by verifying the user_id in the session
    user_id = session.get('user_id')
    if user_id:
        # User is logged in, fetch user profile data from MongoDB
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
        if user:
            # Return user profile data
            return jsonify(user), 200
        else:
            # User not found in the database
            return jsonify({'error': 'User not found'}), 404
    else:
        # User is not logged in, return unauthorized error
        return jsonify({'error': 'Unauthorized access. Please log in.'}), 401

@app.route('/api/user/profile', methods=['PUT'])
@cross_origin()
def update_user_profile():
    user_id = session.get('user_id')  # Get session data
    if user_id:
        # User is logged in, update user profile data
        data = request.get_json()
        # Update user profile data in the database
        result = mongo.db.users.update_one({'_id': ObjectId(user_id)}, {'$set': data})
        if result.modified_count > 0:
            return jsonify({'message': 'Profile updated successfully'}), 200
        else:
            return jsonify({'error': 'Failed to update profile'}), 400
    else:
        return jsonify({'error': 'User not logged in'}), 401

def summarize_text_gpt2(text):
    # Load pre-trained GPT-2 model and tokenizer
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
    model = GPT2LMHeadModel.from_pretrained("gpt2")

    # Tokenize the input text
    inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=1024, truncation=True)

    # Generate summary
    summary_ids = model.generate(inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)

    # Decode the summary and return as string
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return summary

@app.route('/api/summarize', methods=['POST'])
def text_summarize():
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({'error': 'Text data not provided'}), 400

        # Get the text from the request data
        text = data['text']

        # Summarize text using your summarization method
        summary = summarize_text_gpt2(text)  # Implement your summarization logic here

        return jsonify({'summary': summary}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
            
@app.route('/api/generate-reply', methods=['POST'])
@cross_origin()
def generate_reply():
    file = request.files['file']  # Get the uploaded file
    # Read the content of the file
    document_text = file.read()
    # Call OpenAI API for text generation
    response = openai.Completion.create(
        engine="text-davinci-002",  # Choose the Davinci model for text generation
        prompt=document_text,
        max_tokens=50,  # Maximum number of tokens for reply
        temperature=0.7,  # Controls the randomness of the generated text
        stop=["\n"],  # Stop generation at newlines
        n=1,  # Generate a single response
        echo=False  # Don't include prompt in the response
    )
    reply = response.choices[0].text.strip()
    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)
