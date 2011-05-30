describe("array_spec", function(){
  function compare(value1, value2){
    if(value1 == value2) return 0;
    if(value1 > value2) return 1;
    if(value1 < value2) return -1;
  }
  describe("binarySearch", function(){
    describe("no elements in the array",function(){
      it("should return 0 if there are no elements in the array", function(){
        var array = [];
        expect(skyline.utils.array.binarySearch(7,array,compare)).toEqual(0);
      });
    });
    describe("odd lengthed array",function(){
      it("should return index of found element", function(){
        var array = [1,4,5,7,10];
        expect(skyline.utils.array.binarySearch(7,array,compare)).toEqual(3);
        expect(skyline.utils.array.binarySearch(4,array,compare)).toEqual(1);
        expect(skyline.utils.array.binarySearch(5,array,compare)).toEqual(2);
        expect(skyline.utils.array.binarySearch(10,array,compare)).toEqual(4);
        expect(skyline.utils.array.binarySearch(1,array,compare)).toEqual(0);
      });
      it("should return the -index for where the value would be inserted where value > a[-index-1] && value < a[-index+1]", function(){
        var array = [1,4,5,7,10];
        expect(skyline.utils.array.binarySearch(8,array,compare)).toEqual(-4);
      });
      it("should return the 0th index when the value is smaller than any value in the array", function(){
        var array = [1,4,5,7,10];
        expect(skyline.utils.array.binarySearch(0,array,compare)).toEqual(0);
      });
    });
    
    describe("even lengthed array",function(){
      it("should return index of found element", function(){
        var array = [4,5,7,10];
        expect(skyline.utils.array.binarySearch(7,array,compare)).toEqual(2);
        expect(skyline.utils.array.binarySearch(10,array,compare)).toEqual(3);
        expect(skyline.utils.array.binarySearch(4,array,compare)).toEqual(0);
        expect(skyline.utils.array.binarySearch(5,array,compare)).toEqual(1);
      });
      it("should return the -index for where the value would be inserted where value > a[-index-1] && value < a[-index+1]", function(){
        var array = [4,5,7,10];
        expect(skyline.utils.array.binarySearch(8,array,compare)).toEqual(-3);
      });
      it("should return the 0th index when the value is smaller than any value in the array", function(){
        var array = [4,5,7,10];
        expect(skyline.utils.array.binarySearch(0,array,compare)).toEqual(0);
      });
    });
    
    describe("invokeFromObject",function(){
      it("should return index of found element",function(){
        var array = [new skyline.Interval(2,5,3), new skyline.Interval(7,10,3)];
        expect(skyline.utils.array.binarySearch(4,array)).toEqual(0);
      });
      it("should return the -index for where the value would be inserted where value > a[-index-1] && value < a[-index+1]", function(){
        var array = [new skyline.Interval(2,5,3), new skyline.Interval(7,10,3)];
        expect(skyline.utils.array.binarySearch(11,array,null)).toEqual(-2);
      });
      it("should return the 0th index when the value is smaller than any value in the array", function(){
        var array = [new skyline.Interval(2,5,3), new skyline.Interval(7,10,3)];
        expect(skyline.utils.array.binarySearch(1,array)).toEqual(0);
      });
    });
  });
  
  
  
  xdescribe("insertIndexFor", function(){
    describe("no elements in the array",function(){
      it("should return 0 if there are no elements in the array", function(){
        var array = [];
        expect(skyline.utils.array.insertIndexFor(7,array,compare)).toEqual(0);
      });
    });
    describe("odd lengthed array",function(){
      it("should return index of found element + 1", function(){
        var array = [1,4,5,7,10];
        expect(skyline.utils.array.insertIndexFor(7,array,compare)).toEqual(4);
        expect(skyline.utils.array.insertIndexFor(4,array,compare)).toEqual(2);
        expect(skyline.utils.array.insertIndexFor(5,array,compare)).toEqual(3);
        expect(skyline.utils.array.insertIndexFor(10,array,compare)).toEqual(5);
        expect(skyline.utils.array.insertIndexFor(1,array,compare)).toEqual(1);
      });
      it("should return the index + 1 for the position where value > a[index-1] && value < a[index+1]", function(){
        var array = [1,4,5,7,10];
        expect(skyline.utils.array.insertIndexFor(8,array,compare)).toEqual(4);
      });
      it("should return the 0th index when the value is smaller than any value in the array", function(){
        var array = [1,4,5,7,10];
        expect(skyline.utils.array.insertIndexFor(0,array,compare)).toEqual(0);
      });
    });
    
    describe("even lengthed array",function(){
      it("should return index of found element + 1", function(){
        var array = [4,5,7,10];
        expect(skyline.utils.array.insertIndexFor(7,array,compare)).toEqual(3);
        expect(skyline.utils.array.insertIndexFor(10,array,compare)).toEqual(4);
        expect(skyline.utils.array.insertIndexFor(4,array,compare)).toEqual(1);
        expect(skyline.utils.array.insertIndexFor(5,array,compare)).toEqual(2);
      });
      it("should return the index + 1 for the position where value > a[index-1] && value < a[index+1]", function(){
        var array = [4,5,7,10];
        expect(skyline.utils.array.insertIndexFor(8,array,compare)).toEqual(3);
      });
      it("should return the 0th index when the value is smaller than any value in the array", function(){
        var array = [4,5,7,10];
        expect(skyline.utils.array.insertIndexFor(0,array,compare)).toEqual(0);
      });
    });
  });

  xdescribe("insertSorted",function(){
    it("should insert the given value into the sorted position in the array",function(){
      var array = [4,5,7,10];
      skyline.utils.array.insertSorted(8,array,compare);
      expect(array).toEqual([4,5,7,8,10]);
    });
    it("should insert the first value into the array",function(){
      var array = [];
      skyline.utils.array.insertSorted(8,array,compare);
      expect(array).toEqual([8]);
    });
    it("should insert a duplicate value into the array",function(){
      var array = [8];
      skyline.utils.array.insertSorted(8,array,compare);
      expect(array).toEqual([8,8]);
    });
  });
});