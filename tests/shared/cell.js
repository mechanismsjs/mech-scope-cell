describe ("testing cell", function() {
  it ("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.cell();
    expect(mech).to.have.property('toString');
    expect(m).to.not.eql(undefined);
    expect(m.cell).to.not.eql(undefined);
    expect(m._).to.not.eql(undefined);
    expect(m._.CellF).to.not.eql(undefined);
    expect(mech.isMech).to.be.equal(true);
  });

  it ("should have a global workbook that is never overwritten", function() {
    expect(m.cellWorkBook).to.be.an('array');
  });

  it ("invalid initialization defaults to the '0' row and is added to the workbook", function() {
    var mech = m.cell();
    expect(mech.col).to.equal("A");
    expect(mech.row).to.equal(0);
    expect(m.cellWorkBook['A:0']).to.equal(mech);
  });

  it ("can initialize a cell using col row value: no sheet", function() {
    var mech = m.cell("A:1");
    expect(mech.id).to.equal("A:1");
    expect(mech.col).to.equal("A");
    expect(mech.row).to.equal(1);
  });

  it ("can hold a primitive value", function() {
    var mech = m.cell("JJ:1000", 5);
    expect(mech.col).to.equal("JJ");
    expect(mech.row).to.equal(1000);
    expect(mech.go).to.equal(5);
    expect(mech.goNum).to.equal(5);
    expect(mech.goStr).to.equal("5");
    expect(mech.goArr).to.contain(5);
    expect(mech.goBool).to.equal(true);


    var mech2 = m.cell("LB:21", "Hello");
    expect(mech2.col).to.equal("LB");
    expect(mech2.row).to.equal(21);
    expect(mech2.go).to.equal("Hello");
    expect(mech2.goNum).to.eql(NaN);
    expect(mech2.goStr).to.equal("Hello");
    expect(mech2.goArr).to.contain("Hello");
    expect(mech2.goBool).to.equal(false);

  });

  it ("can hold a mechanism", function() {
    var mech = m.cell("B:5", m.num(56));
    expect(mech.go).to.equal(56);
    expect(mech.goNum).to.equal(56);
    expect(mech.goStr).to.equal("56");
    expect(mech.goArr).to.contain(56);
    expect(mech.goBool).to.equal(true);
  });

});
