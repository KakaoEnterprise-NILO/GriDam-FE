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
```
src/
├── api/ # API 요청 로직 (Axios 인스턴스, 도메인별 API)
│
├── components/ # 공통 및 도메인 UI 컴포넌트
│
├── pages/ # 페이지 단위 컴포넌트
│
├── store/ # 상태 관리 (Zustand)
│
├── hooks/ # 커스텀 훅
│ 
│
├── utils/ # 공통 유틸 함수
│
│
├── App.tsx # 라우팅 및 전체 구조
├── main.tsx # 엔트리 포인트
└── index.css # 전역 스타일
```

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
