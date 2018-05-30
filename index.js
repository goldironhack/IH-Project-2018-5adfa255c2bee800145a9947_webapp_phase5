const BOOUGHT_NY_URL= ("https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD");
const DISTRICTS_SHAPES=("https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson");
const  AFFORDABLE =("https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD");
const  geos =("https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=json");



var map;

var directionsDisplay;
var directionsService;


var BOROUGHT_NY=[];
var BOROUGHT_NY_NAME=[];
var AFFORDABLE_NY=[];
var center1 = [
    [ 40.7557318030598, -73.99679192559884 ],
    [ 40.721199341942196, -73.98655063045635 ],
    [ 40.81781613381325, -73.95536811758674 ],
    [ 40.85400501928595, -73.93029225832015 ],
    [ 40.81649933702495, -73.94672495988556 ],
    [ 40.78709840704, -73.9760563998436 ],
    [ 40.75093604798305, -73.98264439686034 ],
    [ 40.7444359012749, -73.97378005274385 ],
    [ 40.72933237584535, -74.0025211295677 ],
    [ 40.761288284793295, -73.95077649770515 ],
    [ 40.7914676959764, -73.9249286770987 ],
    [ 40.689827662736505, -74.04514313365544 ]
];

var center2 = [
    [ 40.8322680507028, -73.9181484387684 ],
    [ 40.87252770127235, -73.89295908090111 ],
    [ 40.810261999842695, -73.9170848743952 ],
    [ 40.79638447907165, -73.89799122193139 ],
    [ 40.82347209218505, -73.86260464277295 ],
    [ 40.8564564159047, -73.8505591678158 ],
    [ 40.832536740679004, -73.8991448262114 ],
    [ 40.88567914497435, -73.837138207758 ],
    [ 40.8536772154694, -73.90934251551165 ],
    [ 40.851488756240045, -73.88726852047215 ],
    [ 40.89178333369535, -73.90597458442491 ],
    [ 40.88032204793265, -73.7865771191208 ]
];

var center3 = [
    [ 40.6065899812414, -73.99580395709815 ],
    [ 40.6328188240108, -73.96088731661226 ],
    [ 40.5829722919774, -73.9833430315906 ],
    [ 40.623600993828546, -74.01954054014915 ],
    [ 40.628585638744255, -73.98644309433504 ],
    [ 40.6692078378626, -73.91180571672145 ],
    [ 40.6632499548146, -73.94571488306204 ],
    [ 40.6943166033972, -73.91919993915485 ],
    [ 40.6733909018739, -73.94848481673705 ],
    [ 40.71859156992695, -73.94541984224824 ],
    [ 40.68869439148256, -73.93912237644179 ],
    [ 40.66748509151225, -73.87986691044824 ],
    [ 40.64859469938185, -73.9319276446697 ],
    [ 40.5854144564905, -73.91495121005575 ],
    [ 40.59506797591595, -73.94973920995145 ],
    [ 40.67684997926475, -73.99518110438154 ],
    [ 40.6532128794621, -74.0018550230912 ],
    [ 40.69446526288195, -73.98112827033275 ]
];

var center4 = [
    [ 40.69351768482295, -73.780973122179 ],
    [ 40.738642857545, -73.92516249957855 ],
    [ 40.76451959152425, -73.8411582269865 ],
    [ 40.55702244574876, -73.920066294923 ],
    [ 40.6527610482536, -73.85897533604636 ],
    [ 40.697304026011295, -73.83966015711641 ],
    [ 40.6973902897125, -73.751021936578 ],
    [ 40.7591598943837, -73.87586257295871 ],
    [ 40.7249112798648, -73.79590795394346 ],
    [ 40.7545696790572, -73.75539995068635 ],
    [ 40.769678293284954, -73.91925855183925 ],
    [ 40.7087735628687, -73.8902250254661 ],
    [ 40.7405219169588, -73.87097895254556 ],
    [ 40.7206580287241, -73.85057718625795 ]
];

var center5 = [
    [ 40.536306483119844, -74.13319908113435 ],
    [ 40.6428639850284, -74.15945581059364 ],
    [ 40.578722871663146, -74.07419435865364 ]
];


var center =[];

var myLatLng = {lat: 40.7290549, lng: -73.9965233};
var theBronx = {lat:40.844782, lng: -73.864827};
var brooklyn = {lat:40.678178, lng: -73.944158};
var manhattan = {lat:40.783060, lng: -73.971249};
var queens = {lat:40.728224, lng: -73.794852};
var statenIsland = {lat:40.579532, lng: -74.150201};




