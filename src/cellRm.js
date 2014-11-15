function cellRm(id) {
	var f = Object.create(CellRmF.prototype);
	f._id = id;
	if (f._id) {
		var split = f._id.split(":");
		f._col = split[0];
		f._row = Number(split[1]);
	}
	return f;
}

function CellRmF() {}
CellRmF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
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
			return this.goBool;
		}
	},
	goNum: {
		enumerable: false,
		get: function() {
			return this.goBool ? 1 : 0;
		}
	},
	goStr: {
		enumerable: false,
		get: function() {
			return this.goBool ? "true" : "false";
		}
	},
	goArr: {
		enumerable: false,
		get: function() {
			return [this.goBool];
		}
	},
	goBool: {
		enumerable: false,
		get: function() {
			return delete m.cellWorkBook[this._id];
		}
	}
});
m.cellRm = cellRm;
m._.CellRmF = CellRmF;