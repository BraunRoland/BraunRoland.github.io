
function listaKeszites(sor) {
    document.getElementById(sor / 10).disabled = true;
    const lista = [];
    for (let i = 0; i < 5; i++) {
        const obj = { id: sor + i, szam: parseInt(document.getElementById(`${sor + i}`).innerText) }
        lista.push(obj);
    }
    return lista;
}

function helyMeghatarozas() {
    let div = document.getElementById("10");
    let hely = div.getBoundingClientRect();
    console.log(hely.top, hely.right, hely.bottom, hely.left)
    console.log(hely.top);
}

function randomSzam(id, maxSzam) {
    for (let i = 0; i < 5; i++) {
        let kocka = document.getElementById(id + i);
        kocka.innerText = Math.floor(Math.random() * maxSzam);
    }
}

function mozgatasFel(kocka) {
    return new Promise(resolve => {

        let negyzet = document.getElementById(kocka);
        let id = null;
        let pos = negyzet.offsetTop;
        let kezd = pos
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() {
            //console.log("pos: "+pos);
            if (pos == kezd - 200) {
                clearInterval(id);
                resolve();
            }
            else {
                pos--;
                negyzet.style.top = pos + "px";
            }
        }
    });
}

function mozgatasLe(kocka) 
{
    return new Promise(resolve => 
    {
        let negyzet = document.getElementById(kocka);
        let id = null;
        let pos = negyzet.offsetTop;
        let kezd = pos
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() 
        {
            //console.log("pos: "+pos);
            if (pos == kezd + 200) {
                clearInterval(id);
                resolve();
            }
            else {
                pos++;
                negyzet.style.top = pos + "px";
            }
        }
    });
}


function mozgatasOldalra(balKockaId, jobbKockaId) 
{
    return new Promise(resolve => 
    {
        let balKocka = document.getElementById(balKockaId);
        let jobbKocka = document.getElementById(jobbKockaId);
        let id = null;
        let balPos = balKocka.offsetLeft;
        let jobbPos = jobbKocka.offsetLeft;
        let balKezd = balPos;
        let jobbKezd = jobbPos;
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() 
        {
            if (balPos == jobbKezd && jobbPos == balKezd) 
            {
                clearInterval(id);
                resolve();
            }
            else 
            {
                balPos++;
                jobbPos--;
                balKocka.style.left = balPos + "px";
                jobbKocka.style.left = jobbPos + "px";
                //console.log(`bal: ${balKocka.style.left} jobb: ${jobbKocka.style.left}`)
            }
        }
    });
}

async function mozgatasBalra(kocka, koviKocka) 
{
    return new Promise(resolve => 
    {
        let negyzet = document.getElementById(kocka);
        let id = null;
        let pos = negyzet.offsetLeft;
        let kezd = pos
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() 
        {
            //console.log("pos: "+pos);
            if (pos == kezd - 90) 
            {
                clearInterval(id);
                resolve();
            }
            else 
            {
                pos--;
                negyzet.style.left = pos + "px";
            }
        }
    });
}

async function mozgatasJobbra(kocka, koviKocka) 
{
    return new Promise(resolve => 
    {
        let negyzet = document.getElementById(kocka);
        let id = null;
        let pos = negyzet.offsetLeft;
        let kezd = pos
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() 
        {
            //console.log("pos: "+pos);
            if (pos == kezd + 90) 
            {
                clearInterval(id);
                resolve();
            }
            else 
            {
                pos++;
                negyzet.style.left = pos + "px";
            }
        }
    });
}


