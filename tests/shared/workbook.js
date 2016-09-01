describe("testing workbook", function() {
  it("should have a global workbook that is never overwritten", function() {
    expect(m.cellWorkBook).to.be.an('array');
  });
});
