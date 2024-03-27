---
sidebar: auto
---

# ReactNative

关于我在 ReactNative 的一些笔记

## 关于 build 生成 apk

1. 请在 java 中找到 `keytool.exe`
   然后运行以下命令

    ```cmd
    keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
    ```

    然后根据指引输入发行信息和密码后生成 `my-release-key.keystore` 文件

2. 找到 `ReactNative` 下的`android/app/build.gradle`,进行修改
   在 **signingConfigs** 中添加 **release** 信息,**xxx** 部分为第一步生成的密码

    ```
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            storeFile file('my-release-key.keystore')
            storePassword 'xxx'
            keyAlias 'my-key-alias'
            keyPassword 'xxx'
        }
    }
    ```

    在 **buildTypes** 中添加 **release** 信息

    ```
     release {
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    ```

3. 编译
   在 `android` 目录下运行命令`./gradlew assembleRelease`

4. 输出
   目录在`\android\app\build\outputs\apk\release\app-release.apk`

## 关于 ReactNative 添加推送

1.  增加 alibaba 的 maven 库
    找到 `android/build.gradle` 在 buildscript 和 allprojects 的 repositories 中增加仓库地址

    ```gradle
    buildscript{
        ...
        repositories{
            ...
            maven { url 'https://maven.aliyun.com/repository/central' }
            maven { url 'https://maven.aliyun.com/repository/releases' }
        }
    }
    ```

    ```gradle
    allprojects {
        ...
        repositories {
            ...
            maven { url 'https://maven.aliyun.com/repository/releases' }
            maven { url 'https://developer.huawei.com/repo/' }
        }
    }
    ```

2.  修改 `android/app/build.gradle` 在 **dependencies** 中 添加相应的包

    ```gradle
    dependencies{
        ...
        implementation 'com.aliyun.ams:alicloud-android-push:3.7.5'
        ...(末尾处)
        implementation 'com.aliyun.ams:alicloud-android-push:3.7.5'
        def thirdPushVersion = "3.7.4"
        //华为依赖
        implementation "com.aliyun.ams:alicloud-android-third-push-huawei:${thirdPushVersion}"
        //小米依赖
        implementation "com.aliyun.ams:alicloud-android-third-push-xiaomi:${thirdPushVersion}"
        //OPPO依赖
        implementation "com.aliyun.ams:alicloud-android-third-push-oppo:${thirdPushVersion}"
        //vivo依赖
        implementation "com.aliyun.ams:alicloud-android-third-push-vivo:${thirdPushVersion}"
        //魅族依赖
        implementation "com.aliyun.ams:alicloud-android-third-push-meizu:${thirdPushVersion}"
        //谷歌依赖
        implementation "com.aliyun.ams:alicloud-android-third-push-fcm:${thirdPushVersion}"
    }
    ```

3.  修改 `android/app/src/main/AndroidManifest.xml` 中`<application>`末尾处添加 alibaba 组件的配置信息

    ```xml
    <application>
        ...
        <!-- 请填写你自己的- appKey -->
        <meta-data android:name="com.alibaba.app.appkey"
            android:value="xxxx" />
        <!-- 请填写你自己的appSecret -->
        <meta-data android:name="com.alibaba.app.appsecret"
            android:value="xxxxxxxxxxxxxxxxxxx" />

        <activity android:name=".push.PopupPushActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:host="${applicationId}"
                    android:path="/thirdpush"
                    android:scheme="agoo" />
            </intent-filter>
        </activity>

        <meta-data android:name="com.huawei.hms.client.appid"
            android:value="appid=xxxx" />
        <meta-data android:name="com.vivo.push.api_key"
            android:value="xxxxxxxxxxxxxxxxxxx" />
        <!-- 请填写您自己的vivo平台上的appKey -->
        <meta-data android:name="com.vivo.push.app_id"
            android:value="xxxx" />
        <!-- 请填写您自己的vivo平台上的appId -->

        <receiver android:name=".push.MyMessageReceiver"
            android:exported="false">            <!-- 为保证receiver安全，建议设置不可导出，如需对其他应用开放可通过android：permission进行限制 -->
            <intent-filter>
                <action android:name="com.alibaba.push2.action.NOTIFICATION_OPENED" />
            </intent-filter>
            <intent-filter>
                <action android:name="com.alibaba.push2.action.NOTIFICATION_REMOVED" />
            </intent-filter>
            <intent-filter>
                <action android:name="com.alibaba.sdk.android.push.RECEIVE" />
            </intent-filter>
        </receiver>
    </application>
    ```

