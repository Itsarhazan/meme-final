'use strict';


var gImgs = [
    { id: 1, url: "./img/imgs/1.jpg", keywords: ['baby', 'funny'] },
    { id: 2, url: "./img/imgs/2.jpg", keywords: ['person', 'unlucky', 'ironic'] },
    { id: 3, url: "./img/imgs/3.jpg", keywords: ['priorities', 'funny'] },
    { id: 4, url: "./img/imgs/4.jpg", keywords: ['priorities', 'funny'] },
    { id: 5, url: "./img/imgs/5.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 6, url: "./img/imgs/6.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 7, url: "./img/imgs/7.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 8, url: "./img/imgs/8.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 9, url: "./img/imgs/9.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 10, url: "./img/imgs/10.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 11, url: "./img/imgs/11.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 12, url: "./img/imgs/12.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 13, url: "./img/imgs/13.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 14, url: "./img/imgs/14.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 15, url: "./img/imgs/15.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 16, url: "./img/imgs/16.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 17, url: "./img/imgs/17.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 18, url: "./img/imgs/18.jpg", keywords: ['priorities', 'cat', 'funny'] },
];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
            txt: '',
            size: 40,
            align: 'center',
            fillColor: 'black',
            strokeColor: 'black',
            font: 'Ariel',
            location: { x: 80, y: 50 },
            isDrag: false
        },
        {
            txt: '',
            size: 40,
            align: 'center',
            fillColor: 'black',
            strokeColor: 'black',
            font: 'Ariel',
            location: { x: 80, y: 200 },
            isDrag: false
        },
        {
            txt: '',
            size: 40,
            align: 'center',
            fillColor: 'black',
            strokeColor: 'black',
            font: 'Ariel',
            location: { x: 80, y: 350 },
            isDrag: false
        }
    ]
}


function setLineTxt(memeTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = memeTxt;
}


// function addTxtBox() {
//     if (gMeme.selectedLineIdx === 0) {
//         gTxtBox.push(getTxtBox(80, 50))
//             // console.log(gTxtBox);
//         return gTxtBox;
//     }
//     if (gMeme.selectedLineIdx === 1) {
//         gTxtBox.push(getTxtBox(80, 200))
//         return gTxtBox;
//     }
//     if (gMeme.selectedLineIdx === 2) {
//         gTxtBox.push(getTxtBox(80, 350))
//         return gTxtBox;
//     }
//     // renderCanvas()
// }



function clearLine() {
    if (gMeme.selectedLineIdx === 0)
        gMeme.lines[0].txt = '';
    if (gMeme.selectedLineIdx === 1)
        gMeme.lines[1].txt = '';
    if (gMeme.selectedLineIdx === 2)
        gMeme.lines[2].txt = '';

}


function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;

}

function onDownloadMeme(downLodeMeme) {
    downloadMeme(downLodeMeme);
}

function downloadMeme(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'memes';
}


function uploadImg() {

    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.btn-share').classList.remove('hide');
        document.querySelector('.btn-share').innerHTML = `
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        share </a>`
    }

    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}