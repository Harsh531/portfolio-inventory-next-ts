# Portfolio Inventory Management System

A comprehensive full-stack web application for managing and showcasing portfolio projects, built with modern web technologies. This system allows administrators to manage their professional profile, projects, and settings, while providing a public interface for visitors to view the portfolio content.

## 🚀 Features

### Admin Dashboard
- **Profile Management**: Update personal information, bio, skills, and resume
- **Project Management**: Add, edit, and delete portfolio projects with descriptions, technologies, and links
- **Settings Management**: Configure application settings and preferences
- **Role-Based Access Control**: Secure admin-only access to management features

### Public Interface
- **Portfolio Display**: Showcase projects with filtering and search capabilities
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Theme switching for better user experience

### Security & Authentication
- **JWT Authentication**: Secure token-based authentication system
- **Middleware Protection**: Route protection for admin areas
- **Password Hashing**: Secure password storage using bcrypt

### Data Management
- **MongoDB Integration**: NoSQL database for flexible data storage
- **Zod Validation**: Runtime type validation for data integrity
- **RESTful API**: Well-structured API endpoints for CRUD operations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: Component-based UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern UI components built on Radix UI
- **Lucide Icons**: Beautiful icon library

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **pnpm**: Fast package manager
- **TypeScript**: Type checking

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** (package manager)
- **MongoDB Atlas** account (or local MongoDB instance)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio-inventory-next-ts.git
   cd portfolio-inventory-next-ts
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI="your-mongodb-connection-string"
   JWT_SECRET="your-jwt-secret-key"
   ```

4. **Seed the database** (optional)

   Run the seed script to create an admin user:
   ```bash
   pnpm run seed-admin
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**

   Navigate to -
    development url - [http://localhost:3000](http://localhost:3000)
    production url - 

## 📁 Project Structure

```
portfolio-inventory-next-ts/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard pages
│   │   │   ├── profile/       # Profile management
│   │   │   ├── projects/      # Project management
│   │   │   └── settings/      # Settings management
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── profile/       # Profile API
│   │   │   ├── projects/      # Projects API
│   │   │   └── settings/      # Settings API
│   │   ├── login/             # Login page
│   │   └── projects/          # Public projects page
│   ├── components/            # Reusable UI components
│   │   └── ui/                # shadcn/ui components
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # JWT utilities
│   │   ├── db.ts              # Database connection
│   │   ├── password.ts        # Password hashing
│   │   └── zod.ts             # Validation schemas
│   ├── middleware.ts          # Next.js middleware
│   └── models/                # Mongoose models
│       ├── User.ts
│       ├── Profile.ts
│       ├── Project.ts
│       └── Settings.ts
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/seed-admin` - Seed admin user

### Profile
- `GET /api/profile` - Get profile data
- `POST /api/profile` - Update profile data

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get specific project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Settings
- `GET /api/settings` - Get application settings
- `POST /api/settings` - Update settings

## 🎨 Usage

### Admin Access
1. Navigate to `/login`
2. Log in with admin credentials
3. Access admin dashboard at `/admin`
4. Manage profile, projects, and settings

### Public Viewing
1. Visit the homepage to see the portfolio
2. Browse projects at `/projects`
3. View individual projects at `/projects/[id]`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [MongoDB Atlas](https://www.mongodb.com/atlas) for database hosting
- [Vercel](https://vercel.com/) for deployment platform

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js and TypeScript