# 🌌 DarkBlog — Role-Based Blogging Platform

A modern, premium blogging platform with role-based access control built using **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login/signup
- 👥 **Role-Based Access** — User and Admin roles
- ✍️ **Rich Writing Experience** — Live preview while writing
- 🎨 **Premium Dark UI** — Glassmorphism with gradient accents
- 🔍 **Search & Filter** — Find posts by title, content, or author
- 📱 **Fully Responsive** — Works on all devices
- 🗑️ **Smart Deletion** — Users delete own posts, Admins delete any post

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd "role base management system"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5000
JWT_SECRET=your_secret_key_here
```

### 4. Run the application
```bash
node server.js
```

Or with nodemon (auto-restart):
```bash
npx nodemon server.js
```

### 5. Open in browser
```
http://localhost:5000
```

---

## 👤 User Roles

### Regular User
- Sign up freely
- Write and publish posts
- Delete own posts only
- Read all posts

### Admin
- All user permissions
- Delete **any** post
- Manage entire platform

---

## 🛡️ How to Create an Admin User

**Important:** Admin role cannot be selected during signup for security reasons.

### Method 1: Using MongoDB Compass (Recommended)
1. Open **MongoDB Compass**
2. Connect to your database
3. Go to your database → `users` collection
4. Find the user you want to make admin
5. Edit the document
6. Change `role` field from `"user"` to `"admin"`
7. Save

### Method 2: Using MongoDB Shell
```javascript
use roleAuthDB

db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Method 3: Direct Database Query
```javascript
// In MongoDB Atlas → Collections → users → Find user → Edit
role: "admin"
```

---

## 📁 Project Structure

```
role base management system/
├── models/
│   ├── user.js          # User schema (name, email, password, role)
│   └── blog.js          # Blog schema (title, body, author, timestamps)
├── routes/
│   ├── auth.js          # Login & Signup routes
│   └── blogs.js         # CRUD operations for blogs
├── public/
│   ├── index.html       # Landing page
│   ├── login.html       # Login page
│   ├── signup.html      # Signup page
│   ├── dashboard.html   # Main dashboard with all posts
│   ├── create.html      # Write new post
│   └── style.css        # Premium dark theme CSS
├── server.js            # Express server setup
├── .env                 # Environment variables (not in git)
└── package.json         # Dependencies
```

---

## 🔑 API Endpoints

### Auth Routes
- `POST /api/signup` — Create new user account
- `POST /api/login` — Login and get JWT token

### Blog Routes
- `GET /api/blogs` — Get all blogs (public)
- `GET /api/blogs/:id` — Get single blog
- `POST /api/blogs` — Create new blog (authenticated)
- `DELETE /api/blogs/:id` — Delete blog (owner or admin only)

---

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Backend runtime |
| **Express** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Axios** | HTTP client (frontend) |

---

## 📸 Screenshots

### Landing Page
Beautiful hero section with feature cards

### Dashboard
Grid of blog posts with search and filter

### Write Page
Split layout with live preview

### Auth Pages
Glassmorphism cards with floating logo animation

---

## 🔐 Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens with 1-hour expiration
- ✅ Role-based route protection
- ✅ Input validation on server
- ✅ XSS protection (HTML escaping)
- ✅ No admin signup from UI

---

## 🌟 UI Highlights

- Animated gradient mesh background
- Glassmorphism cards with backdrop blur
- Gradient text headings
- Smooth hover animations
- Toast notifications
- Modal popups with keyboard shortcuts
- Live character/word counters
- Password strength indicator
- Responsive design (mobile-first)

---

## 📝 Usage Guide

### For Users
1. Sign up with email and password
2. Login to access dashboard
3. Click "New Post" to write
4. View live preview while typing
5. Publish and share

### For Admins
1. Get admin role via database (see above)
2. Access dashboard — see all posts
3. Delete any post with one click
4. Manage platform content

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check `MONGO_URI` in `.env`
- Verify MongoDB Atlas IP whitelist (allow `0.0.0.0/0`)
- Ensure correct username/password

### Token Expired
- JWT tokens expire after 1 hour
- Logout and login again

### Admin Not Working
- Verify role in database is exactly `"admin"` (lowercase)
- Clear browser localStorage and login again

---

## 📦 Dependencies

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.4",
  "bcryptjs": "^3.0.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^17.2.3",
  "body-parser": "^2.2.0",
  "cors": "^2.8.5",
  "cookie-parser": "^1.4.7"
}
```

---

## 🚀 Deployment (Optional)

### Deploy on Render / Railway / Vercel
1. Push code to GitHub
2. Connect repo to platform
3. Add environment variables
4. Deploy

### Environment Variables for Production
```env
MONGO_URI=<your-production-mongodb-uri>
PORT=5000
JWT_SECRET=<strong-secret-key>
NODE_ENV=production
```

---

## 💡 Future Enhancements

- [ ] Edit post functionality
- [ ] Like/Comment system
- [ ] User profiles
- [ ] Categories/Tags
- [ ] Image uploads
- [ ] Markdown support
- [ ] Email verification
- [ ] Password reset
- [ ] Rate limiting
- [ ] Analytics dashboard

---

## 📄 License

MIT License — Free to use for personal and commercial projects.

---

## 👨‍💻 Author

**Your Name**  
Portfolio Project — Built with ❤️

---

## 🙏 Acknowledgments

- Design inspiration: Modern SaaS platforms
- Icons: Feather Icons (inline SVG)
- Fonts: Google Fonts (Inter)
- Color palette: Tailwind CSS

---

**⭐ If you like this project, give it a star on GitHub!**
