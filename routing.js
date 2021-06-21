// Credits - Stack Overflow
// Latency code
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

// Speed code in mbps
// link -- https://stackoverflow.com/a/5529841
var imageAddr = "https://firebasestorage.googleapis.com/v0/b/images-6bad0.appspot.com/o/Wallpapers%2Fpng%2FAppBreweryWallpaper%202.png"; 
var downloadSize = 4995374; //bytes

function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }
    
    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}

function InitiateSpeedDetection() {
    ShowProgressMessage("Loading the image, please wait...");
    window.setTimeout(MeasureConnectionSpeed, 1);
};    

if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        ShowProgressMessage("Invalid image, or error downloading");
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        // styling output
        document.getElementById("mbpsSpeed").innerHTML = (
            "Your connection speed is: " + speedMbps + " Mbps");
        document.getElementById("mbpsSpeed").style.fontFamily = 'Poppins',sans-serif;

        // conditions to display outputs according to speed
        // need to implement this
    }
}