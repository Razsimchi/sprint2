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
    onClear()
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
function onSearch(){
    const input = document.querySelector('.search-input').value
    updategKeyWordSerched(input)
    updategKeywordSearchCountMap(input)
    renderGallery()
    renderKeyWord()
}
function renderKeyWord(){
    const elKeyWords = document.querySelector('.key-words')
    const keyWords = getgKeywordSearchCountMap()
    let strHTML = `<span style="font-size: ${16+keyWords.all}px;" onclick="onKeyWord('all')">All</span>
    <span style="font-size: ${16+keyWords.funny}px;" onclick="onKeyWord('funny')">Funny</span>
    <span style="font-size: ${16+keyWords.cat}px;" onclick="onKeyWord('cat')">Cat</span>
    <span style="font-size: ${16+keyWords.baby}px;" onclick="onKeyWord('baby')">Baby</span>`
    elKeyWords.innerHTML = strHTML
}
function onKeyWord(key){
    updategKeyWordSerched(key)
    updategKeywordSearchCountMap(key)
    renderGallery()
    renderKeyWord()
    console.log(gKeywordSearchCountMap);
}