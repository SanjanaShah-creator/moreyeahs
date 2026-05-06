# MoreYeahs Website

Modern Next.js website for MoreYeahs with WordPress integration, contact forms, and career applications.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm
- Git

### Local Development

1. **Clone and install dependencies:**
   ```bash
   cd moreyeahs-website
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your actual values.

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables (see DEPLOYMENT.md)
4. Deploy!

## 🔧 Environment Variables

Required environment variables:

- `NEXT_PUBLIC_WP_API_URL` - WordPress API endpoint
- `NEXT_PUBLIC_CHATBOT_API_URL` - Chatbot API endpoint
- `GMAIL_USER` - Gmail account for sending emails
- `GMAIL_APP_PASSWORD` - Gmail app password
- `DATABASE_URL` - PostgreSQL connection string (optional)

See `.env.example` for complete list.

## 📁 Project Structure

```
moreyeahs-website/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   └── lib/              # Utilities and helpers
├── public/               # Static assets
├── scripts/              # Database and deployment scripts
└── .env.local           # Local environment variables (not committed)
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **3D Graphics:** Three.js, React Three Fiber
- **Animations:** Framer Motion
- **Email:** Nodemailer
- **Database:** PostgreSQL (optional)

## 📝 Features

- WordPress blog integration
- Contact forms with Google Sheets integration
- Career application with resume upload
- Case studies and resources
- Dark/light theme support
- Responsive design
- SEO optimized

## 🐛 Troubleshooting

### Port Already in Use

If you see "Port 3000 is in use", either:
- Stop the other process: `taskkill /PID <PID> /F`
- Or use a different port: The dev server will automatically use port 3001

### Build Errors

Run `npm run build` locally to check for errors before deploying.

### Environment Variables Not Working

Make sure `.env.local` exists and contains all required variables. Restart the dev server after changes.

## 📄 License

Proprietary - MoreYeahs

## 🤝 Support

For issues or questions, contact the development team.
