# Explain CSS Preprocessors

**Answer:**

CSS preprocessors are scripting languages that extend the default capabilities of CSS. They enable more maintainable stylesheets by adding features like variables, nesting, mixins, and functions. Preprocessors compile into standard CSS that browsers can understand.

## Major CSS Preprocessors

### 1. Sass/SCSS

Sass (Syntactically Awesome Style Sheets) is the most mature and widely used CSS preprocessor. It offers two syntaxes: the original indentation-based Sass and the more CSS-like SCSS (Sassy CSS).

```scss
// SCSS example
$primary-color: #3498db;
$padding: 15px;

@mixin button-style($bg-color) {
  background-color: $bg-color;
  border-radius: 3px;
  padding: $padding;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
}

.button {
  @include button-style($primary-color);
  
  &.large {
    font-size: 18px;
    padding: $padding * 1.5;
  }
  
  .icon {
    margin-right: 8px;
  }
}
```

### 2. Less

Less (Leaner Style Sheets) has a syntax very similar to CSS, making it easyClaude can make mistakes. Please double-check responses. const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array = only run on mount and unmount
  
  return (
    <div>Window size: {windowSize.width}px × {windowSize.height}px</div>
  );
}
```

### Preventing Unnecessary Updates

```jsx
// Using React.memo to prevent unnecessary re-renders
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // Only re-renders if data changes
  return <div>{/* Complex rendering */}</div>;
});

// Using useMemo for expensive calculations
function Calculator({ numbers }) {
  // Only recalculates when numbers array changes
  const sum = useMemo(() => {
    console.log('Calculating sum...');
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]);
  
  return <div>Sum: {sum}</div>;
}
```

Understanding the component lifecycle is crucial for building performant and bug-free React applications, whether using class components or the more modern hooks approach.