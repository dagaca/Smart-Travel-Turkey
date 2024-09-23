"""
This module provides functionality to generate an optimized and detailed travel plan
for a selected city in Turkey using OpenAI API. The travel plan includes historical sites,
popular attractions, cultural experiences, food recommendations, and practical tips
for travelers, available in multiple languages.
"""
import os
import openai
from .response_processing import clean_response

# Set up the OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_travel_plan(city, selected_language, days=1):
    """
    Generates a comprehensive and personalized travel plan for the selected city,
    offering a detailed itinerary that includes historical sites, popular attractions,
    cultural experiences, food recommendations, local tips, and best times to visit.

    Args:
    city (str): The name of the city for which the travel plan is to be generated.
    selected_language (str): The language in which the travel plan should be generated.
    days (int): The number of days for the travel plan. Defaults to 1.

    Returns:
    str: A detailed travel plan optimized for the selected city in the specified language.
    """

    # Prepare the prompt for the AI model
    prompt = (
        f"As a highly knowledgeable travel assistant, create a "
        f"detailed and engaging travel plan for {city}. "
        f"The plan should be tailored for a {days}-day visit and "
        f"must be written in {selected_language}:\n\n"
        f"1. **Overview of {city}**: Briefly introduce the city, highlighting "
        f"its historical significance, culture, and what makes it unique.\n"
        f"2. **Top Historical Sites and Attractions**: List must-see historical sites, "
        f"landmarks, and popular attractions with a brief description of each. "
        f"Include tips on the best times to visit these sites.\n"
        f"3. **Cultural Experiences**: Recommend cultural activities such as local "
        f"festivals, art galleries, museums, traditional music, and dance performances.\n"
        f"4. **Food and Dining Recommendations**: Provide a list of must-try local "
        f"dishes and suggest popular restaurants, cafes, and street food spots. "
        f"Highlight any unique dining experiences.\n"
        f"5. **Suggested Itinerary**: Offer a suggested itinerary that covers "
        f"the best way to explore the city over {days} days. "
        f"Include morning, afternoon, and evening activities for each day.\n"
        f"6. **Shopping and Local Markets**: Suggest popular shopping areas, markets, "
        f"or bazaars where travelers can buy souvenirs, local crafts, and specialties.\n"
        f"7. **Practical Tips**: Offer practical travel tips such as the best times to "
        f"visit, public transportation options, safety tips, and local customs.\n"
        f"8. **Hidden Gems and Off-the-Beaten-Path Locations**: Include lesser-known "
        f"spots that offer a unique experience for adventurous travelers.\n"
        f"9. **Sustainability Tips**: Provide eco-friendly travel tips, like responsible "
        f"tourism practices and recommendations for supporting local businesses.\n"
        f"10. **Final Thoughts**: End with inspiring thoughts on why {city} is a must-visit "
        f"destination, encouraging travelers to explore its beauty and culture."
    )

    # Define system and user messages
    system_message = (
        f"You are an expert travel assistant, specialized in creating detailed, engaging, "
        f"and informative travel plans for cities in Turkey. "
        f"Your goal is to provide the most comprehensive and appealing travel itinerary "
        f"for travelers, highlighting the best that each city has to offer. "
        f"Ensure the response is in {selected_language}."
    )
    user_message = prompt

    # Create messages list
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_message}
    ]

    # Get the travel plan from AI
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=messages,
        max_tokens=3000 + (days - 1) * 250,  # Calculate tokens based on the number of days
        n=1,
        stop=None,
        temperature=0.8
    )

    # Collect suggestions from AI
    plan = response.choices[0].message['content'].strip()

    # Clean the response if necessary
    cleaned_plan = clean_response(plan)

    # Return the cleaned travel plan
    return cleaned_plan
