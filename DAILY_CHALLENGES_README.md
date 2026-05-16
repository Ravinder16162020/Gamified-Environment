# Gamified Environment - Daily Challenges Service

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Variables
Your `.env` file already contains:
- `MONGO_URI` - MongoDB connection string
- `DAILY_CHALLENGE_API_TOKEN` - Google Gemini API key
- `FLASK_DEBUG` - Debug mode (default: False)
- `FLASK_PORT` - Port to run Flask (default: 5000)

### 3. Run the Flask Server
```bash
python app.py
```

Server will start at `http://localhost:5000`

---

## API Endpoints

### Get Daily Challenge (Query Parameter)
```
GET /api/challenge?level=beginner
```

**Parameters:**
- `level` (optional): `beginner`, `intermediate`, or `advanced`
- Default: `beginner`

**Response:**
```json
{
  "date": "2026-05-05",
  "level": "beginner",
  "title": "String Reversal",
  "description": "Write a function that reverses a string...",
  "example_input": "hello",
  "example_output": "olleh",
  "hints": ["Use string slicing", "Think about indexing"],
  "difficulty": "beginner",
  "cached": true
}
```

### Get Daily Challenge (Path Parameter)
```
GET /api/challenge/intermediate
GET /api/challenge/advanced
```

### Health Check
```
GET /health
```

---

## How It Works

1. **First Request**: When you request a challenge for a new level today:
   - Service checks MongoDB for existing challenge for today
   - If not found, calls Gemini 2.5 Flash API
   - Generates a coding challenge matching the level
   - Saves it to MongoDB
   - Returns the challenge with `"cached": false`

2. **Cached Response**: Subsequent requests for the same level on the same day:
   - Returns cached challenge from MongoDB
   - Response includes `"cached": true`

3. **Next Day**: New date triggers generation of fresh challenges

---

## Testing with cURL

### Beginner Challenge
```bash
curl "http://localhost:5000/api/challenge?level=beginner"
```

### Intermediate Challenge (path parameter)
```bash
curl "http://localhost:5000/api/challenge/intermediate"
```

### Health Check
```bash
curl http://localhost:5000/health
```

---

## Project Structure
```
gamified-environment/
├── app.py                      # Flask application with routes
├── services/
│   ├── __init__.py
│   └── gemini_service.py       # Gemini API + MongoDB service
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables
└── backend/                    # Existing Node.js backend
```

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `DAILY_CHALLENGE_API_TOKEN` | Google Gemini API key | `AIzaSy...` |
| `FLASK_DEBUG` | Enable debug mode | `False` or `True` |
| `FLASK_PORT` | Server port | `5000` |

---

## MongoDB Collection Schema

Challenges are stored in `daily_challenges` collection:
```json
{
  "_id": ObjectId,
  "date": "2026-05-05",
  "level": "beginner",
  "title": "Challenge Name",
  "description": "Problem statement",
  "example_input": "sample input",
  "example_output": "expected output",
  "hints": ["hint1", "hint2"],
  "difficulty": "beginner",
  "created_at": ISODate("2026-05-05T12:00:00Z")
}
```

---

## Error Handling

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Invalid level | Level not in ['beginner', 'intermediate', 'advanced'] |
| 500 | Gemini service not initialized | Missing API keys in .env |
| 500 | Failed to generate challenge | Gemini API error or invalid JSON response |

---

## Notes

- ✅ All API keys loaded from environment variables (security best practice)
- ✅ MongoDB connection handled safely with timeout
- ✅ Daily challenges cached to reduce API calls
- ✅ Automatic cleanup of service on server shutdown
- ✅ Comprehensive error handling and validation
