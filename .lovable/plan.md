
# 김진수(May) GEO마케팅 전문가 포트폴리오 웹페이지

## 디자인 컨셉
**Authority(권위형)** — 네이비(#1B2A4A) + 골드(#C9A84C) + 화이트 컬러 시스템. Noto Serif KR(제목), Pretendard(본문), Montserrat(숫자) 폰트 조합. 모바일 퍼스트 반응형 원페이지.

## 구현 섹션 (총 9개 + Footer)

### 1. Hero 섹션
- 네이비 그래디언트 풀스크린 배경, 업로드된 프로필 사진(원형 + 골드 보더)
- 이름, 타이틀, 슬로건 표시
- CTA 버튼 2개: [강의 문의하기] 골드 / [포트폴리오 보기] Ghost
- Google & Gemini Certified Educator 뱃지
- 스크롤 다운 인디케이터

### 2. GEO마케팅 전문가 섹션 (핵심 차별화)
- 5개 전문 분야 카드 (GEO전략, AI교육, 콘텐츠, 업무자동화, AI아트)
- 3+2 그리드, 호버 시 상승 효과

### 3. About 섹션
- 2컬럼: 소개 스토리 + 키워드 태그 클라우드
- 교육 철학과 배경 소개

### 4. Achievements 섹션
- 네이비 배경, 6개 숫자 카운터 애니메이션 (IntersectionObserver)
- 저서 25+, 출강기관 50+, 수상 5, 전시 6, 자격 20+, 유튜브

### 5. Publications 섹션
- 카테고리별 책 카드 그리드 (GEO마케팅/AI활용/AI아트/기타)
- CSS 그래디언트 배경 카드 + "더보기" 토글

### 6. Career & Credentials 섹션
- 탭 UI 3개: 현재 활동(타임라인) / 주요 출강 / 자격·인증(뱃지 그리드)
- 탭 전환 fade 애니메이션

### 7. Awards & Exhibitions 섹션
- 수상, 심사, 전시 이력을 카드/타임라인으로 표시

### 8. Media 섹션
- 유튜브 메이TV 채널 카드 + 링크

### 9. Contact / CTA 섹션
- 네이비 그래디언트 배경
- CTA 3개: 강의 문의 / 컨설팅 상담 / 협업 제안
- 이메일, 전화, 주소 표시

### 10. Footer + 모바일 하단 FAB
- 저작권, SNS 링크, 앵커 네비게이션
- 모바일 하단 고정 전화걸기 FAB 버튼

## 공통 인터랙션
- Sticky 네비게이션 + Scroll Spy (현재 섹션 하이라이트)
- 모바일 햄버거 메뉴 + 슬라이드 인
- 스무스 스크롤, 섹션 진입 fade-in + slide-up 애니메이션
- 카드 호버 효과, CTA 호버 효과

## 구현 순서
1단계: 디자인 시스템 설정 (색상, 폰트, CSS 변수) + Hero 섹션
2단계: GEO전문가 + About + Achievements 섹션
3단계: Publications + Career/Credentials 섹션
4단계: Awards + Media + Contact + Footer
5단계: 인터랙션 (스크롤 애니메이션, 카운터, 탭, 네비게이션)
