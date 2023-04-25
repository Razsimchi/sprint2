'use strict'

function onInit() {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    setgElCanvas(canvas)
    setgCtx(ctx)
    renderMeme(gMeme)
    renderGallery()
}

function renderMeme({selectedImgId,selectedLineIdx,lines}) {
    const ctx = getgCtx()
    const canvas = getgElCanvas()
    const elImg =  new Image()
    elImg.src = findImgById(selectedImgId).url
    const pos = getLinePos(selectedLineIdx)
    const meme = getgMeme()
    const {txt , size , align , color , strokeColor , font} = lines[selectedLineIdx]
    elImg.onload = () => {
        ctx.drawImage(elImg,0,0, canvas.width, canvas.height)
        meme.lines.forEach( line=> {
        drawText(txt,pos.x, pos.y,color , strokeColor,size,align,font)
    })
    }
}
function onTextInput(ev){
    if (ev.keyCode===13) return 
    const txt = document.querySelector('input').value 
    updategMeme(txt)
    const meme = getgMeme()
    renderMeme(meme)
}

function onTextSubmit(ev){
    ev.preventDefault()
    document.querySelector('input').value = ''
}
function onChangeLine(){
    changeLine()
}