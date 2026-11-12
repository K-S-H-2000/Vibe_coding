/**
 * 한국공학대학교 (TUKOREA) R&D 혁신 포털
 * 데이터 시각화 차트 컨트롤러 (Chart.js 연동)
 */

const TukCharts = {
  fundingChartInstance: null,
  clusterChartInstance: null,
  trlChartInstance: null,

  // 차트 테마 설정 (다크/라이트 모드 반응)
  getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    return {
      textColor: isDark ? '#94a3b8' : '#475569',
      gridColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
      tooltipBg: isDark ? '#1e293b' : '#ffffff',
      tooltipText: isDark ? '#f8fafc' : '#0f172a',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    };
  },

  // 전체 차트 초기화
  initAll() {
    if (typeof Chart === 'undefined') {
      console.warn("Chart.js is not loaded yet. Retrying in 500ms...");
      setTimeout(() => this.initAll(), 500);
      return;
    }

    this.renderFundingChart();
    this.renderClusterChart();
    this.renderTrlChart();
  },

  // 1. 연도별 연구비 수주 추이 라인 차트
  renderFundingChart() {
    const canvas = document.getElementById('fundingChart');
    if (!canvas) return;

    if (this.fundingChartInstance) {
      this.fundingChartInstance.destroy();
    }

    const theme = this.getThemeColors();
    const data = TUK_DATA.chartsData.fundingTrend;

    const ctx = canvas.getContext('2d');
    this.fundingChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: data.datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: theme.textColor,
              font: { family: 'Pretendard', size: 12, weight: '500' },
              usePointStyle: true,
              boxWidth: 8
            }
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleColor: theme.tooltipText,
            bodyColor: theme.tooltipText,
            borderColor: theme.borderColor,
            borderWidth: 1,
            padding: 10,
            boxPadding: 4,
            usePointStyle: true
          }
        },
        scales: {
          x: {
            grid: { color: theme.gridColor },
            ticks: { color: theme.textColor, font: { family: 'Pretendard' } }
          },
          y: {
            grid: { color: theme.gridColor },
            ticks: {
              color: theme.textColor,
              font: { family: 'Pretendard' },
              callback: (val) => val + '억'
            }
          }
        }
      }
    });
  },

  // 2. 5대 첨단 클러스터별 비중 도넛 차트
  renderClusterChart() {
    const canvas = document.getElementById('clusterChart');
    if (!canvas) return;

    if (this.clusterChartInstance) {
      this.clusterChartInstance.destroy();
    }

    const theme = this.getThemeColors();
    const cluster = TUK_DATA.chartsData.clusterDistribution;

    const ctx = canvas.getContext('2d');
    this.clusterChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: cluster.labels,
        datasets: [{
          data: cluster.data,
          backgroundColor: cluster.colors,
          borderColor: document.documentElement.getAttribute('data-theme') === 'light' ? '#ffffff' : '#111827',
          borderWidth: 2,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: theme.textColor,
              font: { family: 'Pretendard', size: 11 },
              usePointStyle: true,
              boxWidth: 8,
              padding: 12
            }
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleColor: theme.tooltipText,
            bodyColor: theme.tooltipText,
            callbacks: {
              label: (item) => ` ${item.label}: ${item.raw}%`
            }
          }
        }
      }
    });
  },

  // 3. 기술성숙도(TRL) 단계별 분포 가로 막대 차트
  renderTrlChart() {
    const canvas = document.getElementById('trlChart');
    if (!canvas) return;

    if (this.trlChartInstance) {
      this.trlChartInstance.destroy();
    }

    const theme = this.getThemeColors();
    const trl = TUK_DATA.chartsData.trlDistribution;

    const ctx = canvas.getContext('2d');
    this.trlChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: trl.labels,
        datasets: [{
          label: '기술 비중 (%)',
          data: trl.data,
          backgroundColor: trl.colors,
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleColor: theme.tooltipText,
            bodyColor: theme.tooltipText,
            callbacks: {
              label: (item) => ` 전체 기술 중 ${item.raw}% 비중`
            }
          }
        },
        scales: {
          x: {
            grid: { color: theme.gridColor },
            ticks: {
              color: theme.textColor,
              callback: (val) => val + '%'
            },
            max: 50
          },
          y: {
            grid: { display: false },
            ticks: { color: theme.textColor, font: { family: 'Pretendard', size: 12 } }
          }
        }
      }
    });
  },

  // 테마 변경 시 차트 다시 렌더링
  updateTheme() {
    this.renderFundingChart();
    this.renderClusterChart();
    this.renderTrlChart();
  }
};

window.TukCharts = TukCharts;
