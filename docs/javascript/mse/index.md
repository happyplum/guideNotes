# mse

怎么使用MSE渲染视频?

1. 新建一个midiaSource

```js
const mse = new MediaSource();
```

2. 产生mse的url

```js
const mseUrl = URL.createObjectURL(mse);
```

3. 将该链接赋值给video

```js
this.$video.srcObject = mse;
//挂载好objURL后触发，开始正式加载数据
mse.addEventListener("sourceopen", sourceOpen);

//加载函数

const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'; //申明视频属性
function sourceOpen() {
  const sourceBuffer = mse.addSourceBuffer(mimeCodec);
  ///.....获取视频相关函数
  fetchGet(Url, function (buf) {
    mse.appendBuffer(buf); //把这个buf添加进mse即可播放
  });
}

//开始播放
video.play();

//播放结束
mse.endOfStream();
```
