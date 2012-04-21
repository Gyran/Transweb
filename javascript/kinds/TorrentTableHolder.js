enyo.kind({
	name: "TorrentTableHolder",
	kind: enyo.Control,
	tag: "div",
	classes: "torrentTableHolder",

	components: [
		{ name: "torrentTable", kind: "TorrentTable" }
	]
});