# 🧠 LifeOps

**LifeOps** is a personal operations system to help you **manage tasks**, **track habits**, **automate routines**, and **boost productivity** through smart integrations and a sleek UI.

Built as a full-stack monorepo with:

- 🔧 **Backend**: Node.js, Express, MongoDB
- 🎨 **Frontend**: React (Vite)
- 🧱 **Architecture**: Modular monorepo for clean separation, reusability, and scalability

---

## 📁 Folder Structure

lifeops/
│
├── apps/
│   ├── backend/           # Node.js + Express + MongoDB
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── models/
│   │   │   ├── middlewares/
│   │   │   ├── services/
│   │   │   └── index.js   # Entry point
│   │   ├── .env
│   │   └── package.json
│   │
│   └── frontend/          # React (or your frontend framework)
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── hooks/
│       │   ├── utils/
│       │   └── main.jsx
│       ├── .env
│       └── package.json
│
├── packages/              # Reusable shared code (optional, great for utils/types)
│   └── common/            # e.g., shared validation functions or interfaces
│       └── index.js
│
├── .gitignore
├── README.md
└── package.json           # For managing workspaces (optional)



---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud)

### Getting Started

1. **Clone the repo:**

   ```bash
   git clone https://github.com/Satyendra-official/lifeOps.git
   cd lifeops

2. **Install Dependencies:**

    ```bash
    npm install

3. **Start backend:**

    ```bash
    cd apps/backend
    npm install
    node src/index.js

4. **Start frontend:**

    ```bash
    cd apps/frontend
    npm install
    npm run dev

---

### 🚀 Project Status

    ✅ Backend setup 
    ✅ Frontend setup 
    🚧 Currently working on:

    - Task & habit management pages

    - Edit/delete features

    - Filtering + calendar visualization


### 📌 Goals


    - 📋 Centralized task and habit management

    - 📧 Smart email & calendar integrations

    - 📅 Daily/weekly review automation

    - 🎨 Beautiful and minimal UI/UX

    - 🧩 Modular and scalable architecture



###  🙌 Contributions

    Pull requests, suggestions, and feedback are welcome! Let’s build something awesome together.

###  📄 License
    MIT License