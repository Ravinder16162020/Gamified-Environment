import os
from datetime import datetime
from google import genai
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError


class GeminiChallengeService:
    """Service to manage daily coding challenges using Gemini API and MongoDB."""

    def __init__(self):
        """Initialize Gemini client and MongoDB connection."""
        self.api_key = os.getenv("DAILY_CHALLENGE_API_TOKEN")
        self.mongo_uri = os.getenv("MONGO_URI")
        
        if not self.api_key:
            raise ValueError("DAILY_CHALLENGE_API_TOKEN not found in environment variables")
        if not self.mongo_uri:
            raise ValueError("MONGO_URI not found in environment variables")
        
        # Initialize Gemini client
        self.genai_client = genai.Client(api_key=self.api_key)
        
        # Initialize MongoDB connection
        self.mongo_client = MongoClient(self.mongo_uri, serverSelectionTimeoutMS=5000)
        self.db = self.mongo_client.get_database("gamified_environment")
        self.challenges_collection = self.db.get_collection("daily_challenges")

    def _get_today_date(self) -> str:
        """Return today's date as a string (YYYY-MM-DD)."""
        return datetime.utcnow().strftime("%Y-%m-%d")

    def get_daily_challenge(self, level: str) -> dict:
        """
        Get or generate a daily coding challenge for the specified level.
        
        Args:
            level: Difficulty level (e.g., 'beginner', 'intermediate', 'advanced')
        
        Returns:
            dict: Challenge object with fields: date, level, title, description, difficulty
        
        Raises:
            ValueError: If level is invalid
            Exception: If API call fails or database is unreachable
        """
        valid_levels = ["beginner", "intermediate", "advanced"]
        if level.lower() not in valid_levels:
            raise ValueError(f"Invalid level. Must be one of: {', '.join(valid_levels)}")
        
        today = self._get_today_date()
        level_lower = level.lower()
        
        # Check if challenge exists for today
        existing_challenge = self.challenges_collection.find_one({
            "date": today,
            "level": level_lower
        })
        
        if existing_challenge:
            return {
                "date": existing_challenge["date"],
                "level": existing_challenge["level"],
                "title": existing_challenge["title"],
                "description": existing_challenge["description"],
                "difficulty": existing_challenge.get("difficulty", level_lower),
                "cached": True
            }
        
        # Generate new challenge using Gemini
        challenge_prompt = self._build_prompt(level_lower)
        
        try:
            response = self.genai_client.models.generate_content(
                model="gemini-2.5-flash",
                contents=challenge_prompt
            )
            challenge_text = response.text
        except Exception as e:
            raise Exception(f"Failed to generate challenge with Gemini API: {str(e)}")
        
        # Parse and save challenge
        challenge_doc = self._parse_and_save_challenge(
            challenge_text, 
            today, 
            level_lower
        )
        
        return challenge_doc

    def _build_prompt(self, level: str) -> str:
        """Build the prompt for Gemini to generate a coding challenge."""
        level_descriptions = {
            "beginner": "a simple eco-sustainability question suitable for beginners",
            "intermediate": "a moderate difficulty eco-sustainability question for intermediate learners",
            "advanced": "a challenging eco-sustainability question requiring advanced knowledge"
        }
        
        description = level_descriptions.get(level, level_descriptions["beginner"])
        
        prompt = f"""Generate a single {level} difficulty eco-sustainability multiple-choice question in JSON format with this exact structure:
{{
    "question": "Clear question about sustainability",
    "topic": "Category (e.g., Energy Efficiency, Climate Change, Recycling)",
    "options": [
        {{"id": "A", "text": "First option"}},
        {{"id": "B", "text": "Second option"}},
        {{"id": "C", "text": "Third option"}},
        {{"id": "D", "text": "Fourth option"}}
    ],
    "correctAnswer": "A",
    "funFact": "Interesting fact when correct",
    "wrongFact": "Educational fact when incorrect"
}}

Create {description}. The question should test real environmental knowledge.
Be concise and practical. Focus on actionable sustainability topics.
Return ONLY valid JSON, no additional text."""
        
        return prompt

    def _parse_and_save_challenge(self, challenge_text: str, date: str, level: str) -> dict:
        """Parse Gemini response and save to MongoDB."""
        import json
        
        try:
            # Extract JSON from response (handle potential markdown formatting)
            json_str = challenge_text
            if "```json" in json_str:
                json_str = json_str.split("```json")[1].split("```")[0].strip()
            elif "```" in json_str:
                json_str = json_str.split("```")[1].split("```")[0].strip()
            
            challenge_data = json.loads(json_str)
        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse Gemini response as JSON: {str(e)}")
        
        # Validate required fields
        required_fields = ["question", "topic", "options", "correctAnswer", "funFact", "wrongFact"]
        for field in required_fields:
            if field not in challenge_data:
                raise ValueError(f"Missing required field: {field}")
        
        # Create document with metadata for EcoSprint challenges
        challenge_doc = {
            "challengeId": f"eco-{date}-{level}",
            "date": date,
            "level": level,
            "question": challenge_data.get("question", ""),
            "topic": challenge_data.get("topic", ""),
            "options": challenge_data.get("options", []),
            "correctAnswer": challenge_data.get("correctAnswer", ""),
            "funFact": challenge_data.get("funFact", ""),
            "wrongFact": challenge_data.get("wrongFact", ""),
            "difficulty": level,
            "created_at": datetime.utcnow()
        }
        
        # Save to MongoDB
        result = self.challenges_collection.insert_one(challenge_doc)
        challenge_doc["_id"] = str(result.inserted_id)
        challenge_doc["cached"] = False
        
        return challenge_doc

    def close(self):
        """Close MongoDB connection."""
        if self.mongo_client:
            self.mongo_client.close()
