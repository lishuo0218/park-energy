# park-energy · 园区能耗与异常定位

园区能耗数据分析与异常定位项目：围绕电表倍率/归属治理、异常定位提速（3 天 → 半天）、账实差异收敛（< 1%）等目标，沉淀从需求定义到运营迭代的完整交付文档，并提供可交互的行业报告与 MVP 演示页面。

## 项目结构

```
park-energy/
├── README.md          # 项目说明
├── LICENSE            # MIT 许可证
├── CHANGELOG.md       # 版本更新记录
├── requirements.txt   # Python 依赖
│
├── src/               # 源代码主目录（骨架，待填充）
│   └── park_energy/
│       ├── main.py    # 程序入口
│       ├── core/      # 核心业务逻辑
│       └── utils/     # 通用小工具函数
│
├── docs/              # 全生命周期交付文档
│   ├── 园区能耗与异常定位-需求定义报告.md
│   ├── 园区能耗与异常定位-现场调研报告.md
│   ├── 园区能耗与异常定位-业务挖掘报告.md
│   ├── 园区能耗与异常定位-方案设计报告.md
│   ├── 园区能耗与异常定位-构建集成报告.md
│   ├── 园区能耗与异常定位-测试评估报告.md
│   ├── 园区能耗与异常定位-客户试点报告.md
│   ├── 园区能耗与异常定位-上线交接报告.md
│   └── 园区能耗与异常定位-运营迭代报告.md
│
├── examples/          # 跑得起来的示例页面（浏览器直接打开）
│   ├── park-energy-industry-report.html   # 行业报告
│   └── park-energy-mvp.html               # MVP 演示
│
├── tests/             # 测试代码
├── scripts/           # 构建、部署脚本
├── config/            # 非机密默认配置
├── data/              # 样例数据 / 资源
└── .github/           # CI 工作流、Issue/PR 模板
```

## 快速开始

### 查看 HTML 报告 / MVP 演示

无需安装任何依赖，浏览器直接打开：

```
examples/park-energy-industry-report.html
examples/park-energy-mvp.html
```

### 运行 Python 代码

```bash
# 安装依赖
pip install -r requirements.txt

# 运行入口
python src/park_energy/main.py

# 运行测试
python -m pytest tests/ -v
```

## 文档

- 设计思路、API 说明见 [docs/](docs/)
- 版本变更见 [CHANGELOG.md](CHANGELOG.md)

## 许可证

[MIT](LICENSE)
