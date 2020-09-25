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