# Virtual Try-On Platform Website

A complete, professional, multi-page website for your virtual try-on business.

## 🚀 What's Included

### Pages
1. **Homepage** (`index.html`) - Hero, features, stats, products overview
2. **Product** (`products.html`) - Scan & Wear in-store QR-code virtual try-on
3. **Pricing** (`pricing.html`) - Transparent pricing with ROI calculator
4. **How It Works** (`how-it-works.html`) - Technical details and process flows
5. **Demo/Contact** (`demo.html`) - Booking form and contact information

### Features
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Modern, professional design
- ✅ Fast loading and optimized
- ✅ SEO-friendly structure
- ✅ Accessible (WCAG compliant)
- ✅ Interactive elements (smooth scrolling, animations)
- ✅ Mobile hamburger menu
- ✅ Contact form with validation
- ✅ No external dependencies (pure CSS/JS)

## 📁 File Structure

```
website/
├── index.html              # Homepage
├── products.html           # Products page
├── pricing.html            # Pricing page
├── how-it-works.html       # How it works page
├── demo.html               # Demo/contact page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── script.js           # JavaScript interactions
├── images/                 # Folder for images (empty - add your own)
└── README.md               # This file
```

## 🎨 Design System

### Colors
- **Primary:** #1a2b4a (Navy blue)
- **Secondary:** #2dd4bf (Teal)
- **Accent:** #f59e0b (Amber)
- **Text:** #1f2937 (Dark gray)
- **Background:** #ffffff (White)

### Typography
- System font stack (optimized for performance)
- Responsive font sizes
- Clear hierarchy

## 🌐 How to Use

### Option 1: Open Locally (Quickest)
1. Open `website` folder
2. Double-click `index.html`
3. Website opens in your browser!

### Option 2: Deploy to Free Hosting

#### Vercel (Recommended)
```bash
cd website
npx vercel --prod
```
- Free forever
- Automatic HTTPS
- Get URL like: yourname.vercel.app

#### Netlify
```bash
cd website
npx netlify-cli deploy --prod
```
- Free forever
- Custom domain support
- Get URL like: yourname.netlify.app

#### GitHub Pages
1. Create GitHub repository
2. Upload `website` folder
3. Enable GitHub Pages in settings
4. Get URL like: yourusername.github.io/repo-name

### Option 3: Use with Custom Domain
Once you buy a domain:
1. Deploy to Vercel/Netlify (see above)
2. Point your domain to the hosting
3. Add SSL certificate (automatic on Vercel/Netlify)
4. Done!

## ✏️ Customization

### Change Brand Name
1. Find all instances of "VirtualFit" in files
2. Replace with your actual brand name
3. Update logo in navigation

### Add Your Products
1. Replace placeholder text with your actual product descriptions
2. Add real product images to `images/` folder
3. Update image paths in HTML

### Change Colors
Edit `css/styles.css`:
```css
:root {
  --primary-color: #YOUR_COLOR;
  --secondary-color: #YOUR_COLOR;
  /* etc */
}
```

### Update Contact Info
1. Search for "hello@yourcompany.com"
2. Replace with your actual email
3. Update phone numbers and addresses

### Connect Contact Form
The form currently shows an alert. To make it functional:

**Option 1: Formspree (Free)**
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

**Option 2: Netlify Forms (Free)**
Add to form tag:
```html
<form name="demo" netlify>
```

**Option 3: Your own backend**
Modify `handleSubmit()` in `demo.html` to send to your API

## 📊 Adding Analytics

### Google Analytics
Add to `<head>` of all pages:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🖼️ Adding Images

1. Add images to `website/images/` folder
2. Update HTML:
```html
<img src="images/your-image.jpg" alt="Description">
```

### Recommended Images
- Product screenshots
- Try-on examples (before/after)
- Team photos
- Brand logos
- Customer testimonials

## 📱 Testing

### Mobile
1. Open website
2. Press F12 (Developer Tools)
3. Click device icon (top-left)
4. Test different screen sizes

### All Browsers
Test on:
- Chrome
- Safari
- Firefox
- Edge

## 🚀 Performance Tips

1. **Compress images** - Use tinypng.com before uploading
2. **Enable caching** - Hosting providers do this automatically
3. **Minify CSS/JS** - Only if needed (files are already optimized)

## 🔒 Security

- All links are HTTPS
- No external dependencies (no CDN risks)
- Form validation included
- GDPR-ready structure (add cookie banner if needed)

## 📈 SEO Checklist

- ✅ Meta descriptions on all pages
- ✅ Semantic HTML structure
- ✅ Alt text for images (add when you add images)
- ✅ Fast loading speed
- ✅ Mobile responsive
- ✅ Clean URLs
- 🔲 Add sitemap.xml (when deployed)
- 🔲 Add robots.txt (when deployed)
- 🔲 Submit to Google Search Console (after deploy)

## 🎯 Next Steps

1. **Customize content** - Replace placeholder text with your real content
2. **Add images** - Add product photos and screenshots
3. **Test locally** - Open and test all pages
4. **Deploy** - Use Vercel or Netlify for free hosting
5. **Buy domain** (optional) - When ready to launch publicly
6. **Connect form** - Set up Formspree or backend for contact form
7. **Add analytics** - Install Google Analytics
8. **Launch** - Share your website!

## 💡 Tips

- **Don't wait for a domain** - Deploy to Vercel first, add domain later
- **Start simple** - Launch with basic content, improve over time
- **Test everything** - Click all links, submit forms, test on mobile
- **Get feedback** - Show to friends/colleagues before public launch

## 🆘 Support

If you need help:
1. Check this README first
2. Google the specific question
3. Ask ChatGPT or Claude for help

## 📄 License

This website is yours to use and modify however you want!

---

**Built with:**
- Pure HTML5
- Pure CSS3
- Vanilla JavaScript
- No frameworks
- No build process
- Zero dependencies

**Perfect for:**
- Quick deployment
- Easy customization
- Fast loading
- Maximum compatibility

Good luck with your virtual try-on business! 🚀
