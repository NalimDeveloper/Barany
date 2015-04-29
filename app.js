var max = Math.floor((Math.random() * 10000) + 1);
var gondolat = Math.floor((Math.random() * max) + 1);
var nyer = 0;
function game() {

    while (nyer != 1) {
        tipp = prompt("A mezőn jártam és birkákat láttam... Mennyi lehetett?");
        if (gondolat > tipp) {
            alert("Sajnos ennél többet láttam :(");
            console.log(gondolat + "Tipp:" + tipp);
        }

        else if (max < tipp)
            alert(+max + " bárány biztos nem volt...")


        else if (gondolat < tipp) {
            alert("Ennél azért kevesebb....");
            console.log(gondolat + "Tipp:" + tipp);
        }


        else if (gondolat == tipp) {
            alert("Gratulálunk! Eltaláltad :)");
            nyer = 1;
            document.getElementById("udvozlet").innerHTML = "Kérlek kattints a kapcsolat menüre, majd vissza...<br><br><font size=2> Frissítéssel javítva lesz!</font>";
        }


    }

}



window.addEventListener("load", function () {

    document.getElementById("newgame").addEventListener("click", function () {
        game();



    });

//websocket
    document.getElementById("indit").addEventListener("click", login);
    var ws;
    var app_id = "kimwacg_kefo";
    var user_id;
    var kihivas = false;
    function login() {
        user_id = document.getElementById("user_id").value;
        ws = new WebSocket("ws://5.249.155.46:8080/FirefoxOSParty/WsChatServlet");
        ws.onopen = function () {
            var string = '{"u":"' + user_id + '","n":"' + user_id + '","g":"' + app_id + '"}';
            ws.send(string);
        };

        ws.onmessage = function (message) {
            console.log("Message:" + message.data + kihivas);
            json = JSON.parse(message.data);

            if (json["s"] != null && !kihivas) {
                var s = '{"u":"' + user_id + '","g":"' + app_id + '","s": ["' + user_id + '"], "p":"' + user_id + '"}';
                ws.send(s);
                kihivas = true;
                                console.log("->" + s)
            }
            //console.log("Message:" + message.data+kihivas);
            if (json["p"] != null) {
                ws.send('{"g":"' + app_id + '", "p":"' + json["p"] + '", "u":"' + user_id + '"}');
                                console.log("->" + s)
            }
            //  console.log('Message:' + message.data+kihivas);
            if (json["r"] != null) {
                var s = '{"g":"' + app_id + '", "p":"' + json["p"] + '", "r":"' + user_id + '"}';
                ws.send(s);
                console.log("->" + s);
            }

            if (json["v"] != null) {
                console.log("J�t�k ind�t�s...");
                //var s = '{"c":"' + app_id + '", "gold":"11"}';
                //ws.send(s);
            }


        }

    }


});




