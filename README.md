# React Native and Strophe for real-time Apps  @ 环信

更详细的QA、IDE配置请参考[文档](https://github.com/wytheme/wytheme.github.io/blob/master/raw/react-native-and-strophe.md)

## 版本支持

iOS >= 9.0 , Android >= 4.1 (API 16)

注：所有开发调试环境均基于Mac

## 更新日志

当前版本 **v0.2.0 @ 2017-01-03**

**[CHANGE LOG](./CHANGELOG.md)**

注：
1. 此版本由于升级了react native库，需要先 `npm install` 安装依赖包
2. 去工程Librares中找到： RCTNetwork.xcodeproj / RCTNetworking.mm / RCTGenerateFormBoundary -> 去掉特殊字符 `/ .` 等
   - 或者去 `node_modules/react-native/Libraries/Network/RCTNetworking.mm` 修改
   - 因为上传文件时服务端rest服务会限制content-type不能出现特殊字符
```
//修改后： 
const char *boundaryChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
```


## Start

### Initial

1. **首先：项目初始化 `$ npm run newclear` ，iOS和Android只执行一次即可**
2. **修改 node_modules/axios/lib/utils.js (http通信使用axios库，但是跟框架不太兼容，需要稍作调整)**
```js
function isStandardBrowserEnv() {
  return false;
}
```

3. **去工程Librares中找到： RCTNetwork.xcodeproj / RCTNetworking.mm / RCTGenerateFormBoundary -> 去掉特殊字符 / . 等**
   - 因为上传文件时服务端rest服务会限制content-type不能出现特殊字符
   
```
//修改后： 
const char *boundaryChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
```

### Android debug and publish

1. 基础环境安装 ios 和 android https://facebook.github.io/react-native/docs/getting-started.html
	- `$ brew install android-sdk`

	```bash
		// zshrc 依照个人环境不同配置
		export ANDROID_HOME=~/Library/Android/sdk
		export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
		export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_112.jdk/Contents/Home/
		// 配置完成记得
		source .zshrc
	```

2. 模拟器和SDK安装 https://developer.android.com/studio/run/managing-avds.html
	- react-native 支持 api 最低到 16
	- 建议通过`$ android ` 管理API和镜像的安装
		- 根据自己平台测试需求安装对应的API和Image
		- 安装成功之后才能去`AVD Mannger `创建镜像
		- 必装 Android xx (API xx)
			- SDK Platform
			- Google APIS Intel x86 Atom System Image
	- 建议通过`Android studio` 管理镜像的创建和运行 (也可用 `$ android avd ` )
		- 打开任意项目 -> Tools -> Android -> AVD Mannger / SDK Manager
3. 模拟器测试
	- 运行任意Image
		- `emulator -avd <avd name>`
	- 根目录 `$ npm start ` 启动server
	- 根目录 `$ react-native run-android`，会将app安装到Image当中（如果连接真机也会安装到真机）
		- 可能会有一些权限之类的错误，可以用sudo
		- 一旦app正常安装且运行，以后不需要每次都编译，因为内容是通过`main.jsbundle`加载的
	- 运行后
		- `ctr + m` or `cmd + m` 调出控制
			- 如果按键无效：模拟器 -> settings -> send keyboards shortcuts to -> Emulator controls(default)
	- 模拟正式环境测试：`$ react-native run-android --variant=release`

4. 正式（签名）版 https://facebook.github.io/react-native/docs/signed-apk-android.html
	- 按照上述步骤添加签名
	- `build.gradle` 位于android/app目录
	- 编译 `$ cd android && ./gradlew assembleRelease`
5. 安装到设备，4种
	- `$ react-native run-android  --variant=release`
	- `$ npm run android:install`
		- 先删除手机上已经安装的包
	- `$ npm run android:build`
		- 到 `android/app/build/outpus/apk` 执行  `adb install xx.apk`，保证只有一个device正在运行
		- 下载 `Android File Transfer`, 连接设备后会自动弹出上传界面（设备需要解锁、允许USB调试、非充电模式）
	- `$ cd android && ./gradlew assembleRelease`
6. log
	- `$ npm run android:logcat`
	- 程序异常终止也可以通过此命令查看，需要设备和本地在同网络下

常用命令

```bash
$ npm start
$ android
$ android avd
$ emulator -avd n4-768
$ react-native run-android
$ react-native run-android  --variant=release
$ npm run android:install
$ npm run android:build
$ npm run android:logcat
$ ./gradlew assembleRelease
$ ./gradlew installRelease
$ cd android/app/build/outpus/apk && adb install app-release.apk
```

**注：很多快捷命令见根目录 `package.json` scripts 内容**

#### 可能遇到的问题

##### Q: 模拟器第一可以正常启动，以后均启动失败
A: 删除镜像文件，重新创建，并运行

##### Q: 真机总是安装失败
A: 尝试删除已经安装的app

- https://github.com/facebook/react-native/issues/2720

### IOS debug and publish

1. 基础环境安装 ios 和 android https://facebook.github.io/react-native/docs/getting-started.html
2. 模拟器安装
	- xcode -> Preferences-> Components -> iOS x.x Simulator
3. 模拟器测试
	- `react-native run-ios --simulator "iPhone 7"`
	- `cmd + d` 调出控制台
	- `cmd + r` reload
4. 真机测试
	- xcode config
		- Targets -> app -> General -> Signing ->添加一个个人icloud账户
		- 添加team，并定义一个唯一的Bundle Identifier   如：org.reactjs.native.example.app.lwz
			- Targets -> app -> General -> Signing -> Team
			- Targets -> app -> General -> Signing -> Signing Certificate
			- Targets -> app -> General -> Identity -> Bundle Identifier -> 修改唯一id标示
			- Targets -> appTests -> General -> Signing -> Team
			- Targets -> appTests -> General -> Signing -> Signing Certificate
		- `Product -> Scheme -> Edit Scheme (cmd + <), make sure you're in the Run tab from the side` 修改 debug or release
	- xcode 保证app/main.jsbundle可用，没有自行添加索引
		- main.jsbundle 生成方式
			- curl的方式打包  https://github.com/facebook/react-native/issues/5747
			- `react-native bundle --dev false --platform ios --entry-file ./index.ios.js --bundle-output ./ios/app/main.jsbundle`
				- 此种方式打包不支持npm link， 需要先`npm unlink easemob-websdk`
	- ~~关掉`npm start`启动的控制台~~ debug和publish的控制台可以共用，只要修改xcode配置为debug或者release即可
	- 在xcode通过正常run编译到手机
		- 没有packager启动时，会自动启动一个packager，这时打包的即为发布版本
		- 注意：跟本地之前引入的main.jsbundle没有关系，打包文件并不会更新到本地
	- xcode -> 选择设备 -> run
	- 信任证书：ios设备 -> General -> Device Management ->  persion Certificate -> trust it
	- 成功运行后，如果是debug模式可以晃动手机调出控制台

- [Signing for requires a development team](https://github.com/CocoaPods/CocoaPo ds/issues/5531)
- [Running On Device](https://facebook.github.io/react-native/docs/running-on-device-ios.html)

```bash
$ npm start
$ react-native run-ios --simulator "iPhone 7"
$ react-native run-ios
$ react-native bundle --dev false --platform ios --entry-file ./index.ios.js --bundle-output ./ios/app/main.jsbundle
```

#### 可能遇到的问题

##### Q：一些注意事项
- 注意切换debug 或 release 版本都需要关闭控制台
- `react-native run-ios --simulator "iPhone 7"` 保证没有真机连接到电脑，多个设备可以编译成功，但是无法正常启动

##### Q: 如果编译不生效
A: 可以尝试先clean，关掉package控制台，再run

##### Q: Undefined symbols for architecture arm64: "___gxx_personality_v0"
A:  https://github.com/facebook/react-native/issues/11454

##### Q: cant find module npmlog （安装 yarn 后）
A: 修复 `curl -0 -L http://npmjs.org/install.sh | sudo sh`

##### Q: Animated: `useNativeDriver` is not supported because the native animated module is missing
Include the NativeAnimation module on iOS in the starter projec

A: https://github.com/facebook/react-native/issues/10638

##### Q: React Native BUILD SUCCEED, but “No devices are booted.”
A: 

- `react-native run-ios`不要用 `sudo` 会导致app无法编译到模拟器当中
- 如果不用`sudo`，总是编译报错 `NSLocalizedDescription = "Permission denied";`
  - `sudo chmod 777 /Users/用户名/.babel.json`
- 如果仍然报`Permission denied`的类似问题
  - 可以去项目目录查看文件用户组，保证所有文件用户组都在当前用户下，而不是root下
  - `sudo chown -R 用户:用户组 目录名`

##### Q: Latest react-native app doesn't work ":CFBundleIdentifier", Does Not Exist #7308
A: https://github.com/facebook/react-native/issues/7308

```
Go to File -> Project settings
Click the Advanced button
Select "Custom" and select "Relative to Workspace" in the pull down
click done, done
```

## 目录结构
- App
	- Containers 容器 | 页面 | 路由
		- App.js 总入口
			- Redux/ 初始化
			- I18n/ 初始化
			- Config/index.js 系统初始配置
		- RootContainer.js  根容器
			- Navigation/NavigationRouter.js 初始化路由
			- /Config/ReduxPersist 持久化初始化
	- Components 常用组件
	- I18n 多语言支持
	- Images 图片资源
	- Lib WebIM初始化
	- Navigation 路由相关
	- Redux actions / reducers
	- Sdk webim-easemobo SDK

## Redux State

```js
{
	// ui相关
	ui: [
		// ui通用：比如loading
		common: {
			fetching:false
		},
		login: {
			username: '',
			password: '',
			isSigned: false,
		},
		register: { },
		contactInfo: { },
	],
	im: [],
	// 数据实体
	entities: {
		roster: {
			byName: {
				{
					jid, name, subscription, groups?
				}
			},
			names: ['lwz2'...],
			// 好友列表在此，因为好友列表来源于roster，息息相关
			friends: [],
		},
		// 订阅通知
		subscribe: {
			byFrom: {}
		},
		room: {},
		group: {
			byId: {},
			names: []
		},
		members: {
			byName: [],
			byGroupId: []
		}
		blacklist: {},
		message: {
			byId: {}
			chat: {
				[chatId]: [messageId1, messageId2]
			},
			groupChat: {
				[chatId]: {}
			},
		}
	}
}
```

## TODO

- https的问题
- splash 开机过渡动画
- 热加载
- 本地存储
- 聊天消息优化，限制队列长度及消息的分页展示
- 全局loading


