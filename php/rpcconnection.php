<?php

require_once( dirname( __FILE__ ) . '/../config/config.php' );
require_once( dirname( __FILE__ ) . '/classes/TransmissionRPC.class.php' );
require_once( dirname( __FILE__ ) . '/classes/CookiesManager.class.php' );

$defaultTorrentFields = array( 
	"addedDate", "name", "status", "doneDate", "haveValid", "totalSize", "uploadRatio",
	"rateDownload", "rateUpload", "percentDone", "fileStats", "totalSize", "eta",
	"downloadedEver", "leftUntilDone", "status", "hashString", "downloadDir", "trackerStats"
	);

$torrentDetailsFields = array( 
	"addedDate", "name", "status", "doneDate", "haveValid", "totalSize", "uploadRatio",
	"dateCreated", "pieceCount", "pieceSize", "comment", "doneDate",
	"downloadedEver", "leftUntilDone", "status", "id", "hashString", "downloadDir", "hashString",
	"rateDownload", "rateUpload", "percentDone", "files", "fileStats", "totalSize", "eta",
	"downloadLimit", "downloadLimited", "trackers", "trackerStats", "errorString", "uploadedEver",
	"uploadLimit", "uploadLimited", "seedRatioMode", "seedRatioLimit", "honorsSessionLimits", "activityDate",
	"corruptEver"
	);

$torrentFilesFields = array(
	"files", "fileStats"
	);

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
		$inUrl = $_POST["url"];
		$path = $_POST["path"];

		$extra = array();

		if ( !( stripos( $inUrl, "magnet:?", 0 ) === 0 ) ) {
			$url = parse_url( $inUrl );
			$cm = new CookiesManager( COOKIES_FILE );
			$cookies = $cm->getCookie( $url["host"] );
			if ( $cookies ) {
				echo $cookies;
				$extra["cookies"] = $cookies;
			}
		}

		$result = $rpc->add( $inUrl, $path, $extra );

		echo json_encode( $result );

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
	case 'getTorrentFiles':
		echo json_encode( $rpc->get( $_POST["torrent"], $torrentFilesFields ) );	
		break;
	default:
		echo '<pre>';
		print_r($_GET);
		print_r($_POST);
		echo '</pre>';
		break;
}


?>