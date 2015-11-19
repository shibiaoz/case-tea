"use strict";
var $window = $(window);
var $body = $('body');

/**
 * UI类
 * @type {Object}
 */
var UI = {
  /**
   * CheckBox
   * @param  {[type]} ctx [description]
   * @return {[type]}     [description]
   */
  checkbox: function(ctx) {
    ctx.find("input[type='checkbox']").each(function() {
      var me = $(this).css('visibility', 'hidden');
      var isChecked = me.prop('checked');
      var className = me[0].className ? me[0].className : '';
      var $wrap = $("<span class='ui-checkbox icon-sp1 sp1-ui-checkbox " + className + "'></span>").css({
        'display': 'inline-block',
        '*display': 'inline',
        '*zoom': 1,
        'cursor': 'pointer',
        'vertical-align': 'middle'
      });

      if (isChecked) {
        $wrap.addClass('sp1-ui-checkbox-checked').removeClass('sp1-ui-checkbox');
      }
      var label = me.parent();
      me.wrap($wrap);


      label.find('.ui-checkbox').append('<i></i>');

      if ((label[0]).tagName.toLowerCase() == "label") {
        label.bind("click", function(event) {
          var span = $(this).find('span.ui-checkbox');
          var target = event.target;
          if (target.tagName.toLowerCase() == "input") {
            return false;
          } else {
            // console.dir(target);
            if (me.prop('checked')) {
              me.prop('checked', false);
              span.addClass('sp1-ui-checkbox').removeClass('sp1-ui-checkbox-checked');
            } else {
              me.prop('checked', true);
              span.addClass('sp1-ui-checkbox-checked').removeClass('sp1-ui-checkbox');
            }
            me.trigger('change');
            return false;
          }
        });
      } else {
        $wrap.on("click", function(e) {
          console.log('sdf')
          if (e.target.nodeName == "SPAN") {
            if (me.prop('checked')) {
              $(this).addClass('sp1-ui-checkbox').removeClass('sp1-ui-checkbox-checked');
            } else {
              $(this).addClass('sp1-ui-checkbox-checked').removeClass('sp1-ui-checkbox');
            }
            me.trigger('click');
            return false;
          }
        });
        me.on('change', function() {
          if (me.prop('checked')) {
            me.parent('span.ui-checkbox').addClass('sp1-ui-checkbox-checked').removeClass('sp1-ui-checkbox');
          } else {
            me.parent('span.ui-checkbox').addClass('sp1-ui-checkbox').removeClass('sp1-ui-checkbox-checked');
          }
        });
      }
    });
  },
  /**
   * Radio
   * @param  {[type]} ctx [description]
   * @return {[type]}     [description]
   */
  radio: function(ctx) {
    ctx.find("input[type='radio']").each(function() {
      var me = $(this).css('visibility', 'hidden');
      var name = me.attr('name');
      var isChecked = me.prop('checked');
      var className = me[0].className ? me[0].className : '';
      var $wrap = $("<span class='ui-radio icon-sp1 sp1-ui-radio " + className + "'></span>").css({
        'display': 'inline-block',
        '*display': 'inline',
        '*zoom': 1,
        'cursor': 'pointer',
        'vertical-align': 'middle'
      });
      if (isChecked) {
        $wrap.addClass('sp1-ui-radio-checked').removeClass('sp1-ui-radio');
      }
      var label = me.parent();
      me.wrap($wrap);

      label.find('.ui-radio').append('<i></i>');

      var click = function() {
        ctx.find("input:radio[name=" + name + "]").parent().addClass('sp1-ui-radio').removeClass('sp1-ui-radio-checked');
        me.parent('span.ui-radio').addClass('sp1-ui-radio-checked').removeClass('sp1-ui-radio');
      };
      if ((label[0]).tagName.toLowerCase() == "label") {
        label.bind("click", function() {
          click();
          return false;
        });
      } else {
        $wrap.on("click", function(e) {
          if (e.target.nodeName == "SPAN") {
            ctx.find('input:radio[name=' + name + ']').parent().addClass('sp1-ui-radio').removeClass('sp1-ui-radio-checked');
            if (me.prop('checked')) {
              $(this).addClass('sp1-ui-radio-checked').removeClass('sp1-ui-radio');
            }
            me.trigger('click');
            return false;
          }
        });
        me.on('change', function() {
          click();
        });
      }
    });
  },
  /**
   * 页面UI初始化
   * @return {[type]} [description]
   */
  initUI: function(context){
    var _this = this;
    setTimeout(function(){
      var $context = $(context || 'body');
      if($('.ui-select', $context).length > 0){
        // 下拉框
        $('.ui-select', $context).selectBox();
        $(".selectBox-dropdown-menu", $context).mCustomScrollbar();
      }
      if($('input[placeholder]', $context).length > 0){
        // placeholder
        $('input[placeholder]', $context).placeholder();
      }

      // 复选
      _this.checkbox($context);
      // 单选
      _this.radio($context);
    }, 0);
    return this;
  }
}

