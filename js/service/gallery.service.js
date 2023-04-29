'use strict'
let gkeyWordSerched = 'all'
const gKeywordSearchCountMap = { 'all': 0, 'funny': 0, 'cat': 0, 'baby': 0 }

const gImgs = [
    { id: 1, url: `images/1.jpg`, keyWord: [''] },
    { id: 2, url: `images/2.jpg`, keyWord: [''] },
    { id: 3, url: `images/3.jpg`, keyWord: ['dog', 'funny'] },
    { id: 4, url: `images/4.jpg`, keyWord: ['cat'] },
    { id: 5, url: `images/5.jpg`, keyWord: ['baby', 'funny'] },
    { id: 6, url: `images/6.jpg`, keyWord: ['funny'] },
    { id: 7, url: `images/7.jpg`, keyWord: ['baby', 'funny'] },
    { id: 8, url: `images/8.jpg`, keyWord: ['funny'] },
    { id: 9, url: `images/9.jpg`, keyWord: ['baby', 'funny'] },
    { id: 10, url: `images/10.jpg`, keyWord: ['funny'] },
    { id: 11, url: `images/11.jpg`, keyWord: ['funny'] },
    { id: 12, url: `images/12.jpg`, keyWord: [''] },
    { id: 13, url: `images/13.jpg`, keyWord: ['funny'] },
    { id: 14, url: `images/14.jpg`, keyWord: [''] },
    { id: 15, url: `images/15.jpg`, keyWord: [''] },
    { id: 16, url: `images/16.jpg`, keyWord: ['funny'] },
    { id: 17, url: `images/17.jpg`, keyWord: [''] },
    { id: 18, url: `images/18.jpg`, keyWord: ['funny'] }
]
function getgImgs() {
    if (gkeyWordSerched==='all') return gImgs
    let imgs = gImgs.filter(img => img.keyWord.join(',').includes(gkeyWordSerched))
    return imgs
}
function updategKeyWordSerched(input){
    gkeyWordSerched = input
}
function getgKeywordSearchCountMap(){
    return gKeywordSearchCountMap
}
function updategKeywordSearchCountMap(key){
    gKeywordSearchCountMap[key]++
}
