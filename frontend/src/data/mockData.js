export const userData = {
  name: "Adil",
  saved: 35,
  donated: 5,
  targets: {
    saved: 200,
    impact: 50,
    soundCoins: 500
  },
  badges: ["Smart Saver", "Local Supporter"],
  soundCoins: 240,
  lessonsCompleted: { L1: false, L2: false, L3: false, L4: false },
  cryptoConfidenceLevel: "Beginner",
  state: "WA" // Washington state
};

export const offersData = [
  {
    id: 1,
    merchant: "Seattle Coffee Co",
    logo: "☕",
    headline: "10% Cashback on All Coffee",
    category: "Dining",
    tags: ["Local Partner", "Dining"],
    expiry: "2024-12-31",
    isLocal: true,
    details: "Get 10% cashback on every purchase at Seattle Coffee Co. Valid at all Seattle locations.",
    value: 10
  },
  {
    id: 2,
    merchant: "Sounders FC",
    logo: "⚽",
    headline: "$20 Off Match Tickets",
    category: "Sports",
    tags: ["Local Partner", "Sports"],
    expiry: "2024-11-15",
    isLocal: true,
    details: "Save $20 on any Sounders FC home match ticket. Limited availability.",
    value: 20
  },
  {
    id: 3,
    merchant: "Alaska Airlines",
    logo: "✈️",
    headline: "5% Cashback on Flights",
    category: "Travel",
    tags: ["Travel"],
    expiry: "2024-12-31",
    isLocal: false,
    details: "Earn 5% cashback on all Alaska Airlines flight bookings.",
    value: 5
  },
  {
    id: 4,
    merchant: "Pike Place Market",
    logo: "🛒",
    headline: "15% Off Local Produce",
    category: "Groceries",
    tags: ["Local Partner", "Groceries"],
    expiry: "2024-11-30",
    isLocal: true,
    details: "Enjoy 15% off on fresh produce from local vendors at Pike Place Market.",
    value: 15
  },
  {
    id: 5,
    merchant: "Shell",
    logo: "⛽",
    headline: "$0.10 Off Per Gallon",
    category: "Fuel",
    tags: ["Fuel"],
    expiry: "2024-12-31",
    isLocal: false,
    details: "Save $0.10 per gallon at participating Shell stations.",
    value: 5
  },
  {
    id: 6,
    merchant: "Seattle Aquarium",
    logo: "🐠",
    headline: "Buy One Get One Free",
    category: "Family",
    tags: ["Local Partner", "Family"],
    expiry: "2024-11-20",
    isLocal: true,
    details: "Buy one adult ticket, get one free at Seattle Aquarium. Perfect for family outings.",
    value: 30
  },
  {
    id: 7,
    merchant: "Whole Foods",
    logo: "🥬",
    headline: "8% Cashback on Groceries",
    category: "Groceries",
    tags: ["Groceries"],
    expiry: "2024-12-31",
    isLocal: false,
    details: "Earn 8% cashback on all Whole Foods purchases.",
    value: 8
  },
  {
    id: 8,
    merchant: "Mariners",
    logo: "⚾",
    headline: "$15 Off Game Tickets",
    category: "Sports",
    tags: ["Local Partner", "Sports"],
    expiry: "2024-11-10",
    isLocal: true,
    details: "Save $15 on Seattle Mariners home game tickets.",
    value: 15
  },
  {
    id: 9,
    merchant: "Space Needle",
    logo: "🗼",
    headline: "20% Off Admission",
    category: "Travel",
    tags: ["Local Partner", "Travel"],
    expiry: "2024-12-31",
    isLocal: true,
    details: "Get 20% off admission to the iconic Space Needle.",
    value: 20
  },
  {
    id: 10,
    merchant: "Starbucks",
    logo: "🌟",
    headline: "12% Cashback",
    category: "Dining",
    tags: ["Dining"],
    expiry: "2024-12-31",
    isLocal: false,
    details: "Earn 12% cashback on all Starbucks purchases.",
    value: 12
  },
  {
    id: 11,
    merchant: "REI",
    logo: "🏔️",
    headline: "10% Off Outdoor Gear",
    category: "Sports",
    tags: ["Local Partner", "Sports"],
    expiry: "2024-12-31",
    isLocal: true,
    details: "Save 10% on all outdoor gear and equipment at REI.",
    value: 10
  },
  {
    id: 12,
    merchant: "Chevron",
    logo: "⛽",
    headline: "$0.08 Off Per Gallon",
    category: "Fuel",
    tags: ["Fuel"],
    expiry: "2024-12-31",
    isLocal: false,
    details: "Save $0.08 per gallon at participating Chevron stations.",
    value: 4
  }
];

