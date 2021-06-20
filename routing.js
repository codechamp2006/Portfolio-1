// Credits - Stack Overflow
// link -- https://stackoverflow.com/a/21372151
var arrTimes = [];
var i = 0; // start
var timesToTest = 5;
var tThreshold = 150; //ms
var testImage = "http://www.google.com/images/phd/px.gif"; // small image in your server
var dummyImage = new Image();
var isConnectedFast = false;

testLatency(function(avg){
  isConnectedFast = (avg <= tThreshold);
  /** output */
document.getElementById("speed").innerHTML = (("Latency: " + (avg.toFixed(2)) + "ms"));
// Styling output
document.getElementById("speed").style.fontFamily = 'Poppins', sans-serif;
});

/** test and average time took to download image from server, called recursively timesToTest times */
function testLatency(cb) {
  var tStart = new Date().getTime();
  if (i<timesToTest-1) {
    dummyImage.src = testImage + '?t=' + tStart;
    dummyImage.onload = function() {
      var tEnd = new Date().getTime();
      var tTimeTook = tEnd-tStart;
      arrTimes[i] = tTimeTook;
      testLatency(cb);
      i++;
    };
  } else {
    /** calculate average of array items then callback */
    var sum = arrTimes.reduce(function(a, b) { return a + b; });
    var avg = sum / arrTimes.length;
    cb(avg);
  }
}