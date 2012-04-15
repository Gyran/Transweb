enyo.application.language.noRatio = "None";

enyo.kind({
	name: "Torrent",
	kind: enyo.Control,
	tag: "tr",

	components: [
		{ name: "status", kind: "TorrentTableBodyCell" },
		{ name: "torrentName", kind: "TorrentTableBodyCell" },
		{ name: "totalSize", kind: "TorrentTableBodyCell" },
		{ name: "percentDone", kind: "TorrentTableBodyCell" },
		{ name: "downloadedEver", kind: "TorrentTableBodyCell" },
		{ name: "uploadRatio", kind: "TorrentTableBodyCell" },
		{ name: "addedDate", kind: "TorrentTableBodyCell" },
		{ name: "rateUpload", kind: "TorrentTableBodyCell" },
		{ name: "rateDownload", kind: "TorrentTableBodyCell" },
		{ name: "eta", kind: "TorrentTableBodyCell" }
	],

	handlers: {
		onDeselect: "deselect",
		onSelect: "select"

	},

	deselect: function( sender ) {
		this.removeClass( "selected" );
		enyo.application.deselectTorrent( this.hashString );
	},

	select: function( sender ) {
		this.addClass( "selected" );
		enyo.application.selectTorrent( this.hashString );
	},

	statics: {
		// Constants
		TR_STATUS_STOPPED         : 0,
		TR_STATUS_CHECK_WAIT      : 1,
		TR_STATUS_CHECK           : 2,
		TR_STATUS_DOWNLOAD_WAIT   : 3,
		TR_STATUS_DOWNLOAD        : 4,
		TR_STATUS_SEED_WAIT       : 5,
		TR_STATUS_SEED            : 6,
		
		_RatioUseGlobal        : 0,
		_RatioUseLocal         : 1,
		_RatioUnlimited        : 2,

		_ErrNone               : 0,
		_ErrTrackerWarning     : 1,
		_ErrTrackerError       : 2,
		_ErrLocalError         : 3,

		_TrackerInactive       : 0,
		_TrackerWaiting        : 1,
		_TrackerQueued         : 2,
		_TrackerActive         : 3,

		getStatusString: function( status ) {
			switch( status ) {
				case Torrent.TR_STATUS_STOPPED:
					return "Stopped";
					break;
				case Torrent.TR_STATUS_CHECK_WAIT:
					return "Waiting to verify local files";
					break;
				case Torrent.TR_STATUS_CHECK:
					return "Verifying local files";
					break;
				case Torrent.TR_STATUS_DOWNLOAD_WAIT:
					return "Queued for download";
					break;
				case Torrent.TR_STATUS_DOWNLOAD:
					return "Downloading";
					break;
				case Torrent.TR_STATUS_SEED_WAIT:
					return "Queued for seeding";
					break;
				case Torrent.TR_STATUS_SEED:
					return "Seeding";
					break;
				default:
					return "Unknown status";
					break;
			}
		}

	},

	published: {
		addedDate: 0,
		bandwidthPriority: 0,
		comment: 0,
		corruptEver: 0,
		creator: "",
		dateCreated: 0,
		desiredAvailable: 0,
		doneDate: 0,
		downloadDir: "",
		downloadedEver: 0,
		downloadLimit: 0,
		downloadLimited: null,
		error: 0,
		errorString: "",
		eta: "",
		files: [],
		fileStats: [],
		hashString: "",
		haveUnchecked: 0,
		haveValid: 0,
		honorsSessionLimits: null,
		torrentId: -1,
		isFinished: null,
		isPrivate: null,
		isStalled: null,
		leftUntilDone: 0,
		magnetLink: 0,
		manualAnnounceTime: 0,
		maxConnectedPeers: 0,
		metadataPercentComplete: 0.0,
		torrentName: "",
		peerLimit: 0,
		peers: [],
		peersConnected: 0,
		peersFrom: null,
		peersGettingFromUs: 0,
		peersSendingToUs: 0,
		percentDone: 0.0,
		pieces: "",
		piecesCount: 0,
		piecesSize: 0,
		priorities: [],
		queuePosition: 0,
		rateDownload: 0,
		rateUpload: 0,
		recheckProgress: 0.0,
		secondsDownloading: 0,
		secondsSeeding: 0,
		seedIdleLimit: 0,
		seedIdleMode: 0,
		seedRatioLimit: 0.0,
		seedRatioMode: 0,
		sizeWhenDone: 0,
		startDate: 0,
		status: 0,
		trackers: [],
		trackerStats: [],
		totalSize: 0,
		torrentFile: "",
		uploadedEver: 0,
		uploadLimit: 0,
		uploadLimited: null,
		uploadRatio: 0.0,
		wanted: [],
		webseeds: [],
		webseedsSendingToUs: 0
	},

	isStopped: function() { return this.status === Torrent.TR_STATUS_STOPPED },
	isDone: function() { return this.leftUntilDone < 1 },

	create: function(){
		this.inherited( arguments );
		this.torrentNameChanged( );
		this.uploadRatioChanged( );
		this.statusChanged( );
		this.addedDateChanged( );
		this.rateUploadChanged( );
		this.rateDownloadChanged( );
		this.percentDoneChanged( );
		this.totalSizeChanged( );
		this.etaChanged( );
		this.downloadedEverChanged( );
		this.addClass("asfasf");
	},

	torrentNameChanged: function(){
		this.$.torrentName.setContent( this.torrentName );
	},

	uploadRatioChanged: function(){
		switch( this.uploadRatio ) {
			case -1:
				this.$.uploadRatio.setContent( enyo.application.language.noRatio );
				break;
			case -2:
				this.$.uploadRatio.setContent( "inf" );
				break;
			default:
				this.$.uploadRatio.setContent( this.uploadRatio.toFixed( 2 ) );
				break;

		}
	},

	addedDateChanged: function(){
		date = new Date( this.addedDate * 1000 );
		this.$.addedDate.setContent( getDate( date ) );
	},

	statusChanged: function(){
		this.$.status.setContent( Torrent.getStatusString( this.status ) );
	},

	rateUploadChanged: function(){
		this.$.rateUpload.setContent( enyo.application.getSpeedUnit( this.rateUpload ) );
	},

	rateDownloadChanged: function(){
		this.$.rateDownload.setContent(enyo.application.getSpeedUnit(this.rateDownload));
	},

	percentDoneChanged: function(){
		this.$.percentDone.setContent( ( this.percentDone * 100 ).toFixed( 0 ) + "%" );
	},

	totalSizeChanged: function(){
		this.$.totalSize.setContent( enyo.application.getSizeUnit( this.totalSize ) );
	},

	etaChanged: function() {
		if( !this.isStopped( ) && !this.isDone( ) ) {
			if( this.eta < 0 ) {
				this.$.eta.setContent( "Unknown" );
			} else {
				this.$.eta.setContent( enyo.application.getTimeFromSec( this.eta ) );
			}
		}
	},

	downloadedEverChanged: function() {
		this.$.downloadedEver.setContent( enyo.application.getSizeUnit( this.downloadedEver ) );
	}





});