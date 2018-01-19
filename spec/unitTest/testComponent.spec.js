define(function(require) {

    require('../../src/js/page/test/testComponent');
    var util = require('./common/util');

    describe("Component test", function() {
        var instance = null;

        before(function(down) {
            util.initComponent('testComponent', function(ins){
                instance = ins;
                down();
            });
        });

        // spec
        it("get Component Name", function() {
            expect(instance.getName()).to.equal('yoho');
        });

        it("click btn", function() {
            instance.nodes.btn.click();
            expect(instance.rootElement[0].style.backgroundColor).to.equal('orange');
        });

        after(function(){
            util.destroyComponent(instance);
        });

    });

});