async function egyszeru(sor) 
{
    animacioFut = true;
    let lista = listaKeszites(sor);
    console.log(`Egyszerű: `);
    console.log(lista);

    for (let i = 0; i < lista.length - 1; i++) 
    {
        let alapKocka = document.getElementById(lista[i].id);
        alapKocka.style.backgroundColor = "green";
        await sleep(1000);
        for (let j = i + 1; j < lista.length; j++) 
        {
            let vizsgKocka = document.getElementById(lista[j].id);
            vizsgKocka.style.backgroundColor = "red";
            await sleep(1000);
            if (lista[i].szam > lista[j].szam) 
            {
                alapKocka.style.backgroundColor = "red";
                mozgatasFel(lista[i].id)
                mozgatasLe(lista[j].id)
                await sleep(1500);
                mozgatasOldalra(lista[i].id, lista[j].id);
                await sleep(1500);
                mozgatasLe(lista[i].id);
                mozgatasFel(lista[j].id);
                await sleep(1500);
                let csere = lista[i];
                lista[i] = lista[j];
                lista[j] = csere;
                alapKocka = document.getElementById(lista[i].id)
                vizsgKocka = document.getElementById(lista[j].id)
                alapKocka.style.backgroundColor = "green";
                console.log(lista);
            }
            vizsgKocka.style.backgroundColor = "cyan";
        }
        alapKocka.style.backgroundColor = "orange";
    }
    document.getElementById(lista[lista.length - 1].id).style.backgroundColor = "orange";
    console.log(`Egyszerű(rendezett): `);
    console.log(lista);
    await sleep(500);
    animacioFut = false;
}

async function bubbleSort(sor) 
{
    animacioFut = true;
    let lista = listaKeszites(sor);
    console.log(`bubble sort: `);
    console.log(lista);
    for (let i = lista.length - 1; i > 0; i--) 
    {
        for (let j = 0; j < i; j++) 
        {
            document.getElementById(lista[j].id).style.backgroundColor = "green";
            document.getElementById(lista[j + 1].id).style.backgroundColor = "green";
            await sleep(1000);
            if (lista[j].szam > lista[j + 1].szam) 
            {
                mozgatasFel(lista[j].id)
                mozgatasLe(lista[j + 1].id)
                await sleep(1500);
                mozgatasOldalra(lista[j].id, lista[j + 1].id);
                await sleep(1500);
                mozgatasLe(lista[j].id);
                mozgatasFel(lista[j + 1].id);
                await sleep(1500);
                let csere = lista[j + 1];
                lista[j + 1] = lista[j];
                lista[j] = csere;
            }
            document.getElementById(lista[j].id).style.backgroundColor = "cyan";
            document.getElementById(lista[j + 1].id).style.backgroundColor = "cyan";
        }
        document.getElementById(lista[i].id).style.backgroundColor = "orange";
    }
    document.getElementById(lista[0].id).style.backgroundColor = "orange";
    console.log(`bubble sort(rendezett): `);
    console.log(lista);
    await sleep(500);
    animacioFut = false;
}

async function quickSort_btn(sor) 
{
    animacioFut = true;
    let lista = listaKeszites(sor);
    quickSort(0, lista.length - 1, lista);
    await sleep(500);
    animacioFut = false;
}

async function quickSort(also, felso, lista) 
{
    console.log(`quick Sort: `);
    console.log(lista);
    let i = also;
    let j = felso;
    let kozep = lista[Math.floor((felso + also) / 2)];
    document.getElementById(kozep.id).style.backgroundColor = "purple";
    console.log(kozep);
    while (also <= felso) 
    {
        while (also < j && lista[also].szam < kozep.szam) 
        {
            also++;
        }
        while (felso > i && lista[felso].szam > kozep.szam) 
        {
            felso--;
        }
        if (also <= felso) 
        {
            if (also != felso) 
            {
                document.getElementById(lista[also].id).style.backgroundColor = "red";
                document.getElementById(lista[felso].id).style.backgroundColor = "red";
                mozgatasFel(lista[also].id);
                mozgatasLe(lista[felso].id);
                await sleep(2000);
                mozgatasOldalra(lista[also].id, lista[felso].id);
                await sleep(2000);
                mozgatasLe(lista[also].id);
                mozgatasFel(lista[felso].id);
                await sleep(2000);
                document.getElementById(lista[also].id).style.backgroundColor = "cyan";
                document.getElementById(lista[felso].id).style.backgroundColor = "cyan";

                let csere = lista[also];
                lista[also] = lista[felso];
                lista[felso] = csere;
            }
            ++also;
            --felso;
        }
    }
    document.getElementById(kozep.id).style.backgroundColor = "cyan";
    if (also < j) 
    {
        await quickSort(also, j, lista);
    }
    if (felso > i) 
    {
        await quickSort(i, felso, lista);
    }

    lista.forEach(e => 
    {
        document.getElementById(e.id).style.backgroundColor = "orange";
    })
    console.log(`quick Sort(rendezett): `);
    console.log(lista);
}

