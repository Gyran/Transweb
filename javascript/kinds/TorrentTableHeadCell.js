enyo.kind({
	name: "TorrentTableHeadCell",
	kind: enyo.Control,
	tag: "th",

	tap: function( sender, event ) {
		enyo.application.setPref( "torrentCompareFunction", this.compareFunction );
		this.bubble( "onForceUpdate" );
	}
});