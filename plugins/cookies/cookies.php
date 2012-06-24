<?php

require_once( dirname( __FILE__ ) . '/Plugin_Cookies.class.php' );

try {
    $c = new Plugin_Cookies( );
} catch (Exception $e) {
    die( json_encode( false ) );
}

switch( $_POST["method"] ) {
    case 'getCookies':
        echo json_encode( $c->getCookiesString() );
        break;
    case 'getCookie': 
        echo json_encode( $c->getCookie( $_POST["site"] ) );
        break;
    case 'saveCookies':
        $c->writeCookies( $_POST["cookies"] );
        break;
    default:
        echo '<pre>';
        echo __FILE__;
        print_r($_GET);
        print_r($_POST);
        echo '</pre>';
        break;
}


?>