// declare variables to select the icon actions
const deleteList = document.querySelectorAll('.list-trash');
const removeWord = document.querySelectorAll('.word-trash');
const favoriteList = document.querySelectorAll('.fa-heart');
const archiveList = document.querySelectorAll('.fa-box');
const editList = document.querySelectorAll('.fa-pen');

Array.from(deleteList).forEach((element)=>{
    element.addEventListener('click', deleteVocabList)
})


// deleting individual words (AKA UPDATING THE LIST)
Array.from(removeWord).forEach((element) =>{
    element.addEventListener('click', removeSingleWord)
})

 async function removeSingleWord() {
    const query = this.parentNode.childNodes[1].innerText;
    const unitName = this.parentNode.parentNode.querySelector('h3').innerText; 
    console.log(query, unitName);

    try {
        const response = await fetch('deleteSingleWord', {
            method: 'put', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'wordSelected': query, 
                'unitSelected': unitName 
            })
        })

        const data = await response.json();
        console.log(data);
        location.reload(); 
    }
    catch(error) {
        console.error(error);
    }
}

// delete entire list 
async function deleteVocabList(){
    const unitName = this.parentNode.childNodes[1].innerText;
    const wordList = this.parentNode.childNodes[3].innerText;

    try{
        const response = await fetch('deleteVocabList', {
            method: 'delete', 
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'unitNameSelect' : unitName,
                'wordListSelect' : wordList
            })
        })
        const data = await response.json()
        console.log(data);
        location.reload()
    }
    catch(error){
        console.error(error)
    }
}