function make(type, e){
    let span = document.createElement(type)

    let selection = window.getSelection()
    let range = selection.getRangeAt(0).cloneRange()

    if(range.collapsed){
        return
    }
   
    range.surroundContents(span)
    selection.removeAllRanges()
    selection.addRange(range)
    
}

function makeList() {
    let textEditor = document.getElementById('content')
    let ul = document.createElement('ul')
    let li = document.createElement('li')
    ul.appendChild(li)
    textEditor.appendChild(ul)
}

function editFile(event){
    let fileTitleToEdit = event.path[event.path.length - 6].firstChild.textContent
    let fileContentToEdit = event.path[event.path.length - 6].lastChild
    
    let textEditor = document.getElementById('content')
    let titleTextEditor = document.getElementById('title')

    console.log(fileContentToEdit)

    textEditor.innerHTML = fileContentToEdit.innerHTML
    titleTextEditor.value = fileTitleToEdit

    titleTextEditor.readOnly = true
}

async function getData() {
    let div = document.getElementById('text-available-list')
    let texts = await fetch('/readFiles')
    .then(response => response.json())
    .then(data => {return data})

    texts.forEach(text => {

        let innerDiv = document.createElement('div')
        let innerDiv2 = document.createElement('div')
        innerDiv.className = 'mainText'
        innerDiv2.className = 'titleText'

        innerDiv.onclick = (e) => editFile(e)
        let title = document.createElement('h')
        let titleText = document.createTextNode(!text.title ? '' : text.title)
        title.appendChild(titleText)
        innerDiv2.appendChild(title)

        let content = document.createElement('div')
        content.className = 'contentText'
        let textContent = text.content

        content.innerHTML = textContent

        innerDiv.appendChild(innerDiv2)
        innerDiv.appendChild(content)

        div.appendChild(innerDiv)
    })

}

let textEditor = document.getElementById('content')
let hiddenSubmit = document.getElementById('contentInput')
let titleTextEditor = document.getElementById('title')
const form = document.getElementById('form')
form.addEventListener('submit', event => {

    if(titleTextEditor.value == ""){
        event.preventDefault()
        alert("Podaj tytuł")
        return
    }

    hiddenSubmit.value = textEditor.innerHTML
})