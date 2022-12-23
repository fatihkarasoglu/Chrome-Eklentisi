let mySave = [];
let myLastSave = [];
const inputBtnEl = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const mySaveFromLocalStorage = JSON.parse(localStorage.getItem("mySave"));

if(mySaveFromLocalStorage) {
    mySave = mySaveFromLocalStorage;
    render(mySave);
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        mySave.push(tabs[0].url);
        localStorage.setItem("mySave", JSON.stringify(mySave));
        render(mySave);
    })
})

function render(myLastSave) {
    let listItems = "";
    for(let i = 0; i < myLastSave.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href="${myLastSave[i]}">
                    ${myLastSave[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    mySave = [];
    render(mySave);
})

inputBtnEl.addEventListener("click", function() {
    mySave.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("mySave", JSON.stringify(mySave));
    render(mySave);

    console.log(localStorage.getItem("mySave"));
})