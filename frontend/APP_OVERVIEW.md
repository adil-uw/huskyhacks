# Sound Loop - Web App Overview & Architecture

## 📱 Application Overview

**Sound Loop** is a frontend-only React.js web application designed for Sound Credit Union (SCU). It's a perks and rewards dashboard that combines:
- **Awareness**: Users can discover available perks and offers
- **Usability**: Easy-to-use interface for applying offers
- **Engagement**: Community impact tracking through donations

The app is **hackathon-ready**, fully responsive, and uses local mock data (no backend required).

---

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts (for data visualization)
- **QR Codes**: qrcode.react library
- **Routing**: Client-side routing (state-based, no React Router)
- **Data**: Local mock data stored in JavaScript objects/arrays

---

## 🏗️ Application Architecture

### File Structure
```
frontend/src/
├── App.jsx                    # Main app component (state management, routing)
├── main.jsx                   # Entry point
├── index.css                  # Global styles + Tailwind
├── components/                # Reusable UI components
│   ├── NavBar.jsx
│   ├── OfferCard.jsx
│   ├── OfferDetailsModal.jsx
│   ├── ChatbotWidget.jsx
│   ├── FilterBar.jsx
│   ├── ScoreMeters.jsx
│   ├── BadgeChip.jsx
│   ├── ToggleSwitch.jsx
│   ├── Toast.jsx
│   └── ImpactReportModal.jsx
├── pages/                     # Main page components
│   ├── Dashboard.jsx
│   └── Marketplace.jsx
└── data/
    └── mockData.js            # All mock data (user, offers, active perks, chat)
```

### State Management
- **App.jsx** manages global state:
  - Current page (dashboard/marketplace)
  - User state (saved amount, donated amount)
  - Toast notifications
- **Local component state** for UI interactions (modals, filters, etc.)

---

## 🎨 Design System

### Color Palette
- **Primary**: `#0A2540` (Navy) - Main brand color
- **Secondary**: `#00B3B0` (Turquoise) - Accent color
- **Accent Apply**: `#1FAD66` (Green) - For "Apply" actions
- **Accent Donate**: `#2D6CDF` (Blue) - For "Donate" actions
- **Warning**: `#D97706` (Orange) - For expiring items
- **Background**: `#F7FAFC` (Light Gray)
- **Text Primary**: `#0F172A`
- **Text Secondary**: `#334155`

### Typography
- **Font**: Inter (Google Fonts) with system fallback
- **Style**: Clean, modern, community-centric
- **Effects**: Rounded corners, soft shadows, smooth hover transitions

### Layout
- **Max Width**: 1200px (7xl in Tailwind)
- **Responsive**: Mobile-first approach
- **Grid System**: Responsive grid (1 col mobile → 2-3 cols desktop)

---

## 📄 Page Structure

### 1. Navigation Bar (Persistent)
- **Location**: Top of every page
- **Components**:
  - App logo/icon (🏦) + "Sound Loop" title
  - "Sound Credit Union" subtitle
  - Navigation buttons: "Dashboard" | "Marketplace"
  - User avatar (placeholder "A")
- **Behavior**: Highlights active page, smooth transitions

### 2. Dashboard Page (Default Landing)
**Purpose**: Personal overview + quick access to recommended perks

**Sections (top to bottom)**:

#### a) Welcome & Impact Summary Card
- Large gradient card (navy background)
- Personalized greeting: "Welcome back, [Name]!"
- Summary text: "You saved $X and donated $Y this month"
- **Two Progress Meters**:
  - Savings Gauge: Shows $X saved / $200 target (green gradient)
  - Community Impact: Shows $X donated / $50 goal (blue gradient)
- **Badges Display**: Shows earned badges (e.g., "Smart Saver", "Local Supporter")
- **CTA Button**: "View Impact Report" → Opens modal with charts

#### b) Personalized Perks Carousel
- **Title**: "Recommended for You"
- **Layout**: Horizontally scrollable carousel
- **Navigation**: Left/Right arrow buttons (disabled at edges)
- **Content**: 3-5 recommended offer cards
- **Cards**: 320px wide, scrollable with smooth behavior

#### c) Active & Expiring Perks List
- **Title**: "Active & Expiring Perks"
- **Layout**: Vertical list in white card
- **Items**: Each shows:
  - Merchant logo (emoji)
  - Merchant name + headline
  - Status badge (Active / Expiring Soon)
  - "View Details" button
