$(document).ready(function () {

    var $panels = $('#slider .scrollContainer > div');
    var $container = $('#slider .scrollContainer');

    var horizontal = false;

    if (horizontal) {
        $panels.css({
            'float' : 'left',
            'position' : 'relative' 
        });


        $container.css('width', $panels[0].offsetWidth * $panels.length);
    }

    var $scroll = $('#slider .scroll').css('overflow', 'hidden');

    function selectNav() {
        $(this)
            .parents('ul:first')
                .find('a')
                    .removeClass('selected')
                .end()
            .end()
            .addClass('selected');
    }

    $('#slider .navigation').find('a').click(selectNav);

    function trigger(data) {
        var el = $('#slider .navigation').find('a[href$="' + data.id + '"]').get(0);
        selectNav.call(el);
    }

    if (window.location.hash) {
        trigger({ id : window.location.hash.substr(1) });
    } else {
        $('ul.navigation a:first').click();
    }

    var offset = parseInt((horizontal ? 
        $container.css('paddingTop') : 
        $container.css('paddingLeft')) 
        || 0) * -1;

    var scrollOptions = {
        target: $scroll, // the element that has the overflow
        items: $panels,

        navigation: '.navigation a',

        prev: 'img.left', 
        next: 'img.right',

        axis: 'xy',

        onAfter: trigger, 

        offset: offset,
        duration: 500,
        easing: 'swing'
    };
    $('#slider').serialScroll(scrollOptions);
    $.localScroll(scrollOptions);
    $.localScroll.hash(scrollOptions);

});