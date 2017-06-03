// write a function forEach that takes two arguments, an array and a function, and
// calls the function on each element in the array
var forEach = function(array, func) {
        for (var i = 0; i < array.length; i++) {
                func(i);
        }
}
