// -------------------- Global Variables --------------------
var popupoverlay = document.querySelector(".popup-overlay")
var popupbox = document.querySelector(".popup-box")
var addpopupbutton = document.getElementById("add-popup-button")
var cancelpopup = document.getElementById("cancel-popup")
var container = document.querySelector(".container")
var addstudio = document.getElementById("add-studio")
var studiotitleinput = document.getElementById("Studio-title-input")
var studioplaceinput = document.getElementById("Studio-place-input")
var studiodiscriptioninput = document.getElementById("Studio-description-input")

var editElement = null  // for tracking edit mode

// -------------------- Popup Open/Close --------------------
addpopupbutton.addEventListener("click", function () {
    popupoverlay.style.display = "block"
    popupbox.style.display = "block"
})

cancelpopup.addEventListener("click", function (event) {
    event.preventDefault()
    popupoverlay.style.display = "none"
    popupbox.style.display = "none"
    clearInputs()
})

// -------------------- Add / Update Studio --------------------
addstudio.addEventListener("click", function (event) {
    event.preventDefault()

    if (!studiotitleinput.value || !studioplaceinput.value || !studiodiscriptioninput.value) {
        alert("Please fill all fields!")
        return
    }

    if (editElement === null) {
        // Add new studio
        var div = document.createElement("div")
        div.setAttribute("class", "Studio-book")
        div.innerHTML = `<h2>${studiotitleinput.value}</h2>
            <h5>${studioplaceinput.value}</h5>
            <p>${studiodiscriptioninput.value}</p>
            <div style="margin-top:10px;">
                <button onclick="editstudio(event)" style="margin-right:8px;">Edit</button>
                <button onclick="deletestudio(event)">Delete</button>
            </div>`
        container.append(div)
    } else {
        // Update existing studio
        editElement.querySelector("h2").innerText = studiotitleinput.value
        editElement.querySelector("h5").innerText = studioplaceinput.value
        editElement.querySelector("p").innerText = studiodiscriptioninput.value
        editElement = null
    }

    saveToLocalStorage()  // save changes
    popupoverlay.style.display = "none"
    popupbox.style.display = "none"
    clearInputs()
})

// -------------------- Edit Function --------------------
function editstudio(event) {
    editElement = event.target.parentElement.parentElement  // select card div

    studiotitleinput.value = editElement.querySelector("h2").innerText
    studioplaceinput.value = editElement.querySelector("h5").innerText
    studiodiscriptioninput.value = editElement.querySelector("p").innerText

    popupoverlay.style.display = "block"
    popupbox.style.display = "block"
}

// -------------------- Delete Function --------------------
function deletestudio(event) {
    event.target.parentElement.parentElement.remove()
    saveToLocalStorage()
}

// -------------------- Clear Input Fields --------------------
function clearInputs() {
    studiotitleinput.value = ""
    studioplaceinput.value = ""
    studiodiscriptioninput.value = ""
}

// -------------------- LocalStorage Functions --------------------
function saveToLocalStorage() {
    var studios = []
    document.querySelectorAll(".Studio-book").forEach(card => {
        studios.push({
            title: card.querySelector("h2").innerText,
            place: card.querySelector("h5").innerText,
            description: card.querySelector("p").innerText
        })
    })
    localStorage.setItem("studios", JSON.stringify(studios))
}

function loadFromLocalStorage() {
    var studios = JSON.parse(localStorage.getItem("studios")) || []
    studios.forEach(data => {
        var div = document.createElement("div")
        div.setAttribute("class", "Studio-book")
        div.innerHTML = `<h2>${data.title}</h2>
            <h5>${data.place}</h5>
            <p>${data.description}</p>
            <div style="margin-top:10px;">
                <button onclick="editstudio(event)" style="margin-right:8px;">Edit</button>
                <button onclick="deletestudio(event)">Delete</button>
            </div>`
        container.append(div)
    })
}

// -------------------- Load on Page Open --------------------
window.onload = function () {
    loadFromLocalStorage()
}
