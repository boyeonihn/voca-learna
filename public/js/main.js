// declare variables to select the icon actions
const deleteList = document.querySelectorAll('.fa-trash');
const favoriteList = document.querySelectorAll('.fa-heart');
const archiveList = document.querySelectorAll('.fa-box');
const editList = document.querySelectorAll('.fa-pen');

Array.from(deleteList).forEach((element)=>{
    element.addEventListener('click', deleteWordList)
})

async function deleteWordList(){
    const unitName = this.parentNode.childNodes[1].innerText;
    const wordList = this.parentNode.childNodes[3].innerText;
}