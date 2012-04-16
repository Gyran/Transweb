enyo.kind({
	name: "Toolbar",
	kind: enyo.Control,
	tag: "div",

	components: [
		{ kind: "AddTorrentToolbarButton" },
		{ kind: "StartTorrentToolbarButton" },
		{ kind: "StopTorrentToolbarButton" }
		
	]
})