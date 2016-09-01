describe("getting a reference to a cell - cellRef", function() {

  beforeEach(function() {
    for (var key in m.cellWorkBook) {
      if (m.cellWorkBook.hasOwnProperty(key)) {
        delete m.cellWorkBook[key]; // slow but for tests ok
      }
    }
  });

  it("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.cellRef();
    expect(mech).to.have.property('toString');
    expect(m.cell).to.not.eql(undefined);
    expect(m._.CellRefF).to.not.eql(undefined);
    expect(mech.isMech).to.be.equal(true);
  });

  it("should set _parDir of child mechanisms to parent", function() {
    // cellRef currently does not take a mechanism as a parameter
  });

  it("should return a cell from the book", function() {
    var newCell = m.cell(":B:5", -23); // create a cell
    var newCell2 = m.cell("B:3", 22);
    var mech = m.cellRef(":B:5");

    expect(mech.id).to.equal(":B:5");
    expect(mech.col).to.equal("B");
    expect(mech.row).to.equal(5);

    expect(mech.go).to.equal(newCell);
    expect(mech.go).to.not.equal(newCell2);
  });

  it("should return undefined when a cell does not exist or an invalid cell is provided", function() {
    var mech = m.cellRef("B:2");
    expect(mech.go).to.be.undefined;

    var mech2 = m.cellRef();
    expect(mech2.go).to.be.undefined;

    var mech3 = m.cellRef(null);
    expect(mech3.go).to.be.undefined;
  });

  it("should return a cell in a sheet", function() {
    m.cell("Sheet01:AA:2", "hello");
    var mech = m.cellRef("Sheet01:AA:2");
    expect(mech.id).to.equal("Sheet01:AA:2");
    expect(mech.sheet).to.equal("Sheet01");
    expect(mech.col).to.equal("AA");
    expect(mech.row).to.equal(2);
  });

  it("should allow for cells that are 'named' with booleans", function() {
    var mech = m.cellRef(true);
    m.cell(true, 10);
    expect(mech.id).to.equal(true);
    expect(mech.col).to.be.undefined;
    expect(mech.row).to.be.NaN;

    var mech2 = m.cellGet(false);
    m.cell(false, 12);
    expect(mech2.id).to.equal(false);
    expect(mech2.col).to.be.undefined;
    expect(mech2.row).to.be.NaN;
  });

  it("should allow for cells that are 'named' numerically", function() {
    var mech = m.cellRef(5);
    expect(mech.id).to.equal(5);
    expect(mech.col).to.be.undefined;
    expect(mech.row).to.be.NaN;
  });

});
