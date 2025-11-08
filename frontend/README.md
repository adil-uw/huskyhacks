# Sound Loop - Sound Credit Union Dashboard

A modern, responsive React.js web application for managing perks and tracking community impact.

## Features

- 🎯 **Dashboard**: View savings, donations, and personalized perk recommendations
- 🛍️ **Marketplace**: Discover and activate new offers from local and national partners
- 💬 **AI Chatbot**: Get instant help with common questions
- 📊 **Impact Reports**: Visualize your savings and donation trends
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Recharts (for data visualization)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main page components
│   ├── data/           # Mock data
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html
└── package.json
```

## Features Overview

### Dashboard
- Welcome card with savings and donation summary
- Savings gauge and community impact progress bars
- Personalized perks carousel
- Active and expiring perks list
- Auto-apply cashback toggle
- Impact report modal with charts

### Marketplace
- Search and filter perks
- Category filtering (Sports, Dining, Travel, etc.)
- Sort by value, expiry, or location
- Tab navigation (Recommended, Local Partners, All Perks)
- Detailed offer modals with apply and donate options

### Chatbot
- Quick question chips
- Interactive conversation
- Support contact option

## Color Scheme

- Primary: #0A2540 (Navy)
- Secondary: #00B3B0 (Turquoise)
- Accent Apply: #1FAD66 (Green)
- Accent Donate: #2D6CDF (Blue)
- Warning: #D97706 (Orange)
- Background: #F7FAFC (Light Gray)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

This project is created for Husky Hacks hackathon.

