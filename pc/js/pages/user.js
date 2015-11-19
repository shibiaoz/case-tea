$(function(){
    $('.ui-input').on('focus', function  () {
        $(this).data('placeholder',$(this).attr('placeholder'));
        $(this).removeAttr('placeholder');
    }).on('blur', function  () {
        if ($(this).val() == "" || $(this).val().length < 1) {
            $(this).attr('placeholder',$(this).data('placeholder'));
        }
    });

});
