$(function(){
    !function(){
      $('.dialog-box', 'body').on('show', function(){
        $('.bg').show()
        $(this).show().find('input').fadeIn().focus().blur();
      }).on('hide', function(){
        $('.bg').add($(this)).hide();
      });


      $("body").on('click', '#changePassword', function(event) {
         $('.change-password.cp-step1').trigger('show');
      }).on('click', '.change-password.cp-step1 .save', function(event) {
                $.post("index.php?r=/member/repasswd/", $("#repasswd-form").serialize(), function (res) {
                      if(res.stat=="1"){
                            $('.change-password.cp-step1').trigger('hide');
                            $('.change-password.cp-step2').trigger('show');
                      }else{
                          alert(res.msg);
                          return false;
                      }
                  }, "json");

      }).on('click', '.close', function(event) {
        $(this).parents(".dialog-box").hide();
        $(".bg").hide();
      }).on('click', '.show-validation', function(event) {
         var vtype = $(this).attr("vtype");
          $(".phone-validation.pv-step1").trigger('show');
         if(vtype=="mobile"){
           $('input[name="which"]').eq(0).parent("span").click();
         }else if(vtype=="email"){
             $('input[name="which"]').eq(1).parent("span").click();
         }
      }).on('click', '.phone-validation.pv-step1 .next', function(event) {
        if($(this).parents(".phone-validation").find('.ui-radio').eq(0).hasClass('sp1-ui-radio-checked')){
          $(".phone-validation.pv-step1").trigger('hide');
          $('.phone-validation.pv-step2').trigger('show');
        }else{
             $.post("index.php?r=/member/sendEmail/", {}, function (res) {
                      if(res.stat=="1"){
                          $(".phone-validation.pv-step1").trigger('hide');
                          $('.email-validation.ev-step2').trigger('show');
                       }else{
                           alert(res.msg);
                       }
         },'json')
        }
      }).on('click', '.phone-validation.pv-step2 .next', function(event) {
        //$('.phone-validation.pv-step2').trigger('hide');
        //$('.phone-validation.pv-step3').trigger('show');
      }).on('click', '.phone-validation.pv-step3 .next', function(event) {
        $('.phone-validation.pv-step3').trigger('hide');
        $('.phone-validation.pv-step4').trigger('show');
      }).on('click', '.phone-validation.pv-step4 .next', function(event) {
        $('.phone-validation.pv-step4').trigger('hide');
        $('.phone-validation.pv-step5').trigger('show');
      }).on('click', '.email-validation.ev-step2 .next', function(event) {
            $.post("index.php?r=/member/sendEmail/", {}, function (res) {
                      if(res.stat=="1"){
                          $(".phone-validation.pv-step1").trigger('hide');
                          $('.email-validation.ev-step2').trigger('show');
                       }else{
                           alert(res.msg);
                       }
         },'json')
         //$(".email-validation.ev-step2").trigger('hide');
         //$('.email-validation.ev-step3').trigger('show');

      }).on('click', '.email-validation.ev-step3 .next', function(event) {
         $(".email-validation.ev-step3").trigger('hide');
         $('.email-validation.ev-step4').trigger('show');
      }).on('click', '.email-validation.ev-step4 .next', function(event) {
         $(".email-validation.ev-step4").trigger('hide');
         $('.email-validation.ev-step5').trigger('show');
      })


    }();

});
