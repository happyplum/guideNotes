# model

## 模型转换

safetensors 转换为 guff

我们可以利用 llama.cpp 的 convert\_\*.py 脚本进行转换及量化

这里我们用 convert_hf_to_gguf_update.py 举例进行转换

脚本命令

```python
python convert_hf_to_gguf_update.py "D://gpt/Qwen/2.5VL/Qwen2.5-VL-7B-Instruct" --outtype f8
```

# windows运行

anaconda prompt
启动conda专用python环境
conda create -n QwenLocalVL python=3.12
创建名为QwenLocalVL的python虚拟环境
conda activate QwenLocalVL
安装python依赖
pip install git+https://github.com/huggingface/transformers accelerate
pip install qwen-vl-utils
pip install torchvision modelscope

拉取代码，修改调整

pycharm右下角切换环境

gpu加速，cuda官网安装下cuda，在根据cuda版本安装pytorch，不需要修改代码

# 加速

关于flash-attention的windows下编译
管理员运行conda
进入目录
pip install -r requirements.txt
python setup.py install（这大约需要 2 个小时）在此期间，所有 CPU 核心都处于最大使用率，并且 RAM 也承受着重负载。
python setup.py bdist_wheel（大约需要 1 分钟）
你将获得一个 whl 文件
\flash-attention\dist
生成的 whl 文件可以使用以下命令安装在目标项目环境中
pip install [path to wheelfilename].whl

如果碰到不存在triton，还需要编译，网上找了个
https://github.com/happyplum/triton-windows?tab=readme-ov-file
pip install https://github.com/woct0rdho/triton-windows/releases/download/v3.2.0-windows.post10/triton-3.2.0-cp312-cp312-win_amd64.whl
需要安装MSVC 和 Windows SDK，vcredist
MSVC装好了需要添加cl.exe的路径到python中，需要自己找下
我本地电脑上为
C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.42.34433\bin\Hostx64\x64

# 运行

cd /d D:\ai\Qwen\Qwen2.5-VL
conda activate QwenLocalVL
python test.py
