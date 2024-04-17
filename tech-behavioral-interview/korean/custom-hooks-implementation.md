# 개발한 유용한 React 커스텀 훅에 대해 설명해주세요

대규모 React 애플리케이션에서 코드 재사용성과 관심사 분리를 개선하기 위해 여러 커스텀 훅을 설계하고 구현했습니다. 그중 특히 유용했던 세 가지 훅에 대해 말씀드리겠습니다.

첫째, API 요청을 효율적으로 관리하기 위한 `useApi` 훅을 개발했습니다. 이 훅은 로딩 상태, 오류 처리, 자동 재시도, 응답 캐싱 기능을 포함하고 있습니다. API 호출의 복잡성을 추상화하여 컴포넌트 코드를 깔끔하게 유지할 수 있었습니다.

```jsx
// useApi 훅 구현 예시
function useApi(apiFunction, initialArgs = null, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(initialArgs !== null);
  const [error, setError] = useState(null);
  const [args, setArgs] = useState(initialArgs);
  
  const { cacheDuration = 0, retries = 0, retryDelay = 1000 } = options;
  const cache = useRef({});
  
  const execute = useCallback(async (executeArgs = null) => {
    const callArgs = executeArgs !== null ? executeArgs : args;
    if (!callArgs) return;
    
    const cacheKey = JSON.stringify(callArgs);
    const cachedItem = cache.current[cacheKey];
    
    if (cachedItem && Date.now() - cachedItem.timestamp < cacheDuration) {
      setData(cachedItem.data);
      return cachedItem.data;
    }
    
    setLoading(true);
    setError(null);
    
    let attempts = 0;
    let result;
    
    while (attempts <= retries) {
      try {
        result = await apiFunction(callArgs);
        break;
      } catch (err) {
        if (attempts === retries) {
          setError(err);
          setLoading(false);
          return;
        }
        await new Promise(r => setTimeout(r, retryDelay * (2 ** attempts)));
        attempts++;
      }
    }
    
    setData(result);
    setLoading(false);
    
    if (cacheDuration > 0) {
      cache.current[cacheKey] = {
        data: result,
        timestamp: Date.now()
      };
    }
    
    return result;
  }, [apiFunction, args, cacheDuration, retries, retryDelay]);
  
  useEffect(() => {
    if (args !== null) {
      execute(args);
    }
  }, [args, execute]);
  
  return { data, loading, error, execute, setArgs };
}

// 사용 예시
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(
    fetchUser,
    { id: userId },
    { cacheDuration: 60000, retries: 2 }
  );
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return null;
  
  return <ProfileCard user={user} />;
}
```

둘째, 폼 상태 관리를 단순화하는 `useForm` 훅을 구현했습니다. 이 훅은 필드 값 관리, 유효성 검증, 오류 처리, 폼 제출 로직을 포함하고 있으며, 다양한 폼 컴포넌트에서 재사용할 수 있도록 설계했습니다.

```jsx
function useForm({ initialValues, validationSchema, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validate = useCallback((fieldValues = values) => {
    if (!validationSchema) return {};
    
    try {
      validationSchema.validateSync(fieldValues, { abortEarly: false });
      return {};
    } catch (error) {
      const errors = {};
      error.inner.forEach(err => {
        errors[err.path] = err.message;
      });
      return errors;
    }
  }, [validationSchema, values]);
  
  const handleChange = useCallback(event => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleBlur = useCallback(event => {
    const { name } = event.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const fieldErrors = validate({ ...values, [name]: values[name] });
    setErrors(prev => ({ ...prev, ...fieldErrors }));
  }, [validate, values]);
  
  const handleSubmit = useCallback(async event => {
    if (event) event.preventDefault();
    
    const fieldErrors = validate();
    setErrors(fieldErrors);
    
    if (Object.keys(fieldErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [validate, onSubmit, values]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues
  };
}
```

셋째, 무한 스크롤 기능을 쉽게 구현할 수 있는 `useInfiniteScroll` 훅을 개발했습니다. 이 훅은 스크롤 위치 감지, 추가 데이터 로드, 로딩 상태 관리 등을 처리합니다. 특히 대량의 데이터를 표시하는 페이지에서 UX를 개선하는 데 크게 기여했습니다.

```jsx
function useInfiniteScroll(fetchCallback, options = {}) {
  const {
    threshold = 200,
    initialPage = 1,
    initialData = [],
    pageSize = 10
  } = options;
  
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  
  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    }, { rootMargin: `0px 0px ${threshold}px 0px` });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, threshold]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMore || loading) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const newItems = await fetchCallback(page, pageSize);
        
        setData(prevData => [...prevData, ...newItems]);
        setHasMore(newItems.length === pageSize);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [fetchCallback, page, pageSize, hasMore, loading]);
  
  return { data, loading, error, hasMore, lastElementRef };
}

// 사용 예시
function ProductList() {
  const fetchProducts = useCallback(async (page, pageSize) => {
    const response = await api.get(`/products?page=${page}&limit=${pageSize}`);
    return response.data;
  }, []);
  
  const { data: products, loading, error, lastElementRef } = useInfiniteScroll(fetchProducts, {
    pageSize: 12,
    initialData: []
  });
  
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          ref={index === products.length - 1 ? lastElementRef : null}
        />
      ))}
      {loading && <Loading />}
      {error && <ErrorMessage />}
    </div>
  );
}
```

이러한 커스텀 훅을 개발하고 적용한 결과, 코드베이스 전반의 일관성과 유지보수성이 크게 향상되었습니다. 중복 코드가 감소했고, 핵심 비즈니스 로직에 더 집중할 수 있게 되었습니다. 특히 새로운 팀원들의 온보딩 시간이 단축되었으며, 버그 발생률도 감소했습니다. 이 경험을 통해 잘 설계된 훅이 React 애플리케이션의 코드 품질과 개발자 경험을 크게 향상시킬 수 있다는 것을 배웠습니다.