var affordObject = {};


function splitValue(value, index) {
    return value.substring(0, index) ;
}

function splitValue2(value, index) {
    return value.substring(index) ;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function getDataFromURL(URL) {
    var data = $.get(BOOUGHT_NY_URL, function () {
        var posLen = data.responseJSON.data.length;
        for (i=0; i<posLen;i++) {
            var posicion = data.responseJSON.data[i][9];
            var vecindario = data.responseJSON.data[i][10]+ ","+data.responseJSON.data[i][16];
            //console.log(posicion);
            BOROUGHT_NY.push(posicion);
            BOROUGHT_NY_NAME.push(vecindario);
        }

        console.log(BOROUGHT_NY_NAME);
    })

    var data2 = $.get(AFFORDABLE, function () {


        var count=0;
        var count1=0;
        var count2=0;
        var count3=0;
        var count4=0;


        for(i=0; i<data2.responseJSON.data.length;i++){

            if (data2.responseJSON.data[i][15]=="Manhattan") {

                count= count + Number(data2.responseJSON.data[i][31]);


            }

            else if (data2.responseJSON.data[i][15]=="Bronx"){



                count1= count1 + Number(data2.responseJSON.data[i][31]);

            }
            else if (data2.responseJSON.data[i][15]=="Brooklyn"){

                count2= count2 + Number(data2.responseJSON.data[i][31]);
            }
            else if (data2.responseJSON.data[i][15]=="Queens"){
                count3= count3 + Number(data2.responseJSON.data[i][31]);
            }

            else if (data2.responseJSON.data[i][15]=="Staten Island"){
                count4= count4 + Number(data2.responseJSON.data[i][31]);
            }

        }

        AFFORDABLE_NY.push(affordObject={borough: "Manhattan" ,affor:count});
        AFFORDABLE_NY.push(affordObject={borough: "Bronx" ,affor:count1});
        AFFORDABLE_NY.push(affordObject={borough: "Brooklyn" ,affor:count2});
        AFFORDABLE_NY.push(affordObject={borough: "Queens" ,affor:count3});
        AFFORDABLE_NY.push(affordObject={borough: "Staten Island" ,affor:count4});


        console.log(AFFORDABLE_NY)

    })





}

function uwu() {
    var data3 = $.get(geos, function () {


        var centerFinder = function (arr)
        {
            var minX, maxX, minY, maxY;
            for (var i = 0; i < arr.length; i++)
            {
                minX = (arr[i][1] < minX || minX == null) ? arr[i][1] : minX;
                maxX = (arr[i][1] > maxX || maxX == null) ? arr[i][1] : maxX;
                minY = (arr[i][0] < minY || minY == null) ? arr[i][0] : minY;
                maxY = (arr[i][0] > maxY || maxY == null) ? arr[i][0] : maxY;
            }
            center.push([(minX + maxX) / 2, (minY + maxY) / 2]);
        }



        for(j=0;j<JSON.parse(data3.responseText).features.length;j++){
            var key = JSON.parse(data3.responseText).features[j].attributes.BoroCD.toString();

            if(splitValue(key,1) == "5" && splitValue2(key,1)<19){
               centerFinder(JSON.parse(data3.responseText).features[j].geometry.rings[0]);
            }

        }

    console.log(center)

    })
}

window.onload=getDataFromURL();







var FINAL_POS=[];

function beginData() {

    var direc=[];

    for(j = 0; j<BOROUGHT_NY.length;j++){
        direc.push(BOROUGHT_NY[j].split(/[POINT()\s]+/)) ;
        var prueba = direc[j][2] + "," + direc[j][1];

        var str = prueba.split(",");

        var latlang = {lat: parseFloat(str[0]), lng: parseFloat(str[1])};

        FINAL_POS[j]=latlang;
    }

    console.log(FINAL_POS);

}


function getTable(borought) {
    var tableRef = document.getElementById('posTable').getElementsByTagName('tbody')[0];
    for (j=0; j<BOROUGHT_NY.length;j++){
        if(borought=="Bronx" && BOROUGHT_NY_NAME[j].includes(borought)){
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);

            // Insert a cell in the row at index 0
            var newCell  = newRow.insertCell(0);

            // Append a text node to the cell

            var newText  = document.createTextNode(BOROUGHT_NY_NAME[j]);

            newCell.appendChild(newText);
        }

        else if(borought=="Brooklyn" && BOROUGHT_NY_NAME[j].includes(borought)){
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);

            // Insert a cell in the row at index 0
            var newCell  = newRow.insertCell(0);

            // Append a text node to the cell

            var newText  = document.createTextNode(BOROUGHT_NY_NAME[j]);

            newCell.appendChild(newText);

        }

        else if(borought=="Manhattan" && BOROUGHT_NY_NAME[j].includes(borought)){
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);

            // Insert a cell in the row at index 0
            var newCell  = newRow.insertCell(0);

            // Append a text node to the cell

            var newText  = document.createTextNode(BOROUGHT_NY_NAME[j]);

            newCell.appendChild(newText);

        }

        else if(borought=="Queens" && BOROUGHT_NY_NAME[j].includes(borought)){
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);

            // Insert a cell in the row at index 0
            var newCell  = newRow.insertCell(0);

            // Append a text node to the cell

            var newText  = document.createTextNode(BOROUGHT_NY_NAME[j]);

            newCell.appendChild(newText);

        }

        else if(borought=="Staten Island" && BOROUGHT_NY_NAME[j].includes(borought)){
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);

            // Insert a cell in the row at index 0
            var newCell  = newRow.insertCell(0);

            // Append a text node to the cell

            var newText  = document.createTextNode(BOROUGHT_NY_NAME[j]);

            newCell.appendChild(newText);

        }

    }
}

