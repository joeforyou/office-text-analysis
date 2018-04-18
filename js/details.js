function ShowTextDetails(speakerObject) {

    var mainCharacters = ["Michael", "Dwight", "Jim","Pam","Ryan","Andy","Stanley","Kevin","Meredith","Angela","Oscar","Phyllis","Kelly","Toby","Creed"];

    var margin = {top: 0, right: 20, bottom: 50, left: 100},
        width = 570 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom,
        padding = 40;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .05);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickPadding(20)
        .orient("bottom");
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);

    var svg = d3.select("#textChart");

    svg.selectAll("*").remove();

    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var speaker = speakerObject.speaker;
    var season = speakerObject.season;

    //Character name
    $("#character-name").html(speaker);
    $("#season-number").html("<strong>Season:</strong> " + season);
    $("#season-line-count").html("<strong>Number of lines: </strong>" + addCommas(speakerObject.value));
    if(mainCharacters.includes(speaker)){
        $("#character-photo").html("<img width='150px' src='photos/" + speaker + ".jpg'>");
    } else {
        $("#character-photo").html("<img width='150px' src='photos/other.jpg'>");
    }

    $("#textChart-title").html("Top ten words");

    d3.csv("data/the-office-lines-text-by-character.csv", function(d) {
        if(d.character == speaker && d.season == season){
            return {
                word: d.word,
                order: d.order,
                frequency: +d.frequency,
                character: d.character,
                season: d.season
            };
        }
    }, function(data){
        x.domain(data.map(function(d) { return d.word; }));
        y.domain([0, d3.max(data, function(d){ return d.frequency; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + padding +"," + height + ")")
            .call(xAxis)
  
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform","translate(" + padding + ",0)")
            .call(yAxis)

        svg.selectAll(".bar")
            .data(data)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.word) + padding; })
            .attr("y", function(d) { return y(d.frequency); })
            .attr("height", function(d) { return height - y(d.frequency); })
            .attr("margin", "60px")
            .attr("width", x.rangeBand() - 10);
        
    });

}