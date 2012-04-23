enyo.kind({
	name: "TorrentDetailsInfo",
	kind: enyo.Control,
	classes: "torrentDetailsInfo floatcontainer",

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
		if( torrent ) {
			this.bubble( "onStartLoading" );
			new enyo.Ajax( { url: "php/rpcconnection.php", method: "post" } ).
				response( this, "gotDetails" ).
				go( { method: "getTorrentDetails", torrent: torrent } );
		} else {
			this.$.fullpath.setContent("no torrent selected");
		}
	},

	gotDetails: function( sender, response ) {
		this.bubble( "onStopLoading" );
		var torrent = response.arguments.torrents[0];
		this.torrent = new Torrent( );
		this.torrent.fill(torrent);

		this.fullpath( );
		this.totalSize( );
		this.hash( );
		this.addedOn( );
		this.createdOn( );
		this.pieces( );
		this.comment( );
		this.completedOn( );

		this.render( );
	},

	fullpath: function() {
		var fullpath = this.torrent.downloadDir;
		if( !fullpath.endsWith("/") ) {
			fullpath += "/";
		}
		fullpath += this.torrent.name;
		this.$.fullpath.setValue( fullpath );
	},

	totalSize: function( ) {
		this.$.totalSize.setValue( enyo.application.getSizeUnit( this.torrent.totalSize ) );
	},

	hash: function( ) {
		this.$.hash.setValue( this.torrent.hashString );
	},

	addedOn: function( ) {
		this.$.addedOn.setValue( getDate( this.torrent.getAddedDate( ) ) );
	},

	createdOn: function( ) {
		this.$.createdOn.setValue( getDate( this.torrent.getCreatedDate( ) ) );
	},

	pieces: function( ) {
		this.$.piece.setValue( this.torrent.pieceCount + " * " + enyo.application.getSizeUnit( this.torrent.pieceSize ) );
	},

	comment: function( ) {
		this.$.comment.setValue( this.torrent.comment );
	},

	completedOn: function( ) {
		this.$.completedOn.setValue( getDate( this.torrent.getDoneDate( ) ) );
	}

});