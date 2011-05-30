(function(){
  skyline.build = function(buildings){
    var result = [],
        numBuildings = buildings.length;
    for(var i = 0; i < numBuildings; i++){
      var building = buildings[i];
      var x1InsertIndex = skyline.utils.array.binarySearch(building[0],result);
      var x2InsertIndex = skyline.utils.array.binarySearch(building[1],result);
      if(i == 0){
        //first building
        result[0] = new skyline.Interval(building[0],building[1],building[2]);
      } else if(x1InsertIndex < 0 && x2InsertIndex < 0){
        //no overlap
        result.splice(-x2InsertIndex, 0, new skyline.Interval(building[0],building[1],building[2]));
      } else if(x1InsertIndex >= 0 && x2InsertIndex < 0){
        //single edge overlap
        var splitInterval = result[x1InsertIndex];
        var i1 = new skyline.Interval(splitInterval.x1,building[0],splitInterval.h);
        var i2 = new skyline.Interval(building[0],splitInterval.x2,Math.max(splitInterval.h, building[2]));
        var i3 = new skyline.Interval(splitInterval.x2,building[1],building[2]);
        if(i1.x1 === i1.x2){
          //get rid of leading 0 area intervals
          result[x1InsertIndex] = i2;
          result.splice(x1InsertIndex + 1, 0, i3);
        } else if(i2.x1 === i2.x2){
          //get rid of 0 area intervals caused by touching buildings
          result[x1InsertIndex] = i1;
          result.splice(x1InsertIndex + 1, 0, i3);
        } else {
          result[x1InsertIndex] = i1;
          result.splice(x1InsertIndex + 1, 0, i2);
          result.splice(x1InsertIndex + 2, 0, i3);
        }
      } else if(x1InsertIndex >= 0 && x2InsertIndex >= 0 && x1InsertIndex == x2InsertIndex){
        //multisplit single building
        var splitInterval = result[x1InsertIndex];
        var i1 = new skyline.Interval(splitInterval.x1,building[0],splitInterval.h);
        var i2 = new skyline.Interval(building[0],building[1],Math.max(splitInterval.h, building[2]));
        var i3 = new skyline.Interval(building[1],splitInterval.x2,splitInterval.h);
        if(i1.x1 === i1.x2 && i3.x1 === i3.x2){
          //building ontop of building
          result[x1InsertIndex] = i2;  
        } else if(i1.x1 === i1.x2){
          //get rid of leading 0 area intervals
          result[x1InsertIndex] = i2;
          result.splice(x1InsertIndex + 1, 0, i3);
        } else if(i3.x1 === i3.x2){ 
          //get rid of trailing 0 area intervals
          result[x1InsertIndex] = i1;
          result.splice(x1InsertIndex + 1, 0, i2);        
        } else {
          result[x1InsertIndex] = i1;
          result.splice(x1InsertIndex + 1, 0, i2);
          result.splice(x1InsertIndex + 2, 0, i3);
        }
      } else if(x1InsertIndex >= 0 && x2InsertIndex > 0){
        //multisplit multibuildings
        var splitInterval1 = result[x1InsertIndex];
        var i11 = new skyline.Interval(splitInterval1.x1,building[0],splitInterval1.h);
        var i12 = new skyline.Interval(building[0],splitInterval1.x2,Math.max(splitInterval1.h, building[2]));
        result[x1InsertIndex] = i11;
        
        var splitInterval2 = result[x2InsertIndex];
        var i21 = new skyline.Interval(splitInterval2.x1,building[1],splitInterval1.h);
        var i22 = new skyline.Interval(building[1],splitInterval2.x2,Math.max(splitInterval2.h, building[2]));
        result[x2InsertIndex] = i21;

        result.splice(x1InsertIndex + 1, 0, i12);
        result.splice(x2InsertIndex + 2, 0, i22);
      }
    }
    return result;
  }

  skyline.findArea = function(buildings){
    var intervals = skyline.build(buildings),
        numIntervals = intervals.length,
        area = 0;
    for(var i = 0; i < numIntervals; i++ ){
      area += intervals[i].area();
    }
    return area;
  };
})();