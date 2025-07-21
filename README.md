# Instagram Stories

A mobile-first Instagram Stories feature built with React, TypeScript, and Tailwind CSS. This application replicates the core functionality of Instagram Stories.

## 🚀 Live Demo

https://chic-cobbler-ea45b2.netlify.app/

## ✨ Features

### Core Functionality
- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Story Navigation**: Tap left/right to navigate between stories
- **Auto-Advance**: Stories automatically progress after 5 seconds
- **User Stories**: Each user can have multiple stories
- **Watched State**: Tracks which users' stories have been fully viewed
- **Error Handling**: Handling of image load failures

### User Experience
- **Story Bar**: Horizontal scrollable list of user stories
- **Lazy Loading**: Efficiently loads users as you scroll (5 at a time)
- **Context Menu Prevention**: Disabled right-click context menu

### Data Management
- **Type Safety**: Full TypeScript implementation
- **Mock Data**: 15 users with realistic story data

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Build Tool**: Create React App
- **Language**: TypeScript for type safety
- **Icons**: Custom SVG and text-based logos
- **Images**: Unsplash for high-quality placeholder images

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd insta-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Use browser dev tools to simulate mobile view

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

## 🎨 Design Choices

### 1. **Mobile-First Architecture**
- **Rationale**: Instagram Stories is primarily a mobile feature
- **Implementation**: Uses Tailwind's responsive classes with `md:hidden` for desktop
- **Benefit**: Ensures optimal performance and UX on target devices

### 2. **Component Structure**
```
src/
├── components/
│   ├── StoryBar.tsx      # Horizontal story list
│   └── StoryViewer.tsx   # Full-screen story viewer
├── types/
│   └── users.ts        # Shared TypeScript types
├── assets/data/
│   └── userData.json      # Mock story data
└── App.tsx              # Main application logic
```

### 3. **State Management**
- **Local State**: Uses React's `useState` for component-level state
- **No External Libraries**: Avoids Redux/Context for simplicity

### 4. **Performance Optimizations**

#### **Lazy Loading**
- **Story Bar**: Loads 5 users initially, loads 5 more on scroll
- **Images**: Uses `onLoad` and `onError` handlers for proper loading states

#### **Rendering Optimization**
- **Conditional Rendering**: Only renders visible stories
- **Memoization**: Uses `useRef` for values that don't need re-renders

### 5. **User Experience Design**

#### **Navigation**
- **Tap Navigation**: Left/right taps for story navigation (Instagram-like)
- **Auto-Advance**: Automatic story progression with 5 second duration

#### **Visual Feedback**
- **Loading States**: Spinner while images load
- **Error States**: Shwoing message for failed images
- **Watched Indicators**: Gray borders for completed stories

#### **Accessibility**
- **Color Contrast**: High contrast text and UI elements


## 🔧 Scalability Considerations

### **Performance at Scale**
- **Virtual Scrolling**: Can implement for large user lists
- **Image Optimization**: Ready for CDN integration
- **Code Splitting**: Can split components for better loading


## 📱 Browser Support

- **Mobile**: iOS Safari 12+, Chrome Mobile 70+
- **Desktop**: Chrome 80+, Firefox 75+, Safari 13+
- **Features**: ES6+, CSS Grid, Flexbox

