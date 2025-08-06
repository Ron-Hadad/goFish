# Go Fish 🎣

**Go Fish** is a phishing simulation and awareness tool designed for security heads of companies to educate employees on how to avoid phishing attacks. The tool allows administrators to send phishing emails to employees and track whether they click on potentially dangerous links. If they do, they are safely redirected to educational resources about phishing prevention, helping them understand the risks and how to protect themselves in the future.

You can view the live project here: **[Go Fish on Render](https://gofish-wis3.onrender.com)**.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Live Demo](#live-demo)
4. [Installation](#installation)
5. [Technologies Used](#technologies-used)
6. [License](#license)

## Overview

Phishing is a growing threat in the digital age, especially with the increasing reliance on email and other communication tools. **Go Fish** helps companies run internal phishing simulations to assess and improve employee awareness of phishing attacks. The tool lets administrators:

- Add employees/contacts.
- Send phishing emails to selected contacts.
- Track how many employees clicked on the phishing link.
- Redirect users who clicked on the link to a learning page with government-approved resources to avoid future phishing attacks.

This project aims to provide a safe, educational experience for employees and valuable insights for administrators.

## Features

- **Admin Interface**: Allows admins to manage contacts, send phishing emails, and monitor results.
- **Email Tracking**: Tracks whether employees have opened the phishing email and clicked the malicious link.
- **Phishing Statistics**: Provides visual statistics (pie charts, bar charts) to show which contacts clicked the link and which did not.
- **Educational Redirect**: After clicking the phishing link, employees are taken to an educational page with resources to learn about the risks of phishing.
- **Department and Role Segmentation**: Statistics can be filtered by employee department and role for better analysis.

## Live Demo

You can view a live version of **Go Fish** here: [Go Fish Live](https://gofish-wis3.onrender.com)

## Installation

To run the project locally, follow the steps below:

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or later)
- **MongoDB** (local or cloud database)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Ron-Hadad/goFish.git
   cd gofish
   ```
2. Install the backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Create a .env file in the backend folder with the following contents:

   ```bash
   # Client URL
   CLIENT_URL='http://localhost:3000'

   # Database URI (replace with your MongoDB URI)
   MONGODB_URI="your_mongodb_uri_here"

   # JWT Secret Key
   JWT_SECRET='your_jwt_secret_here'

   # SendGrid API Key for sending phishing emails
   SENDGRID_API_KEY='your_sendgrid_api_key_here'

   # Email configuration for the system
   GENERIC_EMAIL_ADDRESS="your_email_here"
   GENERIC_EMAIL_ADDRESS_PASSWORD="your_email_password_here"
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory and install dependencies:

   ```bash
   cd frontend/my-app
   npm install
   ```

2. Create a .env file in the frontend folder with the following contents:
   ```bash
   REACT_APP_API_BASE_URL="http://localhost:3001/api"
   REACT_APP_BASE_URL="http://localhost:3001"
   ```
3. Start the frontend server:

   ```bash
   npm start
   ```

4. visit http://localhost:3000 in your browser to view the app.

## Technologies Used

This project uses the following technologies:

### Frontend:

- **React**: A JavaScript library for building user interfaces.
- **Recharts**: A charting library built with React, used for the pie chart display of phishing statistics.
- **Material UI (MUI)**: A React component library that provides modern, customizable UI elements.
- **Axios**: A promise-based HTTP client used for making API requests to the backend.

### Backend:

- **Node.js**: JavaScript runtime for executing server-side code.
- **Express.js**: A fast, unopinionated web framework for Node.js used for building the API.
- **MongoDB**: A NoSQL database for storing user, contact, and phishing campaign data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Token)**: Used for secure authentication and session management.
- **SendGrid API**: For sending phishing emails to the users from the admin panel.

### DevOps:

- **Render**: The app is deployed using Render for both frontend and backend services.
- **dotenv**: A module used to load environment variables from `.env` files into the process.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```

```