async function insertionSort(sor) 
{
    animacioFut = true;
    let lista = listaKeszites(sor);


    for (let i = 0; i < lista.length; i++) 
    {
        let nezettId = lista[i].id;
        let nezett = document.getElementById(nezettId);
        let jobbPos = nezett.offsetLeft;

        let nagyobbId;
        let nagyobb;
        let balPos;

        let szamlalo = 0;
        let j;

        nezett.style.backgroundColor = "green";
        let csere = lista[i];
        await sleep(1000);
        for (j = i - 1; j >= 0 && lista[j].szam > csere.szam; j--) {
            if (szamlalo == 0) 
            {
                await mozgatasFel(nezettId);
                await sleep(1500);
            }
            szamlalo++;

            nagyobbId = lista[j].id;
            nagyobb = document.getElementById(nagyobbId);
            nagyobb.style.backgroundColor = "red";
            balPos = nagyobb.offsetLeft;

            console.log(`id: ${nagyobbId} | szám: ${lista[j].szam}`)
            await mozgatasBalra(nezettId, balPos);
            await sleep(1500);
            await mozgatasJobbra(nagyobbId, jobbPos);
            await sleep(1500);
            lista[j + 1] = lista[j];
        }
        if (i != 0 && szamlalo != 0) 
        {
            //console.log("balpos: " + balPos);
            await mozgatasLe(nezettId);
            await sleep(1500);
        }
        lista[j + 1] = csere
        for (k = 0; k < i + 1; k++) 
        {
            document.getElementById(lista[k].id).style.backgroundColor = "orange";
        }
    }
    console.log("Insertion(rendezett): ")
    console.log(lista);
    await sleep(500);
    animacioFut = false;
}

function radixBal(negyzetId, vonalId, balra, db) 
{
    return new Promise(resolve => 
    {
        let negyzet = document.getElementById(negyzetId);
        let vonal = document.getElementById(vonalId);
        let id = null;
        let xPos = negyzet.offsetLeft;
        let yPos = negyzet.offsetTop;
        let x = false;
        let y = false;
        let hanyadik = db*85;
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() 
        {
            //console.log("pos: "+pos);
            if (xPos == vonal.offsetLeft) 
            {
                x = true;
            }
            else 
            {
                if (balra == true) 
                {
                    xPos--;
                }
                else 
                {
                    xPos++;
                }
                negyzet.style.left = xPos + "px";
            }
            if (yPos == vonal.offsetTop - hanyadik - 85) 
            {
                y = true;
            }
            else 
            {
                yPos++;
                negyzet.style.top = yPos + "px";
            }
            if (x == true && y == true) 
            {
                clearInterval(id);
                resolve();
            }
        }
    });
}

function radixFelOld(negyzetId, kockakHelye, balra, i) 
{
    return new Promise(resolve => 
    {
        let negyzet = document.getElementById(negyzetId);
        let negyzetHelye = kockakHelye.left[i]
        let id = null;
        let xPos = negyzet.offsetLeft;
        let yPos = negyzet.offsetTop;
        let x = false;
        let y = false;
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() 
        {
            //console.log("pos: "+pos);
            if (xPos == negyzetHelye) 
            {
                x = true;
            }
            else 
            {
                if (balra == true) 
                {
                    xPos--;
                }
                else 
                {
                    xPos++;
                }
                negyzet.style.left = xPos + "px";
            }
            if (yPos == kockakHelye.top) 
            {
                y = true;
            }
            else 
            {
                yPos--;
                negyzet.style.top = yPos + "px";
            }
            if (x == true && y == true) 
            {
                clearInterval(id);
                resolve();
            }
        }
    });
}

function radixFel(negyzetId,kockakHelye, i) 
{
    return new Promise(resolve => 
    {
        let negyzet = document.getElementById(negyzetId);
        let id = null;
        let pos = negyzet.offsetTop;
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() 
        {
            //console.log("pos: "+pos);
            if (pos == kockakHelye.top) 
            {
                clearInterval(id);
                resolve();
            }
            else 
            {
                pos--;
                negyzet.style.top = pos + "px";
            }
        }
    });
}

