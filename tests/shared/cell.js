describe("creating a cell - cell", function() {

  beforeEach(function() {
    for (var key in m.cellWorkBook) {
      if (m.cellWorkBook.hasOwnProperty(key)) {
        delete m.cellWorkBook[key]; // slow but for tests ok
      }
    }
  });

  it("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.cell();
    expect(mech).to.have.property('toString');
    expect(m.cell).to.not.eql(undefined);
    expect(m._.CellF).to.not.eql(undefined);
    expect(mech.isMech).to.be.equal(true);
  });

  it("should have a global workbook", function() {
    expect(m.cellWorkBook).to.be.an('array');
  });

  it("should set _parDir of child mechanisms to parent", function() {
    var mech1 = m.num(1);
    var mech2 = m.cell("A:1", mech1);
    expect(mech1._parDir).to.equal(mech2);
  });

  it("invalid initialization defaults to the '0' row and is added to the workbook", function() {
    var mech = m.cell();
    expect(mech.sheet).to.equal("");
    expect(mech.col).to.equal("A");
    expect(mech.row).to.equal(0);
    expect(m.cellWorkBook["A:0"]).to.equal(mech);
    expect(mech.v).to.be.null;
    expect(mech.v).to.not.be.undefined;

    var mech2 = m.cell(null);
    expect(mech2.col).to.equal("A");
    expect(mech2.row).to.equal(0);
    expect(m.cellWorkBook['A:0']).to.equal(mech2);
  });

  it("can initialize a cell using col row value: no sheet", function() {
    var mech = m.cell("A:1");
    expect(mech.id).to.equal("A:1");
    expect(mech.col).to.equal("A");
    expect(mech.row).to.equal(1);
  });

  it("can hold a primitive value", function() {
    var mech = m.cell("JJ:1000", 5);
    expect(mech.sheet).to.equal("");
    expect(mech.col).to.equal("JJ");
    expect(mech.row).to.equal(1000);
    expect(mech.go).to.equal(5);
    expect(mech.goNum).to.equal(5);
    expect(mech.goStr).to.equal("5");
    expect(mech.goArr).to.contain(5);
    expect(mech.goBool).to.equal(true);


    var mech2 = m.cell(":LB:21", "Hello");
    expect(mech.sheet).to.equal("");
    expect(mech2.col).to.equal("LB");
    expect(mech2.row).to.equal(21);
    expect(mech2.go).to.equal("Hello");
    expect(mech2.goNum).to.eql(NaN);
    expect(mech2.goStr).to.equal("Hello");
    expect(mech2.goArr).to.contain("Hello");
    expect(mech2.goBool).to.equal(false);

    var mech3 = m.cell("LB:22", false);
    expect(mech3.col).to.equal("LB");
    expect(mech3.row).to.equal(22);
    expect(mech3.go).to.equal(false);
    expect(mech3.goNum).to.eql(0);
    expect(mech3.goStr).to.equal("false");
    expect(mech3.goArr).to.contain(false);
    expect(mech3.goBool).to.equal(false);

  });

  it("can hold a mechanism", function() {
    var mech = m.cell("B:5", m.num(56));
    expect(mech.go).to.equal(56);
    expect(mech.goNum).to.equal(56);
    expect(mech.goStr).to.equal("56");
    expect(mech.goArr).to.contain(56);
    expect(mech.goBool).to.equal(true);
  });

  it("can place a cell in a sheet", function() {
    var mech = m.cell("Sheet01:QQ:45", m.num(-85.5));
    expect(mech.col).to.equal("QQ");
    expect(mech.row).to.equal(45);
    expect(mech.sheet).to.equal("Sheet01");
    expect(mech.go).to.equal(-85.5);
    expect(mech.goNum).to.equal(-85.5);
    expect(mech.goStr).to.equal("-85.5");
    expect(mech.goArr).to.contain(-85.5);
    expect(mech.goBool).to.equal(false);
  });


});
