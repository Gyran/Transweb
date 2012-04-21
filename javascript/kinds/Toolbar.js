enyo.kind({
	name: "Toolbar",
	kind: enyo.Control,
	tag: "div",

	classes: "toolbar",

	components: [
		{ kind: "AddTorrentToolbarButton" },
		{ kind: "StartTorrentToolbarButton" },
		{ kind: "StopTorrentToolbarButton" }
		
	]
})