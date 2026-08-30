"""
MongoDB connection + collection handles.

MongoDB is schemaless (no CREATE TABLE step needed), so "designing the schema"
just means agreeing on what fields each document will have. That's documented
below next to each collection, matching Section 5.3 of the spec.

Every other file in the app should import collections FROM HERE
(e.g. `from app.database import users_collection`) instead of touching
MongoClient directly. That keeps the connection logic in one place.
"""
from pymongo import MongoClient
from app.config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# --- users ---
# { _id, name, email, passwordHash, designation, department, jobRole,
#   education, experience: [{role, organization, years}],
#   previousTrainings: [{title, completedOn}],
#   competencyScores: {domain: score}, createdAt }
users_collection = db["users"]

# --- competencyFramework ---
# { _id, jobRole, domain, requiredSkills: [{skill, requiredLevel}] }
competency_framework_collection = db["competencyFramework"]

# --- courses (mock iGOT catalogue) ---
# { _id, title, domain, skillTags: [str], level, description, durationHrs, link }
courses_collection = db["courses"]

# --- quizzes ---
# { _id, userId, sourceFileName,
#   questions: [{question, options: [4 strings], correctAnswer, explanation}],
#   createdAt }
quizzes_collection = db["quizzes"]

# --- quizAttempts ---
# { _id, quizId, userId, answers: [...], score, submittedAt }
quiz_attempts_collection = db["quizAttempts"]

# --- uploadedMaterials ---
# { _id, userId, fileName, extractedText, uploadedAt }
uploaded_materials_collection = db["uploadedMaterials"]

# Enforce "one account per email" at the database level, not just in our code.
# unique=True means MongoDB itself will reject a second insert with the same
# email, even if two requests somehow race each other.
users_collection.create_index("email", unique=True)
