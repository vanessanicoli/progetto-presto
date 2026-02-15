let circle = document.querySelector('.circle');
let opener = document.querySelector('.opener');

let teachers = [
    { name: 'Matteo', description: 'Docente Frontend di Hackademy 69', url: './media/teachers/Matteo.png'},
    { name: 'Marco', description: 'Docente Frontend e responsabile Hackademy', url: './media/teachers/Marco.png'},
    { name: 'Nicola', description: 'Docente Frontend e noto sex-symbol', url: './media/teachers/Nicola.png'},
    { name: 'Davide', description: 'Docente Backend e giocatore di ruolo', url: './media/teachers/Davide.png'},
];

teachers.forEach( (docente)=> {
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${docente.url})`;          
    circle.appendChild(div);
})

let movedDivs = document.querySelectorAll('.moved');

let check = false;

let flipCard = document.querySelector('.flipCard');


opener.addEventListener('click', ()=>{

    if(check == false){
        
        opener.innerHTML = `<i class="fa-solid fa-user-astronaut fa-3x"></i>`;

        movedDivs.forEach( (moved, i)=> {
            let angle = (360 * i) / movedDivs.length;
            moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;          
        });

        check = true;
    }
    else{
        check = false;
        opener.innerHTML = `<i class="fa-solid fa-rocket fa-3x"></i>`;
        opener.style.transform = ``;

        movedDivs.forEach( (moved)=> {
            moved.style.transform = ``;
        });

        flipCard.classList.add('d-none');
    }

});

let innerFace = document.querySelector('.innerFace');
let cardName = document.querySelector('#cardName');
let cardDescription = document.querySelector('#cardDescription');

let checkCard = false;

movedDivs.forEach( (moved, i)=> {

    moved.addEventListener('click', ()=> {

        flipCard.classList.remove('d-none');

        let docente = teachers[i];
        
        innerFace.style.backgroundImage = `url(${docente.url})`;
        cardName.innerHTML = docente.name;
        cardDescription.innerHTML = docente.description;

    }); 
    
});