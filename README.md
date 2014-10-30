[mech-home-link]: https://github.com/mechanisms/mech "Home repository for mechanisms"
[mech-scope-stack-home-link]: https://github.com/mechanismsjs/mech-scope-stack "Stack based scoping mechanisms."
[mech-emit-link]: https://github.com/mechanismsjs/mech-emit "Mechanisms for emitting data"


# mech-scope-cell

This library provides cell (spreadsheet) based [scoping](https://en.wikipedia.org/wiki/Scope_%28computer_science%29) mechanisms. It is consider core so directly added to the m (mechanisms) library.

It is incomplete (see TODO)

Traditional [scoping](https://en.wikipedia.org/wiki/Scope_%28computer_science%29) mechanisms are stack based ([mech-scope-stack][mech-scope-stack-home-link]).

See [Mechanisms Home][mech-home-link] for more information and other libraries.

Supported Mechanisms:

* *cell* - a cell whose value is uniquely identified by row, column and worksheet.
* *cellGet* - read a value from a cell
* *cellSet* - set a value in a cell
* *workbook* - global workbook containing multiple worksheets.

## TODO

* Add support so cells belong to a work sheet.
* Collision detection when creating a cell.
* Create a cellRm (cell remove) mechanism.

## Stack and Cell Scoping Mechanisms

Traditional stack based scoping:

```javascript
function addT(left, right) {
    return left + right;
}
```
The parameters left and right are only visible within add. The values are stored on the [stack](https://en.wikipedia.org/wiki/Stack-based_memory_allocation).

Cell based scoping mechanisms use cells (as opposed to a stack) to store values.

```javascript
var sp = require("mech-scope-cell");
var m = require("mech-math");
sp.cell("A:1",5);
sp.cell("A:2",2);
var addF = m.add(sp.cellGet("A:1"), sp.cellGet("A:2"));
addF.go;
```

Values are in cells '*A:1*' and '*A:2*'. Scope is defined by cells.

addT and m.add provide the same behavior.

### Example 01

Mechansism are reactive meaning cell '*A:3*' will always reflect the addition of the values in cells '*A:1*' and '*A:2*'.

```javascript
var sp = require("mech-scope-cell");
var m = require("mech-math");
sp.cell("A:1",3);
sp.cell("A:2",4);
sp.cell("A:3",
  m.add(
    sp.cellGet("A:1"),
    sp.cellGet("A:2")
  )
);

sp.cellGet("A:3").go; // returns 7
sp.cellGet("A:3").goNum; // returns 7
sp.cellGet("A:3").goStr; // '(3 + 4)

sp.cellSet("A:1",14).go; // set cell A:1
sp.cellGet("A:3").goStr; // '(14 + 4)
```

### Example 02

Let's have some fun using the [emitter][mech-emit-link] library.

```javascript
var sp = require("mech-scope-cell");
var em = require("mech-emit");
sp.cell("A:1", em.emitFromArr(1,400,2,true));

sp.cellGet("A:1").go; // returns 1
sp.cellGet("A:1").go; // returns 3
sp.cellGet("A:1").go; // returns 5
// and so on
```
We've plugged an emitter into cell '*A:1*'. Every time we get from that cell, we cause the emitter mechanism to run emitting a single value.

## CellF mechanism

A cell whose value is uniquely identified by column, row and worksheet.

```javascript
var sp = require("mech-scope-cell");
sp.cell("A:1",4); // cell in 'DEF' work book, column A row 1 with a value of 4
sp.cell(); // cell in 'DEF" work book at column A row 0 with a value of undefined
sp.cell("WS1:BB:34"); // cell in 'WS1' work book, column BB row 34 // TODO: workbooks aren't supported yet so
```

A cell automatically adds itself to the global workbook: **cellWorkBook**.

**WARNING**: The underlying workbook data structure may change. Directly accessing it is discouraged. It is encapsulated by the mechanisms in this library.

See cellRm mechanism to remove a cell

## CellGetF mechanism

Returns the value of a cell.

```javascript
var sp = require("mech-scope-cell");
sp.cell("B:3","Good day!");
sp.cellGet("B:3").go; // returns 'Good day!'
sp.cellGet("B:3").goNum; // returns NaN
sp.cellGet("B:3").goStr; // returns 'Good day!'
sp.cellGet("B:3").goArr; // returns ['Good day!']
sp.cellGet("B:3").goBool; // returns false

sp.cellWorkBook; // shows all cells

```

## CellSetF mechanism

Sets the value of a cell.

```javascript
var sp = require("mech-scope-cell");
sp.cell("B:3","Good day!");
sp.cellSet("B:3","Good evening!").go; // cell 'B:3' contains good evening
```

By default, cellSet copies values of primitives and adds a reference to mechanisms.

**IMPORTANT**: To set the value of the mechanism, you need to set the byVal argument of cellSet to true

```javascript
var sp = require("mech-scope-cell");
var m = require("mech-core");
var goodDay = m.str("Good day!");
sp.cell("A:4", "Good morning!");
sp.cellSet("A:4", goodDay, false).go; // cell 'A:4' contains a reference to instance of the goodDay mechanism.

var goodEvening = m.str("Good evening!");
sp.cell("A:5", "Good morning!", true);
sp.cellSet("A:5",goodEvening, true).go; // cell 'A:5' contains the value "Good evening"
```

## CellRmF mechanism

Removes a cell from the global workbook.

// **TODO**: create a remove mechanism

# Setup

## Using In Your Projects

Change directory to your node project.

    $ npm install --save mech-scope-cell

## Development

### Setup

    $ npm install

### Continuous Rebuild and Testing

See ./dist for files we build.

    $ gulp

#### Test

    $ gulp webtests

OR

Right mouse click on /testsweb/index.html and open in browser.
