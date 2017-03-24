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
            if(image.naturalHeight > $('.ImageZoom-image').height()) {
                var boxWidth = $('.ImageZoom-image').width() - 50,
                    boxHeight = $('.ImageZoom-image').height() - 50,
                    width = boxHeight * image.naturalWidth / image.naturalHeight,
                    height = image.naturalHeight * width / image.naturalWidth
                $('.ImageZoom-image-box').css({
                    left: 'calc(50% - ' + (width / 2) +'px)',
                    top: 'calc(50% - ' + (height / 2) +'px)',
                    'max-height': boxHeight + 'px',
                    'max-width': boxWidth + 'px',
                    width: width + 'px',
                    height: height + 'px'
                })
                $(image).css({
                    width: width + 'px',
                    height: height + 'px'
                })
            }else {
                $(image).css('margin',($('.ImageZoom-image').height() / 2) - (image.naturalHeght)/2  + 'px auto 0')
                $('.ImageZoom-image-box').css({
                    left: 'calc(50% - ' + (image.naturalWidth / 2) +'px)',
                    top: 'calc(50% - ' + (image.naturalHeight / 2) +'px)',
                    width: image.naturalWidth + 'px',
                    height: image.naturalHeight + 'px'
                })
            }
            callback(image)
        }
    }
    var modelWindow = {
        init :function () {
            //最外一层的遮罩
            $('body').append('<div class="ImageZoom-cover ImageZoom-blur"></div>')
            //loading 界面
            $('body').append('<div class="ImageZoom-loading"><div id="cssload-pgloading"><div class="cssload-loadingwrap"><ul class="cssload-bokeh"> <li></li><li></li> <li></li><li></li></ul></div></div></div>')
            //图片显示界面
            $('body').append('<div class="ImageZoom-image"><div class="ImageZoom-image-box"></div></div>')
            //当图片层被点击的时候退出图片放大
            $('.ImageZoom-image').on('click', function () {
                modelWindow.exit()
            })
        },
        show: function (src) {
            /**
             * 加载模态窗体
             */
            $('.ImageZoom-loading').animateCSS('rotateInDownLeft')
            $('.ImageZoom-cover').animateCSS('zoomIn')
            $('body').css('overflow', 'hidden')
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
            $('body').css('overflow', 'auto')
            $('.ImageZoom-cover').animateCSS('rotateOut')
            $('.ImageZoom-image').animateCSS('zoomOut')
        }
    }

    $.fn.ImageZoom = ImageZoom
})(jQuery)