export const activePerks = [
  {
    ...offersData[0],
    status: "Active",
    appliedDate: "2024-10-15"
  },
  {
    ...offersData[1],
    status: "Expiring Soon",
    appliedDate: "2024-10-01"
  },
  {
    ...offersData[3],
    status: "Active",
    appliedDate: "2024-10-20"
  }
];

export const recommendedPerks = [
  offersData[2],
  offersData[4],
  offersData[5],
  offersData[6],
  offersData[7]
];

export const lessonsData = [
  {
    id: "L1",
    title: "What is Blockchain?",
    summary: "A simple, shared ledger across many computers.",
    content: [
      "Blockchain is a decentralized ledger that records transactions across many computers. This ensures that the record cannot be altered retroactively without altering all subsequent blocks.",
      "Each block stores transactions and links to the previous block, creating a chain. This makes the blockchain secure and transparent."
    ],
    quiz: {
      question: "Which best describes a blockchain?",
      options: [
        "A centralized database",
        "A decentralized, tamper-evident ledger",
        "An email protocol",
        "A QR code format"
      ],
      correctIndex: 1,
      rewardCoins: 20
    }
  },
  {
    id: "L2",
    title: "How Wallets Work",
    summary: "Public & private keys explained simply.",
    content: [
      "Wallets store keys, not coins. Your private key is like a password that gives you access to your funds.",
      "Addresses are derived from public keys and can be shared safely. Think of it like your email address - public but secure."
    ],
    quiz: {
      question: "Wallets mainly store...",
      options: ["Coins", "Keys", "QR codes", "NFTs"],
      correctIndex: 1,
      rewardCoins: 20
    }
  },
  {
    id: "L3",
    title: "Stablecoins 101",
    summary: "Tokens pegged to fiat reduce volatility.",
    content: [
      "Stablecoins track $1 value by being backed by reserves or algorithms. They provide stability in the volatile crypto market.",
      "Used for payments and remittance, stablecoins offer the benefits of crypto without the price swings."
    ],
    quiz: {
      question: "Stablecoins are designed to be...",
      options: ["Highly volatile", "Pegged/stable", "NFTs", "Mining rewards"],
      correctIndex: 1,
      rewardCoins: 20
    }
  },
  {
    id: "L4",
    title: "Risk & Volatility",
    summary: "Prices fluctuate; invest cautiously.",
    content: [
      "Crypto is volatile - prices can change dramatically in short periods. Never invest more than you can afford to lose.",
      "Diversification and education help manage risk. Always do your own research and understand what you're investing in."
    ],
    quiz: {
      question: "A key crypto risk is...",
      options: ["Guaranteed returns", "Volatility", "FDIC insurance", "No scams exist"],
      correctIndex: 1,
      rewardCoins: 20
    }
  }
];

export const walletData = {
  coinToUsdRate: 0.05, // 1 SoundCoin = $0.05
  holdings: [
    { symbol: "BTC", name: "Bitcoin", amount: 0.0023, price: 65000, change24hPct: 1.2 },
    { symbol: "ETH", name: "Ethereum", amount: 0.05, price: 3300, change24hPct: -0.8 },
    { symbol: "SCU", name: "Sound Token", amount: 120, price: 1.0, change24hPct: 0.1 }
  ],
  transactions: [
    { id: "tx1", type: "COIN_AWARD", ts: new Date(Date.now() - 3600000).toISOString(), meta: { amount: 10, reason: "Offer applied" } },
    { id: "tx2", type: "CONVERT_TO_CRYPTO", ts: new Date(Date.now() - 7200000).toISOString(), meta: { token: "BTC", coins: 100, valueUsd: 5.0 } }
  ]
};

