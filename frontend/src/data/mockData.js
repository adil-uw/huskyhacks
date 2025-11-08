export const userData = {
  name: "Adil",
  saved: 35,
  donated: 5,
  targets: {
    saved: 200,
    impact: 50
  },
  badges: ["Smart Saver", "Local Supporter"]
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
  }
];

