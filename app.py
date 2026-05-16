import os
from flask import Flask, jsonify, request
from services.gemini_service import GeminiChallengeService
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Initialize Gemini service (will raise error if env vars missing)
try:
    gemini_service = GeminiChallengeService()
except ValueError as e:
    print(f"Warning: {e}")
    gemini_service = None


@app.route("/api/challenge", methods=["GET"])
def get_daily_challenge():
    """
    Get the daily eco-sustainability challenge for a specified level.
    
    Query Parameters:
        level (str): Challenge level - 'beginner', 'intermediate', or 'advanced'
                    Defaults to 'beginner'
    
    Returns:
        JSON: Challenge object with question, topic, options, and facts
        Error: 400 Bad Request if level is invalid
        Error: 500 Internal Server Error if generation fails
    """
    if gemini_service is None:
        return jsonify({
            "error": "Gemini service not initialized. Check API keys in .env"
        }), 500
    
    # Get level from query parameters (default: beginner)
    level = request.args.get("level", "beginner").lower()
    
    try:
        challenge = gemini_service.get_daily_challenge(level)
        return jsonify(challenge), 200
    
    except ValueError as e:
        # Invalid level provided
        return jsonify({
            "error": str(e),
            "valid_levels": ["beginner", "intermediate", "advanced"]
        }), 400
    
    except Exception as e:
        # API or database errors
        return jsonify({
            "error": f"Failed to retrieve challenge: {str(e)}"
        }), 500


@app.route("/api/challenge/<level>", methods=["GET"])
def get_daily_challenge_by_level(level):
    """
    Get the daily eco-sustainability challenge for a specified level (path parameter version).
    
    Path Parameters:
        level (str): Challenge level - 'beginner', 'intermediate', or 'advanced'
    
    Returns:
        JSON: Challenge object with question, topic, options, and facts
    """
    if gemini_service is None:
        return jsonify({
            "error": "Gemini service not initialized. Check API keys in .env"
        }), 500
    
    try:
        challenge = gemini_service.get_daily_challenge(level)
        return jsonify(challenge), 200
    
    except ValueError as e:
        return jsonify({
            "error": str(e),
            "valid_levels": ["beginner", "intermediate", "advanced"]
        }), 400
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to retrieve challenge: {str(e)}"
        }), 500


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "ok",
        "service": "Gamified Environment - Daily Challenges"
    }), 200


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({
        "error": "Endpoint not found",
        "available_endpoints": [
            "/api/challenge?level=beginner",
            "/api/challenge/intermediate",
            "/api/challenge/advanced",
            "/health"
        ]
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    return jsonify({
        "error": "Internal server error",
        "message": str(error)
    }), 500


if __name__ == "__main__":
    # Development server
    debug_mode = os.getenv("FLASK_DEBUG", "False").lower() == "true"
    port = int(os.getenv("FLASK_PORT", 5000))
    
    try:
        app.run(debug=debug_mode, host="0.0.0.0", port=port)
    finally:
        # Cleanup
        if gemini_service:
            gemini_service.close()
