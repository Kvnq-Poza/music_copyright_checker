
# Music License Checker Backend

This is the backend of the Music License Checker app, built with TypeScript, Express, and MongoDB. It provides APIs for user authentication, checking music licenses by name or link, and managing tags for music categorization.

## Table of Contents
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```plaintext
|____package-lock.json         # Dependency lock file
|____package.json              # Dependency management and scripts
|____.env                      # Environment variables (not committed)
|____tsconfig.json             # TypeScript configuration
|____src
| |____services                # Business logic and API interactions
| |____routes                  # API routes
| |____models                  # Database models
| |____controllers             # Controller functions for handling requests
| |____dist                    # Compiled output files
| |____utils                   # Utility functions
| |____middleware              # Middleware functions
| |____public                  # Publicly accessible files and HTML
| |____database.ts             # Database connection
| |____adapter                 # Database adapter
```

## Installation

1. **Clone the repository**: You should have cloned the repo by now but if not you can use the command below.
   ```bash
   git clone https://github.com/abrhamgg/music_licence_checker.git
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MongoDB**:
   Ensure MongoDB is installed and running on your local machine or use a cloud MongoDB instance.

## Environment Variables

Create a `.env` file in the root directory and add the following:

```plaintext
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
YOUTUBE_API_KEY=""
```

## Usage

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Run in production**:
   ```bash
   npm start
   ```

## Endpoints

### Music Routes (`/musicRoutes.ts`)

- `POST /` - Create a new music entry (authenticated).
- `GET /user` - Retrieve all music entries by the authenticated user.
- `POST /create-bulk` - Bulk create music entries.
- `GET /all` - Retrieve all music entries.
- `GET /last-checked/:n` - Retrieve the last `n` checked music entries.

### Auth Routes (`/authRoutes.ts`)

- `POST /login` - Authenticate a user and obtain a token.

### Tag Routes (`/tagRoutes.ts`)

- `GET /` - Get all tags.
- `GET /:tagName` - Get a specific tag by name.
- `POST /:tagName/count` - Update the count of a specific tag.
- `GET /top/:topN` - Get the top `N` tags.
- `DELETE /` - Delete all tags.

### User Routes (`/userRoutes.ts`)

- `GET /` - Retrieve all users.
- `GET /:id` - Retrieve a user by ID.
- `POST /` - Create a new user.
- `PUT /:id` - Update a user by ID.
- `DELETE /:id` - Delete a user by ID.

### YouTube Routes (`/youtubeRoutes.ts`)

- `GET /search` - Search for videos on YouTube.
- `GET /video` - Check a video’s license status by URL.
- `GET /video-by-name` - Check a video’s license status by video name.

## Contributing

Contributions are welcome! Please open issues for suggestions or pull requests for improvements.

## License

This project is licensed under the MIT License.
