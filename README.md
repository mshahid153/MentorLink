# MentorLink

MentorLink is a platform that allows students to book 1x1 sessions with mentors. The project is designed to be mobile-friendly, providing an intuitive user experience.

## Features

- **Mentor Profiles**: Students can view mentor profiles, including their expertise and availability.
- **Booking System**: Seamless booking of 1x1 sessions with selected mentors.
- **Error Handling**: Robust error handling to ensure a smooth user experience.
- **Animated Loader**: An animated loading indicator to enhance the user experience during data fetching.
- **Mobile Friendly**: Fully responsive design for optimal viewing on mobile devices.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MySQL

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/mentorlink.git
   cd mentorlink
   ```

## Backend Setup:

1. **Navigate to the backend folder**:

```bash
cd backend
```

2. **Install dependencies**:

```bash
npm install
```

3. **Create a .env file and configure your MySQL connection settings**.

```bash
HOST=YOUR_HOST_NAME
USER=YOUR_USERNAME
PASSWORD=YOUR_PASSWORD
DATABASE=YOUR_DATABASE_NAME
```

4. **Database Setup**:

- Create a MySQL database and run the provided dbschema.sql file to set up the necessary tables.

- You can run the script using a MySQL client or command line:

```bash
mysql -u yourusername -p yourdatabase < dbschema.sql
```

5. **Start the backend server**:

```bash
node server.js
```

## Frontend Setup:

1. **Navigate to the frontend folder**:

```bash
cd ../frontend
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the frontend application**:

```bash
npm run dev
```

The app will be running on http://localhost:5173. Open this URL in your web browser to see the app in action
