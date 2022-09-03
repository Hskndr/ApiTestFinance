const API_URL = "https://jsonplaceholder.typicode.com";
const HTMLResponse = document.querySelector("#app");

const ul = document.createElement('ul');

fetch(`${API_URL}/posts`)
    .then((response) => response.json())
    .then ((posts) => {
        posts.forEach( (post) => {
            console.log('eachPost: ',post);
            let elem = document.createElement('li');
            console.log(elem, 'elem1');
            elem.appendChild(
                document.createTextNode(`${post.id}-${post.body}`)
            );
            console.log(elem,'elem2');
            console.log('ulapped: ',ul.appendChild(elem));
        });
        HTMLResponse.appendChild(ul);
        
    })
        

/*
const API_URL = "https://jsonplaceholder.typicode.com";
const HTMLResponse = document.querySelectorAll("#app");

fetch(`${API_URL}/posts`)
    .then((response) => response.json())
    .then ((posts) => {
        console.log(posts,'postAfterJson');
        const tpl = posts.map((post) => `<li>${post.id}</li>`);
        console.log('tpl',tpl)
        HTMLResponse.innerHTML = `<ul>${tpl}</ul>`
        
    })
    */