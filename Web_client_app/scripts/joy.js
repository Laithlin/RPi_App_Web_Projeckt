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

var urlData = "http://192.168.8.126/RPi_App_Web_Projeckt/server/joystick.json";
var urlAd;

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
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addDataJoyX(+responseJSON.Joystick.x);
			addDataJoyY(+responseJSON.Joystick.y);
			addDataJoyB(+responseJSON.Joystick.button);
		}
	});
}

function chartInit()
{

	chartContextTemp = $("#joy")[0].getContext('2d');

	joy = new Chart(chartContextTemp, {
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
	$.ajax({
        url: 'settings.json',
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			
			urlAd = responseJSON.url;
			port = responseJSON.port;
			sampleTimeSec = +responseJSON.sampleTime;
			sampleTimeMsec = sampleTimeMsec / 1000;
			maxSamplesNumber = +responseJSON.maxSamplesNum;

			
			
		},
	});
	
	startTimer();
	chartInit();
	showClick();

});