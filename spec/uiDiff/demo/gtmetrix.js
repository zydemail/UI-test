
var fs = require( 'fs' );
	//console.log( fs.workingDirectory );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require( path );
var openPageUrl='https://www.gtmetrix.com'
    ,openTextUrl='http://www.douyu.com'
    ,openPageHeight=1080
    ,penPageWidth=1920;



casper.test.begin( 'gtmetrix tests', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/gtmetrix/shotres' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/gtmetrix/failres' ),
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

  casper.on('url.changed',function(url) {
    casper.log('url.changed:'+url);
  });
	/*
		The test scenario
	*/

	casper.start(openPageUrl);
	casper.viewport( penPageWidth,openPageHeight);

  casper.then( function () {
				  //phantomcss.screenshot( '.page-wrapper', 'index ' );
          casper.wait(1000,function(){
          // casper.fill('form.analyze-form',{
          //   'url':openTextUrl
          // },true);
          casper.evaluate(function(openTextUrl) {
                document.querySelector('.js-analyze-form-url').value = openTextUrl;
          },openTextUrl);

          casper.click('.analyze-form-button button');
          casper.log('input url :'+openTextUrl);
          //phantomcss.screenshot( '.analyze-form', 'onstart' );
      });
	});
  // .waitForUrl(/reports/g,function(){
  //     phantomcss.screenshot( '.page-wrapper', 'reports' );
  //     casper.click('.rules tr .rules-name');
  //     casper.wait(1000,funcion(){
  //       phantomcss.screenshot( '.page-wrapper', 'reports detail' );
  //     });
  // });
  casper.then( function () {
    // casper.waitForSelector('.rules',function(){
    //     phantomcss.screenshot( '.page-wrapper', 'reports' );
    //     casper.click('.rules tr .rules-name');
    //     casper.wait(1000,function(){
    //       phantomcss.screenshot( '.page-wrapper', 'reports detail' );
    //     });
    // });
    casper.log('waitFor start');
    casper.waitFor(function(){
          return this.evaluate(function() {
            return document.querySelectorAll('.rules').length > 0;
          });
      }, function then() {
            phantomcss.screenshot( '.page-wrapper', 'reports' );
            casper.click('.rules tr .rules-name a');
            //casper.wait(1000,function(){
              phantomcss.screenshot( '.page-wrapper', 'reports detail' );
          //  });
      },function timeout() {
          casper.log('waitFor timeout');
          phantomcss.screenshot( '.page-wrapper', 'waitFor timeout' );
      },60000
    );

  });


	casper.run( function () {
		console.log( '\nTHE END.' );
		// phantomcss.getExitStatus() // pass or fail?
		casper.test.done();
	} );

} );
