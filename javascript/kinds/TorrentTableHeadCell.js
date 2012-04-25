enyo.kind({
	name: "TorrentTableHeadCell",
	kind: enyo.Control,
	tag: "th",

	tap: function( sender, event ) {
		if ( enyo.application.getPref( "torrentCompareFunction" ) === this.compareFunction ) {
			if ( enyo.application.getPref( "torrentSortDirection" ) === enyo.application._PREF_SORT_DESC ) {
				newSortDirection = enyo.application._PREF_SORT_ASC;
			} else {
				newSortDirection = enyo.application._PREF_SORT_DESC;
			}
			enyo.application.setPref( "torrentSortDirection", newSortDirection );
		}

		enyo.application.setPref( "torrentCompareFunction", this.compareFunction );
		this.bubble( "onForceUpdate" );
	}
});