"""
This module provides utility functions for processing AI-generated responses,
including cleaning and formatting the output.
"""
import re

def clean_response(response):
    """
    Cleans the AI-generated response by removing unnecessary characters.

    Args:
    response (str): The raw response from AI.

    Returns:
    str: Cleaned and formatted response.
    """
    # Remove numbering, extra spaces, or unwanted characters if necessary
    return re.sub(r'^\d+\.\s*', '', response).strip()
