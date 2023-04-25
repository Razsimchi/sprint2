'use strict'

function renderGallery(){
    let imgs=getgImgs()
    let strHTML = imgs.map(img => `<img onclick="onImgSelect(${img.id})" src="images/${img.id}.jpg" alt="">`
    ).join('')
    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML=strHTML
}
function onImgSelect(id){
    setImg(id)
    updategMeme('')
    const meme = getgMeme()
    renderMeme(meme)
}