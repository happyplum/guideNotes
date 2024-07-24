# 关于 ffmpeg 的视频编码测试

## 源文件

1.mp4 5.92 GB H264(AC1) NV12

## CPU

```
ffmpeg -hwaccel cuda -i d:\test\1.mp4 -y -map 0 -pix_fmt yuv420p10le -c copy -c:v:0 libx265 -x265-params "no-sao=1:me=2:merange=24" d:\test\2.h265.mp4
```

1.10 GB VMAF score: 94.864233

```
ffmpeg -hwaccel cuda -i d:\test\1.mp4 -y -map 0 -pix_fmt yuv420p10le -c copy -c:v:0 libx265 -x265-params "no-sao=1:me=2:merange=24" -tune grain -crf 23 -preset slow d:\test\2.h265.slow.mp4
```

5.22 GB VMAF score: 97.553611

```
ffmpeg -hwaccel cuda -i d:\test\1.mp4 -y -map 0 -pix_fmt yuv420p10le -c copy -c:v:0 libx265 -x265-params "no-sao=1:me=2:merange=24" -tune grain -crf 23 d:\test\2.h265.noSlow.mp4
```

3.73 GB VMAF score: 96.735852

```
ffmpeg -hwaccel cuda -i d:\test\1.mp4 -y 3.noparams.mp4
```

3.74 GB VMAF score: 93.878954

    2022年4月1日 尝试新增了crf21和fast crf21,19的配置,没想到fast crf21 又小质量又高,但是为了通用考虑还是修改为 普通 crf21 方案

```
ffmpeg -hwaccel cuda -i d:\test\1.mp4 -y -map 0 -pix_fmt yuv420p10le -c copy -c:v:0 libx265 -x265-params "no-sao=1:me=2:merange=24" -tune grain -crf 21 d:\test\2.h265.noSlow.crf21.mp4
```

5.03 GB VMAF score: 97.817357

```
ffmpeg -hwaccel cuda -i d:\test\1.mp4 -y -map 0 -pix_fmt yuv420p10le -c copy -c:v:0 libx265 -x265-params "no-sao=1:me=2:merange=24" -tune grain -crf 21 -preset fast d:\test\2.h265.fast.crf21.mp4
```

4.80 GB VMAF score: 97.103569

```
ffmpeg -hwaccel cuda -i d:\test\1.mp4 -y -map 0 -pix_fmt yuv420p10le -c copy -c:v:0 libx265 -x265-params "no-sao=1:me=2:merange=24" -tune grain -crf 19 -preset fast d:\test\2.h265.fast.crf19.mp4
```

6.43 GB VMAF score: 97.576508

## NVIDA(RTX30)

```
ffmpeg -hwaccel cuda -i d:\test\1.mp4 -y -map 0 -c copy -c:v:0 hevc_nvenc -profile:v main10 -pix_fmt p010le -preset slow -bf 4 D:\test\1.h265.mp4
```

2.40 GB VMAF score: 91.265293

```
ffmpeg -y -hide_banner -vsync 0 -hwaccel cuda -hwaccel_output_format cuda -hwaccel_device 0 -c:v:0 h264_cuvid -i "1.mp4" -vf "hwdownload,format=nv12" -c copy -c:v:0 hevc_nvenc -profile:v main10 -pix_fmt p010le -rc:v:0 vbr -tune hq -preset p5 -multipass 1 -bf 4 -b_ref_mode 1 -nonref_p 1 -rc-lookahead 75 -spatial-aq 1 -aq-strength 8 -temporal-aq 1 -cq 21 -qmin 1 -qmax 99 -b:v:0 10M -maxrate:v:0 20M -gpu 0 "1.mkv"
```

9.76 GB VMAF score: 97.735412

## 参考

