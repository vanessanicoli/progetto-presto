let radioWrapper = document.querySelector('#radioWrapper');
let cardWrapper = document.querySelector('#cardWrapper');

fetch('./annunci.json').then( (response)=> response.json() ).then( (data)=> {

    data.sort( (a, b)=> a.price - b.price );

    function radioCreate(){
        let categories = data.map( (annuncio)=> annuncio.category );

        let uniqueCategories = Array.from(new Set(categories)).sort();    
        
        uniqueCategories.forEach( (category)=> {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="categories" id="${category}">
                <label class="form-check-label" for="${category}">
                    ${category}
                </label>
            `;

            radioWrapper.appendChild(div);
        });
    }

    radioCreate();


    function truncateWord(string){
        let words = string.split(' ');
        
        if(words.length > 1){
           return words[0] + '...';
        }
        else{
            return string;
        }
    }

    function showCards(array){
        
        cardWrapper.innerHTML = ``;
        array.forEach( (annuncio) => {
            
            let div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <img src="${annuncio.img}" class="card-img-top img-card" alt="Immagine prodotto">
                <div class="card-body text-center d-flex flex-column justify-content-center align-items-center">
                    <p class="h2 mt-3" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
                    <p class="h4 my-3">${annuncio.category}</p>
                    <p class="lead">${annuncio.price} €</p>
                </div>
            `;
            cardWrapper.appendChild(div);

        });

    }    

    showCards(data);

    //filterByCategory
    let radioButtons = Array.from(document.querySelectorAll('.form-check-input'));

    function filterByCategory(array){

        let categoria = radioButtons.find( (button)=> button.checked ).id;

        if(categoria != 'All'){
            let filtered = array.filter( (annuncio)=> annuncio.category == categoria );
            return filtered;
        }
        else{
            return array;
        }

    }

    radioButtons.forEach( (button)=> {
        button.addEventListener('click', ()=>{
            setPriceInput(filterByCategory(data));
            globalFilter();
        });
    });

    //setPriceInput
    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');

    function setPriceInput(array){

        let prices = array.map( (annuncio)=> +annuncio.price );        
        prices.sort((a, b)=> a - b);
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
    }

    setPriceInput(filterByCategory(data));


    //filterByPrice
    function filterByPrice(array){

        let filtered = array.filter( (annuncio)=> +annuncio.price <= priceInput.value );        
        return filtered;
        
    }

    priceInput.addEventListener('input', ()=>{
        priceValue.innerHTML = priceInput.value;
        globalFilter();
    });

    //filterByWord
    let wordInput = document.querySelector('#wordInput');

    function filterByWord(array){

        let filtered = array.filter(
            (annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase())
        );        
        return filtered;
        
    }
    
    wordInput.addEventListener( 'input', ()=> {
        globalFilter();
    });

    //globalFilter
    function globalFilter(){
        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterByPrice(filteredByCategory);
        let filteredByWord = filterByWord(filteredByPrice);

        showCards(filteredByWord);
    }
    
});