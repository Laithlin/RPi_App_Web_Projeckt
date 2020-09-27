
/**
* Web script for Rpi to use SenseHat Joystick
* Based on materials from  classes
* author: Justyna S.
*/ 

/**
* @brief variables for script
*/

const sampleTimeSec = 0.1;
const sampleTimeMsec = 1000*sampleTimeSec;
var xdata = 0;
var ydata = 0;
var click_button = 0;


var joy;


var urlData = "http://192.168.8.126/app/joystick.json";
var urlSet = "http://192.168.1.126/app/settings.json";;

function addUrl(t) {
	urlData = t + "joystick.json";
	return urlData;
}

function addPort(p) {
	port = p;
	return port;
}

function addSampleTime(s) {
	sampleTime = s;
	return sampleTime;
}

function addMaxSampleNumber(m) {
	maxSampleNum = m;
	return maxSampleNum;
} 

function getSettings() {
	$.ajax(urlSet, {
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addUrl(+responseJSON.url);
			addPort(+responseJSON.port);
			addSampleTime(+responseJSON.sampleTime);
			addMaxSampleNumber(+responseJSON.maxSampleNum);
		}
	});
}

var url = "http://192.168.8.126/webapp/joystick.php";


function addDataJoyX(x_poz){
	
	xdata = x_poz;
	joy.update();
}

function addDataJoyY(y_poz){
	
	ydata = y_poz;
	joy.update();
}

function addDataJoyB(butt){
	
	click_button = butt;
}

function startTimer(){
	timer = setInterval(ajaxJSON, sampleTimeMsec);
}

function ajaxJSON() {

	$.ajax(urlData, {

	$.ajax(url, {

		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addDataJoyX(+responseJSON.Joystick.x);
			addDataJoyY(+responseJSON.Joystick.y);

			addDataJoyB(+responseJSON.Joystick.button);

			addDataJoyB(+responseJSON.Joystick.b);

		}
	});
}

function chartInit()
{


	chartContextTemp = $("#joy")[0].getContext('2d');

var scatterChart = new Chart(chartContextTemp, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: [{
                x: xdata,
                y: ydata
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});

}

function showClick()
{
	var count_click = "Button:" + click_button;
	document.getElementById("paragraph").innerHTML = count_click;
}

$(document).ready(() => { 

	getSettings();

	startTimer();
	chartInit();
	showClick();

});