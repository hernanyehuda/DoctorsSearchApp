# Doctors Search Application

A full-stack web application for searching and filtering doctors, built with .NET Core API and React.

## Features

- Search and filter doctors by status and payment level
- Sort by rating, number of reviews, and promotion level
- Contact form with validation
- Responsive modern UI with animations
- RTL support

## Tech Stack

### Backend
- .NET 8.0
- C# with layered architecture (API, BL, DAL, Common)
- AutoMapper for object mapping
- Serilog for logging
- Repository pattern

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Bootstrap & React-Bootstrap for UI
- Axios for API calls
- React Icons

## Prerequisites

- .NET 8.0 SDK
- Node.js (v16 or higher)
- npm or yarn

## Installation & Setup

### Backend Setup

1. Navigate to the API project:
```bash
cd DoctorsSearchApp.Api

Restore dependencies:


dotnet restore

Run the API:


dotnet run
The API will start at https://localhost:7143 (port may vary)
Frontend Setup

Navigate to the frontend project:

bashcd DoctorsSearchApp.Frontend

Install dependencies:

npm install

Update the API URL in src/services/api.ts if needed
Run the development server:

npm run dev
The application will open at http://localhost:5173
📁 Project Structure
DoctorsSearchApp/
├── DoctorsSearchApp.Api/       # Web API project
├── DoctorsSearchApp.BL/        # Business Logic layer
├── DoctorsSearchApp.DAL/       # Data Access layer
├── DoctorsSearchApp.Common/    # Shared DTOs and interfaces
└── DoctorsSearchApp.Frontend/  # React application

Key Features Implementation

Multi-layer Architecture: Clean separation of concerns with DAL, BL, and API layers
SOLID Principles: Dependency injection, interface segregation
Error Handling: Global exception middleware with logging
Data Validation: Both client and server-side validation
Modern UI/UX: Gradient backgrounds, smooth animations, responsive design

Author
Hernan Yehuda
📄 License
This project was created as a technical assessment.