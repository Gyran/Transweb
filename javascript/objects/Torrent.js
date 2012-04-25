function Torrent( props ) {
	this.addedDate               = 0;
	this.bandwidthPriority       = 0;
	this.comment                 = "";
	this.corruptEver             = 0;
	this.creator                 = "";
	this.dateCreated             = 0;
	this.desiredAvailable        = 0;
	this.doneDate                = 0;
	this.downloadDir             = "";
	this.downloadedEver          = 0;
	this.downloadLimit           = 0;
	this.downloadLimited         = null;
	this.error                   = 0;
	this.errorString             = "";
	this.eta                     = "";
	this.files                   = [];
	this.fileStats               = [];
	this.hashString              = "";
	this.haveUnchecked           = 0;
	this.haveValid               = 0;
	this.honorsSessionLimits     = null;
	this.id                      = -1;
	this.isFinished              = null;
	this.isPrivate               = null;
	this.isStalled               = null;
	this.leftUntilDone           = 0;
	this.magnetLink              = 0;
	this.manualAnnounceTime      = 0;
	this.maxConnectedPeers       = 0;
	this.metadataPercentComplete = 0.0;
	this.name                    = "";
	this.peerLimit               = 0;
	this.peers                   = [];
	this.peersConnected          = 0;
	this.peersFrom               = null;
	this.peersGettingFromUs      = 0;
	this.peersSendingToUs        = 0;
	this.percentDone             = 0.0;
	this.pieces                  = "";
	this.piecesCount             = 0;
	this.piecesSize              = 0;
	this.priorities              = [];
	this.queuePosition           = 0;
	this.rateDownload            = 0;
	this.rateUpload              = 0;
	this.recheckProgress         = 0.0;
	this.secondsDownloading      = 0;
	this.secondsSeeding          = 0;
	this.seedIdleLimit           = 0;
	this.seedIdleMode            = 0;
	this.seedRatioLimit          = 0.0;
	this.seedRatioMode           = 0;
	this.sizeWhenDone            = 0;
	this.startDate               = 0;
	this.status                  = 0;
	this.trackers                = [];
	this.trackerStats            = [];
	this.totalSize               = 0;
	this.torrentFile             = "";
	this.uploadedEver            = 0;
	this.uploadLimit             = 0;
	this.uploadLimited           = null;
	this.uploadRatio             = 0.0;
	this.wanted                  = [];
	this.webseeds                = [];
	this.webseedsSendingToUs     = 0;

	this.fill( props );

}

Torrent.prototype = {

	fill: function ( props ) {
		for ( prop in props ) {
			if ( props.hasOwnProperty(prop) ) {
				this[prop] = props[prop];
			}
		}
	},

	/* Getters */
	getAddedDate: function () { return new Date( this.addedDate * 1000 ) },
	getCreatedDate: function () { return new Date( this.dateCreated * 1000 ) },
	getDoneDate: function () { return new Date( this.doneDate * 1000 ) },
	getDownloadedEver: function () { return this.downloadedEver },
	getETA: function () { return this.eta },
	getId: function () { return this.id },
	getName: function () { return this.name },
	getPercentDone: function () { return this.percentDone },
	getRateDownload: function () { return this.rateDownload },
	getRateUpload: function () { return this.rateUpload },
	getTotalSize: function () { return this.totalSize },
	getStatus: function () { return this.status },
	getUploadRatio: function () { return this.uploadRatio },
	/*/Getters */

	isStopped: function () { return this.status === Torrent._TR_STATUS_STOPPED },
	isDownloading: function () { return this.status === Torrent._TR_STATUS_DOWNLOAD },
	isDone: function () { return this.leftUntilDone < 1 },
	isActive: function () { return this.rateUpload + this.rateDownload },
	isInactive: function () { return (this.rateUpload + this.rateDownload === 0) },

	getStatusString: function () {
		switch( this.status ) {
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

