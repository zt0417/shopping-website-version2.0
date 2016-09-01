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
		$sql="SELECT i.id, i.itemName, it.itemTypeName, i.itemPicture, i.itemDescription, i.itemType, i.isHot
	  			FROM items AS i 
	  			INNER JOIN itemTypes AS it 
	  			ON it.id = i.itemType
	 		 	HAVING i.itemType = '$id' AND i.isHot IS NULL";

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
<meta http-equiv="Content-Type" content="text/html"; charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/contentIndex.js"></script>
<link type="text/css" rel="stylesheet" href="css/style.css">
<link type="text/css" rel="stylesheet" href="css/foot.css">
<link type="text/css" rel="stylesheet" href="css/healthCare.css">

<title>E-Commerce</title>
</head>
<body>
<div class="col-sm-1"></div>
<div class="col-sm-10">
	<div class="page-header nopadding" id="nomargin">
		<div id="floatleft">
			<a href="index.php">
				<img src="images/logo.gif" height="55px" weight="250px" border="0">
			</a>
		</div>
    	<h1>同&nbsp;&nbsp;福&nbsp;&nbsp;杂&nbsp;&nbsp;货&nbsp;&nbsp;铺<p id="floatright" class="contentWord"><img src="images/weChat.jpg" alt="">联系我们： wechat_1234</p></h1>

    </div>

		<table class="table" id="tab">
			<thead>
			  <tr>
			    <h2 class="addPadding subTitle"><?php if (isset($itemType)) {
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
					    		<img src="<?php echo $value["itemPicture"] ?>"  class="img-thumbnail" alt="Cinque Terre" width="600" height="600"></img>
					    	</td>
					    	<td><h3><?php echo $value["itemName"];?></h3><br />
					    		<h4 class="description"><?php echo $value["itemDescription"];?></h4>
					    	</td>
			<?php 
						echo"</tr></tbody>";
						}
					}
			?>
		</table>
	<div/>
</div>


<div class="container col-sm-12">
	<div>
		<div class="changePage" ><!-- 总共有 <?php echo $count; ?> 条记录, 每页显示 <?php echo $pageCout; ?> 条记录, 总共有 <?php echo $pages; ?> 页  --><a  href="<?php if (isset($_GET['id'])) {
		echo ('healthCare.php?id=' . $_GET['id'] . '&page=' . (($page == 1) ? $page : $page - 1));
	}
	else if (isset($_GET['itemBrand'])) {

		echo ('healthCare.php?itemBrand=' . $_GET['itemBrand'] . '&page=' . (($page == 1) ? $page : $page - 1));
	}?>">上一页</a>, <a class="changePage" href="<?php if(isset($_GET['id'])){

		echo ('healthCare.php?id=' . $_GET['id'] . '&page=' . (($page == $pages) ? $pages : $page + 1));
	}
	else if (isset($_GET['itemBrand'])) {

		echo ('healthCare.php?itemBrand=' . $_GET['itemBrand'] . '&page=' . (($page == $pages) ? $pages : $page + 1));
	}?>">下一页</a>
		</div>
	</div>
</div>


<div class="footBlank"></div>

<div class="footContent">
	<div class="splitLine"></div>
	<div class="footBlank"></div>
	<div class="footerCenter ">
		<div class="col-sm-3">
			<h4>关于我们</h4>
			<h5><a href="about.html">关于同福</a></h5>
			<h5><a href="contactMe.html">联系我们</a></h5>
			<h5><a href="suggest.html">意见反馈</a></h5>
		</div>
		<div class="col-sm-3">
			<h4>商家服务</h4>
			<h5><a href="businessCenter.html">商家中心</a></h5>
		</div>
		<div class="col-sm-3">
			<h4>同福帮助</h4>
			<h5><a href="helpCenter.html">同福帮助中心</a></h5>
			<h5><a href="shoppingHelp.html">购物帮助</a></h5>
		</div>
		<div class="col-sm-3">
			<h4>关注我们</h4>
			<h5>微信</h5>
			<h5><a href="#">新浪微博</a></h5>
		</div>
	</div>
</div>

<div class="footBlank"></div>

</body>
</html>