"""
This module initializes the Flask application and sets up Swagger for API documentation.
"""
from flask import Flask
from flask_cors import CORS
from flasgger import Swagger

# Create the Flask application
app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Configure Swagger for API documentation
app.config['SWAGGER'] = {
    'title': 'Turkey Travel Guide API',
    'description': 'API for personalized travel plans in Turkey.',
}
swagger = Swagger(app)

# Import log configuration and apply to the app
from config.log_config import configure_logging, log_request_info, log_response_info
configure_logging(app)
log_request_info(app)
log_response_info(app)

# Import the routes module to register endpoints
from app import routes
