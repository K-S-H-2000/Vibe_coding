/**
 * 한국공학대학교 (Tech University of Korea - TUKOREA)
 * R&D Innovation Portal Data Store
 * 최신 연구 성과, 특허, 산학협력, 교수진 및 통계 데이터
 */

const TUK_DATA = {
  // 포털 기본 정보
  portalInfo: {
    university: {
      ko: "한국공학대학교",
      en: "Tech University of Korea (TUKOREA)"
    },
    title: {
      ko: "한국공학대학교 R&D 혁신 성과 포털",
      en: "TUKOREA R&D Innovation Portal"
    },
    subtitle: {
      ko: "산업 현장과 미래 기술을 잇는 산학일체형 공학 연구 허브",
      en: "Connecting Industrial Practice with Future Technology: Industry-Academia Integrated Engineering Hub"
    },
    lastUpdated: "2026.11"
  },

  // 핵심 통계 지표 (Hero Metrics)
  metrics: [
    {
      id: "rd_budget",
      label: { ko: "최근 연간 R&D 연구비", en: "Annual R&D Funding" },
      value: 1320,
      suffix: { ko: "억 원+", en: "B+ KRW" },
      change: "+18.4% YoY",
      icon: "trending-up",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "partner_companies",
      label: { ko: "가족회사 및 협력기업", en: "Partner / Family Companies" },
      value: 4500,
      suffix: { ko: "여 개사", en: "+ Companies" },
      change: "누적 11,000+ 네트워크",
      icon: "building-2",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: "patents",
      label: { ko: "보유 핵심 특허", en: "Registered Core Patents" },
      value: 1580,
      suffix: { ko: "건+", en: "+ Patents" },
      change: "해외특허 180건 포함",
      icon: "file-check-2",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "tech_transfer",
      label: { ko: "기술이전 및 사업화 실적", en: "Tech Transfer & Value" },
      value: 342,
      suffix: { ko: "억 원", en: "B KRW" },
      change: "최근 3개년 누적",
      icon: "arrow-up-right",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "national_projects",
      label: { ko: "주요 대형 국책사업 유치", en: "Flagship National Projects" },
      value: 14,
      suffix: { ko: "개 사업단", en: " Projects" },
      change: "총 1,200억 원 규모",
      icon: "award",
      color: "from-purple-500 to-pink-600"
    }
  ],

  // 5대 핵심 첨단 연구 클러스터 (5T ICC)
  clusters: [
    {
      id: "all",
      name: { ko: "전체 분야", en: "All Fields" },
      icon: "layers"
    },
    {
      id: "semiconductor",
      name: { ko: "차세대 반도체·패키징", en: "Semiconductor & Packaging" },
      tagline: { ko: "다이아몬드 전력반도체 및 EUV/패키징 공정 선도", en: "Diamond Power Semi & Advanced Packaging" },
      icon: "cpu",
      color: "#3b82f6",
      bgClass: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
    {
      id: "ai_robotics",
      name: { ko: "AI 제조혁신·자율로봇", en: "AI Manufacturing & Robotics" },
      tagline: { ko: "반월시화 AX 허브 및 제조 로봇 인공지능 전환", en: "Industrial AX Hub & Autonomous Robotics" },
      icon: "bot",
      color: "#8b5cf6",
      bgClass: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    {
      id: "mobility",
      name: { ko: "미래 모빌리티·전력제어", en: "Future Mobility & Powertrain" },
      tagline: { ko: "친환경 전기차 배터리 열관리 및 SiC 모터제어", en: "EV Battery Thermal Safety & SiC Inverters" },
      icon: "car",
      color: "#06b6d4",
      bgClass: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
    },
    {
      id: "carbon_neutral",
      name: { ko: "탄소중립·그린에너지", en: "Carbon Neutrality & Green Energy" },
      tagline: { ko: "수소 나노촉매 및 스마트산단 탄소제로 공정", en: "Hydrogen Catalysts & Zero-Carbon Hub" },
      icon: "leaf",
      color: "#10b981",
      bgClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    },
    {
      id: "biotech",
      name: { ko: "첨단 바이오·나노융합", en: "Bio-Convergence & Nanotech" },
      tagline: { ko: "3D 바이오프린팅 인공장기 및 정밀 분자진단", en: "3D Bioprinted Organs & Nano Diagnostics" },
      icon: "dna",
      color: "#ec4899",
      bgClass: "bg-pink-500/10 text-pink-500 border-pink-500/20"
    }
  ],

  // 최신 주요 연구 성과 목록 (Research Breakthroughs)
  researchItems: [
    {
      id: "res-01",
      clusterId: "semiconductor",
      title: {
        ko: "세계 최초 단결정 다이아몬드 웨이퍼 기반 Monolithic 트랜지스터 동시 구현",
        en: "World's First Monolithic E/D-Mode Transistors on Single-Crystal Diamond Wafer"
      },
      leadResearcher: {
        name: "남옥현 교수",
        title: "교수 / 나노반도체융합센터장",
        dept: "나노반도체공학과",
        lab: "와이드갭반도체소자 연구실"
      },
      year: "2025",
      date: "2025-06-18",
      trl: 5, // TRL 단계 (1~9)
      type: "Breakthrough / Paper / Patent",
      tags: ["다이아몬드 반도체", "전력반도체", "초고온소자", "APWS 초청"],
      thumbnail: "semiconductor_diamond.png",
      impactScore: 98,
      journal: "APWS (Asia-Pacific Workshop on Widegap Semiconductors) Keynote & IEEE Trans.",
      summary: {
        ko: "세계 최초로 이종성장 단결정 다이아몬드 웨이퍼 상에 E-모드(노멀리 오프)와 D-모드(노멀리 온) 동작을 단일 칩에 동시 구현한 monolithic 다이아몬드 트랜지스터 개발에 성공하였습니다. 기존 SiC 및 GaN 대비 3배 이상의 높은 파괴전계와 5배 이상의 열전도도를 보유하여 미래 우주·항공 및 초고전압 전기차 분야의 혁신 소자로 주목받고 있습니다.",
        en: "Successfully integrated both E-mode and D-mode operation monolithically on heteroepitaxial single-crystal diamond wafers. Boasting over 3x higher breakdown field and 5x superior thermal conductivity compared to SiC/GaN, paving the way for extreme-environment power electronics."
      },
      highlights: [
        "세계 최초 다이아몬드 웨이퍼 상 E/D-모드 로직 회로 집적 성공",
        "500℃ 초고온 환경에서도 안정적인 전류 스위칭 동작 입증",
        "국내외 원천특허 4건 출원 및 APWS 국제학술대회 초청 기조강연"
      ],
      applications: "초고압 전기차 인버터, 우주항공 레이더 시스템, 방위산업용 고출력 RF 증폭기",
      status: "시제품 특성 평가 및 파운드리 협력 양산성 검증 단계 (TRL 5)"
    },
    {
      id: "res-02",
      clusterId: "ai_robotics",
      title: {
        ko: "산업용 로봇 및 반도체 제조설비 예지보전 AI 자율진단 시스템 (백암논문상 수상)",
        en: "AI-Powered Autonomous Predictive Maintenance System for Semiconductor & Industrial Robots"
      },
      leadResearcher: {
        name: "김효영 교수",
        title: "교수",
        dept: "메카트로닉스공학부",
        lab: "스마트제조 & AI 진단 연구실"
      },
      year: "2026",
      date: "2026-02-14",
      trl: 7,
      type: "Award / Commercialized / AI System",
      tags: ["자율제조", "예지보전", "대한기계학회 백암논문상", "AX 허브"],
      thumbnail: "ai_predictive.png",
      impactScore: 96,
      journal: "Journal of Manufacturing Systems / 대한기계학회 생산및설계공학부문 백암논문상",
      summary: {
        ko: "반도체 진공 챔버 및 6축 산업용 로봇의 미세 진동·전류·음향 데이터를 초당 10만 회 초정밀 샘플링하여 잔여수명(RUL)을 99.2% 정확도로 예측하는 자율진단 AI 알고리즘을 개발하였습니다. 대한기계학회 최고 권위의 '백암논문상'을 수상하고 반월·시화 국가산단 제조기업 24개 라인에 실증 적용되었습니다.",
        en: "Developed an ultra-high-rate sampling AI diagnostic framework predicting the remaining useful life (RUL) of semiconductor equipment and robotic manipulators with 99.2% accuracy. Honored with the prestigious Baekam Paper Award by KSME."
      },
      highlights: [
        "비정형 노이즈 환경에서도 미세 결함을 2주 전에 사전 감지하는 딥러닝 필터링",
        "반월·시화 국가산단 스마트공장 실증 라인 다운타임 74% 감축",
        "대한기계학회 2026년도 백암논문상 수상 및 산자부 AX 허브 핵심 탑재"
      ],
      applications: "반도체 전/후공정 진공장비, 지능형 협동로봇 예지보전, 중소 제조기업 무인화 설비",
      status: "반월시화 산단 기업 24개사 현장 적용 및 상용 SW 패키지화 완료 (TRL 7)"
    },
    {
      id: "res-03",
      clusterId: "biotech",
      title: {
        ko: "3D 바이오프린팅 기반 인체 피부 모델 및 혈관화 인공장기 플랫폼 구축",
        en: "3D Bioprinted Human Skin Models and Vascularized Tissue Scaffolds"
      },
      leadResearcher: {
        name: "심진형·진송완 교수",
        title: "교수",
        dept: "기계공학과 / 3D바이오프린팅연구소",
        lab: "생체모사 3D 바이오프린팅 연구실"
      },
      year: "2025",
      date: "2025-09-05",
      trl: 6,
      type: "Paper / Bio Platform",
      tags: ["3D 바이오프린팅", "인공장기", "동물실험 대체", "Advanced Healthcare Materials"],
      thumbnail: "bio_skin.png",
      impactScore: 95,
      journal: "Advanced Healthcare Materials & Int. Journal of Bioprinting",
      summary: {
        ko: "인체 유래 줄기세포와 세포외기질(ECM) 바이오잉크를 정밀 패터닝하여 실제 인체 표피-진피-혈관 구조를 마이크로 단위로 재현한 인공 피부 모델 개발에 성공했습니다. 동물실험 금지 규제에 대응하는 차세대 화장품 및 신약 독성 유효성 평가 플랫폼으로 국제 저널에 연속 게재되었습니다.",
        en: "Engineered biomimetic 3D human skin equivalents with integrated microvascular networks using patient-derived ECM bio-ink, providing a breakthrough animal-alternative platform for drug screening and cosmetic toxicity tests."
      },
      highlights: [
        "모세혈관망이 연결된 3차원 인체 전층 피부 모델 98% 생존율 구현",
        "기존 대비 약물 투과도 및 자극 반응 예측 신뢰도 40% 이상 향상",
        "글로벌 바이오 제약사 및 화장품 기업과 전임상 스크리닝 공동연구 진행"
      ],
      applications: "신약 후보물질 피부 독성 스크리닝, 화장품 효능 평가, 화상 치료용 인공 재생 피부",
      status: "국내 바이오벤처 기술이전 및 CRO 유효성 평가 서비스 진입 (TRL 6)"
    },
    {
      id: "res-04",
      clusterId: "semiconductor",
      title: {
        ko: "AI 기반 레이저 스펙클(Speckle) 노이즈 저감 기술 및 초고해상도 광학엔진",
        en: "AI-Driven Laser Speckle Noise Reduction Technology for Ultra-Resolution Optical Engines"
      },
      leadResearcher: {
        name: "김수민 교수",
        title: "교수",
        dept: "전자공학부",
        lab: "광전자 신호처리 연구실"
      },
      year: "2025",
      date: "2025-07-22",
      trl: 8,
      type: "Tech Transfer / Patent / Commercial",
      tags: ["레이저 광학", "AI 노이즈제거", "기술이전 완료", "브라이튼코퍼레이션"],
      thumbnail: "laser_speckle.png",
      impactScore: 94,
      journal: "IEEE Photonics Technology Letters / 산학협력 기술이전 성약",
      summary: {
        ko: "고출력 레이저 디스플레이 및 반도체 표면 결함 검사기에서 발생하는 스펙클 노이즈를 딥러닝 기반 실시간 필터링을 통해 90% 이상 억제하는 원천기술을 개발하고, 유망 광학 강소기업인 '브라이튼코퍼레이션'에 기술이전을 체결하여 양산 제품에 성공적으로 탑재하였습니다.",
        en: "Developed an AI-driven real-time laser speckle reduction algorithm cutting optical noise by over 90%. Successfully transferred to Brighton Corporation for next-gen semiconductor inspection systems."
      },
      highlights: [
        "하드웨어 디퓨저 없이 소프트웨어 AI 연산만으로 스펙클 명암비 4% 이하 달성",
        "국내 광학 전문기업 브라이튼코퍼레이션에 기술이전 및 상용화 계약 체결",
        "반도체 웨이퍼 표면 미세 스크래치 검출 감도 3배 개선"
      ],
      applications: "차세대 AR/VR 레이저 프로젝션, 반도체 웨이퍼 나노 결함 검사장비, 의료용 레이저 내시경",
      status: "기술이전 계약 체결 및 기업 양산 라인 적용 완료 (TRL 8)"
    },
    {
      id: "res-05",
      clusterId: "ai_robotics",
      title: {
        ko: "산업용 미션 크리티컬 OS 이중화 및 무중단 고가용성 고장복구 시스템",
        en: "Real-Time Mission-Critical Dual-OS Redundancy & Non-Stop Fault Recovery System"
      },
      leadResearcher: {
        name: "박성원 교수",
        title: "교수",
        dept: "국제미래공학부",
        lab: "임베디드시스템 및 시스템SW 연구실"
      },
      year: "2025",
      date: "2025-08-30",
      trl: 8,
      type: "Tech Transfer / Software / Patent",
      tags: ["실시간 OS", "무중단 복구", "기술이전 완료", "티데이트"],
      thumbnail: "os_redundancy.png",
      impactScore: 92,
      journal: "ACM Transactions on Embedded Computing Systems / 기술이전 협약",
      summary: {
        ko: "원자력, 철도, 스마트팩토리 등 단 1초의 중단도 허용되지 않는 산업용 제어 컨트롤러를 위해 마이크로초(μs) 단위로 상태를 동기화하고 주 시스템 고장 시 5ms 이내에 백업 OS로 무순간 절체하는 결함 포용형 이중화 소프트웨어를 개발하고 전문 솔루션 기업 '티데이트'에 기술이전했습니다.",
        en: "Engineered an industrial fault-tolerant microkernel OS framework with sub-5ms failover switching and microsecond-level state synchronization, successfully transferred to T-Date Corp."
      },
      highlights: [
        "하드웨어 단절 시 5밀리초(ms) 이내 무손실 액티브-스탠바이 전환",
        "소프트웨어 전문 기업 (주)티데이트에 전용실시권 기술이전",
        "스마트공장 PLC 및 원전 계측제어 안전 등급(SIL 3) 적합성 검증"
      ],
      applications: "반도체 클린룸 무인 물류(OHT), 철도 신호 제어기, 지능형 에너지 그리드 ESS",
      status: "기술이전 완료 및 산업용 임베디드 장비 탑재 출하 (TRL 8)"
    },
    {
      id: "res-06",
      clusterId: "mobility",
      title: {
        ko: "전기차 배터리팩 열폭주 사전감지 다중 광섬유 센싱 및 고속 분리 알고리즘",
        en: "Multi-Point Fiber-Optic Thermal Runaway Early Detection & High-Speed Isolation for EV Batteries"
      },
      leadResearcher: {
        name: "정명진 교수",
        title: "교수",
        dept: "미래모빌리티공학과",
        lab: "차세대 e-모빌리티 시스템 연구실"
      },
      year: "2025",
      date: "2025-11-12",
      trl: 6,
      type: "Patent / Industry Project",
      tags: ["전기차 안전", "열폭주 방지", "배터리 BMS", "현대차 1차 협력사"],
      thumbnail: "ev_battery_safety.png",
      impactScore: 95,
      journal: "IEEE Transactions on Power Electronics",
      summary: {
        ko: "전기차 배터리 셀 내부의 미세 변형과 0.1℃ 단위의 급격한 국소 발열을 FBG(Fiber Bragg Grating) 광섬유 센서로 실시간 계측하여 열폭주 발생 3분 전에 운전자 경보 및 셀 블록 격리를 수행하는 지능형 BMS 통합 안전 솔루션을 개발했습니다.",
        en: "Pioneered a real-time battery safety architecture utilizing Fiber Bragg Grating optical sensors to detect micro-strain and thermal anomalies 3 minutes prior to thermal runaway incidents."
      },
      highlights: [
        "전자기 간섭(EMI)에 영향을 받지 않는 비전도성 광섬유 내장 센서망",
        "열폭주 전조 현상 사전 감지 시간: 180초 이상 확보 (기존 대비 4배)",
        "국내 대형 자동차 부품사 및 배터리 모듈 제조사와 공동 실증 완료"
      ],
      applications: "차세대 전기차/전기버스 배터리팩, 대용량 산업용 ESS 화재 방지 시스템",
      status: "완성차 1차 협력사와 양산 차종 탑재 B-샘플 테스트 진행 (TRL 6)"
    },
    {
      id: "res-07",
      clusterId: "carbon_neutral",
      title: {
        ko: "그린수소 생산 수전해용 고내구성 비귀금속 나노촉매 전극 개발",
        en: "High-Durability Non-Precious Nano-Catalyst Electrodes for Anion Exchange Membrane Water Electrolysis"
      },
      leadResearcher: {
        name: "이강원 교수",
        title: "교수",
        dept: "신소재공학과",
        lab: "에너지나노재료 연구실"
      },
      year: "2025",
      date: "2025-10-15",
      trl: 5,
      type: "Paper / Patent / Green Tech",
      tags: ["그린수소", "비귀금속 촉매", "탄소중립", "AEM 수전해"],
      thumbnail: "green_hydrogen.png",
      impactScore: 93,
      journal: "ACS Applied Materials & Interfaces / Energy & Environmental Science",
      summary: {
        ko: "기존 수전해 장치에 사용되던 고가의 백금(Pt)과 이리듐(Ir)을 대체하여 니켈-몰리브덴-철 3원계 자가성장 다공성 나노구조를 설계함으로써 생산 비용을 70% 낮추면서도 3,000시간 연속 가동 안정성을 달성한 AEM 수전해 전극을 개발했습니다.",
        en: "Synthesized self-supported Ni-Mo-Fe ternary porous nanocatalysts replacing costly Platinum and Iridium for water electrolysis, slumping stack costs by 70% while maintaining durability over 3,000 hours."
      },
      highlights: [
        "귀금속(백금·이리듐) 제로화로 수전해 셀 스택 제작 단가 70% 절감",
        "전류밀도 1.0 A/cm²에서 3,000시간 연속 운전 시 과전압 열화율 2% 미만",
        "산자부 탄소중립 특성화 대학원 및 시흥 스마트에너지 실증 과제 연계"
      ],
      applications: "대규모 그린수소 생산 플랜트, 분산형 수소충전소, 신재생에너지 잉여전력 P2G(Power-to-Gas)",
      status: "스케일업 스택 제작 및 시흥 스마트허브 실증 센터 테스트 중 (TRL 5)"
    },
    {
      id: "res-08",
      clusterId: "ai_robotics",
      title: {
        ko: "무인판매 키오스크용 멀티모달 제스처 인터페이스 및 음료 제조 캡슐장치",
        en: "Multimodal Touchless Gesture Interface & Automated Beverage Dispensing for Smart Kiosks"
      },
      leadResearcher: {
        name: "이낙범 교수",
        title: "교수",
        dept: "전자공학부",
        lab: "지능형 인터랙션 연구실"
      },
      year: "2025",
      date: "2025-05-19",
      trl: 9,
      type: "Tech Transfer / Commercial Product",
      tags: ["비접촉 제스처", "무인 키오스크", "기술이전 완료", "원퍼스트글로벌"],
      thumbnail: "touchless_kiosk.png",
      impactScore: 90,
      journal: "산학협력 기술사업화 성약 / ICT 융합 특허 등록",
      summary: {
        ko: "위생과 감염 예방이 중요한 무인 카페 및 매장을 위해 터치 없이 손동작(에어 제스처)과 음성으로 주문을 완료하고, 밀폐형 캡슐로 오염 없이 신속하게 음료를 자동 추출하는 스마트 키오스크 원천기술을 개발하여 '원퍼스트글로벌'에 기술이전 및 전국 매장 상용화에 성공했습니다.",
        en: "Engineered a touchless multimodal gesture & voice recognition kiosk architecture alongside automated sanitary capsule dispenser modules, transferred to OneFirst Global for nationwide commercial rollout."
      },
      highlights: [
        "ToF 3D 깊이 센서와 온디바이스 AI를 결합한 오작동 없는 99.5% 제스처 인식",
        "국내 무인솔루션 선도기업 원퍼스트글로벌에 기술이전 및 수출 모델 적용",
        "특허청 우수 발명대전 장려상 수상 및 KC 안전 인증 완료"
      ],
      applications: "무인 로봇 카페, 병원·공항 비접촉 안내 단말기, 푸드테크 자동 조리 시스템",
      status: "상용 제품 출시 완료 및 프랜차이즈 매장 150여 곳 도입 (TRL 9)"
    },
    {
      id: "res-09",
      clusterId: "semiconductor",
      title: {
        ko: "반월시화 공정혁신 시뮬레이션 센터: 고부가 3D 패키징 휨(Warpage) 예측 가상 트윈",
        en: "Advanced 3D Packaging Thermal Warpage Predictive Virtual Twin Platform"
      },
      leadResearcher: {
        name: "안승언 교수",
        title: "센터장 / 교수",
        dept: "전자공학부",
        lab: "반도체공정혁신연구센터"
      },
      year: "2026",
      date: "2026-01-10",
      trl: 7,
      type: "Platform / Virtual Engineering",
      tags: ["공정혁신 시뮬레이션", "반도체 패키징", "디지털트윈", "소부장 지원"],
      thumbnail: "simulation_center.png",
      impactScore: 94,
      journal: "Microelectronics Reliability & 산업통상자원부 우수과제",
      summary: {
        ko: "경기 반월·시화 국가산단 반도체 소재·부품 기업들을 위해 칩 적층 및 몰딩 공정 중 발생하는 열팽창 불일치에 따른 패키지 휨(Warpage) 현상을 가상 공간에서 사전에 95% 이상 정확도로 시뮬레이션하고 불량률을 60% 이상 저감시키는 가상 공학 플랫폼을 구축했습니다.",
        en: "Established a cloud-based virtual engineering twin simulating high-temperature warpage and solder joint stress in multi-die 3D packages, slashing development cycles and defect rates for regional SMBs."
      },
      highlights: [
        "시제품 제작 전 컴퓨터 시뮬레이션을 통해 개발 기간 6개월 -> 1.5개월 단축",
        "반월·시화 및 판교권 45개 중견·중소 반도체 패키지 협력사 기술지원",
        "고성능 CAE 해석 클러스터 무상/저비용 클라우드 서비스 제공"
      ],
      applications: "HBM 메모리 적층 패키지, 자율주행 차량용 SiP 모듈, 고밀도 인쇄회로기판(PCB)",
      status: "경기 반월시화 공정혁신 시뮬레이션 센터 웹 포털 운영 중 (TRL 7)"
    },
    {
      id: "res-10",
      clusterId: "ai_robotics",
      title: {
        ko: "산업통상자원부 280억 규모 '반월시화형 AI 제조혁신 실증 AX 허브' 출범",
        en: "Launch of 28B KRW National Project: AI Manufacturing Transformation (AX) Hub"
      },
      leadResearcher: {
        name: "배유석 교수",
        title: "사업단장 / 컴퓨터공학부 교수",
        dept: "컴퓨터공학과",
        lab: "산업인공지능 연구센터"
      },
      year: "2025",
      date: "2025-04-01",
      trl: 7,
      type: "National Megaproject",
      tags: ["산자부 국책사업", "280억 규모", "AI 자율제조", "제조 AX 허브"],
      thumbnail: "ax_hub.png",
      impactScore: 99,
      journal: "산업통상자원부 공모 선정 / 2024~2028 중점 국책과제",
      summary: {
        ko: "한국공학대학교가 총괄 주관기관으로 선정된 280억 원 규모의 대형 국책 사업으로, 시화·반월 산단의 뿌리기업 및 기계·전자 제조공정에 인공지능(AI), 피지컬 AI, 자율로봇, 온디바이스 에지 컴퓨팅을 결합하여 전통 공장을 자율제조 스마트 팩토리로 전환하는 국가 거점 사업입니다.",
        en: "Leading a major 28 billion KRW national megaproject funded by MOTIE to transform Banwol-Sihwa National Industrial Complex into an AI-powered autonomous manufacturing powerhouse."
      },
      highlights: [
        "2028년까지 280억 원 국비 및 지자체 매칭 투입 (한국공학대 주관)",
        "시흥·안산 1,000여 개 제조 기업에 맞춤형 AX 솔루션 및 로봇 실증 공급",
        "연간 500명 이상의 현장 밀착형 실무 AI 제조 엔지니어 양성"
      ],
      applications: "단조·주조·금형 뿌리공정 자동화, 자동차 부품 정밀 가공 AI 비전 검사, 제조 데이터 스페이스",
      status: "실증 랩 및 오픈 이노베이션 테스트베드 1단계 가동 개시 (TRL 7)"
    },
    {
      id: "res-11",
      clusterId: "carbon_neutral",
      title: {
        ko: "산업단지 잉여배열 회수용 초고효율 세라믹 나노복합재 열전발전 모듈",
        en: "Ultra-Efficient Ceramic Nanocomposite Thermoelectric Modules for Waste Heat Recovery"
      },
      leadResearcher: {
        name: "최호석 교수",
        title: "교수",
        dept: "에너지·전기공학과",
        lab: "열전변환소재연구실"
      },
      year: "2026",
      date: "2026-03-08",
      trl: 6,
      type: "Paper / Green Energy",
      tags: ["열전발전", "미활용에너지", "폐열회수", "탄소배출권"],
      thumbnail: "thermoelectric.png",
      impactScore: 91,
      journal: "Nano Energy & Advanced Functional Materials",
      summary: {
        ko: "철강·석유화학·열처리 공장 굴뚝과 배관에서 버려지는 200~500℃ 중저온 폐열을 직접 전기에너지로 변환하는 비스무스-텔루라이드계 고효율 나노열전 발전 모듈을 개발했습니다. 열전변환 효율 12.8%를 기록하여 세계 최고 수준을 달성했습니다.",
        en: "Engineered high-performance Bi-Te nanocomposite thermoelectric generators recovering 200-500°C industrial flue heat with an extraordinary conversion efficiency of 12.8%."
      },
      highlights: [
        "나노 분산 공정을 통한 열전도도 45% 저감 및 전기전도도 극대화 (ZT=1.65)",
        "공장 배관에 유연하게 밀착 가능한 플렉시블 원통형 모듈 구조 특허 확보",
        "산단 내 열처리 실증 공장에서 연간 1.2MWh 자가 발전 및 탄소 저감 검증"
      ],
      applications: "공장 폐열 재발전, 선박 배기가스 발전 시스템, 자립형 무선 IoT 센서 자가전원",
      status: "산단 입주기업 배관 실증 파일럿 플랜트 가동 중 (TRL 6)"
    },
    {
      id: "res-12",
      clusterId: "biotech",
      title: {
        ko: "무통증 생분해성 마이크로니들 기반 실시간 대사지표 모니터링 스마트 패치",
        en: "Pain-Free Biodegradable Microneedle Biosensor Patch for Real-Time Biomarker Tracking"
      },
      leadResearcher: {
        name: "한은비 교수",
        title: "부교수",
        dept: "생명화학공학과",
        lab: "나노바이오센서 융합연구실"
      },
      year: "2025",
      date: "2025-12-04",
      trl: 5,
      type: "Paper / Bio Device",
      tags: ["마이크로니들", "웨어러블 헬스케어", "무통 진단", "Biosensors & Bioelectronics"],
      thumbnail: "microneedle_patch.png",
      impactScore: 93,
      journal: "Biosensors and Bioelectronics / Lab on a Chip",
      summary: {
        ko: "피부 통점을 자극하지 않는 500마이크로미터 길이의 생분해성 고분자 침으로 간질액을 모세관 현상으로 자동 추출하고, 효소-탄소나노튜브 전극을 통해 혈당 및 젖산 수치를 스마트폰 앱으로 실시간 전송하는 일체형 헬스케어 패치 시스템을 구현했습니다.",
        en: "Fabricated a 500um pain-free biodegradable microneedle array extracting interstitial fluids to continuously monitor glucose and lactate levels with smartphone Bluetooth integration."
      },
      highlights: [
        "채혈 통증 전혀 없이 7일간 연속 무자극 피부 부착 모니터링 가능",
        "간질액-혈당 상관관계 97.4% 달성 및 실시간 BLE 무선 전송 모듈 집적",
        "당뇨 환자 및 고강도 운동선수 피로도 실시간 관리에 최적화"
      ],
      applications: "연속혈당측정(CGM) 기기, 운동선수 젖산 피로도 분석 패치, 백신 경피 약물전달",
      status: "전임상 동물 유효성 평가 통과 및 의료기기 GMP 파트너십 논의 중 (TRL 5)"
    }
  ],

  // 특허 & 기술이전 유망 기술 마켓플레이스 (Tech Transfer Market)
  patents: [
    {
      id: "pat-01",
      regNo: "10-2645892-0000",
      title: "인공지능 기반 레이저 스펙클 노이즈 저감 장치 및 광학 프로젝션 시스템",
      inventor: "김수민 (전자공학부)",
      cluster: "semiconductor",
      trl: 8,
      status: "기술이전 완료 (브라이튼코퍼레이션)",
      statusType: "transferred",
      rightType: "통상실시권 / 특허권 양도 협의",
      transferValue: "1.8억 원 + 경상기술료",
      highlights: "광학 하드웨어 변경 없이 딥러닝 기반 실시간 스펙클 노이즈 제거",
      field: "반도체 검사장비, 초고해상도 디스플레이, 레이저 내시경",
      featured: true
    },
    {
      id: "pat-02",
      regNo: "10-2598114-0000",
      title: "실시간 운영체제의 무중단 프로세스 이중화 및 상태 복구 방법",
      inventor: "박성원 (국제미래공학부)",
      cluster: "ai_robotics",
      trl: 8,
      status: "기술이전 완료 (티데이트)",
      statusType: "transferred",
      rightType: "전용실시권",
      transferValue: "1.2억 원",
      highlights: "5ms 이내 무손실 절체 보장, 미션 크리티컬 산업망 무정지 운영",
      field: "스마트팩토리 제어기, 철도 신호 시스템, 방산 제어",
      featured: true
    },
    {
      id: "pat-03",
      regNo: "10-2611782-0000",
      title: "이종성장 다이아몬드 에피택셜 박막을 이용한 상보형 FET 소자 및 제조 방법",
      inventor: "남옥현 (나노반도체공학과)",
      cluster: "semiconductor",
      trl: 5,
      status: "기술이전 협의 가능 (유망 특허)",
      statusType: "available",
      rightType: "전용실시권 / 공동 연구개발",
      transferValue: "협의 (추천 기술)",
      highlights: "세계 최초 단결정 다이아몬드 기반 초고온/초고압 전력소자",
      field: "전기차 파워트레인, 항공우주 레이다, 전력망 송배전 인버터",
      featured: true
    },
    {
      id: "pat-04",
      regNo: "10-2587421-0000",
      title: "비접촉 모션 제스처 인식 기반의 무인 판매 키오스크 및 추출 장치",
      inventor: "이낙범 (전자공학부)",
      cluster: "ai_robotics",
      trl: 9,
      status: "기술이전 완료 (원퍼스트글로벌)",
      statusType: "transferred",
      rightType: "통상실시권",
      transferValue: "8,500만 원",
      highlights: "위생적 비접촉 에어터치 인터페이스 및 정밀 서보 캡슐 디스펜서",
      field: "무인 점포, 스마트 밴딩머신, 의료시설 안내 단말",
      featured: false
    },
    {
      id: "pat-05",
      regNo: "10-2689332-0000",
      title: "진동 및 초음파 신호 복합 분석을 통한 산업용 다축 로봇 감속기 잔여수명 예측 시스템",
      inventor: "김효영 (메카트로닉스공학부)",
      cluster: "ai_robotics",
      trl: 7,
      status: "기술이전 협의 가능 (추천)",
      statusType: "available",
      rightType: "통상실시권 / SW 라이선스",
      transferValue: "협의 (산단 기업 우대)",
      highlights: "99% 이상의 고장 예측 정확도, 기존 설비 센서 탈부착 간편형",
      field: "산업용 로봇 제조사, 반도체 웨이퍼 이송 로봇, 자동차 조립라인",
      featured: true
    },
    {
      id: "pat-06",
      regNo: "10-2651478-0000",
      title: "광섬유 브래그 격자(FBG) 어레이를 구비한 전기차 배터리 모듈 열폭주 조기 감지 시스템",
      inventor: "정명진 (미래모빌리티공학과)",
      cluster: "mobility",
      trl: 6,
      status: "기술이전 협의 가능",
      statusType: "available",
      rightType: "전용실시권 / 기술 매칭",
      transferValue: "협의 (공동 특허 추진 가능)",
      highlights: "전자파 노이즈 완전 무관, 열폭주 180초 전 조기 감지 알람",
      field: "전기차 배터리팩, 선박용 배터리, ESS 화재 방재",
      featured: false
    },
    {
      id: "pat-07",
      regNo: "10-2623910-0000",
      title: "다공성 3차원 나노구조 니켈-몰리브덴 음극을 구비한 음이온 교환막 수전해 셀",
      inventor: "이강원 (신소재공학과)",
      cluster: "carbon_neutral",
      trl: 5,
      status: "기술이전 협의 가능",
      statusType: "available",
      rightType: "전용실시권 / 기술지도",
      transferValue: "협의",
      highlights: "귀금속 없는 저비용 전극, 3,000시간 수명 내구성 검증",
      field: "그린수소 생산 스택, 에너지 저장 장치(P2G), 알칼라인 수전해",
      featured: false
    },
    {
      id: "pat-08",
      regNo: "10-2670123-0000",
      title: "세포외기질(ECM) 및 펩타이드 복합체를 함유하는 3D 바이오프린팅용 하이드로겔 잉크",
      inventor: "심진형 (기계공학과)",
      cluster: "biotech",
      trl: 6,
      status: "기술이전 협의 가능 (임상/비임상 연계)",
      statusType: "available",
      rightType: "물질특허 전용실시권",
      transferValue: "협의",
      highlights: "세포 생존율 98% 유지, 층간 접합 우수 마이크로 유로 패터닝",
      field: "동물대체 시험키트, 인공피부 재생제, 바이오 제약 스크리닝",
      featured: false
    }
  ],

  // 우수 연구책임자 (Faculty & Labs)
  faculty: [
    {
      id: "fac-01",
      name: "남옥현",
      engName: "Ok-Hyun Nam, Ph.D.",
      title: "정교수 / 나노반도체융합센터장",
      dept: "나노반도체공학과",
      email: "ohnam@tukorea.ac.kr",
      lab: "와이드갭 반도체 소자 연구실 (WBDL)",
      labUrl: "http://wbdl.tukorea.ac.kr",
      major: "차세대 다이아몬드 반도체, GaN 전력소자, 초고온 화합물 반도체",
      image: "faculty_nam.jpg",
      badge: "세계 최초 다이아몬드 트랜지스터",
      papersCount: 142,
      patentsCount: 48,
      intro: "와이드 밴드갭(Wide Bandgap) 반도체 분야의 세계적 석학으로, 세계 최초로 다이아몬드 웨이퍼 상 Monolithic E/D 트랜지스터를 개발하였습니다."
    },
    {
      id: "fac-02",
      name: "김효영",
      engName: "Hyo-Young Kim, Ph.D.",
      title: "정교수",
      dept: "메카트로닉스공학부",
      email: "hykim@tukorea.ac.kr",
      lab: "지능형 제조시스템 및 예지진단 연구실 (IMS Lab)",
      labUrl: "http://ims.tukorea.ac.kr",
      major: "스마트 팩토리, 산업용 로봇 고장진단, 생산공학 AI 시스템",
      image: "faculty_kim_hy.jpg",
      badge: "대한기계학회 백암논문상 수상",
      papersCount: 96,
      patentsCount: 31,
      intro: "반도체 장비 및 산업용 다축 로봇의 딥러닝 기반 이상 감지 연구를 선도하며 2026년 대한기계학회 최고 권위 백암논문상을 수상했습니다."
    },
    {
      id: "fac-03",
      name: "김수민",
      engName: "Soo-Min Kim, Ph.D.",
      title: "교수",
      dept: "전자공학부",
      email: "smkim@tukorea.ac.kr",
      lab: "광전자 및 AI 신호처리 연구실 (OESP)",
      labUrl: "http://oesp.tukorea.ac.kr",
      major: "광학 엔지니어링, AI 영상 신호처리, 레이저 노이즈 저감",
      image: "faculty_kim_sm.jpg",
      badge: "유망 중견기업 기술이전 달성",
      papersCount: 78,
      patentsCount: 26,
      intro: "초정밀 레이저 광학계의 스펙클 잡음 저감 기술을 개발하여 브라이튼코퍼레이션에 성공적으로 기술이전하고 산업화에 기여했습니다."
    },
    {
      id: "fac-04",
      name: "심진형",
      engName: "Jin-Hyung Shim, Ph.D.",
      title: "정교수 / 3D바이오프린팅연구소장",
      dept: "기계공학과",
      email: "jhshim@tukorea.ac.kr",
      lab: "생체모사 3D 바이오프린팅 연구실 (BioFab)",
      labUrl: "http://biofab.tukorea.ac.kr",
      major: "3D 바이오프린팅, 인공장기 플랫폼, 생체적합성 바이오잉크",
      image: "faculty_shim.jpg",
      badge: "국제학술지 우수 논문 연속 게재",
      papersCount: 135,
      patentsCount: 52,
      intro: "인체 세포 기반 전층 피부 모델 및 미세 혈관 네트워크 프린팅 기술을 개척하며 동물실험 대체 신약 플랫폼을 개발하고 있습니다."
    },
    {
      id: "fac-05",
      name: "박성원",
      engName: "Sung-Won Park, Ph.D.",
      title: "교수",
      dept: "국제미래공학부",
      email: "swpark@tukorea.ac.kr",
      lab: "임베디드시스템 및 미션크리티컬 SW 랩 (EMS Lab)",
      labUrl: "http://ems.tukorea.ac.kr",
      major: "실시간 운영체제(RTOS), 고가용성 결함복구, 산업용 제어 SW",
      image: "faculty_park.jpg",
      badge: "산단 연계 성과연동 기술이전",
      papersCount: 64,
      patentsCount: 19,
      intro: "단절 없는 산업용 이중화 OS 아키텍처를 개발하여 티데이트에 이전하였으며 철도 및 플랜트 제어 SW의 국산화를 이끌고 있습니다."
    },
    {
      id: "fac-06",
      name: "배유석",
      engName: "Yoo-Seok Bae, Ph.D.",
      title: "교수 / 산자부 AX허브 사업단장",
      dept: "컴퓨터공학과",
      email: "ysbae@tukorea.ac.kr",
      lab: "산업 인공지능 및 빅데이터 플랫폼 랩 (IAI Lab)",
      labUrl: "http://iai.tukorea.ac.kr",
      major: "산업 빅데이터, 제조 LLM/파운데이션 모델, 디지털 트윈",
      image: "faculty_bae.jpg",
      badge: "280억 규모 산자부 국책사업 주관",
      papersCount: 88,
      patentsCount: 24,
      intro: "총 280억 규모 반월시화형 AI 제조혁신 실증 AX 허브 구축사업단을 총괄하며 수도권 스마트산단의 디지털 대전환을 지휘하고 있습니다."
    }
  ],

  // 핵심 연구센터 및 대형 인프라
  centers: [
    {
      id: "center-01",
      name: "반월시화형 AI 제조혁신 실증 AX 허브",
      engName: "Banwol-Sihwa AI Manufacturing (AX) Hub",
      scale: "280억 원 (2024~2028년, 산업통상자원부)",
      role: "산단 입주기업 대상 AI 자율제조 실증, 로봇 현장 도입, 제조 데이터 공유 플랫폼 구축",
      location: "한국공학대학교 산학융합 R&D관 3층",
      icon: "cpu"
    },
    {
      id: "center-02",
      name: "나노반도체융합센터 (NSRC)",
      engName: "Nano-Semiconductor Convergence Research Center",
      scale: "클린룸 1,200m² 및 120여 종 첨단 반도체 공정·측정 장비 구비",
      role: "와이드갭 다이아몬드/SiC/GaN 소자 일괄 제작 및 수도권 반도체 전문인력 양성",
      location: "제2캠퍼스 미래인재관 1~2층",
      icon: "microchip"
    },
    {
      id: "center-03",
      name: "경기 반월시화 공정혁신 시뮬레이션 센터",
      engName: "Process Innovation Simulation Center",
      scale: "고성능 HPC 슈퍼컴퓨팅 클러스터 & 3D 가상 엔지니어링 랩",
      role: "중소기업 시제품 제작 전 CAE 구조·열·유동·휨 해석 지원 (비용 80% 절감)",
      location: "한국공학대 종합연구동 4층",
      icon: "monitor"
    },
    {
      id: "center-04",
      name: "3D 바이오프린팅 연구소",
      engName: "3D Bioprinting Research Institute",
      scale: "세포배양 크린벤치, 초정밀 다축 바이오프린터, 공초점 현미경",
      role: "인공피부·인공장기 모델 개발 및 바이오 헬스케어 동물실험 대체 시험기술 선도",
      location: "기계공학관 바이오신기술동",
      icon: "dna"
    },
    {
      id: "center-05",
      name: "고부가 PCB 공동연구센터",
      engName: "High-Value PCB Joint R&D Center",
      scale: "차세대 반도체 기판 및 고주파 RF 패키징 특화 장비 지원",
      role: "초미세 배선 형성, 고다층 반도체 패키지 서브스트레이트 신뢰성 검증",
      location: "산학협력관 B1",
      icon: "layers"
    }
  ],

  // 차트 시각화 데이터셋 (Chart.js용)
  chartsData: {
    fundingTrend: {
      labels: ["2021년", "2022년", "2023년", "2024년", "2025년", "2026년(E)"],
      datasets: [
        {
          label: "정부 및 지자체 국책과제 (억 원)",
          data: [610, 740, 890, 1020, 1180, 1320],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.15)",
          tension: 0.35,
          fill: true
        },
        {
          label: "민간 기업 산학공동 R&D (억 원)",
          data: [210, 260, 310, 380, 440, 510],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          tension: 0.35,
          fill: true
        }
      ]
    },
    clusterDistribution: {
      labels: [
        "차세대 반도체·패키징",
        "AI 제조혁신·로봇",
        "미래 모빌리티",
        "탄소중립·그린에너지",
        "첨단 바이오·나노"
      ],
      data: [34, 28, 16, 12, 10], // 백분율(%)
      colors: ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#ec4899"]
    },
    trlDistribution: {
      labels: ["TRL 1~3 (기초연구)", "TRL 4~5 (실험실 검증)", "TRL 6~7 (시제품 실증)", "TRL 8~9 (상용화 완료)"],
      data: [15, 38, 32, 15],
      colors: ["#64748b", "#3b82f6", "#f59e0b", "#10b981"]
    }
  },

  // 기술이전 문의 프로세스 안내
  techTransferSteps: [
    {
      step: "01",
      title: "기술 탐색 및 상담 신청",
      desc: "포털의 특허 및 연구성과 DB에서 관심 기술을 검색하고 온라인 상담을 신청합니다."
    },
    {
      step: "02",
      title: "산학협력단 전문 변리사 매칭",
      desc: "대학 TLO 전담 인력이 해당 연구 책임자 및 기업 담당자와 기술 미팅을 주선합니다."
    },
    {
      step: "03",
      title: "기술 가치평가 및 조건 협의",
      desc: "실시권 형태(전용/통상), 기술료 납부 방식(선급기술료/경상기술료) 등을 유연하게 협의합니다."
    },
    {
      step: "04",
      title: "협약 체결 및 후속 R&D 지원",
      desc: "기술이전 계약 체결 후 정부 상용화 R&D 및 대학 보유 공용장비 활용을 후속 지원합니다."
    }
  ],

  // 최근 R&D 뉴스 및 공지사항
  news: [
    {
      id: "news-1",
      date: "2026.11.02",
      category: "연구성과",
      title: "나노반도체공학과 남옥현 교수 연구팀, APWS 2026 기조 강연 및 다이아몬드 소자 성과 발표",
      badge: "HOT"
    },
    {
      id: "news-2",
      date: "2026.10.28",
      category: "국책사업",
      title: "산자부 반월시화형 AX 허브 사업단, 2차년도 참여 제조기업 50개사 모집 공고",
      badge: "모집중"
    },
    {
      id: "news-3",
      date: "2026.09.15",
      category: "기술이전",
      title: "한국공학대-광학 전문기업 브라이튼코퍼레이션, 1.8억 원 규모 기술이전 계약 성료",
      badge: "성과"
    },
    {
      id: "news-4",
      date: "2026.08.20",
      category: "수상",
      title: "메카트로닉스공학부 김효영 교수, 2026년도 대한기계학회 최고 권위 '백암논문상' 영예",
      badge: "수상"
    }
  ]
};

// 브라우저 전역 노출
window.TUK_DATA = TUK_DATA;
