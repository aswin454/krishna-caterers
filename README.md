# Krishna Caterers

A premium MERN stack portfolio website for a traditional Kerala vegetarian catering business.

## Technologies Used
- Frontend: React (Vite), Tailwind CSS, React Router, Lucide Icons
- Backend: Node.js, Express, MongoDB (optional)

## Setup Instructions

### 1. Client Setup
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### 2. Server Setup (Optional)
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and update the `MONGODB_URI` if you want to use MongoDB.
4. Start the server: `npm run dev`

If MongoDB is not configured, the server will gracefully fallback to an in-memory array to store enquiries temporarily for development.
