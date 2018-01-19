#自动化测试

为H5开发提供自动化测试环境，一次性完成单元测试和UI测试任务，并生成可读性良好的页面报告。
两种测试采用共同的测试框架 [**mocha**](http://mochajs.org/) 和 [**chai**](http://chaijs.com/) 断言语法，便于学习和使用。
+ 单元测试采用 [**karma**](https://karma-runner.github.io/1.0/index.html) 作为Test Runner，支持seajs，可在chrome中直接使用开发者工具调试。
+ UI 测试采用了广泛使用的 [**selenium**](http://docs.seleniumhq.org/) 模拟人工操作，可打开H5页面，并提供了和前端一致的选择器与Promise封装，用于测试任意页面。


## 安装

1. 将 chromedriver 浏览器启动程序配置进环境变量。
2. 将工具 checkout 到本地，在工具根目录打开 cmd，执行`npm install`。


## 使用

工程根目录下执行`gulp`，可自动化执行单元测试和UI测试。具体说明入如下：

#### 单元测试
+ 目录文件：将待测试文件放入`src/js`，模板文件放入`src/template`，单元测试文件放入`spec/unitTest`。

+ 测试脚本：按照 mocha 测试框架和 chai 断言语法书写测试脚本，并**以 `*.spec.js`结尾命名**。

+ seajs 加载：单元测试支持 seajs 写法。为 glue 框架的组件、行为或服务书写测试用例时请使用 seajs 加载。为了保证正确加载执行，请将测试脚本引入测试入口文件中`spec/unitTest/common/main.js`。**注意：只有在入口中配置的seajs测试脚本才能执行。**

+ 执行：工程根目录下执行`gulp unitTest`，即可打开浏览器执行测试脚本。

+ 报告：控制台mocha报告或网页版报告`reporter/unitTest/unitTestReporter.html`。

#### UI 测试
+ 目录文件：UI 测试文件放入`spec/UITest`中。

+ 测试脚本：遵循 selenium-webdriver 的API，按照 mocha 测试框架和 chai 断言语法书写测试脚本，并**以 `*.spec.js`结尾命名**。

+ 执行：工程根目录下执行`gulp UITest`，可启动浏览器打开测试页面执行端对端测试。

+ 报告：控制台 mocha 报告或网页版报告`reporter/UITest/UITestReporter.html`。

  **PS. **  *如需使用 selenium 的 touch 相关事件，需要手动输出对应 API，即在`selenium-webdriver/index.js`中添加如下语句：*

  ```
  exports.TouchSequence = actions.TouchSequence;
  ```

## 更新记录

#### 1.0.0 / 2016-08-15

* 自动化测试环境搭建，支持单元测试和UI测试。