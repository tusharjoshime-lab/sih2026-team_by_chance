"""
All environment variables are read here, in ONE place.
Every other file imports from here instead of calling os.getenv() directly.
This way, if you ever need to change how config is loaded, you only touch this file.
"""
import os
from dotenv import load_dotenv

# Loads variables from the .env file into the environment
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "sih_capacity_building")

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "1440"))  # default: 24 hours

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Fail loudly and early if the two things auth CANNOT work without are missing.
# Better to see this error the moment you run the server than to debug a weird
# crash later when someone tries to log in.
if not MONGO_URI:
    raise RuntimeError("MONGO_URI is not set. Did you create a .env file? See .env.example")
if not JWT_SECRET:
    raise RuntimeError("JWT_SECRET is not set. Did you create a .env file? See .env.example")
