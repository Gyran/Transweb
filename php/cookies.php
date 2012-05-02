<?php

require_once( dirname( __FILE__ ) . '/../config/config.php' );
require_once( dirname( __FILE__ ) . '/classes/CookiesManager.class.php' );

try {
    $cm = new CookiesManager( COOKIES_FILE );    
} catch (Exception $e) {
    die( json_encode( false ) );
}

switch( $_POST["method"] ) {
    case 'getCookies':
        echo json_encode( $cm->getCookiesString() );
        break;
    case 'getCookie': 
        echo json_encode( $cm->getCookie( $_POST["site"] ) );
        break;
    case 'saveCookies':
        $cm->writeCookies( $_POST["cookies"] );
        break;
    default:
        echo '<pre>';
        print_r($_GET);
        print_r($_POST);
        echo '</pre>';
        break;
}


?>