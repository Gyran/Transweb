<?php

require_once( dirname( __FILE__ ) . '/../config/config.php' );
require_once( dirname( __FILE__ ) . '/classes/TransmissionRPC.class.php' );

$defaultTorrentFields = array( "addedDate", "name", "status", "doneDate", "haveValid", "totalSize", "uploadRatio",
								"rateDownload", "rateUpload", "percentDone", "fileStats", "totalSize", "eta",
								"downloadedEver", "leftUntilDone", "status", "hashString" );

$torrentDetailsFields = array( "addedDate", "name", "status", "doneDate", "haveValid", "totalSize", "uploadRatio",
								"rateDownload", "rateUpload", "percentDone", "files", "fileStats", "totalSize", "eta",
								"downloadedEver", "leftUntilDone", "status", "id", "hashString", "downloadDir" );

try {
	$rpc = new TransmissionRPC( TRANSMISSION_RPC_URL, TRANSMISSION_RPC_USERNAME, TRANSMISSION_RPC_PASSWORD );
} catch ( Exception $e ) {
	die( json_encode( false ) );
}

switch( $_POST["method"] ) {
	case 'getAll':
		echo json_encode( $rpc->get( array( ), $defaultTorrentFields ) );	
		break;
	case 'transmissionSession':
		echo json_encode($rpc->sget());
		break;
	case 'addTorrentURL':
		$torrent = file_get_contents($_POST["url"]);

		echo json_encode( $rpc->add_metainfo( $torrent, $_POST["path"] ) );
		break;
	case 'startTorrents':
		echo json_encode( $rpc->start( $_POST["torrents"] ) );
		break;
	case 'stopTorrents':
		echo json_encode( $rpc->stop( $_POST["torrents"] ) );
		break;
	case 'getTorrentDetails':
		echo json_encode( $rpc->get( $_POST["torrent"], $torrentDetailsFields ) );	
		break;
	default:
		echo '<pre>';
		print_r($_GET);
		print_r($_POST);
		echo '</pre>';
		# code...
		break;
}


?>