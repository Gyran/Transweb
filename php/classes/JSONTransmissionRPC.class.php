<?php

require_once( dirname( __FILE__ ) . '/../../config/rpcconfig.php' );
require_once( dirname( __FILE__ ) . '/../../PHP-Transmission-Class' . '/class/TransmissionRPC.class.php' );

/** 
* Only a wrapper to return objects from TransmissionRPC as json objects
*/

class JSONTransmissionRPC extends TransmissionRPC {

	public function __construct( $url = 'http://localhost:9091/transmission/rpc', $username = null, $password = null, $return_as_array = false ){
		return parent::__construct($url, $username, $password);
	}

	public function start ( $ids ){
		return json_encode(parent::start($ids));	
	}

  	public function stop ( $ids ){
		return json_encode(parent::stop($ids));	
	}

  	public function reannounce ( $ids ){
    	return json_encode(parent::reannounce($ids));	
	}

  	public function verify ( $ids ){
    	return json_encode(parent::verify($ids));
	}

	public function get ( $ids = array(), $fields = array() ){
		return json_encode(parent::get($ids, $fields));
	}

  	public function set ( $ids = array(), $arguments = array() ){
    	return json_encode(parent::get($ids, $arguments));
	}
	
	public function add_file ( $torrent_location, $save_path = '', $extra_options = array() ){
  		return json_encode(parent::add_file($torrent_location, $save_path, $extra_options));
  	}
	
	public function add_metainfo ( $torrent_metainfo, $save_path = '', $extra_options = array() ){
		return json_encode(parent::add_metainfo($torrent_metainfo, $save_path, $extra_options));
	}

  	public function add ( $torrent_location, $save_path = '', $extra_options = array() ){
  		return json_encode(parent::add($torrent_location, $save_path));
  	}
	
	public function remove ( $ids, $delete_local_data = false ){
    	return json_encode(parent::remove($ids, $delete_local_data));
	}

	public function move ( $ids, $target_location, $move_existing_data = true ){
    	return json_encode(parent::move($ids, $target_location, $move_existing_data));
	}

	public function sstats ( ){
  		return json_encode(parent::sstats());
  	}

  	public function sget ( ){
  		return json_encode(parent::sget());
  	}
	
	public function sset ( $arguments ){
  		return json_encode(parent::sset($arguments));
	}
	
	public function getStatusString ( $intstatus ){
		return json_encode(parent::getStatusString($intstatus));
	}

	public function GetSessionID(){
		return json_encode(parent::GetSessionID());
	}
}




?>