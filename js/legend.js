function DisplayLegend(mainCharacters) {
    var color = d3.scale.ordinal().domain(mainCharacters).range(d3.scale.category20().range());
    var legendRectSize = 20;
    var legendSpacing = 4;
    var svg = d3.select("#svg_vis")

    var legend = svg.selectAll('.legend')
        .data(mainCharacters)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            //var offset =  height * mainCharacters.length / 2;
            var horz = 0;
            var vert = i * height + 70;
            return 'translate(' + horz + ',' + vert + ')';
    });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function(d, i){
            console.log(d)
            console.log('inside style fill')
            return color(d);
        })
        .style('stroke', function(d, i){
            return color(d);
        });

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d; });
}