- **Styling**: Hover effects, status color coding

#### d) Auto-Apply Cashback Toggle
- **Component**: Toggle switch with label
- **Label**: "Auto-Apply Cashback"
- **Subtext**: "Automatically apply rewards after purchases."
- **Tooltip**: Info icon with explanation
- **Default**: ON (enabled)

#### e) Explore More Perks Button
- **Style**: Large gradient CTA button
- **Action**: Navigates to Marketplace page

**Modals on Dashboard**:
- `OfferDetailsModal`: Opens when clicking "View Details" on any offer
- `ImpactReportModal`: Opens when clicking "View Impact Report"

---

### 3. Marketplace Page
**Purpose**: Discover and activate new offers

**Sections**:

#### a) Page Header
- **Title**: "Marketplace"
- **Tabs**: Three tabs at top
  - "Recommended" (default)
  - "Local Partners"
  - "All Perks"

#### b) Filter Bar
- **Search Input**: "Search perks — e.g. travel, coffee…"
- **Category Chips**: Horizontal scrollable buttons
  - All Perks | Sports | Dining | Travel | Groceries | Fuel | Family
- **Sort Dropdown**: 
  - Highest Value
  - Expiring Soon
  - Near Me (prioritizes local partners)

#### c) Offer Grid
- **Layout**: Responsive grid
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
- **Cards**: Same `OfferCard` component as carousel
- **Empty State**: "No perks found. Try adjusting your filters."

**Modal on Marketplace**:
- `OfferDetailsModal`: Opens when clicking "View Details" on any offer card

---

## 🧩 Core Components Breakdown

### 1. OfferCard
**Purpose**: Displays a single perk/offer

**Props**:
- `offer`: Offer object with all details
- `onViewDetails`: Callback function
- `isRecommended`: Boolean (optional styling)

**Displays**:
- Merchant logo (emoji, large)
- Merchant name
- Headline/description
- Tags (category badges)
- Expiry date (with "Expiring Soon" warning if < 7 days)
- "View Details" button

**Styling**: White card, hover shadow, rounded corners

---

### 2. OfferDetailsModal
**Purpose**: Full offer details + apply/donate actions

**States**:
- `selectedCause`: Selected donation cause
- `showQRCode`: Whether QR code is displayed
- `qrCodeType`: 'apply' or 'donate'
- `copied`: Copy button feedback state

**Two Modes**:

#### Mode 1: Offer Details View
- Merchant logo + name + headline
- Category badges + tags
- Expiry date
- Full details text
- Local partner notice (if applicable)
- **Two Action Buttons**:
  - 🟢 "Apply Now" (green)
  - 💙 "Donate to Cause" (blue, disabled until cause selected)
- **Cause Selection** (only shown if not showing QR code):
  - Buttons: "Any" | "Education" | "Health" | "Sports"
  - Auto-calculated amount display: "$X (auto-calculated from offer value)"
- Terms & Conditions (collapsible)

#### Mode 2: QR Code View (after clicking Apply/Donate)
- **For "Apply Now"**:
  - Success message: "✅ Offer Applied!"
  - QR code (200x200px)
  - Offer code input (read-only) with "Copy" button
  - "Close" button

- **For "Donate to Cause"**:
  - Success message: "💙 Donation Setup Complete!"
  - Message: "Your discounted/cashback money will be sent to Sound Credit Union"
  - Selected cause badge
  - QR code (200x200px)
  - Donation code input (read-only) with "Copy" button
  - Explanation text about automatic donation
  - "Close" button

**Code Generation**:
- Apply: `SCU-{id}-{merchant}-{timestamp}`
- Donate: `SCU-DONATE-{CAUSE}-{id}-{timestamp}`

---

### 3. ChatbotWidget
**Purpose**: Help/support assistant

**States**:
- `isOpen`: Collapsed/expanded
- `messages`: Conversation history
- `inputValue`: Current input

**Layout**:
- **Collapsed**: Floating bubble (bottom-right, 56px circle)
- **Expanded**: 400px wide panel (bottom-right)

**Features**:
- Header: "SCU Assistant"
- Quick question chips:
  - "What perks am I eligible for?"
  - "How do I donate rewards?"
  - "Why didn't cashback apply?"
- Conversation window (scrollable)
- Input field + Send button
- "Contact Support" link

**Data**: Pre-filled Q&A from `chatData` in mockData.js

