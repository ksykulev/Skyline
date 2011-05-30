describe("skyline", function(){
  describe("findArea", function(){
    it("should return an area of 0 when there are no buildings",function(){
      var buildings = [];
      expect(skyline.findArea(buildings)).toEqual(0);
    });
    it("should return an area of 178",function(){
      var buildings = [[1,5,10],[4,7,9],
                       [10,15,5],[11,20,10],[13,19,7],[20,25,5]];
      expect(skyline.findArea(buildings)).toEqual(178);  
    });
    it("should return an area of 227",function(){
      var buildings = [[1,4,5],[2,3,7],
                       [10,12,5], [10,20,10],[18,20,12],
                       [21,25,10],[22,30,12],[24,27,5]];
      expect(skyline.findArea(buildings)).toEqual(227);
    });
    it("should return an area of 105",function(){
      var buildings = [[1,5,2],[5,10,5],[5,10,10],
                       [11,14,2],[12,13,5],
                       [16,22,2],[16,18,5],[20,22,1],
                       [24,34,2],[26,30,1]];
      expect(skyline.findArea(buildings)).toEqual(105);
    });
  });
  describe("build", function(){
    beforeEach(function() {
      this.addMatchers({
        toEqualIntervals: function(expected) {
          var expectedLength = expected.length,
              actualLength = this.actual.length;
          if(expectedLength != actualLength){
            //same number of intervals
            return false;
          }
          for(var i = 0; i < expectedLength; i++){
            if(!expected[i].equals(this.actual[i])){
              //intervals are equal
              return false;
            }
          }
          return true; 
        }
      });
    });
    it("should build 1 interval with one building", function(){
      var buildings = [[1,5,10]];
      var intervals = skyline.build(buildings);
      var expectedIntervals = [new skyline.Interval(1,5,10)];
      expect(intervals).toEqualIntervals(expectedIntervals);
    });
    it("should not add a building with 0 width", function(){
      var buildings = [[5,5,10],[1,5,10]];
      var intervals = skyline.build(buildings);
      var expectedIntervals = [new skyline.Interval(1,5,10)];
      expect(intervals).toEqualIntervals(expectedIntervals);
    });
    it("should build 2 intervals with no overlap", function(){
      var buildings = [[1,5,10],[6,10,10]];
      var intervals = skyline.build(buildings);
      var expectedIntervals = [new skyline.Interval(1,5,10), new skyline.Interval(6,10,10)];
      expect(intervals).toEqualIntervals(expectedIntervals);
    });
    it("should build 3 intervals with one building edge contained in an interval", function(){
      var buildings = [[1,5,10],[4,7,9]];
      var intervals = skyline.build(buildings);
      var expectedIntervals = [new skyline.Interval(1,4,10), new skyline.Interval(4,5,10), new skyline.Interval(5,7,9)];
      expect(intervals).toEqualIntervals(expectedIntervals);      
    });
    it("should split 2 intervals into 4 when a building is contained in two distinct intervals", function(){
      var buildings = [[10,15,5],[11,20,10],[13,19,8]];
      var intervals = skyline.build(buildings);
      var expectedIntervals = [new skyline.Interval(10,11,5), new skyline.Interval(11,13,10),
                              new skyline.Interval(13,15,10), new skyline.Interval(15,19,10),
                              new skyline.Interval(19,20,10)];
      expect(intervals).toEqualIntervals(expectedIntervals);
    });
    it("should split 1 interval into 3 when a building is contained in one interval",function(){
      var buildings = [[1,7,5],[2,5,10]];
      var intervals = skyline.build(buildings);
      var expectedIntervals = [new skyline.Interval(1,2,5),new skyline.Interval(2,5,10),
                              new skyline.Interval(5,7,5)];
      expect(intervals).toEqualIntervals(expectedIntervals);
    });

    it("should split 1 interval into 2 when a building is contained in one interval but starts on the same point",function(){
      var buildings = [[1,7,5],[1,5,10]];
      var intervals = skyline.build(buildings);
      var expectedIntervals = [new skyline.Interval(1,5,10),new skyline.Interval(5,7,5)];
      expect(intervals).toEqualIntervals(expectedIntervals);
    });
    it("should split 1 interval into 2 when a building is contained in one interval but ends on the same point",function(){
      var buildings = [[1,7,5],[5,7,10]];
      var intervals = skyline.build(buildings);
      var expectedIntervals = [new skyline.Interval(1,5,5),new skyline.Interval(5,7,10)];
      expect(intervals).toEqualIntervals(expectedIntervals);
    });
    it("should not add the same interval twice",function(){
      var buildings = [[1,7,5],[1,7,10]];
      var intervals = skyline.build(buildings);
      var expectedIntervals = [new skyline.Interval(1,7,10)];
      expect(intervals).toEqualIntervals(expectedIntervals);
    });
    it("should correctly calculate height of completely overlapping intervals",function(){
      var buildings = [[0,1,15],[1,7,5],[1,7,10]];
      var intervals = skyline.build(buildings);
      var expectedIntervals = [new skyline.Interval(0,1,15),new skyline.Interval(1,7,10)];
      expect(intervals).toEqualIntervals(expectedIntervals);
    });
    it("should correctly calculate an akward overlapping interval",function(){
      var buildings = [[1,4,5],[10,12,5],[10,20,10],[18,20,12]];
      var intervals = skyline.build(buildings);
      var expectedIntervals = [new skyline.Interval(1,4,5),
                               new skyline.Interval(10,12,10),
                               new skyline.Interval(12,18,10),
                               new skyline.Interval(18,20,12)];
      expect(intervals).toEqualIntervals(expectedIntervals);
    });
  });
});