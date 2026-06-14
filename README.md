# 🎓 SmartLearn - Modern Learning Management System

A comprehensive, feature-rich Learning Management System built with **React**, **TypeScript**, and **Supabase**. Designed for universities and educational institutions with role-based dashboards, full customization, timetable management, and real-time collaboration.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-smart--learn--zeta.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://smart-learn-zeta.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-SmartLearn-black?style=for-the-badge&logo=github)](https://github.com/mohammad-sami-dev/SmartLearn)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mohammad%20Sami-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mohammad-sami-020635393/)

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vite](https://img.shields.io/badge/Vite-7.2-purple)

---

## 🌐 Live Demo

**🚀 [https://smart-learn-zeta.vercel.app/](https://smart-learn-zeta.vercel.app/)**

---

## 🌟 Key Features

### 🎨 **Customization System** ⭐
- **8 Color Themes**: Ocean Blue, Forest Green, Sunset Orange, Royal Purple, Cherry Red, Sakura Pink, Cyber Teal, Amber Gold
- **3 Dashboard Layouts**: Compact, Comfortable, Spacious
- **Dark/Light Mode**: Auto or manual theme switching
- **Persistent Preferences**: Saved across sessions
- **72 Visual Combinations**: (8 themes × 3 layouts × 3 modes)

### 📅 **Timetable System** ⭐
- **Daily Class Schedule**: Time, room, block location
- **Real-time Status**: Ongoing, upcoming, completed classes
- **Room Navigation**: Block A/B/C with room numbers (F201, C105, etc.)
- **Class Types**: Lecture, Lab, Tutorial color-coded
- **Teacher Schedule**: Teaching timetable with course codes

### 👨‍🎓 **Student Portal**
- **Personalized Dashboard**: Welcome message, stats, progress tracking
- **Course Learning Page**: 6 comprehensive tabs (Lessons, Assignments, Quizzes, Materials, Discussion, Grades)
- **Course Catalog**: Browse and enroll in courses
- **Live Classes**: Video conferencing with Jitsi Meet
- **AI Tutor**: Intelligent chatbot assistance
- **Search**: Find courses, assignments, lessons, discussions
- **Calendar**: View schedule and deadlines
- **Messages**: Real-time chat
- **Analytics**: Performance tracking

### 👨‍🏫 **Teacher Portal**
- **Teaching Dashboard**: Course overview, student stats
- **Course Management**: Create and manage courses
- **Assignment Creator**: Build assignments with rubrics
- **Quiz Builder**: Create quizzes with multiple question types
- **Grading Interface**: Efficient grading with feedback
- **Student Roster**: Track progress and attendance
- **Live Class Management**: Schedule and host sessions
- **Announcements**: Broadcast to students

### 👨‍💼 **Admin Portal**
- **System Dashboard**: Overall statistics and metrics
- **User Management**: CRUD operations for all users
- **Course Builder**: Create courses from scratch
- **Financial Management**: Revenue and payment tracking
- **Notification Management**: Send targeted notifications
- **Disciplinary System**: Manage student conduct
- **Reports**: Comprehensive analytics and reports

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript 5, Vite 7 |
| Styling | Tailwind CSS, Shadcn/ui, Radix UI |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Routing | React Router v6 |
| State | TanStack React Query |
| Forms | React Hook Form + Zod |
| Video | Jitsi Meet |
| Charts | Recharts |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Supabase account (free tier available)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mohammad-sami-dev/SmartLearn.git
cd SmartLearn

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# 4. Start the development server
npm run dev
```

App runs at `http://localhost:8080`

### Environment Variables

```env
VITE_SUPABASE_URL=https://your_project_id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

### Database Setup

Run the migration files in order via Supabase SQL Editor:
1. `supabase/migrations/20251121135927_...sql`
2. `supabase/migrations/20251121140101_...sql`

---

## 📁 Project Structure

```
SmartLearn/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # 50+ Shadcn components
│   │   ├── Dashboard/      # Dashboard widgets
│   │   └── Layout/         # Header, Sidebar
│   ├── contexts/            # Auth, Theme, Notification contexts
│   ├── pages/               # 29 page components
│   │   ├── admin/          # 9 admin pages
│   │   ├── teacher/        # 5 teacher pages
│   │   └── student/        # Student pages
│   ├── integrations/        # Supabase client & types
│   └── lib/                 # Utilities & helpers
├── supabase/
│   └── migrations/          # PostgreSQL migration files
├── public/
└── vercel.json              # Vercel routing config
```

---

## 📊 Project Stats

- **117+** React components
- **29** pages
- **3** role-based dashboards
- **50+** UI components
- **15,000+** lines of code
- **8** color themes

---

## 🔐 Authentication & Roles

| Role | Access |
|------|--------|
| Student | Dashboard, Courses, Assignments, Quiz, AI Tutor, Live Classes |
| Teacher | Course Builder, Grading, Attendance, Announcements |
| Admin | User Management, Financial, Reports, Notifications |

---

## 🚢 Deployment

Deployed on **Vercel** with automatic deployments on every push to `main`.

**Live URL:** https://smart-learn-zeta.vercel.app/

---

## 👤 Author

**Mohammad Sami**
- LinkedIn: [linkedin.com/in/mohammad-sami-020635393](https://www.linkedin.com/in/mohammad-sami-020635393/)
- GitHub: [github.com/mohammad-sami-dev](https://github.com/mohammad-sami-dev)

---

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Supabase](https://supabase.com/) - Backend infrastructure
- [Jitsi Meet](https://jitsi.org/) - Video conferencing
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

## 📄 License

MIT License — feel free to use this project for learning and personal projects.

---

<div align="center">

**Made with ❤️ by Mohammad Sami**

[🚀 Live Demo](https://smart-learn-zeta.vercel.app/) • [⭐ Star on GitHub](https://github.com/mohammad-sami-dev/SmartLearn) • [👤 LinkedIn](https://www.linkedin.com/in/mohammad-sami-020635393/)

[⬆ Back to Top](#-smartlearn---modern-learning-management-system)

</div>
