# React Performance Optimization Techniques

**Answer:**

Optimizing React applications is crucial for delivering smooth user experiences, especially as applications grow in complexity. Here are the most effective techniques for improving React performance:

## Component Rendering Optimization

### 1. React.memo for Function Components

Prevents unnecessary re-renders when props haven't changed.

```jsx
const MovieCard = React.memo(function MovieCard({ title, poster, rating }) {
  // Component only re-renders if title, poster, or rating changes
  return (
    <div className="movie-card">
      <img src={poster} alt={title} />
      <h3>{title}</h3>
      <div className="rating">{rating}/10</div>
    </div>
  );
});
```

### 2. PureComponent for Class Components

Automatic shallow prop and state comparison to prevent unnecessary re-renders.

```jsx
class MovieList extends React.PureComponent {
  render() {
    const { movies } = this.props;
    return (
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    );
  }
}
```

### 3. shouldComponentUpdate

Fine-grained control over when components should re-render.

```jsx
class CommentList extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Only re-render if comments array reference changes
    // or if the length changes (which implies data has changed)
    return (
      this.props.comments !== nextProps.comments ||
      this.props.comments.length !== nextProps.comments.length
    );
  }
  
  render() {
    return (
      <ul>
        {this.props.comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    );
  }
}
```

## Optimizing Hooks

### 1. useMemo

Memoizes expensive computations so they only run when dependencies change.

```jsx
function MovieAnalytics({ movies, selectedGenre }) {
  // This expensive calculation only runs when movies or selectedGenre changes
  const filteredAndSortedMovies = useMemo(() => {
    console.log('Computing filtered and sorted movies');
    const filtered = selectedGenre
      ? movies.filter(movie => movie.genre === selectedGenre)
      : movies;
    
    return filtered.sort((a, b) => b.rating - a.rating);
  }, [movies, selectedGenre]);
  
  return (
    <div>
      <h2>Top Rated {selectedGenre || 'All'} Movies</h2>
      <MovieList movies={filteredAndSortedMovies} />
    </div>
  );
}
```

### 2. useCallback

Prevents function recreations between renders, useful for passing callbacks to optimized child components.

```jsx
function MovieLibrary() {
  const [favorites, setFavorites] = useState([]);
  
  // This function's reference remains stable between renders
  const handleFavoriteToggle = useCallback((movieId) => {
    setFavorites(currentFavorites => {
      if (currentFavorites.includes(movieId)) {
        return currentFavorites.filter(id => id !== movieId);
      } else {
        return [...currentFavorites, movieId];
      }
    });
  }, []); // Empty dependency array means this function never recreates
  
  return (
    <div>
      {/* FavoriteButton is a memoized component that only re-renders when necessary */}
      <MovieGrid movies={movies} onFavoriteToggle={handleFavoriteToggle} favorites={favorites} />
    </div>
  );
}
```

### 3. Optimized useState

Using functional updates to avoid dependencies.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // Better: Using functional update form
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // No dependencies needed
  
  // vs
  
  // Not optimal: Creates a new function on each render and needs dependency
  const incrementBad = useCallback(() => {
    setCount(count + 1);
  }, [count]); // Dependency required, function recreated when count changes
  
  return <button onClick={increment}>Count: {count}</button>;
}
```

## List Optimization

### 1. Proper Key Usage

Using stable, unique keys for list items helps React's reconciliation.

```jsx
// Bad: Using array index as key can cause issues with reordering
{items.map((item, index) => (
  <ListItem key={index} item={item} />
))}

// Good: Using unique ID from the data
{items.map(item => (
  <ListItem key={item.id} item={item} />
))}
```

### 2. Virtualized Lists

Only render items visible in the viewport for large lists.

```jsx
import { FixedSizeList } from 'react-window';

function VirtualizedMovieList({ movies }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <MovieCard movie={movies[index]} />
    </div>
  );
  
  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={movies.length}
      itemSize={150}
    >
      {Row}
    </FixedSizeList>
  );
}
```

## Code Splitting

### 1. React.lazy and Suspense

Loads components only when needed.

```jsx
import React, { Suspense, lazy } from 'react';

