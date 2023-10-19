function show_events(){
    const contain = document.getElementById("contain_events");
    const url_api = `https://gateway.marvel.com:443/v1/public/events?ts=123&apikey=333e7617744930869fb6f64feb4a923d&hash=bd2b80aa619aee1cf91dec53ae95df17`
    fetch(url_api)
        .then(res => res.json())
        .then((json) => {
            for (let i = 0; i < json.data.results.length; i++) {
                let result = json.data.results[i]
                contain.innerHTML += `
                    <div class="event">
                        <div class="contain_img">
                            <img src="${result.thumbnail.path}.${result.thumbnail.extension}" alt="${result.title}">
                        </div>
                        <div class="contain_data">
                            <h4>${result.title}</h4>
                            <p>${result.description}</p>
                            <button data-id="${result.id}" onclick="show_characters(this)">Show Characters in this event</button>
                        </div>
                    </div>`
            }
        })
}

function show_characters(button){
    button.setAttribute("onclick", `hide_characters(this)`)
    button.textContent = "Hide Characters"
    let id = button.getAttribute("data-id")
    const url_api = `https://gateway.marvel.com:443/v1/public/events/${id}/characters?ts=123&apikey=333e7617744930869fb6f64feb4a923d&hash=bd2b80aa619aee1cf91dec53ae95df17`
    fetch(url_api)
        .then(res => res.json())
        .then((json) => {
            if(json.data.results.length == 0){
                alert("This event hasn`t characters defined")
                hide_characters(button)
            }else{
                let contain = button.parentElement.parentElement
                contain.style = "grid-area: span 1 / span 2; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));"
                contain.innerHTML += `
                <div class="characters">
                    <h2>Characters</h2>
                </div>`
                let characters = contain.querySelector(".characters")
                for (let x = 0; x < json.data.results.length; x++) {
                    const result = json.data.results[x];
                    characters.innerHTML += `
                    <div class="c_i_character">
                        <div class="img_contain">
                            <img src="${result.thumbnail.path}.${result.thumbnail.extension}" alt="${result.name}">
                        </div>
                        <h4>${result.name}</h4>
                    </div>`
                }
            }
        })    
}
    

function hide_characters(button){
    button.setAttribute("onclick", "show_characters(this)")
    button.textContent = "Show Characters in this event"
    let contain = button.parentElement.parentElement
    contain.style = "grid-area: auto; grid-template-columns: repeat(2, 1fr);"
    let contain_del = contain.querySelector(".characters")
    contain_del.remove()
}

show_events()