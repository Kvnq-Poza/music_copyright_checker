

# Music License Checker

The Music License Checker app is designed for content creators who want to verify whether a YouTube video is copyrighted. By checking either a link or a name, users can quickly determine if they can use a video without risking copyright infringement. This app is particularly useful for YouTubers, filmmakers, and anyone who regularly works with online media.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation and Setup](#installation-and-setup)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Additional Documentation](#additional-documentation)

---

## Project Overview

The Music License Checker application has two main parts:

1. **Frontend**: An Angular application that provides a user-friendly interface for entering video URLs or names, initiating license checks, and displaying results.
2. **Backend**: An Express server that handles requests, checks YouTube videos for copyright status, and provides responses to the frontend.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abrhamgg/music_licence_checker.git
   cd music-license-checker
   ```

2. **Install dependencies** for both the frontend and backend:

   - **Backend**:
     ```bash
     cd backend
     npm install
     ```

   - **Frontend**:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Configuration**: 
   - Ensure API keys or other configuration details are set up in the environment files. 
   - Refer to the backend and frontend README files for specific configuration details.

## Project Structure

```
|____backend/                   # Backend folder containing server-side code
| |____README.md                # Backend-specific documentation
|____frontend/                  # Frontend folder containing client-side Angular app
| |____README.md                # Frontend-specific documentation
|____README.md                  # Root project documentation
|____package.json               # Root project package manifest (if applicable)
```

## Running the Application

1. **Start the Backend**: 
   - Navigate to the backend folder and run:
     ```bash
     npm start
     ```
   - The backend server must be running before starting the frontend.

2. **Start the Frontend**:
   - Open a new terminal, navigate to the frontend folder, and run:
     ```bash
     npm start
     ```

3. **Access the Application**:
   - Open a browser and go to `http://localhost:4200` to use the app.

## Additional Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