// The component is loaded only when it's first rendered
const AdminDashboard = lazy(() => import('./AdminDashboard'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {user.isAdmin && <AdminDashboard />}
      </Suspense>
    </div>
  );
}
```

### 2. Route-Based Code Splitting

Loads code for routes only when navigated to.

```jsx
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./Home'));
const Movies = lazy(() => import('./Movies'));
const TvShows = lazy(() => import('./TvShows'));
const UserProfile = lazy(() => import('./UserProfile'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movies" component={Movies} />
          <Route path="/tv-shows" component={TvShows} />
          <Route path="/profile" component={UserProfile} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
```

## State Management Optimization

### 1. Context API Optimization

Split contexts to minimize re-renders.

```jsx
// Instead of one large context
const AppContext = React.createContext();

// Split into focused contexts
const UserContext = React.createContext();
const ThemeContext = React.createContext();
const NotificationContext = React.createContext();

function App() {
  // Now components only re-render when the context they subscribe to changes
  return (
    <UserContext.Provider value={userData}>
      <ThemeContext.Provider value={themeData}>
        <NotificationContext.Provider value={notificationData}>
          <MainApp />
        </NotificationContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
```

### 2. State Colocation

Keep state as close as possible to where it's used.

```jsx
// Bad: State maintained in distant ancestor
function MovieApp() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  // This state is only used by MovieDetails but kept in a parent component
  return (
    <div>
      <MovieList onSelectMovie={setSelectedMovieId} />
      <MovieDetails movieId={selectedMovieId} />
    </div>
  );
}

// Good: State kept in the component that needs it
function MovieApp() {
  return (
    <div>
      <MovieList />
      <MovieDetails />
    </div>
  );
}

function MovieList() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  
  // Pass the relevant data to MovieDetails when a selection happens
  return (
    <div>
      {/* Movie selection happens here */}
      {selectedMovieId && <MovieDetails movieId={selectedMovieId} />}
    </div>
  );
}
```

## Reducing Bundle Size

### 1. Tree Shaking

Using ES modules to eliminate unused code.

```javascript
// Bad: Import entire library
import _ from 'lodash';

// Good: Import only what you need
import map from 'lodash/map';
import debounce from 'lodash/debounce';
```

### 2. Dynamic Imports

Load features only when needed.

```javascript
function ImageEditor() {
  const [editor, setEditor] = useState(null);
  
  const loadEditor = async () => {
    // Only load the heavy image processing library when user wants to edit
    const { default: ImageEditorLib } = await import('heavy-image-editor-lib');
    setEditor(new ImageEditorLib());
  };
  
  return (
    <div>
      {!editor && <button onClick={loadEditor}>Load Image Editor</button>}
      {editor && <EditorContainer editor={editor} />}
    </div>
  );
}
```

## Rendering Optimizations

### 1. Avoid Reconciliation with Fragment

Prevent unnecessary DOM operations.

```jsx
// Bad: Wrapper div causes extra DOM node
function MovieInfo({ title, director, year }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Directed by: {director}</p>
      <p>Year: {year}</p>
    </div>
  );
}

// Good: Fragment doesn't create extra DOM nodes
function MovieInfo({ title, director, year }) {
  return (
    <>
      <h3>{title}</h3>
      <p>Directed by: {director}</p>
      <p>Year: {year}</p>
    </>
  );
}
```

### 2. Use Production Builds

Ensure you're using production builds for React to eliminate development checks and warnings.

```javascript
// In webpack.config.js
module.exports = {
  mode: 'production',
  // Other configuration...
};
```

## Measuring Performance

### 1. React DevTools Profiler

Identify expensive renders and their causes.

### 2. Why-Did-You-Render Library

Add this in development to track unnecessary re-renders.

```javascript
// In a development setup file
import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

// In a component you want to track
function MovieCard(props) {
  // Component logic
}

MovieCard.whyDidYouRender = true;
```

### 3. Performance API

Measure specific operations in your app.

```javascript
function ExpensiveComponent() {
  useEffect(() => {
    performance.mark('expensive-start');
    
    // Expensive operation
    processData();
    
    performance.mark('expensive-end');
    performance.measure('expensive-operation', 'expensive-start', 'expensive-end');
    
    const measurements = performance.getEntriesByName('expensive-operation');
    console.log('Operation took', measurements[0].duration, 'ms');
  }, []);
  
  return <div>Expensive Component</div>;
}
```

## Real-World Example: Optimized Data Table

```jsx
import React, { useState, useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';

function DataTable({ data, columns }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });
  
  // Memoized sort function
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);
  
  // Stable callback reference
  const requestSort = useCallback((key) => {
    setSortConfig(prevConfig => {
      if (prevConfig.key === key) {
        return {
          ...prevConfig,
          direction: prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
        };
      }
      return { key, direction: 'ascending' };
    });
  }, []);
  
  // Virtualized row renderer
  const Row = useCallback(({ index, style }) => {
    const rowData = sortedData[index];
    return (
      <div className="table-row" style={style}>
        {columns.map(column => (
          <div key={column.key} className="table-cell">
            {rowData[column.key]}
          </div>
        ))}
      </div>
    );
  }, [sortedData, columns]);
  
  return (
    <div className="data-table">
      <div className="table-header">
        {columns.map(column => (
          <div key={column.key} className="header-cell" onClick={() => requestSort(column.key)}>
            {column.label}
            {sortConfig.key === column.key && (
              <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
            )}
          </div>
        ))}
      </div>
      
      <FixedSizeList
        height={500}
        width="100%"
        itemCount={sortedData.length}
        itemSize={50}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}

// Usage with React.memo to prevent unnecessary re-renders
export default React.memo(DataTable);
```

Optimizing React applications is an iterative process. Start by measuring performance, focus on the most impactful issues, and use these techniques strategically rather than prematurely optimizing everything.