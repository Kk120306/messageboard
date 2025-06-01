# 📬 MessageBoard

A message board web application where users can sign up, log in, and post messages. Features membership-based access and admin controls. Built with Express, EJS, PostgreSQL, and Passport.js for authentication.

---

🌐 **Live Demo**  
🔗 [View Deployed Site](https://sorry-ardith-kk120306-222d90c4.koyeb.app/) - Database currently offline due to payment required

---

## 🔧 Features

- 🔐 User authentication with Passport.js (local strategy)
- 📝 Authenticated users can create, edit, and delete their own messages
- 🧑‍🤝‍🧑 Members see sender names and timestamps, others see masked info (Code is "chicken")
- 🧑‍💼 Admin users can edit or delete any message
- ✅ Server-side form validation with error messages
- 🎨 Responsive UI styled with Tailwind CSS

---


## 🛠 Tech Stack

- **Backend**: Node.js, Express, Passport.js (local strategy)
- **Frontend**: EJS templating, Tailwind CSS
- **Database**: PostgreSQL (via pg or ORM)
- **Session Management**: express-session
- **Password Hashing**: bcrypt


---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Kk120306/messageboard.git
cd messageboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup PostgreSQL
Create a PostgreSQL database and update your connection info in the config or environment variables.

### 4. Configure environment variables
Create a `.env` file in the root with:
```env
PORT=3000
DATABASE_URL=postgresql://username:password@host:port/dbname
SESSION_SECRET=your_session_secret
```

### 5. Run migrations (if any)
If you use any migration tool (e.g., sequelize-cli or knex), run migrations here.

### 6. Start the development server
```bash
npm run dev
```
