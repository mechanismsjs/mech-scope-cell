function cellGet(id) {
  var f = Object.create(CellGetF.prototype);
  f.id = id;
  return f;
}

function CellGetF() {}
CellGetF.prototype = Object.create(Object.prototype, {
  isMech: {
    get: function() {
      return true;
    }
  },
  id: {
    enumerable: false,
    get: function() {
      return (undefined === this._id || null === this._id) ? this._id : (this._id.isMech ? this._id.go : this._id);
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
      var mech = m.cellWorkBook[this.id];
      return (undefined === mech) ? undefined : mech.go;
    }
  },
  goNum: {
    enumerable: false,
    get: function() {
      var mech = m.cellWorkBook[this.id];
      return (undefined === mech) ? undefined : mech.goNum;
    }
  },
  goStr: {
    enumerable: false,
    get: function() {
      var mech = m.cellWorkBook[this.id];
      return (undefined === mech) ? undefined : mech.goStr;
    }
  },
  goArr: {
    enumerable: false,
    get: function() {
      var mech = m.cellWorkBook[this.id];
      return (undefined === mech) ? [undefined] : mech.goArr;
    }
  },
  goBool: {
    enumerable: false,
    get: function() {
      var mech = m.cellWorkBook[this.id];
      return (undefined === mech) ? false : mech.goBool;
    }
  }
});
m.cellGet = cellGet;
m._.CellGetF = CellGetF;
