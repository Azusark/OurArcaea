const channel = new BroadcastChannel('AboutChannel');
const aboutTextCont = document.getElementById('aboutContentContainer');

function playImgAnimation1() {
    const img1 = document.getElementById('myImg1');
    const img2 = document.getElementById('myImg2');
    setTimeout(() => {
        img1.style.left = "0px";
        img1.style.opacity = "1";
        aboutTextCont.style.opacity = "1";
        setTimeout(() => {    
            img2.style.left = "495px";    
            img2.style.opacity = "0.9";    
        }, 200);
    }, 10);        
}

function playImgAnimation2() {
    const img1 = document.getElementById('myImg1');
    const img2 = document.getElementById('myImg2');
    setTimeout(() => {
        img2.style.left = "100px";
        img2.style.opacity = "0";
        aboutTextCont.style.opacity = "0";
        setTimeout(() => {
            img1.style.left = "-200px";
            img1.style.opacity = "0";
        }, 200);
    }, 30);
}

channel.onmessage = function(e) {
    if (e.data.type === 'AboutImageMove1') {
        playImgAnimation1();
        console.log('AboutImageMove1 已触发');
    }
    if (e.data.type === 'AboutImageMove2') {
        playImgAnimation2();
        console.log('AboutImageMove2 已触发');
    }
};
