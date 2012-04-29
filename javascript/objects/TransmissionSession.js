function TransmissionSession ( props ) {
    this._alt_speed_down               = 0;
    this._alt_speed_enabled            = false;
    this._alt_speed_time_begin         = 0;
    this._alt_speed_time_enabled       = false;
    this._alt_speed_time_end           = 0;
    this._alt_speed_time_day           = 0;
    this._alt_speed_up                 = 0;
    this._blocklist_url                = "";
    this._blocklist_enabled            = false;
    this._blocklist_size               = 0;
    this._cache_size_mb                = 0;
    this._config_dir                   = "";
    this._download_dir                 = "";
    this._download_dir_free_space      = 0;
    this._download_queue_size          = 0;
    this._download_queue_enabled       = false;
    this._dht_enabled                  = false;
    this._encryption                   = "";
    this._idle_seeding_limit           = 0;
    this._idle_seeding_limit_enabled   = false;
    this._incomplete_dir               = "";
    this._incomplete_dir_enabled       = false;
    this._lpd_enabled                  = false;
    this._peer_limit_global            = 0;
    this._peer_limit_per_torrent       = 0;
    this._pex_enabled                  = false;
    this._peer_port                    = 0;
    this._peer_port_random_on_start    = false;
    this._port_forwarding_enabled      = false;
    this._queue_stalled_enabled        = false;
    this._queue_stalled_minutes        = 0;
    this._rename_partial_files         = false;
    this._rpc_version                  = 0;
    this._rpc_version_minimum          = 0;
    this._script_torrent_done_filename = "";
    this._script_torrent_done_enabled  = false;
    this._seedRatioLimit               = 0.0;
    this._seedRatioLimited             = false;
    this._seed_queue_size              = 0;
    this._seed_queue_enabled           = false;
    this._speed_limit_down             = 0;
    this._speed_limit_down_enabled     = false;
    this._speed_limit_up               = 0;
    this._speed_limit_up_enabled       = false;
    this._start_added_torrents         = false;
    this._trash_original_torrent_files = false;
    this._units                        = null;
    this._utp_enabled                  = false;
    this._version                      = "";

    if ( props !== undefined ) {
        this.fill( props );
    }
}

TransmissionSession.prototype = {
    fill: function ( props ) {
        for ( prop in props ) {
            if ( props.hasOwnProperty(prop) ) {
                if ( prop === "units" ) {
                    this["_units"] = new Units( props[prop] );
                }
                else {
                    this["_" + prop] = props[prop];
                }
            }
        }
    },

    /* Getters */
    getDownloadDir: function () { return this._download_dir },
    getSeedRatioLimit: function () { return this._seedRatioLimit },
    getSeedRatioLimited: function () { return this._seedRatioLimited },
    getUnits: function () { return this._units }
    /* /Getters */








}