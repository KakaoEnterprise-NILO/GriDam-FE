# 🌌 Gridam

> 하루의 기억을 감정으로 기록하고, 시각화하여 공유하는 감성 아카이브 플랫폼

<p align="center">
  <img width="60%" src="https://github.com/user-attachments/assets/e0397c12-319b-467d-8ddc-1ab11ec67896" />
</p>
<br/>

## ✨ 서비스 소개

Gridam은 사용자의 일기를 기반으로 감정을 분석하고,  
이를 카드·이미지·통계 형태로 시각화하는 플랫폼입니다.

**기록 → 감정 분석 → 콘텐츠 생성 → 공유**

## 🔥 주요 기능

- 📝 일기 작성 및 감정 분석  
- 🎨 감정 카드 및 이미지 생성  
- 🌐 피드 공유  
- 📊 감정 통계 및 캘린더  
- 🔔 알림

<br/>

## 🧠 아키텍처
- **Layer + Feature 혼합형**
- **API Layer 분리**
  - Axios 인스턴스를 기반으로 도메인별 API 모듈을 분리하여
  - 네트워크 로직과 UI를 분리

- **컴포넌트 구조화**
  - `ui/` : 재사용 가능한 공통 컴포넌트
  - `feature 단위` : 도메인별 UI 구성
  → 재사용성과 유지보수성 향상

- **상태 관리**
  - Zustand: 상태 관리

- **라우팅 구조**
  - React Router 기반 SPA 구조
  - 페이지 단위 컴포넌트로 분리하여 명확한 책임 분리

- **스타일링**
  - Tailwind CSS + shadcn/ui 조합
  → 빠른 개발 + 일관된 디자인 시스템 유지

<br/>

##  📂 프로젝트 구조

```text
src/
├── api/                    # 공통 Axios 인스턴스 및 도메인별 API 요청
├── assets/                 # 번들에 포함되는 이미지·아이콘
├── components/
├── pages/                  # 라우트 단위 페이지와 화면 조합
├── services/               # 여러 API 결과의 조합 및 화면용 데이터 가공
├── store/                  # Zustand 기반 인증·사용자 상태 관리
├── hooks/                  # 여러 기능에서 공유하는 커스텀 훅
├── types/                  # 공통 도메인 타입
├── lib/                    # 공통 스타일·클래스 유틸리티
│
├── App.tsx                 # 페이지 지연 로딩 및 전체 라우팅
├── main.tsx                # React 애플리케이션 진입점
└── index.css               # Tailwind CSS 및 전역 스타일

public/                     # URL로 직접 참조하는 정적 자원
tests/                      # 라우팅·인증 갱신·빌드 회귀 테스트
```

### 구조 설계 기준

* `pages`는 페이지 구성과 사용자 흐름 제어에 집중합니다.
* `components`는 공통 UI와 도메인별 화면 요소를 관리합니다.
* 특정 기능에서만 사용하는 `hooks`, `utils`, `types`는 해당 기능 폴더에 함께 배치합니다.
* 여러 기능에서 공유되는 훅과 타입만 `src/hooks`, `src/types`에서 관리합니다.
* API 요청은 `src/api`의 공통 Axios 인스턴스를 통해 처리합니다.
* 여러 API 응답의 조합이나 화면용 데이터 가공은 `src/services`에서 담당합니다.


## 🖼️ 화면
### 📔 내 일기장
<p align="center">
  <img width="45%" height="927" alt="image 220" src="https://github.com/user-attachments/assets/22ecb65e-c3e5-4f78-94aa-aca52eadb71e" />  
</p>  


### 📝 일기 작성
<p align="center">
  <img width="45%" height="757" alt="image 220" src="https://github.com/user-attachments/assets/4a498f2a-c64f-4861-a0ad-bb9ed3192a95" />
</p>

### 🎨 감정 카드
<p align="center">
  <img width="45%" height="741" alt="image 221" src="https://github.com/user-attachments/assets/ab520e9e-a051-4bda-a40b-9a60d43b8cfa" />
  <img width="45%" height="926" alt="image 221" src="https://github.com/user-attachments/assets/6fc29420-fcc3-4d39-bae0-5ba4f5f1fc61" />
</p>

### 📊 통계 / 캘린더
<p align="center">
  <img width="45%" height="950" alt="image" src="https://github.com/user-attachments/assets/c95ca513-70d5-43d0-82bb-2efbce7c8260" />
  <img width="45%" height="878" alt="image" src="https://github.com/user-attachments/assets/a15bc0fc-ca87-49af-87f5-5cbaef0b9e07" />
</p>

### 🌐 피드
<p align="center">
  <img width="45%" height="747" alt="image 221" src="https://github.com/user-attachments/assets/26ba1c89-98aa-4658-ab4c-e4629ad26202" />
</p>

### 🔔 알림
<p align="center">
  <img width="45%" height="801" alt="image 220" src="https://github.com/user-attachments/assets/344b4f4d-5dad-477c-9cb0-11e94a1faee4" />
</p>

### 👤 프로필&설정
<p align="center">
  <img width="45%" height="800" alt="image 220" src="https://github.com/user-attachments/assets/a282d549-5f2b-432a-9c09-8ceea5f1562e" />
  <img width="45%" height="798" alt="image 221" src="https://github.com/user-attachments/assets/bc89d411-12bc-4268-b961-8d6e865138c4" />
</p>
<br/>


## 🛠 기술 스택

### 🎨 Frontend
<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zustand-000000?style=flat&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/shadcnui-000000?style=flat&logo=shadcnui&logoColor=white"/>
</p>
<br/>

## 👥 Team

### 🎨 Frontend
| <img width="120px" src="https://avatars.githubusercontent.com/hdsjiw" /> | <img width="120px" src="https://avatars.githubusercontent.com/Beom2020" /> |
|:---:|:---:|
| FE | FE |
| [전지우](https://github.com/hdsjiw) | [김범진](https://github.com/Beom2020) |
<br/>

## 개발 기간
#### 개발 기간: 2025. 04 ~ 2025. 06
