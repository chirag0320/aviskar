import React from "react"

// Assets
import { VaultIcon, SellToUsIcon, CalculatorIcon, LoanIcon, WishlistIcon, RecentIcon, CompareIcon } from "../assets/icons/index"


export const userData = {
  mobileNumber: "+61 7318 48300",
}

export const navigationItems = [
  {
    title: "Information",
    menues: ["Sitemap", "Payment", "Privacy Policy", "Terms of Service", "About Us", "Delivery", "Contact"],
  },
  {
    title: "Customer Service",
    menues: ["Search", "News", "Blog", "Recently viewed products", "Compare products list", "New products"],
  },
  {
    title: "My Vault",
    menues: ["My Vault", "Orders", "Addresses", "Shopping cart", "Wishlist"],
  },
]

export const actionMenuItems = [
  {
    text: "My Vault",
    href: "#",
    icon: <VaultIcon />,
    key: 'enablemyvault'
  },
  {
    text: "Sell to Us",
    icon: <SellToUsIcon />,
    href: "#",
    key: 'enableselltous'
  },
  {
    text: "Calculators",
    icon: <CalculatorIcon />,
    href: "/calculators",
    key: 'enablecalculators'
  },
  {
    text: "Loans",
    icon: <LoanIcon />,
    href: "#",
    key: 'enableloans'
  },
  {
    text: "Wishlist",
    icon: <WishlistIcon />,
    href: "#",
    key: 'enablewishlist'
  },
  {
    text: "Recent",
    icon: <RecentIcon />,
    href: "/recently-viewed-products",
    key: 'enablerecent'
  },
  {
    text: "Compare",
    icon: <CompareIcon />,
    href: "#",
    key: 'enablecompare'
  },
]


export const subMenuItems = [
  "Popular", "QMINT Bullion", "Newly Listed", "Gold Coins", "Gold Bars", "Silver Coins", "World Coins", "Coin Sets", "Last Stock", "On Sale"
]

export const megaMenuItems = [
  ["Popular", "QMINT Bullion", "Newly Listed", "Gold Coins", "Gold Bars", "Silver Coins", "World Coins", "Coin Sets", "Last Stock", "On Sale"],
  ["INVESTOR", "QMINT Direct", "Gold Bullion", "Silver Bullion", "Platinum", "Palladium", "Copper", "Base Metals", "Rare Earths", "Gemstones", "Nuggets", "Books"],
  ["COLLECTOR", "QMINT Rating", "Queensland", "Australia", "World", "Proof", "High Relief", "Graded", "Pre - Decimal", "Rare Coins", "Coin Care", "Sovereign Gold Coins"],
  ["Themes", "Black Friday Sale", "QMINT Select", "Flora", "Fauna", "Places", "Lunar", "Occasion", "Royals", "Series", "Objects", "Gifts", "Christmas"],
]

export const categoryFilterItems = [
  {
    label: "Mint",
    options: [
      { id: '1', name: 'QueenslandMint', value: 'QueenslandMint', label: 'Queensland Mint', checked: true, disabled: true, },
      { id: '2', name: 'ProductID', value: 'ProductID', label: 'Product ID', checked: true, },
      { id: '3', name: 'SerialNumber', value: 'SerialNumber', label: 'Serial Number', checked: true, disabled: true, },
    ],
    row: false,
  },
  {
    label: "Type",
    options: [
      { id: '1', name: 'coin', value: 'coin', label: 'Coin', checked: true, },
      { id: '2 ', name: 'bar', value: 'bar', label: 'Bar', checked: true, },
    ],
    row: true,
  },
  {
    label: "Availability",
    options: [
      { id: '1', name: 'All', value: 'All', label: 'All', checked: true, },
      { id: '2', name: 'Available to Order', value: 'Available to Order', label: 'Available to Order', checked: true, disabled: true, },
      { id: '3', name: 'In Stock', value: 'In Stock', label: 'In Stock', checked: true, disabled: true, },
      { id: '4', name: 'New', value: 'New', label: 'New', checked: true, disabled: true, },
    ],
    row: false,
  },
  {
    label: "Superfund Approved",
    options: [
      { id: '1', name: 'Yes', value: 'Yes', label: 'Yes' },
      { id: '2 ', name: 'No', value: 'No', label: 'No' },
    ],
    row: true,
  },
  {
    label: "Purity",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Weight",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Form",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Variant",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Series",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Condition",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Features",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Origin",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Theme",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Monarch",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Finish",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Photo",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "By Mint",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
]

export const sortByOptions = [
  { id: '1', name: 'Most Popular', value: 'Most Popular', label: 'Most Popular', },
  { id: '2', name: 'Price: Low to High', value: 'Price: Low to High', label: 'Price: Low to High' },
  { id: '3', name: 'Price: High to Low', value: 'Price: High to Low', label: 'Price: High to Low' },
  // { id: '4', name: 'Weight: Ascending', value: 'Weight: Ascending', label: 'Weight: Ascending' },
  // { id: '5', name: 'Weight: Descending', value: 'Weight: Descending', label: 'Weight: Descending' },
  // { id: '6', name: 'Year: Ascending', value: 'Year: Ascending', label: 'Year: Ascending' },
  // { id: '7', name: 'Year: Descending', value: 'Year: Descending', label: 'Year: Descending' },
  // { id: '8', name: 'Highest Rated', value: 'Highest Rated', label: 'Highest Rated' },
]

export const qmintRating = [
  {
    name: "Overall",
    percentage: 37.8,
  },
  {
    name: "Outer Pack",
    percentage: 40,
  },
  {
    name: "Inner Pack",
    percentage: 60,
  },
]

export const productImages = [
  "https://imagestoragecdn.blob.core.windows.net/documents/100g-Queensland-Mint-Gold-Cast-Bar-Front-min_210320221703508.png",
  "https://imagestoragecdn.blob.core.windows.net/documents/10oz-Queensland-Mint-Silver-Bar-Ultra-Shine-Duo-Strike-feature_210320221903236.png",
  "https://imagestoragecdn.blob.core.windows.net/documents/QMint-5oz-gold-Bar-min_210320221703215.png",
  "https://imagestoragecdn.blob.core.windows.net/documents/a-2007-Six-Coin-Gold-Set-Perth-Mint-OPEN_210320221703591.png",
  "https://imagestoragecdn.blob.core.windows.net/documents/2022-AustralianKangaroo-Silver-1oz-StraightOn_210320221903152.png",
  "https://imagestoragecdn.blob.core.windows.net/documents/QMint-2oz-gold-Bar-Front-min_210320221703362.png",
]

export const wishlistData = [
  {
    name: "10oz Queensland Mint Kangaroo Gold Cast Bar",
    image: "https://imagestoragecdn.blob.core.windows.net/documents/100g-Queensland-Mint-Gold-Cast-Bar-Front-min_210320221703508.png",
    price: "$1,702.35",
    qty: "1",
    total: "$33,386.29",
  },
  {
    name: "1/2oz Queensland Mint Kangaroo Gold Cast Bar",
    image: "https://imagestoragecdn.blob.core.windows.net/documents/10oz-Queensland-Mint-Silver-Bar-Ultra-Shine-Duo-Strike-feature_210320221903236.png",
    price: "$1,702.35",
    qty: "1",
    total: "$1,702.35",
  },
]