// fullpage
$(function () {
  var $swiper = $('.swiper-container');
  var swiperAnimateTimer;
  var scrollTop = function(time){
    $('html, body').stop().animate({
      scrollTop: 0
    }, time || 1500, 'easeOutQuad');
  };

  var scrollBottom = function(time){
    $('html, body').stop().animate({
      scrollTop: $('body').height()
    }, time || 1500, 'easeOutQuad');
  };
  var mySwiper, timeline = [];
  var time = 6000, disTimer, lastTimer, isAnimation = false;

  !function(){

    var t1 = new TimelineMax({paused: true});
    var $el1 = $('.section-1', $swiper);
    t1.staggerFrom($el1.find('.section-detailed > *'), 0.8, {opacity: 0, y: -10}, 0.3);
    t1.call(function(){
      scrollTop(0);
      enableMousewheelControl();
    });
    timeline.push(t1);

    var t2 = new TimelineMax({paused: true});
    var $el2 = $('.section-2', $swiper);
    t2.staggerFrom($el2.find('.section-detailed > *'), 0.8, {opacity: 0, y: -10}, 0.3);
    t2.call(function(){
      scrollTop(0);
      enableMousewheelControl();
    });
    timeline.push(t2);

    var t3 = new TimelineMax({paused: true});
    var $el3 = $('.section-3', $swiper);
    t3.staggerFrom($el3.find('.section-detailed > *'), 0.8, {opacity: 0, y: -10}, 0.3);
    t3.call(function(){
      scrollTop(0);
      enableMousewheelControl();
    });
    timeline.push(t3);

    var t4 = new TimelineMax({paused: true});
    var $el4 = $('.section-4', $swiper);
    t4.staggerFrom($el4.find('.section-detailed > *'), 0.8, {opacity: 0, y: -10}, 0.3);
    t4.call(function(){
      isAnimation = false;
    });
    timeline.push(t4);

  }();


  +function(){
    var $section = $(".section",$swiper);
    mySwiper = new Swiper($swiper.get(0),{
      pagination: '.menu-wrap .pagination',
      mode: 'vertical',
      speed: 1000,
      autoplay: false,
      mousewheelControl: true,
      loop: false,
      grabCursor: false,
      paginationClickable: true,
      //autoplay: time,
      progress: true,
      onFirstInit: function(swiper){
        if(!$.browser.msie){
          swiper.disableMousewheelControl();
        }
      },
      onProgressChange: function(swiper){
        if(!!mySwiper){
          if(swiper.progress !== 1){
            if(!!disTimer){
              clearTimeout(disTimer);
              enableMousewheelControl();
            }
            $swiper.data('scroll',false);
          }
        }
      },
      onSwiperCreated: function(swiper){
        timeline[swiper.activeIndex].play();
      },
      onSlideChangeStart: function(swiper){
        if(!!swiperAnimateTimer){
          clearTimeout(swiperAnimateTimer);
        }

        var activeIndex = swiper.activeIndex;
        $section.eq(activeIndex).trigger("play");
        if(!$.browser.msie){
          disableMousewheelControl();
        }
        isAnimation = true;

        // 1s 后执行Section 动画
        swiperAnimateTimer = setTimeout(function(){
          $.each(timeline, function(index, item){
            if(swiper.activeIndex == index){
              return;
            }
            item.reverse();
          });

          if(swiper.activeIndex==3){
            disableMousewheelControl();
          }
          var tl = timeline[swiper.activeIndex];
          tl.pause(0);
          tl.play();
        }, 1000);

      },
      onSlideChangeEnd: function(swiper){
      }
    });

    var direction  = $(".direction", ".menu-wrap");
    direction.bind("click",function(e){
      e.preventDefault();
      if($(this).is(".up")){
        mySwiper.swipePrev();
      }
      else{
        mySwiper.swipeNext();
      }
    });
  }();

  function enableMousewheelControl(){
    mySwiper.disableMousewheelControl();
    mySwiper.enableMousewheelControl();
  }

  function disableMousewheelControl(){
    mySwiper.disableMousewheelControl();
  }

  function isIE() { //ie
    if (!!window.ActiveXObject || "ActiveXObject" in window){
      return true;
    }else{
      return false;
    }
  }

  +function(){
    var footer = $(".tea-footer");
    $('body').bind("mousewheel", function(event){
      var $target = $(event.target);
      // 最后一屏 再往上
      if(event.deltaY >= 1){
        scrollTop();
        isAnimation = false;
      }
      if($target.hasClass('section-4') || $target.closest('.section-4').length > 0){
        if(event.deltaY >= 1){
          if($(document).scrollTop()==0){
            enableMousewheelControl();
            $swiper.data('scroll',false);
          }
        }else{
           if(isAnimation==true){
              if(!isIE()){
                return false;
              }else if(parseInt($.browser.version)>8){
                return;
              }
            }
            disableMousewheelControl();
            scrollBottom();
        }
      }

      if(!isIE()){
        return false;
      }
    });
    scrollTop(0);
  }();


  /* Section5 */
  /*
  +function(){
     var detailed = $(".section-5");
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
             }else{
                 timeline.reverse();
             }
         },
         offset: "60%"
     });
  }();
  */
});

