var merge = require("merge");
m = require("../node_modules/mech-core/dist/mech-core.js");
m2 = require("..");
merge.recursive(m, m2); // mech-scope-cell is a core mechanism
expect = require("chai").expect;
require("./run-all.js");
