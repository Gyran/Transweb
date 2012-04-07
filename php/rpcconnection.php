<?php

require_once( dirname( __FILE__ ) . '/../config/config.php' );
require_once( dirname( __FILE__ ) . '/classes/JSONTransmissionRPC.class.php' );

$defaultTorrentFields = array( "addedDate", "id", "name", "status", "doneDate", "haveValid", "totalSize", "uploadRatio",
								"rateDownload", "rateUpload", "percentDone" );

try {
	$rpc = new TransmissionRPC(TRANSMISSION_RPC_URL, TRANSMISSION_RPC_USERNAME, TRANSMISSION_RPC_PASSWORD);
	$transmissionRunning = true;	
} catch (Exception $e) {
	$transmissionRunning = false;
}

//echo '<script type="text/javascript">console.log(';

switch ($_POST["method"]) {
	case 'getAll':
		echo json_encode($rpc->get(array(), $defaultTorrentFields));	
		break;
	case 'isRunning':
		echo json_encode($transmissionRunning);
		break;
	case 'addTorrentURL':
		$torrent = file_get_contents($_POST["url"]);
		echo '<pre>';
		print_r($rpc->add_metainfo($torrent, $_POST["path"]));
		echo '</pre>';
		
		break;


	default:
		echo '<pre>';
		print_r($_GET);
		print_r($_POST);
		echo '</pre>';
		# code...
		break;
}
//echo ');</script>';
?>