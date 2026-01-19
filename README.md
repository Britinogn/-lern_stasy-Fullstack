# LernStasy Client

The frontend application for **LernStasy**, a modern e-learning platform functioning as a marketplace for instructors and students. Built with **Vue 3**, **Vite**, and **Tailwind CSS**.

## 🚀 Technologies

- **Framework**: [Vue 3](https://vuejs.org/) (Script Setup, Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **PWA**: [Vite PWA](https://vite-pwa-org.netlify.app/)
- **Icons**: [Heroicons](https://heroicons.com/)
| **Runtime**     | [Node.js](https://nodejs.org/)              | JavaScript 

## ✨ Features

### 🎓 Student

- **Browse Courses**: View available courses with filtering and search.
- **Enrollment**: Enroll in courses and track progress.
- **Learning Interface**: Dedicated views for lessons and course content.
- **Dashboard**: Manage enrolled courses and view progress (`src/views/Student`).

### 👨‍🏫 Instructor

- **Course Management**: Create, edit, and manage courses (`src/views/Course*.vue`).
- **Lesson Management**: Add and organize lessons within courses.
- **Dashboard**: Overview of created courses and student engagement (`src/views/Instructor`).

### 🔐 Authentication

- User Registration and Login.
- Password Reset flow.
- Protected routes (Instructor/Student specific).

## 📂 Project Structure

```bash
src/
├── components/   # Reusable UI components (NavBar, Sidebar, Cards, etc.)
├── layouts/      # App layouts
├── routes/       # Vue Router configuration
├── services/     # API services (auth.js, api.js)
├── views/        # Page components
│   ├── Instructor/ # Instructor-specific views
│   ├── Student/    # Student-specific views
│   └── ...         # Public views (Home, Login, Courses, etc.)
├── App.vue       # Root component
├── main.js       # App entry point
└── style.css     # Global styles & Tailwind imports
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Start the development server:

```bash
npm run dev
```

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```
