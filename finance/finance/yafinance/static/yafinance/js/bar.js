window.yafinance={
    params:{},
    data:{},
}

function getdata(){
    $.getJSON('https://raw.githubusercontent.com/Lucysaiheng/Yafinance/master/finance_total.json', function(data){
       window.yafinance.data = data;
        console.log ('data');
        fillScatter();


    })

}



var full_data=window.yafinance.data

var Bid=full_data.map(function(d){
    return d.Bid
})

var Ask=full_data.map(function(d){
    return d.Ask
})

var training_data = full_data.filter(function(d) { return ((d.region=="Northeast") || (d.region=="South")); });
var test_data = full_data.filter(function(d) { return ((d.region!="Northeast") && (d.region!="South")); });

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
        Bid: d.life_expectancy_cat,
        Ask: d.poverty_rate_cat
    });
    if (prob_vec.Northeast > prob_vec.South) {
        d.label = "Northeast";
    }
    else if (prob_vec.South > prob_vec.Northeast) {
        d.label = "South";
    }
    else {
        d.label = "Unknown";
    }
});

