### ExpressJS

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

//tailwind.config.js
content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

//index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### tailwind.config.js

```
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```