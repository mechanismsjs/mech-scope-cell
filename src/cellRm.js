function cellRm(id) {
  var f = Object.create(CellRmF.prototype);
  f.id = id;
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
