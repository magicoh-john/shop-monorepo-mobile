# Jeton 스타일 Hero 섹션 패턴

> **작성일**: 2026-02-14
> **적용 프로젝트**: association-web
> **참고 사이트**: https://www.jeton.com/

---

## 🎯 개요

Jeton.com 스타일의 화려하고 몰입감 있는 Hero 섹션 디자인 패턴입니다. 다크 배경, 애니메이션 파티클, 큰 그라디언트 구체, 3D 그리드 등을 조합하여 현대적이고 역동적인 첫 화면을 구현합니다.

**핵심 특징:**
- ✨ 화면 전체를 가득 채우는 몰입형 디자인
- 🎨 다크 그라디언트 배경 (블루 → 퍼플)
- 🌟 Canvas 기반 Floating Particles
- 🔮 3개의 큰 Gradient Orbs (천천히 떠다니는 애니메이션)
- 📐 3D Perspective Grid Pattern
- 🖱️ Mouse Parallax Effect
- 🚀 화려한 CTA 버튼

---

## 📐 구조

```
Hero Section (100vh)
├── Canvas Background (Floating Particles)
├── Gradient Orbs Layer (3개)
├── 3D Grid Pattern
└── Content Layer
    ├── Title (화이트 그라디언트)
    ├── Subtitle (3색 그라디언트 + Shimmer)
    ├── Description
    ├── Stats Cards (3개)
    ├── CTA Buttons (2개)
    ├── Feature Pills (4개)
    └── Scroll Indicator
```

---

## 🎨 핵심 요소

### 1. Dark Gradient Background

```tsx
<section
  style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0A1929 0%, #1A237E 50%, #4A148C 100%)',
  }}
>
```

**컬러 팔레트:**
- `#0A1929` - 다크 블루 (시작)
- `#1A237E` - 미드 블루
- `#4A148C` - 다크 퍼플 (끝)

**효과:**
- 깊이감 있는 다크 배경
- 고급스러운 느낌
- 텍스트 가독성 확보 (화이트 텍스트)

---

### 2. Floating Particles (Canvas Animation)

**구현 방법:**

```tsx
useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  // Canvas 크기 설정
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 파티클 생성
  const particles = [];
  const particleCount = 30;
  const symbols = ['🤖', '🧠', '💡', '⚡', '🎯', '📊', '🔬', '💻'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 30 + 20,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    });
  }

  // 애니메이션 루프
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      // 위치 업데이트
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // 화면 밖으로 나가면 반대편에서 다시 등장
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;

      // 파티클 그리기
      ctx.globalAlpha = particle.opacity;
      ctx.font = `${particle.size}px Arial`;
      ctx.fillText(particle.symbol, particle.x, particle.y);
    });

    requestAnimationFrame(animate);
  }

  animate();
}, []);
```

**파티클 설정:**
- 개수: 30개
- 크기: 20~50px (랜덤)
- 속도: -0.25 ~ 0.25 (매우 느림)
- 투명도: 0.1 ~ 0.4
- 심볼: AI 관련 이모지 8종

**최적화:**
- `requestAnimationFrame` 사용
- Canvas opacity: 0.6 (너무 튀지 않게)
- Resize 시 캔버스 크기 재조정

---

### 3. Gradient Orbs (큰 그라디언트 구체)

**3개의 Orbs:**

```tsx
{/* Blue Orb */}
<div
  style={{
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, #1976D2, transparent)',
    top: '10%',
    left: '10%',
    animation: 'float 25s ease-in-out infinite',
    opacity: 0.2,
    filter: 'blur(80px)',
  }}
/>

{/* Purple Orb */}
<div
  style={{
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, #7B1FA2, transparent)',
    top: '40%',
    right: '15%',
    animation: 'float 20s ease-in-out infinite reverse',
    opacity: 0.2,
    filter: 'blur(80px)',
  }}
/>

{/* Orange Orb */}
<div
  style={{
    width: '450px',
    height: '450px',
    background: 'radial-gradient(circle, #FF9800, transparent)',
    bottom: '15%',
    left: '20%',
    animation: 'float 30s ease-in-out infinite',
    opacity: 0.2,
    filter: 'blur(80px)',
  }}
/>
```

**CSS Float Animation:**

```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(1deg); }
  66% { transform: translateY(8px) rotate(-1deg); }
}
```

