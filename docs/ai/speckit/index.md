# spec-kit

项目地址[https://github.com/github/spec-kit?tab=readme-ov-file#4-create-a-technical-implementation-plan]

# 安装

需要基于其他 ai cli 进行调用，这里使用 QwenCode[https://github.com/QwenLM/qwen-code?tab=readme-ov-file] 作为基础

spec-kit 使用 python 安装,如果需要隔离请参阅 conda 配置

```bash
cd
git clone
pip install -e .
```

如果无法运行请检查系统 Path 路径

# 项目内初始化

```bash
specify init <PROJECT_NAME>
specify check
```

生成相应的文件

# 使用

通过 TRAE 的智能体对话页面使用 # 号添加相应的文件，然后跟随你的命令即可

命令文件有
-speckit.constitution #命令创建项目的管理原则和开发指南，这些原则和指南将指导所有后续开发工作
-speckit.specify #描述你想构建的内容。重点在于“是什么”和“为什么”，而不是技术栈。
-speckit.plan 技术栈和架构选择
-speckit.tasks 创建可执行的任务清单
-speckit.implement 执行
