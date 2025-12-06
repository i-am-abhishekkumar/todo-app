# Techie-blogs / 
A full-stack notes management application built with React and Node.js, allowing users to create, manage, and organize their notes with image support.
Deployed Link:
          🚀  🚀 Frontend:    https://techie-blog-9u6c.onrender.com/
          🚀 🚀  Backend:     https://techie-blogs-a40i.onrender.com/api/notes/


## 🚀 Features

### Authentication
- **User Registration**: Create new accounts with username, email, and password
- **User Login**: Secure authentication using JWT tokens
- **Password Security**: Passwords are hashed using bcryptjs
- **Protected Routes**: Private routes ensure only authenticated users can access notes

### Notes Management
- **Create Notes**: Add new notes with title, content, and optional image attachments
- **View Notes**: Display all your notes in a responsive grid layout, sorted by creation date
- **Update Notes**: Edit existing notes (title, content, or image)
- **Delete Notes**: Remove notes with automatic cleanup of associated images
- **Search Functionality**: Search notes by title with real-time filtering

### Image Support
- **Image Upload**: Attach images to notes using Multer
- **Image Management**: Automatic deletion of old images when updating or deleting notes
- **Image Storage**: Local file system storage for uploaded images

### User Experience
- **Responsive Design**: Modern UI built with Tailwind CSS that works on all devices
- **Real-time Search**: Instant search results as you type
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Comprehensive error handling and validation
- **User Isolation**: Each user can only access their own notes

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
T0-do-list/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & upload middleware
│   └── uploads/         # Uploaded images storage
└── frontend/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── context/     # Context providers
    │   └── api/         # API configuration
    └── public/          # Static assets
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL in `src/api/url.js` if needed

4. Start the development server:
```bash
npm run dev
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Notes
- `GET /api/notes` - Get all notes for authenticated user
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note (with optional image)
- `PUT /api/notes/:id` - Update a note (with optional image)
- `DELETE /api/notes/:id` - Delete a note

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes with middleware
- User-specific data access control
- Input validation and sanitization

## 🎨 UI Features

- Dark theme with modern design
- Responsive grid layout for notes
- Search bar with real-time filtering
- Image preview in note cards
- Loading and error states
- Clean and intuitive navigation

## 📸 Screenshots

The application features:
- Login/Signup pages
- Home page with notes grid
- Create/Edit note page
- Search functionality
- Image upload support

## 👤 Author

**Abhishek Kumar**

---

Built with ❤️ using React and Node.js

