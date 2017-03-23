/**
 * Created by haozi on 3/23/2017.
 */
(function (q) {
    /**
     * 给元素添加animate.css 的class并自动删除相反的 class
     * @param className 需要添加的 class
     * @returns {$}
     */
    $.fn.animateCSS = function (className) {
        if(!$(this).hasClass('animated'))
            $(this).addClass('animated')
        if(/In/.test(className)){
            $(this).removeClass(className.match(/(.*)In/)[1] + 'Out' + ' ' + className).addClass(className)
            $(this).css('display', 'block')
        }else {
            $(this).removeClass(className.match(/(.*)Out/)[1] + 'Out' + ' ' + className).addClass(className)
            var that = this
            setTimeout(function () {
                $(that).css('display', 'none')
            }, 400)
        }
        return this
    }

    var ImageZoom = function (setting) {
        modelWindow.init()
        var imgList = this.find('img')
        imgList.map(function (index, el){
            (function (index) {
                $(el).on('click',function (event) {
                    /**
                     * 停止冒泡
                     */
                    event.stopPropagation()
                    modelWindow.show($(this).attr('src') || 'https://haozi.moe/content/images/2016/11/ph.png')

                })
            })(index)
        })
    }

    /**
     * 加载Image
     * @param src  图片地址
     * @param callback  加载完成回调
     */
    function loadImage(src, callback) {
        var image = new Image(src)
        image.src = src
        image.onload = function () {
            $(image).removeAttr('width')
            callback(image)
        }
    }
    var modelWindow = {
        init :function () {
            $('body').append('<div class="ImageZoom-cover ImageZoom-blur"></div>')
            $('body').append('<div class="ImageZoom-loading"><div id="cssload-pgloading"><div class="cssload-loadingwrap"><ul class="cssload-bokeh"> <li></li><li></li> <li></li><li></li></ul></div></div></div>')
            $('body').append('<div class="ImageZoom-image"><div class="ImageZoom-image-box"></div></div>')
            $('.ImageZoom-cover').on('click', function () {
                modelWindow.exit()
            })
        },
        show: function (src) {
            /**
             * 加载模态窗体
             */
            $('.ImageZoom-loading').animateCSS('zoomIn')
            $('.ImageZoom-cover').animateCSS('zoomIn')
            $('.ImageZoom-image-box img').remove()
            loadImage(src, function (imageElement) {
                $('.ImageZoom-image').animateCSS('zoomIn')
                $('.ImageZoom-loading').animateCSS('zoomOut')
                $('.ImageZoom-image-box').css({
                    left: 'calc(50% - ' + (src.naturalwidth / 2)+'px)',
                    top: 'calc(50% - ' + (src.naturalheight / 2)+'px)'
                })
                $(imageElement).appendTo($('.ImageZoom-image-box'))
            })
        },

        hide: function () {
            $('.ImageZoom-cover').animateCSS('rotateOut')

        },
        nextImage: function () {

        },
        exit: function () {
            $('.ImageZoom-cover').animateCSS('rotateOut')
            $('.ImageZoom-image').animateCSS('zoomOut')
        }
    }

    $.fn.ImageZoom = ImageZoom
})(jQuery)