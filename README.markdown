# WEATHER-APP

## Overview

Welcome to WEATHER-APP, a sleek and modern web application designed to provide real-time weather information based on city searches. Built with React, Tailwind CSS, Redux Toolkit, and Typescript, this app features a responsive design, animated transitions, a dark/light mode toggle, and a glowing logo for an engaging user experience. The app fetches data from the OpenWeatherMap API and stores recent searches locally.

## Features

- **Real-Time Weather**: Fetch current weather data for any city using the OpenWeatherMap API.
- **User Interface**: Responsive design with smooth animations and a customizable dark/light mode.
- **Search Functionality**: Enter a city name and press Enter to view weather details.
- **Recent Searches**: Display and re-fetch up to 5 recently searched cities with clickable buttons.
- **Error Handling**: Display informative error messages for invalid cities or API issues.
- **Local Storage**: Persist search history using `localStorage`.

## Prerequisites

- **Node.js**: Version 18.x or later
- **npm**: Version 9.x or later
- **Git**: For cloning the repository
- **OpenWeatherMap API Key**: Obtain a free API key from [OpenWeatherMap](https://openweathermap.org/api)

## Installation

### Clone the Repository
```bash
git clone https://github.com/Orka-kun/Weather-App.git
cd Weather-App
```

### Setup Environment Variables
1. Create a `.env` file in the root directory.
2. Add your OpenWeatherMap API key:
   ```
   VITE_API_KEY=your_openweathermap_api_key
   ```

### Install Dependencies
```bash
npm install
```

### Run the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to your localhost port.

## Usage Instructions

### Accessing the Application
- Launch the app via `npm run dev` and visit the provided local URL.
- The homepage displays a search bar, animated headlines, current date/time, and social media links.

### Navigating the Interface
- **Search Bar**: Enter a city name and press Enter to fetch weather data. The input field supports dark mode styling.
- **Weather Card**: Displays temperature, conditions, and other details when data is available.
- **Recent Searches**: Click buttons below the search bar to re-fetch weather for previously searched cities.
- **Dark/Light Mode**: Toggle the theme using the switch in the header for a personalized experience.
- **Animations**: Enjoy fade-in effects, a pulsing logo, and sliding transitions throughout the UI.

### Permissions
- The app requires an internet connection to fetch weather data.
- Local storage access is used to save search history (can be cleared via browser settings).

### Resetting Search History
- To clear saved search history data, open your browser's developer tools or right click and go to inspect, go to the "Application" or "Storage" tab, find `localStorage`, and clear site data. Refresh the page to apply.

## Troubleshooting
- **"API key is missing" Error**: Ensure `VITE_API_KEY` is correctly set in your `.env` file.
- **"City not found" Error**: Verify the city name is spelled correctly.
- **Build Failures**: Check for TypeScript errors and ensure `store/index.ts` uses the correct `AppDispatch` typing.
- **Animation Issues**: Confirm Tailwind CSS and custom animations in `index.css` are loaded properly.

## Deployment
1. **Build the Project**:
   ```bash
   npm run build
   ```
   This generates a `dist` folder with production-ready files.
2. **Deploy**:
   - Host the `dist` folder on a static hosting service (e.g., Netlify, Vercel, or GitHub Pages).
   - Set the `VITE_API_KEY` environment variable in the hosting platform’s settings.

## License
This project is licensed under the MIT License.

## Contact
For issues or questions, open an issue on GitHub or contact the developer at `orkadas@gmail.com`.

## Acknowledgments
- Built with ❤️ using React, Redux Toolkit, Tailwind CSS, and Vite.
- Weather data powered by [OpenWeatherMap](https://openweathermap.org).
- Inspired by modern UI designs with animated elements and responsive layouts.