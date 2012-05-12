enyo.kind({
	name: "TorrentDetailsInfo",
	kind: enyo.Control,
	classes: "torrentDetailsInfo floatcontainer",
	tag: "div",

	published: {
		label: "",
		value: ""
	},

	components: [
		{ name: "label", tag: "div", classes: "label" },
		{ name: "value", tag: "div", classes: "value" }
	],

	create: function( ) {
		this.inherited( arguments );

		this.labelChanged( );
		this.valueChanged( );
	},

	labelChanged: function( ) {
		this.$.label.setContent( this.label );
	},

	valueChanged: function( ) {
		this.$.value.setContent( this.value );
	}

});

enyo.kind({
	name: "TorrentDetails",
	kind: enyo.Control,
	tag: "div",
	classes: "torrentDetails floatcontainer",

	handlers: {
		onUpdate: "update",
		onUpdateTorrentDetails: "update"
	},

	components: [
		{ tag: "h2", content: "Transfer" },

		{ tag: "div", classes: "transfersCol floatcontainer",
			components: [
				{ name: "status", kind: "TorrentDetailsInfo", label: "Status:" },
				{ name: "downloaded", kind: "TorrentDetailsInfo", label: "Downloaded:" },
				{ name: "downloadSpeed", kind: "TorrentDetailsInfo", label: "Download Speed:" },
				{ name: "downloadLimit", kind: "TorrentDetailsInfo", label: "Download limit:" },
				{ name: "seeds", kind: "TorrentDetailsInfo", label: "Seeders:" },
				{ name: "tracker", kind: "TorrentDetailsInfo", label: "Tracker:" }
			]
		},
		{ tag: "div", classes: "transfersCol floatcontainer",
			components: [
				{ name: "terror", kind: "TorrentDetailsInfo", label: "Error:" },
				{ name: "uploaded", kind: "TorrentDetailsInfo", label: "Uploaded:" },
				{ name: "uploadSpeed", kind: "TorrentDetailsInfo", label: "Upload speed:" },
				{ name: "uploadLimit", kind: "TorrentDetailsInfo", label: "Upload limit:" },
				{ name: "leechers", kind: "TorrentDetailsInfo", label: "Leechers:" },
				{ name: "nextAnnounce", kind: "TorrentDetailsInfo", label: "Next announce:" },
			]
		},
		{ tag: "div", classes: "transfersCol floatcontainer",
			components: [
				{ name: "remaining", kind: "TorrentDetailsInfo", label: "Remaining:" },
				{ name: "wasted", kind: "TorrentDetailsInfo", label: "Wasted:" },
				{ name: "ratio", kind: "TorrentDetailsInfo", label: "Ratio:" },
				{ name: "ratioLimit", kind: "TorrentDetailsInfo", label: "Ratio limit:" },
				{ tag: "br" },
				{ name: "lastActivity", kind: "TorrentDetailsInfo", label: "Last activity:" },
			]
		},

		{ tag: "h2", content: "Torrent" },
		{ name: "fullpath", kind: "TorrentDetailsInfo", label: "Fullpath:" },
		{ tag: "div", classes: "torrentLeft",
			components: [
				{ name: "totalSize", kind: "TorrentDetailsInfo", label: "Total size:" },
				{ name: "hash", kind: "TorrentDetailsInfo", label: "Hash:" },
				{ name: "addedOn", kind: "TorrentDetailsInfo", label: "Added on:" },
				{ name: "completedOn", kind: "TorrentDetailsInfo", label: "Completed on:" }
			]
		},
		{ tag: "div", classes: "torrentRight",
			components: [
				{ name: "createdOn", kind: "TorrentDetailsInfo", label: "Created on:" },
				{ name: "piece", kind: "TorrentDetailsInfo", label: "Pieces:" },
				{ name: "comment", kind: "TorrentDetailsInfo", label: "Comment:" }
			]
		}
	],

	published: {
		torrent: null
	},

	create: function() {
		this.inherited( arguments );
		this.update( );
	},

	update: function() {
		var torrent = enyo.application.getSelectedTorrents()[0];
		if( torrent !== undefined ) {
			this.bubble( "onStartLoading" );
			new enyo.Ajax( { url: "php/rpcconnection.php", method: "post" } ).
				response( this, "gotDetails" ).
				go( { method: "getTorrentDetails", torrent: torrent } );
		} else {
			// TODO no torrent selected...
		}
	},

	gotDetails: function( sender, response ) {
		this.bubble( "onStopLoading" );

		if ( response.success ) {
			var torrent = response.arguments.torrents[0];
			this.torrent = new Torrent( torrent );

			// transfer fields
			this.status();
			this.downloaded();
			this.downloadSpeed();
			this.downloadLimit();
			this.seeds();
			this.tracker();
			this.terror();
			this.uploaded();
			this.uploadSpeed();
			this.uploadLimit();
			this.leechers();
			this.nextAnnounce();
			this.remaining();
			this.wasted();
			this.ratio();
			this.ratioLimit();
			this.lastActivity();

			// torrent fields
			this.fullpath( );
			this.totalSize( );
			this.hash( );
			this.addedOn( );
			this.createdOn( );
			this.pieces( );
			this.comment( );
			this.completedOn( );

			this.render( );
		} else {
			log( "Couldn't get torrent details. Error: " + response.message );
		}
	},

	status: function () {
		this.$.status.setValue( this.torrent.getStatusString() );
	},

	downloaded: function () {
		this.$.downloaded.setValue( enyo.application.getSizeUnit( this.torrent.getDownloadedEver() ) );
	},

	downloadSpeed: function () {
		this.$.downloadSpeed.setValue( enyo.application.getSpeedUnit( this.torrent.getRateDownload() ) );
	},

	downloadLimit: function () {
		if ( this.torrent.getDownloadLimited() ) {
			this.$.downloadLimit.setValue( enyo.application.getSpeedUnit( this.torrent.getDownloadLimit() ) );
		} else {
			this.$.downloadLimit.setValue( "no limit" );
		}
	},

	seeds: function () {
		this.$.seeds.setValue( this.torrent.getNumSeeders() );
	},

	tracker: function () {
		var tracker = this.torrent.getFirstTrackerStatus();
		this.$.tracker.setValue( tracker.getHostName() );
	},

	terror: function () {
		this.$.terror.setValue( this.torrent.getErrorString() );
	},

	uploaded: function () {
		this.$.uploaded.setValue( enyo.application.getSizeUnit( this.torrent.getUploadedEver() ) );
	},

	uploadSpeed: function () {
		this.$.uploadSpeed.setValue( enyo.application.getSpeedUnit( this.torrent.getRateUpload() ) );
	},

	uploadLimit: function () {
		if ( this.torrent.getUploadLimited() ) {
			this.$.uploadLimit.setValue( enyo.application.getSpeedUnit( this.torrent.getUploadLimit() ) );
		} else {
			this.$.uploadLimit.setValue( "no limit" );
		}
	},

	leechers: function () {
		this.$.leechers.setValue( this.torrent.getNumLeechers() );
	},

	nextAnnounce: function () {
		var nextTime = this.torrent.getFirstTrackerStatus().getNextAnnounceTime();
		this.$.nextAnnounce.setValue( getDate( nextTime ) );
	},

	remaining: function () {
		var remaining = this.torrent.getLeftUntilDone();
		this.$.remaining.setValue( enyo.application.getSizeUnit( remaining ) );
	},

	wasted: function () {
		var corrupted = this.torrent.getCorruptEver();
		this.$.wasted.setValue( enyo.application.getSizeUnit( corrupted ) );
	},

	ratio: function () {
		this.$.ratio.setValue( this.torrent.getUploadRatio().toFixed( 2 ) );
	},

	ratioLimit: function () {
		var ratioLimit = this.torrent.getRatioLimit();
		if ( ratioLimit === -1 ) {
			this.$.ratioLimit.setValue( "no limit" );
		} else {
			this.$.ratioLimit.setValue( ratioLimit.toFixed( 2 ) );
		}
	},

	lastActivity: function () {
		var activityTime = this.torrent.getActivityDate();
		this.$.lastActivity.setValue( getDate( activityTime ) );
	},

	fullpath: function() {
		var fullpath = this.torrent.getDownloadDir();
		if( !fullpath.endsWith("/") ) {
			fullpath += "/";
		}
		fullpath += this.torrent.getName();
		this.$.fullpath.setValue( fullpath );
	},

	totalSize: function( ) {
		this.$.totalSize.setValue( enyo.application.getSizeUnit( this.torrent.getTotalSize() ) );
	},

	hash: function( ) {
		this.$.hash.setValue( this.torrent.getHashString() );
	},

	addedOn: function( ) {
		this.$.addedOn.setValue( getDate( this.torrent.getAddedDate( ) ) );
	},

	createdOn: function( ) {
		this.$.createdOn.setValue( getDate( this.torrent.getCreatedDate( ) ) );
	},

	pieces: function( ) {
		this.$.piece.setValue( this.torrent.getPieceCount() + " * " + enyo.application.getSizeUnit( this.torrent.getPieceSize() ) );
	},

	comment: function( ) {
		this.$.comment.setValue( this.torrent.comment );
	},

	completedOn: function( ) {
		this.$.completedOn.setValue( getDate( this.torrent.getDoneDate( ) ) );
	}

});