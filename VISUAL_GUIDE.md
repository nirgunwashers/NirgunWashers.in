# 🎨 Visual Site Map - Nirgun Washers Website

## 📱 Website Navigation Structure

```
┌─────────────────────────────────────────┐
│         NIRGUN WASHERS 🧺               │
│  Navigation Bar (Sticky at Top)         │
├─────────────────────────────────────────┤
│ Home | About | Catalog | Location | Contact │
└─────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│              PAGE CONTENT HERE                   │
│              (Changes based on URL)              │
│                                                  │
│  100% Responsive:                                │
│  - Desktop: Full width                          │
│  - Tablet: Adjusted layout                      │
│  - Mobile: Stacked view                         │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ FOOTER - Contact Info | Links | Social Media    │
└──────────────────────────────────────────────────┘
```

## 🗺️ Page Routes

```
/                  → Welcome/Home Page
  ├─ Hero Section
  ├─ Features Grid
  └─ CTA Section

/about             → About Page
  ├─ Company Story
  ├─ Mission & Vision
  ├─ Why Choose Us
  └─ Services Overview

/catalog           → Services & Pricing
  ├─ Category Filter
  ├─ Service Cards (9 total)
  │  └─ Each with: Name | Price | Features | Book Now
  └─ Additional Info

/maps              → Location Page
  ├─ Map Toggle (2D/3D)
  ├─ Google Maps Embed
  ├─ Location Info
  ├─ Contact Details
  └─ Facility Features

/contact           → Contact & WhatsApp ⭐
  ├─ Contact Form
  ├─ Contact Information
  ├─ WhatsApp Link
  ├─ 📲 WhatsApp QR Code (NEW!)
  └─ Social Media Links
```

## 🎨 Color Scheme

```
PRIMARY GRADIENT:
┌────────────────────────┐
│ Purple-Blue (#667eea)  │  ← Main brand color
│ Deep Purple (#764ba2)  │  ← Secondary color
└────────────────────────┘

ACCENTS:
┌────────────────────────┐
│ WhatsApp Green (#25d366) │  ← WhatsApp section
│ Light Gray (#f8f9fa)     │  ← Backgrounds
│ White (#ffffff)          │  ← Cards
│ Dark Gray (#2c3e50)      │  ← Text
└────────────────────────┘
```

## 📊 Content Overview

### 🏠 Welcome Page
```
Header (Hero Section)
├─ Title: "Welcome to Nirgun Washers"
├─ Tagline: "Professional Laundry & Dry Cleaning"
└─ 2 CTA Buttons:
   ├─ "View Services & Pricing" → /catalog
   └─ "Get in Touch" → /contact

Features Section (4 Cards)
├─ ⚡ Fast Service
├─ ✨ Premium Quality
├─ 💰 Affordable Pricing
└─ 🚚 Delivery Available

Call-to-Action Section
└─ "Ready to Experience Premium Laundry?"
   → "Explore Catalog" Button
```

### 📖 About Page
```
Header: "About Nirgun Washers"

Content Sections:
├─ Our Story
├─ Our Mission
├─ Our Vision
├─ Why We're Different (6 points)
└─ Our Services (4 categories)
```

### 💳 Catalog Page
```
Filter Buttons (Top)
├─ All Services
├─ General Laundry
├─ Ironing
├─ Dry Cleaning
└─ Special Services

Service Cards Grid (9 Items)
Each Card Contains:
├─ Service Name
├─ Description
├─ Price in ₹
├─ Unit (per kg, per piece, per set)
├─ Features (3-4 checkmarks)
└─ "Book Now" Button

Additional Info (4 Cards)
├─ 📦 Minimum Order
├─ 🚚 Delivery
├─ ⏱️ Turnaround Time
└─ 💳 Payment Options
```

### 🗺️ Maps Page
```
Map Toggle Buttons
├─ 📍 2D Map View
└─ 🗺️ 3D Map View

Map Display
├─ Google Maps Embed (500px height)
└─ Changes based on toggle

Location Information
├─ Business Name: "Nirgun Washers"
├─ Address: [Your Address]
├─ Hours: Mon-Sun 8 AM - 8 PM
└─ "Get Directions" Button

Contact Details (3 Items)
├─ 📞 Phone: [Your Number]
├─ ✉️ Email: [Your Email]
└─ ⏰ Working Hours: [Hours]

Facility Features (4 Cards)
├─ 🏪 Modern Facility
├─ 🅿️ Free Parking
├─ 👥 Friendly Staff
└─ ☕ Waiting Area
```

