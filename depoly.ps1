$ErrorActionPreference = "Stop"
Write-Host "��ʼ���"
yarn run build
cd docs/.vitepress/dist
Write-Host "׼������"
git init
git add -A
git commit -m "deploy����"
Write-Host "׼���ϴ�"
git push -f git@github.com:happyplum/guideNotes.git main:gh-pages
Write-Host "�ϴ����"
cd ../../..