function deleteTable() {
    var tableHeaderRowCount = 1;
    var table = document.getElementById('posTable');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}




function initMap() {

    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
        center : myLatLng,
        zoom: 10
    });


    map.data.loadGeoJson(
        'http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');

    console.log(BOROUGHT_NY_NAME);

    map.data.setStyle(function(feature) {


        var color = getRandomColor();
        return {
            fillColor: color,
            strokeWeight: 1
        };
    });

    map.data.addListener('mouseover', function(event) {
        document.getElementById('info-box').textContent =
            event.feature.getProperty('BoroCD');
    });




    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();

}


function getroute(){

    var request={
        origin: FINAL_POS[0],
        destination: {lat: 40.87429419303015, lng: -73.82993910812405},
        travelMode: 'DRIVING'
    };
    directionsDisplay.setMap(map);
    directionsService.route(request,function(result,status){

        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            console.log(result.routes[0]);
        }
    })



}



var markers=[];
var markers2=[];


function markerCenter() {
    for(i=0;i<center1.length;i++){
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(center2[i][0],center2[i][1]),
            map: map,
            title: ""
        });


    }

    console.log(center1)
}

function markerts(borought) {

    for(var k=0; k<BOROUGHT_NY.length;k++) {

        if(borought=="Bronx" && BOROUGHT_NY_NAME[k].includes(borought)){
            var marker = new google.maps.Marker({
                position: FINAL_POS[k],
                map: map,
                title: BOROUGHT_NY_NAME[k]
            });

            markers.push(marker);
        }

        else if (borought=="Brooklyn" && BOROUGHT_NY_NAME[k].includes(borought)){
            var marker = new google.maps.Marker({
                position: FINAL_POS[k],
                map: map,
                title: BOROUGHT_NY_NAME[k]
            });

            markers.push(marker);
        }

        else if (borought=="Manhattan" && BOROUGHT_NY_NAME[k].includes(borought) && BOROUGHT_NY_NAME[k] !="Marble Hill,Manhattan" && !BOROUGHT_NY_NAME[k].includes("Terrace") && !BOROUGHT_NY_NAME[k].includes("Beach")){
            var marker = new google.maps.Marker({
                position: FINAL_POS[k],
                map: map,
                title: BOROUGHT_NY_NAME[k]
            });

            markers.push(marker);
        }

        else if (borought=="Queens" && BOROUGHT_NY_NAME[k].includes(borought)){
            var marker = new google.maps.Marker({
                position: FINAL_POS[k],
                map: map,
                title: BOROUGHT_NY_NAME[k]
            });

            markers.push(marker);
        }

        else if (borought=="Staten Island" && BOROUGHT_NY_NAME[k].includes(borought)){
            var marker = new google.maps.Marker({
                position: FINAL_POS[k],
                map: map,
                title: BOROUGHT_NY_NAME[k]
            });

            markers.push(marker);
        }


    }
}

var markerCenterBorough = [];



