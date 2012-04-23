enyo.kind({
	name: "TorrentTable",
	kind: enyo.Control,
	tag: "table",

	classes: "torrentTable",

	components: [
		{ kind: "TorrentTableHead" }
	],

	handlers: {
		onTorrentsUpdated: "torrentsUpdated",
		onDeselectAll: "deselectAll",
		onSelectAll: "selectAll"
	},

	torrentsUpdated: function(){
		this.listTorrents();
	},

	create: function () {
		this.inherited( arguments );
	},

	listTorrents: function(){
		this.destroyClientControls();
		enyo.forEach( enyo.application.getTorrents( ), this.addTorrentToList, this );
		this.render();
	},

	addTorrentToList: function ( t ) {
		if( enyo.application.torrentFilterFunction( t ) ){
			newTorrent = { kind: "TorrentRow", container: this, torrent: t };

			if( enyo.application.selectedTorrents.indexOf(t.hashString) !== -1 ) {
				newTorrent.classes = "selected";
			}

			this.createComponent(newTorrent);
		}
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
