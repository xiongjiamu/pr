/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	$('.nav').find('.fa-bars').click(function () {
	    $('.nav-mb').toggle('normal');
	});

	$('ul.pc').find('li').click(function () {
	    $(this).addClass('cur').siblings().removeClass('cur');
	});

	$('#agenda').find('h4').click(function () {
	    var cl = $(this).parent().attr('class').indexOf('toggleon');
	    if (cl === -1) {
	        $(this).parent().addClass('toggleon');
	    } else {
	        $(this).parent().removeClass('toggleon');
	    }
	});

	(function ($) {
	    $(function () {

	        /*滚动触发导航悬浮事件*/
	        $(document).scroll(function () {
	            var scroll_t = parseInt($(document).scrollTop());
	            if (scroll_t > 84) {
	                $(".nav").addClass('navsBg');
	            } else {
	                $(".nav").removeClass('navsBg');
	            };
	            //  /*返回顶部*/
	            // scrolltopBar();
	        });
	    });
	})(jQuery);

	$.fn.banqh = function (can) {
	    can = $.extend({
	        box: null, //总框架
	        pic: null, //大图框架
	        pnum: null, //小图框架
	        prev_btn: null, //小图左箭头
	        next_btn: null, //小图右箭头                   
	        autoplay: false, //是否自动播放
	        interTime: 5000, //图片自动切换间隔
	        delayTime: 800, //切换一张图片时间                    
	        order: 0, //当前显示的图片（从0开始）
	        picdire: true, //大图滚动方向（true水平方向滚动）
	        mindire: true, //小图滚动方向（true水平方向滚动）
	        min_picnum: null }, can || {});
	    var picnum = $(can.pic).find('ul li').length;
	    var picw = $(can.pic).find('ul li').outerWidth(true);
	    var pich = $(can.pic).find('ul li').outerHeight(true);
	    var poppicw = $(can.pop_pic).find('ul li').outerWidth(true);
	    var picminnum = $(can.pnum).find('ul li').length;
	    var picpopnum = $(can.pop_pic).find('ul li').length;
	    var picminw = $(can.pnum).find('ul li').outerWidth(true);
	    var picminh = $(can.pnum).find('ul li').outerHeight(true);
	    var pictime;
	    var tpqhnum = 0;
	    var xtqhnum = 0;
	    var popnum = 0;
	    $(can.pic).find('ul').width(picnum * picw).height(picnum * pich);
	    $(can.pnum).find('ul').width(picminnum * picminw).height(picminnum * picminh);
	    $(can.pop_pic).find('ul').width(picpopnum * poppicw);

	    //点击小图切换大图
	    $(can.pnum).find('li').click(function () {
	        tpqhnum = xtqhnum = $(can.pnum).find('li').index(this);
	        show(tpqhnum);
	        minshow(xtqhnum);
	    }).eq(can.order).trigger("click");

	    if (can.autoplay == true) {
	        //自动播放
	        pictime = setInterval(function () {
	            show(tpqhnum);
	            minshow(tpqhnum);
	            tpqhnum++;
	            xtqhnum++;
	            if (tpqhnum == picnum) {
	                tpqhnum = 0;
	            };
	            if (xtqhnum == picminnum) {
	                xtqhnum = 0;
	            };
	        }, can.interTime);

	        //鼠标经过停止播放
	        $(can.box).hover(function () {
	            clearInterval(pictime);
	        }, function () {
	            pictime = setInterval(function () {
	                show(tpqhnum);
	                minshow(tpqhnum);
	                tpqhnum++;
	                xtqhnum++;
	                if (tpqhnum == picnum) {
	                    tpqhnum = 0;
	                };
	                if (xtqhnum == picminnum) {
	                    xtqhnum = 0;
	                };
	            }, can.interTime);
	        });
	    }
	    //小图左右切换            
	    $(can.prev_btn).click(function () {
	        if (tpqhnum == 0) {
	            tpqhnum = picnum;
	        };
	        if (xtqhnum == 0) {
	            xtqhnum = picnum;
	        };
	        xtqhnum--;
	        tpqhnum--;
	        show(tpqhnum);
	        minshow(xtqhnum);
	    });
	    $(can.next_btn).click(function () {
	        if (tpqhnum == picnum - 1) {
	            tpqhnum = -1;
	        };
	        if (xtqhnum == picminnum - 1) {
	            xtqhnum = -1;
	        };
	        xtqhnum++;
	        minshow(xtqhnum);
	        tpqhnum++;
	        show(tpqhnum);
	    });
	    //大图左右切换    
	    $(can.prev).click(function () {
	        if (tpqhnum == 0) {
	            tpqhnum = picnum;
	        };
	        if (xtqhnum == 0) {
	            xtqhnum = picnum;
	        };
	        xtqhnum--;
	        tpqhnum--;
	        show(tpqhnum);
	        minshow(xtqhnum);
	    });
	    $(can.next).click(function () {
	        if (tpqhnum == picnum - 1) {
	            tpqhnum = -1;
	        };
	        if (xtqhnum == picminnum - 1) {
	            xtqhnum = -1;
	        };
	        xtqhnum++;
	        minshow(xtqhnum);
	        tpqhnum++;
	        show(tpqhnum);
	    });
	    //小图切换过程
	    function minshow(xtqhnum) {
	        var mingdjl_num = xtqhnum - can.min_picnum + 2;
	        var mingdjl_w = -mingdjl_num * picminw;
	        var mingdjl_h = -mingdjl_num * picminh;

	        if (can.mindire == true) {
	            $(can.pnum).find('ul li').css('float', 'left');
	            if (picminnum > can.min_picnum) {
	                if (xtqhnum < 3) {
	                    mingdjl_w = 0;
	                }
	                if (xtqhnum == picminnum - 1) {
	                    mingdjl_w = -(mingdjl_num - 1) * picminw;
	                }
	                $(can.pnum).find('ul').stop().animate({ 'left': mingdjl_w }, can.delayTime);
	            }
	        } else {
	            $(can.pnum).find('ul li').css('float', 'none');
	            if (picminnum > can.min_picnum) {
	                if (xtqhnum < 3) {
	                    mingdjl_h = 0;
	                }
	                if (xtqhnum == picminnum - 1) {
	                    mingdjl_h = -(mingdjl_num - 1) * picminh;
	                }
	                $(can.pnum).find('ul').stop().animate({ 'top': mingdjl_h }, can.delayTime);
	            }
	        }
	    }
	    //大图切换过程
	    function show(tpqhnum) {
	        var gdjl_w = -tpqhnum * picw;
	        var gdjl_h = -tpqhnum * pich;
	        if (can.picdire == true) {
	            $(can.pic).find('ul li').css('float', 'left');
	            $(can.pic).find('ul').stop().animate({ 'left': gdjl_w }, can.delayTime);
	        } else {
	            $(can.pic).find('ul').stop().animate({ 'top': gdjl_h }, can.delayTime);
	        } //滚动
	        //$(can.pic).find('ul li').eq(tpqhnum).fadeIn(can.delayTime).siblings('li').fadeOut(can.delayTime);//淡入淡出
	        $(can.pnum).find('li').eq(tpqhnum).addClass("on").siblings(this).removeClass("on");
	    };
	    //弹出框图片切换过程
	    function popshow(popnum) {
	        var gdjl_w = -popnum * poppicw;
	        $(can.pop_pic).find('ul').stop().animate({ 'left': gdjl_w }, can.pop_delayTime);
	        //$(can.pop_pic).find('ul li').eq(tpqhnum).fadeIn(can.pop_delayTime).siblings('li').fadeOut(can.pop_delayTime);//淡入淡出
	    };
	};

	$('#demo1').banqh({
	    box: "#demo1", //总框架
	    pic: "#ban_pic1", //大图框架
	    pnum: "#ban_num1", //小图框架
	    prev_btn: "#prev_btn1", //小图左箭头   
	    next_btn: "#next_btn1", //小图右箭头   
	    autoplay: true, //是否自动播放
	    interTime: 5000, //图片自动切换间隔
	    delayTime: 400, //切换一张图片时间

	    order: 0, //当前显示的图片（从0开始）
	    picdire: true, //大图滚动方向（true为水平方向滚动）
	    mindire: true, //小图滚动方向（true为水平方向滚动）
	    min_picnum: 5 });

/***/ }
/******/ ]);