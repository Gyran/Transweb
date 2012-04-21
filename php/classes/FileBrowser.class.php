<?php

class FileBrowser {
	private $topPath;
	private $showHidden;
	private $exclude;

	private $currentPath;


	public function __construct( $topPath = "/", $showHidden = false, $exclude = array( ) ) {
		$this->topPath = $topPath;
		$this->showHidden = $showHidden;
		$this->exclude = array_merge( $exclude, array( ".", ".." ) );
		$this->currentPath = $this->topPath;
	}

	public function getDirectories( $path = "" ) {

		if( $path[ strlen( $path ) - 1 ] !== "/" ) {
			$path = $path . "/";
		}

		if( $path === "" ) {
			$path = $this->currentPath;
		}
		if( stripos($path, $this->topPath) !== 0 ) {
			throw new Exception("Path not in top path");
		}

		/* TODO symlink */
		if( !is_dir( $path ) ) {
			throw new Exception("Not a valid path");	
		}

		if($path == $this->topPath){
			$dirs = array( "." );
		}else{
			$dirs = array( ".", ".." );
		}

		if( ($dh = @opendir($path)) ) {
			while( $dir = readdir($dh) ) {
				if( is_dir($path . $dir) ) {
					if( !in_array($dir, $this->exclude) ) {
						if( !$this->showHidden ) {
							if( $dir[0] !== "." ) {
								$dirs[] = $dir;
							}
						} else {
							$dirs[] = $dir;
						}

					}
				}
			}
		} else {
			throw new Exception("Could not open directory.", 1);
		}

		return $dirs;
	}
}

?>