function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function drawBoro1() {

    map.data.setStyle(function(feature) {
        var codigo = feature.getProperty('BoroCD');

        var prueba2= codigo.toString();

        var color = splitValue(prueba2,1) == "1" && splitValue2(prueba2,1)<19 ? 'pink' : 'transparent';
        return {
            fillColor: color,
            strokeWeight: 4,
            strokeColor: color
        };
    });

    deleteTable();

    getTable("Manhattan");

    clearMarkers();

    markerts("Manhattan");

}

function drawBoro2() {

    map.data.setStyle(function(feature) {
        var codigo = feature.getProperty('BoroCD');

        var prueba2= codigo.toString();

        var color = splitValue(prueba2,1) == "2" && splitValue2(prueba2,1)<19? 'green' : 'transparent';
        return {
            fillColor: color,
            strokeWeight: 4,
            strokeColor: color
        };
    });

    deleteTable();

    getTable("Bronx");

    clearMarkers();

    markerts("Bronx");

}

function drawBoro3() {

    map.data.setStyle(function(feature) {
        var codigo = feature.getProperty('BoroCD');

        var prueba2= codigo.toString();

        var color = splitValue(prueba2,1) == "3" && splitValue2(prueba2,1)<19 ?  'yellow' : 'transparent';
        return {
            fillColor: color,
            strokeWeight: 2,
            strokeColor: color
        };
    });

    deleteTable();

    getTable("Brooklyn");

    clearMarkers();

    markerts("Brooklyn");
}

function drawBoro4() {

    map.data.setStyle(function(feature) {
        var codigo = feature.getProperty('BoroCD');

        var prueba2= codigo.toString();

        var color = splitValue(prueba2,1) == "4" && splitValue2(prueba2,1)<19 ? 'blue' : 'transparent';
        return {
            fillColor: color,
            strokeWeight: 4,
            strokeColor: color
        };
    });

    deleteTable();

    getTable("Queens");

    clearMarkers();

    markerts("Queens");

}

function drawDistrict(str){
    map.data.setStyle(function(feature) {
        var codigo = feature.getProperty('BoroCD');



        var color = codigo == str  ?  'purple' : 'transparent';
        return {
            fillColor: color,
            strokeWeight: 4,
            strokeColor: color
        };
    });
}


function drawBoro5() {

    map.data.setStyle(function(feature) {
        var codigo = feature.getProperty('BoroCD');

        var prueba2= codigo.toString();

        var color = splitValue(prueba2,1) == "5" && splitValue2(prueba2,1)<19 ?  'purple' : 'transparent';
        return {
            fillColor: color,
            strokeWeight: 4,
            strokeColor: color
        };
    });

    deleteTable();

    getTable("Staten Island");

    clearMarkers();

    markerts("Staten Island");

}

var addListenersOnPolygon = function(polygon) {
    google.maps.event.addListener(polygon, 'click', function (event) {
        map.polygon.overrideStyle();
    });
}

function affordabilityBrough() {
    for (i = 0; i < AFFORDABLE_NY.length; i++) {


        if (AFFORDABLE_NY[i].borough == "Manhattan") {
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.8,
                map: map,
                center: manhattan,
                radius: AFFORDABLE_NY[i].affor * 1.5
            });

            cityCircle.setMap(map);
            addListenersOnPolygon(cityCircle);

        }

        else if (AFFORDABLE_NY[i].borough == "Bronx") {
            var cityCircle2 = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.8,
                map: map,
                center: theBronx,
                radius: AFFORDABLE_NY[i].affor  * 1.5
            });

            cityCircle2.setMap(map);
            addListenersOnPolygon(cityCircle2);
        }

        else if (AFFORDABLE_NY[i].borough == "Brooklyn") {
            var cityCircle3 = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.8,
                map: map,
                center: brooklyn,
                radius: AFFORDABLE_NY[i].affor  * 1.5
            });
            cityCircle3.setMap(map);
            addListenersOnPolygon(cityCircle3);
        }

        else if (AFFORDABLE_NY[i].borough == "Queens") {
            var cityCircle4 = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.8,
                map: map,
                center: queens,
                radius: AFFORDABLE_NY[i].affor  * 1.5
            });

            cityCircle4.setMap(map);
            addListenersOnPolygon(cityCircle4);
        }

        else if (AFFORDABLE_NY[i].borough == "Staten Island") {
            var cityCircle5 = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.8,
                map: map,
                center: statenIsland,
                radius: AFFORDABLE_NY[i].affor  * 1.5
            });

            cityCircle5.setMap(map);
            addListenersOnPolygon(cityCircle5);
        }


    }
}

$("document").ready(function(){
    setTimeout(function(){beginData()}, 1000);
})