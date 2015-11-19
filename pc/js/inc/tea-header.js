window._JSLoader = window._JSLoader || {};

!function(){
  var $hs = $('#header-inc');
  var target =  $hs.data('target');

  $hs.replaceWith('<div class="tea-header"/>');
  $('.tea-header').load(Path.root + '/html/inc/header.html', function(){
    _JSLoader.loadHeader = true;

    $('.tea-header').find('.nav .nav-item>a').eq(parseInt(target)).addClass('active');

    $('.tea-header a').each(function(){
      var $this = $(this);
      var href = $this.attr('href');
      if(href == 'javascript:;'){
        return;
      }
      $this.attr('href', Path.root + $this.attr('href'));
    });

    $('.tea-header img').each(function(){
      $(this).attr('src', Path.root + $(this).attr('src'));
    });

    var $member = $('#member_list');
    var flag_member_in = false;
     //member
    $('.member').mouseenter(function(){
        // fixed 定位，下面的就不需要了吧
        var left = $(this).offset().left;
        var s_top  = $(document).scrollTop();
        $member.css({left:left-10});
        // if(s_top < 78){
        //     $member.css({left:left-10,top:65+(78-s_top)});
        // }else{
        //     $member.css({left:left-10,top:65});
        // }
        statereset();
        $(this).addClass('member-up');
        $member.show();
    });
    $member.hover(function(){
        flag_member_in = true;
        console.log('111')
        $(this).addClass('member-up');
    },function(){
        if(flag_member_in){
            $(this).hide();
            flag_member_in = false;
            console.log('222')
            $('.member').removeClass('member-up');
        }
    });
    function statereset(){
        flag_member_in = false;
        $('.member').removeClass('member-up');
        $member.hide();
    }



    $(window).scroll(function(){
        flag_member_in = false;
        $('.member').removeClass('member-up');
        $member.hide();
    });

  });
}();
