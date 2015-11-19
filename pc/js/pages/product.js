$(function(){

  // 产品首页
  !function(){
    var $index = $('.tea-product .index');
    var $pnav = $('.product-nav', $index);
    if($index.length > 0){
      var slider;
      var $testing = $('.testing', $index);

      slider = $index.find('.slider').bxSlider({
        // auto: true,
        pause: 5000,
        autoHover: true,
        controls: false,
        infiniteLoop: true,
        startSlide: 0,
        onSlideBefore: function($item, oldIndex, index){

        },
        onSlideAfter: function($item, oldIndex, index){

        }
      });

      $index.on('click', '.prev-slide', function(){
        slider.goToPrevSlide();
      }).on('click', '.next-slide', function(){
        slider.goToNextSlide();
      });

      $testing.on('click', '.item h3', function(){
        $(this).next('.answer').slideToggle(300);
        $(this).closest('.item').siblings('.item').find('.answer').slideUp(300);
      }).on('click', '.options li', function(){
        $(this).addClass('active').siblings('.active').removeClass('active');
      });


      var $items = $('.items', $testing);
      var $results = $('.results', $testing);

      // 选择
      $('.show-all').click(function(){
        var elem = $('.tea-list ul li');
        showtes(elem);
      });
      $('.reset').click(function(){
        $items.show();
        $results.hide();
      });


      $('.next').click(function(){
        $('.tea-list ul li').hide();
        var choose = $(this).parent().parent().find('ul li.active .name').data('choose');
        var elem = $('.' + choose);
        if(elem.length == 0){
          return false;
        }
        showtes(elem);
      });

      function showtes(elem){
        elem.removeClass('mr0 center two-center last-center');
        var len = len = elem.size();
        if(len == 1){
          elem.eq(0).addClass('center');
        }else if(len == 2){
          elem.eq(0).addClass('two-center');
        }else{
          for(var i = 0 ; i < len; i++){
            ((i+1)%3 == 0) && (elem.eq(i).addClass('mr0'));
          }

          if(len > 3 && len % 3 == 1){
            elem.last().addClass('last-center');
          }
        }
        $items.hide();
        $results.show();
        elem.show();
        $('html, body').stop().animate({
          scrollTop: $testing.offset().top
        }, 500);
      }
    }
  }();

  // section timeline
  var TL= {
    indexTest: function(){
      var $el = arguments[0];
      var timeline = new TimelineMax({paused: true});
      timeline.from( $('.head', $el), 0.5, { opacity: 0, scale: 0.5 } );
      timeline.staggerFrom($('.item', $el), 1, { opacity: 0, x: 200 , ease: 'Back.easeOut'}, 0.3);
      $el.data('timeline', timeline);
    },
    longjing5: function(){
      var $el = arguments[0];
      var timeline = new TimelineMax({paused: true});
      timeline.from($('.g1', $el), 1, { opacity: 0, y: -30 });
      timeline.from($('.g2', $el), 1, { opacity: 0, y: -30 }, '-=0.8');
      $el.data('timeline', timeline);
    },
    longjing11: function(){
      var $el = arguments[0];
      var timeline = new TimelineMax({paused: true});
      timeline.staggerFrom($('.items > *', $el), 0.3, { opacity: 0, y: 40, ease: 'Sine.easeOut' }, 0.1);
      $el.data('timeline', timeline);
    },
  }

  // 初始化WayPoint
  $('.sections [data-tl]').each(function(){
    if(isLtIe8()){
        return false;
    }
    var $this = $(this);
    // init TL
    TL[$this.data('tl')]($this);

    $this.waypoint({
      handler: function(direction){
        if(direction == 'down'){
          $this.data('timeline').play();
        }else{
          $this.data('timeline').reverse();
        }
      },
      offset: $(this).data('offset') || 0
    });
  });

  // Skroller
  var sk = skrollr.init({

  });
  function isLtIe8(){
    if($.browser.msie && parseInt($.browser.version) <= 8){
        return true;
    }
        return false;
    }
});
