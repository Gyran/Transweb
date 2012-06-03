enyo.kind({
	name: "TorrentTableHead",
	kind: enyo.Control,
	tag: "tr",
	
	components: [
		{ kind: "TorrentTableHeadCell", content: "Status", compareFunction: "Torrent.compareByStatus" },
		{ kind: "TorrentTableHeadCell", content: "Name", compareFunction: "Torrent.compareByName" },
		{ kind: "TorrentTableHeadCell", content: "Size", compareFunction: "Torrent.compareBySize" },
		{ kind: "TorrentTableHeadCell", content: "Done", compareFunction: "Torrent.compareByDone" },
		{ kind: "TorrentTableHeadCell", content: "Downloaded", compareFunction: "Torrent.compareByDownloaded" },
		{ kind: "TorrentTableHeadCell", content: "Uploaded", compareFunction: "Torrent.compareByUploaded" },
		{ kind: "TorrentTableHeadCell", content: "Ratio", compareFunction: "Torrent.compareByRatio" },
		{ kind: "TorrentTableHeadCell", content: "Date Added", compareFunction: "Torrent.compareByDateAdded" },
		{ kind: "TorrentTableHeadCell", content: "DL Rate", compareFunction: "Torrent.compareByDownloadRate" },
		{ kind: "TorrentTableHeadCell", content: "UL Rate", compareFunction: "Torrent.compareByUploadRate" },
		{ kind: "TorrentTableHeadCell", content: "ETA", compareFunction: "Torrent.compareByETA" }

	]

});