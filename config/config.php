<?php

define( 'TRANSMISSION_RPC_HOST', 'localhost' );
define( 'TRANSMISSION_RPC_PORT', '9091' );
define( 'TRANSMISSION_RPC_PATH', '/transmission/rpc' );
define( 'TRANSMISSION_RPC_PROTOCOL', 'http://' );

define( 'TRANSMISSION_RPC_USERNAME', 'Gyran' );
define( 'TRANSMISSION_RPC_PASSWORD', 't0rrents' );

define( 'TRANSMISSION_RPC_URL', TRANSMISSION_RPC_PROTOCOL . TRANSMISSION_RPC_HOST . ':' . TRANSMISSION_RPC_PORT . TRANSMISSION_RPC_PATH );

define( 'TOP_BROWSE_FOLDER', '/' );

define( 'COOKIES_FILE' ,  dirname( __FILE__ ) . '/../data/cookies' );

?>
