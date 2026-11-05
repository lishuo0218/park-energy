// assets/charts.js — 中国园区智慧能源管理行业深度研究报告（滚动进入视口时渲染）
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();

  // --- Mermaid 流程图（图 6 / 图 7）---
  if (typeof mermaid !== 'undefined' && document.querySelector('pre.mermaid')) {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      flowchart: { htmlLabels: true, curve: 'basis', nodeSpacing: 40, rankSpacing: 46 }
    });
  }

  var axisTxt = { color: muted, fontSize: 12 };
  function baseAxis(data) {
    return { type: 'category', data: data, axisLine: { lineStyle: { color: rule } }, axisTick: { show: false }, axisLabel: axisTxt };
  }
  function baseGrid(top) { return { top: top || 40, left: 12, right: 20, bottom: 12, containLabel: true }; }
  function tip(extra) {
    return Object.assign({ trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow', lineStyle: { color: rule } } }, extra || {});
  }
  function topLabel(color, weight) {
    return { show: true, position: 'top', color: color || muted, fontSize: 11, fontWeight: weight || 600 };
  }

  // ---- 各图表配置 ----
  var builds = {

    // 图1 多口径市场规模对比
    'chart-scope': function () {
      var scopes = ['园区智慧化投资\n(CCID)', '智慧能源管理系统\n大口径(博研)', '智慧能源管理系统\n大口径(智联云)', '智慧能源管理系统\n窄口径(VMR≈)', '智慧能源管理平台\n(博研)', '工厂EMS\n(博研)'];
      return {
        animation: false,
        tooltip: tip(),
        grid: baseGrid(46),
        legend: { data: ['2024', '2025'], textStyle: axisTxt, top: 6 },
        xAxis: baseAxis(scopes),
        yAxis: { type: 'value', name: '亿元', nameTextStyle: axisTxt, axisLabel: axisTxt, splitLine: { lineStyle: { color: rule } } },
        series: [
          { name: '2024', type: 'bar', barMaxWidth: 34, itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }, label: topLabel(), data: [1770, 1376.5, 1237.6, 533, 409.7, 147.3] },
          { name: '2025', type: 'bar', barMaxWidth: 34, itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] }, label: topLabel(), data: [1901, 1628.4, null, 596, 486.3, null] }
        ]
      };
    },

    // 图2 综合能源服务潜力区间
    'chart-ceps': function () {
      return {
        animation: false,
        tooltip: tip({ valueFormatter: function (v) { return v + ' 亿元'; } }),
        grid: baseGrid(46),
        legend: { data: ['区间下限', '区间上限'], textStyle: axisTxt, top: 6 },
        xAxis: baseAxis(['2025年\n(快速成长期)', '2035年\n(成熟期)']),
        yAxis: { type: 'value', name: '亿元', nameTextStyle: axisTxt, axisLabel: axisTxt, splitLine: { lineStyle: { color: rule } } },
        series: [
          { name: '区间下限', type: 'bar', barMaxWidth: 60, itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }, label: topLabel(ink, 600), data: [8000, 13000] },
          { name: '区间上限', type: 'bar', barMaxWidth: 60, itemStyle: { color: accent2 + 'cc', borderRadius: [4, 4, 0, 0] }, label: topLabel(ink, 600), data: [12000, 18000] }
        ]
      };
    },

    // 图3 渗透率
    'chart-penetration': function () {
      return {
        animation: false,
        tooltip: tip({ valueFormatter: function (v) { return v + ' %'; } }),
        grid: baseGrid(36),
        xAxis: baseAxis(['2023', '2025']),
        yAxis: { type: 'value', min: 0, max: 50, axisLabel: { color: muted, fontSize: 12, formatter: '{value}%' }, splitLine: { lineStyle: { color: rule } } },
        series: [{
          name: '规上工业企业能源管理软件部署率', type: 'bar', barMaxWidth: 70,
          itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
          label: { show: true, position: 'top', color: ink, fontWeight: 700, formatter: '{c}%' },
          data: [26.1, 34.6]
        }]
      };
    },

    // 图4 虚拟电厂调节能力
    'chart-vpp': function () {
      return {
        animation: false,
        tooltip: tip({ valueFormatter: function (v) { return v + ' 万千瓦'; } }),
        grid: baseGrid(36),
        xAxis: baseAxis(['2027年目标', '2030年目标', '2026年调节潜力(参考)']),
        yAxis: { type: 'value', name: '万千瓦', nameTextStyle: axisTxt, axisLabel: axisTxt, splitLine: { lineStyle: { color: rule } } },
        series: [{
          type: 'bar', barMaxWidth: 64,
          itemStyle: { color: function (p) { return p.dataIndex === 2 ? muted : accent; }, borderRadius: [4, 4, 0, 0] },
          label: { show: true, position: 'top', color: ink, fontWeight: 700 },
          data: [2000, 5000, 30000]
        }]
      };
    },

    // 图5 技术成熟度（横向条形，定性评分）
    'chart-maturity': function () {
      var items = [
        { n: '智能计量与高频采集', v: 4.5 },
        { n: '在线监测与分项归集', v: 4.0 },
        { n: '能耗异常检测与归因诊断', v: 3.2 },
        { n: '能碳平台与报告披露', v: 3.5 },
        { n: '能效优化与需求响应', v: 2.8 },
        { n: '虚拟电厂聚合与市场交易', v: 2.4 },
        { n: 'AI 大模型辅助决策（负荷预测/诊断）', v: 2.2 },
        { n: 'AI 自主控制与自动交易', v: 1.3 }
      ];
      return {
        animation: false,
        tooltip: { trigger: 'item', appendToBody: true, formatter: function (p) { return p.name + '：' + p.value + ' / 5（定性）'; } },
        grid: { top: 14, left: 12, right: 56, bottom: 10, containLabel: true },
        xAxis: { type: 'value', min: 0, max: 5, axisLabel: { color: muted, fontSize: 12 }, splitLine: { lineStyle: { color: rule } } },
        yAxis: { type: 'category', inverse: true, data: items.map(function (d) { return d.n; }), axisLine: { lineStyle: { color: rule } }, axisTick: { show: false }, axisLabel: { color: ink, fontSize: 12 } },
        series: [{
          type: 'bar', barMaxWidth: 20,
          itemStyle: { color: function (p) { return p.value >= 4 ? accent : (p.value >= 2.5 ? accent2 : muted); }, borderRadius: [0, 4, 4, 0] },
          label: { show: true, position: 'right', color: ink, fontWeight: 700, formatter: function (p) { return p.value.toFixed(1); } },
          data: items.map(function (d) { return d.v; })
        }]
      };
    }
  };

  // ---- 滚动触发渲染 ----
  function initChart(id) {
    var el = document.getElementById(id);
    if (!el || el.__done) return;
    el.__done = true;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    chart.setOption(builds[id]());
    window.addEventListener('resize', function () { chart.resize(); });
  }

  var ids = Object.keys(builds);
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          initChart(e.target.id);
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px 140px 0px', threshold: 0.05 });
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  } else {
    ids.forEach(initChart);
  }
})();
