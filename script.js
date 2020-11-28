if(location.protocol == 'http:') location.href = location.href.replace('http', 'https');

window.data = [];

fetch('/app.html')
.then(res => res.text())
.then(body => {
    document.getElementById('app').innerHTML = body;
});

fetch('/data.json')
.then(res => res.json())
.then(body => {
    window.data = body;
    router();
});

function shortenBody(body) {
    return body.length < 200 ? body : `${body.slice(0, 200)}...`
};

function makeResultCard(x) {
    return `<div class="resultcard">
        <h3>${x.name}</h3>
        <p>${shortenBody(x.body)}</p>
        <a href="/#/${encodeURIComponent(x.name)}">View</a>
    </div>`;
};

function makeObsBox(x) {
    return `<div class="obsbox-handler">
        <div class="obsbox-img">
            <img src="${x.img}">
        </div>
        <div class="obsbox-data">
            <h2>${x.name}</h2>
            <p>${x.body}</p>
            ${x.table
            .map(x => `<strong>${x.type}: </strong>${x.value}`)
            .join('<br>')}
        </div>
    </div>`;
};

function search() {
    let input = document.getElementById('searchbox').value.toLowerCase();

    let results = window.data.filter(y => {
        let x = y.name.toLowerCase();

        return input.includes(x) || x.includes(input) || x.startsWith(input) || input.startsWith(x)
    });
    results = results.map(makeResultCard);

    document.getElementById('result-box').innerHTML = results.join('');
};

function router() {
    let route = decodeURIComponent(location.hash.slice(2));
    let result = window.data.find(x => x.name.toLowerCase() == route.toLowerCase());
    document.getElementById('result-box').innerHTML = makeObsBox(result);
};

function random() {
    let result = window.data[Math.floor(Math.random() * window.data.length)];
    document.getElementById('result-box').innerHTML = makeObsBox(result);
};

window.addEventListener('hashchange', router);
