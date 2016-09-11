<?php
    //
    include_once "classes/PDOHelper.class.php";

    // item type name
    $itemType = "";
    $total = "";
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $pageCout = 10;
    $count = 0;

    if(isset($_GET["id"]))
    {
        // get id
        $id = $_GET["id"];

        // get inforamtion by id
        $pdo = new PDOHelper(array('charset'=> 'UTF8'));

        // build query string to get itemtypeName info.
        $sql ="SELECT * FROM itemTypes WHERE id = '$id'";

        // get itemtypeName.
        $res = $pdo->getRow($sql);

        // set itemtype.
        $itemType =$res["itemTypeName"];

        //build query string
        $sql = "SELECT COUNT(*) AS total FROM items WHERE itemType = '$id'";

        //call pdoHelper method getRow() and get result.
        $res = $pdo->getRow($sql);
    }
    else if (isset($_GET["itemBrand"])) {

        // get name of itemBrand
        $itemBrand = $_GET["itemBrand"];

        // initial PDOHelper.
        $pdo = new PDOHelper(array('charset'=> 'UTF8'));

        // build query string to get itemtypeName info.
        $sql ="SELECT COUNT(*) AS total FROM items WHERE itemBrand = $itemBrand";

        // get itemtypeName.
        $res = $pdo->getRow($sql);

    }

    // get total records.
    $count = $res['total'];

    // get total pages.
    $pages = ceil($count / $pageCout);

    // if page number is less than 1, set 1 to it.
    if ($page < 1) {
        $page = 1;
    }

    // if page number is greater than MAX page number, set MAX page number to page number.
    if ($page > $pages) {
        $page = $pages;
    }

    $offset = ($page - 1) * $pageCout;


    $limit = " limit {$offset}, {$pageCout}";

    if (isset($_GET["id"])) {
        $sql="SELECT i.id, i.itemName, it.itemTypeName, i.itemPicture, i.itemDescription, i.itemType
                FROM items AS i 
                INNER JOIN itemTypes AS it 
                ON it.id = i.itemType
                HAVING i.itemType = '$id'";

        $sql .= $limit;
    }
    else if (isset($_GET["itemBrand"])) {

        $sql ="SELECT * FROM items WHERE itemBrand = $itemBrand";

        $sql .= $limit;
    }

    $pdo = new PDOHelper(array('charset'=> 'UTF8'));
    $res = $pdo->getAll($sql);

?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>同福杂货铺</title>
<meta name="baidu-site-verification" content="rnyMiv2JC1" />
<link href="css/comm.css" rel="stylesheet" type="text/css" /> 
<link rel="stylesheet" href="css/bootstrap.min.css">
<script type="text/javascript" src="js/jquery-1.5.1.min.js" charset="gb2312"></script>
<script type="text/javascript" src="js/jquery.countdownTimer.min.js" charset="gb2312"></script>
<script type="text/javascript" src="js/user-defined.js" charset="gb2312"></script>

<link rel="stylesheet" type="text/css" href="css/index.css">
<link type="text/css" rel="stylesheet" href="css/sortPage.css">

<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/index.js"></script>


</head>

<body style="background-color: #f4f8f9;">
<style type="text/css" media="screen">.ic_nav .grid_c1{position: relative;}</style>
<!--[if !IE]>|xGv00|cd7101d01d2175464b4ea36a5cf3264b<![endif]-->
<!-- 头部start -->
<div class="ic_toolbar">
    <div class="grid_c1">
        <div class="mod_entry"></div>
    </div>
</div>

<div class="ic_header nopadding">
    <div class="grid_c1">  
        <div class="mod_logo">
            <h1>
               <a href="index.html" ytag="00300"><img class="logo" src="img/logo.png" alt="同福杂货铺" /></a>
            </h1>        
        </div>
    </div>
</div>
<div><img src="img/middle.jpg"></div>
<div class="col-sm-1"></div>
<div class="col-sm-10">
    <div class="page-header nopadding" id="nomargin">

        <table class="table" id="tab">
            <thead>
                <tr>
                    <h2 class="addPadding subTitle brand-tit"><?php if (isset($itemType)) { 
                        echo $itemType; 
                    }
                    else if (isset($itemBrand)) {
                    echo $itemBrand;
                    }?>
                    </h2>
                </tr>
            </thead>
            <?php
                if ($res != null) {
                    foreach ($res as $value) {
                    echo "<tbody><tr>";
            ?>
            <td>
                <img src="<?php echo $value["itemPicture"];?>"  class="img-thumbnail" id="imgSize"></img>
            </td>
            <td>
                <h3><?php echo $value["itemName"];?></h3><br />
                <h4 style = "line-height:1.5" class="description"><?php echo $value["itemDescription"];?></h4>
            </td>
            <?php 
                echo"</tr></tbody>";
                    }
                }
            ?>
        </table>
    </div>
