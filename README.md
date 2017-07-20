#NodeJs.Web
1. 提供NodeJs应用程序模板，该模板采用MVC开发模式，所有的模块配置直接在 Controller 中处理。
2. 模板路径全部以文件名为前缀，如user.js，正常路径为：http://localhost/user/模板自定义的路径。
3. Publish为所有对外开放的静态文件夹，所有的静态文件的根目录以这个为起始点。
4. 起始文件为 bin/www 。
5. 注意 controller/index.js 里面的路径设置不能与其它模块文件名一致，以免出现重复解析。