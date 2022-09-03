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
    "#005074",
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
    "#005074",
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

console.log("lenght", tables);
// cuantas tablas existen
for (i = 0; i < tables.length; i++) {
  table = tables[i];
  console.log("table Nro: ", i);

  // Agregar enlace a los encabezados de la tabla
  if ((thead = table.querySelector("thead"))) {
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
  return function (ev) {
    if (ev.target.tagName.toLowerCase() == "a") {
      sortRows(table, siblingIndex(ev.target.parentNode));
      ev.preventDefault();
    }
  };
}

function siblingIndex(node) {
  var count = 0;

  while ((node = node.previousElementSibling)) {
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

// CONEXION DE API GOOGLE FINANCE
const options = {
  method: "GET",
  headers: {
    'X-RapidAPI-Key': '80a0b47832msh495ce34547296b7p12e3d0jsn9c8706d2a86d',
		'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
  },
};
const HTMLResponse = document.querySelector("#app");

const ul = document.createElement("ul");
// Macdonals
// fetch("https://google-finance4.p.rapidapi.com/search/?q=McDonald's&hl=en&gl=US", options)
// Starbucks
// fetch("https://google-finance4.p.rapidapi.com/search/?q=Starbucks&hl=en&gl=US", options)
// ChipotleMexicanGrill
// fetch("https://google-finance4.p.rapidapi.com/search/?q=ChipotleMexicanGrill&hl=en&gl=US", options)
// yum
fetch("https://google-finance4.p.rapidapi.com/search/?q=Yum&hl=en&gl=US", options)
  .then((response) => response.json())
  .then((response) => {
    response.forEach((res) => {
      let elem = document.createElement("li");
      elem.appendChild(document.createTextNode(`Company Name: ${res.info.title} |  Country: ${res.info.country_code}`));
      ul.appendChild(elem);
      
    });
    HTMLResponse.appendChild(ul)
  })
  .catch((err) => console.error(err));

// SI FUNCIONA

// Crear Objeto JS https://www.freecodecamp.org/espanol/news/javascript-crear-objecto-como-definir-objetos-en-js/

//Modelo de Objeto
/*
const liveStock = {
  idStock: {
    market_cap: 196.09,
    logo: "https://companiesmarketcap.com/img/company-logos/64/MCD.webp",
    name: "McDonald",
    price: 266.54,
    today: 0.01,
    price_monthly: [8.3,8.4,8.2,8.2,8.4,8.2,8.4,8.2,8.7],
    price_daily: [100,101,98.8,98.8,101,98.8,101,98.8,104],
    country_name: "USA-1",
    country_flag: "https://w7.pngwing.com/pngs/615/195/png-transparent-flag-of-the-united-states-2018-mini-cooper-decal-sticker-us-flag-flag-label-text-thumbnail.png"
  }
}
console.log(liveStock.idStock.price)
*/

/*
const market_cap = 196.09;
const logo = "https://companiesmarketcap.com/img/company-logos/64/MCD.webp";
const name = "McDonald";
const price = 266.54;
const today = 0.01;
const price_monthly = [8.3,8.4,8.2,8.2,8.4,8.2,8.4,8.2,8.7];
const price_daily = [100,101,98.8,98.8,101,98.8,101,98.8,104];
const country_name = "USA-1";
const country_flag = "https://w7.pngwing.com/pngs/615/195/png-transparent-flag-of-the-united-states-2018-mini-cooper-decal-sticker-us-flag-flag-label-text-thumbnail.png";


const liveStock = {
  idStock: {
    market_cap: market_cap,
    logo: logo,
    name: name,
    price: price,
    today: today,
    price_monthly: price_monthly,
    price_daily: price_daily,
    country_name: country_name,
    country_flag: country_flag
  }
}
console.log(liveStock.idStock.price)

const prototypeLiveStock = {
  addLiveStock: function(liveStock) {
    if(!this.liveStocks){
      this.liveStocks = [liveStock]
    } else {
      this.liveStocks.push(liveStock);
    }
  },
}

*/
/*
const nameStock = "";
const price = 0;

const liveStock = {
    nameStock,
    price,
}

const prototypeLiveStock = {
  // Array para agrupar los stocks
  liveStocks:[],
  // Metodo para agregar estos en el Array
  addLiveStock: function(liveStock) {
    if(!this.liveStocks) {
      this.liveStocks = [liveStock]
    } else {
      this.liveStocks.push(liveStock);
    }
  },
  getPriceLiveStock: function() {
    return this.liveStocks.reduce((total,p) => total + p.price)
  }
}

const liveStockGroup = Object.create(prototypeLiveStock);

liveStockGroup.addLiveStock({nameStock:'MDC',price: 200});
//console.log(liveStockGroup,'group');
//console.log('stock',liveStock)
*/
//https://www.freecodecamp.org/espanol/news/javascript-crear-objecto-como-definir-objetos-en-js/

