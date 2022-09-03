anychart.onDocumentReady(function () {
    anychart.data.loadJsonFile(
      //"https://gist.githubusercontent.com/shacheeswadia/21ddfa122938e676bf9e7911e1417d9a/raw/d28d7a22b968bb39d755285d28ce949b31276628/sparklineChartData.json",
      "./data.json",
      function (data) {
        // go through the data and add each season's info and charts to the table
        Object.entries(data).forEach(([key, value]) =>
          createSeason(key, data)
        );
      }
    );
  });

  function createSeason(season, data) {
    // get a table link
    var tbodyRef = document
      .getElementById("tb-seasons")
      .getElementsByTagName("tbody")[0];
    // insert a row at the end of the table
    var newRow = tbodyRef.insertRow();
    newRow.setAttribute("height", "30px");
    // append a season name text node to a cell
    newRow.insertCell().appendChild(document.createTextNode(season));
    // append a season rating cell
    newRow
      .insertCell()
      .appendChild(document.createTextNode(data[season].avg));
    // create a line sparkline chart showing ratings
    var lineDiv = createSparkline(
      data[season],
      "episodeRatings",
      "line",
      "#040102",
      "Rating",
      ""
    );
    // append it
    newRow.insertCell().appendChild(lineDiv);
    // create a column sparkline chart showing percentages
    var columnDiv = createSparkline(
      data[season],
      "percentOfAvg",
      "column",
      "#cf0011",
      "Percent of average",
      "%"
    );
    // append it
    newRow.insertCell().appendChild(columnDiv);
  }

  // create sparkline of a given type, color, and from a given field
  function createSparkline(
    data,
    field,
    type,
    color,
    tooltipText,
    tooltipPostfix
  ) {
    var sparkline = anychart.sparkline(data[field]);
    sparkline.seriesType(type);
    sparkline.fill(color).stroke(color);
    sparkline.tooltip().format(function () {
      var x = this.x + 1;
      return "E" + x + "-" + this.value + tooltipPostfix;
    });
    // create a div for the sparklines and assign a css class name
    var chartDiv = document.createElement("div");
    chartDiv.setAttribute("class", "chart");
    sparkline.container(chartDiv);
    sparkline.draw();
    return chartDiv;
  }