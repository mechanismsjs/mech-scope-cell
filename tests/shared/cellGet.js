describe ("getting a cell value - cellGet", function() {

  beforeEach(function() {
    for (var key in m.cellWorkBook) {
      if (m.cellWorkBook.hasOwnProperty(key)) {
        delete m.cellWorkBook[key]; // slow but for tests ok
      }
    }
  });
  
  it ("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.cellGet();
    expect(mech).to.have.property('toString');
    expect(m).to.not.eql(undefined);
    expect(m.cell).to.not.eql(undefined);
    expect(m._).to.not.eql(undefined);
    expect(m._.CellGetF).to.not.eql(undefined);
    expect(mech.isMech).to.be.equal(true);
  });

  it ("should find a value in the book", function() {
    var mech = m.cellGet("B:5");
    var mech2 = m.cell("B:5",-23);

    expect(mech.id).to.equal("B:5");
    expect(mech.col).to.equal("B");
    expect(mech.row).to.equal(5);

    expect(mech.go).to.equal(-23);
    expect(mech.goNum).to.equal(-23);
    expect(mech.goStr).to.equal("-23");
    expect(mech.goArr).to.contain(-23);
    expect(mech.goBool).to.equal(false);

  });

  it ("should find a value in the book when that value is a mechanism", function() {
    var mech2 = m.cell("B:5",m.num(56));
    var mech = m.cellGet("B:5");

    expect(mech.go).to.equal(56);
    expect(mech.goNum).to.equal(56);
    expect(mech.goStr).to.equal("56");
    expect(mech.goArr).to.contain(56);
    expect(mech.goBool).to.equal(true);

  });


  it ("should return null when the value in a cell is undefined", function() {
    var mech2 = m.cell("B:5");
    var mech = m.cellGet("B:5");

    expect(mech.go).to.be.null;
    expect(mech.goNum).to.be.null;
    expect(mech.goStr).to.be.null;
    expect(mech.goArr[0]).to.be.null;
    expect(mech.goBool).to.equal(false);

  });


  it ("should return null when the value in a cell is null", function() {
    var mech2 = m.cell("B:5",null);
    var mech = m.cellGet("B:5");

    expect(mech.go).to.be.null;
    expect(mech.goNum).to.be.null;
    expect(mech.goStr).to.be.null;
    expect(mech.goArr[0]).to.be.null;
    expect(mech.goBool).to.equal(false);

  });

  it ("should return null when the cell id is null or undefined", function() {
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



});