# SVG, Canvas, WebGL 비교 인터뷰 답변

SVG, Canvas, WebGL은 웹에서 그래픽을 구현하는 세 가지 주요 기술로, 각각 다른 특성과 사용 사례를 가지고 있습니다.

SVG(Scalable Vector Graphics)는 XML 기반의 벡터 그래픽 형식으로, DOM의 일부로 처리됩니다. 벡터 기반이므로 크기를 조절해도 품질 저하 없이 선명하게 표시되며, 개별 요소에 이벤트 핸들러를 연결할 수 있습니다. CSS로 스타일을 지정하고 JavaScript로 조작할 수 있어 접근성과 SEO 측면에서도 유리합니다. SVG는 로고, 아이콘, 인포그래픽, 데이터 시각화와 같이 정교한 벡터 그래픽이 필요한 경우에 적합합니다.

```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```

Canvas는 HTML5 요소로, JavaScript를 사용하여 픽셀 단위로 그래픽을 그리는 2D 그리기 API를 제공합니다. 비트맵 기반이므로 한 번 그려진 픽셀은 개별적으로 접근할 수 없으며, 변경을 위해서는 전체를 다시 그려야 합니다. 이벤트 처리도 직접 픽셀 위치를 계산해야 합니다. Canvas는 많은 객체를 다루는 복잡한 애니메이션, 사진 조작, 비디오 처리, 게임과 같이 성능이 중요한 경우에 적합합니다.

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 50, 50);
```

WebGL은 Canvas 요소를 사용하지만, GPU 가속을 활용하는 저수준 3D 그래픽 API를 제공합니다. OpenGL ES를 기반으로 하며, 셰이더를 통해 높은 수준의 그래픽 제어가 가능합니다. 가장 높은 성능을 제공하지만, 학습 곡선이 가파르고 복잡한 코드가 필요합니다. WebGL은 3D 모델링, 게임, VR/AR 경험, 고성능 데이터 시각화와 같은 고급 그래픽 처리에 적합합니다.

```javascript
const canvas = document.getElementById('webgl-canvas');
const gl = canvas.getContext('webgl');
// 셰이더 설정, 버퍼 생성 등 복잡한 초기화 과정 필요
```

실무에서 기술 선택 시 고려할 사항으로는, 작은 수의 대화형 요소라면 SVG가 적합하고, 많은 객체를 다루는 애니메이션이나 게임은 Canvas가 더 효율적입니다. 고급 3D 그래픽이나 최대 성능이 필요하면 WebGL을 선택합니다. 종종 Three.js나 D3.js와 같은 라이브러리를 활용하여 개발 복잡성을 줄이기도 합니다.

최근에는 이러한 기술들을 함께 사용하는 하이브리드 접근법도 증가하고 있습니다. 예를 들어, UI 요소는 SVG로, 복잡한 애니메이션은 Canvas로 구현하는 방식입니다.