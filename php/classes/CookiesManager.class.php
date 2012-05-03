<?php

class CookiesManager {
    private $file;
    private $cookies;


    public function __construct ( $file ) {
        $this->file = $file;
        $this->cookies = array();
        $fp = fopen( $this->file, 'a' );
        if ( !$fp ) {
            throw new Exception("Could not open file.", 1);
        }
        fclose( $fp );
        $this->readCookies();
    }

    public function getCookies () {
        return $this->cookies;
    }

    private function readCookies () {
        $size = filesize( $this->file );
        if ( $size > 0 ) {
            $fp = fopen( $this->file, 'r' );
            $content = fread( $fp, $size );
            $this->setCookiesFromString ( $content );
            fclose($fp);
        }
    }

    private function setCookiesFromString ( $str ) {
        $rows = explode("\n", $str);
        
        foreach ( $rows as $row ) {
            $tmpCookie = explode( "|", $row );
            if( $tmpCookie[0] !== "" ) {
                $this->cookies[$tmpCookie[0]] = $tmpCookie[1];
            }
        }
    }

    public function getCookie ( $site ) {
        $cookies = $this->getCookies();
        if ( array_key_exists( $site, $cookies ) ) {
            return $cookies[$site];
        } else {
            return false;
        }

    }

    public function getCookiesString () {
        return $this->arrayToCookiesStr();
    }

    private function arrayToCookiesStr () {
        $str = "";
        foreach ( $this->cookies as $site => $cookie ) {
            $str .= $site . "|" . $cookie . "\n";
        }
        return $str;
    }

    public function writeCookies ( $str = "" ) {
        if ( $str !== "" ) {
            $this->setCookiesFromString( $str );
        }

        $content = $this->arrayToCookiesStr( $this->cookies );
        $fp = fopen( $this->file, 'w');
        fwrite( $fp, $content );
        fclose( $fp );
    }

}

?>