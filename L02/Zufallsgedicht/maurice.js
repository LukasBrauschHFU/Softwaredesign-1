var sub = ["Opa", "Olaf", "Frosch", "Ente", "Detlef"];
var ver = ["liebt", "hasst", "isst", "baut", "beißt"];
var obj = ["Spaghetti", "Blumen", "einen Turm", "Hände", "Fliegen"];
function getVerse(string) {
    var gedicht;
    var rand_s = Math.floor(Math.random() * sub.length);
    var rand_v = Math.floor(Math.random() * sub.length);
    var rand_o = Math.floor(Math.random() * sub.length);
    gedicht = sub[rand_s] + " " + ver[rand_v] + " " + obj[rand_o];
    sub.splice(rand_s, 1);
    ver.splice(rand_v, 1);
    obj.splice(rand_o, 1);
    console.log(gedicht);
}
for (var i = 0; i < sub.length; i++) {
    getVerse(sub);
    getVerse(ver);
    getVerse(obj);
}
