#!/bin/sh
# build.sh – 在 Cloudflare Pages 构建环境中安装 Deno 并执行 Vite 构建

DENO_VERSION="v2.8.1"  # 你可以改成你本地使用的 Deno 版本

# 1. 下载 Deno 到当前目录的 ./deno 文件夹
curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=./deno sh -s $DENO_VERSION

# 2. 使用安装好的 Deno 运行你的构建任务（读取 deno.json 中的 build 任务）
./deno/bin/deno task build
