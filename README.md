# StayFinder

StayFinder is a full-stack travel accommodation web application where users can explore stays, create property listings, upload photos, and share reviews with ratings. The project follows an MVC-style Express structure with EJS views, MongoDB persistence, Passport authentication, Cloudinary image storage, and MapLibre-powered listing maps.

## Links

- Live demo: https://stayfinder-tihl.onrender.com
- GitHub repository: https://github.com/Abdul-012/StayFinder

## Features

- User signup, login, logout, and session-based authentication
- Create, read, update, and delete property listings
- Listing ownership checks for protected edit and delete actions
- Review creation and deletion with author validation
- Star ratings from 1 to 5
- Cloudinary image uploads for listing photos
- MapLibre GL map view with OpenFreeMap tiles
- Location geocoding through OpenStreetMap Nominatim with fallback coordinate overrides
- Flash messages for success and error feedback
- Responsive EJS and Bootstrap UI
- Centralized validation with Joi
- Async route error handling with reusable utilities

## Tech Stack

| Layer | Technology |
| --- | --- |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Views | EJS, EJS Mate |
| Styling | Bootstrap 5, custom CSS |
| Authentication | Passport.js, passport-local, passport-local-mongoose |
| Uploads | Multer, Cloudinary, multer-storage-cloudinary |
| Maps | MapLibre GL, OpenFreeMap |
| Validation | Joi |
| Utilities | method-override, connect-flash, express-session |

## Project Structure

```text
.
├── app.js                  # Express application entry point
├── cloudConfig.js          # Cloudinary and Multer storage configuration
├── middleware.js           # Auth, ownership, and validation middleware
├── schema.js               # Joi validation schemas
├── controllers/            # Route handler logic
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/                 # Mongoose models
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
├── routes/                 # Express routers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/                  # EJS templates and layout partials
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
├── public/                 # Static CSS and client-side JavaScript
│   ├── css/
│   └── js/
├── utils/                  # Error handling and geocoding helpers
└── init/                   # Database seed script and sample listing data
```

## Getting Started

### Prerequisites

- Node.js 18 or newer recommended
- npm
- MongoDB running locally on `mongodb://127.0.0.1:27017/wanderlust`
- Cloudinary account for image uploads

### Installation

1. Clone the repository.

```bash
git clone https://github.com/Abdul-012/StayFinder.git
cd StayFinder
```

2. Install dependencies.

```bash
npm install
```

3. Create your environment file.

```bash
cp .env.example .env
```

4. Add your Cloudinary credentials to `.env`.

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

5. Start MongoDB locally, then seed sample data.

```bash
npm run seed
```

6. Start the app.

```bash
npm start
```

The local server runs at:

```text
http://localhost:8080
```

## Available Scripts

```bash
npm start
```

Starts the Express server.

```bash
npm run seed
```

Clears existing listings and inserts sample listings with a demo owner.

```bash
npm test
```

Runs JavaScript syntax checks across the main application files.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUD_API_KEY` | Yes | Cloudinary API key |
| `CLOUD_API_SECRET` | Yes | Cloudinary API secret |

MapLibre GL and OpenFreeMap do not require an API key in this project.

## Main Routes

### Listings

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/listings` | Show all listings |
| `GET` | `/listings/new` | Show the new listing form |
| `POST` | `/listings` | Create a listing |
| `GET` | `/listings/:id` | Show one listing |
| `GET` | `/listings/:id/edit` | Show the edit form |
| `PUT` | `/listings/:id` | Update a listing |
| `DELETE` | `/listings/:id` | Delete a listing |

### Reviews

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/listings/:id/reviews` | Add a review |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete a review |

### Users

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/signup` | Show signup page |
| `POST` | `/signup` | Register a user |
| `GET` | `/login` | Show login page |
| `POST` | `/login` | Log in a user |
| `GET` | `/logout` | Log out current user |

## Seed User

The seed script creates or reuses a demo owner account:

```text
Username: seedowner
Password: seedowner123
```

## Notes

- The current branch is configured for a local MongoDB database in `app.js` and `init/index.js`.
- Do not commit `.env`; use `.env.example` as the template.
- Image uploads require valid Cloudinary credentials.
- Listing maps use stored GeoJSON-style coordinates from the geocoding helper.

## Author

Built by Abdul Rahman.

## License

This project is licensed under the ISC License.
