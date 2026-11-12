/**
 * 한국공학대학교 (TUKOREA) R&D 혁신 포털
 * 핵심 애플리케이션 로직 (UI, 검색, 필터링, 모달, 북마크, 로컬스토리지)
 */

const AppState = {
  lang: localStorage.getItem('tuk_portal_lang') || 'ko',
  theme: localStorage.getItem('tuk_portal_theme') || 'dark',
  clusterFilter: 'all',
  trlFilter: 'all',
  searchQuery: '',
  activeTab: 'research',
  bookmarks: JSON.parse(localStorage.getItem('tuk_portal_bookmarks') || '[]'),
  inquiries: JSON.parse(localStorage.getItem('tuk_portal_inquiries') || '[]')
};

const TukApp = {
  // 앱 초기화
  init() {
    this.applyTheme(AppState.theme);
    this.bindEvents();
    this.renderAll();
    
    // Lucide Icons 초기화
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Chart.js 로드 후 차트 초기화
    setTimeout(() => {
      if (window.TukCharts) {
        window.TukCharts.initAll();
      }
    }, 200);

    // 저장된 북마크 수 배지 업데이트
    this.updateBookmarkBadge();
  },

  // 전체 화면 렌더링
  renderAll() {
    this.renderMetrics();
    this.renderClusterTabs();
    this.renderResearchCards();
    this.renderPatents();
    this.renderFaculty();
    this.renderCenters();
    this.renderNews();
    this.updateLanguageTexts();
  },

  // 1. 핵심 성과 지표 (Hero Metrics) 렌더링
  renderMetrics() {
    const container = document.getElementById('metricsContainer');
    if (!container) return;

    const isKo = AppState.lang === 'ko';
    container.innerHTML = TUK_DATA.metrics.map(m => `
      <div class="metric-card glass-panel" data-metric-id="${m.id}">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
            ${m.change}
          </span>
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <i data-lucide="${m.icon}" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="flex items-baseline gap-1.5">
          <span class="text-3xl lg:text-4xl font-extrabold tracking-tight text-white metric-counter" data-target="${m.value}">0</span>
          <span class="text-sm font-semibold text-sky-300">${isKo ? m.suffix.ko : m.suffix.en}</span>
        </div>
        <p class="text-sm text-slate-400 mt-2 font-medium">${isKo ? m.label.ko : m.label.en}</p>
      </div>
    `).join('');

    this.animateCounters();
    if (window.lucide) window.lucide.createIcons();
  },

  // 숫자 카운트업 애니메이션
  animateCounters() {
    const counters = document.querySelectorAll('.metric-counter');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 45));
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.innerText = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.innerText = count.toLocaleString();
        }
      }, 25);
    });
  },

  // 2. 5대 핵심 클러스터 탭 필터 렌더링
  renderClusterTabs() {
    const container = document.getElementById('clusterFilterTabs');
    if (!container) return;

    const isKo = AppState.lang === 'ko';
    container.innerHTML = TUK_DATA.clusters.map(c => `
      <button 
        class="filter-pill ${AppState.clusterFilter === c.id ? 'active' : ''}" 
        data-cluster="${c.id}"
        onclick="TukApp.setClusterFilter('${c.id}')"
      >
        <i data-lucide="${c.icon}" class="w-4 h-4"></i>
        <span>${isKo ? c.name.ko : c.name.en}</span>
      </button>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  // 클러스터 필터 변경
  setClusterFilter(clusterId) {
    AppState.clusterFilter = clusterId;
    this.renderClusterTabs();
    this.renderResearchCards();
    this.renderPatents();
  },

  // TRL 레벨 필터 변경
  setTrlFilter(trlVal) {
    AppState.trlFilter = trlVal;
    document.querySelectorAll('.trl-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-trl') === trlVal);
    });
    this.renderResearchCards();
  },

  // 3. 최신 연구 성과 카드 렌더링
  renderResearchCards() {
    const container = document.getElementById('researchGrid');
    if (!container) return;

    const isKo = AppState.lang === 'ko';
    const query = AppState.searchQuery.toLowerCase().trim();

    // 필터링 적용
    const filtered = TUK_DATA.researchItems.filter(item => {
      // 클러스터 필터
      if (AppState.clusterFilter !== 'all' && item.clusterId !== AppState.clusterFilter) {
        return false;
      }
      // TRL 필터
      if (AppState.trlFilter !== 'all') {
        const trl = item.trl;
        if (AppState.trlFilter === 'basic' && trl > 3) return false;
        if (AppState.trlFilter === 'applied' && (trl < 4 || trl > 5)) return false;
        if (AppState.trlFilter === 'pilot' && (trl < 6 || trl > 7)) return false;
        if (AppState.trlFilter === 'commercial' && trl < 8) return false;
      }
      // 검색어 필터
      if (query) {
        const titleKo = item.title.ko.toLowerCase();
        const titleEn = item.title.en.toLowerCase();
        const lead = item.leadResearcher.name.toLowerCase();
        const summary = item.summary.ko.toLowerCase();
        const tags = item.tags.join(' ').toLowerCase();
        return titleKo.includes(query) || titleEn.includes(query) || lead.includes(query) || summary.includes(query) || tags.includes(query);
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500">
            <i data-lucide="search-x" class="w-8 h-8"></i>
          </div>
          <p class="text-lg font-medium text-slate-300">조건에 맞는 연구 성과가 없습니다.</p>
          <p class="text-sm text-slate-500 mt-1">검색어나 선택한 필터를 조정해 보세요.</p>
          <button onclick="TukApp.resetFilters()" class="mt-4 px-4 py-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 text-sm hover:bg-sky-500/20">
            필터 초기화
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map(item => {
      const isBookmarked = AppState.bookmarks.includes(item.id);
      const clusterObj = TUK_DATA.clusters.find(c => c.id === item.clusterId);
      const clusterName = isKo ? clusterObj?.name.ko : clusterObj?.name.en;

      return `
        <div class="glass-card flex flex-col justify-between p-6 relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/15 transition-all"></div>
          
          <div>
            <!-- Header Tags -->
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-xs font-semibold px-2.5 py-1 rounded-md ${clusterObj?.bgClass || 'bg-slate-700 text-slate-300'} flex items-center gap-1.5">
                <i data-lucide="${clusterObj?.icon || 'tag'}" class="w-3.5 h-3.5"></i>
                ${clusterName}
              </span>
              <div class="flex items-center gap-2">
                <span class="trl-badge trl-${item.trl}">TRL ${item.trl}</span>
                <button 
                  onclick="TukApp.toggleBookmark('${item.id}', event)" 
                  class="p-1.5 rounded-lg hover:bg-slate-700/60 transition-colors ${isBookmarked ? 'text-amber-400' : 'text-slate-400'}"
                  title="${isBookmarked ? '보관함에서 제거' : '보관함에 저장'}"
                >
                  <i data-lucide="bookmark" class="w-4 h-4 ${isBookmarked ? 'fill-current' : ''}"></i>
                </button>
              </div>
            </div>

            <!-- Title -->
            <h3 class="text-lg font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2 mb-2">
              ${isKo ? item.title.ko : item.title.en}
            </h3>

            <!-- Summary -->
            <p class="text-sm text-slate-400 line-clamp-3 mb-4 leading-relaxed">
              ${isKo ? item.summary.ko : item.summary.en}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              ${item.tags.map(t => `
                <span class="text-xs px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">#${t}</span>
              `).join('')}
            </div>
          </div>

          <!-- Footer Info & Actions -->
          <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                ${item.leadResearcher.name.slice(0, 1)}
              </div>
              <div>
                <p class="text-xs font-semibold text-slate-200">${item.leadResearcher.name}</p>
                <p class="text-[11px] text-slate-500">${item.leadResearcher.dept}</p>
              </div>
            </div>

            <button 
              onclick="TukApp.openResearchModal('${item.id}')"
              class="px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              상세보기
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  // 4. 특허 & 기술이전 마켓플레이스 렌더링
  renderPatents() {
    const container = document.getElementById('patentsTableBody');
    if (!container) return;

    const filtered = TUK_DATA.patents.filter(p => {
      if (AppState.clusterFilter !== 'all' && p.cluster !== AppState.clusterFilter) {
        return false;
      }
      return true;
    });

    container.innerHTML = filtered.map(p => {
      const isAvailable = p.statusType === 'available';
      const clusterObj = TUK_DATA.clusters.find(c => c.id === p.cluster);

      return `
        <tr class="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors">
          <td class="py-4 px-4">
            <span class="text-xs font-mono text-slate-400">${p.regNo}</span>
            <div class="font-bold text-white text-sm mt-0.5 flex items-center gap-2">
              ${p.title}
              ${p.featured ? '<span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">추천</span>' : ''}
            </div>
            <p class="text-xs text-slate-400 mt-1 line-clamp-1">${p.highlights}</p>
          </td>
          <td class="py-4 px-4 whitespace-nowrap">
            <span class="text-xs px-2 py-1 rounded ${clusterObj?.bgClass || 'bg-slate-800 text-slate-300'}">
              ${clusterObj?.name.ko || p.cluster}
            </span>
          </td>
          <td class="py-4 px-4 whitespace-nowrap">
            <span class="trl-badge trl-${p.trl}">TRL ${p.trl}</span>
          </td>
          <td class="py-4 px-4 whitespace-nowrap">
            <p class="text-xs font-medium text-slate-300">${p.inventor}</p>
          </td>
          <td class="py-4 px-4 whitespace-nowrap">
            <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${isAvailable ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700/50 text-slate-400'}">
              <span class="w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-400' : 'bg-slate-400'}"></span>
              ${p.status}
            </span>
          </td>
          <td class="py-4 px-4 whitespace-nowrap text-right">
            <button 
              onclick="TukApp.openTechTransferModal('${p.id}')"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold ${isAvailable ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'} transition-all"
            >
              ${isAvailable ? '상담 신청' : '사례 보기'}
            </button>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  // 5. 우수 연구자 & 랩 프로필 카드 렌더링
  renderFaculty() {
    const container = document.getElementById('facultyGrid');
    if (!container) return;

    container.innerHTML = TUK_DATA.faculty.map(fac => `
      <div class="glass-card p-6 flex flex-col justify-between group">
        <div>
          <div class="flex items-start gap-4 mb-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              ${fac.name.slice(0, 1)}
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-white text-base group-hover:text-sky-400 transition-colors">${fac.name} 교수</h4>
                <span class="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  ${fac.badge}
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">${fac.dept} · ${fac.title}</p>
              <p class="text-xs text-sky-400 mt-1 font-mono">${fac.email}</p>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-4">
            <p class="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <i data-lucide="flask-conical" class="w-3.5 h-3.5 text-sky-400"></i>
              ${fac.lab}
            </p>
            <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">${fac.major}</p>
          </div>

          <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            ${fac.intro}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div class="flex items-center gap-3">
            <span>논문 <b>${fac.papersCount}</b>편</span>
            <span>특허 <b>${fac.patentsCount}</b>건</span>
          </div>
          <button 
            onclick="TukApp.openContactFacultyModal('${fac.id}')"
            class="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
          >
            산학 R&D 문의
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  // 6. 핵심 연구센터 및 대형 인프라 렌더링
  renderCenters() {
    const container = document.getElementById('centersGrid');
    if (!container) return;

    container.innerHTML = TUK_DATA.centers.map(c => `
      <div class="glass-card p-6 border-l-4 border-l-sky-500 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-sky-400 tracking-wider font-mono">${c.location}</span>
            <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">${c.scale}</span>
          </div>
          <h4 class="text-base font-bold text-white mb-2">${c.name}</h4>
          <p class="text-xs text-slate-400 leading-relaxed mb-4">${c.role}</p>
        </div>
        <div class="flex items-center justify-between text-xs pt-3 border-t border-slate-800/80">
          <span class="text-slate-500 font-mono">${c.engName}</span>
          <button 
            onclick="TukApp.showToast('${c.name} 공용장비 및 센터 이용 문의가 접수 가능합니다.')"
            class="text-sky-400 hover:underline font-medium"
          >
            센터 장비 문의
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  // 7. 최근 뉴스 및 공지 렌더링
  renderNews() {
    const container = document.getElementById('newsList');
    if (!container) return;

    container.innerHTML = TUK_DATA.news.map(n => `
      <div class="flex items-center justify-between py-3 border-b border-slate-800/60 hover:bg-slate-800/20 px-2 rounded-lg transition-colors cursor-pointer" onclick="TukApp.showToast('공지 상세: ${n.title}')">
        <div class="flex items-center gap-3">
          <span class="text-xs font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
            ${n.badge}
          </span>
          <span class="text-sm text-slate-200 hover:text-sky-400 transition-colors font-medium line-clamp-1">
            ${n.title}
          </span>
        </div>
        <span class="text-xs font-mono text-slate-500 whitespace-nowrap ml-4">${n.date}</span>
      </div>
    `).join('');
  },

  // 모달 1: 연구 성과 상세 보기 팝업
  openResearchModal(id) {
    const item = TUK_DATA.researchItems.find(r => r.id === id);
    if (!item) return;

    const isKo = AppState.lang === 'ko';
    const clusterObj = TUK_DATA.clusters.find(c => c.id === item.clusterId);
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('modalBody');

    // TRL 트랙 시각화 (1~9단계)
    let trlTrackHtml = '';
    for (let i = 1; i <= 9; i++) {
      const active = i <= item.trl ? 'active' : '';
      trlTrackHtml += `<div class="trl-step-item ${active}" title="TRL ${i}"></div>`;
    }

    content.innerHTML = `
      <div class="p-6 md:p-8">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold px-2.5 py-1 rounded-md ${clusterObj?.bgClass || 'bg-slate-700 text-slate-300'}">
              ${isKo ? clusterObj?.name.ko : clusterObj?.name.en}
            </span>
            <span class="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">${item.date}</span>
          </div>
          <button onclick="TukApp.closeModal('detailModal')" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-bold text-white mb-2 leading-tight">
          ${isKo ? item.title.ko : item.title.en}
        </h2>
        <p class="text-sm text-sky-400 font-mono mb-6">${item.journal}</p>

        <!-- Researcher Profile Banner -->
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              ${item.leadResearcher.name.slice(0, 1)}
            </div>
            <div>
              <p class="font-bold text-white text-base">${item.leadResearcher.name} <span class="text-xs font-normal text-slate-400">(${item.leadResearcher.title})</span></p>
              <p class="text-xs text-slate-400">${item.leadResearcher.dept} · ${item.leadResearcher.lab}</p>
            </div>
          </div>
          <button 
            onclick="TukApp.openContactFacultyModal('${item.id}')"
            class="px-3.5 py-1.5 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 text-xs font-semibold border border-sky-500/30"
          >
            연구팀 문의
          </button>
        </div>

        <!-- TRL Gauge -->
        <div class="mb-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <i data-lucide="gauge" class="w-4 h-4 text-emerald-400"></i>
              기술성숙도 (TRL 단계): <b>Level ${item.trl}</b> / 9
            </span>
            <span class="text-xs text-emerald-400 font-medium">${item.status}</span>
          </div>
          <div class="trl-step-track">
            ${trlTrackHtml}
          </div>
          <div class="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>TRL 1 (기초이론)</span>
            <span>TRL 5 (실험실검증)</span>
            <span>TRL 7 (시제품실증)</span>
            <span>TRL 9 (사업화완료)</span>
          </div>
        </div>

        <!-- Abstract & Highlights -->
        <div class="space-y-4 mb-6">
          <div>
            <h4 class="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <i data-lucide="file-text" class="w-4 h-4 text-sky-400"></i>
              연구 개요 (Abstract)
            </h4>
            <p class="text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
              ${isKo ? item.summary.ko : item.summary.en}
            </p>
          </div>

          <div>
            <h4 class="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <i data-lucide="sparkles" class="w-4 h-4 text-amber-400"></i>
              핵심 혁신점 (Key Breakthroughs)
            </h4>
            <ul class="space-y-2">
              ${item.highlights.map(h => `
                <li class="flex items-start gap-2 text-sm text-slate-300">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                  <span>${h}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <i data-lucide="factory" class="w-4 h-4 text-indigo-400"></i>
              적용 가능 산업 분야 (Applications)
            </h4>
            <p class="text-sm text-slate-300 p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              ${item.applications}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="pt-5 border-t border-slate-800 flex items-center justify-between gap-3">
          <button 
            onclick="TukApp.printResearchReport('${item.id}')"
            class="btn-secondary text-xs"
          >
            <i data-lucide="printer" class="w-4 h-4"></i>
            성과 요약서 인쇄/PDF
          </button>
          <div class="flex items-center gap-3">
            <button 
              onclick="TukApp.toggleBookmark('${item.id}', event)"
              class="btn-secondary text-xs"
            >
              <i data-lucide="bookmark" class="w-4 h-4"></i>
              ${AppState.bookmarks.includes(item.id) ? '보관함 취소' : '보관함 저장'}
            </button>
            <button 
              onclick="TukApp.openTechTransferModal('${item.id}')"
              class="btn-primary text-xs"
            >
              <i data-lucide="send" class="w-4 h-4"></i>
              기술이전 / 공동 R&D 신청
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  },

  // 모달 2: 기술이전 & 산학 R&D 상담 신청 모달
  openTechTransferModal(refId) {
    const modal = document.getElementById('inquiryModal');
    const content = document.getElementById('inquiryModalBody');

    // 관련 아이템 정보 조회 (연구성과 or 특허)
    const research = TUK_DATA.researchItems.find(r => r.id === refId);
    const patent = TUK_DATA.patents.find(p => p.id === refId);
    const refTitle = research ? research.title.ko : (patent ? patent.title : '기술이전 및 산학공동 연구 상담');

    content.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
          <div>
            <h3 class="text-xl font-bold text-white flex items-center gap-2">
              <i data-lucide="briefcase" class="w-5 h-5 text-sky-400"></i>
              기술이전 & 산학공동 R&D 상담 신청
            </h3>
            <p class="text-xs text-slate-400 mt-1">한국공학대학교 산학협력단(IACF) 전문 매니저가 24시간 이내 연락드립니다.</p>
          </div>
          <button onclick="TukApp.closeModal('inquiryModal')" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form id="techInquiryForm" onsubmit="TukApp.submitInquiry(event, '${refId}')" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">상담 희망 대상 기술</label>
            <input 
              type="text" 
              value="${refTitle}" 
              readonly 
              class="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-sky-400 font-medium focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">기업명 / 소속 기관 <span class="text-rose-400">*</span></label>
              <input 
                type="text" 
                name="company" 
                required 
                placeholder="예: (주)테크솔루션" 
                class="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">담당자 성함 / 직함 <span class="text-rose-400">*</span></label>
              <input 
                type="text" 
                name="person" 
                required 
                placeholder="예: 홍길동 연구소장" 
                class="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">연락처 <span class="text-rose-400">*</span></label>
              <input 
                type="tel" 
                name="phone" 
                required 
                placeholder="010-0000-0000" 
                class="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">이메일 <span class="text-rose-400">*</span></label>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="contact@company.com" 
                class="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">희망 협력 유형</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <label class="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-sky-500">
                <input type="radio" name="coopType" value="기술이전(실시권)" checked class="text-sky-500" />
                기술이전(실시권)
              </label>
              <label class="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-sky-500">
                <input type="radio" name="coopType" value="특허 양도" class="text-sky-500" />
                특허 양도
              </label>
              <label class="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-sky-500">
                <input type="radio" name="coopType" value="산학공동 R&D" class="text-sky-500" />
                산학공동 R&D
              </label>
              <label class="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-sky-500">
                <input type="radio" name="coopType" value="공용장비/기술지도" class="text-sky-500" />
                공용장비/지도
              </label>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">구체적인 협력 요구사항 및 검토 배경</label>
            <textarea 
              name="message" 
              rows="3" 
              placeholder="자사 적용 계획, 양산 목표 시기, 희망 상담 일정 등을 자유롭게 기재해 주세요." 
              class="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:border-sky-500 focus:outline-none resize-none"
            ></textarea>
          </div>

          <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span class="text-xs text-slate-400">개인정보 및 기술상담 내용은 보호됩니다.</span>
            <div class="flex gap-2">
              <button type="button" onclick="TukApp.closeModal('inquiryModal')" class="btn-secondary text-xs">취소</button>
              <button type="submit" class="btn-primary text-xs">
                <i data-lucide="check" class="w-4 h-4"></i>
                상담 접수 완료
              </button>
            </div>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  },

  // 상담 신청 제출 핸들러
  submitInquiry(e, refId) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const inquiry = {
      id: 'INQ-' + Date.now(),
      refId: refId,
      company: formData.get('company'),
      person: formData.get('person'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      coopType: formData.get('coopType'),
      message: formData.get('message'),
      date: new Date().toISOString().split('T')[0],
      status: '접수완료 (산학협력단 배정중)'
    };

    AppState.inquiries.push(inquiry);
    localStorage.setItem('tuk_portal_inquiries', JSON.stringify(AppState.inquiries));

    this.closeModal('inquiryModal');
    this.showToast(`상담 신청 접수가 완료되었습니다. (접수번호: ${inquiry.id})`);
  },

  // 모달 3: 보관함 (Bookmarks) 모달
  openBookmarksModal() {
    const modal = document.getElementById('bookmarksModal');
    const content = document.getElementById('bookmarksModalBody');

    const bookmarkedItems = TUK_DATA.researchItems.filter(r => AppState.bookmarks.includes(r.id));

    content.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <i data-lucide="bookmark" class="w-6 h-6 text-amber-400 fill-current"></i>
            <h3 class="text-xl font-bold text-white">나의 스크랩 보관함 (${bookmarkedItems.length})</h3>
          </div>
          <button onclick="TukApp.closeModal('bookmarksModal')" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        ${bookmarkedItems.length === 0 ? `
          <div class="py-12 text-center text-slate-400">
            <i data-lucide="bookmark-x" class="w-12 h-12 mx-auto mb-3 text-slate-600"></i>
            <p class="text-base text-slate-300 font-medium">보관함에 저장된 연구 성과가 없습니다.</p>
            <p class="text-xs text-slate-500 mt-1">연구 카드 우측 상단의 북마크 아이콘을 클릭하여 관심 기술을 보관해 보세요.</p>
          </div>
        ` : `
          <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            ${bookmarkedItems.map(item => `
              <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4 hover:border-sky-500/40 transition-colors">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="trl-badge trl-${item.trl}">TRL ${item.trl}</span>
                    <span class="text-xs text-slate-400 font-mono">${item.leadResearcher.name} (${item.leadResearcher.dept})</span>
                  </div>
                  <h4 class="text-sm font-bold text-white hover:text-sky-400 cursor-pointer" onclick="TukApp.closeModal('bookmarksModal'); TukApp.openResearchModal('${item.id}');">
                    ${item.title.ko}
                  </h4>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  <button 
                    onclick="TukApp.closeModal('bookmarksModal'); TukApp.openTechTransferModal('${item.id}')"
                    class="btn-primary text-xs py-1.5 px-3"
                  >
                    상담신청
                  </button>
                  <button 
                    onclick="TukApp.toggleBookmark('${item.id}', event); TukApp.openBookmarksModal();"
                    class="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                    title="삭제"
                  >
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    modal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  },

  // 북마크 토글
  toggleBookmark(id, event) {
    if (event) event.stopPropagation();

    const index = AppState.bookmarks.indexOf(id);
    if (index > -1) {
      AppState.bookmarks.splice(index, 1);
      this.showToast('보관함에서 제거되었습니다.');
    } else {
      AppState.bookmarks.push(id);
      this.showToast('보관함에 저장되었습니다.');
    }

    localStorage.setItem('tuk_portal_bookmarks', JSON.stringify(AppState.bookmarks));
    this.updateBookmarkBadge();
    this.renderResearchCards();
  },

  // 북마크 배지 업데이트
  updateBookmarkBadge() {
    const badge = document.getElementById('bookmarkCountBadge');
    if (badge) {
      badge.innerText = AppState.bookmarks.length;
      badge.style.display = AppState.bookmarks.length > 0 ? 'inline-flex' : 'none';
    }
  },

  // 모달 닫기
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  },

  // 인쇄 및 요약서 PDF 출력
  printResearchReport(id) {
    window.print();
  },

  // 테마 토글 (Dark / Light)
  toggleTheme() {
    const newTheme = AppState.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  },

  applyTheme(theme) {
    AppState.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tuk_portal_theme', theme);

    const icon = document.getElementById('themeToggleIcon');
    if (icon) {
      icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      if (window.lucide) window.lucide.createIcons();
    }

    // Chart.js 테마 업데이트
    if (window.TukCharts) {
      window.TukCharts.updateTheme();
    }
  },

  // 언어 토글 (KO / EN)
  toggleLanguage() {
    AppState.lang = AppState.lang === 'ko' ? 'en' : 'ko';
    localStorage.setItem('tuk_portal_lang', AppState.lang);
    this.renderAll();
    this.showToast(AppState.lang === 'ko' ? '한국어로 전환되었습니다.' : 'Switched to English.');
  },

  updateLanguageTexts() {
    const langBtn = document.getElementById('langToggleText');
    if (langBtn) langBtn.innerText = AppState.lang === 'ko' ? 'EN' : 'KO';
  },

  // 토스트 메시지 표시
  showToast(msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i data-lucide="info" class="w-4 h-4 text-sky-400"></i>
      <span class="flex-1">${msg}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  // 필터 초기화
  resetFilters() {
    AppState.clusterFilter = 'all';
    AppState.trlFilter = 'all';
    AppState.searchQuery = '';
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) searchInput.value = '';
    this.renderClusterTabs();
    this.renderResearchCards();
  },

  // 이벤트 바인딩
  bindEvents() {
    // 실시간 검색
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        AppState.searchQuery = e.target.value;
        this.renderResearchCards();
      });
    }

    // ESC 키로 모달 닫기
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
      }
      // Ctrl+K 로 검색 포커스
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput?.focus();
      }
    });

    // 배경 클릭 시 모달 닫기
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });
  }
};

// DOM 준비 완료 시 실행
document.addEventListener('DOMContentLoaded', () => {
  TukApp.init();
});

window.TukApp = TukApp;
