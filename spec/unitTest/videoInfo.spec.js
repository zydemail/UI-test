define(function(require) {

    var videoInfo = require('../../src/js/page/playMovie/service/videoInfo');
    var config = {
        'ALBUM': {
            tvid: '479655400'
        },
        'MOVIE': {
            tvid: '423061600',
            vid: '2eed74a640b8c0e9dc27d79dc66d6ae8'
        },
        'SOURCE': {
            tvid: '482908600'
        },
        'SHORT': {
            tvid: '1473511409'
        }
    };

    describe("播放页视频信息接口测试", function() {

        it("电影信息", function(down) {
            var type = 'MOVIE';
            videoInfo.getVideoParams({
                tvid: config[type].tvid,
                vid: config[type].vid
            }).then(function(videoData) {
                expect(videoData).to.be.an('object');
                expect(videoData.templateType).to.equal(type);
                expect(videoData.videoName).to.not.be.empty;
                expect(videoData.period).to.have.lengthOf(8);
                expect(videoData.subType).to.exist;
                down();
            });
        });

    });

});