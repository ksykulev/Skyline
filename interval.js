skyline.Interval = function(x1,x2,h){
  var x1 = x1,
      x2 = x2,
      h = h;
  function area(){
    return (x2 - x1) * h;
  }
  function equals(interval){
    return x1 == interval.x1 && x2 == interval.x2 && h == interval.h;
  }
  function compareTo(value){
    if(value >= x1 && value <= x2) return 0;
    if(x1 < value) return 1;
    if(x2 > value) return -1;
  }
  return {
    x1 : x1,
    x2 : x2,
    h  : h,
    area : area,
    equals : equals,
    compareTo : compareTo
  }
}