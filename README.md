# Feastify

**Feastify** is a food ordering application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This app allows users to browse food items, place orders, and make secure payments using Stripe. Admins can manage food items, view orders, and perform other essential administrative functions.

## Live Demo

- **Admin Panel**: [Feastify Admin Panel](https://feastify-admin.onrender.com/list)
- **App**: [Feastify App](https://feastify-frontend-ip1a.onrender.com)

## Key Features

### User Features:
- **User Registration & Login**: Users can sign up and log in to their accounts.
- **Browse Food Items**: Users can explore the menu, view details, and add items to the cart.
- **Cart Functionality**: Add, remove, and update quantities of items in the cart.
- **Place Order & Stripe Payment**: Secure payments through Stripe integration.
- **Order History**: View previous orders and their details.
  
### Admin Features:
- **Admin Panel**: 
  - Add, remove, and list food items.
  - Manage user orders in real-time.
  - View all placed orders.
- **Order Management**: Admins can view and manage active orders from users.
  
### UI & UX Features:
- **Smooth Scrolling**: Enhanced user experience with smooth scrolling on the homepage.
- **Responsive Design**: Fully responsive, ensuring usability across all devices.

## Project Structure

### Backend:
- **Database**: MongoDB
- **API**: Express.js RESTful API for handling user authentication, orders, and item management.
- **Stripe Integration**: Secure payment handling via Stripe.

### Frontend:
- **React.js**: Single-page application (SPA) for handling user interactions.
- **State Management**: Managing cart, orders, and user data via React's state management system.
- **Responsive UI**: Built with responsiveness in mind, ensuring a seamless experience across devices.

## Setup & Installation

1.## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/axdityax25/feastify.git
Install Dependencies:

Navigate to the client and server directories and install the required packages:
bash
Copy code
cd client && npm install
cd ../server && npm install
Set Up Environment Variables: Create a .env file in the server directory and include your MongoDB URI, Stripe keys, and JWT secrets. Example:

bash
Copy code
MONGODB_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
Run the Application:

Start the backend server:
bash
Copy code
cd server
npm start
Start the frontend:
bash
Copy code
cd client
npm start
Access the Application:

Open your browser and navigate to http://localhost:3000 to view the application.
Commit Highlights
Added Cart Features: Users can add and manage items in the cart.
Added Place Order & Stripe Payment Feature: Integrated secure payments through Stripe.
Created Admin Panel: Admins can manage food items, view, and track orders in real-time.
Fetched Data On Frontend From Database: Displaying real-time data from MongoDB in the app.
Added Smooth Scrolling: Implemented smooth scrolling for an improved user experience.
Responsive UI: Ensuring the app is fully usable across all devices (mobile, tablet, desktop).
Technologies Used
MongoDB: Database for storing user information, orders, and food items.
Express.js: Backend framework for handling API requests and database communication.
React.js: Frontend library for building an interactive user interface.
Node.js: Server-side runtime for executing JavaScript code.
Stripe: Integration for handling secure payments.
JWT (JSON Web Token): Used for authentication and securing API requests.
