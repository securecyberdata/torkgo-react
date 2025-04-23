# Crypto Investment Platform

A modern crypto investment platform built with Next.js and MongoDB.

## Features

- Public website for browsing and investing in crypto projects
- Admin panel for managing projects, team members, and content
- MongoDB database for data persistence
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 14.x or later
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following content:
   ```
   # API Configuration
   NEXT_PUBLIC_API_URL=https://sayariglobal.com/api

   # Database Configuration
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

4. Seed the database with default data:
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [https://sayariglobal.com](https://sayariglobal.com) in your browser to see the public website.
7. Open [https://sayariglobal.com/admin/login](https://sayariglobal.com/admin/login) to access the admin panel.

## Admin Panel

The admin panel allows you to manage:

- Projects: Add, edit, and delete crypto projects
- Team: Manage team members
- Content: Update website content

### Default Admin Credentials

- Email: admin@example.com
- Password: admin123

## Database Structure

The application uses MongoDB with the following collections:

- Projects: Stores information about crypto projects
- Team: Stores information about team members

## API Endpoints

The application provides the following API endpoints:

- `/api/projects`: GET (list all projects), POST (create a new project)
- `/api/projects/[id]`: GET (get a single project), PUT (update a project), DELETE (delete a project)
- `/api/team`: GET (list all team members), POST (create a new team member)

## Deployment

The application is deployed at [https://sayariglobal.com](https://sayariglobal.com)

## License

This project is licensed under the MIT License. 