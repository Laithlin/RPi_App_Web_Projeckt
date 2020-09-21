var btnIndexArray = []; ///<creating array of index's(Lxy) for LEDmatrix
var clrIndexArray = [];
var cleraIdiotTry = "[3,0,0,0,0][3,1,0,0,0][3,2,0,0,0][3,3,0,0,0][3,4,0,0,0][3,5,0,0,0][3,6,0,0,0][3,7,0,0,0][7,7,0,0,0][7,6,0,0,0][7,5,0,0,0][7,4,0,0,0][7,3,0,0,0][0,7,0,0,0][7,2,0,0,0][7,1,0,0,0][0,5,0,0,0][7,0,0,0,0][0,6,0,0,0][0,0,0,0,0][0,4,0,0,0][4,0,0,0,0][0,3,0,0,0][0,2,0,0,0][0,1,0,0,0][4,3,0,0,0][4,4,0,0,0][4,1,0,0,0][4,2,0,0,0][4,7,0,0,0][4,5,0,0,0][4,6,0,0,0][1,6,0,0,0][1,7,0,0,0][1,3,0,0,0][1,2,0,0,0][5,0,0,0,0][1,5,0,0,0][5,1,0,0,0][1,4,0,0,0][1,1,0,0,0][1,0,0,0,0][5,6,0,0,0][5,7,0,0,0][5,2,0,0,0][5,3,0,0,0][5,4,0,0,0][5,5,0,0,0][2,7,0,0,0][6,1,0,0,0][2,6,0,0,0][6,2,0,0,0][2,5,0,0,0][2,4,0,0,0][6,0,0,0,0][2,3,0,0,0][2,2,0,0,0][2,1,0,0,0][2,0,0,0,0][6,7,0,0,0][6,5,0,0,0][6,6,0,0,0][6,3,0,0,0][6,4,0,0,0]";

var msgMap = new Map();

var url = "http://192.168.8.126/webapp/led_display.php";

function ClearMatrix(){
  for (var i = 0; i < btnIndexArray.length; i++) {
    document.getElementById(btnIndexArray[i].toString()).style.backgroundColor = null;
  }
  SendClearRequest();
}

function SendClearRequest(){
  var msg = "";
  for (var i = 0; i < btnIndexArray.length; i++) {
   msg = msg + msgMap[btnIndexArray[i]];
  }
  $.post(url,
    { msgMap
    },
    function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
    });
}

function SendMatrix(){
  var msgArray = [];
  for (var i = 0; i < btnIndexArray.length; i++) {
    
    if(LedColorNotNull(btnIndexArray[i])){
      var x = btnIndexArray[i][1];
      var y = btnIndexArray[i][2];
      var color = document.getElementById(btnIndexArray[i]).style.backgroundColor;
      msgArray.push("[" + x.toString() + "," + y.toString() + "," + RGBToValue(color).toString() + "]");
    }
  }
  $("#paragraph").html(msgArray.toString());
}

function LedColorNotNull(idx){
  return !(document.getElementById(idx.toString()).style.backgroundColor == "");
}

function RGBToValue(color){
  color = color.toString();
  var str = color.slice(color.indexOf("(")+1,color.indexOf(")"));
  //$("#paragraph").html("<b>Click counter: </b>" + str.toString());
  return str;
}

function ShowColor(){
  var r = document.getElementById("redRange").value.toString();
  var g = document.getElementById("greenRange").value.toString();
  var b = document.getElementById("blueRange").value.toString();
  var color = "rgb(" + r.toString()+ ","+ g.toString() + ","+ b.toString() + ")";
  document.getElementById("showbtn").style.backgroundColor = color;
}

function SetColor(id){
  var color = document.getElementById("showbtn").style.backgroundColor;
  document.getElementById(id).style.backgroundColor = color;

}

function WebAppInit(){
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      //creating array of display elements
      var idx = "L"+x.toString()+y.toString();
      btnIndexArray.push(idx.toString());

      //creating array for clearing the display
      var clrValue = "["+x.toString()+","+y.toString()+",0,0,0]";
      clrIndexArray.push(clrValue.toString());
      
      msgMap.set(idx,clrValue);
    }
  }
}

$(document).ready(()=>{
  WebAppInit();

});
