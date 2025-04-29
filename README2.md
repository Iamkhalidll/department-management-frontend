# Department Management Frontend

A modern, responsive, and user-friendly frontend for the Department Management API. This project is built with Next.js, TypeScript, Apollo GraphQL Client, and Tailwind CSS.

![Department Management Dashboard](https://via.placeholder.com/800x450.png?text=Department+Management+Dashboard)

## 🚀 Features

- **User Authentication**: Secure JWT-based login system
- **Department Management**: Full CRUD operations for departments
- **Sub-department Support**: Create departments with multiple sub-departments
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Type Safety**: Built with TypeScript for improved developer experience
- **Fast Development**: Utilizes Turbopack for faster refresh times

## 🛠️ Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Static type checking for JavaScript
- **Apollo Client**: GraphQL client for data fetching
- **Tailwind CSS**: Utility-first CSS framework
- **Turbopack**: Next.js' new development server for faster refreshes

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v16.0.0 or higher)
- npm or yarn
- Backend API running (NestJS GraphQL API)

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/department-management-frontend.git
cd department-management-frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn
```

3. **Set up environment variables**

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/graphql
```

Replace the URL with your backend API endpoint.

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000.

## 🔧 Configuration

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.js`. You can customize colors, spacing, and other design tokens here.

### Apollo Client

The Apollo Client is configured in `src/lib/apolloClient.ts`. It handles authentication by adding the JWT token to request headers.

### TypeScript

TypeScript configuration is in `tsconfig.json`. The project uses strict type checking for maximum type safety.

## 📁 Project Structure

```
department-management-frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── CreateDepartmentForm.tsx
│   │   ├── DepartmentItem.tsx
│   │   ├── DepartmentList.tsx
│   │   ├── Layout.tsx
│   │   └── Pagination.tsx
│   ├── contexts/          # React context providers
│   │   └── AuthContext.tsx
│   ├── graphql/           # GraphQL operations
│   │   ├── mutations.ts
│   │   └── queries.ts
│   ├── lib/               # Utility functions
│   │   └── apolloClient.ts
│   ├── pages/             # Next.js pages
│   │   ├── _app.tsx
│   │   ├── dashboard.tsx
│   │   ├── index.tsx
│   │   └── login.tsx
│   ├── styles/            # Global styles
│   │   └── globals.css
│   └── types/             # TypeScript types
│       └── index.ts
└── ... (config files)
```

## 🔐 Authentication

The application uses JWT tokens for authentication:

1. User logs in with username and password
2. Backend validates credentials and returns a JWT token
3. Token is stored in localStorage and added to Apollo Client headers
4. Protected routes check authentication status before rendering

Default credentials (if using the provided backend):
- Username: `admin`
- Password: `admin123`

## 📱 Pages and Functionality

### Login Page

- User authentication with error handling
- Redirects to dashboard on successful login

### Dashboard Page

- Protected route (requires authentication)
- Displays a list of departments with pagination
- Create, update, and delete departments
- View sub-departments for each department

## 🧩 Components

### Layout

Provides consistent layout with header and authentication state

### DepartmentList

Displays all departments with pagination and allows creating new departments

### DepartmentItem

Individual department display with edit and delete functionality

### CreateDepartmentForm

Form for creating new departments with optional sub-departments

### Pagination

Reusable pagination component for navigating through department list

## 🔄 State Management

- **Authentication State**: Managed with React Context (AuthContext)
- **API Data**: Managed with Apollo Client cache
- **Component State**: Local state with React hooks

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Set environment variables
4. Deploy

### Manual Deployment

Build the application for production:

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## 🧪 Testing

Run tests with:

```bash
npm run test
# or
yarn test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

Built with ❤️ for better department management.