---

### 4. ScoreMeters
**Purpose**: Visual progress indicators

**Components**:
- `SavingsGauge`: Horizontal bar, green gradient, shows $X / $target
- `ImpactProgress`: Horizontal bar, blue gradient, shows $X / $target

**Display**: Value on right, progress bar, target below

---

### 5. ImpactReportModal
**Purpose**: Detailed analytics view

**Content**:
- Two summary cards (Total Saved, Total Donated)
- **Monthly Trends Chart**: Line chart (Recharts)
  - X-axis: Months (Jul, Aug, Sep, Oct)
  - Two lines: Saved ($) and Donated ($)
- **Savings by Category Chart**: Bar chart
  - Categories: Dining, Travel, Groceries, Sports
  - Values: Amount saved per category

---

### 6. FilterBar
**Purpose**: Search and filter controls

**Components**:
- Search input (full width on mobile)
- Category filter chips (horizontal scroll on mobile)
- Sort dropdown

---

### 7. BadgeChip
**Purpose**: Small status/category badges

**Variants**:
- `default`: Secondary color
- `success`: Green (accent-apply)
- `warning`: Orange
- `info`: Blue (accent-donate)

---

### 8. ToggleSwitch
**Purpose**: On/off toggle with label

**Features**:
- Label + subtext
- Optional tooltip (info icon)
- Smooth animation
- Accessible (keyboard support)

---

### 9. Toast
**Purpose**: Temporary notification messages

**Types**:
- `success`: Green background (✅)
- `info`: Blue background (ℹ️)
- `error`: Red background (❌)

**Behavior**: Auto-dismisses after 3 seconds, slide-in animation

---

## 📊 Data Structure

### User Data (`userData`)
```javascript
{
  name: "Adil",
  saved: 35,              // Total saved this month
  donated: 5,             // Total donated this month
  targets: {
    saved: 200,           // Savings goal
    impact: 50            // Donation goal
  },
  badges: ["Smart Saver", "Local Supporter"]
}
```

### Offer Data (`offersData`)
```javascript
{
  id: 1,
  merchant: "Seattle Coffee Co",
  logo: "☕",              // Emoji logo
  headline: "10% Cashback on All Coffee",
  category: "Dining",     // Sports, Dining, Travel, Groceries, Fuel, Family
  tags: ["Local Partner", "Dining"],
  expiry: "2024-12-31",   // ISO date string
  isLocal: true,          // Boolean
  details: "Full description...",
  value: 10               // Cashback/reward value (used for donation amount)
}
```

### Active Perks (`activePerks`)
- Same structure as offers, plus:
  - `status`: "Active" | "Expiring Soon"
  - `appliedDate`: "2024-10-15"

### Chat Data (`chatData`)
```javascript
{
  question: "What perks am I eligible for?",
  answer: "Response text..."
}
```

---

## 🔄 User Flows

### Flow 1: Apply an Offer
1. User views offer (Dashboard carousel or Marketplace)
2. Clicks "View Details"
3. Modal opens with offer details
4. Clicks "Apply Now"
5. QR code appears with offer code
6. User can copy code or scan QR
7. Toast notification: "✅ Offer applied successfully!"
8. Offer added to Active Perks (in real app)

### Flow 2: Donate to Cause
1. User views offer details
2. Selects a cause: "Any" | "Education" | "Health" | "Sports"
3. Sees auto-calculated donation amount
4. Clicks "Donate to Cause"
5. QR code appears with donation code
6. Message explains cashback will be donated
7. Toast notification: "❤️ Donated $X to Local [Cause] Fund."
8. User's donation total updates (in App.jsx state)

### Flow 3: Browse Marketplace
1. User navigates to Marketplace
2. Selects tab: Recommended | Local Partners | All Perks
3. Uses search/filter/sort
4. Views filtered results in grid
5. Clicks "View Details" on any offer
6. Can apply or donate from modal

### Flow 4: View Impact Report
1. User on Dashboard
2. Clicks "View Impact Report"
3. Modal opens with:
   - Summary cards
   - Monthly trends chart
   - Category breakdown chart
4. User closes modal

### Flow 5: Use Chatbot
1. User clicks chatbot bubble (bottom-right)
2. Panel expands
3. User clicks quick question OR types custom question
4. Bot responds with pre-filled answer
5. User can ask more or contact support

---

## 🎯 Current Features Summary

