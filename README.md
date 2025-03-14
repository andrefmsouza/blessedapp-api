# Blessed App API

A robust Node.js API built with TypeScript for managing sermon outlines and church presentations.

## 🚀 Features

- **Authentication** - Secure authentication using Firebase
- **User Management** - User registration and profile management
- **Sermon Outlines** - Create, read, update and delete sermon outlines
- **Bible References** - Support for Bible verses with different versions
- **Security** - Protected routes and data access control
- **Error Handling** - Centralized error handling with custom error types

## 🛠️ Technologies

- Node.js
- TypeScript
- Express
- Firebase Authentication
- Firestore Database
- Zod Validation
- JWT

## 📁 Project Structure

src/
├── adapter/ # Express adapter for controllers
├── config/ # Configuration files
├── controllers/ # Request handlers
├── middlewares/ # Express middlewares
├── models/ # Data models
├── repositories/ # Database access layer
├── routes/ # API routes
├── services/ # Business logic
├── types/ # TypeScript type definitions
├── utils/ # Utility functions
└── validators/ # Request validation schemas

## 🚦 API Routes

### Authentication
- `POST /v1/register` - Register new user
- `POST /v1/login` - User login

### Users
- `GET /v1/users/me` - Get current user profile

### Outlines
- `POST /v1/outlines` - Create new outline
- `GET /v1/outlines` - List all outlines
- `GET /v1/outlines/:id` - Get specific outline
- `PUT /v1/outlines/:id` - Update outline
- `DELETE /v1/outlines/:id` - Delete outline

## 🔧 Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/blessed-app-api.git
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

4. Set up Firebase
- Create a Firebase project
- Add Firebase configuration to .env
- Set up Firebase Authentication
- Configure Firestore Database

5. Run the project
```bash
npm run dev
```

## 🔒 Environment Variables

```env
PORT=3000
JWT_SECRET=your-jwt-secret

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key

# Firebase Client SDK
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_APP_ID=your-app-id
```

## 📝 API Documentation

### Outline Structure
```typescript
interface Outline {
    title: string;
    introduction: Topic[];
    development: Topic[];
    conclusion: Topic[];
}

interface Topic {
    type: 'text' | 'bible_reference';
    content: string | BibleReference;
}

interface BibleReference {
    version: string;
    book: string;
    chapter: number;
    verses: number[];
}
```

## 🔐 Security

- Firebase Authentication for user management
- JWT tokens for API authentication
- Route protection with custom middleware
- Data access control at the database level

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details