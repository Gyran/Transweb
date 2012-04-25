enyo.kind({
	name: "StatesFilter",
	kind: enyo.Control,
	tag: "ul",

	components: [
		{ kind: "StateFilter", stateName: "All", filterFunction: Torrent.filterAll },
		{ kind: "StateFilter", stateName: "Downloading", filterFunction: Torrent.filterDownloading },
		{ kind: "StateFilter", stateName: "Completed", filterFunction: Torrent.filterCompleted },
		{ kind: "StateFilter", stateName: "Active", filterFunction: Torrent.filterActive },
		{ kind: "StateFilter", stateName: "Inactive", filterFunction: Torrent.filterInactive },
		{ kind: "StateFilter", stateName: "Stopped", filterFunction: Torrent.filterStopped }
	]



});