// SI FUNCIONA
// CONEXION DE API GOOGLE FINANCE DE RAPIDAPI

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "80a0b47832msh495ce34547296b7p12e3d0jsn9c8706d2a86d",
    "X-RapidAPI-Host": "google-finance4.p.rapidapi.com",
  },
};
// INCORPORACION DE DATOS EN EL HTML
const HTMLResponse = document.querySelector("#app");
const ul = document.createElement("ul");

// Recorrer array y mostrar en el html
//TODO: Retrasar a 5 peticiones por segundo
let ticker_symbol_0_Array = [
    ["PZZA", "NASDAQ"],
    /*["DNUT", "NASDAQ"],
    ["CBRL", "NASDAQ"],
    ["SHAK", "NYSE"],
    ["SG", "NYSE"],
    ["PLAY", "NASDAQ"],
    ["BLMN", "NASDAQ"],
    ["PTLO", "NASDAQ"],
    ["CAKE", "NASDAQ"],
    ["ARCO", "NYSE"],
    ["JACK", "NASDAQ"],
    ["DIN", "NYSE"],
    ["EAT", "NYSE"],
    ["FWRG", "NASDAQ"],
    ["KRUS", "NASDAQ"],
    ["RUTH", "NASDAQ"],
    ["DENN", "NASDAQ"],
    ["BJRI", "NASDAQ"],
    ["CHUY", "NASDAQ"],
    ["LOCO", "NASDAQ"],
    ["BH", "NYSE"],
    ["STKS", "NASDAQ"],
    ["NDLS", "NASDAQ"],
    ["NATH", "NASDAQ"],
    ["FRGI", "NASDAQ"],
    ["PBPB", "NASDAQ"],
    ["RRGB", "NASDAQ"],
    ["FAT", "NASDAQ"],
    ["BBQ", "NASDAQ"],
    ["TAST", "NASDAQ"],
    ["BFI", "NASDAQ"],
    ["ARKR", "NASDAQ"],
    ["FCCI", "OTCMKTS"],
    ["BDL", "NYSEAMERICAN"],
    ["GTIM", "NASDAQ"],
    ["RAVE", "NASDAQ"],
    ["GRIL", "NASDAQ"],*/
];

// Objeto stockAllObject para guardar la info de todos stock
stockAllObject = [];
// recorrer ticker_symbol_0_Array Arrays PARA GENERAR LAS URLS DE LOS STOCKS
ticker_symbol_0_Array.forEach(async function (ticker_symbol, index) {
  // Metodo para extraer la data de la API
  setTimeout(
    await getUrlStock(ticker_symbol[0], ticker_symbol[1], index),
    200
  );
  // Comprobar que el se haya recorrido todo el array
  if (stockAllObject.length === ticker_symbol_0_Array.length) {
    console.log(stockAllObject, "Objeto dentro del for pasaron 200ms");
    dataSetChart = stockAllObject;
    console.log(dataSetChart,'dataSetChart');
    
    //Creacion de Data Set
    anychart.onDocumentReady( function () { 
      // create data set on our data
      var dataSet = anychart.data.set(dataSetChart);
      console.log(dataSet.oc,'Ondocument2');
       Object.entries(dataSet.oc).forEach(([key, value]) => createSeason(key, dataSet.oc));
    });
  }
});
// Funcion para obtener las URL's
async function getUrlStock(ticker_symbol_1, ticker_symbol_2, index) {
  // Crear las URL's con los ticker
  await fetch(
    `https://google-finance4.p.rapidapi.com/ticker/?t=${ticker_symbol_1}%3A${ticker_symbol_2}&hl=en&gl=US`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      /*console.log(
          response,
          "Response Request",
          typeof response,
          "TYpe Response"
        ); */

      //Arrays para guardar los precios
      let charts1dayArray = [];
      let charts1monthArray = [];
      let charts1day = response.charts['1day'].forEach((resChart)=>{charts1dayArray.push(resChart.price)});
      let charts1month = response.charts['1month'].forEach((resChart)=>{charts1monthArray.push(resChart.price)});
      console.log(charts1dayArray,'array day');
      console.log(charts1monthArray,'array month');

      // Variables para agregar al stockObject
      let market_cap = response.stats.market_cap,
          name_company = response.about.name,
          price = response.price.last.value,
          today = response.price.last.today_change_percent,
          price_daily = charts1dayArray,
          price_monthly = charts1monthArray, 
          country_name = response.about.headquarters.country,
        id = index + 1;

      //Objeto stockObject para guardar la info un stock
      let stockObject = {};
      stockObject.market_cap = market_cap;
      stockObject.name_company = name_company;
      stockObject.price = price;
      stockObject.today = today;
      stockObject.price_daily = price_daily;
      stockObject.price_monthly = price_monthly;
      stockObject.country_name = country_name;
     
      // Objeto para agregar otro Objeto
      StockUniqueObject = {};
      StockUniqueObject[id] = stockObject;
      // console.log(StockUniqueObject,'onjeto');

      // Agregar el objeto unico en el Array
      stockAllObject.push(StockUniqueObject);

      // Crea la lista para agregarlo en el Ejemplo.
      /*let elem = document.createElement("li");
      elem.appendChild(
        //document.createTextNode(`Company Name: ${response.about.name} | Price: ${response.price.last.value} | Market Cap: ${response.stats.market_cap} | Today: ${response.price.last.today_change_percent} | Price 1 Day:  ${charts1dayArray} | Price 1 Month:  ${charts1monthArray} | Country:  ${response.about.headquarters.country}`)
        document.createTextNode(
          `Company Name: ${name_company} | Price: ${price} | Market Cap: ${market_cap} | Today: ${today} | Price 1 Day:  ${price_daily} | Price 1 Month:  ${price_monthly} | Country:  ${country_name}`
        )
      );
      ul.appendChild(elem);

      HTMLResponse.appendChild(ul);*/
    })
    .catch((err) => console.error(err));

  // Final del get URL
}


