/**
 * Main JS file for kaldorei behaviours
 */

/* globals jQuery, document */
(function($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function() {
        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e) {
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        $(window).scroll(function() {
            var scrollerToTop = $('.backTop');
            var scrollerTOC = $('.widget-toc');
            document.documentElement.scrollTop + document.body.scrollTop > 200 ?
                scrollerToTop.fadeIn() :
                scrollerToTop.fadeOut();
            document.documentElement.scrollTop + document.body.scrollTop > 250 ?
                scrollerTOC.addClass("widget-toc-fixed") :
                scrollerTOC.removeClass("widget-toc-fixed");
            $('.widget-toc').css('width', $('.widget-tag-cloud').width())
        });

        $(window).on('resize', function () {
            $('.widget-toc').css('width', $('.widget-tag-cloud').width())
        })
        // #backTop Button Event
        $("#backTop").on("click", function() {
            scrollToTop();
        });


        var toc = $('.toc');
        // toc config
        toc.toc({
            content: ".post-content",
            headings: "h2,h3,h4,h5"
        });

        if (toc.children().length == 0) $(".widget-toc").hide();

        var tocHieght = toc.height();
        var tocFixedHeight = $(window).height() - 192;
        tocHieght > tocFixedHeight ?
            toc.css('height', tocFixedHeight) :
            toc.css('height', tocHieght)

        $(window).resize(function() {
            var tocFixedHeight = $(this).height() - 192;
            tocHieght > tocFixedHeight ?
                toc.css('height', tocFixedHeight) :
                toc.css('height', tocHieght)
        })

        // toc animate effect
        // bind click event to all internal page anchors
        $('a.data-scroll').on('click', function(e) {
            // prevent default action and bubbling
            e.preventDefault();
            e.stopPropagation();
            // set target to anchor's "href" attribute
            var target = $(this).attr('href');
            // scroll to each target
            $(target).velocity('scroll', {
                duration: 500,
                easing: 'ease-in-out'
                //easing: 'spring'
            });
        });

        // tooltip config
        $('[data-rel=tooltip]').tooltip();


        // add archives year
        var yearArray = new Array();
        $(".archives-item").each(function() {
            var archivesYear = $(this).attr("date");
            yearArray.push(archivesYear);
        });
        var uniqueYear = $.unique(yearArray);
        for (var i = 0; i < uniqueYear.length; i++) {
            var html = "<div class='archives-item fadeInDown animated'>" +
                "<div class='archives-year'>" +
                "<h3><time datetime='" + uniqueYear[i] + "'>" + uniqueYear[i] + "</time></h3>" +
                "</div></div>";
            $("[date='" + uniqueYear[i] + "']:first").before(html);
        }
    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function(options) {
        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);
        allOptions.elem.click(function(event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({
                    scrollTop: ($(this.hash).offset().top + toMove)
                }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({
                    scrollTop: toMove
                }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({
                    scrollTop: ($(this.hash).offset().top)
                }, allOptions.speed);
            }
        });
    };

    aceInit()

    $(".post-content").ImageZoom({

    })
})(jQuery);

function scrollToTop(name, speed) {
    if (!speed) speed = 300
    if (!name) {
        $('html,body').animate({
            scrollTop: 0
        }, speed)
    } else {
        if ($(name).length > 0) {
            $('html,body').animate({
                scrollTop: $(name).offset().top
            }, speed)
        }
    }
}

// 背景彩带
// jQuery('body').append('<canvas id="caidai" style="z-index: 9999999999999999999999;position: fixed;top: 1px;pointer-events: none;"></canvas>');
// var c=document.getElementsByTagName("canvas")[0],x=c.getContext("2d"),pr=window.devicePixelRatio||1,w=window.innerWidth,h=window.innerHeight,f=90,q,m=Math,r=0,u=m.PI*2,v=m.cos,z=m.random;c.width=w*pr;c.height=h*pr;x.scale(pr,pr);x.globalAlpha=0.6;function i(){x.clearRect(0,0,w,h);q=[{x:0,y:h*0.7+f},{x:0,y:h*0.7-f}];while(q[1].x<w+f){d(q[0],q[1])}}function d(e,b){x.beginPath();x.moveTo(e.x,e.y);x.lineTo(b.x,b.y);var a=b.x+(z()*2-0.25)*f,g=y(b.y);x.lineTo(a,g);x.closePath();r-=u/-50;x.fillStyle="#"+(v(r)*127+128<<16|v(r+u/3)*127+128<<8|v(r+u/3*2)*127+128).toString(16);x.fill();q[0]=q[1];q[1]={x:a,y:g}}function y(b){var a=b+(z()*2-1.1)*f;return(a>h||a<0)?y(b):a}document.onclick=i;document.ontouchstart=i;i();/*1488120172*/


function aceInit() {
    var baseUrl = document.URL.match(/http(s*):\/\/(.*?)\//)[0]
    if(document.getElementsByTagName('pre').length == 0){
        console.log('Ace.js 未加载 -> 没有找到代码段')
        return
    }
    $.getScript(baseUrl + 'assets/ace-min-1.2.6/ace.js').done(function () {
        $.getScript(baseUrl + 'assets/ace-min-1.2.6/ext-static_highlight.js').done(function () {
            console.log('Ace.js 加载完成')
            ace.config.set('basePath', baseUrl + 'assets/ace-min-1.2.6/');
            var highlight = ace.require("ace/ext/static_highlight")
            var dom = ace.require("ace/lib/dom")
            $('pre code').map(function (index, el) {
                var p = el.className.split('-')
                $(el).attr({
                    'ace-mode': 'ace/mode/' + (p[1] || "plain_text"),
                    'ace-theme': 'ace/theme/' + (p[2] || "chrome"),
                    'gutter': p[3] || true
                })
                highlight(el, {
                    mode: el.getAttribute("ace-mode"),
                    theme: el.getAttribute("ace-theme"),
                    startLineNumber: 1,
                    trim: true,
                    showGutter: el.getAttribute("gutter")
                })
            })
        }).fail(function () {
            console.log('Ace.js 未加载 -> static_highlight.js 文件不存在')
        })
    }).fail(function () {
        console.log('Ace.js 未加载 -> ace.js 文件不存在')
    })

}