### ✅ Implemented Features
1. **Dashboard Overview**
   - Personalized welcome
   - Savings & donation tracking
   - Progress meters
   - Badge system
   - Recommended perks carousel
   - Active perks list
   - Auto-apply toggle
   - Impact report modal

2. **Marketplace**
   - Tab navigation
   - Search functionality
   - Category filtering
   - Sorting options
   - Responsive grid layout

3. **Offer Management**
   - Offer details modal
   - QR code generation (apply & donate)
   - Copy-to-clipboard functionality
   - Auto-calculated donation amounts
   - Cause selection (Any, Education, Health, Sports)

4. **Community Impact**
   - Donation tracking
   - Impact visualization
   - Monthly trends
   - Category breakdowns

5. **User Experience**
   - Toast notifications
   - Responsive design (mobile → desktop)
   - Smooth animations
   - Accessible UI components
   - Chatbot support

---

## 🚀 Areas for Feature Expansion

### Potential New Features (Where to Add)

1. **User Profile/Settings Page**
   - **Location**: New page accessible from NavBar
   - **Add**: User avatar upload, preferences, notification settings
   - **Integration**: Extend NavBar with "Profile" button

2. **Notifications Center**
   - **Location**: Bell icon in NavBar
   - **Add**: Dropdown or dedicated page for offer alerts, expiry warnings
   - **Integration**: Add notification state in App.jsx

3. **Transaction History**
   - **Location**: New section on Dashboard or separate page
   - **Add**: List of applied offers, donations, cashback received
   - **Integration**: Extend mockData with transaction history

4. **Social/Sharing Features**
   - **Location**: Share buttons on OfferCard or ImpactReportModal
   - **Add**: Share achievements, refer friends, social impact posts
   - **Integration**: Add share functionality to relevant components

5. **Gamification**
   - **Location**: Dashboard badges section
   - **Add**: More badge types, achievement system, leaderboards
   - **Integration**: Extend badge system in userData

6. **Location-Based Features**
   - **Location**: Marketplace "Near Me" sort
   - **Add**: Map view, distance calculation, location services
   - **Integration**: Add geolocation to offers data

7. **Favorites/Wishlist**
   - **Location**: Heart icon on OfferCard
   - **Add**: Save favorite offers, wishlist page
   - **Integration**: Add favorites state in App.jsx

8. **Advanced Filtering**
   - **Location**: FilterBar component
   - **Add**: Price range, date range, multiple category selection
   - **Integration**: Extend FilterBar with more filter options

9. **Email/Export Reports**
   - **Location**: ImpactReportModal
   - **Add**: Export PDF, email report, share link
   - **Integration**: Add export functionality to modal

10. **Multi-language Support**
    - **Location**: Settings or NavBar
    - **Add**: Language selector, i18n support
    - **Integration**: Add translation system

11. **Dark Mode**
    - **Location**: Settings or NavBar toggle
    - **Add**: Theme switcher, dark color palette
    - **Integration**: Add theme state in App.jsx, extend Tailwind config

12. **Analytics Dashboard (Admin)**
    - **Location**: New admin page (if user role = admin)
    - **Add**: User engagement metrics, popular offers, donation analytics
    - **Integration**: Add role-based routing

---

## 🔧 Technical Notes

### State Management
- Currently uses React `useState` hooks
- No global state management library (Redux, Zustand, etc.)
- State is passed down via props
- **Future**: Could add Context API or state management library for complex features

### Data Persistence
- All data is in-memory (mockData.js)
- No localStorage or backend
- **Future**: Add localStorage for user preferences, or connect to backend API

### Routing
- Simple state-based routing (no React Router)
- Two pages: Dashboard and Marketplace
- **Future**: Add React Router for URL-based navigation, deep linking

### Responsive Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md)
- Desktop: > 1024px (lg)

### Performance
- Components are functional (no class components)
- Uses `useMemo` for filtered offers (Marketplace)
- No code splitting yet
- **Future**: Add React.lazy for code splitting, optimize images

---

## 📝 Key Design Patterns

1. **Component Composition**: Small, reusable components
2. **Props Drilling**: State passed from App → Pages → Components
3. **Controlled Components**: All inputs are controlled
4. **Conditional Rendering**: Modals, sections shown/hidden based on state
5. **Event Handlers**: Callbacks passed down for user interactions

---

This overview provides a complete picture of the current Sound Loop application structure, features, and potential expansion areas for adding new functionality.

