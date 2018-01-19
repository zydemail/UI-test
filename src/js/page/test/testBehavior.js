define(function(require, exports, module) {

    APP.createBehavior('myBehavior', {
        message: [''],
        onMessage: function(name, data) {},
        init: function() {
            var self = this;
            this.alias = 'wow';
            this.nodes.btn.on('click', function(e) {
                self.rootElement[0].style.color = 'lightblue';
            });

        }
    });
});