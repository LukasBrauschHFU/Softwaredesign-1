let sub: string[] = ["Opa", "Olaf", "Frosch", "Ente", "Detlef"];
let ver: string[] = ["liebt", "hasst", "isst", "baut", "beißt"];
let obj: string[] = ["Spaghetti", "Blumen", "einen Turm", "Hände", "Fliegen"];

// Funktionparameter mit "_" z.B. _string
function getVerse(string) {
    let gedicht: string;
// folgende drei Variabeln in camelCase
    let rand_s: number = Math.floor(Math.random() * sub.length)
    let rand_v: number = Math.floor(Math.random() * sub.length)
    let rand_o: number = Math.floor(Math.random() * sub.length)


    gedicht = sub[rand_s] + " " + ver[rand_v] + " " + obj[rand_o];

    sub.splice(rand_s, 1);
    ver.splice(rand_v, 1);
    obj.splice(rand_o, 1);

    console.log(gedicht);

}
// scheinbar sollen index Variabeln auch mit einer vollwertigen Bezeichnung benannt werden 
for (let i: number = 0; i < sub.length; i++) {
// Funktionen sollten erst aufgerufen werden, bevor sie aufgeführt werden. Also die for-Schleife vor die getVerse Funktion schreiben.
    getVerse(sub);
    getVerse(ver);
    getVerse(obj);

}
