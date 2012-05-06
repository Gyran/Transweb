enyo.kind({
    name: "TorrentFile",
    kind: enyo.Control,
    tag: "tr",

    published: {
        file: null,
        fileStats: null
    },

    components: [
        { name: "fileName", tag: "td" },
        { name: "size", tag: "td" },
        { name: "downloaded", tag: "td" },
        { name: "done", tag: "td" },
        { name: "priority", tag: "td" }
    ],


    create: function() {
        this.inherited( arguments );

        this.fileName();
        this.size();
        this.downloaded();
        this.done();
        this.priority();
    },

    fileName: function () {
        this.$.fileName.setContent( this.file.getFileName() );
    },

    size: function () {
        this.$.size.setContent( enyo.application.getSizeUnit( this.file.getLength() ) );
    },

    downloaded: function () {
        this.$.downloaded.setContent( enyo.application.getSizeUnit( this.file.getBytesCompleted() ) );
    },

    done: function () {
        var percent = this.file.getBytesCompleted() / this.file.getLength();
        this.$.done.setContent( (percent * 100).toFixed( 0 ) + "%" );
    },

    priority: function () {
        this.$.priority.setContent( this.fileStats.getPriority() );

    }


});
