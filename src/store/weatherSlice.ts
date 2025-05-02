import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { WeatherData } from '../types/weather';

// Thunk to fetch weather data
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY; // Use Vite's environment variable access
      console.log('City:', city);
      console.log('API Key:', apiKey);
      if (!apiKey) {
        console.error('API key is missing in environment variables');
        return rejectWithValue('API key is missing or not loaded correctly');
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log('API Response:', response.data);
      return response.data as WeatherData;
    } catch (error: any) {
      console.log('Thunk Error:', error);
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'City not found or API error');
      }
      return rejectWithValue(error.message || 'Network error or API unreachable');
    }
  }
);

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  history: string[];
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  history: JSON.parse(localStorage.getItem('weatherHistory') || '[]'),
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('State after pending:', state);
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        const city = action.payload.name.toLowerCase();
        if (!state.history.includes(city)) {
          state.history.unshift(city);
          state.history = state.history.slice(0, 5);
          localStorage.setItem('weatherHistory', JSON.stringify(state.history));
        }
        console.log('State after fulfilled:', state);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Unknown error';
        console.log('State after rejected:', state, 'Payload:', action.payload);
      });
  },
});

export default weatherSlice.reducer;