4.  下载[官方样例](https://github.com/aliyun/alicloud-android-demo/tree/master/mpush_reactnative_android_demo/AwesomeProject),将其中`alicloud-android-demo/mpush_reactnative_android_demo/AwesomeProject/android/app/src/main/java/com/awesomeproject/`下的 **push 模块**,**ContVar**,复制到项目中,修改关键字 **awesomeproject** 为你自己的 **java.com.xxx** 包名称

5.  MainApplication 添加 import 模块

    新增 import 如下,其中的 xxx 请替换成自己项目包名称

    ```java
    import android.app.NotificationChannel;
    import android.app.NotificationManager;
    import android.graphics.Color;
    import android.os.Build;
    import androidx.core.content.ContextCompat;
    import com.facebook.react.bridge.Arguments;
    import com.facebook.react.bridge.WritableMap;
    import java.io.File;

    import com.alibaba.sdk.android.push.CloudPushService;
    import com.alibaba.sdk.android.push.CommonCallback;
    import com.alibaba.sdk.android.push.huawei.HuaWeiRegister;
    import com.alibaba.sdk.android.push.noonesdk.PushServiceFactory;
    import com.alibaba.sdk.android.push.register.GcmRegister;
    import com.alibaba.sdk.android.push.register.MeizuRegister;
    import com.alibaba.sdk.android.push.register.MiPushRegister;
    import com.alibaba.sdk.android.push.register.OppoRegister;
    import com.alibaba.sdk.android.push.register.VivoRegister;

    import com.xxx.push.PushModule;
    import com.xxx.push.PushPackage;
    ```

    找到`protected List<ReactPackage> getPackages()`方法,在**return**前添加`packages.add(new PushPackage());`

6.  新增 java 方法
    新增初始化通知渠道(适配 8.x 以上版本)

    ```java
    /**
     * 初始化通知渠道
     */
    private void initNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            // 通知渠道的id。
            String id = "1";
            // 用户可以看到的通知渠道的名字。
            CharSequence name = "notification channel";
            // 用户可以看到的通知渠道的描述。
            String description = "notification description";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel mChannel = new NotificationChannel(id, name, importance);
            // 配置通知渠道的属性。
            mChannel.setDescription(description);
            // 设置通知出现时的闪灯（如果Android设备支持的话）。
            mChannel.enableLights(true);
            mChannel.setLightColor(Color.RED);
            // 设置通知出现时的震动（如果Android设备支持的话）。
            mChannel.enableVibration(true);
            mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
            // 最后在notificationmanager中创建该通知渠道。
            mNotificationManager.createNotificationChannel(mChannel);
        }
    }
    ```

    新增注册通知方法

    ```java
    /**
     * 注册通知
     */
    private boolean pushInit;
    public void initCloudChannel() {
        File is_privacy = new File(ContextCompat.getDataDir(this).getAbsolutePath(), ContVar.P_FILE);
        if (!is_privacy.exists()) return;
        if (pushInit) return;
        pushInit = true;

        if (BuildConfig.DEBUG) {
            //仅适用于Debug包，正式包不需要此行
            PushServiceFactory.getCloudPushService().setLogLevel(CloudPushService.LOG_DEBUG);
        }
        PushServiceFactory.getCloudPushService().register(this.getApplicationContext(), new CommonCallback() {
            @Override
            public void onSuccess(String s) {
                pushInit = true;
                WritableMap params = Arguments.createMap();
                params.putBoolean("success", true);
                PushModule.sendEvent("onInit", params);
                initCS();
            }

            @Override
            public void onFailed(String s, String s1) {
                pushInit = false;
                WritableMap params = Arguments.createMap();
                params.putBoolean("success", false);
                params.putString("errorMsg", "errorCode:" + s + ". errorMsg:" + s1);
                PushModule.sendEvent("onInit", params);
            }
        });
    }
    ```

    初始化适配其他厂商配置

    ```java
    /**
     * 初始化厂商
     */
    private void initCS() {
        HuaWeiRegister.register(this);
        MiPushRegister.register(this, "XIAOMI_ID", "XIAOMI_KEY"); // 初始化小米辅助推送
        HuaWeiRegister.register(this); // 接入华为辅助推送
        VivoRegister.register(this);
        OppoRegister.register(this, "OPPO_KEY", "OPPO_SECRET");
        MeizuRegister.register(this, "MEIZU_ID", "MEIZU_KEY");

        GcmRegister.register(this, "send_id", "application_id"); // 接入FCM/GCM初始化推送
    }
    ```

7.  在生命周期中挂载
    找到`public void onCreate()`在末尾处添加

    ```java
    PushServiceFactory.init(this);
    initNotificationChannel();
    initCloudChannel();
    ```

## 关于上网权限

::: tip
新版本的 android 由于默认只支持 https 链接,http 等明文链接需要添加自定义权限
:::

1. 在 res 中新增 `network_security_config.xml`

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
    </network-security-config>
    ```

2. 在`AndroidManifest.xml`的`<application>`中添加配置
   `android:networkSecurityConfig="@xml/network_security_config"`

3. 也在`AndroidManifest.xml`的`<application>`中添加`android:usesCleartextTraffic="true"`
