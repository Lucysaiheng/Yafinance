var full_data=[{

    Bid: 11.00,
    Ask: 20.00,
    ticker: "BOJA",
    region: "southwest",
    name: "Bojangles'Inc"
},
 {

    Bid: 2.05,
    Ask: 2.15,
    ticker: "BDSI",
    region: "north",
    name:"BioDelivery Sciences International Inc"
},
 {

    Bid: 52.41 ,
    Ask: 52.42 ,
    ticker: "bbt",
    region: "northwest",
    name:"BB&T Bank"

},
 {

    Bid: 30.03,
    Ask: 30.04,
    ticker: "BAC",
    region: "northwest",
    name:"Bank of America"
},
 {
    Bid: 2.40,
    Ask: 2.42,
    ticker: "BW",
    region: "northwest",
    name:"Babcock and Wilcox Enterprises Inc"
},

 {

    Bid: 41.52,
    Ask: 41.80 ,
    ticker: "CREE",
    region: "southwest",
    name:"The Cato Corporation"

},
 {

    Bid: 1.22 ,
    Ask: 1.50,
    ticker: "CTHR",
    region: "north",
    name:"Cree Inc"
},

{

    Bid: 25.10,
    Ask: 36.04,
    ticker: "DOVA",
    region: "northwest",
    name:"Dova Pharmaceuticals, Inc"
},
{

    Bid: 77.10,
    Ask: 77.12,
    ticker: "duk",
    region: "north",
    name:"Duke Energy Corporation"
},
{

    Bid: 32.53,
    Ask: 37.25,
    ticker: "FBNC",
    region: "north",
    name:"First Bancorp Inc"
},
{

    Bid: 14.00,
    Ask: 14.55,
    ticker: "FENC",
    region: "north",
    name:"Fennec Pharmaceuticals"
},
{

    Bid: 34.40,
    Ask: 37.96,
    ticker: "GTHX",
    region: "north",
    name:"G1 Therapeutics"
},
{

    Bid: 18.9000,
    Ask: 18.9100,
    ticker: "hbi",
    region: "southwest",
    name:"Hanesbrands Inc"

},
{

    Bid: 0.85,
    Ask: 1.33,
    ticker: "HTBX",
    region: "north",
    name:"Heat Biologics"
},
{

    Bid: 86.76,
    Ask: 86.79,
    ticker: "LOW",
    region: "north",
    name:"Lowe's Companies, Inc"
},

{

    Bid: 3.06,
    Ask: 3.80,
    ticker: "NOVN",
    region: "north",
    name:"Novan, Inc"
},

{

    Bid: 139.00,
    Ask: 150.00,
    ticker: "ODFL",
    region: "north",
    name:"Old Dominion Freight Line, Inc"
},

{

    Bid: 80.00,
    Ask: 89.50 ,
    ticker: "PRAH",
    region: "north",
    name:"PRA Health Sciences, Inc"
},
{

    Bid: 11.95,
    Ask: 12.97,
    ticker: "PRMW",
    region: "northwest",
    name:"Primo Water Corporation"
},
{

    Bid: 72.03,
    Ask: 73.26,
    ticker: "QRVO",
    region: "northwest",
    name:"Qorvo, Inc"

},

{
    Bid: 3.56,
    Ask: 5.85,
    ticker: "RMBL",
    region: "northwest",
    name:"RumbleON, Inc"
},

{

    Bid: 36.40,
    Ask: 40.95,
    ticker: "SYNH",
    name:"Syneos Health, Inc"
},

{
    Bid: 6.60,
    Ask: 6.70,
    ticker: "TENX",
    region: "northwest",
    name:"Tenax Therapeutics, Inc."
},

{
    Bid: 0.7300,
    Ask: 0.7600,
    ticker: "VTVT",
    region: "north",
    name:"vTv Therapeutics Inc"
},
{

    Bid: 0.90,
    Ask: 0.98,
    ticker: "XRM",
    region: "northeast",
    name:"Syneos Health, Inc"
}];


/*window.yafinance={
    params:{},
    data:{},
}

function getdata(){
    $.getJSON('https://raw.githubusercontent.com/Lucysaiheng/Yafinance/master/finance_total.json', function(data){
       window.yafinance.data = data;
        console.log ('data');
        initVis();


    })

}*/




var Bid= full_data.map(function(d){
    return d.Bid
})

var Ask= full_data.map(function(d){
    return d.Ask
})

