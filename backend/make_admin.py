"""
Grant admin dashboard access to a user.

Usage:
    python make_admin.py someone@example.com
"""
import sys

from app.database import users_collection

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python make_admin.py <email>")
        sys.exit(1)

    email = sys.argv[1].lower()
    result = users_collection.update_one({"email": email}, {"$set": {"isAdmin": True}})

    if result.matched_count == 0:
        print(f"No user found with email '{email}'")
    else:
        print(f"'{email}' is now an admin.")
