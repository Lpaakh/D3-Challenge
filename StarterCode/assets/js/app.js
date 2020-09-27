//     Scatter plot design using D3.js
//     By: Laura Paakh May

// Set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Create x and y variables to be used for scaling
var x = d3.scaleLinear()
    .range([0, width]);
var y = d3.scaleLinear()
    .range([height, 0]);

// Set variable equal to svg to connect with html file and set margins 
var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read the data from the csv
d3.csv("./assets/data/data.csv").then(function(data) { 

    // Coerce the strings to numbers.
    data.forEach(function(d) {
        d.age = +d.age;
        d.smokes = +d.smokes;
    });

    // Compute the scales domains.
    x.domain(d3.extent(data, function(d) { return d.age; })).nice();
    y.domain(d3.extent(data, function(d) { return d.smokes; })).nice();

    // Add the x-axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add label to the x-axis.
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width/2 + margin.left)
        .attr("y", height + margin.top + 20)
        .text("Age (years)");
 
    // Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    // Add label to the y-axis.
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top - height/2 + 20)
        .attr("transform", "rotate(-90)")
        .text("Smokers");

    // Add the points
    svg.selectAll(".point")
        .data(data)
        .enter().append("circle")
        .attr("class", "point")
        .attr("d", d3.symbol().type(d3.symbolCircle))
        .attr("transform", function(d) { return "translate(" + x(d.age) + "," + y(d.smokes) + ")"; })
        .attr("r",10 )
        .attr("fill","gray")
        ;

    // Add the state abbreviations to each dot
    svg.selectAll(".abbr")
        .data(data)
        .enter().append("text")
        .attr("class", "abbr")
        .attr("x", function(d) { return x(d.age) -15; })
        .attr("y", function(d) { return y(d.smokes); })
        .attr("dx", ".71em")
        .attr("dy", ".35em")
        .text(function(d) { return d.abbr;})
        .attr("fill","white")
        .attr("font-size","10"); 
    });

