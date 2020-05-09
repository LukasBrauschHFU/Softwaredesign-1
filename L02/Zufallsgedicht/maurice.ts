let sub: string[] = ["Opa", "Olaf", "Frosch", "Ente", "Detlef"];
let ver: string[] = ["liebt", "hasst", "isst", "baut", "beißt"];
let obj: string[] = ["Spaghetti", "Blumen", "einen Turm", "Hände", "Fliegen"];


function getVerse(string) {
    let gedicht: string;
    let rand_s: number = Math.floor(Math.random() * sub.length)
    let rand_v: number = Math.floor(Math.random() * sub.length)
    let rand_o: number = Math.floor(Math.random() * sub.length)


    gedicht = sub[rand_s] + " " + ver[rand_v] + " " + obj[rand_o];

    sub.splice(rand_s, 1);
    ver.splice(rand_v, 1);
    obj.splice(rand_o, 1);

    console.log(gedicht);

}

for (let i: number = 0; i < sub.length; i++) {
    getVerse(sub);
    getVerse(ver);
    getVerse(obj);

}