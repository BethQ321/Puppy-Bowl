const API = "https://fsa-puppy-bowl.herokuapp.com/api/2310"
const allPuppiesDiv = document.querySelector("#allPuppiesDiv")
const singlePuppyDiv = document.querySelector("#singlePuppyDiv")
let puppyPlayers = []

async function getPuppyPlayers() {
    const response = await fetch(API + "/players")
    //console.log(API + "/players")
    //console.log(response)
    const data = await response.json()
    puppyPlayers = data.data.players
    console.log(puppyPlayers)
    render()
}

async function render() {
    const puppyList = puppyPlayers.map((puppy) => {
        return `<a href=#${puppy.name} class="indPuppy"> ${puppy.name} </a>`
    })

    const name = window.location.hash.slice(1)
    //console.log(name)
    
    const currentPuppy = puppyPlayers.find((puppy) => {
        return puppy.name === name
    })
    //console.log(currentPuppy)

    let currentTeam = "";
    if(Math.round(Math.random()) === 1) {
        currentTeam = "Ruff & Tumble"
    } else {
        currentTeam = "The Fast & the Furriest"
    }
        
    if(currentPuppy) {
        allPuppiesDiv.innerHTML = ""
        singlePuppyDiv.innerHTML = `
            <div id="puppyImageDiv">
                <img src=${currentPuppy.imageUrl}>
            </div>
            <div id="puppyInfoDiv">
                <h3> Cheer on ${currentPuppy.name}</h3>
                <div>
                    <p> Breed: ${currentPuppy.breed}</p>
                    <p> Status: ${currentPuppy.status}</p>
                    <p> Team: ${currentTeam}</p>
                </div>
                <a href=# id="backButtonLink"><button id="backButton">Back to puppies</button></a>
            </div>
        `
        //console.log(currentPuppy)
    } else {
        allPuppiesDiv.innerHTML = `<div class="puppyContainer"> ${puppyList.join("")}</div>`
        singlePuppyDiv.innerHTML = ""
        //console.log(currentPuppy)
    }

}

window.addEventListener("hashchange", () => {
    render()
})

getPuppyPlayers()