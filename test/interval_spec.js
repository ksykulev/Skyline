describe("interval",function(){
  it("should store the x1 x2 h of a given interval",function(){
    var interval = new skyline.Interval(1,2,3);
    expect(interval.x1).toEqual(1);
    expect(interval.x2).toEqual(2);
    expect(interval.h).toEqual(3);
  });
  describe("area",function(){
    it("should find the correct area of the interval",function(){
      var interval = new skyline.Interval(1,2,3);
      expect(interval.area()).toEqual(3);
    });
  });
  describe("equals",function(){
    it("should return true if x1 x2 and h are all equal",function(){
      expect((new skyline.Interval(1,2,3)).equals(new skyline.Interval(1,2,3))).toBeTruthy();
    });
    it("should return false otherwise",function(){
      expect((new skyline.Interval(1,2,3)).equals(new skyline.Interval(1,1,1))).toBeFalsy();
    });
  });
  describe("compareTo",function(){
    it("should return 0 if the value is contained in the interval range",function(){
      expect((new skyline.Interval(1,5,3)).compareTo(3)).toEqual(0);
    });
    it("should return 0 if the value is equal to the lowest value", function(){
      expect((new skyline.Interval(1,5,3)).compareTo(1)).toEqual(0);
    });
    it("should return 0 if the value is equal to the highest value", function(){
      expect((new skyline.Interval(1,5,3)).compareTo(5)).toEqual(0);
    });
    it("should return -1 if the range is larger than the value",function(){
      expect((new skyline.Interval(1,5,3)).compareTo(0)).toEqual(-1);
    });
    it("should return 1 if the range is less than the value",function(){
      expect((new skyline.Interval(1,5,3)).compareTo(7)).toEqual(1);
    });
  });
});