# RadMath ☢️

A modern, professional web-based calculator for nuclear and radiation calculations. Designed for health physicists, radiation safety officers, radiochemists, and other professionals in radiation physics and radiological engineering.

**Live Site:** [https://radmaths.com](https://radmaths.com)

![RadMath](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

### Five Powerful Calculators

1. **Radioactive Decay Calculator**
   - Calculate remaining activity over time
   - Support for 10+ common isotopes
   - Multiple time unit options (seconds to years)
   - Activity units: Ci, mCi, μCi, Bq, MBq, GBq

2. **Activity Conversions**
   - Convert between Becquerels and Curies
   - Support for: Bq, kBq, MBq, GBq, Ci, mCi, μCi, nCi
   - Scientific notation output

3. **Dose Conversions**
   - Convert between dose equivalent units
   - Support for: Sv, mSv, μSv, rem, mrem, Gy, mGy, rad
   - Accurate conversion factors

4. **Gamma Dose Rate Calculator**
   - Calculate dose rates from point sources
   - Built-in gamma constants for common isotopes
   - Inverse square law calculations
   - Multiple distance units (m, cm, ft)

5. **Shielding Calculator**
   - Determine dose reduction through shielding
   - Materials: Lead, Steel, Concrete, Tungsten, Aluminum
   - Customizable gamma energy
   - Attenuation calculations with percentage reduction

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installations required
- Works completely offline once downloaded

### Installation

1. **Download the files**
   ```
   radmath/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── sitemap.xml
   ├── robots.txt
   ├── .gitignore
   └── LICENSE
   ```

2. **Open in browser**
   - Simply double-click `index.html`
   - Or drag and drop into your browser
   - Or use a local server (optional)

3. **Optional: Using a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
   Then navigate to `http://localhost:8000`

## 📖 Usage Guide

### Basic Operation

1. **Select Calculator Type**
   - Use the dropdown menu to choose your calculation type
   - The interface will dynamically update with relevant fields

2. **Enter Values**
   - Fill in all required fields
   - Select appropriate units from dropdowns
   - Use scientific notation for very large/small numbers

3. **Calculate**
   - Click the lightning bolt (⚡) button
   - Results appear in the gradient result box below
   - Results use scientific notation when appropriate

### Example Calculations

#### Radioactive Decay Example
```
Isotope: Iodine-131
Initial Activity: 100 mCi
Time Elapsed: 16 days
Result: 2.500e+1 mCi (25.00% remaining)
```

#### Gamma Dose Rate Example
```
Isotope: Cesium-137
Activity: 1 Ci
Distance: 1 m
Result: 0.330 R/hr at 1.00m (3.30 mSv/hr)
```

## 🎨 Customization

### Changing Colors

Edit `styles.css` to modify the color scheme:

```css
/* Main gradient background */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to your preferred colors */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

### Adding New Isotopes

Edit `index.html` and add new options to the isotope dropdown:

```html
Isotope-Name (half-life)
```

## 📊 Calculation Methods

### Decay Formula
```
A(t) = A₀ × e^(-λt)
where λ = ln(2) / t½
```

### Inverse Square Law (Gamma Dose)
```
Dose Rate = (Γ × Activity) / Distance²
```

### Shielding Attenuation
```
I = I₀ × e^(-μρx)
where μ = linear attenuation coefficient
      ρ = material density
      x = thickness
```

## 🔧 Technical Details

### Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

### Performance
- Lightweight: < 50KB total
- No external dependencies
- Instant calculations
- Works offline

## 📱 Mobile Support

The calculator is fully responsive and works on:
- Smartphones (iOS/Android)
- Tablets
- Desktop computers
- Any screen size

## 🛠️ Development

### File Structure
```
radmath/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Calculation logic
├── README.md           # This file
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine rules
├── .gitignore          # Git ignore rules
└── LICENSE             # MIT License
```

### Adding New Calculators

1. Add HTML section in `index.html`:
```html

    

```

2. Add option to calculator selector:
```html
New Calculator
```

3. Add calculation function in `script.js`:
```javascript
function calculateNew() {
    // Your calculation logic
    return result;
}
```

4. Add case to switch statement:
```javascript
case 'new':
    result = calculateNew();
    break;
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE] file for details.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 🐛 Known Issues

- Shielding calculator uses simplified attenuation model
- Buildup factors not included in shielding calculations
- Limited isotope library (can be easily expanded)

## 🔮 Future Enhancements

- [ ] Add more isotopes to decay calculator
- [ ] Include buildup factors for shielding
- [ ] Add beta dose rate calculator
- [ ] Implement calculation history
- [ ] Add export/print functionality
- [ ] Include more shield materials
- [ ] Add unit tests
- [ ] Create API for calculations

## 📞 Support

For questions, issues, or suggestions:
- Visit [https://radmaths.com]
- Open an issue on GitHub
- Contact the development team

## 🙏 Acknowledgments

- Inspired by RadProCalculator
- Based on ICRP and NIST data
- Health physics community feedback

## ⚠️ Disclaimer

This calculator is provided for educational and professional use. Always verify critical calculations with certified health physics software and consult with qualified radiation safety professionals for important decisions.

---

**Website:** [https://radmaths.com]
**Version:** 1.0.0  
**Last Updated:** 2025  
**Status:** Active

Made with ☢️ for radiation professionals