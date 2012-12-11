enyo.kind({
	name: "TorrentTableHead",
	kind: enyo.Control,
	tag: "tr",
	
	components: [
		{ kind: "TorrentTableHeadCell", content: "Status", compareFunction: "compareByStatus" },
		{ kind: "TorrentTableHeadCell", content: "Name", compareFunction: "compareByName" },
		{ kind: "TorrentTableHeadCell", content: "Size", compareFunction: "compareBySize" },
		{ kind: "TorrentTableHeadCell", content: "Done", compareFunction: "compareByDone" },
		{ kind: "TorrentTableHeadCell", content: "Downloaded", compareFunction: "compareByDownloaded" },
		{ kind: "TorrentTableHeadCell", content: "Uploaded", compareFunction: "compareByUploaded" },
		{ kind: "TorrentTableHeadCell", content: "Ratio", compareFunction: "compareByRatio" },
		{ kind: "TorrentTableHeadCell", content: "Date Added", compareFunction: "compareByDateAdded" },
		{ kind: "TorrentTableHeadCell", content: "DL Rate", compareFunction: "compareByDownloadRate" },
		{ kind: "TorrentTableHeadCell", content: "UL Rate", compareFunction: "compareByUploadRate" },
		{ kind: "TorrentTableHeadCell", content: "ETA", compareFunction: "compareByETA" }

	]

});