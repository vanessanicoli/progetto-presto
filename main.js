let rocket = document.querySelector('#rocket');

let check = false;

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