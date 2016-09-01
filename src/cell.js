function cell(id, v) {
  var f = Object.create(CellF.prototype);
  f._v = (undefined === v) ? null : v;

  if (f._v && f._v.isMech) {
    f._v._parDir = f;
  }
  f.id = id;
  m.cellWorkBook[f.id] = f;
  return f;
}

function CellF() {}
CellF.prototype = Object.create(Object.prototype, {
  isMech: {
    get: function() {
      return true;
    }
  },
  v: {
    get: function() {
      return this._v;
    },
    set: function(d) {
      this._v = d;
    }
  },
  id: {
    enumerable: false,
    get: function() {
      return this._id;
    },
    set: function(value) {
      this._id = (undefined !== value && null !== value) ? value : "A:0";
      var cellId = this.id;
      if (undefined !== cellId && null !== cellId) {
        if (cellId.split) {
          var split = cellId.split(":");
          if (3 == split.length) {
            this._sheet = split[0];
            this._col = split[1];
            this._row = Number(split[2]);
          } else {
            this._sheet = "";
            this._col = split[0];
            this._row = Number(split[1]);
          }
        } // else {} do nothing. No col/row value
      }
    }
  },
  sheet: {
    enumerable: false,
    get: function() {
      return this._sheet;
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
      return (undefined === this.v || null === this.v) ? this.v : (this.v.isMech ? this.v.go : this.v);
    }
  },
  goNum: {
    enumerable: false,
    get: function() {
      return (undefined === this.v || null === this.v) ? this.v : (this.v.isMech ? this.v.goNum : Number(this.v));
    }
  },
  goStr: {
    enumerable: false,
    get: function() {
      return (undefined === this.v || null === this.v) ? this.v : (this.v.isMech ? this.v.goStr : this.v.toString());
    }
  },
  goArr: {
    enumerable: false,
    get: function() {
      return (undefined === this.v || null === this.v) ? [this.v] : (this.v.isMech ? this.v.goArr : (this.v instanceof Array) ? this.v : [this.v]);
    }
  },
  goBool: {
    enumerable: false,
    get: function() {
      return (undefined === this.v || null === this.v) ? false : (this.v.isMech ? this.v.goBool : this.v > 0);
    }
  }
});
m.cell = cell;
m._.CellF = CellF;
