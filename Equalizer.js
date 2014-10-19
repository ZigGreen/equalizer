(function(factory) {
    if(typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function($) {

    function jq_animation(maxHeight, el, timeout) {
        var colHeight = Math.round(maxHeight * Math.random());
        el.stop(true).animate({
            height: colHeight
        }, {
            duration: timeout,
            easing: 'linear'
        }).animate({
            height: maxHeight / 2
        }, {
            duration: timeout,
            easing: 'linear',
        });
    }

    function css_animation(maxHeight, el, timeout) {
        var colHeight = Math.round(maxHeight * Math.random());
        el.css({
            height: colHeight
        });
        setTimeout(function() {
            el.css({
                height: maxHeight / 2
            });
        }, timeout / 2)
    }

    $.fn.equalizer = function(settings) {

        var opts = $.extend({
            colWidth: 5,
            mode: 'js',
            duration: 1e3,
            barElName: 'span'
        }, settings);


        var cssMode = opts.mode == "css";

        var trinsitionFn = cssMode ? css_animation : jq_animation;

        if(cssMode) this.css('transition-duration', opts.duration + 'ms').addClass('equalizer-css');

        if(cssMode) opts.duration *= 2;

        this.css({
            verticalAlign: 'bottom',
            lineHeight: this.height() + 'px'
        });

        // Кол-во столбиков
        var colQuantity = Math.ceil(this.width() / opts.colWidth);

        var cols = new Array(colQuantity);
        for(var i = 0; i < cols.length; i++) {
            $('<' + opts.barElName + '>')
                .css('width', opts.colWidth)
                .appendTo(this);
        }

        [].forEach.call(this.find(opts.barElName), function(el) {
            setInterval(trinsitionFn, opts.duration, this.height(), $(el), opts.duration)
        }, this)
    };
}));