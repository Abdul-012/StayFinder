# 🏡 StayFinder

A full-stack web application for discovering and sharing travel accommodations. Users can create listings, write reviews, upload images, and explore properties with an interactive map interface.

## ✨ Features

- **User Authentication**: Secure signup and login with Passport.js
- **Property Listings**: Create, edit, and delete travel accommodations with detailed information
- **Reviews & Ratings**: Add star ratings (1-5) and comments to listings
- **Interactive Maps**: View listing locations with MapLibre GL and OpenFreeMap integration
- **Image Uploads**: Upload listing photos directly to Cloudinary with automatic optimization
- **Geolocation**: Auto-geocode property locations with coordinate overrides for accuracy
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Flash Messages**: Real-time user feedback for all actions
- **Session Management**: Secure session handling with express-session

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine, Bootstrap 5
- **Authentication**: Passport.js with Local Strategy
- **Maps**: MapLibre GL 5.22.0 with OpenFreeMap tiles
- **File Storage**: Cloudinary with Multer integration
- **Geolocation**: OpenStreetMap Nominatim API
- **Validation**: Joi schema validation
- **Styling**: Bootstrap 5 + Custom CSS

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** running locally on port 27017
- **Cloudinary** account for image storage ([Sign up here](https://cloudinary.com/))

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd MajorProject
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env` with your Cloudinary credentials**:
   ```env
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

5. **Start MongoDB locally**:
   ```bash
   # Ensure MongoDB service is running
   # On macOS with Homebrew: brew services start mongodb-community
   ```

6. **Seed the database with sample listings**:
   ```bash
   npm run seed
   ```

7. **Start the development server**:
   ```bash
   npm start
   ```

The application will be (MVC Architecture)

```
├── controllers/        # Route logic handlers (Controller layer)
│   ├── listings.js     # Listing CRUD operations
│   ├── reviews.js      # Review management
│   └── users.js        # User authentication
├── models/            # MongoDB schemas (Model layer)
│   ├── listing.js      # Listing schema with geolocation
│   ├── reviews.js      # Review schema
│   └── user.js         # User schema with passport
├── routes/            # API route definitions
│   ├── listing.js      # Listing routes
│   ├── review.js       # Review routes
│   └── user.js         # Auth routes
├── views/             # EJS templates (View layer)
│   ├── listings/       # Listing pages (index, show with map, new, edit)
│   ├── users/          # User auth pages (login, signup)
│   └── includes/       # Reusable components (navbar, footer, flash)
├── public/            # Static assets
│   ├── css/           # Bootstrap 5 + Custom stylesheets
│   └── js/            # Client-side scripts (MapLibre GL integration)
├── utils/             # Helper utilities
│   ├── geocoding.js    # OpenStreetMap Nominatim integration
│   ├── wrapAsync.js    # Async error handling wrapper
│   └── ExpressError.js # Custom error class
├── init/              # Database seeding with sample data
├── middleware.js      # Custom middlewares (auth, validation, ownership checks)
├── schema.js          # Joi validation schemas
├── cloudConfig.js     # Cloudinary configuration for image uploads
└── app.js             # Express appdlewares
├── schema.js          # Joi validation schemas
└── cloudConfig.js     # Cloudinary configuration
```

## 🔑 Available Routes

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Create new listing form
- `POST /listings` - Submit new listing
- `GET /listings/:id` - View listing details
- `GET /listings/:id/edit` - Edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

### Users
- `GET /signup` - Signup form
- `POST /signup` - Register new user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## 🧪 Testing

Run syntax checks on all JavaScript files:
```bash
npm test
```

This verifies code syntax without executing the application.

## 🌍 Environment Variables

Create a `.env` file with the following variables:

```env (Required for image uploads)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# App Environment
NODE_ENV=development
```

**Note**: MapLibre GL and OpenFreeMap work without additional API keys, but Cloudinary is required for photo uploads.E_ENV=development
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `init/index.js` and `app.js`

### Image Upload Fails
- Verify Cloudinary credentials in `.env`
- Check that `.env` file is in the project root

### "Cannot find module" Error
- Run `npm install` again to ensure all dependencies are installed
- Delete `node_modules` and reinstall if issues persist: `rm -rf node_modules && npm install`

## 📝 Database Seeding

The seed script (`npm run seed`) automatically:
- Clears existing listings
- Creates a demo user account
- Inserts sample listings with geolocation data

**Demo User Credentials**:
- Username: `seedowner`
- Password: `seedowner123`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

Created as a full-stack web development project.

---

**Happy travels with StayFinder! 🌍✈️**
