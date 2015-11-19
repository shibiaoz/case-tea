$(function(){
    var $four_ol       = $('.four-seasons ol li');
    var $four_ul       = $('.four-seasons .solid ul');
    var $four_fs_txt   = $('.four-seasons .fs-txt');
    var $four_box_list = $('.four-seasons .box-list');
    var last_four = 0,last_time = 0;
    $four_fs_txt.eq(0).fadeIn();
    $four_ol.click(function(){
        var index = $(this).index();
        if(index == last_four){return ;}
        last_four = index;
        $four_ol.removeClass('active');
        $(this).addClass('active');
        $four_ul.animate({marginLeft:-(960 * index)});
        $four_fs_txt.fadeOut();
        $four_fs_txt.eq(index).fadeIn();
        $four_box_list.removeClass('active').eq(index).addClass('active');
    });

    var $time_ol       = $('.time ol li');
    var $time_ul       = $('.time .solid ul');
    var $time_fs_txt   = $('.time .fs-txt');
    var $time_box_list = $('.time .box-list');
    $time_fs_txt.eq(0).fadeIn();
    $time_ol.click(function(){
        var index = $(this).index();
        if(index == last_time){return ;}
        last_time = index;
        $time_ol.removeClass('active');
        $(this).addClass('active');
        $time_ul.animate({marginLeft:-(960 * index)});
        $time_fs_txt.fadeOut();
        $time_fs_txt.eq(index).fadeIn();
        $time_box_list.removeClass('active').eq(index).addClass('active');
    });


    // 上一步下一步
    $('.four-seasons .prev').click(function(){
        if(last_four == 0){
            return false;
        }
        $four_ol.eq(last_four-1).click();
    });
    $('.four-seasons .next').click(function(){
        if(last_four == 3){
            return false;
        }
        $four_ol.eq(last_four+1).click();

    });
    $('.time .prev').click(function(){
        if(last_time == 0){
            return false;
        }
        $time_ol.eq(last_time-1).click();
    });
    $('.time .next').click(function(){
        if(last_time == 2){
            return false;
        }
        $time_ol.eq(last_time+1).click();
    });
});
