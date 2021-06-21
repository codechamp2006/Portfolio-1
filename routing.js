// Credits - Stack Overflow
// Latency code
// link -- https://stackoverflow.com/a/21372151
var arrTimes = [];
var i = 0; // start
var timesToTest = 5;
var tThreshold = 150; //ms
// var testImage = "http://www.google.com/images/phd/px.gif"; // small image in your server
// var testImage = "https://cdn.jsdelivr.net/gh/codechamp2006/Portfolio-1@main/dist/images/california.jpg"
var testImage = "https://res.cloudinary.com/dl1z6mcsl/image/upload/v1624290155/kalen-emsley-Bkci_8qcdvQ-unsplash_l5vw0d.jpg";
// var testImage = "https://ik.imagekit.io/gna0wch172q/icons8-youtube-studio-48_vj3EwgZw0.png"
var dummyImage = new Image();
var isConnectedFast = false;

testLatency(function(avg){
  isConnectedFast = (avg <= tThreshold);
  /** output */
document.getElementById("speed").innerHTML = (("Latency: " + (avg.toFixed(2)) + "ms"));
// Styling output
document.getElementById("speed").style.fontFamily = 'Poppins';
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
// image from unsplash hosted in jsdelivr
// var imageAddr = "https://cdn.jsdelivr.net/gh/codechamp2006/Portfolio-1@main/dist/images/california.jpg"; 
var imageAddr = "https://res.cloudinary.com/dl1z6mcsl/image/upload/v1624290155/kalen-emsley-Bkci_8qcdvQ-unsplash_l5vw0d.jpg";
var downloadSize = 832512; //bytes

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
        document.getElementById("mbpsSpeed").style.fontFamily = 'Poppins';

        // conditions to display outputs according to speed
        // need to implement this
    }
}


{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
// cloudflare ip address finder
$.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
  // Convert key-value pairs to JSON
  // https://stackoverflow.com/a/39284735/452587
  data = data.trim().split('\n').reduce(function(obj, pair) {
    pair = pair.split('=');
    return obj[pair[0]] = pair[1], obj;
  }, {});
  console.log(data);
}); */}





