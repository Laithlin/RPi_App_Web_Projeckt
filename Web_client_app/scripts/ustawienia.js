const undUrl = "http://192.168.56.101/set.php/";
var undPort = 22;
var undSampleTime = 0.1;
var undMaxSampleNum = 100;

function ajaxJSON() {
	dane ={
			 url: $("#url").val(),
			 port: $("#port").val(),
			 sampleTime: $("#sampleTime").val(),
			 maxSampleNum: $("maxSampleNum").val()
	}
	$.ajax({
		url: undUrl,
		type: "POST",
		data: dane,
		}).done(function(response) {
			 console.log("Zapisano pozytywnie: ", response);
 });
	
 }
 
 
$(document).ready(() => { 
	$("#url").val(undUrl);
	$("#port").val(undPort);
	$("#sampleTime").val(undSampleTime);
	$("#maxSampleNum").val(undMaxSampleNum);
	$("#btn").click(ajaxJSON);
	

});