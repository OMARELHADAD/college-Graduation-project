# Skillverse - Freelance Marketplace Platform

A modern, full-stack freelance marketplace platform built with React, Node.js, Express, and MongoDB.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Team](#team)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

## 🎯 Overview

Skillverse is a comprehensive freelance marketplace platform that connects freelancers with clients, offering a seamless experience for browsing services, placing orders, and managing projects. The platform features modern UI/UX design, dark mode support, and a complete payment simulation system.

This project was developed as a graduation project at the Higher Institute of Management and Information Technology (HIMIT) in Kafr Elsheikh, Egypt.

## ✨ Features

### Core Functionality
- **User Authentication**: Secure registration and login system with JWT
- **Service Listings (Gigs)**: Browse and search freelance services
- **Seller Dashboard**: Create and manage service offerings
- **Order Management**: Track and manage orders for buyers and sellers
- **Messaging System**: Real-time communication between buyers and sellers
- **Payment Simulation**: Complete fake payment process for demonstration

### Design & UX
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Fully responsive across all devices using Bootstrap
- **Modern UI**: Clean, elegant interface with smooth animations
- **Hover Effects**: Interactive elements throughout the platform
- **Professional Typography**: Google Fonts integration (Montserrat, Roboto, Inter)

### Pages
- Home page with featured services
- Gigs browsing and filtering
- Individual gig details
- User profile and seller dashboard
- Orders history
- Messages inbox
- About Us
- Contact Us

## 👥 Team

### Development Team
- **Omar Elhadad** - Front-End Developer
- **Zyad Elhosiny** - Back-End Developer
- **Mahmoud Khedr** - Data Analyst & AI Model Supervisor
- **Rahma Ahmed** - UI & UX Designer
- **Zyad Nagdy** - UI & UX Designer

### Supervision
- **Dr. Reham Eisaa** - Professor
- **Dr. Amira Elattar** - Professor
- **Eng. Sally Abdelrazerk** - Co-Professor

## 🛠 Technologies

### Frontend
- React 18
- React Router DOM
- Bootstrap 5
- Animate.css
- Sass/SCSS
- Axios
- TanStack Query (React Query)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcrypt for password hashing
- Cookie Parser
- CORS

### Development Tools
- Vite (Build tool)
- ESLint
- Nodemon

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Final Graduation Project"
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../api
   npm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the `api` directory:
   ```
   MONGO=mongodb://localhost:27017/skillverse
   JWT_KEY=your_jwt_secret_key
   STRIPE=your_stripe_key_if_needed
   ```

5. **Start MongoDB**

   Make sure MongoDB is running locally or update the connection string to your MongoDB Atlas cluster.

6. **Run the Application**

   **Terminal 1 - Backend:**
   ```bash
   cd api
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd Frontend
   npm run dev
   ```

7. **Access the Application**

   Open your browser and navigate to `http://localhost:5173`

## 🚀 Usage

### For Buyers
1. Register an account
2. Browse available gigs
3. Select a gig and click "Continue"
4. Complete the fake payment process
5. View your orders in the Orders page
6. Communicate with sellers via Messages

### For Sellers
1. Register with "Become a Seller" option
2. Create new gigs from the dashboard
3. Manage your gigs
4. View incoming orders
5. Communicate with buyers

### Additional Features
- **Dark Mode**: Click the moon/sun icon in the navbar to toggle
- **About Us**: Learn more about the team and project
- **Contact Us**: View HIMIT information

## 📁 Project Structure

```
Final Graduation Project/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React contexts (Dark Mode)
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   ├── App.scss         # Global styles
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
├── api/
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── server.js            # Server entry point
│   └── package.json
└── README.md
```

## 📄 License

This project is a graduation project for educational purposes at HIMIT.

---

**Developed with ❤️ by the Skillverse Team**

© 2025-2026 Skillverse - HIMIT Graduation Project
