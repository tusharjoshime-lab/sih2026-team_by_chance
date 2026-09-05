# API Reference

Base URL (local dev): `http://127.0.0.1:8000`

All endpoints except `/`, `/auth/register`, and `/auth/login` require an
`Authorization: Bearer <token>` header, where `<token>` comes from a
successful register/login response.

---

## Auth

### POST /auth/register
Create an account.

Body:
```json
{ "name": "string", "email": "string", "password": "string (min 6 chars)",
  "designation": "string (optional)", "department": "string (optional)",
  "jobRole": "string (optional)", "education": "string (optional)" }
```
Returns `201` with `{ access_token, token_type, user }`.

### POST /auth/login
Body: `{ "email": "string", "password": "string" }`
Returns `200` with `{ access_token, token_type, user }`, or `401` on bad credentials.

---

## Profile

### GET /profile
Returns the logged-in user's profile.

### PUT /profile
Update any subset of the profile fields. Body (all optional):
```json
{ "name": "string", "designation": "string", "department": "string",
  "jobRole": "string", "education": "string",
  "experience": [{ "role": "string", "organization": "string", "years": 0 }],
  "previousTrainings": [{ "title": "string", "completedOn": "string" }],
  "competencyScores": { "SkillName": 0 } }
```
Returns the updated profile.

---

## Competency

### GET /competency/gaps
Compares the user's `competencyScores` against the `competencyFramework`
entries for their `jobRole`. Returns `400` if `jobRole` isn't set, `404` if
no framework exists for that role.

Response:
```json
{ "jobRole": "string", "overallReadinessPercent": 0,
  "skillGaps": [{ "domain": "string", "skill": "string", "requiredLevel": 0,
                  "currentLevel": 0, "gap": 0, "status": "met|gap" }] }
```

---

## Recommendations

### GET /recommendations
Uses the user's skill gaps + the course catalogue to ask Gemini for the top
5 courses, with a one-line justification each. Returns `404` if no courses
are seeded, `502` if Gemini fails or returns unusable output.

Response:
```json
{ "jobRole": "string",
  "recommendations": [{ "id": "string", "title": "string", "domain": "string",
                         "skillTags": ["string"], "level": "string",
                         "durationHrs": 0, "description": "string", "link": "string",
                         "justification": "string" }] }
```

---

## Quiz

### POST /quiz/generate
Multipart form upload. Field `file`: a `.pdf`, `.pptx`, or `.docx` file.
Query param `num_questions` (default 5, max 15).

Extracts text from the file, asks Gemini for MCQs, stores the quiz, and
returns the questions **without** answers:
```json
{ "quizId": "string", "sourceFileName": "string",
  "questions": [{ "index": 0, "question": "string", "options": ["string", "string", "string", "string"] }] }
```

### POST /quiz/submit
Body: `{ "quizId": "string", "answers": ["string", ...] }` (same order as
the questions returned by `/quiz/generate`).

Returns `403` if the quiz doesn't belong to the caller. Otherwise:
```json
{ "score": 0, "correctCount": 0, "totalQuestions": 0,
  "feedback": [{ "question": "string", "yourAnswer": "string", "correctAnswer": "string",
                 "isCorrect": true, "explanation": "string" }] }
```

---

## Dashboard

### GET /dashboard/employee
The logged-in user's own stats: quiz history, average score, and current
competency gaps (if `jobRole` and a matching framework are set).

### GET /dashboard/admin
Org-wide stats: total users, total quiz attempts, org-wide average score,
and a per-`jobRole` breakdown (headcount + average readiness). Requires
`isAdmin: true` on the user document -- see `make_admin.py`. Returns `403`
for non-admin users.

---

## Chatbot

### POST /chatbot
Body: `{ "message": "string" }`

Proxies to Gemini with the user's `jobRole` and current skill gaps injected
as context. Returns `{ "reply": "string" }`, or `502` if Gemini fails.

---

## Utility scripts

- `seed_competency_framework.py` -- inserts sample `competencyFramework` documents.
- `seed_courses.py` -- inserts the mock course catalogue.
- `make_admin.py <email>` -- grants `/dashboard/admin` access to a user.

## Tests

Run `pytest` from the project root. Tests run against an in-memory fake
database (mongomock) and a mocked Gemini client, so they don't touch your
real Atlas cluster or Gemini quota.
