(function() {
"use strict";

var root = this; // window (browser) or exports (server)

var m = root.m || {}; // merge with previous or new module
m._ = m._ || {}; // merge with pervious or new sub-module
m._["version-{{NAMESUB}}"] = '{{VERSION}}'; // version set through gulp build

// export module for node or the browser
if(typeof module !== 'undefined' && module.exports) {
  module.exports = m;
} else {
  root.m = m;
} 
