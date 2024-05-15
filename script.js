//
const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem(`items`))
  : []
console.log(itemsArray)

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item")
  createItem(item)
})

function displayItems() {
  let items = ""
  for (let i = 0; i < itemsArray.length; i++) {
    items += ` <div class="item">
                <div class="input-controller">
                <textarea disabled>${itemsArray[i]}</textarea>
                <div class="edit-controller">
                <i class="fa-solid fa-trash deleteBtn"></i>
                    <i class="fa-regular fa-pen-to-square editBtn"></i>
                </div>
                </div>
                <div class="update-controller">
                <button class="saveBtn">Save</button>
                <button class="cancelBtn">Cancel</button>
                </div>
            </div>`
  }
  document.querySelector(".todo-list").innerHTML = items
  activateDeleteListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
}

function activateDeleteListeners() {
  let deleteBtns = document.querySelectorAll(".deleteBtn")
  deleteBtns.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteItem(i)
    })
  })
}

function activateEditListeners() {
  const editBtns = document.querySelectorAll(".editBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const input = document.querySelectorAll(".input-controller textarea")
  editBtns.forEach((ed, i) => {
    ed.addEventListener("click", () => {
      updateController[i].style.display = "block"
      input[i].disabled = false
    })
  })
}

function activateSaveListeners() {
  const saveBtns = document.querySelectorAll(".saveBtn")
  const inputs = document.querySelectorAll(".input-controller textarea")
  saveBtns.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(inputs[i].value, i)
    })
  })
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const input = document.querySelectorAll(".input-controller textarea")
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateController[i].style.display = "none"
      input[i].disabled = true
    })
  })
}

function updateItem(text, i) {
  itemsArray[i] = text
  localStorage.setItem("items", JSON.stringify(itemsArray))
  location.reload()
}

function deleteItem(i) {
  itemsArray.splice(i, 1)
  localStorage.setItem("items", JSON.stringify(itemsArray))
  location.reload()
}
function createItem(item) {
  itemsArray.push(item.value)
  localStorage.setItem("items", JSON.stringify(itemsArray))
  location.reload()
}

function displayDate() {
  let date = new Date()
  date = date.toString().split(" ")
  document.querySelector("#date").innerHTML =
    date[0] + " " + date[1] + " " + date[2] + " " + date[3] + " " + date[4]
}

window.onload = function () {
  displayDate()
  displayItems()
}
