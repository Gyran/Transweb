enyo.kind({
	name: "TorrentDetails",
	kind: enyo.Control,

	tag: "div",

	handlers: {
		onUpdate: "update",
		onUpdateTorrentDetails: "update"
	},

	components: [
		{ name: "fullpath", tag: "div" }
	],

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

	create: function() {
		this.inherited( arguments );
		this.update( );
	},

	update: function() {
		var torrent = enyo.application.selectedTorrents[0];
		if( torrent ) {
			new enyo.Ajax( { url: "php/rpcconnection.php", method: "post" } ).
				response( this, "gotDetails" ).
				go( { method: "getTorrentDetails", torrent: torrent } );
		} else {
			this.$.fullpath.setContent("no torrent selected");
		}
	},

	gotDetails: function( sender, response ) {
		torrent = response.arguments.torrents[0];
		for( prop in torrent ) {
			if( prop == "name" ) {
				this[ "torrentName" ] = torrent[ prop ];
			}else if( prop == "id" ) {
				this[ "torrentId" ] = torrent[ prop ];
			}
			else {
				this[ prop ] = torrent[ prop ];
			}
		}

		this.fullpathChanged( );
	},

	fullpathChanged: function() {
		this.$.fullpath.setContent( this.downloadDir + "/" + this.torrentName );
	},

	statusChanged: function() {
		this.$.status.setContent( this.status );
	}





});