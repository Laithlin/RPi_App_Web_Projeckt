/**
* Web script for Rpi to use SenseHat LED matrix
* Based on materials from  classes
* author: Justyna S.
*/ 

/**
* @brief variables for script
*/

const undUrl = '192.168.8.126';
var undPort = 22;
var undSampleTime = 0.1;
var undMaxSampleNum = 100;

/**
* @brief sending data to file
*/

function ajaxJSON() {
	var dane ={
			 url: $("#url").val(),
			 port: $("#port").val(),
			 sampleTime: parseInt($("#sampleTime").val()),
			 maxSampleNum: parseInt($("maxSampleNum").val())
	}
	var string_json = JSON.stringify(dane);
    console.log(string_json);
	
	$.ajax({
		type: "GET",
        dataType : 'text',
        url: 'set.php',
        data: { data: string_json },
        success: function (response, status, xhr) {alert("Configuration saved!"); console.log(response); },
        failure: function() {alert("Saving error!");}
 });
	
 }
 
 
$(document).ready(() => { 
	$.ajax({
        url: 'settings.json',
        type: 'GET', dataType: 'json',
        success: function(responseJSON, status, xhr) {
            
            url = responseJSON.url;
            port = responseJSON.port;
            sampleTime = +responseJSON.sampleTime;
            maxSampleNum = +responseJSON.maxSampleNum;

            
        	$("#url").val(url);
            $("#port").val(port);
            $("#sampleTime").val(sampleTime);
            $("#maxSampleNum").val(maxSampleNum);
        },
    });

	$("#btn").click(ajaxJSON);
	

});