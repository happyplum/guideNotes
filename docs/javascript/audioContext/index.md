# 音频溢出最小测试用例

保存成html测试，苹果系统下可能需要edge，chrome存在都有的情况

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <script>
    let list = [];
    for (let i = 0; i < 20000; i++) {
      const tempAudioCtx = new AudioContext();
      list.push(tempAudioCtx);
    }
    requestAnimationFrame(() => {
      list.forEach((audioCtx) => {
        audioCtx.suspend();
        audioCtx.close();
      });
      list = [];
    });
  </script>
  <body>
    end
  </body>
</html>
```
