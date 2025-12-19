# 🚀 Quick Setup Guide - Nirgun Washers Website

## Step 1: Install Dependencies

Open terminal in the project folder and run:
```bash
npm install
```

This will install all required packages:
- React
- React Router
- QR Code Generator
- Map libraries

## Step 2: Start Development Server

```bash
npm run dev
```

Your site will be available at `http://localhost:5173`

## Step 3: Customize Your Information

### Important Files to Update:

#### 1. **Contact Information** (3 files)

**File: `src/pages/Contact.jsx` (Line ~83)**
```javascript
const whatsappNumber = '919876543210' // CHANGE THIS - your WhatsApp number
const whatsappMessage = 'Hello Nirgun Washers, I would like to know more about your services.'
```

**File: `src/pages/Maps.jsx` (Line ~15)**
```javascript
const businessLocation = {
  lat: 28.7041,      // CHANGE - Your latitude
  lng: 77.1025,      // CHANGE - Your longitude
  name: 'Nirgun Washers',
  address: 'Your Address Here, City, State - Pin Code'  // CHANGE
}
```

Also update in the same file around line 37:
```javascript
phone: "+91 98765 43210"  // CHANGE
email: "info@nirgunwashers.com"  // CHANGE
```

**File: `src/components/Footer.jsx` (Lines 20-22)**
```javascript
<p>📞 Phone: [Your Phone]</p>       // CHANGE
<p>✉️ Email: info@nirgunwashers.com</p>  // CHANGE
```

#### 2. **Pricing** 
**File: `src/pages/Catalog.jsx` (Lines 5-63)**
Update the services array with your actual pricing

#### 3. **Company Information**
**File: `src/pages/About.jsx`**
Update company story, mission, and services

## Step 4: Build for Production

```bash
npm run build
```

This creates a `dist` folder with your website ready to deploy.

## Step 5: Deploy to Vercel

### Option A: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Your site is live! ✨

### Option B: Manual Deployment

```bash
npm install -g vercel
vercel
```

## 🎯 Key Features to Explore

### 1. Welcome Page (Home)
- Hero section with CTA buttons
- Feature highlights

### 2. About Page
- Company information
- Services overview

### 3. Catalog (Pricing)
- 9 services with detailed pricing
- Filter by category
- "Book Now" buttons

### 4. Location (Maps)
- Toggle between 2D and 3D views
- Google Maps embedded
- Contact details
- Directions button

### 5. Contact Page
- Contact form
- **WhatsApp QR Code** - Scan to chat
- Direct WhatsApp link
- Social media links
- Working hours

## 🔗 Useful Links for Git & Vercel Setup

1. **Create GitHub Repository**: https://github.com/new
2. **Vercel Deployment**: https://vercel.com
3. **Git Guide**: https://git-scm.com/doc

## 💡 Tips

- The QR code in Contact page automatically generates from your WhatsApp number
- All pages are fully responsive (mobile-friendly)
- Gradient purple/blue theme can be customized in CSS files
- Google Maps will need proper embed configuration with your location

## ⚠️ Before Going Live

- [ ] Update all phone numbers and email addresses
- [ ] Update pricing information
- [ ] Replace placeholder address with your actual location
- [ ] Test WhatsApp link with your number
- [ ] Check all links and buttons work
- [ ] Test on mobile devices
- [ ] Update Google Maps coordinates

## 📱 Testing the WhatsApp QR

After updating your WhatsApp number:
1. Go to Contact page
2. Scan QR code with phone camera
3. Should open WhatsApp chat

## 🎨 Customizing Colors

Main colors are defined in CSS files:
- Primary: `#667eea` (Purple-blue)
- Secondary: `#764ba2` (Purple)
- Accents: `#25d366` (WhatsApp green)

Search for these hex codes in `.css` files to customize.

## 🆘 Common Issues

**Issue**: npm install fails
**Solution**: Delete `node_modules` folder and run `npm install` again

**Issue**: Map not showing
**Solution**: Update coordinates in `src/pages/Maps.jsx`

**Issue**: WhatsApp QR not generating
**Solution**: Ensure WhatsApp number format is correct (without + or -)

---

**Need Help?** Refer to README.md for more details!
