<?php

require_once( dirname( __FILE__ ) . "/classes/RPCConnection.class.php" );

$rpc =  new RPCConnection();

echo $rpc->getTransmissionSession();

?>