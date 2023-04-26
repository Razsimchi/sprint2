'use strict'
const gPositions = [{ x: 200, y: 40 }, { x: 200, y: 360 }, { x: 200, y: 200 }]
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
            color: 'white',
            isStroke: true
        }
    ]
}
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function updategElCanvas(elContainer) {
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
function getPositions() {
    return gPositions
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
function drawText(text, x, y, color, isStroke, size, align, font='Impact') {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    if (isStroke) gCtx.strokeText(text, x, y)
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
    if (lineIdx >= 2) {
        lineIdx = 0
    } else lineIdx++
    if (!gMeme.lines[lineIdx]) return
    gMeme.selectedLineIdx = lineIdx
}
function createNewLine() {
    const line = {
        txt: '',
        size: 20,
        align: 'left',
        color: 'white',
        isStroke: true
    }
    gMeme.lines.push(line)
    changeLine()
    onChangeFont()
}
function clear() {
    gMeme.lines.forEach(line => line.txt = '')
    gMeme.selectedLineIdx = 0
}
function increaseFont(){
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size += 5
}
function decreaseFont(){
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size -= 5
}
function alignToLeft(){
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].align = 'left'
}
function alignToCenter(){
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].align = 'center'
}
function alignToRight(){
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].align = 'right'
}
function addStroke(){
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].isStroke = !gMeme.lines[lineIdx].isStroke
}
function getColor(color='black'){ 
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].color = color
}
function changeFont(font){
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].font = font
}
function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    return pos
}
function addMouseListeners() {
    gElCanvas.addEventListener('click', onCanvasClick)
}
function handleCanvasClick(ev){
    let lineIdx
    const pos = getEvPos(ev)
    if (pos.y >= 20 && pos.y <= 55) lineIdx=0
    else if (pos.y >= 340 && pos.y <= 375) lineIdx=1
    else if (pos.y >= 180 && pos.y <= 215) lineIdx=2
    else return
    gMeme.selectedLineIdx = lineIdx
}
function updategElCanvas(elContainer) {
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}