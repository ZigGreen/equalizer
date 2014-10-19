(function(factory) {
    if(typeof define === 'function' && define.amd) {
        define(['jquery', 'd3'], factory);
    } else {
        factory(jQuery, d3);
    }
}(function($, d3) {

    /**
     * Шаг анимации js
     **/
    function jq_animation(maxHeight, el, timeout) {
        var colHeight = Math.round(maxHeight * Math.random());
        el.stop(true).animate({
            height: colHeight
        }, {
            step: function(now, tween) {
                void 0;
            },
            duration: timeout,
            easing: 'linear'
        }).animate({
            height: maxHeight / 2
        }, {
            duration: timeout,
            easing: 'linear',
        });
    }

    /**
     * Шаг анимации css
     **/
    function css_animation(maxHeight, el, timeout) {
        var colHeight = Math.round(maxHeight * Math.random());
        //просто меняем высоту, css transition сделает всю анимацию за нас.
        el.css({
            height: colHeight
        });
        setTimeout(function() {
            el.css({
                height: maxHeight / 2
            });
        }, timeout)
    }



    /**
     * Логика для отрисовки эквалайзера
     * в виде svg rect`ов
     **/
    function d3Animate($element, options) {

        function slide() {
            var col = d3.select(this);
            /**
             * Шаг анимации svg
             **/
            (function repeat() {
                col = col.transition()
                    .attr("y", function(d) {
                        return(d.h = d.maxHeight / 2);
                    })
                    .attr("height", function(d) {
                        return d.h;
                    })
                    .transition()
                    .attr("y", function(d) {
                        return d.maxHeight - (d.h = Math.random() * d.maxHeight);
                    })
                    .attr("height", function(d) {
                        return d.h;
                    })
                    .each("end", repeat);
            })();
        }

        // вписываем svg в элемент
        var svg = d3.select($element[0])
            .append("svg:svg")
            .attr("width", $element.width())
            .attr("height", $element.height());
        
        // генерим rect`ы
        var col = svg.selectAll("rect")
            .data(d3.range(options.colQuantity).map(function() {
                return {
                    maxHeight: $element.height()
                }
            }))
            .enter()
            .append("svg:rect")
            .attr("x", function(rect, i) {
                return options.colWidth * i;
            })
            .attr("y", $element.height())
            .attr("fill", "pink")
            .attr('width', options.colWidth)
            .transition()
            .ease('liner')
            .duration(options.duration)
            .each(slide);

    }

    /**
     * Эквалайзер как jq модуль
     **/
    $.fn.equalizer = function(settings) {
        //TODO: вообще стоит разделить на три сущности, реализующие одинаковый интерфейс. 

        var opts = $.extend({
            colWidth: 5,
            mode: 'js',
            duration: 1e3,
            barElName: 'span'
        }, settings);

        // Кол-во столбиков
        opts.colQuantity = Math.ceil(this.width() / opts.colWidth);

        // Для svg-мода логика совсем другая.
        if(opts.mode == "svg") {
            d3Animate(this, opts);
            return this;
        }


        this.css({
            verticalAlign: 'bottom',
            lineHeight: this.height() + 'px'
        });


        for(var i = 0; i < opts.colQuantity; i++)
            $('<' + opts.barElName + '>')
                .css('width', opts.colWidth)
                .css('height', 0)
                .appendTo(this);


        var cssMode = opts.mode == "css";

        var trinsitionFn = cssMode ? css_animation : jq_animation;

        if(cssMode) this.css('transition-duration', opts.duration + 'ms').addClass('equalizer-css');

        // forEach в данном случае удобнее $.each из-за возможности передать контекст
        [].forEach.call(this.find(opts.barElName), function(el) {
            setInterval(trinsitionFn, opts.duration * 2, this.height(), $(el), opts.duration)
        }, this)
    };
}));