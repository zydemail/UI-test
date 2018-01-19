/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var fs = require( 'fs' );
	//console.log( fs.workingDirectory );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require( path );
var openPageUrl='http://www.douyu.com/cms/zt/qiaqiah5.html';
var openPageHeight=1920,penPageWidth=1080;
//测试多种浏览器
// var casper = require('casper').create({
//     pageSettings: {
//         // 冒充浏览器
//         userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
//     },
//     // 浏览器窗口大小
//     viewportSize: {
//         width: 320,
//         height: 568
//     }
// });


casper.test.begin( 'qiaqia h5 ui tests', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/qiaqia/screenshotsres' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/qiaqia/failres' ),
		addLabelToFailedImage: false,
	} );

	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	} );

	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	} );

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	} );

	casper.start(openPageUrl);
	casper.viewport( penPageWidth,openPageHeight);

  casper.then( function () {
			casper.wait(3000,function(){
				  phantomcss.screenshot( '#window', 'page open ' );
				});
	  	}
	)
	.then( function () {
    casper.click( '#window .showRules' );
		casper.wait(3000,function(){
			phantomcss.screenshot( '#window', 'page showRules' );
		});
  } )
	.then( function () {
		casper.click( '#ruleShow .close' );
		casper.click( '.content1 .updown' );
		casper.wait(3000,function(){
			phantomcss.screenshot( '#window', 'page page 2 ' );
		});

	} )
	.then( function () {
		casper.click( '.content2 .updown' );
		casper.wait(3000,function(){
			phantomcss.screenshot( '#window', 'page page 3' );
		})

		.then(function(){
			casper.click('.pg3-btn');
			phantomcss.screenshot( '#window', 'page page 4' );

		});

	} );

	casper.then( function now_check_the_screenshots() {
		// compare screenshots
		phantomcss.compareAll();

		// phantomcss.compareMatched('include.test', 'exclude.test');
// phantomcss.compareMatched( new RegExp('include.test'), new RegExp('exclude.test'));

/*
    Compare image diffs generated in this test run only
*/
// phantomcss.compareSession();

/*
    Explicitly define what files you want to compare
*/
// phantomcss.compareExplicit(['/dialog.diff.png', '/header.diff.png']);

/*
    Get a list of image diffs generated in this test run
*/
// phantomcss.getCreatedDiffFiles();

/*
    Compare any two images, and wait for the results to complete
*/
// phantomcss.compareFiles(baseFile, diffFile);
// phantomcss.waitForTests();


	} );

	/*
	Casper runs tests
	*/
	casper.run( function () {
		console.log( '\nTHE END.' );
		// phantomcss.getExitStatus() // pass or fail?
		casper.test.done();
	} );
} );
