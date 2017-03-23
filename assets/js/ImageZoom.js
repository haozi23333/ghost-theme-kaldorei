/**
 * Created by haozi on 3/23/2017.
 */
(function (q) {
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
            $('body').append('<div class="animated ImageZoom-cover ImageZoom-blur"></div>')
            $('body').append('<div class="animated ImageZoom-loading"><div id="cssload-pgloading"><div class="cssload-loadingwrap"><ul class="cssload-bokeh"> <li></li><li></li> <li></li><li></li></ul></div></div></div>')
            $('body').append('<div class="animated ImageZoom-image"><div class="ImageZoom-image-box"></div></div>')
            $('.ImageZoom-cover').on('click', function () {
                modelWindow.exit()
            })
        },
        show: function (src) {
            /**
             * 加载模态窗体
             */
            $('.ImageZoom-cover').addClass('rotateIn').removeClass('rotateOut').css('display','block')
            $('.ImageZoom-loading').addClass('zoomIn').removeClass('zoomOut').css('display','block')
            $('.ImageZoom-image-box img').remove()
            loadImage(src, function (imageElement) {
                $('.ImageZoom-image').addClass('zoomIn').removeClass('zoomOut').css('display','block')
                $('.ImageZoom-loading').addClass('zoomOut').removeClass('zoomIn').css('display','none')
                $('.ImageZoom-image-box').css({
                    left: 'calc(50% - ' + (src.naturalwidth / 2)+'px)',
                    top: 'calc(50% - ' + (src.naturalheight / 2)+'px)'
                })
                $(imageElement).appendTo($('.ImageZoom-image-box'))
            })
        },

        hide: function () {
            $('.ImageZoom-cover').addClass('rotateOut').removeClass('rotateIn').css('display','none')

        },
        nextImage: function () {

        },
        exit: function () {
            $('.ImageZoom-cover').addClass('rotateOut').removeClass('rotateIn')
            setTimeout(function () {
                $('.ImageZoom-cover').css('display','none')
            }, 500)
            $('.ImageZoom-image').addClass('zoomOut').removeClass('zoomIn').css('display','none')
        }
    }

    $.fn.ImageZoom = ImageZoom
})(jQuery)