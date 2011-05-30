(function(){
  if(!skyline.utils){
     skyline.utils = {};
  }
  if(!skyline.utils.array){
    skyline.utils.array = {};
  }

  skyline.utils.array.binarySearch = function(searchTerm, array, comparator){
    var low = 0,
        high = array.length,
        mid = 0,
        direction = -1;

    while (low < high) {
      mid = (low + high) >> 1; //divide by 2 and drop remainder
      if(!comparator) {
        direction = array[mid].compareTo(searchTerm);
      } else {
        direction = comparator.call(this,searchTerm,array[mid]);
      }
      if (direction < 0) {
        high = mid;
      } else if (direction > 0) {
        low = mid + 1;
      } else {
        return mid; // found
      }
    }
    return direction < 0 ? -mid : -mid-1; // not found
  };
  
})();
