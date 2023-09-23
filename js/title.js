let init = false;
let fancy = true;

function handleClick(tag, parent, f){ 
    let elem = document.createElement("div");
    elem.classList.add('button');
    elem.textContent = tag;

    document.querySelector('#buttons-'+parent).appendChild(elem);
    
    elem.addEventListener('click',function() { f(elem) });
}

handleClick('Play', 'gamemode', function(elem) {
    init.stop = true;
    init = new Init(
        {
            x: 0,
            y: 0,
            x2: 400,
            y2: 400
        },
        'classic',
        {
            fancy
        },
        new URL(document.location).searchParams.get('data') || false
    );
    init.init();

    document.querySelector('.title').style.display = 'none';
})