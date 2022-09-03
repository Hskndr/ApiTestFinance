/** Conexion con la API */

/* Declarar un Array de Ticker a Mostrar*/
ticker_symbol_0_Array = [
  // API FAKE

  ["todos", "1"],
  ["todos", "2"],
  ["todos", "3"],
  ["todos", "4"],
  ["todos", "5"],
  ["todos", "6"],
  /*["todos", "7"],
    ["todos", "8"],
    ["todos", "9"],
    ["todos", "10"],
    ["todos", "11"],
    ["todos", "12"],
    ["todos", "14"],
    ["todos", "15"],
    ["todos", "16"],
    ["todos", "17"],
    ["todos", "18"],
    ["todos", "19"],
    ["todos", "20"],
    ["todos", "21"],
    ["todos", "22"],
    ["todos", "23"],
    ["todos", "24"],
    ["todos", "25"],
    ["todos", "26"],
    ["todos", "27"],
    */

  // API REAL
  /*
    ["PZZA", "NASDAQ"],
    ["DNUT", "NASDAQ"],
    ["CBRL", "NASDAQ"],
    /*["SHAK", "NYSE"],
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

/* Datos para la conexion con la API */
const options = {
  method: "GET",
  headers: {
    //TODO: Remover para uso de la API Real  "X-RapidAPI-Key": "80a0b47832msh495ce34547296b7p12e3d0jsn9c8706d2a86d",
    //TODO: Remover para uso de la API Real  "X-RapidAPI-Host": "google-finance4.p.rapidapi.com",
  },
};

// Declara un Objeto vacio
allStockObject = {};

/* Recorrer ticker_symbol_0_Array y crear las url's */
ticker_symbol_0_Array.forEach(async function (ticker_symbol, index) {
  // Metodo para retrasar 200ms la llamada a la data de la API
  setTimeout(
    // Metodo para extraer la data de la API
    await getUrlStock(ticker_symbol[0], ticker_symbol[1], index),
    200
  );
  // Ver
  insertObjectToObjOrArray(stockObject, index);

  //console.log('stockObjectAll',allStockObject);

  lenghtAllStockObject = Object.keys(allStockObject);
  if (lenghtAllStockObject.length === ticker_symbol_0_Array.length) {
    //console.log(lenghtAllStockObject.length,'XXXX',ticker_symbol_0_Array.length);

    // Inicio de creacion de charts
    convertToJson(allStockObject);
    console.log(dataCharts);
    createCharts(dataCharts);
  }
});

/* Metodo para llamada fetch retorna la respuesta*/
async function getUrlStock(ticker_symbol_1, ticker_symbol_2, index) {
  // TODO: Eliminar console.log('Ejecucion del fetch',index);
  // TODO: Eliminar y reemplazar por original: llamada a API Fake
  await fetch(
    // API FAKE
    `https://jsonplaceholder.typicode.com/${ticker_symbol_1}/${ticker_symbol_2}`,

    // API REAL
    // `https://google-finance4.p.rapidapi.com/ticker/?t=${ticker_symbol_1}%3A${ticker_symbol_2}&hl=en&gl=US`,

    options
  )
    .then((response) => response.json())
    .then((response) => {
      //TODO:EMILINAR console.log(response);
      createObject(response, index);
    })
    .catch((err) => console.error(err));
}

/** Metodo para crear un objeto estructurado */
async function createObject(dataRes, index) {
  // Declaracion de variables

  // API FAKE

  let market_cap = dataRes.userId,
    name_company = dataRes.id,
    price = dataRes.title,
    today = dataRes.completed,
    price_daily = dataRes.title,
    price_monthly = dataRes.title,
    country_name = dataRes.title;

  // API REAL
  /*
  let charts1dayArray = [],
      charts1monthArray = [],
      charts1day = dataRes.charts['1day'].forEach((resChart)=>{charts1dayArray.push(resChart.price)}),
      charts1month = dataRes.charts['1month'].forEach((resChart)=>{charts1monthArray.push(resChart.price)});
  
  let market_cap = dataRes.stats.market_cap,
          name_company = dataRes.about.name,
          price = dataRes.price.last.value,
          today = dataRes.price.last.today_change_percent,
          price_daily = charts1dayArray,
          price_monthly = charts1monthArray, 
          country_name = dataRes.about.headquarters.country;
  */

  // Crear el Objeto stockObject
  stockObject = {};

  // Ingresar los valores en el Objeto
  stockObject.market_cap = market_cap;
  stockObject.name_company = name_company;
  stockObject.price = price;
  stockObject.today = today;
  stockObject.price_daily = price_daily;
  stockObject.price_monthly = price_monthly;
  stockObject.country_name = country_name;

  // Mostrar el Objeto en consola
  //TODO: ELIMINAR console.log(stockObject,'stockObject');
  insertObjectToObjOrArray(stockObject, index);
}

/* Agregar en Array o en Objeto */
async function insertObjectToObjOrArray(objs, index) {
  // Ingresar objs en el objeto Array
  allStockObject[`S${index}`] = objs;
  //console.log(allStockObject,'Final');
}

/** CREAR UN ARCHIVO JSON Y ACTUALIZARLO PARA QUE MUESTRE LA DATA. */

function convertToJson(objs) {
  dataCharts = JSON.stringify(objs);
  // console.log(dataCharts,'Para return');
  // Ingregar a la funcion

  return dataCharts;
}

/** CREAR UN ARCHIVO JSON Y ACTUALIZARLO PARA QUE MUESTRE LA DATA. */

function createCharts(json) {
  console.log(json,'JSON');

  /* Creacion de Data SET */
  let dataSET = "./data.json";
  // let dataSET ={"S0":{"market_cap":1,"name_company":1,"price":"delectus aut autem","today":false,"price_daily":"delectus aut autem","price_monthly":"delectus aut autem","country_name":"delectus aut autem"},"S1":{"market_cap":1,"name_company":2,"price":"quis ut nam facilis et officia qui","today":false,"price_daily":"quis ut nam facilis et officia qui","price_monthly":"quis ut nam facilis et officia qui","country_name":"quis ut nam facilis et officia qui"},"S3":{"market_cap":1,"name_company":4,"price":"et porro tempora","today":true,"price_daily":"et porro tempora","price_monthly":"et porro tempora","country_name":"et porro tempora"},"S4":{"market_cap":1,"name_company":5,"price":"laboriosam mollitia et enim quasi adipisci quia provident illum","today":false,"price_daily":"laboriosam mollitia et enim quasi adipisci quia provident illum","price_monthly":"laboriosam mollitia et enim quasi adipisci quia provident illum","country_name":"laboriosam mollitia et enim quasi adipisci quia provident illum"},"S2":{"market_cap":1,"name_company":3,"price":"fugiat veniam minus","today":false,"price_daily":"fugiat veniam minus","price_monthly":"fugiat veniam minus","country_name":"fugiat veniam minus"},"S5":{"market_cap":1,"name_company":6,"price":"qui ullam ratione quibusdam voluptatem quia omnis","today":false,"price_daily":"qui ullam ratione quibusdam voluptatem quia omnis","price_monthly":"qui ullam ratione quibusdam voluptatem quia omnis","country_name":"qui ullam ratione quibusdam voluptatem quia omnis"}};
   console.log('=>',dataSET);

  /**  Usar AnyChart para los charts */
  anychart.onDocumentReady(function () {
    anychart.data.loadJsonFile(
      dataSET,
      function (data) {
        // go through the data and add each season's info and charts to the table
        Object.entries(data).forEach(([key, value]) => createSeason(key, data));
      }
    );
  });

}

/** Crear los Charts */
function createSeason(season, data) {
  //console.log("data inside createSeason ", data, season);

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
  newRow
    .insertCell()
    .appendChild(document.createTextNode(data[season].name_company));

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
