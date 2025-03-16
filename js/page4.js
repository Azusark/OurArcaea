//返回按钮
// 获取按钮和图片元素
const backButton = document.getElementById('backbutton');
const hoverImage = backButton.querySelector('.hover-image');

// 定义默认图片和悬停图片路径
const defaultImage = '../icon/backbutton.png';
const hoverImageSrc = '../icon/backbutton-pressed.png';

// 监听鼠标悬停事件
backButton.addEventListener('mouseenter', () => {
    hoverImage.src = hoverImageSrc; // 切换到有阴影的图片
});

backButton.addEventListener('mouseleave', () => {
    hoverImage.src = defaultImage; // 切换回默认图片
});

// 返回主页
backButton.addEventListener('click', function() {
    channel.postMessage({ type: 'PlayAnimation' });
    console.log('开始游戏');
    setTimeout(() => {
        // 跳转到其他界面
        window.location.href = "../html/index.html";
    }, 1600);
});