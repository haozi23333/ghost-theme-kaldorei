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
                    modelWindow.show($(this).attr('data-img') || 'https://haozi.moe/content/images/2016/11/ph.png')

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
            $(image).css({
                width: image.naturalWidth,
                height: image.naturalHeight
            })
            callback(image)
        }
    }
    var modelWindow = {
        init :function () {
            $('body').append('<div class="animated ImageZoom-cover ImageZoom-blur"></div>')
            $('body').append('<div class="animated ImageZoom-loading"><div id="cssload-pgloading"><div class="cssload-loadingwrap"><ul class="cssload-bokeh"> <li></li><li></li> <li></li><li></li></ul></div></div></div>')
            $('body').append('<div class="animated ImageZoom-image"><div class="ImageZoom-image-box"></div></div>')
            $('.ImageZoom-cover').on('click', function () {
                this.exit()
            })
        },
        show: function (src) {
            /**
             * 加载模态窗体
             */
            $('.ImageZoom-cover').addClass('rotateIn').css('display','block')
            $('.ImageZoom-loading').addClass('zoomIn').css('display','block')
            loadImage(src, function (imageElement) {
                $('.ImageZoom-loading').addClass('zoomOut').css('display','none')
                $('.ImageZoom-image').append(imageElement)
            })
        },

        hide: function () {
            $('.ImageZoom-cover').addClass('rotateOut').css('display','none')

        },
        nextImage: function () {

        },
        exit: function () {
            $('.ImageZoom-cover').addClass('rotateOut').removeClass('rotateIn').css('display','none')
            $('.ImageZoom-image').addClass('zoomOut').css('display','block')
        }
    }

    $.fn.ImageZoom = ImageZoom
})(jQuery)