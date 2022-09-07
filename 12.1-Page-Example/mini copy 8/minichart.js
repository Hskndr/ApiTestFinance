/** Conexion con la API */

/* Declarar un Array de Ticker a Mostrar*/
ticker_symbol_0_Array = [
  // API FAKE
  /*
  ["todos", "1"],
  ["todos", "2"],
  ["todos", "3"],
  ["todos", "4"],
  ["todos", "5"],
  ["todos", "6"],
  ["todos", "7"],
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

  ["MCD", "NYSE"],
  ["SBUX", "NASDAQ"],
  ["CMG", "NYSE"],
  ["YUM", "NYSE"],
  ["QSR", "NYSE"],
  ["YUMC", "NYSE"],
  ["DRI", "NYSE"],
  ["DPZ", "NYSE"],
  ["ARMK", "NYSE"],
  ["BROS", "NYSE"],
  ["TXRH", "NASDAQ"],
  ["WEN", "NASDAQ"],
  ["WING", "NASDAQ"],
  ["PZZA", "NASDAQ"],
  ["DNUT", "NASDAQ"],
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
  ["GRIL", "NASDAQ"],
];

/* Datos para la conexion con la API */
const options = {
  method: "GET",
  headers: {
    // TODO: Correo hiskander@gmail.com NO USAR esta en el limite mensual
    //TODO: Remover para uso de la API Real  "X-RapidAPI-Key": "80a0b47832msh495ce34547296b7p12e3d0jsn9c8706d2a86d",
    //TODO: Remover para uso de la API Real  "X-RapidAPI-Host": "google-finance4.p.rapidapi.com",

    // Correo Hskndr477@gmail.com Inicio el 04/09/22
    "X-RapidAPI-Key": "dfb97cccb1mshcab013048aceec7p187dbajsn1dfbc3b89e80",
    "X-RapidAPI-Host": "google-finance4.p.rapidapi.com",
  },
};

// Declara un Objeto vacio
allStockObject = {};

/* Recorrer ticker_symbol_0_Array y crear las url's */
ticker_symbol_0_Array.forEach(async function (ticker_symbol, index) {
  // Metodo para retrasar 200ms la llamada a la data de la API src https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
  setTimeout(async function () {
    // Metodo para extraer la data de la API
    await getUrlStock(ticker_symbol[0], ticker_symbol[1], index);
    console.log("retrasado 200ms", ticker_symbol[0], ticker_symbol[1]);
    // Ver
    insertObjectToObjOrArray(stockObject, index);

    //console.log('stockObjectAll',allStockObject);

    lenghtAllStockObject = Object.keys(allStockObject);
    if (lenghtAllStockObject.length === ticker_symbol_0_Array.length) {
      //console.log(lenghtAllStockObject.length,'XXXX',ticker_symbol_0_Array.length);

      // Convertir objeto a json
      // convertToJson(allStockObject);
      //console.log(dataCharts);
      console.log("ready");

      //Crear archivo
      //createJSONFile(dataCharts);

      // Inicio de creacion de charts
      //createCharts(dataCharts);
      await createCharts(allStockObject);
    }
  }, index * 500);
});

/* Metodo para llamada fetch retorna la respuesta*/
async function getUrlStock(ticker_symbol_1, ticker_symbol_2, index) {
  // TODO: Eliminar console.log('Ejecucion del fetch',index);
  // TODO: Eliminar y reemplazar por original: llamada a API Fake
  await fetch(
    // API FAKE
    //`https://jsonplaceholder.typicode.com/${ticker_symbol_1}/${ticker_symbol_2}`,

    // API REAL
    `https://google-finance4.p.rapidapi.com/ticker/?t=${ticker_symbol_1}%3A${ticker_symbol_2}&hl=en&gl=US`,

    options
  )
    .then((response) => response.json())
    .then((response) => {
      //TODO:EMILINAR
      console.log(response);
      createObject(response, index);
    })
    .catch((err) => console.error(err));
}

/** Metodo para crear un objeto estructurado */
async function createObject(dataRes, index) {
  // Declaracion de variables

  // API FAKE
  /*
  let market_cap = dataRes.userId,
    name_company = dataRes.id,
    price = dataRes.title,
    today = dataRes.completed,
    price_daily = dataRes.title,
    price_monthly = dataRes.title,
    country_name = dataRes.title;
  */
  // API REAL

  //console.log(dataRes,'DATA__RES');
  let charts1dayArray = [],
    charts1monthArray = [],
    charts1day = dataRes.charts["1day"].forEach((resChart) => {
      charts1dayArray.push(resChart.price);
    }),
    charts1month = dataRes.charts["1month"].forEach((resChart) => {
      charts1monthArray.push(resChart.price);
    });

  let market_cap = dataRes.stats.market_cap,
    name_company = dataRes.about.name,
    price = dataRes.price.last.value,
    today = dataRes.price.last.today_change_percent,
    price_daily = charts1dayArray,
    price_monthly = charts1monthArray,
    country_name = dataRes.about.headquarters.country;

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
  allStockObject[`${index}`] = objs;
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
/*
function createJSONFile(jsonData){
  fileName='jsonchartdata';
  console.log(jsonData,'json data a convertir');
  
    const a = document.createElement("a");
    console.log(a,'json data  convertir');

    const file = new Blob([jsonData], { type: 'application/json' });
    console.log(file,'File');
    // Crea una URL TODO: Descomentar.
    //const url = URL.createObjectURL(file);
    const url = '~/Users/hskndr/Documents/UPWORK/6-Guadalupe/ApiTestFinance/12.1-Page-Example/mini%20copy%208/data.json'
    console.log(url,'url');
    a.href = url;
    console.log(a,a.href);
    a.download = fileName;
    a.click();
    //console.log(a.href,'<= a.href',a.download,'<= a.download',a.click(),'<= a.click');
    URL.revokeObjectURL(url);

};

// CDN Github  ver https://gomakethings.com/how-to-turn-any-github-repo-into-a-cdn/
urlCDN = 'https://cdn.jsdelivr.net/gh/Hskndr/ApiTestFinance'
/** CREAR UN ARCHIVO JSON Y ACTUALIZARLO PARA QUE MUESTRE LA DATA. */

/* Creacion de Data SET */
let dataSET = "./data.json";
// let dataSET ={"S0":{"market_cap":1,"name_company":1,"price":"delectus aut autem","today":false,"price_daily":"delectus aut autem","price_monthly":"delectus aut autem","country_name":"delectus aut autem"},"S1":{"market_cap":1,"name_company":2,"price":"quis ut nam facilis et officia qui","today":false,"price_daily":"quis ut nam facilis et officia qui","price_monthly":"quis ut nam facilis et officia qui","country_name":"quis ut nam facilis et officia qui"},"S3":{"market_cap":1,"name_company":4,"price":"et porro tempora","today":true,"price_daily":"et porro tempora","price_monthly":"et porro tempora","country_name":"et porro tempora"},"S4":{"market_cap":1,"name_company":5,"price":"laboriosam mollitia et enim quasi adipisci quia provident illum","today":false,"price_daily":"laboriosam mollitia et enim quasi adipisci quia provident illum","price_monthly":"laboriosam mollitia et enim quasi adipisci quia provident illum","country_name":"laboriosam mollitia et enim quasi adipisci quia provident illum"},"S2":{"market_cap":1,"name_company":3,"price":"fugiat veniam minus","today":false,"price_daily":"fugiat veniam minus","price_monthly":"fugiat veniam minus","country_name":"fugiat veniam minus"},"S5":{"market_cap":1,"name_company":6,"price":"qui ullam ratione quibusdam voluptatem quia omnis","today":false,"price_daily":"qui ullam ratione quibusdam voluptatem quia omnis","price_monthly":"qui ullam ratione quibusdam voluptatem quia omnis","country_name":"qui ullam ratione quibusdam voluptatem quia omnis"}};
//console.log('=>',dataSET);

/**  Usar AnyChart para los charts */
/*
  anychart.onDocumentReady(function () {
    // console.log(dataSET,'AQUI00000');
    var dataSet = anychart.data;
    console.log(dataSet,'AQUI0.5');
    dataSet.loadJsonFile(
      dataSET, 
      //data => console.log(data,'AQUI0.6')
      
      function (data) {
        console.log('AQUI1111',dataSET);
 
        // go through the data and add each season's info and charts to the table
        console.log(Object.entries(data),'Object Entries 1');
        Object.entries(data).forEach(([key, value]) => {
          //createSeason(key, data);
          console.log('AQUI2222',key,data);
        }); 
        
      }
    );

  });
  */
function createCharts(dataSET2) {
  /*
    let dataSET2 = {
      "1": {
        "id": 1,
        "market_cap": "96840561750.793",
        "name_company": "Starbucks",
        "price": 84.415,
        "today": 0.4223214,
        "price_daily": [
          83.44, 83.21, 83.12, 83.1985, 83.48, 83.682, 83.59, 83.78, 83.68, 83.745,
          83.76, 83.8, 83.86, 83.71, 83.63, 83.7, 83.77, 83.645, 83.71, 83.7, 83.71,
          83.835, 83.86, 83.84, 83.7904, 83.85, 83.95, 83.9, 83.77, 83.68, 83.62,
          83.62, 83.595, 83.55, 83.61, 83.62, 83.61, 83.65, 83.7, 83.64, 83.71,
          83.79, 83.89, 83.73, 83.6435, 83.715, 83.78, 83.93, 84.1, 84.09, 84.06,
          84.05, 84.02, 84.05, 84.05, 84.09, 84.06, 84.1, 84.04, 84.05, 84.01,
          84.08, 84.19, 84.09, 83.95, 84.01, 83.94, 83.9, 83.89, 83.9, 83.89, 83.94,
          84.015, 84, 83.91, 84.04, 84.015, 83.99, 84.05, 84.03, 84.06, 84.08,
          84.0547, 84.0199, 83.93, 83.97, 83.96, 83.95, 84, 84.03, 83.97, 83.99,
          84.045, 84.04, 84.09, 84.04, 83.98, 83.94, 83.8821, 83.81, 83.92, 83.95,
          83.905, 83.88, 83.94, 83.915, 84, 83.94, 83.95, 84.03, 84, 84.02, 84.04,
          84.07, 84.14, 84.13, 84.17, 84.13, 84.0414, 84.035, 84, 83.98, 83.91,
          83.84, 84, 84.06, 84.02, 84.09, 84.22, 84.15, 84.125, 84.1, 84.12, 84.09,
          84.01, 84, 84.025, 84, 84.07, 84.13, 84.19, 84.2, 84.19, 84.13, 84.16,
          84.18, 84.21, 84.23, 84.23, 84.23, 84.19, 84.23, 84.3, 84.325, 84.31,
          84.345, 84.35, 84.26, 84.25, 84.29, 84.27, 84.33, 84.33, 84.35, 84.32,
          84.38, 84.415, 84.4109, 84.45, 84.49, 84.45, 84.455, 84.38, 84.44, 84.42,
          84.38, 84.33, 84.37, 84.37, 84.275, 84.28, 84.24, 84.16, 84.15, 84.17,
          84.14, 84.17, 84.1, 84.1, 84.16, 84.19, 84.18, 84.185, 84.2216, 84.2,
          84.25, 84.29, 84.27, 84.33, 84.42, 84.45, 84.466, 84.53, 84.53, 84.48,
          84.4936, 84.45, 84.46, 84.42, 84.46, 84.41, 84.4251, 84.46, 84.465,
          84.5099, 84.426, 84.43, 84.42, 84.4, 84.44, 84.4228, 84.45, 84.33, 84.37,
          84.35, 84.345, 84.34, 84.26, 84.2475, 84.1836, 84.215, 84.25, 84.19,
          84.21, 84.17, 84.18, 84.19, 84.25, 84.305, 84.285, 84.27, 84.32, 84.355,
          84.387, 84.4, 84.43, 84.44, 84.45, 84.43, 84.45, 84.405, 84.37, 84.44,
          84.434, 84.48, 84.54, 84.58, 84.47, 84.43, 84.45, 84.41, 84.44, 84.43,
          84.41, 84.395, 84.41, 84.4, 84.39, 84.415, 84.44, 84.45, 84.39, 84.39,
          84.355, 84.365, 84.305, 84.33, 84.35, 84.35, 84.32, 84.325, 84.33, 84.38,
          84.305, 84.3, 84.315, 84.23, 84.24, 84.2, 84.24, 84.25, 84.26, 84.265,
          84.267, 84.285, 84.2715, 84.3, 84.29, 84.35, 84.32, 84.29, 84.37, 84.37,
          84.39, 84.38
        ],
        "price_monthly": [
          84.78, 84.91, 83.71, 87.27, 86.88, 85.73, 85.72, 84.84, 86.49, 87.27,
          88.31, 89.16, 89.4, 88.35, 88.55, 86.92, 84.95, 84.69, 86.05, 87.39,
          84.06, 84.415
        ],
        "country_name": "United States"
      },
      "2": {
        "id": 0,
        "market_cap": "188152269621.41",
        "name_company": "McDonald's",
        "price": 255.94,
        "today": -0.39307636,
        "price_daily": [
          255.4, 255.79, 255.31, 255.27, 255.19, 254.9885, 254.661, 254.8625,
          255.19, 255.55, 255.3179, 255.13, 255.21, 255.21, 255.15, 255.3, 255,
          254.99, 255.04, 254.93, 254.81, 255.05, 254.98, 254.98, 254.8, 254.91,
          255.08, 255.1392, 255.005, 254.89, 254.82, 254.865, 254.94, 254.87,
          254.89, 254.87, 254.895, 254.84, 254.9164, 254.905, 254.87, 254.79, 254.8,
          254.7372, 254.78, 254.84, 254.79, 254.85, 254.9, 255.045, 254.8901,
          255.09, 255.205, 255.28, 255.4, 255.3657, 255.51, 255.44, 255.5902,
          255.5018, 255.15, 255.14, 255.24, 255.39, 255.16, 255.198, 254.9, 254.89,
          254.9539, 254.9, 255, 255.095, 255.28, 255.4351, 255.32, 255.29, 255.12,
          255.19, 255.2, 255.305, 255.255, 255.14, 255.029, 255.005, 254.925,
          254.82, 254.85, 254.87, 254.9433, 254.93, 254.865, 255.08, 255.195,
          255.29, 255.295, 255.34, 255.185, 255.03, 254.835, 255.1, 255.15, 255.14,
          255.03, 255.135, 255.14, 255.265, 255.18, 255.12, 255.22, 255.18, 255.35,
          255.4, 255.505, 255.52, 255.53, 255.53, 255.33, 255.33, 255.355, 255.27,
          255.305, 255.22, 255.32, 255.38, 255.3843, 255.5, 255.53, 255.49,
          255.3964, 255.5359, 255.46, 255.35, 255.34, 255.325, 255.335, 255.415,
          255.375, 255.545, 255.445, 255.4759, 255.51, 255.475, 255.58, 255.78,
          255.825, 255.835, 255.78, 255.805, 255.855, 255.805, 255.9619, 256.12,
          256.11, 255.9, 255.91, 255.92, 255.8611, 256.045, 256.005, 255.95,
          255.905, 255.97, 256, 255.98, 256.045, 256.04, 256.025, 256.04, 255.94,
          255.97, 255.96, 255.91, 256.02, 256.05, 256.03, 255.945, 256.01, 255.96,
          255.87, 255.9317, 255.92, 255.91, 255.92, 255.72, 255.805, 255.85, 255.91,
          255.98, 256.005, 255.9, 255.82, 255.9742, 256.19, 256.08, 256.23, 256.38,
          256.42, 256.44, 256.52, 256.53, 256.44, 256.55, 256.39, 256.435, 256.39,
          256.3601, 256.32, 256.37, 256.42, 256.28, 256.48, 256.47, 256.4626,
          256.36, 256.2844, 256.38, 256.31, 256.26, 256.125, 256.215, 256.16,
          256.22, 256.21, 256.04, 255.955, 255.865, 255.9, 255.95, 255.91, 255.97,
          255.83, 255.855, 255.8, 255.82, 255.85, 255.89, 255.95, 256.0709, 256.08,
          256.02, 255.98, 256.06, 256.07, 256.15, 256.08, 256.11, 256.02, 256.1782,
          256.25, 256.31, 256.42, 256.595, 256.71, 256.4009, 256.26, 256.28,
          256.225, 256.3, 256.25, 256.16, 256.17, 256.17, 256.175, 256.23, 256.2834,
          256.24, 256.36, 256.25, 256.25, 256.255, 256.2, 256.11, 256.13, 256.23,
          256.219, 256.26, 256.16, 256.195, 256.16, 256, 255.96, 255.98, 255.87,
          255.66, 255.59, 255.64, 255.62, 255.65, 255.54, 255.5, 255.515, 255.58,
          255.65, 255.68, 255.76, 255.77, 255.6, 255.8, 255.8, 255.74, 255.84
        ],
        "price_monthly": [
          263.37, 264.23, 261.05, 262.09, 260.64, 259.23, 256.8, 260.06, 261.36,
          259.28, 262.18, 265.44, 266.29, 266.82, 266.58, 266.54, 262.95, 260.54,
          260.86, 262.56, 256.95, 255.94
        ],
        "country_name": "United States"
      },
      "3": {
          "id": 0,
          "market_cap": "188152269621.41",
          "name_company": "McDonald's",
          "price": 255.94,
          "today": -0.39307636,
          "price_daily": [
            255.4, 255.79, 255.31, 255.27, 255.19, 254.9885, 254.661, 254.8625,
            255.19, 255.55, 255.3179, 255.13, 255.21, 255.21, 255.15, 255.3, 255,
            254.99, 255.04, 254.93, 254.81, 255.05, 254.98, 254.98, 254.8, 254.91,
            255.08, 255.1392, 255.005, 254.89, 254.82, 254.865, 254.94, 254.87,
            254.89, 254.87, 254.895, 254.84, 254.9164, 254.905, 254.87, 254.79, 254.8,
            254.7372, 254.78, 254.84, 254.79, 254.85, 254.9, 255.045, 254.8901,
            255.09, 255.205, 255.28, 255.4, 255.3657, 255.51, 255.44, 255.5902,
            255.5018, 255.15, 255.14, 255.24, 255.39, 255.16, 255.198, 254.9, 254.89,
            254.9539, 254.9, 255, 255.095, 255.28, 255.4351, 255.32, 255.29, 255.12,
            255.19, 255.2, 255.305, 255.255, 255.14, 255.029, 255.005, 254.925,
            254.82, 254.85, 254.87, 254.9433, 254.93, 254.865, 255.08, 255.195,
            255.29, 255.295, 255.34, 255.185, 255.03, 254.835, 255.1, 255.15, 255.14,
            255.03, 255.135, 255.14, 255.265, 255.18, 255.12, 255.22, 255.18, 255.35,
            255.4, 255.505, 255.52, 255.53, 255.53, 255.33, 255.33, 255.355, 255.27,
            255.305, 255.22, 255.32, 255.38, 255.3843, 255.5, 255.53, 255.49,
            255.3964, 255.5359, 255.46, 255.35, 255.34, 255.325, 255.335, 255.415,
            255.375, 255.545, 255.445, 255.4759, 255.51, 255.475, 255.58, 255.78,
            255.825, 255.835, 255.78, 255.805, 255.855, 255.805, 255.9619, 256.12,
            256.11, 255.9, 255.91, 255.92, 255.8611, 256.045, 256.005, 255.95,
            255.905, 255.97, 256, 255.98, 256.045, 256.04, 256.025, 256.04, 255.94,
            255.97, 255.96, 255.91, 256.02, 256.05, 256.03, 255.945, 256.01, 255.96,
            255.87, 255.9317, 255.92, 255.91, 255.92, 255.72, 255.805, 255.85, 255.91,
            255.98, 256.005, 255.9, 255.82, 255.9742, 256.19, 256.08, 256.23, 256.38,
            256.42, 256.44, 256.52, 256.53, 256.44, 256.55, 256.39, 256.435, 256.39,
            256.3601, 256.32, 256.37, 256.42, 256.28, 256.48, 256.47, 256.4626,
            256.36, 256.2844, 256.38, 256.31, 256.26, 256.125, 256.215, 256.16,
            256.22, 256.21, 256.04, 255.955, 255.865, 255.9, 255.95, 255.91, 255.97,
            255.83, 255.855, 255.8, 255.82, 255.85, 255.89, 255.95, 256.0709, 256.08,
            256.02, 255.98, 256.06, 256.07, 256.15, 256.08, 256.11, 256.02, 256.1782,
            256.25, 256.31, 256.42, 256.595, 256.71, 256.4009, 256.26, 256.28,
            256.225, 256.3, 256.25, 256.16, 256.17, 256.17, 256.175, 256.23, 256.2834,
            256.24, 256.36, 256.25, 256.25, 256.255, 256.2, 256.11, 256.13, 256.23,
            256.219, 256.26, 256.16, 256.195, 256.16, 256, 255.96, 255.98, 255.87,
            255.66, 255.59, 255.64, 255.62, 255.65, 255.54, 255.5, 255.515, 255.58,
            255.65, 255.68, 255.76, 255.77, 255.6, 255.8, 255.8, 255.74, 255.84
          ],
          "price_monthly": [
            263.37, 264.23, 261.05, 262.09, 260.64, 259.23, 256.8, 260.06, 261.36,
            259.28, 262.18, 265.44, 266.29, 266.82, 266.58, 266.54, 262.95, 260.54,
            260.86, 262.56, 256.95, 255.94
          ],
          "country_name": "United States"
        }
    };
    */
  //console.log('=>2',dataSET2);
  //console.log(Object.entries(dataSET2),'Object Entries 2');

  Object.entries(dataSET2).forEach(([key, value]) => {
    createSeason(key, dataSET2);
    //console.log('AQUI2222 OTRO',key,dataSET2);
  });
}

/** Copia de seguridad */
/*
function createCharts(json) {
  console.log(json,'JSON');

  // Creacion de Data SET 
  let dataSET = "./data.json";
  // let dataSET ={"S0":{"market_cap":1,"name_company":1,"price":"delectus aut autem","today":false,"price_daily":"delectus aut autem","price_monthly":"delectus aut autem","country_name":"delectus aut autem"},"S1":{"market_cap":1,"name_company":2,"price":"quis ut nam facilis et officia qui","today":false,"price_daily":"quis ut nam facilis et officia qui","price_monthly":"quis ut nam facilis et officia qui","country_name":"quis ut nam facilis et officia qui"},"S3":{"market_cap":1,"name_company":4,"price":"et porro tempora","today":true,"price_daily":"et porro tempora","price_monthly":"et porro tempora","country_name":"et porro tempora"},"S4":{"market_cap":1,"name_company":5,"price":"laboriosam mollitia et enim quasi adipisci quia provident illum","today":false,"price_daily":"laboriosam mollitia et enim quasi adipisci quia provident illum","price_monthly":"laboriosam mollitia et enim quasi adipisci quia provident illum","country_name":"laboriosam mollitia et enim quasi adipisci quia provident illum"},"S2":{"market_cap":1,"name_company":3,"price":"fugiat veniam minus","today":false,"price_daily":"fugiat veniam minus","price_monthly":"fugiat veniam minus","country_name":"fugiat veniam minus"},"S5":{"market_cap":1,"name_company":6,"price":"qui ullam ratione quibusdam voluptatem quia omnis","today":false,"price_daily":"qui ullam ratione quibusdam voluptatem quia omnis","price_monthly":"qui ullam ratione quibusdam voluptatem quia omnis","country_name":"qui ullam ratione quibusdam voluptatem quia omnis"}};
   console.log('=>',dataSET);

  //  Usar AnyChart para los charts 
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
/** Copia de seguridad */

/** POSIBLE EJEMPLO */
/*
var monthsSales = {};
monthsSales.point = new Array();
monthsSales.point.push({name: "Jan", y: "21"});
monthsSales.point.push({name: "Feb", y: "23"});
monthsSales.point.push({name: "Mar", y: "31"});
monthsSales.point.push({name: "Apr", y: "34"});
monthsSales.point.push({name: "May", y: "45"});

var dataSeries = new Array();
dataSeries.push(monthsSales);

var data = {
    charts: {
        chart: {
            chart_settings: {
                title: {
                    text: "Simple Chart"
                }
            },
            data: {
                series: dataSeries
            }
        }
    }
};

console.log(data,'Aqui');

chart.setJSData(data);

console.log(chart.setJSData(data),'UUUU');
/** POSIBLE EJEMPLO */

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
  /*
  var imageLogo = document.createElement("img");
  imageLogo.setAttribute("src", data[season].logo);
  // Append
  newRow.insertCell().appendChild(imageLogo);
  */

  /** Para Arreglar los Formatos src https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat*/

  // append logo Hiska
  newRow
    .insertCell()
    .appendChild(document.createTextNode(data[season].name_company));

  // append a Price rating cell
  newRow.insertCell().appendChild(
    document.createTextNode(
      new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
      }).format(data[season].market_cap)
    )
  );

  // append a Price rating cell
  newRow
    .insertCell()
    .appendChild(
      document.createTextNode(
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(data[season].price)
      )
    );

  // append a Price rating cell
  newRow
    .insertCell()
    .appendChild(
      document.createTextNode(
        new Intl.NumberFormat("en-US", {
          style: "percent",
          signDisplay: "auto",
          maximumSignificantDigits:3,
        }).format(data[season].today/100)
      )
    );

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

// iframe
// webcomponent, agnosticos, Generar una libreria, Postear en un CDN

// Servicio AW2wS3
