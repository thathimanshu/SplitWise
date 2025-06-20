# 💸 Splitwise Clone — Full Stack App

This is a simplified **Splitwise clone** built using:

- **Frontend**: React + TailwindCSS  
- **Backend**: FastAPI  
- **Database**: PostgreSQL (via Docker)  
- **ORM**: SQLAlchemy

---

## 🚀 Getting Started (Docker Only)

### 🔧 Prerequisites

- [Docker](https://www.docker.com/) installed

---

### ⚙️ Setup & Run

```bash
# Clone the repo
git clone https://github.com/your-username/splitwise-clone.git
cd splitwise-clone

# Build and start the app
docker-compose up --build


Frontend: http://localhost:3000

Backend (API): http://localhost:8000

 API Endpoints
🔹 POST /groups/

Create a new group.

Request:
{
  "name": "Trip Goa",
  "user_ids": ["you", "Alice", "Bob"]
}

🔹 GET /groups/

Get all groups.
🔹 GET /groups/{group_id}

Get group details with members.
🔹 GET /groups/{group_id}/balances

Get simplified net balances within a group.

[
  { "from": "Alice", "to": "you", "amount": 50 },
  { "from": "Bob", "to": "Alice", "amount": 30 }
]

🔹 POST /expenses/

Add a new expense to a group.

{
  "description": "Dinner",
  "amount": 120,
  "paid_by": 1,
  "group_id": 2,
  "splits": [
    { "user_id": 1, "amount": 40 },
    { "user_id": 2, "amount": 40 },
    { "user_id": 3, "amount": 40 }
  ]
}

🔹 GET /balances/users/{user_id}

See all balances across all groups involving this user.

[
  { "from": "you", "to": "Alice", "amount": 25 },
  { "from": "Bob", "to": "you", "amount": 35 }
]

🔐 Assumptions

    "you" is the default user (user ID 1)

    No auth implemented (demo-only)

    Group members are fixed once created

    Netting logic is handled server-side

