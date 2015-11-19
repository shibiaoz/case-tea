// fullpage
$(function () {
    +function () {
        // fullpage
        var $section = $('.section').not(".section-5");

        function fullSection() {
            var winHeight = $(window).height();
            $section.height(winHeight);
            var width = $(window).width();
            var $detailed = $(".section-5", ".tea-main");
            $("li", $detailed).width(Math.floor((width - 7 - 7) / 3));
        }

        $(window).resize(fullSection);
    }();

    // full-img
    +function () {
        // 图片的比例
        var scale = 1420 / 730;
        var minHeight = 800;

        // 根据图片比例，位置
        function fullimg() {
            var winWidth = $(window).width();
            var winHeight = $(window).height();

            var $fullimg = $(".full-img");

            var goalWidth = null;
            var goalHeight = null;
            if (winWidth / winHeight >= scale) {
                goalWidth = winWidth;
                goalHeight = Math.ceil(winWidth / scale);
            } else {
                goalHeight = winHeight;
                goalWidth = winHeight * scale;
            }

            $fullimg.show().css({
                width: goalWidth,
                height: goalHeight,
                margin: Math.ceil(-goalHeight / 2) + "px 0 0 " + Math.ceil(-goalWidth / 2) + "px"
            }).each(function () {
                var vertical = $(this).data('vertical');
                if (vertical && vertical == 'bottom') {
                    $(this).css({
                        margin: Math.ceil(-goalHeight / 2) + "px 0 0 " + Math.ceil(-goalWidth / 2) + "px"
                    })
                }
            });
        }

        $(window).resize(fullimg);
    }();

    // scroll
    +function () {
        var $section = $('.section').not(".section-5");
        var $menuWrap = $('.menu-wrap');

        var $list = $("li", $menuWrap);
        var $size = $list.size();
        var detailed = $(".section-5");
        $('body').bind('mousewheel', function (event, delta) {
            var pow = 250;
            var time = 500;
            delta = delta > 0 ? 1 : -1;
            var scrollTop = $(window).scrollTop() - (delta * pow);
            scrollTop = scrollTop >= 0 ? scrollTop : 0;
            +function () {
                var height = $section.eq(0).height();
                var index, number = scrollTop / height;
                index = Math.floor(number);
                if (index >= $size) {
                    index = $size - 1;
                }
                $list.removeClass("on");
                $list.eq(index).addClass("on");
            }();

            $('html, body').stop().animate({
                scrollTop: scrollTop
            }, time, 'easeOutQuad');
            return false;
        });
        /* Section5 */
        +function(){
           var timeline = new TimelineMax({paused: true});
           timeline.staggerFrom($("li", detailed), 1, {
               opacity: 0,
               y: 30,
               ease: 'Back.easeOut'
           }, 0.3);
           detailed.waypoint({
               handler: function(direction){
                   if(direction == 'down'){
                       timeline.play();
                       $menuWrap.fadeOut();
                   }else{
                       timeline.reverse();
                       $menuWrap.fadeIn();
                   }
               },
               offset: "70%"
           });
        }();
        +function(){
            var headroom = $(".tea-header").height();
            var slide = function($ele){
                var index = $ele.index();
                var top = $section.eq(index).offset().top;
                $('html, body').stop().animate({
                    scrollTop: top-headroom
                }, 500);
                $list.removeClass("on");
                $ele.addClass("on");
            };
            var direction  = $(".direction", ".menu-wrap");
            direction.bind("click",function(){
                var origin,on = $("ul > .on",".menu-wrap");
                if($(this).is(".up")){
                    origin = on.prev();
                    if(origin.length==0){
                        origin = $list.first();
                    }
                }
                else{
                    origin = on.next();
                    if(origin.length==0){
                        origin = $list.last();
                    }
                }
                slide(origin);
            });
            $list.bind("click",function(){
                slide($(this));
            });
        }();

    }();

    // main
    +function () {
        $(window).trigger('resize');
        skrollr.init({
            smoothScrolling: true,
            easing: {
                WTF: Math.random,
                inverted: function (p) {
                    return 1 - p;
                }
            }
        });

        $(window).load(function () {
            $(window).scrollTop(0);
        });
    }();
});

