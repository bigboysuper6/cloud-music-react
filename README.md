# 网易云音乐 网页版

技术:
React Hook、React Router 6、Material UI、React-Redux、Styled-Components

感谢[Binaryify](https://github.com/Binaryify)提供的[网易云 api](https://github.com/Binaryify/NeteaseCloudMusicApi)

已完成的功能

+ 轮播图
+ 二维码登录 和 登出
+ 导航栏
+ 路由跳转
+ 登录/未登录 界面变化
+ 歌单
+ 歌曲播放
+ 播放列表(目前只能 console)
+ 歌曲播放前进后退
+ 底部音乐栏

更新(CMR-00-playMethod)：
+ 添加音乐随机播放、顺序播放、循环播放、单曲播放
+ 添加播放列表UI 
+ 添加音乐被选中颜色变化
+ 优化： 添加limitSize限制图片大小
+ 优化： 歌单数过多时进行分页
+ 控制音量大小
+ 添加歌单播放按钮功能
+ 重新封装axios，优化请求函数
+ 优化项目文件结构
+ 提取工具函数至utils
+ 优化react-redux的使用
+ 提取工具函数至utils
+ 添加网页logo
+ 添加自定义webpack配置文件(为了学习webpack，可在package.scripts更改启动配置，默认为脚手架自带的webpack配置)
+ 优化一些UI细节

更新(CMR-01-Electron):
+ 添加electron跨端
+ 美化UI


未来计划：
+ 播放列表添加删除清空歌曲功能
+ 收藏功能
+ 在localStorage存储一些数据，在刷新或重新进入时进行初始化
+ 使播放列表变得更美观些
+ 优化项目，抽象逻辑，进一步提升速度
+ 添加音乐播放进度条及其逻辑
+ 添加歌词页面
+ 音乐搜索功能
+ 添加其他页面


项目目前经过一些优化后速度大幅提升，但还有很多可以优化的地方，有空时会慢慢优化和添加功能。因为临近毕业事情比较多，项目可能会更的很慢。后面考虑会部署到服务器上
 

运行项目:

+ 先运行上面的 网易云 api
+ api默认端口 3000,如需改动请在.env文件夹中修改REACT_APP_BASE_API

```node
npm install 
npm start
```

展示图：
![Home](https://github.com/bigboysuper6/cloud-music-react/blob/main/preview/Home.png)
![Home](https://github.com/bigboysuper6/cloud-music-react/blob/main/preview/Login.png)
![Home](https://github.com/bigboysuper6/cloud-music-react/blob/main/preview/MusicList.png)
![Home](https://github.com/bigboysuper6/cloud-music-react/blob/main/preview/PlayList.png)


