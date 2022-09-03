// SI FUNCIONA
  anychart.onDocumentReady(function () {
    anychart.data.loadJsonFile(
      //"https://gist.githubusercontent.com/shacheeswadia/21ddfa122938e676bf9e7911e1417d9a/raw/d28d7a22b968bb39d755285d28ce949b31276628/sparklineChartData.json",
      "./data.json",
      function (data) {
        // go through the data and add each season's info and charts to the table
        Object.entries(data).forEach(([key, value]) => createSeason(key, data));
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
    newRow.setAttribute("height", "4rem");
    // append a season name text node to a cell
    newRow.insertCell().appendChild(document.createTextNode(season));

    // Create a image element Hiska
    var imageLogo = document.createElement("img");
    imageLogo.setAttribute("src", data[season].logo);
    // Append
    newRow.insertCell().appendChild(imageLogo);

    // append logo Hiska
    newRow.insertCell().appendChild(document.createTextNode(data[season].name));

    // append a Price rating cell
    newRow
      .insertCell()
      .appendChild(document.createTextNode(data[season].market_cap));

    // append a Price rating cell
    newRow.insertCell().appendChild(document.createTextNode(data[season].price));

    // append a Price rating cell
    newRow.insertCell().appendChild(document.createTextNode(data[season].today));

    // create a line sparkline chart showing ratings
    var lineDiv = createSparkline(
      data[season],
      "price_monthly",
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
      "price_daily",
      "column",
      "#cf0011",
      "Percent of average",
      "%"
    );
    // append it
    newRow.insertCell().appendChild(columnDiv);

    // append a Price rating cell
    newRow
      .insertCell()
      .appendChild(document.createTextNode(data[season].country_name));
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
// SI FUNCIONA

//SI FUNCIONA https://javascript.plainenglish.io/easy-table-sorting-with-javascript-370d8d97cad8
  var tables = document.querySelectorAll(".sortable"),
    table,
    thead,
    headers,
    i,
    j;

  console.log("lenght",tables)
  // cuantas tablas existen
  for (i = 0; i < tables.length; i++) {
    table = tables[i];
    console.log('table Nro: ',i)

    // Agregar enlace a los encabezados de la tabla
    if (thead = table.querySelector("thead")) {
      headers = thead.querySelectorAll("th");
      for (j = 0; j < headers.length; j++) {
        headers[j].innerHTML = "<a href='#'>" + headers[j].innerText + "</a>";
      }
      // Agregamos un evento
      thead.addEventListener("click", sortTableFunction(table));
    }
  }

  // Funcion para ordenar la tabla por columnas
  function sortTableFunction(table) { 
    return function(ev) { 
        if (ev.target.tagName.toLowerCase() == 'a') { 
            sortRows(table, siblingIndex(ev.target.parentNode)); 
            ev.preventDefault(); 
        } 
    }; 
  }

  function siblingIndex(node) {
    var count = 0;

    while (node = node.previousElementSibling) {
        count++;
    }

    return count;
}

  function sortRows(table, columnIndex) { 
    //Obtener los valores de la tabla
    var rows = table.querySelectorAll("tbody tr"),
      sel = "thead th:nth-child(" + (columnIndex + 1) + ")",
      sel2 = "td:nth-child(" + (columnIndex + 1) + ")",
      classList = table.querySelector(sel).classList,
      values = [],
      cls = "",
      allNum = true,
      val,
      index,
      node;

    if (classList) {
      if (classList.contains("date")) {
        cls = "date";
      } else if (classList.contains("number")) {
          cls = "number";
        }
    }

    for (index = 0; index < rows.length; index++) {
      node = rows[index].querySelector(sel2);
      val = node.innerText;
      if (isNaN(val)) {
        allNum = false;
      } else {
        val = parseFloat(val);
      }
      values.push({ value: val, row: rows[index] });
    }

    if (cls == "" && allNum) {
      cls = "number";
    }

    if (cls == "number") {
        values.sort(sortNumberVal);
        values = values.reverse();
    } else if (cls == "date") {
        values.sort(sortDateVal);
    } else {
        values.sort(sortTextVal);
    }

    for (var idx = 0; idx < values.length; idx++) {
        table.querySelector("tbody").appendChild(values[idx].row);
    }

  }

  /**
  * Compare two 'value objects' numerically
  */
  function sortNumberVal(a, b) {
    return sortNumber(a.value, b.value);
  }

  /**
  * Numeric sort comparison
  */
  function sortNumber(a, b) {
    return a - b;
  }

  /**
  * Compare two 'value objects' as dates
  */
  function sortDateVal(a, b) {
    var dateA = Date.parse(a.value),
        dateB = Date.parse(b.value);

    return sortNumber(dateA, dateB);
  }

  /**
  * Compare two 'value objects' as simple text; case-insensitive
  */
  function sortTextVal(a, b) {
    var textA = (a.value + "").toUpperCase();
    var textB = (b.value + "").toUpperCase();

    if (textA < textB) {
        return -1;
    }

    if (textA > textB) {
        return 1;
    }

    return 0;
  }

//PRUEBA



