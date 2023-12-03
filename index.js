const allPuppiesDiv = document.querySelector("#allPuppiesDiv")
const singlePuppyDiv = document.querySelector("#singlePuppyDiv")
let puppyPlayers = []

async function getPuppyPlayers() {
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2310/players")
    //console.log(response)
    const data = await response.json()
    puppyPlayers = data.data.players
    puppyPlayers.forEach((puppy) => {
        if(puppy.id%2 === 0) {
            puppy.teamName = "Ruff & Tumble"
        } else {
            puppy.teamName = "The Fast & the Furriest"
        }
    })
    console.log(puppyPlayers)
    render()
}

async function render() {
    // const puppyList = puppyPlayers.map((puppy) => {
    //     return `<a href=#${puppy.name} class="indPuppy"> ${puppy.name} </a>`
    // })

    const teamRedField = puppyPlayers.filter((puppy) => {
        return puppy.id%2 === 0 && puppy.status === "field"
    })

    const redFieldList = teamRedField.map((puppy) => {
        return `<a href=#${puppy.name} class="indPuppyRed"> ${puppy.name} </a>`
    })
    console.log(redFieldList)

    const teamBlueField = puppyPlayers.filter((puppy) => {
        return puppy.id%2 !== 0 && puppy.status === "field"
    })

    const blueFieldList = teamBlueField.map((puppy) => {
        return `<a href=#${puppy.name} class="indPuppyBlue"> ${puppy.name} </a>`
    })

    const teamRedBench = puppyPlayers.filter((puppy) => {
        return puppy.id%2 === 0 && puppy.status === "bench"
    })

    const redBenchList = teamRedBench.map((puppy) => {
        return `<a href=#${puppy.name} class="indPuppyRed"> ${puppy.name} </a>`
    })

    const teamBlueBench = puppyPlayers.filter((puppy) => {
        return puppy.id%2 !== 0 && puppy.status === "bench"
    })

    const blueBenchList = teamBlueBench.map((puppy) => {
        return `<a href=#${puppy.name} class="indPuppyBlue"> ${puppy.name} </a>`
    })
    console.log(blueBenchList)



    const name = window.location.hash.slice(1)
    //console.log(name)
    
    const currentPuppy = puppyPlayers.find((puppy) => {
        return puppy.name === name
    })
    //console.log(currentPuppy)

    // let currentTeam = "";
    // if(Math.round(Math.random()) === 1) {
    //     currentTeam = "Ruff & Tumble"
    // } else {
    //     currentTeam = "The Fast & the Furriest"
    // }
        
    if(currentPuppy) {
        allPuppiesDiv.innerHTML = ""
        singlePuppyDiv.innerHTML = `
            <div id="puppyImageDiv">
                <img src=${currentPuppy.imageUrl}>
            </div>
            <div id="puppyInfoDiv">
                <h3> Meet ${currentPuppy.name}</h3>
                <div>
                    <p> Breed: ${currentPuppy.breed}</p>
                    <p> Status: ${currentPuppy.status}</p>
                    <p> Team: ${currentPuppy.teamName}</p>
                </div>
                <a href=# id="backButtonLink"><button id="backButton">Back to puppies</button></a>
            </div>
        `
        //console.log(currentPuppy)
    } else {
        //allPuppiesDiv.innerHTML = `<div class="puppyContainer"> ${puppyList.join("")}</div>`
        allPuppiesDiv.innerHTML = `
            <div id="fieldDiv">
                <div class="groupDiv">
                    <h3>Starting for Ruff & Tumble:</h3>
                    <div class="puppyContainerField"> ${redFieldList.join("")}</div>
                </div>
                <div class="spaceBetween"></div>
                <div class="groupDiv">
                    <h3>Starting for Fast & the Furriest:</h3>
                    <div class="puppyContainerField"> ${blueFieldList.join("")}</div>
                </div>
            </div>
            <div id="benchDiv">
                <div class="groupDiv">
                    <h3>Also featuring:</h3>
                    <div class="puppyContainerBench"> ${redBenchList.join("")}</div>
                </div>
                <div class="spaceBetween"></div>
                <div class="groupDiv">
                    <h3>Also featuring:</h3>
                    <div class="puppyContainerBench"> ${blueBenchList.join("")}</div>
                </div>
            </div>
        `
        singlePuppyDiv.innerHTML = ""
        //console.log(currentPuppy)
    }

}

window.addEventListener("hashchange", () => {
    render()
})

getPuppyPlayers()