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
	die( formatResponse( false, null, $e->getMessage()) );
}

switch( $_POST["method"] ) {
	case 'getAll':
		$result = $rpc->get( array( ), $defaultTorrentFields );

		if ( $result->result != "success" ) {
			echo formatResponse( false, null, $result->result );
		} else {
			echo formatResponse( true, $result->arguments );
		}
		break;
	case 'transmissionSession':
		$result = $rpc->sget();

		if ( $result->result != "success" ) {
			echo formatResponse( false, null, $result->result );
		} else {
			echo formatResponse( true, $result->arguments );
		}
		
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
				$extra["cookies"] = $cookies;
			}
		}

		$result = $rpc->add( $inUrl, $path, $extra );

		if ( $result->result != "success" ) {
			echo formatResponse( false, null, $result->result );
		} else {
			echo formatResponse( true, $result->arguments ); 
		}

		break;
	case 'startTorrents':
		$result = $rpc->start( $_POST["torrents"] );

		if ( $result->result != "success" ) {
			echo formatResponse( false, null, $result->result );
		} else {
			echo formatResponse( true, $result->arguments ); 
		}
		break;
	case 'stopTorrents':
		$result = $rpc->stop( $_POST["torrents"] );

		if ( $result->result != "success" ) {
			echo formatResponse( false, null, $result->result );
		} else {
			echo formatResponse( true, $result->arguments ); 
		}
		break;
	case 'getTorrentDetails':
		$result = $rpc->get( $_POST["torrent"], $torrentDetailsFields );

		if ( $result->result != "success" ) {
			echo formatResponse( false, null, $result->result );
		} else {
			echo formatResponse( true, $result->arguments ); 
		}
		break;
	case 'getTorrentFiles':
		$result = $rpc->get( $_POST["torrent"], $torrentFilesFields );

		if ( $result->result != "success" ) {
			echo formatResponse( false, null, $result->result );
		} else {
			echo formatResponse( true, $result->arguments ); 
		}
		break;
	case 'deleteTorrentsAndFiles':
		$result = $rpc->remove( $_POST["torrents"], true );

		if ( $result->result != "success" ) {
			echo formatResponse( false, null, $result->result );
		} else {
			echo formatResponse( true, $result->arguments ); 
		}
		break;
	default:
		echo '<pre>';
		print_r($_GET);
		print_r($_POST);
		echo '</pre>';
		break;
}

function formatResponse ( $success, $arguments = null, $message = "" ) {
	$data = array();
	if ( $success ) {
		$data["success"] = true;
		$data["arguments"] = $arguments;
	} else {
		$data["success"] = false;
		$data["message"] = $message;
	}

	return json_encode( $data );
}


?>