// Generate initial price history (last 300 points, ~50 minutes at 10s intervals)
function generatePriceHistory(initialPrice, symbol) {
  const history = [];
  const now = Date.now();
  let price = initialPrice;
  
  for (let i = 299; i >= 0; i--) {
    const timestamp = now - (i * 10000); // 10 second intervals
    const randomDelta = (Math.random() * 0.016) - 0.008; // -0.8% to +0.8%
    price = price * (1 + randomDelta);
    history.push({ t: timestamp, p: +price.toFixed(2) });
  }
  
  return history;
}

export const marketData = {
  symbols: ["BTC", "ETH", "SCU", "SOL", "ADA", "MATIC", "DOGE", "AVAX", "LTC", "DOT"],
  histories: {
    BTC: generatePriceHistory(65000, "BTC"),
    ETH: generatePriceHistory(3300, "ETH"),
    SCU: generatePriceHistory(1.0, "SCU"),
    SOL: generatePriceHistory(150, "SOL"),
    ADA: generatePriceHistory(0.5, "ADA"),
    MATIC: generatePriceHistory(0.8, "MATIC"),
    DOGE: generatePriceHistory(0.1, "DOGE"),
    AVAX: generatePriceHistory(35, "AVAX"),
    LTC: generatePriceHistory(75, "LTC"),
    DOT: generatePriceHistory(7, "DOT")
  }
};

export const practiceAccount = {
  startingCash: 10000,
  currentCash: 10000,
  positions: [],
  fills: [],
  totalPnl: 0,
  selectedSymbol: "BTC"
};

export const competitionsData = [
  {
    id: "comp1",
    title: "Weekend Sprint",
    entryOptions: [
      { type: "SOUNDCOINS", cost: 50 },
      { type: "CASH", cost: 10 }
    ],
    prizeUsd: 500,
    startsAt: new Date(Date.now() - 86400000).toISOString(), // Started yesterday
    endsAt: new Date(Date.now() + 172800000).toISOString(), // Ends in 2 days
    status: "LIVE",
    seedCashUsd: 10000,
    sponsor: "Sound Credit Union",
    sponsorLogo: "🏦",
    symbolForChart: "BTC",
    description: "Trade the weekend swing. Highest ROI wins.",
    rules: [
      "Practice funds only; no real money.",
      "Winner determined by highest ROI at end time."
    ]
  },
  {
    id: "comp2",
    title: "Sound Cup Monthly",
    entryOptions: [
      { type: "SOUNDCOINS", cost: 75 },
      { type: "CASH", cost: 10 }
    ],
    prizeUsd: 1000,
    startsAt: new Date(Date.now() + 259200000).toISOString(), // Starts in 3 days
    endsAt: new Date(Date.now() + 345600000).toISOString(), // Ends in 4 days
    status: "UPCOMING",
    seedCashUsd: 5000,
    sponsor: "Binance",
    sponsorLogo: "🔷",
    symbolForChart: "ETH",
    description: "Monthly trading challenge with seeded virtual cash.",
    rules: [
      "Practice funds only; no real money.",
      "Winner determined by highest ROI at end time.",
      "All trades must be completed before competition ends."
    ]
  },
  {
    id: "comp3",
    title: "Crypto Challenge",
    entryOptions: [
      { type: "SOUNDCOINS", cost: 100 }
    ],
    prizeUsd: 2000,
    startsAt: new Date(Date.now() - 604800000).toISOString(), // Started a week ago
    endsAt: new Date(Date.now() - 86400000).toISOString(), // Ended yesterday
    status: "ENDED",
    seedCashUsd: 15000,
    sponsor: "Coinbase",
    sponsorLogo: "🔵",
    symbolForChart: "BTC",
    description: "Advanced trading competition for experienced traders.",
    rules: [
      "Practice funds only; no real money.",
      "Winner determined by highest ROI at end time."
    ]
  }
];

// US States list
export const usStates = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" }, { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" }, { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" }, { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" }, { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" }, { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" }, { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" }
];

