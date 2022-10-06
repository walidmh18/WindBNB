const staysContainer = document.querySelector('.staysGridContainer')


fetch('./stays.json').then(res => res.json()).then(staysArr => loadStays(staysArr))

const adultsCounterOut = document.getElementById('adultsCounterOut')
const childrenCounterOut = document.getElementById('childrenCounterOut')
const guestsValue = document.querySelector('.guestsValue')
const searchNav = document.querySelector('.searchNav')
const blank = document.querySelector('.blank')
const locationSearch = document.querySelector('.locationSearch')
const guestsSearch = document.querySelector('.guestsSearch')
const locationValue = document.querySelector('.locationValue')

function loadStays(stays) {
    stays.forEach(el => {
        let stay = document.createElement('div')
        stay.classList.add('stay')

        // adding the picture

        let stayCover = document.createElement('img')
        stayCover.classList.add('photo')
        stayCover.setAttribute('src', el.photo)
        stay.appendChild(stayCover)

        // adding description

        let descriptionDiv = document.createElement('div')
        descriptionDiv.classList.add('description')
            // adding info

            let infoDiv = document.createElement('div')
            infoDiv.classList.add('info')

                // adding superHost
                if (el.superHost == true) {
                    let superHostDiv = document.createElement('div')
                    superHostDiv.classList.add('superHost')
                    superHostDiv.innerText = 'SUPER HOST'
                    infoDiv.appendChild(superHostDiv)
                }

                // adding type
                let typeDiv = document.createElement('div')
                typeDiv.classList.add('type')
                typeDiv.innerText = el.type
                infoDiv.appendChild(typeDiv)


                // adding 
                if (el.beds == 1 ){
                    let bedsDiv = document.createElement('div')
                    bedsDiv.classList.add('beds')
                    bedsDiv.innerText = `${el.beds} bed`
                    infoDiv.appendChild(bedsDiv)    
                }else
                if (el.beds > 1 ) {
                    let bedsDiv = document.createElement('div')
                    bedsDiv.classList.add('beds')
                    bedsDiv.innerText = `${el.beds} beds`
                    infoDiv.appendChild(bedsDiv)    
                }
                
                

            descriptionDiv.appendChild(infoDiv)
            // adding rating
            let ratingDiv = document.createElement('div')
            ratingDiv.classList.add('rating')
            ratingDiv.innerHTML = `<i class="fa-solid fa-star"></i>${el.rating}`
            descriptionDiv.appendChild(ratingDiv)

        stay.appendChild(descriptionDiv)
        // adding title

        let title = document.createElement('a')
        title.classList.add('title')
        title.innerText = el.title
        stay.appendChild(title)






        staysContainer.append(stay)
    });
    console.log(stays[0]);
}



function valueMinus(id) {
    let output = document.getElementById(id)
    if (output.innerText >= 1) {
        output.innerText = output.innerText-1
    }
}

function valuePlus(id) {
    let output = document.getElementById(id)
    output.innerText++ 
}

function toggleActiveness(id , field) {
    if (id == '.locationParams') {
        document.querySelector('.guestsInputs').classList.remove('active')
        document.querySelector('.guestsSwitch').classList.remove('active')
        guestsValue.innerText = getGuestsTotal()
        guestsValue.classList.add('full')
    } else if (id == '.guestsInputs') {
        document.querySelector('.locationParams').classList.remove('active')
        document.querySelector('.locationSwitch').classList.remove('active')
    }



    let tobeActiveted = document.querySelector(id)
    console.log(tobeActiveted);
    tobeActiveted.classList.add('active')

    let fields = document.querySelector('.'+field.classList)
    fields.classList.add('active')
}


function getGuestsTotal() {
    let guestsTotal = 1*adultsCounterOut.innerText + 1*childrenCounterOut.innerText
    return guestsTotal
}

function getLocation() {
    let location = locationValue.innerText
    return location
}
function search() {
    searchNav.style.display = 'none'
    blank.style.display = 'none'
    let guests = getGuestsTotal()

    locationSearch.classList.add('full')
    locationSearch.innerText = getLocation()
    guestsSearch.classList.add('full')
    guestsSearch.innerText = `${guests} guests`



    fetch('./stays.json').then(res => res.json())
    .then(staysArr => {
        let passedStays= []
        staysArr.forEach(stay=> {
            let location = stay.city +', ' + stay.country 
            if (location == getLocation() && stay.maxGuests >= guests) {
                passedStays = [...passedStays , stay]
            }
        })
        staysContainer.innerHTML = ''
        loadStays(passedStays)
    })


}



function showSearchNav() {
    searchNav.style.display= 'grid'
    blank.style.display= 'block'
}
blank.addEventListener('click', () => {
    search()
})

function setLocationSearch(text) {
    locationValue.innerText = text
}