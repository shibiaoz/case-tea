$(function(){
    // 底部
    var $bottom_index = $('#reco ul li').index();
    var $bottom_ul    = $('#reco ul');
    var li_width      = 317;
    var last_index    = 0;
    $('#reco .next').click(function(){
        if($bottom_index == last_index){
            return false;
        }
        var index = $(this).index();
        $bottom_ul.animate({'margin-left':'-='+li_width});
        last_index++;
    });
    $('#reco .prev').click(function(){
        if(last_index == 0 ){
            return false;
        }
        var index = $(this).index();
        $bottom_ul.animate({'margin-left':"+="+li_width});
        last_index--;
    });


    // 购物车
    $('.certain .close').click(function(){
        $('.certain,.bg').hide();
    });
    $('.certain .apply').click(function(){
        var address_id = $("#address_id").val();
        $.post("index.php?r=/shop/orderSubmit/", {"address_id":address_id}, function (res) {
                  if(res.stat=="1"){
                      location.href = 'index.php?r=shop/succeed/&order_sn='+res.data.order_sn;
                  }
        }, "json");
    });

    $('.tea-shop .settlement').click(function(){
         var address_id = $("#address_id").val();
         $.get("index.php?r=/shop/getAddress/", {"id":address_id}, function (res) {
                  if(res.stat=="1"){
                      $("#addrname").html(res.data.consignee);
                      $("#addrmobile").html(res.data.mobile);
                      $("#addrarea").html(res.data.province+" "+res.data.city+" "+res.data.district);
                      $("#addrdetail").html(res.data.address);
                      $('.certain,.bg').show();
                  }
        }, "json");
    });
    //编辑收货地址
     $(".edit-address").bind("click",function(event){
        event.preventDefault();
        $('body,html').css('overflow', 'hidden');
        var address_id = $(this).attr("address_id");
        $.get("index.php?r=/shop/getAddress/", {"id":address_id}, function (res) {
                  if(res.stat=="1"){
                        if(res.data.default=="1"){
                           // $('.ui-checkbox').click();
                            $('.add-address').trigger('flag_click',true);
                          //  $("#UserAddress_default").attr("checked",true).show();
                        }else{
                            $('.add-address').trigger('flag_click',false);
                            // $("#UserAddress_default").removeAttr("checked");
                        }
                       $('.new-address,.bg').show(0, function(){
                        var $this = $(this);
                        $('#UserAddress_consignee').val(res.data.consignee);
                        $("#UserAddress_mobile").val(res.data.mobile);
                        $("#UserAddress_areacode").val(res.data.areacode);
                        $("#UserAddress_telphone").val(res.data.telphone);
                        $("#UserAddress_address").val(res.data.address);

                        function cmbAddOption(cmb, str, obj)
                        {
                                var option = document.createElement("OPTION");
                                cmb.options.add(option);
                                option.innerHTML = str;
                                option.value = str;
                                option.obj = obj;
                        }
                        addressInit('UserAddress_province', 'UserAddress_city', 'UserAddress_district');
                        $('select').selectBox();
                        $("#UserAddress_province").val(res.data.province);
                         //级联菜单联动开始
                         var cmbCity = document.getElementById("UserAddress_city");
                         var cmbArea = document.getElementById("UserAddress_district");
                         cmbCity.onchange = null;
                         var provinceName = res.data.province;
                         var k,province,cityList,areaList;
                         for(var i=0; i<provinceList.length; i++)
                         {
                            if(provinceList[i].name==provinceName){
                                k = i;
                                province = provinceList[i];
                                cityList = provinceList[i].cityList;
                                break;
                            }
                         }
                        cmbCity.options.length = 0;
                        for(var i=0; i<cityList.length; i++)
                        {
                            cmbAddOption(cmbCity, cityList[i].name, cityList[i]);
                        }
                        $("#UserAddress_city").val(res.data.city);
                        cmbArea.options.length = 0;
                        for(var j=0; j<cityList.length; j++)
                        {
                            if(cityList[j].name==res.data.city){
                                areaList = cityList[j].areaList;
                            }
                        }
                        cmbCity.onchange = function(){
                            cmbArea.options.length = 0;
                            if(cmbCity.selectedIndex == -1)return;
                            for(var i=0; i<cityList[cmbCity.selectedIndex].areaList.length; i++)
                            {
                                    cmbAddOption(cmbArea, cityList[cmbCity.selectedIndex].areaList[i], null);
                            }
                        };
                        cmbArea.options.length = 0;
                        for(var i=0; i<areaList.length; i++)
                        {
                            cmbAddOption(cmbArea, areaList[i], areaList);
                        }
                        $("#UserAddress_district").val(res.data.district);
                        $("#UserAddress_address_id").val(res.data.address_id);
                      });
                  }
        }, "json");
     });
      $('.add-address').bind('click',function(event,flag_check){
          $('.add-address').trigger('flag_click',false);
      });
     //显示添加收货地址
     $('.add-address').bind('flag_click',function(event,flag_check){
        $('body,html').css('overflow', 'hidden');
        addressInit('UserAddress_province', 'UserAddress_city', 'UserAddress_district');
        $('select').selectBox();
        $('.new-address,.bg').show(0, function(){
          var $this = $(this);
          $('input[type=text]', $this).val('');
          //$('input[name=UserAddress[consignee]]', $this).focus();
        });
        var span = $('span.ui-checkbox');
        var me   = $("input[type='checkbox']");
        if(flag_check){
          me.prop('checked', true);
          span.addClass('sp1-ui-checkbox-checked').removeClass('sp1-ui-checkbox');
        }else{
          me.prop('checked', false);
          span.addClass('sp1-ui-checkbox').removeClass('sp1-ui-checkbox-checked');
        }
        me.trigger('change');
    });
    $('.new-address .close').click(function(){
        $('body,html').css('overflow', '');
        $('.new-address,.bg').hide();
    });
    $('.new-address .save').click(function(){
        $('body,html').css('overflow', '');
        //TODO: 添加新地址的保存按钮,看后端需求
        $.post("index.php?r=/shop/addressAdd/", $("#addressForm").serialize(), function (res) {
                  if(res.stat=="0"){
                      alert(res.msg);
                      return false;
                  }else{
                     window.location.reload();
                  }
        }, "json");
    });
     //下单成功页面二维码显示
    $('.pay ul li').click(function(){
        //$('.pay ul li').removeClass('active').find('.qr').slideUp();
      //  $(this).toggleClass('active').find('.qr').slideDown();
    });

    function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    //下单成功页面二维码显示
    $('.pay ul li').click(function(){
         var th  = $(this);
         $.get("index.php?r=/shop/qrcode/",{"order_sn":products.order_sn}, function (res) {
                  if(res.stat=="1"){
                      $("#weixinPayImg").attr("src","http://paysdk.weixin.qq.com/example/qrcode.php?data="+res.data);
                      th.toggleClass('active').find('.qr').fadeToggle();
                  }
        }, "json");
    });

    $('.online .nav li').click(function(){
      var index = $(this).index();
      if(index == 0){
        location.hash = '#tea';
      }else{
        location.hash = '#tea-set';
      }
      $(this).addClass('active').siblings().removeClass('active');
      $('.online .tag').hide().eq($(this).index()).show();
    });

    function updateTotalPrice(){
        var totalPrice  = 0;
        $.each($("li.clearfix"),function(){
            var th = $(this);
            var rowCnt     = parseInt(th.attr("goods_number"))*parseFloat(th.attr("good_price"));
            totalPrice +=rowCnt;
        });
        $(".money-count").html("总计<span>RMB"+totalPrice+"</span>");
    }

    function saveCartData(goods_id,number){
          $.post("index.php?r=/shop/updateCart/", {"goods_id":goods_id,"number":number}, function (res) {
                    if(res.stat=="1"){
                       updateTotalPrice();
                    }
          }, "json");
    }
    function changeRowTotalPrice(goods_id){
       var rowCnt = $(".rowCnt"+goods_id);
      alert("111"+rowCnt.html());
    }

    //数量添加
    $('.add').click(function(){
      var elem   = $(this).parent().find('.count input');
      var number = parseInt(elem.val());
      number     = number+1;
      var li     =  $(this).parents("li");
      var goods_id = $(this).attr("goods_id");
      li.attr("goods_number",number);
      saveCartData(goods_id,number);
      var rowCnt = $(".rowCnt"+goods_id);
      var good_price = $(this).attr("good_price");
      rowCnt.html(number*good_price);
      elem.val(number);
    });
    $('.sub').click(function(){
       var elem   = $(this).parent().find('.count input');
       var number = parseInt(elem.val());
       if(number == 0 ){return false;}
       number = number-1;
       var li    =  $(this).parents("li");
       var goods_id = li.attr("goods_id");
       li.attr("goods_number",number);
       saveCartData(goods_id,number);
       var rowCnt = $(".rowCnt"+goods_id);
       var good_price = $(this).attr("good_price");
       rowCnt.html(number*good_price);
       elem.val(number);
    });
    $('.count input').change(function(){
      if(isNaN($(this).val())){
        alert('请输入数字');
        $(this).val(1);
      }
      return false;
    });
});
