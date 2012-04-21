enyo.kind({
	name: "Panel",
	tag: "div",

	components: [
		{ name: "statesSorter", kind: "StatesSorter" },
		{ name: "categoriesSorter", kind: "CategoriesSorter" }
	]
});