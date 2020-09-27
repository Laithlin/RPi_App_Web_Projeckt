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

var timer; 

var urlData = "http://192.168.8.126/web/data.json";
var urlSet = "http://192.168.1.126/web/settings.json";

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

function addRow(a, b, c) {
	var table = document.getElementById("sensors");
	var row = table.insertRow(1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	
	cell1.innerHTML = a;
	cell2.innerHTML = b;
	cell3.innetHTML = c;
}

function removeData(r) {
	var table = document.getElementById("sensors");
	
	for(var i=r, i<2*r; i++)
	{
		table.deleteRow(i);
	}
}

function addData(d) {
	var obj = JSON.parse(d);
	var amount = 0;
	for(var i=0, i<obj.length; i++)
	{
		addRow(obj[i].name, obj[i].value, obj[i].unit);
		amount++;
	}
	
	removeData(amount);
}

function ajaxJSON() {
	$.ajax(urlData, {
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addData(+responseJSON.data);
			
		}
	});
}

function startTimer(){
	timer = setInterval(ajaxJSON, sampleTimeMsec);
}

$(document).ready(() => { 
	getSettings();
	startTimer();
	

});