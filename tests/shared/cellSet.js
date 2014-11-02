describe ("setting a cell value - cellSet", function() {

  beforeEach(function() {
    for (var key in m.cellWorkBook) {
      if (m.cellWorkBook.hasOwnProperty(key)) {
        delete m.cellWorkBook[key]; // slow but for tests ok
      }
    }
  });

  it ("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.cellSet();
    expect(mech).to.have.property('toString');
    expect(m).to.not.eql(undefined);
    expect(m.cell).to.not.eql(undefined);
    expect(m._).to.not.eql(undefined);
    expect(m._.CellSetF).to.not.eql(undefined);
    expect(mech.isMech).to.be.equal(true);
  });

  it ("should set a value in the book", function() {
    var mech = m.cell("B:5",-23);
    var mech2 = m.cellSet("B:5","Ola");
    var mech3 = m.cellGet("B:5");

    expect(mech3.go).to.equal(-23);
    expect(mech3.goNum).to.equal(-23);
    expect(mech3.goStr).to.equal("-23");
    expect(mech3.goArr).to.contain(-23);
    expect(mech3.goBool).to.equal(false);

    expect(mech2.id).to.equal("B:5");
    expect(mech2.col).to.equal("B");
    expect(mech2.row).to.equal(5);

    mech2.go;

    expect(mech3.go).to.equal("Ola");
    expect(mech3.goNum).to.eql(NaN);
    expect(mech3.goStr).to.equal("Ola");
    expect(mech3.goArr).to.contain("Ola");
    expect(mech3.goBool).to.equal(false);
  });

  it ("should set a value in the book when cell contains a mechanism", function() {
    var mech4 = m.num(286);
    var mech = m.cell("B:6",mech4);
    var mech2 = m.cellSet("B:6",386);
    var mech3 = m.cellGet("B:6");

    expect(mech3.go).to.equal(286);
    mech2.go;
    expect(mech4.go).to.equal(386);
    expect(mech4.goNum).to.eql(386);
    expect(mech4.goStr).to.equal("386");
    expect(mech4.goArr).to.contain(386);
    expect(mech4.goBool).to.equal(true);
  });

  it ("should set a ref or value in the book when source is a mechanism.", function() {
    var mech4 = m.num(104);
    var mech = m.cell("B:7",223);
    var mech2 = m.cellSet("B:7",mech4); // by ref or value
    var mech3 = m.cellGet("B:7");

    expect(mech3.go).to.equal(223);
    mech2.go;
    expect(mech3.go).to.equal(104);
    expect(mech3.goNum).to.eql(104);
    expect(mech3.goStr).to.equal("104");
    expect(mech3.goArr).to.contain(104);
    expect(mech3.goBool).to.equal(true);
  });

  it ("should ONLY set a value in the book when source is a mechanism and byVal is true", function() {
    var mech4 = m.num(498);
    var mech = m.cell("B:8",223);
    var mech2 = m.cellSet("B:8",mech4,true); // by value
    var mech3 = m.cellGet("B:8");

    expect(mech3.go).to.equal(223);
    mech2.go;
    expect(mech._v).to.not.equal(mech4);
    expect(mech3.go).to.equal(498);
    expect(mech3.goNum).to.eql(498);
    expect(mech3.goStr).to.equal("498");
    expect(mech3.goArr).to.contain(498);
    expect(mech3.goBool).to.equal(true);
  });

  it ("should create a cell then set it if one does not exist alread", function() {
    var mech = m.cellSet("B:9", 21);
    (expect(mech.go).to.equal(21));
  });

  it ("should set a null or undefined value as null or undefined", function() {
    var mech = m.cellSet("B:10");
    expect(mech.go).to.be.undefined;

    var mech2 = m.cellSet("B:11", undefined);
    expect(mech2.go).to.be.undefined;

    var mech3 = m.cellSet("B:12", null);
    expect(mech3.go).to.be.null;
  });


  it ("should create and set the right value", function() {
    var mech = m.cellSet("B:13",2);
    expect(mech.go).to.equal(2);
  });

});