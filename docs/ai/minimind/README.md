# minimind

https://github.com/jingyaogong/minimind.git

conda create -n minimind python=3.12
conda activate minimind

cd /d D:\ai\minimind

pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

安装了vsocde build 2022和rust

看到LMConfig.py中存在flash_attn配置，还是安装了下flash_attn

需要修改下LMConfig，默认走的是minimind-zero的配置去的，max_seq_len，dim都要修改为512

执行“python train_pretrain.py”进行预训练，使用的是pretrain_hq.jsonl进行的训练，3080大概执行了1个小时

执行“python train_full_sft.py”进行监督微调，默认使用的是sft_mini_512.jsonl进行训练，3080大概执行了3个小时

执行“python eval_model.py --model_mode 1”测试，发现生成的是minimind-zero，效果一般

尝试进行修改配置LMconfig.py
查看了参考模型参数版本表，发现有些参数和配置不是完全对应
如果要使用moe训练，需要开启use_moe
d_model对应的参数应该是dim
share+route=1+4我觉得应该是n_shared_experts和n_routed_experts

开启moe后重新尝试使用sft_mini_512进行训练
执行“python train_full_sft.py”
