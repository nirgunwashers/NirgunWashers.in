# Admin Panel Instructions

## How to Edit Prices

The owner can now edit service prices easily without touching any code!

### Step 1: Access the Admin Panel

1. Open your website in a web browser
2. Go to: `yourwebsite.com/admin` (or `localhost:5173/admin` if testing locally)
3. You'll see a login screen

### Step 2: Login

- **Password**: `admin123`
- Enter the password and click "Login"

> **Note**: If you want to change the password, ask your developer to update it in the code (file: `src/pages/Admin.jsx`, line 10)

### Step 3: Edit Prices

1. You'll see a list of all services with their current prices
2. Find the service you want to update
3. Enter the new price in the price field (numbers only, e.g., `99` or `120.50`)
4. Repeat for any other services you want to change
5. Click **"Save Changes"** button at the top

### Step 4: Verify Changes

1. Click **"View Website"** button to see your changes
2. Go to the Services/Catalog page to see updated prices
3. The home page pricing preview will also show updated prices

### Important Notes

- ✅ Changes are saved immediately and appear on the website right away
- ✅ Prices are saved per language (English, Hindi, Marathi)
- ✅ Prices persist even after closing the browser (stored in browser's local storage)
- ✅ You can edit prices for the current language only (switch language in the website first if needed)
- ✅ Use **"Reset to Original"** to restore default prices if needed

### Troubleshooting

**Q: I forgot the password**
A: Ask your developer to check or reset it in `src/pages/Admin.jsx`

**Q: Changes aren't showing**
A: Make sure you clicked "Save Changes" and refresh the website page

**Q: I want to change prices for a different language**
A: First switch the website language using the language selector, then go to `/admin` again

**Q: How do I reset all prices?**
A: Click the "Reset to Original" button in the admin panel

---

**Need Help?** Contact your developer for assistance.

