'use strict'

function onInit() {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    setgElCanvas(canvas)
    setgCtx(ctx)
    renderMeme(gMeme)
    renderGallery()
    resizeCanvas()
    addMouseListeners()
}

function renderMeme() {
    changeColor()
    const { selectedImgId, selectedLineIdx, lines } = getgMeme()
    const ctx = getgCtx()
    const canvas = getgElCanvas()
    const elImg = new Image()
    elImg.src = findImgById(selectedImgId).url
    const positions = getPositions()
    elImg.onload = () => {
        ctx.drawImage(elImg, 0, 0, canvas.width, canvas.height)
        lines.forEach((line, idx) => {
            const pos = positions[idx]
            const { txt, size, align, isStroke, color, font } = line
            drawText(txt, pos.x, pos.y, color, isStroke, size, align, font)
        })
    }
}
function onTextInput(ev) {
    if (ev.keyCode === 13) return
    const txt = document.querySelector('input').value
    updategMeme(txt)
    renderMeme()
}

function onTextSubmit(ev) {
    ev.preventDefault()
    document.querySelector('input').value = ''
}
function onChangeLine() {
    changeLine()
}
function onClear() {
    clear()
    renderMeme()
}
function onIncreaseFont() {
    increaseFont()
    renderMeme()
}
function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}
function onAlignToLeft() {
    alignToLeft()
    renderMeme()
}
function onAlignToCenter() {
    alignToCenter()
    renderMeme()
}
function onAlignToRight() {
    alignToRight()
    renderMeme()
}
function onStroke() {
    addStroke()
    renderMeme()
}
function onChangeColor() {
    document.querySelector(".color-input").click()
}
function onChangeFont() {
    const font = document.querySelector(".font-select").value
    changeFont(font)
    renderMeme()
}
function onAddNewLine() {
    createNewLine()
}
function changeColor() {
    const color = document.querySelector(".color-input").value
    getColor(color)
}
function onCanvasClick(ev) {
    handleCanvasClick(ev)
    renderMeme()
}
function onShareMeme() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}
function downloadMeme(elLink) {
    const canvas = getgElCanvas()
    const imgContent = canvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    updategElCanvas(elContainer)
}
