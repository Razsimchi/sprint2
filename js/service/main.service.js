'use strict'
let gElCanvas
let gCtx
let gImgs = fillgImgs()
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function updategElCanvas(elContainer) {
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
function setgElCanvas(canvas) {
    gElCanvas = canvas
}
function getgElCanvas() {
    return gElCanvas
}
function setgCtx(ctx) {
    gCtx = ctx
}
function getgCtx() {
    return gCtx
}
function drawText(text, x, y, color, strokeColor, size, align, font) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = `${size} ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
function getgMeme() {
    return gMeme
}
function getgImgs() {
    return gImgs
}
function findImgById(id) {
    return gImgs.find(img => img.id === id)
}
function getLinePos(lineIdx) {
    let pos = {}
    switch (lineIdx) {
        case 0:
            pos.x = 200
            pos.y = 40
            break;
        case 1:
            pos.x = 200
            pos.y = 360
            break;
        case 2:
            pos.x = 200
            pos.y = 200
            break;
    }
    return pos
}
function updategMeme(txt) {
    const selectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines[selectedLineIdx].txt = txt
}
function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}
function fillgImgs() {
    const imgs = []
    for (let i = 0; i < 18; i++) {
        const img = { id: i + 1, url: `images/${i + 1}.jpg` }
        imgs.push(img)
    }
    return imgs
}
function setImg(id) {
    gMeme.selectedImgId = id
}
function changeLine() {
    let lineIdx = gMeme.selectedLineIdx
    if (lineIdx >= 3) {
        lineIdx = 0
    }else lineIdx++
    gMeme.selectedLineIdx = lineIdx
    if (gMeme.lines[lineIdx]) return
    createNewLine()
}
function createNewLine() {
    const line = {
        txt: '',
        size: 20,
        align: 'left',
        color: 'red'
    }
    gMeme.lines.push(line)
}
function isMemeEmpty(){
    return gMeme.lines.every(line => line.txt === '')
}