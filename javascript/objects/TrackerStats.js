function TrackerStats ( props ) {
    this._announce              = "";
    this._announceState         = 0;
    this._downloadCount         = 0;
    this._hasAnnounced          = false;
    this._hasScraped            = false;
    this._host                  = "";
    this._id                    = 0;
    this._isBackup              = false;
    this._lastAnnouncePeerCount = 0;
    this._lastAnnounceResult    = "";
    this._lastAnnounceStartTime = 0;
    this._lastAnnounceSucceeded = false;
    this._lastAnnounceTime      = 0;
    this._lastAnnounceTimedOut  = false;
    this._lastScrapeResult      = "";
    this._lastScrapeStartTime   = 0;
    this._lastScrapeSucceeded   = false;
    this._lastScrapeTime        = 0;
    this._lastScrapeTimedOut    = false;
    this._leecherCount          = 0;
    this._nextAnnounceTime      = 0;
    this._nextScrapeTime        = 0;
    this._scrape                = "";
    this._scrapeState           = 0;
    this._seederCount           = 0;
    this._tier                  = 0;

    if ( props !== undefined ) {
        this.fill( props );
    }

}

TrackerStats.prototype = {

    fill: function ( props ) {
        for ( prop in props ) {
            if ( props.hasOwnProperty(prop) ) {
                this["_" + prop] = props[prop];
            }
        }
    },

    /* Getters */
    getHost: function () { return this._host },
    getIsBackup: function () { return this._isBackup },
    getSeederCount: function () { return this._seederCount },
    /* /Getters */

    getHostName: function () { return this.getHost().replace(/.+?\/\/(.+?):.*/, "$1") },

    isBackup: function () { return this.getIsBackup(); }



}