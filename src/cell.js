function cell(id,v) {
  // console.log("HELLO");
  // console.log(m.cellWorkBook);
	var f = Object.create(CellF.prototype);
	f._id = id ? id : "A:0";
	f._v = (undefined === v) ? null : v;
	var split = f._id.split(":");
	f._col=split[0];
	f._row=Number(split[1]);
	m.cellWorkBook[f._id] = f;
	return f;
}
function CellF() {}
CellF.prototype = Object.create ( Object.prototype, {
	isMech: { get: function() { return true; }},
	v: { get: function() { return this._v; }},	
	id: { enumerable: false, get: function() { return this._id; }},
	col: { enumerable: false, get: function() { return this._col; }},
	row: { enumerable: false, get: function() { return this._row; }},
	go: { enumerable: false, get: function() { return (undefined === this._v || null === this._v) ? this._v : (this._v.isMech ? this._v.go : this._v); }},
	goNum: { enumerable: false, get: function() { return (undefined === this._v || null === this._v) ? this._v : (this._v.isMech ? this._v.goNum : Number(this._v)); }},
	goStr: { enumerable: false, get: function() { return (undefined === this._v || null === this._v) ? this._v : (this._v.isMech ? this._v.goStr : this._v.toString()); }},
	goArr: { enumerable: false, get: function() { return (undefined === this._v || null === this._v) ? [this._v] : (this._v.isMech ? this._v.goArr : (this._v instanceof Array) ? this._v : [this._v]); }},
	goBool: { enumerable: false, get: function() { return (undefined === this._v || null === this._v) ? false : (this._v.isMech ? this._v.goBool : this._v > 0); }}
});
m.cell = cell;
m._.CellF = CellF;
