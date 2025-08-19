# Check Template Portal

A modern React + Tailwind CSS web application for designing, previewing, exporting, and verifying customized checks.

## 🚀 Features

### Core Functionality
- **CheckForm**: Intuitive form with validation for check details (amount, date, payee, memo)
- **CheckPreview**: Live preview of check design with professional styling and watermarks
- **ExportButton**: PDF export functionality using html2canvas and jsPDF
- **VerifyCheck**: Secure portal for check authenticity verification

### Advanced Features
- **Template Management**: Save and load custom check templates using localStorage
- **Responsive Design**: Fully responsive UI optimized for desktop and mobile
- **Professional Styling**: Polished interface with Tailwind CSS and custom branding
- **Security Features**: Check verification system with cryptographic hashing
- **Real-time Validation**: Form validation with helpful error messages

## 🛠️ Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM for navigation
- **PDF Export**: html2canvas + jsPDF for high-quality PDF generation
- **Icons**: Lucide React for consistent iconography
- **Storage**: localStorage for template and verification data persistence
- **Build Tool**: Vite for fast development and optimized builds

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CheckForm.jsx    # Form for check details input
│   ├── CheckPreview.jsx # Live check preview component
│   ├── ExportButton.jsx # PDF export functionality
│   ├── Navbar.jsx       # Navigation component
│   └── VerifyCheck.jsx  # Check verification component
├── pages/               # Page components
│   ├── Home.jsx         # Landing page
│   ├── DesignCheck.jsx  # Check design page with drag-and-drop
│   └── VerifyCheck.jsx  # Verification page
├── utils/               # Utility functions
│   ├── localStorage.js  # LocalStorage management
│   └── validation.js    # Form validation utilities
├── App.jsx              # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CheckTemplatePortal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

### VS Code Run and Debug

To use the VS Code's integrated debugger for a more efficient development workflow, follow these steps:

**Create launch.json file:**

1. Open the Run and Debug tab in the VS Code sidebar (Ctrl + Shift + D).
2. Click on the gear icon or the "create a launch.json file" link.
3. Select Node.js from the environment dropdown.

**Configure launch.json:**

The created file will be in a new .vscode folder. Replace its content with the following configuration to run the project using the "Run Script: start" command.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Run npm start",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

**Start the Debugger:**

1. In the Run and Debug view, select "Run npm start" from the dropdown menu at the top.
2. Close the launch.json file.
3. Press F5 on your keyboard to start the server and the debugger.
4. The server will run in the integrated terminal, and you will be able to set breakpoints in your code.

## 📖 Usage Guide

### Designing a Check

1. **Navigate to Design Check** (`/design`)
2. **Choose a template** from the gallery or start blank
3. **Fill in check details**:
   - Pay to the Order of (required)
   - Amount (required) - automatically converts to words
   - Date (required)
   - Check number, memo (optional)
4. **Add account information**:
   - Account holder name (required)
   - Bank name (required)
   - Address, routing number, account number (optional)
   - Signature (optional)
5. **Customize layout** with drag-and-drop positioning
6. **Preview in real-time** - see changes instantly
7. **Save as template** for future use
8. **Export to PDF** when ready

### Managing Templates

- **Save Template**: Click "Save Template" button after filling form
- **Load Template**: Click "Load Template" to see saved templates
- **Delete Template**: Use trash icon to remove unwanted templates

### Verifying Checks

1. **Navigate to Verify Check** (`/verify`)
2. **Enter search criteria**:
   - Check ID
   - Hash value
   - Filename
   - Check number
   - Payee name
3. **View verification results** with detailed check information

## 🎨 Design Features

### Check Design Elements
- Professional check layout with proper spacing
- Security features (watermarks, "VOID IF ALTERED" text)
- Bank routing information formatting
- Signature line styling
- Responsive design for different screen sizes

### UI/UX Features
- Clean, modern interface
- Intuitive navigation
- Real-time form validation
- Loading states and error handling
- Mobile-responsive design
- Accessibility considerations

## 🔒 Security Features

### Check Verification
- Unique ID generation for each exported check
- Cryptographic hash generation for verification
- Secure storage of check metadata
- Search functionality for verification portal

### Data Protection
- Client-side data storage using localStorage
- No sensitive data transmitted to external servers
- Template data encryption (can be enhanced)

## 🧪 Development Features

### Code Quality
- ESLint configuration for code consistency
- Modular component architecture
- Clear separation of concerns
- Comprehensive error handling
- Detailed comments and documentation

### Performance
- Lazy loading for PDF export libraries
- Optimized bundle size with Vite
- Efficient re-rendering with React hooks
- Responsive image handling

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the demo walkthrough script

## 🎯 Roadmap

### Planned Features
- [ ] Enhanced security with digital signatures
- [ ] Cloud storage integration
- [ ] Advanced template customization
- [ ] Batch check processing
- [ ] Integration with banking APIs
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] Dark mode theme

### Technical Improvements
- [ ] Unit and integration tests
- [ ] Performance monitoring
- [ ] Progressive Web App (PWA) features
- [ ] Offline functionality
- [ ] Enhanced accessibility features
