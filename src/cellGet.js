function cellGet(id) {
	var f = Object.create(CellGetF.prototype);
	f._id = id;
	if ( f._id ) {
		var split = f._id.split(":");
		f._col=split[0];
		f._row=Number(split[1]);
	}
	return f;
}
function CellGetF() {}
CellGetF.prototype = Object.create ( Object.prototype, {
	isMech: { get: function() { return true; }},
	id: { enumerable: false, get: function() { return this._id; }},
	col: { enumerable: false, get: function() { return this._col; }},
	row: { enumerable: false, get: function() { return this._row; }},
	go: { enumerable: false, get: function() { return m.cellWorkBook[this._id].go; }},
	goNum: { enumerable: false, get: function() { return m.cellWorkBook[this._id].goNum; }},
	goStr: { enumerable: false, get: function() { return m.cellWorkBook[this._id].goStr; }},
	goArr: { enumerable: false, get: function() { return m.cellWorkBook[this._id].goArr; }},
	goBool: { enumerable: false, get: function() { return m.cellWorkBook[this._id].goBool; }}
});
m.cellGet = cellGet;
m._.CellGetF = CellGetF;
