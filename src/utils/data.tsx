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
    href: "#",
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
    href: "#",
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