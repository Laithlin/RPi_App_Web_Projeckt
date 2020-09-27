
/**
* Web script for Rpi to use SenseHat THP sensors
* Based on materials from  classes
* author: Justyna S.
*/ 

/**
* @brief variables for script
*/
const sampleTimeSec = 0.1; 					
const sampleTimeMsec = 1000*sampleTimeSec;	
const maxSamplesNumber = 100;				

var xdata; 
var tdata;  
var pdata;  
var hdata;  
var lastTimeStamp; 

var chartContextTemp;  
var chartContextPres;
var chartContextHum;
var temp;
var pres;
var hum;

var timer; 

var urlData = 'http://192.168.56.103/web/data.json';
var urlSet = "http://192.168.1.126/web/settings.json";

/**
* @brief overwrite variables settings data, 
* 			which are url, port, sample time and maximum sample number
*/

function addUrl(t) {
	urlData = t + "data.json";
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
* @brief adding data to figures of temperature, humidity and pressure
*/

function addDataTemp(t){
	if(tdata.length > maxSamplesNumber)
	{
		removeOldData();
		lastTimeStamp += sampleTimeSec;
		xdata.push(lastTimeStamp.toFixed(4));
	}
	tdata.push(t);
	temp.update();
}

function addDataPres(p){
	if(pdata.length > maxSamplesNumber)
	{
		removeOldData();
		lastTimeStamp += sampleTimeSec;
		xdata.push(lastTimeStamp.toFixed(4));
	}
	pdata.push(p);
	pres.update();
}

function addDataHum(h){
	if(hdata.length > maxSamplesNumber)
	{
		removeOldData();
		lastTimeStamp += sampleTimeSec;
		xdata.push(lastTimeStamp.toFixed(4));
	}
	hdata.push(h);
	hum.update();
}

/**
* @brief removing old data 
*
* when length of data container is greater than 
* maximum sample number, first receiving data are removed 
*/

function removeOldData(){
	xdata.splice(0,1);
	tdata.splice(0,1);
	pdata.splice(0,1);
	hdata.splice(0,1);
}

/**
* @brief start timer after click
*/

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
			addDataTemp(+responseJSON.data.THP.temperature);
			addDataPres(+responseJSON.data.THP.pressure);
			addDataHum(+responseJSON.data.THP.humidity);
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


	tdata = [];
	pdata = []; 
	hdata = []; 

	// get chart context from 'canvas' element
	chartContextTemp = $("#temp")[0].getContext('2d');
	chartContextPres = $("#pres")[0].getContext('2d');
	chartContextHum = $("#hum")[0].getContext('2d');

	temp = new Chart(chartContextTemp, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [{
				fill: false,
				label: 'Temperature',
				backgroundColor: 'rgb(255, 0, 0)',
				borderColor: 'rgb(255, 0, 0)',
				data: tdata,
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
						labelString: 'Temperature'
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
	pres = new Chart(chartContextPres, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [{
				fill: false,
				label: 'Pressure',
				backgroundColor: 'rgb(0, 0, 255)',
				borderColor: 'rgb(0, 0, 255)',
				data: pdata,
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
						labelString: 'Pressure'
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
	hum = new Chart(chartContextHum, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [{
				fill: false,
				label: 'Humidity',
				backgroundColor: 'rgb(0, 255, 0)',
				borderColor: 'rgb(0, 255, 0)',
				data: hdata,
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
						labelString: 'Humidity'
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
	
	tdata = temp.data.datasets[0].data;
	pdata = pres.data.datasets[0].data;
	hdata = hum.data.datasets[0].data;
	xdata = temp.data.labels;
	xdata = pres.data.labels;
	xdata = hum.data.labels;
}

$(document).ready(() => { 
	getSettings();
	chartInit();
	$("#start").click(startTimer);
	$("#stop").click(stopTimer);
	$("#sampletime").text(sampleTimeMsec.toString());
	$("#samplenumber").text(maxSamplesNumber.toString());
});