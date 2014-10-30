function cellSet(id,v,byVal) {
	var f = Object.create(CellSetF.prototype);
	f._id = id;
	f._v = v;
	f._byVal = (undefined === byVal || null === byVal) ? false : byVal;
	if ( f._id ) {
		var split = f._id.split(":");
		f._col=split[0];
		f._row=Number(split[1]);
	}
	return f;
}
function CellSetF() {}
CellSetF.prototype = Object.create ( Object.prototype, {
	isMech: { get: function() { return true; }},
	id: { enumerable: false, get: function() { return this._id; }},
	col: { enumerable: false, get: function() { return this._col; }},
	row: { enumerable: false, get: function() { return this._row; }},
	go: { enumerable: false, get: function() {
		var cellV = m.cellWorkBook[this._id];
		var val = this._v.isMech ? (this._byVal ? this._v.go : this._v) : this._v;
		if (cellV._v.isMech) {
			cellV._v._v = val;
		} else {
			cellV._v = val;
		}

		return this._v;
	}},
	// goNum: { enumerable: false, get: function() { return m.cellWorkBook[this._id].goNum; }},
	// goStr: { enumerable: false, get: function() { return m.cellWorkBook[this._id].goStr; }},
	// goArr: { enumerable: false, get: function() { return m.cellWorkBook[this._id].goArr; }},
	// goBool: { enumerable: false, get: function() { return m.cellWorkBook[this._id].goBool; }}
});
m.cellSet = cellSet;
m._.CellSetF = CellSetF;