export const competitionsState = {
  entries: {},
  leaderboard: [
    { userName: "CryptoPro", roiPct: 45.2, avatarUrl: null, initials: "CP", state: "CA" },
    { userName: "TraderJoe", roiPct: 32.8, avatarUrl: null, initials: "TJ", state: "NY" },
    { userName: "Adil", roiPct: 18.5, avatarUrl: null, initials: "AD", state: "WA" },
    { userName: "MarketMaster", roiPct: 15.3, avatarUrl: null, initials: "MM", state: "TX" },
    { userName: "CoinWhiz", roiPct: 12.1, avatarUrl: null, initials: "CW", state: "FL" },
    { userName: "BitcoinBull", roiPct: 10.5, avatarUrl: null, initials: "BB", state: "WA" },
    { userName: "EthereumElite", roiPct: 9.2, avatarUrl: null, initials: "EE", state: "CA" },
    { userName: "CryptoKing", roiPct: 8.7, avatarUrl: null, initials: "CK", state: "IL" },
    { userName: "DeFiDude", roiPct: 7.3, avatarUrl: null, initials: "DD", state: "WA" },
    { userName: "HodlHero", roiPct: 6.1, avatarUrl: null, initials: "HH", state: "OR" },
    { userName: "TradingTiger", roiPct: 5.8, avatarUrl: null, initials: "TT", state: "WA" },
    { userName: "CryptoQueen", roiPct: 4.5, avatarUrl: null, initials: "CQ", state: "NY" }
  ],
  leaderboardByCompetition: {
    comp1: [
      { user: "Alex", roiPct: 42.1, avatarUrl: null, initials: "AL", state: "CA" },
      { user: "Maya", roiPct: 28.5, avatarUrl: null, initials: "MA", state: "WA" },
      { user: "Sam", roiPct: 15.3, avatarUrl: null, initials: "SA", state: "TX" }
    ],
    comp2: [
      { user: "Jordan", roiPct: 35.7, avatarUrl: null, initials: "JO", state: "NY" },
      { user: "Taylor", roiPct: 22.1, avatarUrl: null, initials: "TA", state: "WA" }
    ],
    comp3: [
      { user: "Casey", roiPct: 48.9, avatarUrl: null, initials: "CA", state: "CA" },
      { user: "Riley", roiPct: 31.2, avatarUrl: null, initials: "RI", state: "FL" },
      { user: "Morgan", roiPct: 19.8, avatarUrl: null, initials: "MO", state: "WA" }
    ]
  }
};

export const redeemCatalog = [
  { id: "R1", type: "DISCOUNT", title: "$5 off Coffee", costCoins: 100, description: "Redeem for QR at checkout." },
  { id: "R2", type: "LESSON_PACK", title: "Advanced Lessons (2)", costCoins: 150, description: "Unlock 2 advanced lessons." },
  { id: "R3", type: "RAFFLE", title: "Seahawks Merch Entry", costCoins: 50, description: "Each entry increases your odds." },
  { id: "R4", type: "IMPACT", title: "Donate 1 Meal", costCoins: 50, description: "Converted to local meal credits." }
];

export const chatData = [
  {
    question: "What perks am I eligible for?",
    answer: "Based on your account, you're eligible for all perks in the Marketplace! Check out our recommended perks on the Dashboard for personalized suggestions."
  },
  {
    question: "How do I donate rewards?",
    answer: "When viewing any perk, click 'Donate to Cause' and select from Education, Health, or Sports. Your donation will go directly to local Seattle organizations."
  },
  {
    question: "Why didn't cashback apply?",
    answer: "Cashback is automatically applied after purchase when Auto-Apply is enabled. If it didn't apply, make sure the merchant is participating and your purchase meets the terms. Contact support if issues persist."
  },
  {
    question: "How do I activate a perk?",
    answer: "Simply click 'Apply Now' on any perk card in the Marketplace. Once applied, it will appear in your Active Perks list on the Dashboard."
  },
  {
    question: "What is Bitcoin?",
    answer: "Bitcoin is a decentralized digital currency on a public blockchain."
  },
  {
    question: "Is crypto risky?",
    answer: "Yes, prices are volatile and not insured. Start with education."
  },
  {
    question: "How do SoundCoins work?",
    answer: "Earn from lessons and perks; convert to mock crypto or redeem rewards."
  }
];

