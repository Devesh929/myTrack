var express = require('express');
var app = express();
var Clarifai = require('./clarifai_node.js');
var songs_array = ["77458522", "129525832", "104483298", "237362906", "201282997", "248413014", ];
//                 tea music    trop.beach   horror       romantic      summer
//const soundcloud_base = "http://api.soundcloud.com/tracks/";

var songs_array2 = ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/77458522&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/129525832&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/104483298&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/237362906&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/201282997&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/248413014&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/106906789&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/124678474&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/50889391&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/46466915&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"];

Clarifai.initAPI("360dKCi1RG3RhuSdBffpvRw2p6MOjfkwmm-b6aur", "IPs9EX8l33D-mVA25dkKcF5OuPy1wJm90EaLzCVj");

var globalData;

app.get('/users', function(req, res) {

	console.log("here we are with the request");
	var response = req.param('imgURL');
	var normalURL = decodeURIComponent(response);

	var myInt = Math.floor(Math.random()*3 - 0.001);

	var sendToWebsite = encodeURIComponent("http://api.soundcloud.com/tracks/13692671");

	exampleTagSingleURL(normalURL);

	setTimeout(function() {
		console.log(globalData);
		res.send(globalData);
	}, 4000)

	// console.log(sendToWebsite);
	// res.send(sendToWebsite);

})

app.listen(3000, function() {
	console.log("Server has started");
})

////////////////////////////

// Setting a throttle handler lets you know when the service is unavailable because of throttling. It will let
// you know when the service is available again. Note that setting the throttle handler causes a timeout handler to
// be set that will prevent your process from existing normally until the timeout expires. If you want to exit fast
// on being throttled, don't set a handler and look for error results instead.

Clarifai.setThrottleHandler( function( bThrottled, waitSeconds ) { 
	console.log( bThrottled ? ["throttled. service available again in",waitSeconds,"seconds"].join(' ') : "not throttled");
});

function commonResultHandler( err, res ) {
	if( err != null ) {
		if( typeof err["status_code"] === "string" && err["status_code"] === "TIMEOUT") {
			console.log("TAG request timed out");
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "ALL_ERROR") {
			console.log("TAG request received ALL_ERROR. Contact Clarifai support if it continues.");				
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "TOKEN_FAILURE") {
			console.log("TAG request received TOKEN_FAILURE. Contact Clarifai support if it continues.");				
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "ERROR_THROTTLED") {
			console.log("Clarifai host is throttling this application.");				
		}
		else {
			console.log("TAG request encountered an unexpected error: ");
			console.log(err);				
		}
	}
	else {
		if( true ) {
			// if some images were successfully tagged and some encountered errors,
			// the status_code PARTIAL_ERROR is returned. In this case, we inspect the
			// status_code entry in each element of res["results"] to evaluate the individual
			// successes and errors. if res["status_code"] === "OK" then all images were 
			// successfully tagged.
			if( typeof res["status_code"] === "string" && 
				( res["status_code"] === "OK" || res["status_code"] === "PARTIAL_ERROR" )) {

				//globalData = soundcloud_base + songs_array[0];

			globalData = songs_array2[0];

				// the request completed successfully
				for( i = 0; i < res.results.length; i++ ) {
					if( res["results"][i]["status_code"] === "OK" ) {
							for (var j = 0; j < res["results"][i].result["tag"]["classes"].length; j++){
								if (res["results"][i].result["tag"]["classes"][j] == 'tropical')
								{
									console.log('we made it');
									//globalData = soundcloud_base + songs_array[4];
									globalData = songs_array2[1];
								}
								else if (res["results"][i].result["tag"]["classes"][j] == 'togetherness')
								{
									console.log('we made it');
									//globalData = soundcloud_base + songs_array[4];
									globalData = songs_array2[7];
								}
								else if (res["results"][i].result["tag"]["classes"][j] == 'summer')
								{
									console.log('we made it');
									//globalData = soundcloud_base + songs_array[4];
									globalData = songs_array2[4];
								}
								else if (res["results"][i].result["tag"]["classes"][j] == 'boat')
								{
									console.log('we made it');
									//globalData = soundcloud_base + songs_array[4];
									globalData = songs_array2[8];
								}
								else if (res["results"][i].result["tag"]["classes"][j] == 'love')
								{
									console.log('we made it');
									//globalData = soundcloud_base + songs_array[4];
									globalData = songs_array2[3];
								}
								else if (res["results"][i].result["tag"]["classes"][j] == 'car')
								{
									console.log('we made it');
									//globalData = soundcloud_base + songs_array[4];
									globalData = songs_array2[6];
								}
								else if (res["results"][i].result["tag"]["classes"][j] == 'competition')
								{
									console.log('we made it');
									//globalData = soundcloud_base + songs_array[4];
									globalData = songs_array2[9];
								}
							}
							//' probs='+res["results"][i].result["tag"]["probs"][1] )
					}
					else {
						console.log( 'docid='+res.results[i].docid +
							' local_id='+res.results[i].local_id + 
							' status_code='+res.results[i].status_code +
							' error = '+res.results[i]["result"]["error"] )
					}
				}

			}
		}			
	}
}

// exampleTagSingleURL() shows how to request the tags for a single image URL
function exampleTagSingleURL(imgURL) {
	var testImageURL = 'http://www.clarifai.com/img/metro-north.jpg';
	var ourId = "train station 1"; // this is any string that identifies the image to your system

	// Clarifai.setRequestTimeout( 100 ); // in ms - expect: force a timeout response
	// Clarifai.setRequestTimeout( 100 ); // in ms - expect: ensure no timeout 

	Clarifai.tagURL( imgURL , ourId, commonResultHandler );
}

Clarifai.clearThrottleHandler();
