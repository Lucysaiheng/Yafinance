/**
 * Created by SAIHENG on 4/30/18.
 */
// Global container for company data
window.yafinance={
    params:{},
    data:{}
    }
//get data and pass data to dic
function getdata(){
    $.getJSON('https://raw.githubusercontent.com/Lucysaiheng/Yafinance/master/finance_total.json',
        function(data){
           window.yafinance.data = data;
            console.log ('data');
        fillMap();

    })

}


//code for google map
var map;

function initMap() {

    var location = {lat: 35.7990, lng: -78.7383}
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: location
    });

    getdata();

}

//code for locating companies, for loop for get locations and info.
function fillMap(){
    console.log('fill');
    console.log (window.yafinance.data);

    for( i= 0; i<window.yafinance.data.length; i++){
    var name = window.yafinance.data[i]["name"];
    var region = window.yafinance.data[i]["region"];
    var ticker = window.yafinance.data[i]["ticker"];
    var lat = Number(window.yafinance.data[i]["lat"]);
    var lon = Number(window.yafinance.data[i]["lon"]);
    var myLatLng = {lat:lat, lng:lon};
    var marker = new google.maps.Marker({
        position:myLatLng,
        map:map,
        content:'<div id="content"><a href="yafinance/company/'+ ticker+'"><h4>'
        +name+'</h4>'+region+'</div>',
    })
    var infoWindow= new google.maps.InfoWindow({
        maxWidth:300,
        maxHeight:300
    })
    //codes from Stackoverflow, mouseover effects.
    marker.addListener('mouseover', function(){
        infoWindow.setContent(this.content);
        infoWindow.open(this.getMap(),this);

    })

    }
}