**설정:**
- 크기: 450~600px (큰 사이즈)
- Blur: 80px (`blur-3xl` in Tailwind)
- Opacity: 0.2 (subtle)
- Animation: 20~30초 (매우 느림)
- 각 Orb마다 다른 속도와 방향

---

### 4. Mouse Parallax Effect

**구현:**

```tsx
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);

// Orb에 적용
<div
  style={{
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
    transition: 'transform 0.3s ease-out',
  }}
/>
```

**효과:**
- 마우스 위치에 따라 Orbs가 미묘하게 움직임
- 정규화: -0.5 ~ 0.5 → -10 ~ 10px
- 부드러운 전환: 0.3s ease-out
- 각 Orb마다 다른 강도 적용 가능 (x0.5, x1, x1.5)

---

### 5. 3D Grid Pattern

**구현:**

```tsx
<div
  style={{
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    transform: `perspective(500px) rotateX(60deg) scale(2) translateY(${scrollY * 0.2}px)`,
    transformOrigin: 'center top',
  }}
/>
```

**설정:**
- 그리드 크기: 50px × 50px
- Perspective: 500px
- Rotate X: 60deg (바닥을 내려다보는 느낌)
- Scale: 2 (확대)
- Scroll Parallax: `scrollY * 0.2` (스크롤 시 움직임)

---

### 6. Typography (타이포그래피)

**메인 타이틀:**

```tsx
<h1
  style={{
    fontSize: 'clamp(48px, 8vw, 96px)',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #E3F2FD 50%, #FFFFFF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 60px rgba(255,255,255,0.3)',
  }}
>
  AI 교육의 미래
</h1>
```

**서브 타이틀 (Shimmer 효과):**

```tsx
<h2
  style={{
    fontSize: 'clamp(32px, 5vw, 64px)',
    background: 'linear-gradient(135deg, #42A5F5 0%, #7B1FA2 50%, #FF9800 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
    animation: 'shimmer 4s ease infinite',
  }}
>
  함께 만들어갑니다
</h2>
```

**Shimmer Animation:**

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

### 7. Stats Cards

**레이아웃:**

```tsx
<div className="flex flex-wrap justify-center gap-8">
  {[
    { number: '100+', label: '전문 강사' },
    { number: '50+', label: '교육 파견' },
    { number: '95%', label: '만족도' },
  ].map((stat) => (
    <div
      className="text-center px-6 py-4 rounded-2xl backdrop-blur-md"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #42A5F5, #FF9800)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {stat.number}
      </div>
      <div>{stat.label}</div>
    </div>
  ))}
</div>
```

**스타일:**
- Glassmorphism (backdrop-blur-md)
- 반투명 배경 + 테두리
- 숫자는 그라디언트 텍스트

---

### 8. CTA Buttons

**Primary Button (Gradient + Hover Effect):**

```tsx
<button className="group px-12 py-5 bg-gradient-to-r from-[#1976D2] via-[#7B1FA2] to-[#FF9800] text-white text-lg font-bold rounded-full transition-all duration-500 hover:shadow-2xl hover:scale-110 relative overflow-hidden">
  <span className="relative z-10 flex items-center gap-3">
    여정 시작하기
    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
      →
    </span>
  </span>
  {/* Hover 시 반전 그라디언트 */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9800] via-[#7B1FA2] to-[#1976D2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</button>
```

**Secondary Button (Glassmorphism):**

```tsx
<button
  style={{
    background: 'rgba(255, 255, 255, 0.15)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  }}
  className="px-12 py-5 text-white text-lg font-bold rounded-full backdrop-blur-md hover:scale-105"
>
  더 알아보기
</button>
```

---

### 9. Feature Pills

**구현:**

```tsx
{['AI 강사 매칭', '검증된 전문가', '체계적 인증', '지속적 성장'].map((feature) => (
  <span
    className="px-6 py-2 rounded-full text-sm text-white backdrop-blur-md"
    style={{
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }}
  >
    {feature}
  </span>
))}
```

---

## 🔧 애니메이션 타이밍

| 요소 | 애니메이션 | Delay | Duration |
|------|-----------|-------|----------|
| Title | fade-in | 0s | 0.6s |
| Subtitle | slide-up + shimmer | 0.2s | 0.7s + 4s |
| Description | slide-up | 0.4s | 0.7s |
| Stats Cards | fade-in | 0.6s | 0.6s |
| CTA Buttons | scale-in | 0.8s | 0.3s |
| Feature Pills | fade-in | 1s | 0.6s |
| Gradient Orbs | float | - | 20~30s |
| Particles | continuous | - | 60fps |

