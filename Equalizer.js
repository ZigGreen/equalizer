function setEqualizer($element, timeout, colWidth, mode) {
    colWidth = colWidth || 1;
    var cssMode = mode == "css";
    var trinsitionFn = cssMode ? css_animation : jq_animation;
    if (cssMode) $element.css('transition-duration', timeout+'ms').addClass('equalizer-css');
    if (cssMode) timeout *= 2;
    $element.css({
        verticalAlign: 'bottom',
        lineHeight: $element.height() + 'px'
    });
    // Кол-во столбиков
    var colQuantity = Math.ceil($element.width() / colWidth);
    var cols = new Array(colQuantity);
    for(var i = 0; i < cols.length; i++) {
        $('<span>').css('width', colWidth).appendTo($element);
    }
    $element.find('span').each(function(i, el) {
        setInterval(trinsitionFn, timeout -100, $element.height(), $(el), timeout)
    })
}

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
    }, timeout/2)
}