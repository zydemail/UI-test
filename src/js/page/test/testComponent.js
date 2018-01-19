define(function(require, exports, module) {

    APP.define('myComponent', {
        message: [''],
        onMessage: function(name, data) {},
        init: function() {
            this.name = "yoho";
        },
        listeners: {
            click: function(event, element, eleType) {
                if (eleType == "btn") {
                    this.rootElement[0].style.backgroundColor = 'orange';
                }
            }
        },
        getName: function(){
            return this.name || '';
        }
    });
});