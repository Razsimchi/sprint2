'use strict'

function renderGallery(){
    let imgs=getgImgs()
    let strHTML = imgs.map(img => `<img class="img-gallery" onclick="onImgSelect(${img.id})" src="images/${img.id}.jpg" alt="">`
    ).join('')
    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML=strHTML
}
function onImgSelect(id){
    setImg(id)
    updategMeme('')
    renderMeme()
    onMeme()
}
function onGallery(){
    const elSavedMeme = document.querySelector('.saved-memes')
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.gallery')
    const elGallerySearch = document.querySelector('.gallery-search')
    elEditor.style.display = 'none'
    elGallery.style.display = 'grid'
    elGallerySearch.style.display = 'grid'
    elSavedMeme.style.display = 'none'
}