var training_data = full_data.filter(function(d) { return ((d.region=="northwest") || (d.region=="south")); });
var test_data = full_data.filter(function(d) { return ((d.region!="northwest") && (d.region!="south")); });

training_data = training_data.map(function(d) { return expand(d, Bid, Ask)});
test_data = test_data.map(function(d) { return expand(d, Bid, Ask)});

var classifier = new ss.bayesian();
training_data.forEach(function(d) {
classifier.train({
    Bid: d.Bid_cat,
    Ask: d.Ask_cat
        }, d.region);
});


test_data.forEach(function(d) {
    var prob_vec = classifier.score({
        Bid: d.Bid_cat,
        Ask: d.Ask_cat
    });
    if (prob_vec.northwest > prob_vec.northwest) {
        d.label = "northwest";
    }
    else if (prob_vec.southwest > prob_vec.southwest) {
        d.label = "southwest";
    }
    else {
        d.label = "Unknown";
    }
});

var height = 500;
var width = 500;
var margin = 40;

var x = d3.scaleLinear()
    .domain([0,100])
    .range([margin,width-margin]);
var y = d3.scaleLinear()
    .domain([200,150])
    .range([margin,height-margin]);

var region_color = d3.scaleOrdinal(d3.schemeCategory10);


var svg;

function initVis() {
    // Create the SVG canvas that will be used to render the visualization.
    svg = d3.select("#vis_container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add axes.  First the X axis and label.
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (500 - margin) + ")")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("class", "axis-label")
        .attr("y", 495)
        .attr("x", 0 + (500 / 2))
        .style("text-anchor", "middle")
        .text("Bid Price");

    // Now the Y axis and label.
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin + ",0)")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", "rotate(90)")
        .attr("class", "axis-label")
        .attr("y", -5)
        .attr("x", 0 + (500 / 2))
        .style("text-anchor", "middle")
        .text("Ask Price");

    // Draw the baseline circles for the training set.
    var circles = svg.select(".baseline").data(training_data, function(d) {return d.name;});

    circles.enter().append("circle")
        .attr("class", "baseline")
        .attr("r", 4)
        .attr("cx", function(d) { return x(d.Bid); })
        .attr("cy", function(d) { return y(d.Ask); })
        .style("stroke", function(d) { return region_color(d.region); })
        .style("fill", function(d) { return region_color(d.region); })
        .style("fill-opacity", "0.1")
        .style("stroke-width", 1)
        .style("stroke-opacity", "0.2")
        .on("mouseover", function(){ document.getElementById("details").innerHTML = this.__data__.name + " Ask Price is $" + this.__data__.Ask + " and Bid price of $ " + this.__data__.Bid + ""; })
        .on("mouseout", function(){ document.getElementById("details").innerHTML = " "; });
    }

function renderVis(_subset) {
    var data_subset = test_data;
    if (_subset == "none") {
        data_subset = [];
    }
    else if (_subset != "us") {
        data_subset = test_data.filter(function(d) {return (d.label == _subset); });
    }

    var circles = svg.selectAll(".baseline").data(training_data, function(d) {return d.name;});

    circles.exit()
        .transition()
            .duration(250)
            .attr("r",0)
            .remove();

    circles.enter().append("circle")
        .attr("class", "label")
        .attr("r", 0)
        .attr("cx", function(d) { return x(d.Bid); })
        .attr("cy", function(d) { return y(d.Ask); })
        .style("fill", function(d) { return region_color(d.label); })
        .on("mouseover", function(){ document.getElementById("details").innerHTML = this.__data__.name + " Ask Price is $" + this.__data__.Ask + " and Bid price of $ " + this.__data__.Bid + ""; })
        .on("mouseout", function(){ document.getElementById("details").innerHTML = " "; })
        .transition()
            .duration(750)
            .attr("r",5)
}
/*function expand(d, Bid, Ask) {
    // 1. High/med/low
    if (d.Bid_cat < ss.quantile(Bid, 0.33)) {
        d.Bid_cat = "low";
    }
    else if (d.Bid > ss.quantile(Bid, 0.66)) {
        d.Bid_cat = "high";
    }
    else {
        d.Bid_cat = "med";
    }

    // Now repeat.
    if (d.Ask < ss.quantile(Ask, 0.33)) {
        d.Ask_cat = "low";
    }
    else if (d.Ask > ss.quantile(Ask, 0.66)) {
        d.Ask_cat = "high";
    }
    else {
        d.Ask = "med";
    }

    return d;
}*/


