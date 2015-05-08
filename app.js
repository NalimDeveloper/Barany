var max = Math.floor((Math.random() * 10000) + 1);
var gondolat = Math.floor((Math.random() * max) + 1);
var nyer = 0;

function game(user_id, ws) {

    while (nyer != 1) {
        tipp = prompt("A mezőn jártam és birkákat láttam... Mennyi lehetett?");
        if (gondolat > tipp) {
            alert("Sajnos ennél többet láttam :(");
            console.log(gondolat + "Tipp:" + tipp);
        }

        else if (max < tipp)
            alert(+max + " bárány biztos nem volt...");


        else if (gondolat < tipp) {
            alert("Ennél azért kevesebb....");
            console.log(gondolat + "Tipp:" + tipp);
        }

        
        else if (gondolat == tipp) {
            alert("Gratulálunk! Eltaláltad :)");
            nyer = 1;
            document.getElementById("udvozlet").innerHTML = "Kérlek kattints a kapcsolat menüre, majd vissza...<br><br><font size=2> Frissítéssel javítva lesz!</font>";
             s = '{"c":"' + user_id + '", "nyer":"1"}';
             ws.send(s);
       }
       
       if (json["nyer"] != null) {
           alert(json["user_id"]+' kitalálta mennyi birka van! :)');  
           document.getElementById("udvozlet").innerHTML = "Kérlek kattints a kapcsolat menüre, majd vissza...<br><br><font size=2> Frissítéssel javítva lesz!</font>";

        }


    }

}



window.addEventListener("load", function () {


//websocket
    document.getElementById("indit").addEventListener("click", login);
    var ws;
    var app_id = "kimwacg_kefo";
    var user_id = document.getElementById("user_id").value;
    var kihivas = false;
    function login() {

user_id = document.getElementById("user_id").value;
ws = new WebSocket("ws://5.249.155.46:8080/FirefoxOSParty/WsChatServlet");
ws.onopen = function () {
var string = '{"u":"' + user_id + '","n":"' + user_id + '","g":"' + app_id + '"}';
console.log("->" + string); 
ws.send(string);
};

ws.onmessage = function (message) {
console.log("Message:" + message.data + kihivas);
console.log("******************");
json = JSON.parse(message.data);

if (json["s"] != null && !kihivas) {
var s = '{"u":"' + user_id + '","g":"' + app_id + '","s": ["' + user_id + '"], "p":"'+app_id+'"}'; //
console.log("->" + s);
ws.send(s);
kihivas = true;
}
if (json["p"] != null) {//console.log("Message:" + message.data+kihivas);
play_id=json["p"];
var s='{"g":"'+app_id+'","p":"'+json["p"]+'","u":"'+user_id+'"}';
console.log("->" + s);
ws.send(s);
}
if (json["r"] != null) {// console.log('Message:' + message.data+kihivas);
var s = '{"g":"' + app_id + '", "p":"' + play_id + '", "r":"' + user_id + '"}';
console.log("->" + s);
ws.send(s);
}
if (json["v"] != null) {
console.log("J�t�k ind�t�s...");
//var s = '{"c":"' + app_id + '", "gold":"11"}';
//ws.send(s);
game(user_id,ws);
}
}
}
});




