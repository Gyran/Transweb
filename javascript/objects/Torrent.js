function Torrent ( props ) {
	this._activityDate			  = 0;
	this._addedDate               = 0;
	this._bandwidthPriority       = 0;
	this._comment                 = "";
	this._corruptEver             = 0;
	this._creator                 = "";
	this._dateCreated             = 0;
	this._desiredAvailable        = 0;
	this._doneDate                = 0;
	this._downloadDir             = "";
	this._downloadedEver          = 0;
	this._downloadLimit           = 0;
	this._downloadLimited         = null;
	this._error                   = 0;
	this._errorString             = "";
	this._eta                     = "";
	this._files                   = [];
	this._fileStats               = [];
	this._hashString              = "";
	this._haveUnchecked           = 0;
	this._haveValid               = 0;
	this._honorsSessionLimits     = false;
	this._id                      = -1;
	this._isFinished              = null;
	this._isPrivate               = null;
	this._isStalled               = null;
	this._leftUntilDone           = 0;
	this._magnetLink              = 0;
	this._manualAnnounceTime      = 0;
	this._maxConnectedPeers       = 0;
	this._metadataPercentComplete = 0.0;
	this._name                    = "";
	this._peerLimit               = 0;
	this._peers                   = [];
	this._peersConnected          = 0;
	this._peersFrom               = null;
	this._peersGettingFromUs      = 0;
	this._peersSendingToUs        = 0;
	this._percentDone             = 0.0;
	this._pieces                  = "";
	this._pieceCount              = 0;
	this._pieceSize               = 0;
	this._priorities              = [];
	this._queuePosition           = 0;
	this._rateDownload            = 0;
	this._rateUpload              = 0;
	this._recheckProgress         = 0.0;
	this._secondsDownloading      = 0;
	this._secondsSeeding          = 0;
	this._seedIdleLimit           = 0;
	this._seedIdleMode            = 0;
	this._seedRatioLimit          = 0.0;
	this._seedRatioMode           = 0;
	this._sizeWhenDone            = 0;
	this._startDate               = 0;
	this._status                  = 0;
	this._trackers                = [];
	this._trackerStats            = [];
	this._totalSize               = 0;
	this._torrentFile             = "";
	this._uploadedEver            = 0;
	this._uploadLimit             = 0;
	this._uploadLimited           = null;
	this._uploadRatio             = 0.0;
	this._wanted                  = [];
	this._webseeds                = [];
	this._webseedsSendingToUs     = 0;

	if ( props !== undefined ) {
		this.fill( props );
	}

}

Torrent.prototype = {

	fill: function ( props ) {
		var that = this;
		for ( prop in props ) {
			if ( props.hasOwnProperty(prop) ) {

				if ( prop === "trackerStats" ) {
					enyo.forEach( props["trackerStats"], function ( trackerStats ) {
						this["_trackerStats"].push( new TrackerStats( trackerStats ) );	
					}, this );
				} else if ( prop === "files" ) {
					enyo.forEach( props["files"], function ( files ) {
						this["_files"].push( new File( files ) );	
					}, this );
				} else if ( prop === "fileStats" ) {
					enyo.forEach( props["fileStats"], function ( fileStats ) {
						this["_fileStats"].push( new FileStats( fileStats ) );	
					}, this );
				}
				else {
					this["_" + prop] = props[prop];
				}
			}
		}
	},

	/* Getters */
	getActivityDate: function () { return new Date( this._activityDate * 1000 ) },
	getAddedDate: function () { return new Date( this._addedDate * 1000 ) },
	getComment: function () { return this._comment },
	getCorruptEver: function () { return this._corruptEver },
	getCreatedDate: function () { return new Date( this._dateCreated * 1000 ) },
	getDoneDate: function () { return new Date( this._doneDate * 1000 ) },
	getDownloadDir: function () { return this._downloadDir },
	getDownloadedEver: function () { return this._downloadedEver },
	getDownloadLimit: function () { return this._downloadLimit },
	getDownloadLimited: function () { return this._downloadLimited },
	getErrorString: function () { return this._errorString },
	getETA: function () { return this._eta },
	getFiles: function () { return this._files },
	getFileStats: function () { return this._fileStats },
	getHashString: function () { return this._hashString },
	getHonorsSessionLimits: function () { return this._honorsSessionLimits },
	getId: function () { return this._id },
	getLeftUntilDone: function () { return this._leftUntilDone },
	getName: function () { return this._name },
	getPercentDone: function () { return this._percentDone },
	getPieceCount: function () { return this._pieceCount },
	getPieceSize: function () { return this._pieceSize },
	getRateDownload: function () { return this._rateDownload },
	getRateUpload: function () { return this._rateUpload },
	getSeedRatioLimit: function () { return this._seedRatioLimit },
	getSeedRatioMode: function () { return this._seedRatioMode },
	getStatus: function () { return this._status },
	getTotalSize: function () { return this._totalSize },
	getTrackers: function () { return this._trackers },
	getTrackerStats: function () { return this._trackerStats },
	getUploadedEver: function () { return this._uploadedEver },
	getUploadLimit: function () { return this._uploadLimit },
	getUploadLimited: function () { return this._uploadLimited },
	getUploadRatio: function () { return this._uploadRatio },
	/* /Getters */

	/* Custom getters */
	getDownloadFolder: function () { return this.getDownloadDir().match( /([^\/]*)\/?$/ )[1] },
	getFirstTrackerStatus: function () {
		var ret = null;
		enyo.forEach( this.getTrackerStats(), function ( trackerStats ) {
			if ( ret !== null ) {
				return;
			}
			if ( !trackerStats.isBackup() ) {
				ret = trackerStats;
			}
		}, this );

		return ret;
	},
	getNumSeeders: function () {
		var seeders = 0;
		enyo.forEach( this.getTrackerStats(), function ( trackerStats ) {
			seeders += trackerStats.getSeederCount();
		}, this );
		return seeders;
	},
	getNumLeechers: function () {
		var leechers = 0;
		enyo.forEach( this.getTrackerStats(), function ( trackerStats ) {
			leechers += trackerStats.getLeecherCount();
		}, this );
		return leechers;
	},
	getRatioLimit: function () {
		switch ( this.getSeedRatioMode() ){
			case 0:
				if ( this.getHonorsSessionLimits() ) {
					if ( enyo.application.transmissionSession.getSeedRatioLimited() ) {
						return enyo.application.transmissionSession.getSeedRatioLimit();
					}
				}
				break;
			case 1:
				return this.getSeedRatioLimit();
			case 2:
				break;
			default:
				break;
		}
		return -1;
	},

	/* /Custom getters */

	isStopped: function () { return this.getStatus() === Torrent._TR_STATUS_STOPPED },
	isDownloading: function () { return this.getStatus() === Torrent._TR_STATUS_DOWNLOAD },
	isDone: function () { return this.getLeftUntilDone() < 1 },
	isActive: function () { return this.getRateUpload() + this.getRateDownload() },
	isInactive: function () { return (this.getRateUpload() + this.getRateDownload() === 0) },

	getStatusString: function () {
		switch( this.getStatus() ) {
			case Torrent._TR_STATUS_STOPPED:
				return "Stopped";
			case Torrent._TR_STATUS_CHECK_WAIT:
				return "Waiting to verify local files";
			case Torrent._TR_STATUS_CHECK:
				return "Verifying local files";
			case Torrent._TR_STATUS_DOWNLOAD_WAIT:
				return "Queued for download";
			case Torrent._TR_STATUS_DOWNLOAD:
				return "Downloading";
			case Torrent._TR_STATUS_SEED_WAIT:
				return "Queued for seeding";
			case Torrent._TR_STATUS_SEED:
				return "Seeding";
			default:
				return "Unknown status";
		}
	}
}

