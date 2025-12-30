# Installation Guide 🛠️

Follow these steps to set up and run the Material 3 Next.js App primarily on your local machine.

## 📋 Prerequisites

Ensure you have the following installed:
- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher
- **Git**

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/web3-project.git
cd web3-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 📱 PWA Setup

This project is configured as a Progressive Web App. To test PWA features locally:

1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Open in Chrome and inspect "Application" tab > Service Workers.
4. You can also "Install" the app to your desktop or mobile device via the browser menu.

## 🧪 Quality Assurance

### Linting
Run ESLint to check for code quality issues:
```bash
npm run lint
```

### Bundle Analysis
Analyze the size of the JavaScript bundles:
```bash
ANALYZE=true npm run build
```
This will generate a visual report at `.next/analyze/client.html`.

## 🔧 Troubleshooting

### Common Issues

**1. "Duplicate identifier React" during build**
*   **Cause**: conflicting import statements in utility files.
*   **Solution**: Ensure `import React from 'react'` is only declared once at the top of `.tsx` files.

**2. Hydration Mismatch**
*   **Cause**: Server-rendered HTML differs from client-rendered HTML (e.g., `Date.now()`).
*   **Solution**: Use `useEffect` to handle dynamic data that depends on the client, or `suppressHydrationWarning` for specific elements like timestamps.

**3. PWA not installing**
*   **Cause**: Missing HTTPS or valid manifest.
*   **Solution**: PWA features require HTTPS (or localhost). Ensure `manifest.json` is in the `public` folder and linked in `layout.tsx`.

### Support

For additional help, please refer to the project documentation or open an issue in the repository.
