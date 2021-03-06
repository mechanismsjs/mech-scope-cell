describe("removing a cell - cellRm", function() {

  beforeEach(function() {
    for (var key in m.cellWorkBook) {
      if (m.cellWorkBook.hasOwnProperty(key)) {
        delete m.cellWorkBook[key]; // slow but for tests ok
      }
    }
  });

  it("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.cellRm();
    expect(mech).to.have.property('toString');
    expect(m.cell).to.not.eql(undefined);
    expect(m._.CellRmF).to.not.eql(undefined);
    expect(mech.isMech).to.be.equal(true);
  });

  it("should set _parDir of child mechanisms to parent", function() {
    // cellRm currently does not take a mechanism as a parameter
  });

  it("should remove a value from the book when go is called", function() {
    m.cell("A:1", "Hello");
    expect(m.cellWorkBook).to.have.property("A:1");
    var mech = m.cellRm("A:1");
    expect(mech.go).to.be.true; // successfully deleted
    expect(m.cellWorkBook).to.not.have.property("A:1");
  });

  it("should remove a value from the book when goNum is called", function() {
    m.cell("A:1", "Hello");
    expect(m.cellWorkBook).to.have.property("A:1");
    var mech = m.cellRm("A:1");
    expect(mech.goNum).to.be.equal(1); // successfully deleted
    expect(m.cellWorkBook).to.not.have.property("A:1");
  });

  it("should remove a value from the book when goStr is called", function() {
    m.cell("A:1", "Hello");
    expect(m.cellWorkBook).to.have.property("A:1");
    var mech = m.cellRm("A:1");
    expect(mech.goStr).to.be.equal("true"); // successfully deleted
    expect(m.cellWorkBook).to.not.have.property("A:1");
  });

  it("should remove a value from the book when goArr is called", function() {
    m.cell("A:1", "Hello");
    expect(m.cellWorkBook).to.have.property("A:1");
    var mech = m.cellRm("A:1");
    expect(mech.goArr).to.contain(true); // successfully deleted
    expect(m.cellWorkBook).to.not.have.property("A:1");
  });

  it("should remove a value from the book when goBool is called", function() {
    m.cell("A:1", "Hello");
    expect(m.cellWorkBook).to.have.property("A:1");
    var mech = m.cellRm("A:1");
    expect(mech.goBool).to.be.true; // successfully deleted
    expect(m.cellWorkBook).to.not.have.property("A:1");
  });


  it("should return the correct result when no cell id is given", function() {
    m.cell(":A:1", "Hello");
    var mech = m.cellRm();
    expect(mech.go).to.be.true;
    expect(mech.goNum).to.equal(1);
    expect(mech.goStr).to.equal("true");
    expect(mech.goArr).to.contain(true);
    expect(mech.goBool).to.be.true;
    expect(m.cellWorkBook).to.have.property(":A:1");
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
    var mech = m.cellRm(true);
    m.cell(true, 10);
    expect(mech.id).to.equal(true);
    expect(mech.col).to.be.undefined;
    expect(mech.row).to.be.NaN;

    var mech2 = m.cellRm(false);
    m.cell(false, 12);
    expect(mech2.id).to.equal(false);
    expect(mech2.col).to.be.undefined;
    expect(mech2.row).to.be.NaN;
  });

  it("should allow for cells that are 'named' numerically", function() {
    var mech = m.cellRm(5);
    expect(mech.id).to.equal(5);
    expect(mech.col).to.be.undefined;
    expect(mech.row).to.be.NaN;
  });

});
