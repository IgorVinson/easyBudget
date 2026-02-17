# EasyBudget

Full-stack budget management app with Next.js, Prisma, MongoDB, and multi-language support.

<!-- Add screenshot here -->

## Overview

EasyBudget is a comprehensive budget management web application that helps users track income, expenses, and financial goals. Built with modern full-stack technologies, it features secure authentication, interactive data visualizations, and multi-language support for a global audience.

## Key Features

- **Transaction Management**: Add, edit, and categorize income and expenses
- **Interactive Dashboard**: Visualize spending patterns with Recharts charts
- **Budget Goals**: Set and track monthly budget targets
- **Category Breakdown**: See where your money goes with detailed categorization
- **Multi-Language Support**: Full i18n support (English, Spanish, Ukrainian, and more)
- **Secure Authentication**: Email/password auth with NextAuth.js
- **Responsive Design**: Material UI components work beautifully on all devices
- **Data Persistence**: MongoDB database with Prisma ORM for type-safe queries
- **Date Range Filtering**: Analyze finances by custom date ranges

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth-000000?style=for-the-badge)
![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Google OAuth credentials (optional, for social login)

### Installation

```bash
# Clone the repository
git clone https://github.com/IgorVinson/easyBudget.git
cd easyBudget

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Set up the database
npx prisma generate

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/easybudget?replicaSet=rs0"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## MongoDB Setup

### Local Development

```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB as a replica set
mongod --port 27017 --dbpath /path/to/data --replSet "rs"

# Initialize replica set
mongo --port 27017
rs.initiate()
```

### Prisma Configuration

The Prisma schema is configured for MongoDB with replica set requirements for transactions:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

## Project Structure

```
easyBudget/
├── app/                    # Next.js 13+ app router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utility functions
├── models/                # Database models
├── prisma/
│   └── schema.prisma      # Prisma schema
├── public/                # Static assets
├── types/                 # TypeScript types
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run postinstall` - Generate Prisma client

## Features in Detail

### Multi-Language Support

The app uses i18next for internationalization:

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<Typography>{t('budget.title')}</Typography>
```

### Data Visualization

Interactive charts built with Recharts:
- Monthly spending trends
- Category breakdown (pie chart)
- Budget vs. actual comparison

### Authentication Flow

1. User registers/logs in via NextAuth
2. Session is stored in JWT
3. API routes validate session for protected operations
4. User data is scoped to their account

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

### Environment Setup for Production

- Set `NEXTAUTH_URL` to your production domain
- Configure MongoDB Atlas with proper IP allowlisting
- Set up Google OAuth with production redirect URLs

## License

MIT
