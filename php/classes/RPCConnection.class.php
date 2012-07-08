<?php

require_once( dirname( __FILE__ ) . '/../../config/config.php' );
require_once( dirname( __FILE__ ) . '/TransmissionRPC.class.php' );
require_once( dirname( __FILE__ ) . '/transweb.class.php' );

class RPCConnection {

    private static $DEFAULTTORRENTFIELDS = array( 
            "addedDate", "name", "status", "doneDate", "haveValid", "totalSize", "uploadRatio",
            "rateDownload", "rateUpload", "percentDone", "fileStats", "totalSize", "eta",
            "downloadedEver", "leftUntilDone", "status", "hashString", "downloadDir", "trackerStats", "error",
            "uploadedEver"
        );

    private $rpc;
    private $result;
    private $returnFormatted;

    public function __construct( $returnFormatted = true ) {
        $this->rpc = new TransmissionRPC( TRANSMISSION_RPC_URL, TRANSMISSION_RPC_USERNAME, TRANSMISSION_RPC_PASSWORD );
        $this->returnFormatted = $returnFormatted;
    }

    public function addTorrentByRaw ( $torrent, $path ) {
        $this->result = $this->rpc->add_metainfo( $torrent, $path );
        return $this->formatResult();
    }

    public function addTorrentByUrl ( $inUrl, $path ) {
        $extra = array();

        if ( !( stripos( $inUrl, "magnet:?", 0 ) === 0 ) ) {
            $url = parse_url( $inUrl );
            if ( Transweb::pluginExists( "cookies" ) ) {
                require_once( dirname( __FILE__ ) . '/../../plugins/cookies/Plugin_Cookies.class.php' );
                $c = new Plugin_Cookies( );
                $cookies = $c->getCookie( $url["host"] );
                if ( $cookies ) {
                    $extra["cookies"] = $cookies;
                }
            }
        }

        $this->result = $this->rpc->add( $inUrl, $path, $extra );
        return $this->formatResult();
    }

    public function getAllTorrents ( $fields = null ) {
        if ( $fields === null ) {
            $fields = self::$DEFAULTTORRENTFIELDS;
        }
        $this->result = $this->rpc->get( array(), $fields );
        return $this->formatResult();
    } 

    public function getTransmissionSession () {
        $this->result = $this->rpc->sget();
        return $this->formatResult();
    }

    public function getResult () {
        return $this->result;
    }

    private function successed () {
        return ( $this->getResult()->result == "success" );
    }

    private function formatResult () {
        $data = array();
        if ( $this->successed() ) {
            $data["success"] = true;
            $data["arguments"] = $this->getResult()->arguments;
        } else {
            $data["success"] = false;
            $data["message"] = $this->getResult()->result;
        }

        return json_encode( $data );
    }

}

?>