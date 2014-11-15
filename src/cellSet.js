function cellSet(id, v, byVal) {
	var f = Object.create(CellSetF.prototype);
	f._id = id;
	f._v = v;
	if (f._v && f._v.isMech) {
		f._v._parDir = f;
	}

	f._byVal = (undefined === byVal || null === byVal) ? false : byVal;
	if (f._id) {
		var split = f._id.split(":");
		f._col = split[0];
		f._row = Number(split[1]);
	}
	return f;
}

function CellSetF() {}
CellSetF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	v: {
		get: function() {
			return this._v;
		}
	},
	id: {
		enumerable: false,
		get: function() {
			return this._id;
		}
	},
	col: {
		enumerable: false,
		get: function() {
			return this._col;
		}
	},
	row: {
		enumerable: false,
		get: function() {
			return this._row;
		}
	},
	go: {
		enumerable: false,
		get: function() {
			var cellV = m.cellWorkBook[this._id];
			var val = (undefined === this.v || null === this.v) ? this.v : (this.v.isMech ? (this._byVal ? this.v.go : this.v) : this.v);
			if (cellV) {
				if (cellV.v && cellV.v.isMech) {
					cellV.v.v = val;
				} else {
					cellV.v = val;
				}
			} else {
				cell(this._id, this.v); // No cell, so create one
			}

			return this.v;
		}
	}
});
m.cellSet = cellSet;
m._.CellSetF = CellSetF;