/**
 * Header
 * @type {Object}
 */
var Header = {
  flag: false,
  _init: function(){
    if(this.flag){
      return false;
    }
    this.$el = $('.tea-header');
    if(this.$el.length > 0){
      this._bindEvent();
      this.flag = true;
    }
  },
  _bindEvent: function(){
    var state = true;
    this.$el.on('click', '.quick .search', function(){
      state = false;
      var $this = $(this);
      $this.addClass('hide');
      var $quick = $(".quick",this.$el);
      var $searchBox = $('.search-box',$quick);
      $searchBox.removeClass('hide').find('input').focus();
      TweenMax.to($searchBox, 0.5, { width: 175,opacity: 1 ,onComplete:function(){
        state = true;
      }});
    }).on('click', '.search-box .search-btn', function(){
      state = false;
      var $quick = $(".quick",this.$el);
      var $searchBox = $('.search-box',$quick);
      var $search = $('.search',$quick);
      $search.removeClass('hide');
      TweenMax.to($searchBox, 0.5, {
        width: 60,
        opacity: 0,
        //当动画执行完毕
        onComplete: function () {
          $searchBox.addClass('hide');
          state = true;
        }
      });
    }).on('mouseleave', '.nav-item', function(){
      $(this).find('.nav-wrap').stop(true,false).slideUp();
    }).on('mouseover','.nav-item',function(){
      var _self_a = $(this).find('a');
      if(_self_a.hasClass('active') && (_self_a.hasClass('product-n') || _self_a.hasClass('tea-tool-n') )){
        $(this).find('.nav-wrap').stop(true,false).slideDown();
      }
    })
  }
}

var Footer = {
  flag: false,
  _init: function(){
    if(this.flag){
      return false;
    }
    this.$el = $('.tea-footer');
    if(this.$el.length > 0){
      this._bindEvent();
      this.flag = true;
    }
  },
  _bindEvent: function(){
    this.$el.on('click', '.gotop', function(){
      $('html, body').stop().animate({
        scrollTop: 0
      }, 500);
    });
    this.$el.on('click','.weixin',function(){
      $('.bg-marker,.weixin-layout').show();
    });
    this.$el.on('click','.weixin-back',function(){
      $('.bg-marker,.weixin-layout').hide();
    });
  }
}

$(function(){
  Header._init();
  Footer._init();

  UI.initUI();

  // 如果Dom 是由js文件加入来的确保事件会绑定上，
  // 这里在后端进行文件include后可以删除
  window._JSLoader = window._JSLoader || {};
  if(_JSLoader.loadHeader){
    $window.load(function(){
      Header._init();
    });
  }

  if(_JSLoader.loadFooter){
    $window.load(function(){
      Footer._init();
    });
  }
  //吸顶
  +function(){
    var header = $(".tea-header",$body);
    var headernav = $("#header-nav",$body);
    if(headernav.size() == 0 ){
      $body.add(header).addClass("headroom");
    }else{
      var top = header.height();
      $window.on("scroll",function(event){
        if($(window).scrollTop() > top){
          headernav.addClass("headroom");
          headernav.trigger('headroom.resize');
          if(!!headernav.data('hide')){
            $('.' + headernav.data('hide')).hide();
          }
        }else{
          headernav.removeClass("headroom");
        }
      });
    }
  }();

});
