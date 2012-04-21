enyo.kind({
	name: "StatesSorter",
	kind: enyo.Control,
	tag: "ul",

	components: [
		{ kind: "State", stateName: "All", filterFunction: enyo.application.filterAll },
		{ kind: "State", stateName: "Downloading", filterFunction: enyo.application.filterDownloading },
		{ kind: "State", stateName: "Completed", filterFunction: enyo.application.filterCompleted },
		{ kind: "State", stateName: "Active", filterFunction: enyo.application.filterActive },
		{ kind: "State", stateName: "Inactive", filterFunction: enyo.application.filterInactive },
		{ kind: "State", stateName: "Stopped", filterFunction: enyo.application.filterStopped }
	]



});