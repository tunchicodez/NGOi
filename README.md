# Annor Yeboah Care Foundation Website

A modern, responsive website for the Annor Yeboah Care Foundation, showcasing their mission to transform lives through education, vocational training, and community support across Ghana.

## 🌟 Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Image sliders, counters, and dynamic content
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Optimized images and efficient CSS/JS

## 📁 Project Structure

```
NGO/
├── css/                    # Stylesheets
│   ├── styles.css         # Main styles
│   ├── nav.css           # Navigation styles
│   ├── footer.css        # Footer styles
│   └── [page].css        # Page-specific styles
├── js/                    # JavaScript files
│   ├── common.js         # Common functionality
│   ├── includes.js       # Dynamic content loading
│   ├── slider.js         # Image slider functionality
│   └── counter.js        # Animated counters
├── images/               # Image assets
├── *.html               # HTML pages
├── netlify.toml         # Netlify configuration
└── package.json         # Project configuration
```

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Deploy the site**:
   ```bash
   netlify deploy --prod --dir .
   ```

### Option 2: Manual Upload to Netlify

1. Visit [netlify.com](https://netlify.com)
2. Drag and drop the entire project folder
3. The site will be automatically deployed

### Option 3: GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Set source to main branch

### Option 4: Other Hosting Providers

The website is a static site and can be hosted on:
- Vercel
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- Any web hosting provider

## 🔧 Local Development

To run the website locally:

1. **Simple HTTP Server** (Python):
   ```bash
   python -m http.server 8000
   ```

2. **Node.js HTTP Server**:
   ```bash
   npx http-server
   ```

3. **Live Server** (VS Code Extension):
   - Install Live Server extension
   - Right-click on `Home.html` and select "Open with Live Server"

## 📝 Configuration

### Netlify Configuration

The `netlify.toml` file includes:
- Build settings
- Security headers
- Cache optimization
- Redirect rules (index.html → Home.html)

### SEO & Performance

- All images are optimized
- Proper meta tags for social sharing
- Fast loading with CDN resources
- Mobile-first responsive design

## 🎨 Customization

### Colors
The website uses a professional color scheme defined in `css/styles.css`:
- Primary: #2563eb (Blue)
- Secondary: #059669 (Green)
- Accent: #dc2626 (Red)

### Fonts
- Primary: Poppins (headings)
- Secondary: Roboto (body text)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔒 Security

- Security headers configured in netlify.toml
- No sensitive data exposed
- HTTPS enforced on deployment

## 📞 Support

For technical support or questions about the website, contact the development team.

---

**Built with ❤️ for the Annor Yeboah Care Foundation**