</div>

<div class="container col-sm-12">
    <div>
        <div class="changePage" ><!-- 总共有 <?php echo $count; ?> 条记录, 每页显示 <?php echo $pageCout; ?> 条记录, 总共有 <?php echo $pages; ?> 页  --><a  href="<?php if (isset($_GET['id'])) {
        echo ('sortPage.php?id=' . $_GET['id'] . '&page=' . (($page == 1) ? $page : $page - 1));
    }
    else if (isset($_GET['itemBrand'])) {

        echo ('sortPage.php?itemBrand=' . $_GET['itemBrand'] . '&page=' . (($page == 1) ? $page : $page - 1));
    }?>">上一页</a>, <a class="changePage" href="<?php if(isset($_GET['id'])){

        echo ('sortPage.php?id=' . $_GET['id'] . '&page=' . (($page == $pages) ? $pages : $page + 1));
    }
    else if (isset($_GET['itemBrand'])) {

        echo ('sortPage.php?itemBrand=' . $_GET['itemBrand'] . '&page=' . (($page == $pages) ? $pages : $page + 1));
    }?>">下一页</a>
        <br/><br/>
        </div>
    </div>
</div>



<div class="mod_backtop hide" id="j_backtop"><a href="javascript:" title="回顶部" ytag="72300">回顶部</a></div>
<div class="ic_market" id="j_market">
    <div class="grid_c1">
        <a target="_blank" class="market_link" href="#" ytag="70000"><img src="img/bottompic.jpg" class="market_img_1" /></a>
    </div>

<div class="ic_footer col-sm-12">
    <div class="ic_footer_inner">
        </br></br>
        <div class="mod_help">                  
            <div class="mod_help_item">
                <h5>常用服务</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70100" rel="nofollow">问题咨询</a></li>
                    <li><a target="_blank" href="#" ytag="70101" rel="nofollow">修改订单</a></li>
                    <li><a target="_blank" href="#" ytag="70102" rel="nofollow">催办订单</a></li>
                </ul>
            </div>                  
            <div class="mod_help_item">
                <h5>购物</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70200" rel="nofollow">怎样购物</a></li>
                    <li><a target="_blank" href="#" ytag="70202" rel="nofollow">订单状态说明</a></li>
                </ul>
            </div>                  
            <div class="mod_help_item">
                <h5>付款</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70300" rel="nofollow">货到付款</a></li>
                    <li><a target="_blank" href="#" ytag="70301" rel="nofollow">在线支付</a></li>
                    <li><a target="_blank" href="#" ytag="70302" rel="nofollow">其他支付方式</a></li>
                    <li><a target="_blank" href="#" ytag="70303" rel="nofollow">发票说明</a></li>
                </ul>
            </div>                  
            <div class="mod_help_item">
                <h5>配送</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70400" rel="nofollow">同福快递</a></li>
                    <li><a target="_blank" href="#" ytag="70401" rel="nofollow">价格保护</a></li>
                </ul>
            </div>                  

            <div class="mod_help_item">
                <h5>售后</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70500" rel="nofollow">售后服务政策</a></li>
                    <li><a target="_blank" href="#" ytag="70501" rel="nofollow">退换货服务流程</a></li>
                    <li><a target="_blank" href="#" ytag="70502" rel="nofollow">优质售后服务</a></li>
                </ul>
            </div>                  

            <div class="mod_help_item">
                <h5>供货商家</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70600" rel="nofollow">采购地点</a></li>
                </ul>
            </div>              
        </div>     
    </div>
</div>











</div>

<script>
 var b = $("#j_backtop");
        if (b.length > 0) {
            var c = document.documentElement.clientHeight || document.body.clientHeight;
            var a = Math.min(c, 500);
            $(window).bind("scroll resize",
            function() {
                var e = $(this).scrollTop();
                if (e < a) {
                    b.fadeOut()
                } else {
                    b.fadeIn()
                }
                if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
                    var d = c - 200 + e;
                    b.css({
                        top: d
                    })
                }
            });
            b.click(function() {
                $(window).scrollTop(0);
                return false
            })
        }
</script><!--[if !IE]>|xGv00|214340f353f2e67f2068580a6653e1d8<![endif]-->


<br/><br/>
</body>
</html>