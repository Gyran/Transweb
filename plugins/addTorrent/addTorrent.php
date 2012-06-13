<?php
require_once( dirname( __FILE__ ) . "/../../php/classes/RPCConnection.class.php" );
require_once( dirname( __FILE__ ) . "/../../plugins/cookies/cookies.php" );

$rpc =  new RPCConnection();

switch( $_POST["method"] ) {
    case 'addTorrentURL':
        echo $rpc->addTorrentByUrl( $_POST["url"], $_POST["path"] );
        break;
    case 'addTorrentFile':

        $torrentContent = file_get_contents($_FILES['torrent']['tmp_name']);
        echo $rpc->addTorrentByRaw( $torrentContent, $_POST["path"] );
        break;

    default:
        echo '<pre>';
            print_r($_FILES);
        echo '</pre>';
        break;
}

?>