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
	v: { get: function() { return this._v; },
		set: function(d) { this._v = d; }
  },	
	id: { enumerable: false, get: function() { return this._id; }},
	col: { enumerable: false, get: function() { return this._col; }},
	row: { enumerable: false, get: function() { return this._row; }},
	go: { enumerable: false, get: function() { return (undefined === this.v || null === this.v) ? this.v : (this.v.isMech ? this.v.go : this.v); }},
	goNum: { enumerable: false, get: function() { return (undefined === this.v || null === this.v) ? this.v : (this.v.isMech ? this.v.goNum : Number(this.v)); }},
	goStr: { enumerable: false, get: function() { return (undefined === this.v || null === this.v) ? this.v : (this.v.isMech ? this.v.goStr : this.v.toString()); }},
	goArr: { enumerable: false, get: function() { return (undefined === this.v || null === this.v) ? [this.v] : (this.v.isMech ? this.v.goArr : (this.v instanceof Array) ? this.v : [this.v]); }},
	goBool: { enumerable: false, get: function() { return (undefined === this.v || null === this.v) ? false : (this.v.isMech ? this.v.goBool : this.v > 0); }}
});
m.cell = cell;
m._.CellF = CellF;
