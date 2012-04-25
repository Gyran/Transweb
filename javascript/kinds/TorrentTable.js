enyo.kind({
	name: "TorrentTable",
	kind: enyo.Control,
	tag: "table",

	classes: "torrentTable",

	components: [
		{ kind: "TorrentTableHead" }
	],

	handlers: {
		onUpdate: "torrentsUpdated",
		onTorrentsUpdated: "torrentsUpdated",
		onDeselectAll: "deselectAll",
		onSelectAll: "selectAll"
	},

	torrents: [ ],

	torrentsUpdated: function(){
		this.showTorrents();
	},

	create: function () {
		this.inherited( arguments );
	},

	showTorrents: function () {
		this.filterTorrents();
		this.sortTorrents();
		this.listTorrents();
	},
 
	filterTorrents: function () {
		this.torrents = [ ];

		var filter = function ( torrent ) {
			if ( enyo.application.getPref( "torrentFilterFunction" ).call( this, torrent ) ) {
				this.torrents.push( torrent );
			}
		};

		enyo.forEach( enyo.application.getTorrents( ), filter, this );
	},

	sortTorrents: function () {
		Torrent.sortTorrents( 
			this.torrents, 
			enyo.application.getPref( "torrentCompareFunction" ),
			enyo.application.getPref( "torrentSortDirection" )
		);
	},

	listTorrents: function(){
		this.destroyClientControls();
		enyo.forEach( this.torrents, this.addTorrentToList, this );
		this.render();
	},

	addTorrentToList: function ( t ) {
		newTorrent = { kind: "TorrentRow", container: this, torrent: t };

		if( enyo.application.selectedTorrents.indexOf(t.hashString) !== -1 ) {
			newTorrent.classes = "selected";
		}
		this.createComponent(newTorrent);
	},

	tap: function( sender, event ) {

	},

	deselectAll: function( ) {
		enyo.application.deselectAllTorrents( );
		this.waterfall( "onDeselect" );
	},

	selectAll: function( ) {
		this.waterfall( "onSelect" );	
	}

});