// ANY CHAT AND TABLE SORTABLE

//let dataSrc = "https://gist.githubusercontent.com/shacheeswadia/21ddfa122938e676bf9e7911e1417d9a/raw/d28d7a22b968bb39d755285d28ce949b31276628/sparklineChartData.json";
//let dataSrc = "https://gist.githubusercontent.com/shacheeswadia/21ddfa122938e676bf9e7911e1417d9a/raw/d28d7a22b968bb39d755285d28ce949b31276628/sparklineChartData.json";
let dataSrc = "./data.json";
let dataSrcO = stockAllObject;

// Ejemplo de AnyChart
function getData() {
  return [
    {
      1: {
        market_cap: 1,
        name_company: 1,
        price: "delectus aut autem",
        today: false,
        price_daily: "delectus aut autem",
        price_monthly: "delectus aut autem",
        country_name: "delectus aut autem",
      },
    },
    {
      2: {
        market_cap: 1,
        name_company: 2,
        price: "quis ut nam facilis et officia qui",
        today: false,
        price_daily: "quis ut nam facilis et officia qui",
        price_monthly: "quis ut nam facilis et officia qui",
        country_name: "quis ut nam facilis et officia qui",
      },
    },
    {
      3: {
        market_cap: 1,
        name_company: 3,
        price: "fugiat veniam minus",
        today: false,
        price_daily: "fugiat veniam minus",
        price_monthly: "fugiat veniam minus",
        country_name: "fugiat veniam minus",
      },
    },
  ];
}

console.log(dataSrcO,'dataSrc');
console.log(getData(),'getData');
//OTHER
/*
anychart.onDocumentReady( function () { 
  // create data set on our data
  var dataSet = anychart.data.set(stockAllObject);
  var dataSet = anychart.data.set(dataSetChart);
  console.log(dataSet.oc,'Ondocument2');
   Object.entries(dataSet.oc).forEach(([key, value]) => awaitcreateSeason(key, dataSet.oc));
});
*/
/*
anychart.onDocumentReady(function () {

  anychart.data.loadJsonFile(dataSrc, function (data) {
    console.log(data,'Ondocument');
    // go through the data and add each season's info and charts to the table
    Object.entries(data).forEach(([key, value]) => createSeason(key, data));
  });
  
});
*/
//console.log("Before createSeason");

 function createSeason(season, data) {
  console.log("data inside createSeason ", data, season);

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
  newRow.insertCell().appendChild(document.createTextNode(data[season].name_company));

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

// console.log("lenght", tables);
// cuantas tablas existen
for (i = 0; i < tables.length; i++) {
  table = tables[i];
  // console.log("table Nro: ", i);

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

// SI FUNCIONA
