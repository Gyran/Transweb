enyo.kind({
	name: "Panel",
	tag: "div",

	components: [
		{ name: "statesFilter", kind: "StatesFilter" },
		{ name: "foldersFilter", kind: "FoldersFilter" }
	]
});