$(function(){

  // 产品首页
  !function(){
    var $index = $('.tea-tool .index');
    var $pnav = $('.product-nav', $index);
    if($index.length > 0){
      var slider;
      var $testing = $('.testing', $index);

      slider = $index.find('.slider').bxSlider({
        auto: true,
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
    }
  }();




  // Skroller
  var sk = skrollr.init({

  });

});
