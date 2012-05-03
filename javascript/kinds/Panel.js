enyo.kind({
	name: "Panel",
	tag: "div",
	classes: "panel",

	components: [

		{ name: "statesFilter", kind: "StatesFilter" },
		{ kind: "Divider" },
		{ name: "foldersFilter", kind: "FoldersFilter" },
		{ kind: "Divider" },
        { name: "trackersFilter", kind: "TrackersFilter" }
	]
});