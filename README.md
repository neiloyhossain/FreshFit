# FreshFit - AI-Powered Wardrobe Management System

## Project Overview
FreshFit is a comprehensive web application designed to help users manage their wardrobe and generate outfit combinations using AI-powered algorithms. The application features a modern, user-friendly interface that allows users to upload clothing items, organize their wardrobe, and receive intelligent outfit suggestions.

## Features

### Core Features
- **User Authentication**: Secure registration and login system with password hashing
- **Wardrobe Management**: Upload and organize clothing items by category
- **Outfit Generation**: AI-powered algorithm that creates outfit combinations
- **Outfit History**: Track and view previously generated outfits
- **Profile Management**: User profile and settings management
- **Image Upload**: Support for multiple image formats (JPG, PNG, WebP, AVIF)

### Additional Features
- Responsive design for desktop and mobile devices
- Real-time outfit generation with visual preview
- Category-based clothing organization
- Secure file upload system with validation
- RESTful API architecture

## Technology Stack

### Frontend
- **React 19.1.0**: Modern React with hooks and functional components
- **React Router DOM 7.6.2**: Client-side routing for single-page application
- **CSS3**: Custom styling with responsive design principles
- **JavaScript ES6+**: Modern JavaScript features and async/await

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js 5.1.0**: Web application framework for building RESTful APIs
- **MongoDB**: NoSQL database for data persistence
- **Mongoose 8.16.4**: MongoDB object modeling for Node.js

### Additional Tools
- **bcrypt 6.0.0**: Password hashing for security
- **multer 2.0.2**: File upload middleware
- **cors 2.8.5**: Cross-origin resource sharing
- **express-validator 7.2.1**: Input validation and sanitization

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- MongoDB Atlas account (for cloud database)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5050
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend server will run on `http://localhost:5050`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will run on `http://localhost:3000`

## Project Structure

```
FreshFit/
├── backend/
│   ├── models/
│   │   ├── usermodel.js
│   │   ├── wardrobemodel.js
│   │   └── outfitmodel.js
│   ├── routes/
│   │   ├── authroute.js
│   │   ├── wardroberoute.js
│   │   └── outfitroute.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication

### Wardrobe Management
- `POST /api/wardrobe/upload` - Upload clothing item
- `GET /api/wardrobe/items` - Get all wardrobe items
- `DELETE /api/wardrobe/items/:id` - Delete wardrobe item

### Outfit Generation
- `POST /api/outfits/generate` - Generate outfit combination
- `GET /api/outfits/history` - Get outfit history

## Database Models

### User Model
```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: Date.now)
}
```

### Wardrobe Item Model
```javascript
{
  name: String (required),
  category: String (required),
  imageURL: String (required),
  uploadedBy: String (default: "Neiloy Hossain")
}
```

### Outfit Model
```javascript
{
  items: [ObjectId] (references to WardrobeItem),
  generatedAt: Date (default: Date.now)
}
```

## Usage

1. **Registration/Login**: Create an account or log in to access the application
2. **Upload Clothing**: Add clothing items to your wardrobe with categories
3. **Generate Outfits**: Use the outfit generator to create combinations
4. **View History**: Check your previously generated outfits
5. **Manage Profile**: Update your profile information and preferences

## Security Features

- Password hashing using bcrypt
- Input validation and sanitization
- Secure file upload with type checking
- CORS configuration for cross-origin requests
- MongoDB injection protection through Mongoose

## Development

### Running in Development Mode
- Backend: `npm run dev` (uses nodemon for auto-restart)
- Frontend: `npm start` (uses React development server)

### Building for Production
- Frontend: `npm run build` (creates optimized build)
- Backend: `npm start` (runs production server)

## Contributing

This is a student project for Web App Design course. The project demonstrates proficiency in:
- React development
- Node.js server implementation
- Express.js API development
- MongoDB database integration

## Author

**Neiloy Hossain**
- Course: Web App Design
- Technologies: React, Node.js, Express.js, MongoDB
- Project: FreshFit - AI-Powered Wardrobe Management System

## License

This project is created for educational purposes as part of the Web App Design course curriculum. 