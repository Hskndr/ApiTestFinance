// Configuraciones
const headers = new Headers();
headers.set("Content-Type", "application/json");
headers.set("Content-Encoding", "br");

const options = {
	method: "GET"
};

fetch("https://worldtimeapi.org/api/ip/181.46.139.190",options)
	.then(response => response.text())
	.then(data => {console.log(data)}); 
	
// Ya obtuve la data


//Funcion para crear elementos de la lista.
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const div = document.getElementsByTagName('div');

console.log(div,'div')
const url = 'https://randomuser.me/api/?results=10';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let authors = data.results;
  return authors.map(function(author) {
    let li = createNode('li');
    let img = createNode('img');
    let span = createNode('span');
    img.src = author.picture.medium;
    span.innerHTML = `${author.name.first} ${author.name.last}`;
    append(li, img);
    append(li, span);
    append(ul, li);
  })
})
.catch(function(error) {
  console.log(error);
});


// CREAR GRAFICOS
function (data) {
  // go through the data and add each season's info and charts to the table
  Object.entries(data).forEach(([key, value]) => createSeason(key, data)); 
}

function createSeason(season, data){

  // get a table link
  var tbodyRef = document.getElementById('tb-seasons').getElementsByTagName('tbody')[0];
  
  // insert a row at the end of the table
  var newRow = tbodyRef.insertRow();
  newRow.setAttribute('height', '30px');
  
  // append a season name text node to a cell
  newRow.insertCell().appendChild(document.createTextNode(season));
  
  // append a season rating cell
  newRow.insertCell().appendChild(document.createTextNode(data[season]
.avg));
  
  // create a line sparkline chart showing ratings
  var lineDiv = createSparkline(data[season], 'episodeRatings', 'line');
  
  // append it
  newRow.insertCell().appendChild(lineDiv); 
  
  // create a column sparkline chart showing percentages
  var columnDiv = createSparkline(data[season], 'percentOfAvg', 'column');
  
  // append it
  newRow.insertCell().appendChild(columnDiv); 

}


// create sparkline of a given type, color, and from a given field
function createSparkline(data, field, type){

  var sparkline = anychart.sparkline(data[field]);
  sparkline.seriesType(type);
  
  // create a div for the sparklines and assign a css class name
  var chartDiv = document.createElement('div');
  chartDiv.setAttribute('class', 'chart');  
  
  sparkline.container(chartDiv);
  sparkline.draw();
  
  return chartDiv;

}