function radixLe(negyzetId,vonalId, db) 
{
    return new Promise(resolve => 
    {
        console.log(db);
        let negyzet = document.getElementById(negyzetId);
        let vonal = document.getElementById(vonalId);
        let id = null;
        let pos = negyzet.offsetTop;
        let hanyadik = db*85
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() 
        {
            //console.log("pos: "+pos);
            if (pos == vonal.offsetTop - hanyadik - 85) 
            {
                clearInterval(id);
                resolve();
            }
            else 
            {
                pos++;
                negyzet.style.top = pos + "px";
            }
        }
    });
}

async function radixMozgatas(negyzetId, vonalId, db) 
{
    let negyzet = document.getElementById(negyzetId);
    console.log(negyzet+" | "+ negyzetId)
    let vonal = document.getElementById(vonalId);
    console.log(vonal +" | "+ vonalId)
    console.log(`négyzet(bal): ${negyzet.offsetLeft}px | vonal(bal): ${vonal.offsetLeft}px`)
    if (negyzet.offsetLeft > vonal.offsetLeft)
    {
        await radixBal(negyzetId,vonalId,true,db)
    }
    else if (negyzet.offsetLeft < vonal.offsetLeft)
    {
        await radixBal(negyzetId,vonalId,false,db);
    }
    else
    {
        await radixLe(negyzetId,vonalId,db);
    }
    
}



async function radixMozgFel(negyzetId, kockakHelye, i) 
{
    let negyzetHelye = kockakHelye[i];
    let negyzet = document.getElementById(negyzetId);
    console.log("négyzet: "+ negyzet.offsetLeft);
    console.log("kockakhelye: "+ kockakHelye);
    console.log("offsetleft: "+ kockakHelye.left[i]);
    if (negyzet.offsetLeft > kockakHelye.left[i])
    {
        await radixFelOld(negyzetId,kockakHelye,true,i);
    }
    else if (negyzet.offsetLeft < kockakHelye.left[i])
    {
        await radixFelOld(negyzetId,kockakHelye,false,i);
    }
    else
    {
        await radixFel(negyzetId, kockakHelye, i);
    }    
}

