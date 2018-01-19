define(function(require) {

    require('../../src/js/page/test/testComponent');
    require('../../src/js/page/test/testBehavior');
    var util = require('./common/util');

    describe("Behavior test", function() {
        var instance = null;

        before(function(down) {
            util.initComponent('testComponent', function(ins){
                instance = ins;
                down();
            });
        });

        it("get Behavior Attr", function() {
            expect(instance.alias).to.equal('wow');
        });

        it("click btn", function() {
            instance.nodes.btn.click();
            expect(instance.rootElement[0].style.color).to.equal('lightblue');
        });

        after(function(){
            util.destroyComponent(instance);
        });


    });

});