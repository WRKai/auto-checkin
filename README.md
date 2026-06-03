# 自动签到

通过 GitHub Actions 每天北京时间 00:04 自动签到 [api.iamhc.cn](https://api.iamhc.cn)。

## 文件结构

```
.
├── base.js              # 原始请求（浏览器复制，仅作参考）
├── checkin.js           # 签到逻辑脚本
└── .github/workflows/checkin.yml  # GitHub Actions 调度配置
```

## 本地手动测试

```bash
node checkin.js
```

## GitHub Actions 配置

### 1. 推送代码

```bash
git add .
git commit -m "feat: add auto checkin workflow"
git push
```

### 2. 配置 Secrets

在仓库 **Settings → Secrets and variables → Actions** 中：

| 类型 | 名称 | 说明 | 默认值 |
|------|------|------|--------|
| **Secret** | `CHECKIN_USER_ID` | 你的 `new-api-user` 值 | — |

### 3. 手动触发

GitHub Actions 页面 → Auto Check-in → **Run workflow** 可手动触发一次测试。

## 调度时间说明

| 时间 | 说明 |
|------|------|
| `cron: '4 16 * * *'` | UTC 16:04 = 北京时间 00:04 |

> GitHub Actions cron 使用 **UTC** 时间，注意换算（北京时间 = UTC + 8 小时）。
