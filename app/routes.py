"""
This module provides the API endpoint to generate a personalized travel plan
for a selected city in Turkey using the OpenAI API. The travel plan includes
historical sites, popular places to visit, cultural activities, and food
recommendations, ensuring a comprehensive and optimized itinerary for travelers.
"""
from flask import request, jsonify
from app import app
from .travel_plan import generate_travel_plan
from .language_dict import LANGUAGE_DICT

@app.route('/travel_planner', methods=['POST'])
def travel_planner():
    """
    API endpoint that generates a personalized travel plan for a selected city in Turkey.
    -------
    tags:
      - Travel Planner
    parameters:
      - name: body
        in: body
        required: true
        description: JSON object containing the city name, language code, and number of days.
        schema:
          type: object
          properties:
            city:
              type: string
              description: The name of the city for which the travel plan is generated.
              example: "Istanbul"
            language:
              type: string
              description: The language code for the desired output language of the travel plan. 
                           Default is "en".
              example: "en"
            days:
              type: integer
              description: The number of days for the travel plan. Default is 1 day.
              example: 3
    responses:
      '200':
        description: Successfully generated the travel plan.
        content:
          application/json:
            schema:
              type: object
              properties:
                plan:
                  type: string
                  description: Detailed travel plan for the selected city.
                  example: "Visit the Hagia Sophia, explore the Grand Bazaar, 
                           enjoy traditional Turkish cuisine..."
      '400':
        description: Bad request due to missing or invalid data.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                  description: A message describing the invalid input.
                  example: "City name must be provided."
      '500':
        description: Internal server error due to unexpected server-side failure.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                  description: A message describing the internal server error.
                  example: "An unexpected error occurred."
    """
    try:
        app.logger.info("Received request to generate travel plan")
        data = request.json
        city = data.get("city")
        language = data.get("language", "en")  # Default to English if not provided
        days = data.get("days", 1)  # Default to 1 day if not specified

        # Validate required fields
        if not city:
            app.logger.error("City name must be provided")
            return jsonify({"error": "City name must be provided"}), 400

        # Retrieve the full name of the language based on the language code
        selected_language = LANGUAGE_DICT.get(language, "English")

        # Generate the travel plan
        plan = generate_travel_plan(city, selected_language, days)

        app.logger.info("Travel plan generated successfully")
        return jsonify({"plan": plan}), 200

    except ValueError as ve:
        app.logger.error('ValueError: %s', str(ve), exc_info=True)
        return jsonify({'error': 'Invalid input data format'}), 400
    except Exception as e:
        app.logger.error('An error occurred: %s', str(e), exc_info=True)
        return jsonify({'error': 'An unexpected error occurred'}), 500
