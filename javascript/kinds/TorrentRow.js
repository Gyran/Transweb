enyo.application.language.noRatio = "None";

enyo.kind({
	name: "TorrentRow",
	kind: enyo.Control,
	tag: "tr",

	classes: "torrent",

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
		enyo.application.deselectTorrent( this.torrent.hashString );
		//this.bubble( "onAnnounceEvent", { event: "onUpdateTorrentDetails", arguments: [ ] } );
	},

	select: function( sender ) {
		this.addClass( "selected" );
		enyo.application.selectTorrent( this.torrent.hashString );
		this.bubble( "onAnnounceEvent", { event: "onUpdateTorrentDetails", arguments: [ ] } );
	},

	published: {
		torrent: null
	},

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
	},

	tap: function( sender, event ) {
		selected = this.hasClass( "selected" );
		if( event.metaKey || event.ctrlKey ) {
			if( selected ) {
				this.deselect( );
			} else {
				this.select( );
			}
		} else {
			this.bubble( "onAnnounceEvent", { event: "onDeselectAll", arguments: [] } );
			if( !selected ) {
				this.select( );
			}
		}
	},
 
	torrentNameChanged: function(){
		this.$.torrentName.setContent( this.torrent.name );
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
				this.$.uploadRatio.setContent( this.torrent.uploadRatio.toFixed( 2 ) );
				break;

		}
	},

	addedDateChanged: function(){
		date = new Date( this.torrent.addedDate * 1000 );
		this.$.addedDate.setContent( getDate( date ) );
	},

	statusChanged: function(){
		this.$.status.setContent( this.torrent.getStatusString( ) );
	},

	rateUploadChanged: function(){
		this.$.rateUpload.setContent( enyo.application.getSpeedUnit( this.torrent.rateUpload ) );
	},

	rateDownloadChanged: function(){
		this.$.rateDownload.setContent(enyo.application.getSpeedUnit(this.torrent.rateDownload));
	},

	percentDoneChanged: function(){
		this.$.percentDone.setContent( ( this.torrent.percentDone * 100 ).toFixed( 0 ) + "%" );
	},

	totalSizeChanged: function(){
		this.$.totalSize.setContent( enyo.application.getSizeUnit( this.torrent.totalSize ) );
	},

	etaChanged: function() {
		if( !this.torrent.isStopped( ) && !this.torrent.isDone( ) ) {
			if( this.eta < 0 ) {
				this.$.eta.setContent( "Unknown" );
			} else {
				this.$.eta.setContent( enyo.application.getTimeFromSec( this.torrent.eta ) );
			}
		}
	},

	downloadedEverChanged: function() {
		this.$.downloadedEver.setContent( enyo.application.getSizeUnit( this.torrent.downloadedEver ) );
	}





});