# React Native Movie App - Challenge Submission

**Developer:** Paolo Barcellos  
**Challenge:** React Native Developer Challenge - Buildbox IT Solutions

## 🎬 Project Overview

This is a React Native movie application that consumes the OMDb API to display movies in a card-based interface with detailed information screens. The app demonstrates best practices in React Native development including TypeScript, navigation, API integration, and responsive UI design.

## ✨ Features

- **Movie Search**: Search for movies using the OMDb API
- **Card-Based Display**: Beautiful grid layout showing movie posters, titles, and years
- **Detailed Information**: Tap any movie to see full details including plot, cast, director, ratings
- **Navigation**: Smooth navigation between list and detail screens
- **Web Support**: Additional web version for easy testing and demonstration
- **Error Handling**: Graceful fallback with mock data when API is unavailable
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works on various screen sizes

## 🛠️ Technology Stack

- **React Native 0.81.1** with TypeScript
- **React Navigation** for screen navigation
- **Axios** for HTTP requests
- **OMDb API** for movie data
- **React Native Web** for web platform support
- **Metro Bundler** for development
- **Webpack** for web builds

## 📱 Screenshots & Demo

### Movie List View
- Grid display of movies with posters
- Search functionality
- Loading states

### Movie Detail View
- Full movie information including cast, director, plot
- High-quality poster images
- IMDb ratings and technical details

### Web Version
The app runs perfectly in web browsers at `http://localhost:3001` for easy testing.

## 🚀 Installation & Setup

### Prerequisites
- Node.js (≥ 20)
- React Native development environment
- Android Studio or Xcode for mobile testing

### Quick Start
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run web version (lightweight alternative)
npm run web
```

## 🎯 Challenge Requirements Completed

✅ **REST API Integration**: Integrated with OMDb API for movie data  
✅ **Card-Based Display**: Movies displayed in responsive card grid  
✅ **Images & Descriptions**: Movie posters and detailed information  
✅ **Navigation**: Tap cards to navigate to detail screens  
✅ **Best Practices**: TypeScript, clean architecture, error handling  
✅ **Professional UI**: Modern, appealing interface design  

## 🏗️ Architecture

### File Structure
```
src/
├── components/          # Reusable UI components
│   ├── MovieCard.tsx   # Individual movie card component
│   └── LoadingSpinner.tsx
├── screens/            # Screen components
│   ├── MovieListScreen.tsx
│   └── MovieDetailScreen.tsx
├── services/           # API and business logic
│   └── movieService.ts # OMDb API integration
├── types/              # TypeScript type definitions
│   └── movie.ts
└── navigation/         # Navigation configuration
    └── AppNavigator.tsx
```

### Key Components

**MovieService**: Handles all API communications with OMDb, including search and detail fetching with proper error handling.

**MovieCard**: Reusable component for displaying movie information in a card format with hover effects and proper image handling.

**Navigation**: Stack-based navigation using React Navigation for smooth transitions between list and detail views.

**Type Safety**: Comprehensive TypeScript interfaces for all movie data structures ensuring type safety throughout the app.

## 🌐 Web Version

For easier testing and demonstration, I've included a web version that runs alongside the mobile app:

- Access at `http://localhost:3001`
- Same functionality as mobile version
- Perfect for quick testing and showcasing
- Uses React DOM instead of React Native for web compatibility

## 🎨 Design Considerations

- **Responsive Grid**: Adapts to different screen sizes
- **Loading States**: Smooth loading animations
- **Error Handling**: Graceful degradation with fallback content
- **Performance**: Optimized image loading and caching
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🧪 Testing

The app includes comprehensive error handling and fallback mechanisms:

- Mock data available when API is unavailable
- Network error handling
- Loading state management
- Cross-platform compatibility testing

## 📋 API Integration Details

**OMDb API Endpoints Used:**
- Search: `http://www.omdbapi.com/?apikey={key}&s={query}&type=movie`
- Details: `http://www.omdbapi.com/?apikey={key}&i={imdbID}&plot=full`

**Features:**
- Search by movie title
- Filter for movies only
- Detailed plot information
- High-quality poster images
- Comprehensive movie metadata

## 🔧 Development Process

This project was developed following React Native best practices:

1. **Setup**: Created React Native project with TypeScript
2. **Navigation**: Implemented React Navigation for routing
3. **API Integration**: Connected to OMDb API with proper error handling
4. **UI/UX**: Designed responsive, professional interface
5. **Testing**: Created web version for easy demonstration
6. **Optimization**: Implemented performance optimizations and error boundaries

## 🚀 Future Enhancements

Potential improvements for production:
- Offline caching with AsyncStorage
- User favorites functionality
- Advanced filtering and sorting options
- Pagination for large result sets
- Unit and integration tests
- Performance monitoring
- Internationalization support

## 📞 Contact

This project was created as part of the React Native Developer Challenge for Buildbox IT Solutions, demonstrating comprehensive React Native development skills including API integration, navigation, TypeScript implementation, and modern UI design patterns.

---

**Note**: This submission includes both the standard React Native mobile app and an additional web version for easy testing and demonstration purposes.