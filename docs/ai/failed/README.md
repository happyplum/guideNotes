# docker

docker run --runtime nvidia --gpus all --ipc=host --network=host --name qwen2.5 -it qwenllm/qwenvl:2.5-cu121 bash
vllm serve Qwen/Qwen2.5-VL-3B-Instruct --port 8000 --host 0.0.0.0 --dtype bfloat16 --limit-mm-per-prompt image=5,video=5
vllm serve Qwen/Qwen2.5-VL-7B-Instruct --port 8000 --host 0.0.0.0 --dtype bfloat16 --limit-mm-per-prompt image=5,video=5 #不行，运行不起来
docker run --runtime nvidia --gpus=all --ipc=host --network=host --name qwen2.5 -it qwenllm/qwenvl:2.5-cu121 bash

# 抱脸提供

docker run --runtime nvidia --gpus all \
 --name my_vllm_container \
 -v ~/.cache/huggingface:/root/.cache/huggingface \
 --env "HUGGING_FACE_HUB_TOKEN=xxx" \
 -p 8000:8000 \
 --ipc=host \
 vllm/vllm-openai:latest \
 --model Qwen/Qwen2.5-VL-3B-Instruct

docker run --runtime nvidia --gpus all --name my_vllm_container -v ~/.cache/huggingface:/root/.cache/huggingface --env "HUGGING_FACE_HUB_TOKEN=xxx" -p 8000:8000 --ipc=host vllm/vllm-openai:latest --model Qwen/Qwen2.5-VL-3B-Instruct

https://raw.githubusercontent.com/QwenLM/Qwen2.5-VL/refs/heads/main/docker/Dockerfile-2.5-cu121

docker build -f .\Dockerfile-2.5-cu121 -t qwen/qwen2.5-vl .. #失败了，windows下build阶段没办法用GPU，导致build vllm的时候内存爆炸

# 尝试下载nvidia镜像，手动运行构建

nvidia/cuda:12.1.0-cudnn8-devel-ubuntu20.04

docker run -it --runtime nvidia --gpus all --ipc=host --network=host nvidia/cuda:12.1.0-cudnn8-devel-ubuntu22.04 /bin/bash

git+https://github.com/huggingface/transformers.git

export MAX_JOBS=8
export NVCC_THREADS=1
export TORCH_CUDA_ARCH_LIST="7.0 7.5 8.0 8.6 8.9 9.0+PTX"
export VLLM_FA_CMAKE_GPU_ARCHES="80-real;90-real"

https://github.com/QwenLM/Qwen2.5-VL.git

pip install git+https://github.com/huggingface/transformers@f3f6c86582611976e72be054675e2bf0abb5f775
pip install accelerate
pip install qwen-vl-utils
pip install 'vllm>=0.7.2'