[参考](https://superuser.com/questions/1614571/understanding-pixel-format-and-profile-when-encoding-10-bit-video-in-ffmpeg-with)

Here is a command I use to convert videos from AVC to HEVC 10-bit using Pascal encoder (GTX 10x0 cards):

```
ffmpeg -y -hide_banner -hwaccel nvdec -hwaccel_device 0 -vsync 0 -i "input.mp4" -c copy -c:v:0 hevc_nvenc -profile:v main10 -pix_fmt p010le -rc:v:0 vbr_hq -rc-lookahead 32 -cq 21 -qmin 1 -qmax 51 -b:v:0 10M -maxrate:v:0 20M -gpu 0 "output.mkv"
```

Similar command that can be used on newer Turing (GTX 20x0) and Ampere (RTX 30x0) encoder:

```
ffmpeg -y -hide_banner -vsync 0 -hwaccel cuda -hwaccel_output_format cuda  -hwaccel_device 0 -c:v:0 h264_cuvid -i "input.mp4" -vf "hwdownload,format=nv12" -c copy -c:v:0 hevc_nvenc -profile:v main10 -pix_fmt p010le -rc:v:0 vbr -tune hq -preset p5 -multipass 1 -bf 4 -b_ref_mode 1 -nonref_p 1 -rc-lookahead 75 -spatial-aq 1 -aq-strength 8 -temporal-aq 1 -cq 21 -qmin 1 -qmax 99 -b:v:0 10M -maxrate:v:0 20M -gpu 0 "output.mkv"
```

Params explanation:

- **-pix_fmt p010le**
  converts 8bit input into 10bit; note that conversion is done by CPU so it makes the encoding slower but produces better quality video and in CRF also lower bitrate (smaller file). For CUDA decoder must be used with **-vf "hwdownload,format=nv12"** (or **-vf "hwdownload,format=p010le"** for 10 bit input video) to copy decoded frames from CUDA into CPU for conversion (NVDEC decoder sends frames into CPU automatically.) Specifying **-profile main10** is required to allow 10bit encoding but does not accually affect how the encoder encodes the video - encoder itself does not change the bit depth of the input!
- **-rc:v:0 vbr_hq -cq 21 -qmin 1 -qmax 99**
  is needed to fully enable CRF mode. Increase qmin to lower bitrate peaks, lower qmax to prevent low-quality frames (recommended for encoding without AQ). On Turing and Ampere use -rc:v:0 vbr -tune hq instead of vbr_hqfor same result. BTW for HEVC is recommended quality -cq 28 (or -cq 30 with AQ enabled).
- **-b:v:0 10M -maxrate:v:0 20M**
  specifies recommended and maximum bitrate supported by the target device. For main tier @L5 you can use max. 25M, for @L6 maximum is 60Mbps (for 30fps video). This is also needed for the hardware encoder to know how to calculate the QP value in CRF mode. I use 10M/20M for videos stored on NAS and played on TV over LAN.
- **present=slow**
  enables 2-pass processing and other advanced optimizations; since hardware encoder is faster than software encoders, you can go with slow preset and still get a lot faster processing than from CPU on faster preset. On Ampere you must use **-preset p5 -multipass 2** which equals to the slow preset (you can go up to **p7** which equals to very slow but has almost no additional effect on file size in most cases; you can use **-multipass 1** for 4-times faster first pass).
- **hwaccell**
  enables hardware decoder and specify which device will decode the video (if you have SLI). Based on your CPU speed you can test which is best for you. NVDEC can decode any MPEG video but is slower; for faster CUDA you must specify if source is AVC, HEVC or AV1. For DivX, Xvid and non-MPEG input remove it completely to switch to software decoder using CPU.
- **-bf 4 -b_ref_mode 1 -nonref_p 1**
  enables improved B-frames processing on Turing and Ampere (note that it's not supported by h264_nvenc).
- Alternatively you can use **-bf 0 -weighted_pred 1** to use Weighted prediction instead of B-frames if your source has uneven lighting (flickering lights or lots of fade-ins/-outs) to get better quality and smaller file (however disabling B-frames increases file size for other sources with stable lighting).
- **-rc-lookahead 75 -spatial-aq 1 -aq-strength 8 -temporal-aq 1**
  enables Adaptive quantifier supported on Turing and Ampere. This improves video quality with same or lower bitrate in CRF mode. Change the rc-lookahead to either get faster speed or better quality. Increase aq-strength if you see artifacts in very dark colors.
- using **-gpu 0**
  you specify which device encode the video if you have SLI or on-board (Intel/AMD) card.
- in addition with CUDA decoder you can add **-resize WIDTHxHEIGHT** and/or **-crop TOPxBOTTOMxLEFTxRIGHT** (before the -i parameter) to
  change the input using the hardware decoder. This is faster than using **-vf scale** and **-vf crop** which is done on CPU.
