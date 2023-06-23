# 반응형 이미지 인터뷰 답변

반응형 이미지는 다양한 화면 크기와 해상도에 맞게 최적화된 이미지를 제공하는 기술입니다. 이는 사용자 경험 향상과 페이지 성능 최적화에 중요한 역할을 합니다.

가장 기본적인 방법은 CSS의 max-width 속성을 사용하는 것입니다. `img { max-width: 100%; height: auto; }`를 적용하면 이미지가 컨테이너보다 커지지 않으면서 비율을 유지합니다. 그러나 이 방법은 큰 이미지를 작은 화면에서도 다운로드하게 되어 성능 측면에서는 최적이 아닙니다.

더 효율적인 방법으로 HTML의 srcset과 sizes 속성을 사용할 수 있습니다. srcset은 다양한 해상도의 이미지 목록을 제공하고, sizes는 각 미디어 조건에 맞는 이미지 크기를 지정합니다. 브라우저는 이 정보를 바탕으로 현재 디스플레이 조건에 가장 적합한 이미지를 선택합니다.

```html
<img src="small.jpg"
     srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 1500w"
     sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
     alt="반응형 이미지 예시">
```

더 복잡한 반응형 요구사항에는 `<picture>` 요소와 `<source>` 요소를 사용할 수 있습니다. 이 방법은 다양한 미디어 쿼리 조건에 따라 완전히 다른 이미지를 제공하거나, WebP와 같은 현대적 포맷과 폴백 이미지를 함께 제공할 때 유용합니다.

```html
<picture>
  <source media="(max-width: 600px)" srcset="mobile.jpg">
  <source media="(max-width: 1200px)" srcset="tablet.jpg">
  <source type="image/webp" srcset="image.webp">
  <img src="fallback.jpg" alt="설명">
</picture>
```

백그라운드 이미지의 경우, CSS 미디어 쿼리를 통해 다양한 화면 크기에 맞는 이미지를 제공할 수 있습니다. 최신 브라우저에서는 image-set() 함수를 사용하여 해상도에 따른 배경 이미지를 지정할 수도 있습니다.

이미지 성능을 더욱 향상시키기 위해, 지연 로딩(lazy loading)을 적용하는 것이 좋습니다. 현대 브라우저는 `loading="lazy"` 속성을 지원하며, 이를 통해 뷰포트 밖에 있는 이미지의 로딩을 지연시킬 수 있습니다. 또한 CDN과 캐싱 전략을 활용하여 이미지 전송 속도를 높이는 것도 중요합니다.