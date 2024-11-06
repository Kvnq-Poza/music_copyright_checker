

# Music License Checker App - Frontend

This is the frontend of the Music License Checker app, an Angular-based application for users to verify music licenses. The app features various interactive components for users to search for music, view licensing information, and navigate easily through the interface.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Key Components and Services](#key-components-and-services)
- [Environment Configuration](#environment-configuration)

---

## Installation

> **Note:** Ensure the backend service is running before starting the frontend app. The frontend relies on the backend for API calls and data fetching.

1. Clone the repository: You should have cloned the repo by now but if not you can use the command below.
   ```bash
   git clone https://github.com/abrhamgg/music_licence_checker.git
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server (see backend setup instructions if needed).

4. Run the frontend development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

## Project Structure

```
|____angular.json                 # Angular CLI configuration file
|____package.json                 # Node.js dependencies
|____src                          # Main source folder for the app
| |____app                        # Main application folder
| | |____components               # UI components
| | | |____music-checker          # Component for checking music
| | | |____music-gallery          # Music gallery display component
| | |____services                 # Angular services
| |____environments               # Environment configuration files
|____public                       # Static assets like icons and images
|____server.ts                    # Entry point for server-side rendering (SSR)
```

## Available Scripts

In addition to the default Angular CLI commands, the following custom scripts are available:

- **`npm start`**: Runs the application in development mode.
- **`npm run build`**: Builds the application for production in the `dist/` directory.
- **`npm run watch`**: Rebuilds the application in watch mode with the development configuration.
- **`npm run serve:ssr:music-license-checker`**: Starts the server for the SSR (server-side rendering) version.

## Dependencies

### Main Dependencies

- **Angular** (`@angular/core`, `@angular/common`, `@angular/forms`, etc.): Provides the core framework for building the app and includes modules for routing, animations, and form handling.
- **@angular/material** and **@angular/cdk**: Used for implementing Material Design components.
- **Express**: Handles server-side rendering and routing for the SSR version of the app.
- **RxJS**: Reactive programming library used with Angular.

### Development Dependencies

- **@angular-devkit/build-angular**: Tools for building Angular projects.
- **Karma** and **Jasmine**: Testing frameworks for running unit tests.
- **TypeScript**: Superset of JavaScript used to write Angular code.

## Key Components and Services

- **Components**: 
  - **`music-checker`**: Allows users to search for music and check licenses.
  - **`music-gallery`**: Displays a gallery of music items.
  - **`toast`**: Displays notifications and alerts.
  - **`header`, `footer`, `navbar`**: Structural components for navigation.
  - **`landing-page`**: Main landing page with an overview of the app.

- **Services**: 
  - **`music-checker.service`**: Manages music searches and license verification.
  - **`auth.guard`**: Protects routes based on authentication status.
  - **`admin.service`**: Administrative functionality.
  - **`toast.service`**: Manages notifications throughout the app.

## Environment Configuration

The `src/environments` folder holds environment-specific settings:
- **`environment.ts`**: Development environment settings.
- **`environment.prod.ts`**: Production environment settings.

Update these files with relevant API endpoints, tokens, and configurations specific to each environment.

