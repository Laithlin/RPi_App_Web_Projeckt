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

function removeOldData(){
	xdata.splice(0,1);
	datar.splice(0,1);
	datap.splice(0,1);
	datay.splice(0,1);
}

function startTimer(){
	timer = setInterval(ajaxJSON, sampleTimeMsec);
}

function stopTimer(){
	clearInterval(timer);
}

function ajaxJSON() {
	$.ajax(urlData, {
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addDataIMUR(+responseJSON.data.RPY.roll);
			addDataIMUP(+responseJSON.data.RPY.pitch);
			addDataIMUY(+responseJSON.data.RPY.yaw);
		}
	});
}

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


});