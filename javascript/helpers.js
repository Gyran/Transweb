String.prototype.endsWith = function(str) 
{
    return ( this.match( str + "$" ) == str );
}

function getDate(date){
	function pad(n) {
		return n < 10 ? ("0" + n) : n;
	}
	return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + " " + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds());
}

function bytesToSize(bytes) {
    var sizes = [ 'n/a', 'bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    if(bytes == 0)
		return "0 " + sizes[1];
    var i = +Math.floor(Math.log(bytes) / Math.log(1024));
    return  (bytes / Math.pow(1024, i)).toFixed( i ? 1 : 0 ) + ' ' + sizes[ isNaN( bytes ) ? 0 : i+1 ];
}