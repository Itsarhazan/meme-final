'use strict';

function renderGallery() {
    var imgs = getImgs();
    var imgsHTMLs = imgs.map(img => {
        return `<img src="${img.url}" onclick="btnImg(${img.id})" class="img-${img.id}">`
    })
    var elgallery = document.querySelector('.meme-gallery');
    elgallery.innerHTML = imgsHTMLs.join('');
}


function openGallery() {
    document.querySelector('.main-gallery').classList.remove('hide');
    document.querySelector('.meme-editor').classList.add('hide');
    document.querySelector('.btn-share').classList.add('hide');


}

function btnImg(id) {
    clearCanvas()

    renderMeme(id);
    document.querySelector('.main-gallery').classList.add('hide');
    document.querySelector('.meme-editor').classList.remove('hide');
}

function clearCanvas() {
    gMeme.lines[0].txt = ''
    gMeme.lines[1].txt = ''
    gMeme.lines[2].txt = ''
}