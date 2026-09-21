#!/bin/bash
# 同行实验室 · 本地启动脚本
# 强制使用系统 Node.js (/usr/local/bin/node)，避开 WeSight 默认 node wrapper 的 SWC 签名问题。

set -e

# 优先使用系统 node
export PATH=/usr/local/bin:/bin:/usr/bin:/usr/sbin:/sbin:$PATH

# 校验
NODE_BIN=$(which node)
echo "→ Node: $NODE_BIN ($(node --version))"

# 安装依赖（首次）
if [ ! -d "node_modules" ]; then
  echo "→ Installing dependencies..."
  npm install --no-audit --no-fund
fi

# 重新签名 SWC 二进制（每次新装都需要）
SWC_BIN="node_modules/@next/swc-darwin-arm64/next-swc.darwin-arm64.node"
if [ -f "$SWC_BIN" ]; then
  codesign --force --sign - "$SWC_BIN" 2>/dev/null || true
fi

# 启动
echo "→ Starting dev server on http://localhost:3000"
exec npm run dev