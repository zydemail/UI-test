var images = require('images');

images("qiaqia/screenshotsres/page showRules_1.jpg")                     //Load image from file
                                        //加载图像文件
    .size(1080,1920)                          //Geometric scaling the image to 400 pixels width
                                        //等比缩放图像到400像素宽
    //.draw(images("logo.png"), 10, 10)   //Drawn logo at coordinates (10,10)
                                        //在(10,10)处绘制Logo
    .save("qiaqia/screenshotsres/page showRules_1.png");
