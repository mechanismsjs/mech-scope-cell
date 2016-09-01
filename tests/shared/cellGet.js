describe("getting a cell value - cellGet", function() {

  beforeEach(function() {
    for (var key in m.cellWorkBook) {
      if (m.cellWorkBook.hasOwnProperty(key)) {
        delete m.cellWorkBook[key]; // slow but for tests ok
      }
    }
  });

  it("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.cellGet();
    expect(mech).to.have.property('toString');
    expect(m.cell).to.not.eql(undefined);
    expect(m._.CellGetF).to.not.eql(undefined);
    expect(mech.isMech).to.be.equal(true);
  });

  it("should set _parDir of child mechanisms to parent", function() {
    // cellGet currently does not take a mechanism as a parameter
  });


  it("should find a value in the book", function() {
    var mech = m.cellGet("B:5");
    var mech2 = m.cell("B:5", -23);

    expect(mech.id).to.equal("B:5");
    expect(mech.col).to.equal("B");
    expect(mech.row).to.equal(5);

    expect(mech.go).to.equal(-23);
    expect(mech.goNum).to.equal(-23);
    expect(mech.goStr).to.equal("-23");
    expect(mech.goArr).to.contain(-23);
    expect(mech.goBool).to.equal(false);
  });


  it("should find an array value in the book", function() {
    m.cell("B:5", [9, 12]);
    var mech = m.cellGet("B:5");

    expect(mech.go).to.eql([9, 12]);
    expect(mech.goNum).to.be.NaN;
    expect(mech.goStr).to.equal("9,12");
    expect(mech.goArr).to.eql([9, 12]);
    expect(mech.goBool).to.equal(false);
  });

  it("should find a value in the book when that value is a mechanism", function() {
    var mech2 = m.cell("B:5", m.num(56));
    var mech = m.cellGet("B:5");

    expect(mech.go).to.equal(56);
    expect(mech.goNum).to.equal(56);
    expect(mech.goStr).to.equal("56");
    expect(mech.goArr).to.contain(56);
    expect(mech.goBool).to.equal(true);

  });


  it("should return null when the value in a cell is undefined", function() {
    var mech2 = m.cell("B:5");
    var mech = m.cellGet("B:5");

    expect(mech.go).to.be.null;
    expect(mech.goNum).to.be.null;
    expect(mech.goStr).to.be.null;
    expect(mech.goArr[0]).to.be.null;
    expect(mech.goBool).to.equal(false);

  });


  it("should return null when the value in a cell is null", function() {
    var mech2 = m.cell("B:5", null);
    var mech = m.cellGet("B:5");

    expect(mech.go).to.be.null;
    expect(mech.goNum).to.be.null;
    expect(mech.goStr).to.be.null;
    expect(mech.goArr[0]).to.be.null;
    expect(mech.goBool).to.equal(false);

  });

  it("should return null when the cell id is null or undefined", function() {
    var mech = m.cellGet();

    expect(mech.go).to.be.undefined;
    expect(mech.goNum).to.be.undefined;
    expect(mech.goStr).to.be.undefined;
    expect(mech.goArr[0]).to.be.undefined;
    expect(mech.goBool).to.equal(false);

    var mech2 = m.cellGet(null);
    expect(mech2.go).to.be.undefined;
    expect(mech2.goNum).to.be.undefined;
    expect(mech2.goStr).to.be.undefined;
    expect(mech2.goArr[0]).to.be.undefined;
    expect(mech2.goBool).to.equal(false);

  });

  it("should find a value in the book using a mechanism as the cell", function() {
    var mech = m.cellGet(m.str("B:5"));
    var mech2 = m.cell("B:5", -23);

    expect(mech.id).to.equal("B:5");
    expect(mech.col).to.equal("B");
    expect(mech.row).to.equal(5);
    expect(mech.go).to.equal(-23);
    expect(mech.goNum).to.equal(-23);
    expect(mech.goStr).to.equal("-23");
    expect(mech.goArr).to.contain(-23);
    expect(mech.goBool).to.equal(false);
  });

  it("should allow for cells that are 'named' numerically", function() {
    var mech = m.cellGet(5);
    m.cell(5, 10);
    expect(mech.id).to.equal(5);
    expect(mech.col).to.be.undefined;
    expect(mech.row).to.be.NaN;
    expect(mech.go).to.equal(10);
    expect(mech.goNum).to.equal(10);
    expect(mech.goStr).to.equal("10");
    expect(mech.goArr).to.contain(10);
    expect(mech.goBool).to.equal(true);
  });

  it("should allow for cells that are 'named' with booleans", function() {
    var mech = m.cellGet(true);
    m.cell(true, 10);
    expect(mech.id).to.equal(true);
    expect(mech.col).to.be.undefined;
    expect(mech.row).to.be.NaN;
    expect(mech.go).to.equal(10);
    expect(mech.goNum).to.equal(10);
    expect(mech.goStr).to.equal("10");
    expect(mech.goArr).to.contain(10);
    expect(mech.goBool).to.equal(true);

    var mech2 = m.cellGet(false);
    m.cell(false, 12);
    expect(mech2.id).to.equal(false);
    expect(mech2.col).to.be.undefined;
    expect(mech2.row).to.be.NaN;
    expect(mech2.go).to.equal(12);
    expect(mech2.goNum).to.equal(12);
    expect(mech2.goStr).to.equal("12");
    expect(mech2.goArr).to.contain(12);
    expect(mech2.goBool).to.equal(true);
  });


  it("should still work with incomplete cell values.", function() {
    var mech = m.cellGet(m.str("B"));
    m.cell("B", -23);

    expect(mech.id).to.equal("B");
    expect(mech.col).to.equal("B");
    expect(mech.row).to.be.NaN;
    expect(mech.go).to.equal(-23);
    expect(mech.goNum).to.equal(-23);
    expect(mech.goStr).to.equal("-23");
    expect(mech.goArr).to.contain(-23);
    expect(mech.goBool).to.equal(false);
  });

  it("can get a cell in a sheet", function() {
    var mech = m.cellGet("Sheet01:QQ:45");
    m.cell("Sheet01:QQ:45", m.num(-85.5));
    expect(mech.id).to.equal("Sheet01:QQ:45");
    expect(mech.sheet).to.equal("Sheet01");
    expect(mech.col).to.equal("QQ");
    expect(mech.row).to.equal(45);
    expect(mech.go).to.equal(-85.5);
    expect(mech.goNum).to.equal(-85.5);
    expect(mech.goStr).to.equal("-85.5");
    expect(mech.goArr).to.contain(-85.5);
    expect(mech.goBool).to.equal(false);
  });


});
