# model

## 模型转换

safetensors 转换为 guff

我们可以利用 llama.cpp 的 convert\_\*.py 脚本进行转换及量化

这里我们用 convert_hf_to_gguf_update.py 举例进行转换

脚本命令

```python
python convert_hf_to_gguf_update.py "D://gpt/Qwen/2.5VL/Qwen2.5-VL-7B-Instruct" --outtype f8
```