async function radixSort(sor) 
{
    animacioFut = true;
    let lista = listaKeszites(sor);
    let maxCount = mostDigits(lista);

    // kezdő helye a négyzeteknek
    let kockakHelye =
    {
        top: document.getElementById(sor).offsetTop,
        left: []
    }
    for (let i = 0; i < 5; i++) 
    {
        let szam = document.getElementById(sor + i).offsetLeft;
        kockakHelye.left.push(szam);
    }

    console.log(lista);
    console.log(kockakHelye);
    console.log(maxCount);

    let kockak = document.querySelectorAll(".r");
    let pirosI;
    let piros;
    let text;
    let bucket =
    {
        top: document.getElementById("k0").offsetTop,
        szamok: 
        [
            {db: 0, id: [], szam: []},
            {db: 0, id: [], szam: []},
            {db: 0, id: [], szam: []},
            {db: 0, id: [], szam: []},
            {db: 0, id: [], szam: []},
            {db: 0, id: [], szam: []},
            {db: 0, id: [], szam: []},
            {db: 0, id: [], szam: []},
            {db: 0, id: [], szam: []},
            {db: 0, id: [], szam: []}
        ]
    };
    let altLista = [];
    let altId;
    let indexLista= [];
    for (i = 0; i<kockak.length;i++)
    {
        indexLista.push(`${sor+i}`)
    }
    console.log("IndexLista: " + indexLista)
    //ai, nem tudtam hogy kell csinálni
    const szamok = Array.from(kockak).map(k => k.textContent.trim());
    const maxHossz = Math.max(...szamok.map(sz => sz.length));

    for (let poz = 0; poz < maxHossz;poz++)
    {
        index = -1-poz;
        altLista = [];
        altId = []

        //vonalak        
        if(poz != 0)
        {
            indexLista = [];
            for (let aId = 0; aId < bucket.szamok.length;aId++)
            {
                let a = bucket.szamok[aId];
                for (let szId = 0; szId < a.szam.length;szId++)  
                {
                    indexLista.push(a.id[szId]);   
                }
            } 
        }
        bucket =
        {
            top: document.getElementById("k0").offsetTop,
            szamok: 
            [
                {db: 0, id: [], szam: []},
                {db: 0, id: [], szam: []},
                {db: 0, id: [], szam: []},
                {db: 0, id: [], szam: []},
                {db: 0, id: [], szam: []},
                {db: 0, id: [], szam: []},
                {db: 0, id: [], szam: []},
                {db: 0, id: [], szam: []},
                {db: 0, id: [], szam: []},
                {db: 0, id: [], szam: []}
            ]
        };
        //szinezes
        console.log("IndexLista: " +indexLista)

        await sleep(1000);
        for (let i = 0; i < indexLista.length; i++)
        {
            const e = document.getElementById(indexLista[i]);
            text = e.textContent.trim();  
            let hossz = text.length;
            let pirosI = hossz - 1 - poz;
            let piros;
        
            if (pirosI >= 0)
            {
                const eleje = text.slice(0,pirosI);
                piros = text[pirosI];
                const vege = text.slice(pirosI+1);
                e.innerHTML = `${eleje}<span style="color:red;">${piros}</span>${vege}`;
                bucket.szamok[parseInt(piros)].id.push(e.id); 
                bucket.szamok[parseInt(piros)].szam.push(parseInt(e.innerText)); 
            }
            else
            {
                bucket.szamok[0].id.push(e.id);
                bucket.szamok[0].szam.push(parseInt(e.innerText))
            }

        }

        //levitel
        console.log(bucket.szamok);

        let ind = bucket.szamok.findIndex(obj => obj.id.includes("50"));
        console.log(ind);
        let keresett = bucket.szamok[ind];
        console.log(keresett);
        console.log(indexLista);

        for (let i = 0; i < indexLista.length; i++)
        {
            let ind = bucket.szamok.findIndex(obj => obj.id.includes(`${indexLista[i]}`));
            let keresett = bucket.szamok[ind];
            console.log(indexLista[i])
            console.log(ind);
            await radixMozgatas(indexLista[i],`k${ind}`,keresett.db);
            bucket.szamok[ind].db++;
        }
        await sleep(1000);
        


        //felvitel
        let i = 0;
        for (let aId = 0; aId < bucket.szamok.length; aId++)
        {
            let a = bucket.szamok[aId];
            for (let szId = 0; szId < a.szam.length; szId++)
            {
                let sz = a.szam[szId];
                console.log("negyzetId:" + a.id[szId])
                await radixMozgFel(a.id[szId], kockakHelye, i);
                i++;
            }
        }
        await sleep(1000);
        for (let i = 0; i < indexLista.length; i++)
        {
            let ind = bucket.szamok.findIndex(o => o.id.includes(String(indexLista[i])));
            let obj = bucket.szamok[ind].id.indexOf(String(indexLista[i]));
            console.log(`id: ${bucket.szamok[ind].id[obj]} | szám: ${bucket.szamok[ind].szam[obj]}`);
            document.getElementById(indexLista[i]).innerText = bucket.szamok[ind].szam[obj];
        }
    }
    await sleep(500);
    animacioFut = false;
}

//seged funkciók a radixSorthoz:

function getDigit(szam, hely) {
    return Math.floor(Math.abs(szam) / Math.pow(10, hely)) % 10
}

function digitCount(szam) {
    if (szam == 0) {
        return 1;
    }
    return Math.floor(Math.log10(Math.abs(szam))) + 1;
}

function mostDigits(szamokLista) {
    let maxDigits = 0;
    for (let i = 0; i < szamokLista.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(szamokLista[i].szam));
    }
    return maxDigits;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//fájlbeolvasás, feldolgozás
