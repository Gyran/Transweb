function Torrent( ) {
	this.addedDate = 0;
	this.bandwidthPriority = 0;
	this.comment = 0;
	this.corruptEver = 0;
	this.creator = "";
	this.dateCreated = 0;
	this.desiredAvailable = 0;
	this.doneDate = 0;
	this.downloadDir = "";
	this.downloadedEver = 0;
	this.downloadLimit = 0;
	this.downloadLimited = null;
	this.error = 0;
	this.errorString = "";
	this.eta = "";
	this.files = [];
	this.fileStats = [];
	this.hashString = "";
	this.haveUnchecked = 0;
	this.haveValid = 0;
	this.honorsSessionLimits = null;
	this.id = -1;
	this.isFinished = null;
	this.isPrivate = null;
	this.isStalled = null;
	this.leftUntilDone = 0;
	this.magnetLink = 0;
	this.manualAnnounceTime = 0;
	this.maxConnectedPeers = 0;
	this.metadataPercentComplete = 0.0;
	this.name = "";
	this.peerLimit = 0;
	this.peers = [];
	this.peersConnected = 0;
	this.peersFrom = null;
	this.peersGettingFromUs = 0;
	this.peersSendingToUs = 0;
	this.percentDone = 0.0;
	this.pieces = "";
	this.piecesCount = 0;
	this.piecesSize = 0;
	this.priorities = [];
	this.queuePosition = 0;
	this.rateDownload = 0;
	this.rateUpload = 0;
	this.recheckProgress = 0.0;
	this.secondsDownloading = 0;
	this.secondsSeeding = 0;
	this.seedIdleLimit = 0;
	this.seedIdleMode = 0;
	this.seedRatioLimit = 0.0;
	this.seedRatioMode = 0;
	this.sizeWhenDone = 0;
	this.startDate = 0;
	this.status = 0;
	this.trackers = [];
	this.trackerStats = [];
	this.totalSize = 0;
	this.torrentFile = "";
	this.uploadedEver = 0;
	this.uploadLimit = 0;
	this.uploadLimited = null;
	this.uploadRatio = 0.0;
	this.wanted = [];
	this.webseeds = [];
	this.webseedsSendingToUs = 0	
}

Torrent.prototype = {
	TR_STATUS_STOPPED         : 0,
	TR_STATUS_CHECK_WAIT      : 1,
	TR_STATUS_CHECK           : 2,
	TR_STATUS_DOWNLOAD_WAIT   : 3,
	TR_STATUS_DOWNLOAD        : 4,
	TR_STATUS_SEED_WAIT       : 5,
	TR_STATUS_SEED            : 6,

	fill: function( props ) {
		for( prop in props ) {
			this[ prop ] = props[ prop ];
		}
	},

	isStopped: function() { return this.status === this.TR_STATUS_STOPPED },
	isDownloading: function() { return this.status === this.TR_STATUS_DOWNLOAD },
	isDone: function() { return this.leftUntilDone < 1 },
	isActive: function() { return this.rateUpload + this.rateDownload },
	isInactive: function() { return (this.rateUpload + this.rateDownload === 0) },

	getStatusString: function( ) {
		switch( this.status ) {
			case this.TR_STATUS_STOPPED:
				return "Stopped";
				break;
			case this.TR_STATUS_CHECK_WAIT:
				return "Waiting to verify local files";
				break;
			case this.TR_STATUS_CHECK:
				return "Verifying local files";
				break;
			case this.TR_STATUS_DOWNLOAD_WAIT:
				return "Queued for download";
				break;
			case this.TR_STATUS_DOWNLOAD:
				return "Downloading";
				break;
			case this.TR_STATUS_SEED_WAIT:
				return "Queued for seeding";
				break;
			case this.TR_STATUS_SEED:
				return "Seeding";
				break;
			default:
				return "Unknown status";
				break;
		}
	}
}