$ErrorActionPreference = "Stop"
Write-Host "开始打包"
yarn run build
cd docs/.vitepress/dist
Write-Host "准备发布"
git init
git add -A
git commit -m "deploy更新"
Write-Host "准备上传"
git push -f git@github.com:happyplum/guideNotes.git main:gh-pages
Write-Host "上传完毕"
cd ../../..