"""
MongoDB connection and collection handles. Other modules should import
collections from here rather than instantiating MongoClient directly.
"""
from pymongo import MongoClient
from app.config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# users: name, email, passwordHash, designation, department, jobRole,
# education, experience[], previousTrainings[], competencyScores{domain: score}
users_collection = db["users"]

# competencyFramework: jobRole, domain, requiredSkills[{skill, requiredLevel}]
competency_framework_collection = db["competencyFramework"]

# courses: title, domain, skillTags[], level, description, durationHrs, link
courses_collection = db["courses"]

# quizzes: userId, sourceFileName,
# questions[{question, options[4], correctAnswer, explanation}]
quizzes_collection = db["quizzes"]

# quizAttempts: quizId, userId, answers[], score, submittedAt
quiz_attempts_collection = db["quizAttempts"]

# uploadedMaterials: userId, fileName, extractedText, uploadedAt
uploaded_materials_collection = db["uploadedMaterials"]

users_collection.create_index("email", unique=True)