async function fajlBeolvasas()
{
    return new Promise(async resolve =>
    {
        const nevek = ["egyszeru","bubble","quick","insertion","radix"]
        for (let i = 0; i < nevek.length; i++)
        {
            const key = nevek[i]
            console.log(`${nevek[i]}: `)
            let response = await fetch(`./Algoritmus/bin/Debug/net8.0/${nevek[i]}.csv`)
            let text = await response.text();
            let lines = text.split("\n");
            lines.shift();
            lines.pop()

            rendezesek[key] = {};

            for (let j = 0; j < lines.length; j++)
            {
                console.log(`(${j}.): ${lines[j]}`) 
                //rendezesek[key]
                //let key = nevek[i]
                //rendezesek[nevek[i]] = {};
                let segedLista = lines[j].split(";");
                
                let listaIdo = parseFloat(segedLista[1].replace(",","."));
                let tombIdo = parseFloat(segedLista[3].replace(",","."));                    
                rendezesek[key][parseFloat(segedLista[0])] = [listaIdo, tombIdo]
            }
            
        }
        resolve();
    })
}

const rendezesek = {};

/*
rendezesek =
{
    egyszeru:
    {
        100: [listaMs, tombMs],
        500: [listaMs, tombMs],
        1000: [listaMs, tombMs],
        10000: [listaMs, tombMs],
        50000: [listaMs, tombMs]
    },
    bubble:
    {
        100: [listaMs, tombMs],
        500: [listaMs, tombMs],
        1000: [listaMs, tombMs],
        10000: [listaMs, tombMs],
        50000: [listaMs, tombMs]
    },
    quick:
    {
        100: [listaMs, tombMs],
        500: [listaMs, tombMs],
        1000: [listaMs, tombMs],
        10000: [listaMs, tombMs],
        50000: [listaMs, tombMs]
    },
    insertion:
    {
        100: [listaMs, tombMs],
        500: [listaMs, tombMs],
        1000: [listaMs, tombMs],
        10000: [listaMs, tombMs],
        50000: [listaMs, tombMs]
    },
    radix:
    {
        100: [listaMs, tombMs],
        500: [listaMs, tombMs],
        1000: [listaMs, tombMs],
        10000: [listaMs, tombMs],
        50000: [listaMs, tombMs]
    },
}
*/
 const szinek = [""]

function canvasCsinalas()
{
    const kiiras = document.getElementById("canv");
    for (let i = 0; i < 5; i++)
    {
        const canvas = document.createElement("canvas");
        canvas.className = "myChart";
        kiiras.appendChild(canvas);
    }
    const kozos = document.createElement("canvas");
    kozos.setAttribute("id","kozos");
    kiiras.appendChild(kozos);
}

const nevek = ["Egyszerű", "Buborékos", "Gyors rendezés", "Beillesztéses", "Radix"]
//chatGPT generalt szinek
const colors1 = [
    "rgb(5, 151, 248)",    // kék
    "rgb(250, 11, 63)",    // piros
    "rgb(0, 200, 83)",     // zöld
    "rgb(255, 87, 34)",    // narancs
    "rgb(156, 39, 176)",   // lila
    "rgb(255, 193, 7)",    // sárga
    "rgba(31, 7, 172, 1)",   // világoskék
    "rgb(121, 85, 72)",    // barna
    "rgba(255, 163, 59, 1)",// világos sárga
    "rgb(233, 30, 99)"     // pink
];

const colors2 = [
    "rgb(102, 204, 255)",   // világoskék
    "rgb(255, 153, 153)",   // világos piros/rózsaszín
    "rgb(102, 255, 178)",   // világos zöld
    "rgb(255, 255, 153)",   // világos sárga
    "rgb(178, 102, 255)",   // világos lila
    "rgb(255, 178, 102)",   // világos narancs
    "rgb(102, 178, 255)",   // világos kék
    "rgb(204, 153, 102)",   // világos barna
    "rgb(255, 255, 102)",   // világos sárga
    "rgb(255, 102, 204)"    // világos pink
];


let szinindex = 0;

