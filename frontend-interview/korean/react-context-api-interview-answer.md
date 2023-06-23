# React Context API 인터뷰 답변

React Context API는 컴포넌트 트리를 통해 데이터를 명시적인 props 전달 없이 공유할 수 있게 해주는 기능입니다. 이는 전역 상태나 테마, 언어 설정, 사용자 인증 정보와 같이 여러 컴포넌트에서 필요한 데이터를 관리하는 데 유용합니다.

Context API는 세 가지 주요 부분으로 구성됩니다. 먼저 React.createContext()로 Context 객체를 생성합니다. 이 함수는 Provider와 Consumer 컴포넌트를 포함하는 객체를 반환하며, 기본값을 설정할 수 있습니다. Provider 컴포넌트는 데이터를 제공하는 역할을 하며, value prop을 통해 공유할 데이터를 지정합니다. Consumer는 기존 방식이며, 현대적인 접근법은 useContext 훅을 사용하는 것입니다.

```javascript
const ThemeContext = React.createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MainContent />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{ background: theme === 'dark' ? '#333' : '#fff' }}
    >
      테마 전환
    </button>
  );
}
```

Context API는 단순한 전역 상태 관리에 적합하지만, 몇 가지 고려사항이 있습니다. Context 값이 변경되면 해당 Context를 사용하는 모든 컴포넌트가 리렌더링될 수 있으므로, 성능 최적화가 필요합니다. 이를 위해 여러 개의 작은 Context로 나누거나, React.memo와 함께 사용하여 불필요한 리렌더링을 방지할 수 있습니다.

복잡한 상태 로직이나 자주 업데이트되는 상태의 경우, Context API만으로는 충분하지 않을 수 있습니다. 이런 경우 Context와 useReducer를 함께 사용하거나, Redux, Zustand와 같은 전용 상태 관리 라이브러리를 고려하는 것이 좋습니다.

실무에서는 인증, 테마, 다국어 지원과 같은 애플리케이션 수준의 설정에 Context API를 주로 사용하고, 복잡하거나 성능이 중요한 데이터 상태 관리에는 다른 솔루션을 조합하는 접근법이 효과적입니다.