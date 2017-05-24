/*
 * @Author: Administrator
 * @Date:   2017-04-12 20:02:06
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-04-16 17:37:27
 */

'use strict';

$(function() {
    /**
     * [description]
     * @ 根据屏幕宽度的变化决定
     * @return {[type]}   [description]
     */
    function resize() {
        // 获取屏幕的宽度
        var windowWidth = $(window).width();
        // 判断屏幕的大小
        var isSmallScreen = windowWidth < 768;
        // 获取到多个DOM元素。遍历
        $('#main_ad > .carousel-inner > .item').each(function(i, item) {
            var $item = $(item);
            var imgSrc = $item.data(isSmallScreen ? 'image-sm' : 'image-lg');
            $item.css('backgroundImage', 'url("' + imgSrc + '")');

            // 小图时要等比例缩放，要用img的方式
            if (isSmallScreen) {
                $item.html('<img src="' + imgSrc + '" alt="广告" />');
            } else {
                $item.empty();
            }
        });
    }
    // 让window对象立即出发一次resize
    $(window).on('resize', resize).trigger('resize');


    /**
     * 初始化tooltip插件
     */
    $('[data-toggle="tooltip"]').tooltip();

    /**
     * 控制标签页的标签容器宽度
     */
    var $ulContainer = $('.nav-tabs');
    // 获取所有子元素的宽度,li可能有padding
    var width = 30;
    // 遍历子元素
    $ulContainer.children().each(function(index, element) {
        // width等于所有li的宽度总和
        width += element.clientWidth;
        // 判断当前ul的宽度是否超出屏幕，如果超出就显示滚动条
        if (width > $(window).width()) {
            $ulContainer
                .css('width', width)
                .parent().css('overflowX', 'scroll')
        };

    });


    /**
     * 滑动轮播图换页
     */
    // 获取轮播图组件
    var $carousel = $('.carousel');
    var starX;
    var endX;
    var offset = 50;
    // 注册滑动开始事件
    $carousel.on('touchstart', function(e) {
        starX = e.originalEvent.touches[0].clientX;
    });
    $carousel.on('touchmove', function(e) {
        endX = e.originalEvent.touches[0].clientX;
    });
    $carousel.on('touchend', function(e) {
        // 结束触摸一瞬间记录最后X坐标值
        // 控制精度,当距离大于一定值时，认为有方向变化
        var distance = Math.abs(starX - endX);
        if (distance >= offset) {
            // 获取手指在轮播图上滑动方向
            // console.log(starX > endX ? '向左' : '向右');
            // 2. 根据方向选择上一张或下一张
            $(this).carousel(starX > endX ? 'next' : 'prev')
        }
    });




    /**
     * 给新闻列表注册点击事件
     */
    var $newsTitle = $('.news-title');
    $('.news .nav-pills a').on('click', function() {
        // 获取当前点击元素
        var $this = $(this);
        // 获取对应的data-title值
        var title = $this.data('title');
        // 将title值设置到相应的位置
        $newsTitle.text(title);
    })

});
