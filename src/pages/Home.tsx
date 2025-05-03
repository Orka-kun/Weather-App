import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ErrorMessage from '../components/ErrorMessage';
import { RootState, AppDispatch } from '../store'; // Import AppDispatch
import { fetchWeather } from '../store/weatherSlice';
import logo from '../assets/logo.jpeg';

const Home: React.FC = () => {
  const { data, loading, error, history } = useSelector((state: RootState) => state.weather);
  const dispatch: AppDispatch = useDispatch(); // Use typed AppDispatch
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const headlines = [
    "Your Weather, Your Way",
    "Forecasts Made Simple",
    "Weather Insights, Anytime",
    "Stay Ahead of the Storm",
    "Weather Made Easy",
    "Your Weather Companion",
  ];

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      parsedHistory.forEach((city: string) => {
        dispatch(fetchWeather(city));
      });
    }
  }, [dispatch]);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('weatherSearchHistory', JSON.stringify(history));
  }, [history]);

  // Auto-update headline every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div className={`relative h-screen flex flex-col ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-gradient-dark' : 'bg-gradient-to-br from-blue-100 via-blue-300 to-indigo-200 animate-gradient-light'} transition-colors duration-500 font-poppins overflow-hidden`}>
      

      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-64 sm:h-80 md:h-full animate-slide-in" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={isDarkMode ? "#1f2937" : "#60a5fa"}
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-20">
        <img
          src={logo}
          alt="Weather App Logo"
          className="absolute top-4 sm:top-6 md:top-8 right-5 sm:right-6 md:right-20 w-16 sm:w-20 md:w-24 lg:w-28 rounded-full shadow-lg transition-all duration-300 animate-pulse-glow hover:filter hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] dark:hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.8)]"
        />
      </div>

      <div className="relative z-10 text-center mt-2 text-black dark:text-white text-sm sm:text-base md:text-lg drop-shadow-lg font-bold animate-fade-in">
        {currentTime.toLocaleDateString()} | {currentTime.toLocaleTimeString()}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center pt-16 sm:pt-20 md:pt-24 pb-6 sm:pb-8 md:pb-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-6xl mx-auto">
          <h1
            key={currentHeadline}
            className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-slide-up-fade max-w-[90%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto drop-shadow-xl"
          >
            {headlines[currentHeadline]}
            <span className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-underline-glow"></span>
          </h1>
        </div>
        <p className="font-semibold mt-3 sm:mt-4 text-xl sm:text-lg md:text-xl text-white dark:text-white animate-fade-in max-w-[90%] sm:max-w-lg mx-auto drop-shadow-xl">
          Plan your day with precision weather data.
        </p>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-0">
        <div className="w-full max-w-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 transform transition-all duration-500 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white drop-shadow-2xl">Weather App</h2>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className={`block w-10 h-6 bg-gray-400 rounded-full p-1 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-400'} relative`}>
                <span className={`absolute w-4 h-4 bg-white rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></span>
              </span>
            </button>
          </div>

          <div className="relative group z-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-4xl blur opacity-25 group-hover:opacity-75 transition-all duration-500 group-hover:-inset-2"></div>
            <div className="relative rounded-lg py-1 px-2.5 transition-all duration-300">
              <SearchBar />
            </div>
          </div>

          {history.length > 0 && (
            <div className="mt-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Searches:</h3>
              <div className="flex flex-wrap gap-3">
                {history.map((city) => (
                  <button
                    key={city}
                    onClick={() => dispatch(fetchWeather(city))}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <p className="text-gray-700 dark:text-white text-center mt-6 animate-pulse">Loading...</p>
          )}

          {error && (
            <div className="mt-6 animate-fade-in">
              <ErrorMessage message={error} />
            </div>
          )}

          {data && (
            <div className="mt-6 animate-scale-fade">
              <WeatherCard data={data} />
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 text-center py-3">
        <p className="text-base sm:text-lg md:text-xl text-black dark:text-white animate-fade-in mb-2 drop-shadow-lg">
          "Skies Speak, We Listen..."
        </p>
        <div className="flex justify-center gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 animate-pop-rotate">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .386.045.762.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.732-.666 1.585-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.396 0-.788-.023-1.175-.067 2.167 1.405 4.768 2.225 7.548 2.225 9.055 0 14.005-7.496 14.005-13.986 0-.21-.005-.42-.014-.629.96-.695 1.795-1.562 2.455-2.549z"/>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200 animate-pop-rotate">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/orka" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-600 transition-colors duration-200 animate-pop-rotate">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 animate-pop-rotate">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.906.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.906.132 5.775.072 7.053.015 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.146.558 2.912.306.789.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.297 1.636.499 2.912.558C8.333 23.985 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.146-.262 2.912-.558.789-.306 1.459-.717 2.126-1.384.666-.667 1.079-1.336 1.384-2.126.297-.766.499-1.636.558-2.912.057-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.146-.558-2.912-.306-.789-.717-1.459-1.384-2.126C21.319 1.347 20.65.934 19.86.63c-.766-.297-1.636-.499-2.912-.558C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.421.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.382.896-.422.164-1.057.36-2.227.413-1.261.057-1.645.07-4.849.07s-3.585-.013-4.85-.07c-1.17-.061-1.805-.256-2.227-.421-.562-.224-.96-.479-1.382-.899-.421-.419-.679-.824-.896-1.382-.164-.422-.36-1.057-.413-2.227-.057-1.261-.07-1.645-.07-4.849s.016-3.585.074-4.85c.061-1.17.256-1.805.421-2.227.224-.562.479-.96.899-1.382.419-.419.824-.679 1.382-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.645-.07 4.85-.07zm0 3.838a6.002 6.002 0 100 12.004 6.002 6.002 0 000-12.004zm0 9.665a3.663 3.663 0 110-7.326 3.663 3.663 0 010 7.326zM18.406 4.155a1.405 1.405 0 11-2.81 0 1.405 1.405 0 012.81 0z"/>
            </svg>
          </a>
          <a href="https://github.com/Orka-kun" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 animate-pop-rotate">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
