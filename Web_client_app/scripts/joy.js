const sampleTimeSec = 0.1;
const sampleTimeMsec = 1000*sampleTimeSec;
var xdata = 0;
var ydata = 0;
var click_button = 0;


var joy;

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
	$.ajax(url, {
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addDataJoyX(+responseJSON.Joystick.x);
			addDataJoyY(+responseJSON.Joystick.y);
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
	startTimer();
	chartInit();
	showClick();

});