let rocket = document.querySelector('#rocket');
let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');

console.log(window);


let check = false;
let confirm = true;

rocket.addEventListener('click', ()=> {

    if(check == false){
        rocket.style.transform = `rotate(45deg)`;
        check = true;
    }
    else{
        rocket.style.transform = ``;
        check = false;
    }

});

// Funzione per creare l'intervallo dei numeri casuali
function createInterval(n, element, time){
    let count = 0;

    let interval = setInterval(() => {
        
    
        if(count < n){
            count++;
            element.innerHTML = count;
        }
        else{
            clearInterval(interval);
        }


    }, time);

    setTimeout( ()=>{
        confirm = true;
    }, 8000);

};

let observer = new IntersectionObserver( (entries)=> {

    entries.forEach( (entry)=> {
        if(entry.isIntersecting && confirm){
            createInterval(100, firstNumber, 50);
            createInterval(200, secondNumber, 50);
            createInterval(300, thirdNumber, 50);
            confirm = false;
        }
    });

});

observer.observe(firstNumber);


let reviews = [
    {user: 'Matteo', description: 'Il più bel sito di annunci del mondo', rank: 5},
    {user: 'Alin', description: 'Veramente non mi da di niente', rank: 1},
    {user: 'Michael', description: 'Mi piace tranne per Star Trek', rank: 3},
    {user: 'Arina', description: 'Star Wars è meglio!', rank: 5},
];

let swiperWrapper = document.querySelector('.swiper-wrapper');

reviews.forEach( (recensione)=> {
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
        <i class="fa-solid fa-user-astronaut fa-2x mb-5"></i>
        <p id="userName" class="h4 text-bl mb-4">${recensione.user}</p>
        <p id="userDescription" class="lead text-center">${recensione.description}</p>
        <div class="d-flex justify-content-center star mt-3">
        
        </div>
    `;
    swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll('.star');

stars.forEach( (star, index)=> {

    for(let i=0; i < reviews[index].rank; i++){
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star');
        star.appendChild(icon);
    }

    let difference = 5 - reviews[index].rank;

    for(let i=0; i < difference; i++){
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star');
        star.appendChild(icon);
    }

});

// SWIPER
var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,

    autoplay: {
        delay: '2000',
    },
});