$(function () {
  var $main = $(".tea-main");
  // 幻灯片
  !function(){
    var $wrap = $(".section-4", $main);
    $wrap.each(function(){
      var $section = $(this);
      var $title = $(".section-title", $section);
      var $detailed = $(".banner-list", $section);
      var $p = $("li>p",$detailed);
      var timeline = new TimelineMax({paused: true});
      timeline.from($detailed, 0.5, {opacity: 0, scale: 0.8});
      $title.waypoint({
          handler: function (direction) {
              if (direction == 'down') {
                  timeline.play();
              } else {
                  timeline.reverse();
              }
          },
          offset: "40%"
      });
      var number = 3;
      var $ul = $(".banner-wrap > ul", $section);
      var $list = $("li",$ul);
      var len = Math.floor($list.size() / number); 
      len = ($list.size() % number ==0?len:len+1);
      var index = 0;
      $(".direction", $section).bind("click",function(){
        var $ele = $(this);
        var direction = $ele.data("direction");
        direction == "before" ? (index--):(index++);
        (index<0) && (index = 0);
        (index>=len) && (index = len-1);
        $ul.stop().animate({
            "left":(index*100*-1)+"%"
        });
      });
      //IE8
      if($list.size() % number !=0 && !+[1,] == true){
        $list.last().css({
            "margin-right":"0"
        });
      };
    });
  }();  
  // Skroller
  var sk = skrollr.init({

  });
});
