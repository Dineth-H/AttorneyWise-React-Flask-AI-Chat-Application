from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, DateField, IntegerField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Email, EqualTo, Length, ValidationError

class RegistrationForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(message="First name is required")])
    last_name = StringField('Last Name', validators=[DataRequired(message="Last name is required")])
    email = StringField('Email', validators=[DataRequired(message="Email is required"), Email(message="Invalid email address")])
    password = PasswordField('Password', validators=[DataRequired(message="Password is required"), Length(min=8, message="Password must be at least 8 characters long")])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(message="Please confirm your password"), EqualTo('password', message="Passwords must match")])
    dob = StringField('Date of Birth', validators=[DataRequired(message="Date of birth is required")])
    age = IntegerField('Age', validators=[DataRequired(message="Age is required")])
    city = StringField('City', validators=[DataRequired(message="City is required")])
    country = StringField('Country', validators=[DataRequired(message="Country is required")])
    contact_no = StringField('Contact Number', validators=[DataRequired(message="Contact number is required")])
    username = StringField('Username', validators=[DataRequired(message="Username is required")])
    agree_to_terms = BooleanField('I agree to the Terms and Conditions', validators=[DataRequired(message="You must agree to the Terms and Conditions")])
    submit = SubmitField('Register')
