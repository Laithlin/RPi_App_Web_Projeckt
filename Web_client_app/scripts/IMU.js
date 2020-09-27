
/**
* Web script for Rpi to use SenseHat IMU sensors
* Based on materials from  classes
* author: Justyna S.
*/ 

/**
* @brief variables for script
*/

const sampleTimeSec = 0.1; 	
const sampleTimeMsec = 1000*sampleTimeSec;
const maxSamplesNumber = 100;	
var datar;
var datap;
var datay;


var xdata;  
var lastTimeStamp; 

var chartContextRoll;  
var chartContextPitch;
var chartContextYaw;
var roll;
var pitch;
var yaw;

var timer; 

var urlData = "http://192.168.8.126/web/data.json";
var urlSet = "http://192.168.1.126/web/settings.json";;

/**
* @brief overwrite variables settings data, 
* 			which are url, port, sample time and maximum sample number
*/

function addUrl(t) {
	urlData = t + "data.php";
	return urlData;
}

function addPort(p) {
	port = p;
	return port;
}

function addSampleTime(s) {
	sampleTimeSec = s;
	return sampleTime;
}

function addMaxSampleNumber(m) {
	maxSampleNumber = m;
	return maxSampleNum;
} 

/**
* @brief receiving settings JSON data from sevrer
*/

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

/**
* @brief adding data to figures of roll, oeach and yaw
*/

function addDataIMUR(r){
	if(datar.length > maxSamplesNumber)
	{
		removeOldData();
		lastTimeStamp += sampleTimeSec;
		xdata.push(lastTimeStamp.toFixed(4));
	}
	datar.push(t);
	roll.update();
}

function addDataIMUP(p){
	if(datap.length > maxSamplesNumber)
	{
		removeOldData();
		lastTimeStamp += sampleTimeSec;
		xdata.push(lastTimeStamp.toFixed(4));
	}
	datap.push(t);
	pitch.update();
}

function addDataIMUY(y){
	if(datay.length > maxSamplesNumber)
	{
		removeOldData();
		lastTimeStamp += sampleTimeSec;
		xdata.push(lastTimeStamp.toFixed(4));
	}
	datay.push(t);
	yaw.update();
}

/**
* @brief removing old data 
*
* when length of data container is greater than 
* maximum sample number, first receiving data are removed 
*/

function removeOldData(){
	xdata.splice(0,1);
	datar.splice(0,1);
	datap.splice(0,1);
	datay.splice(0,1);
}

/**
* @brief start timer after click
*/

=======
const sampleTimeSec = 0.1; 	
const sampleTimeMsec = 1000*sampleTimeSec;
var datar = 0;
var datap = 0;
var datay = 0;

var url = "http://192.168.8.126/webapp/joystick.php";


function addDataIMUR(r)
{
	datar = r;
}

function addDataIMUP(p)
{
	datap = p;
}

function addDataIMUY(y)
{
	datay = y;
}


function startTimer(){
	timer = setInterval(ajaxJSON, sampleTimeMsec);
}


/**
* @brief stop timer after click
*/

function stopTimer(){
	clearInterval(timer);
}

/**
* @brief receiving THP JSON data from server
*/

function ajaxJSON() {
	$.ajax(urlData, {
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addDataIMUR(+responseJSON.data.RPY.roll);
			addDataIMUP(+responseJSON.data.RPY.pitch);
			addDataIMUY(+responseJSON.data.RPY.yaw);
=======
function ajaxJSON() {
	$.ajax(url, {
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addDataIMUR(+responseJSON.Orientation.roll);
			addDataIMUP(+responseJSON.Orientation.pitch);
			addDataIMUY(+responseJSON.Orientation.yaw);

		}
	});
}


/**
* @brief initialization of the figure 
*/

function chartInit()
{

	xdata = [...Array(maxSamplesNumber).keys()]; 

	xdata.forEach(function(p, i) {this[i] = (this[i]*sampleTimeSec).toFixed(4);}, xdata);


	lastTimeStamp = +xdata[xdata.length-1]; 


	datar = [];
	datap = []; 
	datay = []; 

	// get chart context from 'canvas' element
	chartContextRoll = $("#roll")[0].getContext('2d');
	chartContextPitch = $("#pitch")[0].getContext('2d');
	chartContextYaw = $("#yaw")[0].getContext('2d');

	roll = new Chart(chartContextRoll, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [{
				fill: false,
				label: 'Roll',
				backgroundColor: 'rgb(255, 0, 0)',
				borderColor: 'rgb(255, 0, 0)',
				data: datar,
				lineTension: 0
			}]
		},

		// Configuration options
		options: {
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Roll'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Time [s]'
					}
				}]
			}
		}
		
	});
	pitch = new Chart(chartContextPitch, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [{
				fill: false,
				label: 'Pitch',
				backgroundColor: 'rgb(0, 0, 255)',
				borderColor: 'rgb(0, 0, 255)',
				data: datap,
				lineTension: 0
			}]
		},

		// Configuration options
		options: {
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Pitch'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Time [s]'
					}
				}]
			}
		}
		
	});
	yaw = new Chart(chartContextYaw, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [{
				fill: false,
				label: 'Yaw',
				backgroundColor: 'rgb(0, 255, 0)',
				borderColor: 'rgb(0, 255, 0)',
				data: datay,
				lineTension: 0
			}]
		},

		// Configuration options
		options: {
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Yaw'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Time [s]'
					}
				}]
			}
		}
		
	});
	
	datar = roll.data.datasets[0].data;
	datap = pitch.data.datasets[0].data;
	datay = yaw.data.datasets[0].data;
	xdata = roll.data.labels;
	xdata = pitch.data.labels;
	xdata = yaw.data.labels;
}



$(document).ready(() => { 
	getSettings();
	chartInit();
	$("#start").click(startTimer);
	$("#stop").click(stopTimer);

=======
function schowClick()
{
	var roll_d = "Roll:" + datar;
	var pitch_d = "Pitch:" + datap;
	var yaw_d = "Yaw:" + datay;
	
	document.getElementById("roll_data").innerHTML = roll_d;
	document.getElementById("pitch_data").innerHTML = pitch_d;
	document.getElementById("yaw_data").innerHTML = yaw_d;
}

$(document).ready(() => { 
	startTimer();
	showClick();


});