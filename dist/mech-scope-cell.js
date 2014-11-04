// mech-scope-cell.js
// version: 0.1.7
// author: Eric Hosick <erichosick@gmail.com> (http://www.erichosick.com/)
// license: MIT
(function() {
"use strict";

var root = this; // window (browser) or exports (server)
var m = root.m || {}; // merge with previous or new module
m._ = m._ || {}; // merge with pervious or new sub-module
m._["version-cell"] = '0.1.7'; // version set through gulp build

// export module for node or the browser
if(typeof module !== 'undefined' && module.exports) {
  module.exports = m;
} else {
  root.m = m;
} 

m.cellWorkBook = m.cellWorkBook || [];
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
	go: { enumerable: false, get: function() {
		var mech = m.cellWorkBook[this._id];
		return (undefined === mech) ? undefined : mech.go;
	}},
	goNum: { enumerable: false, get: function() {
		var mech = m.cellWorkBook[this._id];
		return (undefined === mech) ? undefined : mech.goNum;
	}},
	goStr: { enumerable: false, get: function() {
		var mech = m.cellWorkBook[this._id];
		return (undefined === mech) ? undefined : mech.goStr;
	}},
	goArr: { enumerable: false, get: function() {
		var mech = m.cellWorkBook[this._id];
		return (undefined === mech) ? [undefined] : mech.goArr;
	}},
	goBool: { enumerable: false, get: function() {
		var mech = m.cellWorkBook[this._id];
		return (undefined === mech) ? false : mech.goBool;
	}}
});
m.cellGet = cellGet;
m._.CellGetF = CellGetF;

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
		var val = (undefined === this._v || null === this._v) ? this._v : (this._v.isMech ? (this._byVal ? this._v.go : this._v) : this._v);
		if (cellV) {
			if (cellV._v && cellV._v.isMech) {
				cellV._v._v = val;
			} else {
				cellV._v = val;
			}
		} else {
			cell(this._id,this._v); // No cell, so create one
		}

		return this._v;
	}}
});
m.cellSet = cellSet;
m._.CellSetF = CellSetF;

function cellRef(id) {
	var f = Object.create(CellRefF.prototype);
	f._id = id;
	if ( f._id ) {
		var split = f._id.split(":");
		f._col=split[0];
		f._row=Number(split[1]);
	}
	return f;
}
function CellRefF() {}
CellRefF.prototype = Object.create ( Object.prototype, {
	isMech: { get: function() { return true; }},
	id: { enumerable: false, get: function() { return this._id; }},
	col: { enumerable: false, get: function() { return this._col; }},
	row: { enumerable: false, get: function() { return this._row; }},
	go: { enumerable: false, get: function() { return m.cellWorkBook[this._id]; }}
});
m.cellRef = cellRef;
m._.CellRefF = CellRefF;

function cellRm(id) {
	var f = Object.create(CellRmF.prototype);
	f._id = id;
	if ( f._id ) {
		var split = f._id.split(":");
		f._col=split[0];
		f._row=Number(split[1]);
	}
	return f;
}
function CellRmF() {}
CellRmF.prototype = Object.create ( Object.prototype, {
	isMech: { get: function() { return true; }},
	id: { enumerable: false, get: function() { return this._id; }},
	col: { enumerable: false, get: function() { return this._col; }},
	row: { enumerable: false, get: function() { return this._row; }},
	go: { enumerable: false, get: function() { return this.goBool; }},
	goNum: { enumerable: false, get: function() { return this.goBool ? 1 : 0; }},
	goStr: { enumerable: false, get: function() { return this.goBool ? "true" : "false"; }},
	goArr: { enumerable: false, get: function() { return [this.goBool]; }},
	goBool: { enumerable: false, get: function() { return delete m.cellWorkBook[this._id]; }}
});
m.cellRm = cellRm;
m._.CellRmF = CellRmF;


}.call(this));