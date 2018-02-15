var width = window.innerWidth,
height = 1100;

var fill = d3.scale.category10();

var nodes = d3.range(100).map(function(i) {
  return {index: i};
});


var currentCon=.1;


var force = d3.layout.force()
.nodes(nodes)
.size([width, height])
.on("tick", tick)
.start();

var svg = d3.select("#board").append("svg")
.attr("width", width)
.attr("height", height);

var node = svg.selectAll(".node")
.data(nodes)
.enter().append("circle")
.attr("class", "node")
.attr("cx", function(d) { return d.x; })
.attr("cy", function(d) { return d.y; })
.attr("r", 8)
.style("fill", function(d, i) { return fill(i & 3); })
.style("stroke", function(d, i) { return d3.rgb(fill(i & 3)).darker(2); })
.call(force.drag)
.on("mousedown", function() { d3.event.stopPropagation(); });



svg.style("opacity", 1e-6)
.transition()
.duration(500)
.style("opacity", 1);

d3.select("#board")
.on("mousedown", mousedown);

function tick(e) {

  // Push different nodes in different directions for clustering.
  var k = currentCon * e.alpha;
  nodes.forEach(function(o, i) {
    o.y += -0.4*k;
    o.x += ((i%4)-1.5)*k;
  });

  node.attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; });
}

function mousedown() {
  nodes.forEach(function(o, i) {
    o.x += (Math.random() - .5) * 40;
    o.y += (Math.random() - .5) * 40;
  });

  currentCon=currentCon==.1?15:.1;
  
  force.resume();
}