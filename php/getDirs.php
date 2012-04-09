<?php

require_once( dirname( __FILE__ ) . '/../config/config.php' );
require_once( dirname( __FILE__ ) . '/classes/FileBrowser.class.php' );


try {
	$fb = new FileBrowser(TOP_BROWSE_FOLDER);
	echo json_encode($fb->getDirectories(stripcslashes($_GET["path"])));	
} catch (Exception $e) {
	echo json_encode(false);
}

?>