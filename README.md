
# TeamSync — Role-Based Team Collaboration & Project Management Platform

TeamSync is a full-stack web application designed to simplify team collaboration and project management. It enables project leads to organize projects, invite team members, assign tasks, set priorities and deadlines, and track progress through a structured Kanban workflow.

The application uses role-based permissions to distinguish the responsibilities of project leads and team members, helping teams manage their work in one centralized platform.

## ✨ Features

- **Authentication & Authorization:** JWT-based authentication with cookie-based token handling and protected routes.
- **Project Management:** Create and manage projects with relevant project details.
- **Role-Based Access:** Project creators act as leads, while assigned members can update their task progress.
- **Team Invitations:** Invite members to projects and allow them to accept or decline invitations.
- **Task Management:** Create tasks, assign members, set priorities, and manage deadlines.
- **Kanban Workflow:** Track tasks through four stages:
  - To Do
  - In Progress
  - In Review
  - Completed
- **Personalized Dashboard:** View associated projects and tasks organized by priority.
- **Persistent Storage:** Store user, project, task, and invitation data in MongoDB.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Interactive user interface |
| Tailwind CSS | Styling and responsive UI |
| Node.js | Server-side JavaScript runtime |
| Express.js | REST API development and request handling |
| MongoDB | Database for application data |
| JWT | Authentication and identity verification |
| Cookies | Authentication token handling |

## 🏗️ Application Architecture

TeamSync follows a client-server architecture in which the frontend communicates with the backend through HTTP requests and REST APIs.

```text
                 TeamSync
                    |
          +---------+---------+
          |                   |
     React Frontend       Express Backend
     (Tailwind CSS)       (Node.js)
                              |
                      Authentication &
                      Authorization
                              |
                         MongoDB
                              |
                 Users, Projects, Tasks,
                      Invitations
```

### How It Works

1. A user signs in and accesses protected application pages.
2. The user who creates a project becomes its project lead.
3. The lead invites team members and creates and assigns tasks.
4. Invited members can accept or decline invitations.
5. Members view their assigned work and update task statuses.
6. The backend validates requests and permissions before modifying data.

## 👥 Roles and Responsibilities

### Project Lead

- Create and manage projects.
- Invite team members.
- Create and assign tasks.
- Update task details, priorities, deadlines, and assignees.
- Monitor task progress through the Kanban workflow.

### Team Member

- View associated projects and assigned tasks.
- Accept or decline project invitations.
- Update the status of assigned tasks.

## 🚀 Getting Started

Follow these steps to run TeamSync locally.

### Prerequisites

Make sure you have installed:

- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/) or access to a MongoDB Atlas database

### 1. Clone the Repository

```bash
git clone https://github.com/Rkj2304034/TeamSync.git
cd TeamSync
```

### 2. Install Dependencies

Install the frontend dependencies:

```bash
cd frontend
npm install
```

Install the backend dependencies:

```bash
cd ../backend
npm install
```

**Note:** Replace `frontend` and `backend` with your actual directory names if they differ.

### 3. Configure Environment Variables

Create a `.env` file in the backend directory and add the variables required by your application.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Use the exact environment-variable names expected by your source code. Configure any required frontend variables separately.

**Important:** Never commit your real `.env` file, database credentials, JWT secrets, or API keys to GitHub.

### 4. Start the Backend

From the backend directory, run:

```bash
npm run dev
```

If your project does not define a `dev` script, use the command specified in its `package.json`.

### 5. Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm run dev
```

Open the local URL displayed by the frontend development server in your browser.

## 🔐 Security

- JWT-based authentication.
- Cookie-based token handling.
- Protected application routes and APIs.
- Backend-side authorization for restricted operations.
- Environment variables for sensitive configuration.

## 🔮 Future Improvements

- Real-time task updates and synchronization.
- Notifications for task assignments, deadlines, and invitations.
- Improved handling of simultaneous updates.
- Activity logs and project progress analytics.
- Enhanced team collaboration and reporting.

## 👨‍💻 Author

**Rahul Jha**

B.Tech — Electronics and Communication Engineering, NIT Patna

GitHub: [@Rkj2304034](https://github.com/Rkj2304034)

---

*TeamSync — Organize projects, collaborate with your team, and track progress efficiently.*
