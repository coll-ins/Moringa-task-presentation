## MoringaTaskFlow

MoringaTaskFlow is a student task management application built with React and Tailwind CSS. The application helps students organize assignments, projects, exams, and deadlines in one place.

## Features
1. Authentication
User Sign Up
User Login
Session persistence using LocalStorage
Form validation and error handling
2. Dashboard
Overview of total tasks
Completed tasks count
Pending tasks count
Due today statistics
3. Task Management
Create new tasks
Edit task details
Mark tasks as completed
Delete tasks
Search tasks
Filter tasks by status and priority
4. Calendar View
View tasks by deadline
Interactive calendar interface
Highlighted task dates
5. Profile Management
Update profile information
View account statistics
Delete account functionality
6. Responsive UI
Modern design using Tailwind CSS
Mobile-friendly layout
Sidebar navigation
Interactive task cards
## Technologies Used
1. Frontend
React
React Router DOM
Tailwind CSS
Lucide React Icons
2. State Management
React Hooks (useState, useEffect)
3. Storage
Browser LocalStorage
JSON Server (optional API support)
## Project Structure
src/
│
├── components/
│   └── Sidebar.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Home.jsx
│   ├── Tasks.jsx
│   ├── Calendar.jsx
│   ├── Profile.jsx
│   └── CreateTask.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── main.jsx
└── index.css
## Installation
1. Clone the Repository
git clone https://github.com/coll-ins/Moringa-task-presentation.git
2. Navigate into the Project Folder
cd Moringa-task-presentation
3. Install Dependencies
npm install
4. Start Development Server
npm run dev

The application will run on:

http://localhost:5173
Running JSON Server 

If using API functionality with db.json:

npx json-server --watch db.json --port 3000

Server runs at:

http://localhost:3000
## Usage Guide
1. Sign Up
Create a new account using your name, email, and password.
2. Login
Log in using registered credentials.
3. Create Tasks
Add tasks with:
. Title
. Due Date
. Priority
. Category
4. Manage Tasks
Mark tasks as completed
Delete unnecessary tasks
Search and filter tasks
5. Calendar
View deadlines by date
Select dates to view related tasks
## Future Improvements
Backend database integration
User authentication with Firebase
Drag and drop tasks
Notifications and reminders
Dark mode support
Task editing functionality
## Contributors
Tabitha Mburu
Collins
Mark
victor
## License

This project is created for educational purposes at Moringa School.
