enyo.kind({
	name: "StatesFilter",
	kind: enyo.Control,
	tag: "ul",

	components: [
		{ kind: "StateFilter", stateName: "All", filterFunction: enyo.application.filterAll },
		{ kind: "StateFilter", stateName: "Downloading", filterFunction: enyo.application.filterDownloading },
		{ kind: "StateFilter", stateName: "Completed", filterFunction: enyo.application.filterCompleted },
		{ kind: "StateFilter", stateName: "Active", filterFunction: enyo.application.filterActive },
		{ kind: "StateFilter", stateName: "Inactive", filterFunction: enyo.application.filterInactive },
		{ kind: "StateFilter", stateName: "Stopped", filterFunction: enyo.application.filterStopped }
	]



});