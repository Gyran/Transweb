enyo.kind({
	name: "Torrent",
	kind: enyo.Control,
	tag: "tr",

	components: [
		{ name: "id", kind: "TorrentTableBodyCell" },
		{ name: "torrentName", kind: "TorrentTableBodyCell" },
		{ name: "percentDone", kind: "TorrentTableBodyCell" },
		{ name: "uploadRatio", kind: "TorrentTableBodyCell" },
		{ name: "addedDate", kind: "TorrentTableBodyCell" },
		{ name: "rateUpload", kind: "TorrentTableBodyCell" },
		{ name: "rateDownload", kind: "TorrentTableBodyCell" }
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
		id: -1,
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

	create: function(){
		this.inherited(arguments);
		this.torrentNameChanged();
		this.uploadRatioChanged();
		this.idChanged();
		this.addedDateChanged();
		this.rateUploadChanged();
		this.rateDownloadChanged();
		this.percentDoneChanged();
	},

	torrentNameChanged: function(){
		this.$.torrentName.setContent(this.torrentName);
	},

	uploadRatioChanged: function(){
		this.$.uploadRatio.setContent(this.uploadRatio);
	},

	addedDateChanged: function(){
		date = new Date(this.addedDate * 1000);
		this.$.addedDate.setContent(getDate(date));
	},

	idChanged: function(){
		this.$.id.setContent(this.id);
	},

	rateUploadChanged: function(){
		this.$.rateUpload.setContent(bytesToSize(this.rateUpload) + "/s");
	},

	rateDownloadChanged: function(){
		this.$.rateDownload.setContent(bytesToSize(this.rateDownload) + "/s");
	},

	percentDoneChanged: function(){
		this.$.percentDone.setContent(this.percentDone * 100 + "%");
	}





});