<?php

class Transweb {

    static public function pluginExists ( $plugin ) {
        return is_dir( dirname( __FILE__ ) . "/../../plugins/" . $plugin );
    }
}

?>