### 💬 Contact Page
```
Left Section (60% width)
├─ "Send us a Message" Form
├─ Fields:
│  ├─ Name *
│  ├─ Email *
│  ├─ Phone *
│  ├─ Service Interested In
│  ├─ Message *
│  └─ Submit Button
└─ ✓ Success Message (if submitted)

Right Section (40% width)
├─ Contact Information
│  ├─ 📞 Call Us
│  ├─ 📧 Email Us
│  ├─ 📍 Visit Us
│  └─ Each with details

├─ WhatsApp Section (Green)
│  ├─ "💬 WhatsApp Us"
│  └─ WhatsApp Link Button

└─ QR Code Section
   ├─ "📲 Scan QR Code"
   ├─ Generated QR (200x200px)
   └─ "Use your phone camera to scan"

Social Media Section
├─ Follow Us
└─ 4 Social Links:
   ├─ Facebook
   ├─ Instagram
   ├─ Twitter
   └─ YouTube
```

## 🎯 Component Hierarchy

```
App (Main)
├─ Navbar (Top)
│  └─ Logo + 5 Links
├─ Routes
│  ├─ Welcome Page
│  ├─ About Page
│  ├─ Catalog Page
│  │  └─ Service Cards (9x)
│  ├─ Maps Page
│  │  └─ Google Maps Embed
│  └─ Contact Page
│     ├─ Contact Form
│     ├─ Contact Info
│     └─ QR Code Component
└─ Footer (Bottom)
   └─ Links + Social
```

## 📐 Layout Specifications

```
Desktop (1200px+)
├─ Full navigation
├─ 2-column layouts where applicable
└─ Full features displayed

Tablet (768px - 1199px)
├─ Responsive grid
├─ Adjusted font sizes
└─ Mobile-optimized spacing

Mobile (< 768px)
├─ Single column
├─ Stacked navigation
├─ Larger touch targets
└─ Optimized images
```

## 🎬 Animation & Effects

```
Hover Effects:
├─ Buttons: Scale up + Shadow
├─ Cards: Lift up slightly
├─ Links: Color change + underline
└─ Social: Scale + Shadow

Page Load:
├─ Hero text: Slide down fade-in
├─ Features: Stagger animation
└─ Cards: Subtle pop-in

Transitions:
├─ Route changes: Smooth
├─ Button clicks: Instant feedback
└─ Form focus: Border highlight
```

## 📞 WhatsApp QR Code Magic ✨

```
Normal WhatsApp Link:
├─ Text: "💬 Message on WhatsApp"
└─ Opens: https://wa.me/[number]

QR Code Version:
├─ Generated from WhatsApp link
├─ 200x200px square
├─ Scannable with phone camera
└─ Opens WhatsApp directly

Flow:
User scans QR
    ↓
Phone camera app detects link
    ↓
Opens WhatsApp
    ↓
Chat with Nirgun Washers
    ↓
Customer sends inquiry! 🎉
```

## 🔗 Navigation Flow

```
User Enters → Welcome Page (/)
                    ↓
         [Explores Navigation]
                    ↓
         ┌─ About → Learn Story
         ├─ Catalog → See Pricing
         ├─ Maps → Find Location
         ├─ Contact → Send Message OR Scan QR
         └─ WhatsApp → Direct Chat ⭐

[Multiple paths back to any page via navbar]
```

## 💾 Data Flow

```
User Action → Component Handler → State Update → Re-render

Examples:
├─ Click "Book Now" → Button click handler → Stores intent
├─ Scan QR Code → Generates from WhatsApp number → Opens WhatsApp
├─ Filter Services → Filter function → Grid updates
├─ Toggle Maps → State changes → Different embed loads
└─ Fill Form → Controlled inputs → Form validates
```

## 🎯 Call-to-Action Strategy

```
Multiple CTAs Throughout:

Welcome Page:
├─ "View Services & Pricing" → Catalog
└─ "Get in Touch" → Contact

About Page:
└─ Implicit (content driven)

Catalog Page:
├─ "Book Now" buttons (per service)
└─ Pricing info drives interest

Maps Page:
├─ "Get Directions" → Google Maps
└─ Contact info visible

Contact Page:
├─ Contact Form → Email inquiry
├─ WhatsApp Link → Direct chat
├─ WhatsApp QR → Scan to chat
└─ Phone/Email → Traditional contact

Result: Multiple paths to customer engagement! 🎊
```

## 📊 Service Catalog Structure

```
Service Object:
{
  id: Number,
  category: 'general|ironing|dry-clean|special',
  name: String,
  description: String,
  price: Number,
  unit: String ('per kg', 'per piece', 'per set'),
  features: Array of 3-4 benefits
}

Categories:
├─ General Laundry (2 services)
├─ Ironing (2 services)
├─ Dry Cleaning (2 services)
└─ Special Services (3 services)

Total: 9 services ready to customize!
```

---

**This visual guide helps you understand your website structure at a glance!** 🎨

See other markdown files for detailed implementation information.
