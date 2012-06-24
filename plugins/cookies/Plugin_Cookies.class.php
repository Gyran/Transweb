<?php

require_once( dirname( __FILE__ ) . '/settings.php' );
require_once( dirname( __FILE__ ) . '/../../php/classes/CookiesManager.class.php' );


class Plugin_Cookies {
    private $cm;


    public function __construct() {
        $this->cm = new CookiesManager( COOKIES_FILE );
    }


    public function getCookiesString () {
        return $this->cm->getCookiesString();
    }

    public function getCookie ( $site ) {
        return $this->cm->getCookie( $site );
    }

    public function writeCookies ( $cookies ) {
        return $this->cm->writeCookies( $cookies );
    }

}

?>