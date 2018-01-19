phantomcss.init({

    /*
    captureWaitEnabled defaults to true, setting to false will remove a small wait/delay on each
    screenshot capture - useful when you don't need to worry about
    animations and latency in your visual tests

captureWaitEnabled默认值为true,设置为false将删除一个小等待/延迟
截图捕获——有用的当你不需要担心
动画和视觉测试延迟
    */
    captureWaitEnabled: true,

    /*
        libraryRoot is now optional unless you are using SlimerJS where
        you will need to set it to the correct path. It must point to
        your phantomcss folder. If you are using NPM, this will probably
        be './node_modules/phantomcss'.

        ibraryRoot现在是可选的,除非你使用SlimerJS那里
您将需要将其设置为正确的路径。必须指出,
你phantomcss文件夹。如果您使用的是NPM,这可能会
被“。/ node_modules / phantomcss”。
    */
    libraryRoot: './modules/PhantomCSS',
    /*
      截图文件存放路劲
    */
    screenshotRoot: './screenshots',

    /*
        By default, failure images are put in the './failures' folder.
        If failedComparisonsRoot is set to false a separate folder will
        not be created but failure images can still be found alongside
        the original and new images.

        默认情况下,图像是放在“失败。/失败”文件夹中。
      如果failedComparisonsRoot设置为false将一个单独的文件夹
      不会创建但失败仍然可以发现与图片
      原来和新图片。
    */
    failedComparisonsRoot: './failures',

    /*
        Remove results directory tree after run.  Use in conjunction
        with failedComparisonsRoot to see failed comparisons.

        运行后删除目录树的搜索结果。一起使用
与failedComparisonsRoot看到失败的比较。
    */
    cleanupComparisonImages: true,

    /*
        A reference to a particular Casper instance. Required for SlimerJS.
    */
    casper: ,

    /*
        You might want to keep master/baseline images in a completely
        different folder to the diffs/failures.  Useful when working
        with version control systems. By default this resolves to the
        screenshotRoot folder.

        您可能想要保留主/基准图像在一个完全
不同的差别/文件夹失败。有用的工作时
版本控制系统。在默认情况下这解决
screenshotRoot文件夹。
    */
    comparisonResultRoot: './results',

    /*
        Don't add count number to images. If set to false, a filename is
        required when capturing screenshots.
    */
    addIteratorToImage: false,

    /*
        Don't add label to generated failure image
    */
    addLabelToFailedImage: false,

    /*
        Mismatch tolerance defaults to  0.05%. Increasing this value
        will decrease test coverage
    */
    mismatchTolerance: 0.05,

    /*
        Callbacks for your specific integration
    */
    onFail: function(test){ console.log(test.filename, test.mismatch); },

    onPass: function(test){ console.log(test.filename); },

    /*
        Called when creating new baseline images
    */
    onNewImage: function(){ console.log(test.filename); },

    onTimeout: function(){ console.log(test.filename); },

    onComplete: function(allTests, noOfFails, noOfErrors){
        allTests.forEach(function(test){
            if(test.fail){
                console.log(test.filename, test.mismatch);
            }
        });
    },

    /*
        Change the output screenshot filenames for your specific
        integration

        改变输出截图为您的特定的文件名
    */
    fileNameGetter: function(root,filename){
        // globally override output filename
        // files must exist under root
        // and use the .diff convention
        var name = root+'/somewhere/'+filename;
        if(fs.isFile(name+'.png')){
            return name+'.diff.png';
        } else {
            return name+'.png';
        }
    },

    /*
        Prefix the screenshot number to the filename, instead of suffixing it
        文件名前缀数量截图,而不是作为后缀
    */
    prefixCount: true,

    /*
        Output styles for image failure outputs genrated by
        Resemble.js

        输出样式图片失败所产生的输出
        Resemble.js
    */
    outputSettings: {
        errorColor: {
            red: 255,
            green: 255,
            blue: 0
        },
        errorType: 'movement',
        transparency: 0.3
    },

    /*
        Rebase is useful when you want to create new baseline
        images without manually deleting the files
        casperjs demo/test.js --rebase

        变基是有用的,当你想要创建新的基线
图片没有手动删除文件
casperjs演示/测试。js -变基
    */
    rebase: casper.cli.get("rebase")


});

/*
    Turn off CSS transitions and jQuery animations
*/
phantomcss.turnOffAnimations();