---

## 🎯 재사용 가이드

### 다른 프로젝트에 적용 시:

**1. 컬러 변경:**
```tsx
// 배경 그라디언트
background: 'linear-gradient(135deg, [색상1] 0%, [색상2] 50%, [색상3] 100%)'

// Orbs 색상
radial-gradient(circle, [브랜드색상], transparent)
```

**2. 파티클 심볼 변경:**
```tsx
// 금융: ['💰', '💳', '📈', '💵', '🏦', '💎', '📊', '💹']
// 교육: ['📚', '🎓', '✏️', '📖', '🧑‍🎓', '🏫', '📝', '🎯']
// 헬스케어: ['🏥', '💊', '❤️', '🩺', '⚕️', '🧬', '💉', '🔬']
// 테크: ['💻', '🚀', '⚡', '🔧', '🤖', '📱', '🌐', '⚙️']
```

**3. 통계/Feature 커스터마이징:**
```tsx
// 프로젝트에 맞는 통계로 변경
const stats = [
  { number: 'YOUR_NUMBER', label: 'YOUR_LABEL' },
];

const features = ['Feature1', 'Feature2', 'Feature3', 'Feature4'];
```

**4. CTA 텍스트 변경:**
```tsx
// 프로젝트 목적에 맞게
"여정 시작하기" → "시작하기" / "무료 체험" / "지금 시작"
"더 알아보기" → "자세히 보기" / "문의하기" / "데모 보기"
```

---

## ⚡ 성능 최적화

**Canvas 최적화:**
- `requestAnimationFrame` 사용
- 파티클 개수 조절 (모바일: 15개, 데스크톱: 30개)
- Canvas opacity로 CPU 부하 감소

**Orbs 최적화:**
- CSS transform (GPU 가속)
- will-change 속성 사용 (필요시)
- Blur 강도 조절

**이벤트 리스너:**
- Resize, MouseMove → Debounce/Throttle 적용 가능
- Cleanup 함수로 메모리 누수 방지

---

## 📱 반응형 고려사항

**모바일:**
- Orbs 크기 축소 (400px → 250px)
- 파티클 개수 감소 (30개 → 15개)
- Grid pattern scale 조정
- 타이틀 폰트 크기: `clamp()` 사용

**타블렛:**
- Orbs 크기 중간값 (500px → 350px)
- 파티클 20개

---

## 🎨 Figma/디자인 가이드

**컬러 시스템:**
- Primary: #1976D2 (Blue)
- Secondary: #7B1FA2 (Purple)
- Accent: #FF9800 (Orange)
- Background Dark: #0A1929 → #4A148C

**간격:**
- Container padding: 1.5rem (6 in Tailwind)
- 요소 간 gap: 2rem (8)
- CTA buttons gap: 1.5rem (6)

**폰트 크기:**
- Hero Title: 48~96px (responsive)
- Subtitle: 32~64px
- Description: 18~28px
- Stats: 24px (number), 14px (label)
- CTA: 18px

---

## 📄 관련 파일

**구현 파일:**
- `apps/association-web/components/sections/Hero.tsx`

**CSS:**
- `apps/association-web/app/globals.css` (애니메이션 정의)

**참고 문서:**
- [REFERENCE_WEBSITES.md](./REFERENCE_WEBSITES.md) - Jeton.com 분석

---

## ✅ 체크리스트

Hero 섹션 구현 시 확인:

- [ ] Canvas 애니메이션 정상 작동
- [ ] Gradient Orbs 3개 모두 표시
- [ ] Mouse Parallax 작동
- [ ] 3D Grid Pattern 표시
- [ ] 모든 텍스트 가독성 확보
- [ ] CTA 버튼 hover 효과 작동
- [ ] 모바일 반응형 확인
- [ ] 성능 테스트 (60fps 유지)
- [ ] Scroll Indicator 애니메이션
- [ ] Cleanup 함수로 메모리 누수 방지

---

## 🚀 결과물

**적용 프로젝트:** 인공지능강사협회 웹사이트
**URL:** http://localhost:3001 (개발 환경)

**피드백:**
- ✅ "메인 화면은 아주 훌륭하다"
- ✅ 화면 가득 채운 멋진 애니메이션
- ✅ Jeton.com 스타일 완벽 재현

---

**작성자:** Claude Opus 4.6
**최종 수정:** 2026-02-14
