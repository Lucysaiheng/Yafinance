/**
 * Created by SAIHENG on 4/30/18.
 */
// Global container for company data
window.yafinance={
    params:{},
    data:{},
}

function getdata(){
    $.getJSON('https://raw.githubusercontent.com/Lucysaiheng/Yafinance/master/finance_total.json', function(data){
       window.yafinance.data = data;
        console.log ('data');
        fillMap();


    })

}
var map

function initMap() {
    console.log ('initMap')

    var location = {lat: 35.7990, lng: -78.7383}
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: location
    });

    getdata();






}

function fillMap(){
    console.log('fill');
    console.log (window.yafinance.data);

    for( i= 0; i<window.yafinance.data.length; i++){
    var name = window.yafinance.data[i]["name"];
    var region = window.yafinance.data[i]["region"];
    var ticker = window.yafinance.data[i]["ticker"];
    var lat = Number(window.yafinance.data[i]["lat"]);
    var lon = Number(window.yafinance.data[i]["lon"]);
    var myLatLng = {lat:lat, lng:lon}
    var marker = new google.maps.Marker({
        position:myLatLng,
        map:map,
        content:'<p>test</p>'
        //<div id="content"><a href=""
    })
    var infoWindow= new google.maps.InfoWindow({
        maxWidth:300,
        maxHeight:300
    })
    marker.addListener('mouseover', function(){
        infoWindow.setContent(this.content);
        infoWindow.open(this.getMap(),this);

    })
}

}
//
// function initMap() {
//     console.log("initMap function called");
//     var location = {latitude: 35.7990, longtitude: -78.7383}
//     map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 8,
//         center: location
//     });
//     var marker = new google.maps.Marker({
//       position: location,
//       map: map
//     });
//     getdata()
//
// }


//
// function loadData(finalData) {
//     finalData = finalData.companies
//     for (i = 0; i < finalData.length; i++) {
//
//
//         var marker = new google.maps.Marker({
//             position: {
//                 latitude: parseFloat(finalData[i]["longtitude"]),
//                 latitude: parseFloat(finalData[i]["longtitude"])
//             },
//             map: map
//         });
//
//
//     }}





//function init(){
  //console.log("init function");
  //initMap();
  //}
