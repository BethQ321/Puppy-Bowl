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

    allPuppiesDiv.innerHTML = `<div class="puppyContainer"> ${puppyList.join("")}</div>`

    const name = window.location.hash.slice(1)
    
    const currentPuppy = puppyPlayers.find((puppy) => {
        return puppy.name === name
    })
    console.log(currentPuppy)

    singlePuppyDiv.innerHTML = `
        <h3> Say hello to ${currentPuppy.name}</h3>
        <img src=${currentPuppy.imageUrl}>
    `

}

window.addEventListener("hashchange", () => {
    render()
})

getPuppyPlayers()