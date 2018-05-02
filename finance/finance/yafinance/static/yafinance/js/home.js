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
var map

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

///tutorial from D3.js Essential Training for Data Scientists by Emma Saunders on Lynda.com

function fillBar() {
    //select the tag
    var svgContainer = d3.select("#company-bar");
    //append svg
    var svg = d3.select("#company-bar").append("svg").attr("height", "100%").attr("width", "100%");
    var chart = svg.append("g");
    //svg size
    svg.attr('width', '100%')
        .attr('height', 300);
    var boundingRect = svgContainer.node().getBoundingClientRect();
    var width = boundingRect.width;
    var height = boundingRect.height;
    //create scales
    var x = d3.scaleLinear()
        .domain([0, 18])
        .range([0, 290]);

    var y = d3.scaleLinear()
        .domain([0, 180])
        .range([0, width]);
    var margin = {left: 50, right: 50, top: 40, bottom: 0};
    var chartGroup = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var xAxis = d3.axisLeft(y);
    var yAxis = d3.axisBottom(x);

    //draw bars
    svg.selectAll("rect")
        .data(window.movies.number)
        .enter().append("rect")
        .attr("height", 30)
        .attr("width", function (d, i) {
            return d * 16;
        })
        .attr("fill", "#FFA500")
        .attr("y", function (d, i) {
            return 100 + 50 * i;
        })
        .attr("x", 50);

}
//append scale
      chartGroup.append("g")
            .attr("class","axis y")
            .call(yAxis);



//create thearter names
      var textArray = window.yafinance.name;
      svg.append("text").selectAll("tspan")
          .data(textArray)
          .enter().append("tspan")
            .attr("y",function(d,i){ return 115+50*i; })
            .attr("x",400)
            .attr("fill","#633be3")
            .attr("dominant-baseline","middle")
            .attr("text-anchor","start")
            .attr("font-size","15")
            .text(function(d){ return d; });

//create movie count numbers
      var textArray2 = window.yafinance.Bid;
      svg.append("text").selectAll("tspan")
          .data(textArray2)
          .enter().append("tspan")
            .attr("height",30 )
            .attr("width",function(d,i){ return d*16;})
            .attr("y",function(d,i){ return 115+50*i; })
            .attr("x",70 )
            .attr("fill","white")
            .attr("dominant-baseline","middle")
            .attr("text-anchor","start")
            .attr("font-size","15")
            .text(function(d){ return d; });