// Torrent status codes
Torrent._TR_STATUS_STOPPED = 0;
Torrent._TR_STATUS_CHECK_WAIT = 1;
Torrent._TR_STATUS_CHECK = 2;
Torrent._TR_STATUS_DOWNLOAD_WAIT = 3;
Torrent._TR_STATUS_DOWNLOAD = 4;
Torrent._TR_STATUS_SEED_WAIT = 5;
Torrent._TR_STATUS_SEED = 6;

// Compare methods
Torrent.compareById = function ( a, b ) {
	return ( a.getId() - b.getId() );
}

Torrent.compareByStatus = function ( a, b ) {
	return ( a.getStatus() - b.getStatus() );
}

Torrent.compareByName = function ( a, b ) {
	an = a.getName().toLowerCase();
	bn = b.getName().toLowerCase();
	return ( an.localeCompare( bn ) );
}

Torrent.compareBySize = function ( a, b ) {
	return ( a.getTotalSize() - b.getTotalSize() );
}

Torrent.compareByDone = function ( a, b ) {
	return ( a.getPercentDone() - a.getPercentDone() );
}

Torrent.compareByDownloaded = function ( a, b ) {
	return ( a.getDownloadedEver() - b.getDownloadedEver() );
}

Torrent.compareByRatio = function ( a, b ) {
	return ( a.getUploadRatio() - b.getUploadRatio() );
}

Torrent.compareByAddedDate = function ( a, b ) {
	return ( a.getAddedDate() - b.getAddedDate() );
}

Torrent.compareByUploadRate = function ( a, b ) {
	return ( a.getRateUpload() - b.getRateUpload() );
}

Torrent.compareByDownloadRate = function ( a, b ) {
	return ( a.getRateDownload() - b.getRateDownload( ) );
}

Torrent.compareByETA = function ( a, b ) {
	return ( a.getETA() - b.getETA() ) ;
}

// Sort torrents function
Torrent.sortTorrents = function ( torrents, compareFunction, sortDirection ) {
	torrents.sort( compareFunction );

	if ( sortDirection === enyo.application._PREF_SORT_DESC ) {
		torrents.reverse();
	}

	return torrents;
}

// Filter functions
Torrent.filterAll = function( torrent ) {
	return true;
}

Torrent.filterStopped = function( torrent ) {
	return torrent.isStopped();
}

Torrent.filterDownloading = function( torrent ) {
	return torrent.isDownloading();
}

Torrent.filterCompleted = function( torrent ) {
	return torrent.isDone()
}

Torrent.filterActive = function( torrent ) {
	return torrent.isActive();
}

Torrent.filterInactive = function( torrent ) {
	return torrent.isInactive();
}

