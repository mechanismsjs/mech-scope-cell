function cellSet(id, v, byVal) {
  var f = Object.create(CellSetF.prototype);
  f.id = id;
  f._v = v;
  if (f._v && f._v.isMech) {
    f._v._parDir = f;
  }

  f._byVal = (undefined === byVal || null === byVal) ? false : byVal;
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
    },
    set: function(value) {
      this._id = value;
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
