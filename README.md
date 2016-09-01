[mech-home-link]: https://github.com/mechanisms/mech "Home repository for mechanisms"
[mech-scope-stack-home-link]: https://github.com/mechanismsjs/mech-scope-stack "Stack based scoping mechanisms."
[mech-emit-link]: https://github.com/mechanismsjs/mech-emit "Mechanisms for emitting data"


# mech-scope-cell

This library provides cell (spreadsheet) based [scoping](https://en.wikipedia.org/wiki/Scope_%28computer_science%29) mechanisms. It is consider core so directly added to the m (mechanisms) library.

A video on usage can be found [here](http://youtu.be/3gSiYtBEMjY) and gist [here](https://gist.github.com/erichosick/d036582d9b9b28a11e01).

Traditional [scoping](https://en.wikipedia.org/wiki/Scope_%28computer_science%29) mechanisms are stack based ([mech-scope-stack][mech-scope-stack-home-link]).

See [Mechanisms Home][mech-home-link] for more information and other libraries.

Supported Mechanisms:

* *[cell](#cell-mechanism)* - a cell whose value is uniquely identified by row, column and worksheet.
* *[cellGet](#cellget-mechanism)* - read a value from a cell.
* *[cellSet](#cellset-mechanism)* - set a value in a cell: overwriting an existing value or creating a new cell if one does not exist.
* *[cellRef](#cellref-mechanism)* - returns a reference to a cell.
* *[cellRm](#cellrm-mechanism)* - removes a cell from a workbook.
* *[workbook](#workbook-global)* - global workbook containing multiple worksheets.

## TODO

* Collision detection when creating a cell.

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
sp.cell("Sheet01:A:2",2);
var addF = m.add(sp.cellGet("A:1"), sp.cellGet("Sheet01:A:2"));
addF.go;
```

Values are in cells '*A:1*' and '*Sheet01:A:2*'. Scope is defined by cells.

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

## <a name="cell-mechanism"></a>CellF mechanism

A cell whose value is uniquely identified by column, row and worksheet.

**NOTE: A cell value can never be the undefined primitive.**  

* A cell can contain the null primitive.
* A cell can contain mechanisms that evaluate to undefined.

```javascript
var sp = require("mech-scope-cell");
sp.cell("A:1",4); // cell in '' work sheet, column A row 1 with a value of 4
sp.cell(); // cell in '' work sheet at column A row 0 with a value of undefined
sp.cell("WS1:BB:34"); // cell in 'WS1' sheet, column BB row 34
```

A cell automatically adds itself to the global workbook: **cellWorkBook**.

**WARNING**: The underlying workbook data structure may change. Directly accessing it is discouraged. It is encapsulated by the mechanisms in this library.

See cellRm mechanism to remove a cell

## <a name="cellget-mechanism"></a>CellGetF mechanism

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

## <a name="cellset-mechanism"></a>CellSetF mechanism

Sets the value of a cell: overwriting any existing value. A new cell is created if it does not exist.

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
sp.cellSet("A:5",goodEvening, true).go; // cell 'A:5' contains the value "Good evening!"
```

## <a name="cellref-mechanism"></a>CellRefF mechanism

Returns a reference to a cell.

```javascript
var sp = require("mech-scope-cell");
var newCell = sp.cell("B:3","Good day!");
sp.cellRef("B:3").go; // equals newCell
```

## <a name="cellrm-mechanism"></a>CellRmF mechanism

Removes a cell from the global workbook.

```javascript
var sp = require("mech-scope-cell");
sp.cell("B:3","Good day!");
sp.cellRm("B:3").go; // removes cell "B:3" and returns true
sp.cellRm("A:1").go; // no cell is removed and returns true
```

## <a name="workbook-global"></a>cellWorkBook Global

A global variable where all scoping is stored.

```javascript
m.cell("A:1",m.writeLn("Hello"));
m.cellWorkBook["A:1"].go; // writes hello to the console
```

It is better to access the cellWorkBook using mechanisms than directly as shown in the example. We reserve the right to change the underlying data structure.

# Setup

## Using In Your Projects

Change directory to your node project.

```
$ npm install --save mech-scope-cell
```

## Development

### Get Involved!

There are **a lot** of core mechanisms just waiting to be created. Many of them can be created in a few hours including in-depth tests. Clone [mech-library][mech-library-link] to get started!

### Setup

Install:
```
$ npm install
```

Continuous test:
```
$ gulp
```

Test:
```
$ gulp webtests
```

#### Test Server

Read documentation in gulpfile.js to see how to setup automated web testing.

```
$ gulp webserver
```

[mech-library-link]: https://github.com/mechanismsjs/mech-library "Clone to easily create new mechanism libraries"
