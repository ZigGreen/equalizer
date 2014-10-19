/**
 * Created with equalizer.
 * User: ZigGreen
 * Date: 2014-10-19
 * Time: 09:41 AM
 */
requirejs.config({
    paths: {
        jquery: '/bower_components/jquery/dist/jquery.min',
        d3: '/bower_components/d3/d3'
    }
})
require(['jquery', 'Equalizer'], function($) {

    var width = 3,
        duration = 3e2,
        config = {
            duration: duration,
            colWidth: width,
            mode: window.location.hash.substr(1) || "js"
        }
    $('#eq_1 .equalizer').equalizer(config);
    $('#eq_2 .equalizer').equalizer(config);
    $('#eq_3 .equalizer').equalizer(config);
    $(window).on('hashchange', function() {
        window.location.reload()
    });

});