function rajz(i)
{
    const ctx = document.getElementsByClassName('myChart')[i];
    const algoritmusNev =  Object.keys(rendezesek)[i];
    const adat = rendezesek[algoritmusNev];

    const labels = Object.keys(adat);
    const listaMs = labels.map(e => adat[e][0]);
    const tombMs = labels.map(e => adat[e][1]);

    const data = 
    {
        labels: labels,
        datasets:
        [   
            {
                label: "Lista Mérés(ms)",
                data: listaMs,
                backgroundColor: colors2[szinindex]
            },
            {
                label: "Tömb mérés(ms)",
                data: tombMs,
                backgroundColor: colors2[szinindex+1]
            }
        ]
    }

    szinindex += 2;

    new Chart(ctx, 
    {
        type: 'bar',
        data: data,
        options: 
        {
            responsive: true,
            plugins:
            {
                title:
                {
                    display: true,
                    text: nevek[i]
                }
            },
            scales:
            {
                y:
                {
                    beginAtZero: false,
                    type: "logarithmic",
                    min: 0.01,
                    ticks:
                    {
                        callback: function(value)
                        {
                            return value;
                        }
                    }
                }
            }
        }
    });
}

function kozosRajz()
{
    const allData = [];
    for (let key of Object.keys(rendezesek)) {
        const adat = rendezesek[key];
        Object.values(adat).forEach(v => {
            allData.push(v[0]); // lista
            allData.push(v[1]); // tömb
        });
    }
    const yMin = Math.max(Math.min(...allData) / 2, 0.001);
    const yMax = Math.max(...allData) * 2;


    const datasets = [];
    let labels;
    for (let i = 0; i < nevek.length; i++)
    {
        const algoritmusNev =  Object.keys(rendezesek)[i];
        const adat = rendezesek[algoritmusNev];
        labels = Object.keys(adat);
        const listaMs = labels.map(e => adat[e][0]);
        const tombMs = labels.map(e => adat[e][1]);

        datasets.push(
        {
            label: nevek[i] +" (lista)",
            data: listaMs,
            borderColor: colors1[i],
            backgroundColor: colors1[i],
            fill: false,
            tension: 0.2
        });

        datasets.push(
        {
        label: nevek[i] + " (tömb)",
        data: tombMs,
        borderColor: colors1[i],
        backgroundColor: colors1[i],
        fill: false,
        borderDash: [5,5],
        tension: 0.2
        });
    }

    const ctx = document.getElementById("kozos");
    new Chart(ctx, 
    {
        type: "line",
        data:
        {
            labels: labels,
            datasets: datasets
        },
        options:
        {
            responsive: true,
            plugins:
            {
                title:
                {
                    display: true,
                    text: "Algoritmusok futási ideje",
                },
                legend: {position: true}
            },
        
            scales: 
            {
                y:
                {
                    type: "logarithmic",
                    min: yMin,
                    suggestedMax: 5000,
                    beginAtZero: false,
                    title:
                    {
                        display: true,
                        text: "Futási idő (ms)"
                    }
                },
                x: 
                {
                    title:
                    {
                        display: true,
                        text: "Méret"
                    }
                }
            }
        }
    });
}

async function init() {
    //rendezes();
    randomSzam(10, 101);
    randomSzam(20, 101);
    randomSzam(30, 101);
    randomSzam(40, 101);
   // randomSzam(50, 2001);
    await fajlBeolvasas();
    console.log(rendezesek);
    canvasCsinalas();
    for (let i = 0; i < nevek.length;i++)
    {
        rajz(i);
    }
    kozosRajz();
    //helyMeghatarozas();
}

document.addEventListener("DOMContentLoaded", init);

let animacioFut = false;
//ezt ChatGPT csinálta, emiatt vannak középen a négyzetek
function centerBoxes() 
{
    document.querySelectorAll('.anim-div').forEach(div => {
        const boxes = div.querySelectorAll('.anim');
        const boxWidth = 75;
        const boxHeight = 75;
        const gap = 15;
        const totalWidth = boxes.length * (boxWidth + gap) - gap;

        const startLeft = (div.offsetWidth - totalWidth) / 2;
        const startTop = (div.offsetHeight - boxHeight) / 2;

        boxes.forEach((box, i) => {
            box.style.left = (startLeft + i * (boxWidth + gap)) + "px";
            box.style.top = startTop + "px";
        });
    });
}

window.onload = centerBoxes;
window.onresize = centerBoxes;
window.addEventListener("resize",() =>
{
    if(animacioFut)
    {
        window.location.reload();  
    }
});