   /**
    * @class Waterfall
    * @classdesc 瀑布流布局
    * @desc options下四个参数,hs水平间距,默认值0,vs垂直间距,默认0,clo列数,默认取父容器的最大容量
    */
   function Waterfall(wrap, options) {
       var _this = this;
       this.hs = options.hs || 0;
       this.vs = options.vs || 0;
       this.clo = options.column;
       this._init = function () {
           var boxes = wrap.children("div");
           var length = boxes.length;
           var img = [];
           var flag = 0;
           var clo = this.clo;
           //获取wrap宽度;
           var boxW = wrap.outerWidth();
           //子元素宽度
           var childW = boxes.outerWidth(true);
           console.log(boxW)
           console.log(boxes[0].offsetWidth)
           //空数组记录
           var columnHeightArr = [];
           //计算列数
           var nClo = Math.floor(boxW / childW);
           if (!clo || clo > nClo) {
               //数组记录列数个高度
               clo = nClo;
           }
           boxes.each(function (index, item) {
               img[index] = new Image();
               img[index].src = $(item).find("img").attr('src')
               img[index].onload = function () {
                   flag++;
                   // console.log(length)
                   if (flag == length) {
                       boxes.each(function (index, item) {
                           if (index < clo) {
                               //第一行
                               columnHeightArr[index] = $(item)
                                   .outerHeight(true)
                               $(item).css({
                                   position: 'absolute',
                                   top: 0,
                                   left: (childW + _this.hs) *
                                       index +
                                       'px',
                                   opacity: 1
                               });
                           } else {
                               //第一行之后
                               var minHeight = Math.min.apply(null,
                                       columnHeightArr),
                                   minHeightIndex = $.inArray(
                                       minHeight,
                                       columnHeightArr);
                               // console.log(minHeightIndex)
                               $(item).css({
                                   position: 'absolute',
                                   top: parseInt(minHeight) +
                                       _this.vs +
                                       'px',
                                   left: boxes.eq(
                                           minHeightIndex)
                                       .position().left,
                                   opacity: 1
                               });
                               columnHeightArr[minHeightIndex] += $(
                                       item)
                                   .outerHeight(true) + _this.vs;
                           }
                       })
                   }
               }
           })
       }
       this._init();
       $(window).resize(function () {
           _this._init();
       })
   }
   $.fn.extend({ //注册为jQuery方法
       Waterfall: function (options) {
           new Waterfall($(this), options)
       }
   })