'use strict'
const STORAGE_KEY = 'memesdb'
const gPositions = [{ x: 200, y: 40 }, { x: 200, y: 360 }, { x: 200, y: 200 }]
let gElCanvas
let gCtx
let gSavedMemes = loadFromStorage(STORAGE_KEY) || []
let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'white',
            isStroke: true,
            isDrag: false,
            pos: { x: 200, y: 40 }
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
function drawText(text, x, y, color, isStroke, size, align, font = 'Impact') {
    gCtx.lineWidth = 1
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
    saveToStorage(STORAGE_KEY, gSavedMemes)
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
    gMeme.lines[lineIdx].pos = getLinePos(lineIdx)
}
function createNewLine() {
    const line = {
        txt: '',
        size: 20,
        align: 'left',
        color: 'white',
        isStroke: true,
        isDrag: false,
    }
    gMeme.lines.push(line)
    changeLine()
    onChangeFont()
}
function clear() {
    gMeme.lines.forEach(line => line.txt = '')
    gMeme.selectedLineIdx = 0
}
function increaseFont() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size += 5
}
function decreaseFont() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size -= 5
}
function alignToLeft() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].align = 'left'
}
function alignToCenter() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].align = 'center'
}
function alignToRight() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].align = 'right'
}
function addStroke() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].isStroke = !gMeme.lines[lineIdx].isStroke
}
function getColor(color = 'black') {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].color = color
}
function changeFont(font) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].font = font
}
function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}
function addMouseListeners() {
    gElCanvas.addEventListener('click', onCanvasClick)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}
function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}
function handleCanvasClick(ev) {
    let lineIdx
    const pos = getEvPos(ev)
    gMeme.lines.forEach((line, idx) => {
        if (pos.y >= line.pos.y - 20 && pos.y <= line.pos.y + 20) {
            lineIdx = idx
        }
    })
    gMeme.selectedLineIdx = lineIdx
}
function updategElCanvas(elContainer) {
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
function getgSavedMemes() {
    return gSavedMemes
}
function save() {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    gSavedMemes.push({ img: imgContent, meme: { ...gMeme } })
    _saveMemeToStorage()
}
function setgMeme(idx) {
    gMeme = gSavedMemes[idx].meme
}
function addToImgs(img) {
    const image = { id: gImgs.length + 1, url: img }
    gMeme.selectedImgId = gImgs.length + 1
    gImgs.push(image)
}
function updateIsClicked(bool) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].isDrag = bool
}
function moveShape(dx, dy) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].pos.x += dx
    gMeme.lines[lineIdx].pos.y += dy
}
function updatePos(pos) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].pos = pos
}