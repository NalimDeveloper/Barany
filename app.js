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
            alert("Gratul�lunk! Eltal�ltad :)");
            nyer = 1;
            document.getElementById("udvozlet").innerHTML = "Kérlek kattints a kapcsolat menüre, majd vissza...<br><br><font size=2> Frissítéssel javítva lesz!</font>";
        }


    }

}



window.addEventListener("load", function () {

    document.getElementById("newgame").addEventListener("click", function () {
        game();
        console.log("Klikk");
    });

//websocket
document.getElementById("indit").addEventListener("click", login);

        var ws;
        var app_id = "kimwacg_kefo";
        var user_id;
        function login() {
            user_id = document.getElementById("user_id").value;
            ws = new WebSocket("ws://5.249.155.46:8084/FirefoxOSParty/WsChatServlet");
            ws.onopen = function () {
                var string = '{"u":"' + user_id + '","n":"' + user_id + '","g":"' + app_id + '"}';
                ws.send(string);
                console.log("Klickk");
            };
            ws.onmessage = function (message) {
                console.log(message.data);
                json = JSON.parse(message.data);
                if (json["c"] != null) {
                }

            }

        }



});




