// mech-scope-cell.js
// version: 0.2.4
// author: Eric Hosick <erichosick@gmail.com> (http://www.erichosick.com/)
// license: MIT
(function() {
"use strict";

var root = this; // window (browser) or exports (server)
var m = root.m || {}; // merge with previous or new module
m._ = m._ || {}; // merge with pervious or new sub-module
m._["version-cell"] = '0.2.4'; // version set through gulp build

// export module for node or the browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = m;
} else {
  root.m = m;
}

m.cellWorkBook = m.cellWorkBook || [];
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

function cellRef(id) {
  var f = Object.create(CellRefF.prototype);
  f.id = id;
  return f;
}

function CellRefF() {}
CellRefF.prototype = Object.create(Object.prototype, {
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
      return m.cellWorkBook[this._id];
    }
  }
});
m.cellRef = cellRef;
m._.CellRefF = CellRefF;

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


}.call(this));