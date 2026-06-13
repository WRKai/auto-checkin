#!/usr/bin/env node

/**
 * 自动签到脚本
 *
 * 用法:
 *   node checkin.js [--userId 21162]
 *
 * 环境变量:
 *   CHECKIN_USER_ID  - 用户 ID (对应 new-api-user 请求头), 默认 21162
 */

async function checkin(userId, cookie) {
  const res = await fetch('https://api.iamhc.cn/api/user/checkin', {
    method: 'POST',
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9',
      'cache-control': 'no-store',
      'new-api-user': userId,
      'priority': 'u=1, i',
      'sec-ch-ua': '"Chromium";v="148", "Microsoft Edge";v="148", "Not/A)Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'Referer': 'https://api.iamhc.cn/console/personal',
      cookie
    },
    credentials: 'include',
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text) } catch { data = text }

  return { status: res.status, ok: res.ok, data };
}

async function main() {
  const userId = process.env.CHECKIN_USER_ID, cookie = process.env.COOKIE;

  if (typeof fetch !== 'function') {
    console.error('❌ 当前 Node.js 版本不支持全局 fetch，请使用 Node >= 18');
    process.exit(1);
  }

  try {
    const { status, ok, data } = await checkin(userId, cookie);
    const body = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;

    console.log(ok ? '✅ 签到成功' : '❌ 签到失败');
    console.log(`响应 (HTTP ${status}):\n${body}`);

    if (!ok) process.exit(1);
  } catch (err) {
    console.error(`❌ 签到失败: ${err.message}`);
    process.exit(1);
  }
}

main();
