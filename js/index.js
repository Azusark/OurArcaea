const channel1 = new BroadcastChannel('AnimationChannel');
const channel2 = new BroadcastChannel('TopContainerChannel');
const channel3 = new BroadcastChannel('LoginChannel');
const channel4 = new BroadcastChannel('AboutChannel');
let IsCanEscape = false;
//遮罩层
const mask = document.getElementById('myOverlay');
//顶栏
function topContainer() {
    const myTopContainer = document.getElementById('myTopContainer');
    fetch('top_container.html')
        .then(response => response.text())
        .then(html => {
            myTopContainer.srcdoc = html;
        })
        .catch(error => {
            console.error('加载侧栏失败:', error);
        });
}
topContainer();
// 动态加载侧栏
function loadAboutContainer() {
    const myAbout = document.getElementById('myAbout');
    fetch('about.html')
        .then(response => response.text())
        .then(html => {
            myAbout.srcdoc = html;
        })
        .catch(error => {
            console.error('加载侧栏失败:', error);
        });
}
loadAboutContainer();
function loadAbout() {
  const myAbout = document.getElementById('myAbout');
  setTimeout(() => {
    myAbout.style.display= "block";
    mask.style.display = 'block';
    channel4.postMessage({ type: 'AboutImageMove1' });
    console.log('加载about菜单');
    setTimeout(() => {
        IsCanEscape = true;
    }, 495);
}, 10);
}
//加载出登陆菜单容器
function loadLoginContainer() {
    const myLogin = document.getElementById('myLogin');
    fetch('login.html')
        .then(response => response.text())
        .then(html => {
            myLogin.srcdoc = html;
        })
        .catch(error => {
            console.error('加载侧栏失败:', error);
        });
}
loadLoginContainer();
//加载出登陆菜单
function loadLogin() {
    const myLogin = document.getElementById('myLogin');
    setTimeout(() => {
      myLogin.style.display= "block";
      mask.style.display = 'block';
      channel3.postMessage({ type: 'LoginImageMove1' });
      console.log('加载登陆菜单');
      setTimeout(() => {
          IsCanEscape = true;
      }, 495);
  }, 10);
}
//点击ESC关闭侧栏
document.addEventListener('keydown', function(event) {
    if (event.key == "Escape" && IsCanEscape==true) {
        IsCanEscape = false;
        channel3.postMessage({ type: 'LoginImageMove2' });
        channel4.postMessage({ type: 'AboutImageMove2' });
        setTimeout(() => {
            document.getElementById('myLogin').style.display = "none";
            document.getElementById('myAbout').style.display = "none";
        }, 495);
        mask.style.display = 'none';
    }
});
// 当界面重新获得焦点时，重置 IsCanEscape
// 还需修改，改为点击注入的界面也能重置
window.onfocus = function() {
  if (IsCanEscape == false) {
    IsCanEscape = true;
  }
  else {
    IsCanEscape = false;
  }
};
//开始游戏-进入选关界面
document.getElementById('myBtn_StartGame').addEventListener('click', function() {
    channel1.postMessage({ type: 'PlayAnimation' });
    console.log('开始游戏');
    window.dispatchEvent(new CustomEvent('titleChange'));
    setTimeout(() => {
        //跳转到其他界面
        window.location.href = "../html/page4.html";
        }, 1600);
});
// 绑定按钮点击事件
document.getElementById('myBtn_About').addEventListener('click', loadAbout);
document.getElementById('myBtn_Login').addEventListener('click', loadLogin);

// 音乐播放配置
const MUSIC_CONFIG = {
    volume: 0.3, // 音量 (0到1)
    fadeDuration: 1000 // 淡入淡出时间 (单位：毫秒)
};

  // 获取音乐元素
    const music = document.getElementById('background-music');
    music.volume = MUSIC_CONFIG.volume;
    music.play();

  // 音量淡入函数
function fadeVolume(audio, from, to, duration) {
    const startTime = Date.now();
    const updateVolume = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
      audio.volume = from + (to - from) * progress;
    if (progress < 1) {
        requestAnimationFrame(updateVolume);
    }
    };    
    updateVolume();
}

 //切换角色立绘
let currentImageIndex = 1;
const totalImages = 7;
const partnerImage = document.getElementById('partnerImage');
const PartnerChangeBtn = document.getElementById('PartnerChangeBtn');
PartnerChangeBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex % totalImages) + 1;
    // 更新图片的src属性
    partnerImage.src = `../icon/partner/partner${currentImageIndex}.png`;
    channel2.postMessage({ type: 'PartnerChange', value: currentImageIndex });
});
const preloadImages = [];
for (let i = 1; i <= totalImages; i++) {
  const img = new Image();
  img.src = `../icon/partner/partner${i}.png`;
  preloadImages.push(img);
}

// 获取所有按钮元素
const buttons = document.querySelectorAll('.custom-btn');

// 定义一组默认图片和悬停图片路径
const buttonImages = [
  { default: '../icon/btn/btn1.png', hover: '../icon/btn/btn1-hover.png' },
  { default: '../icon/btn/btn2.png', hover: '../icon/btn/btn2-hover.png' },
  { default: '../icon/btn/btn3.png', hover: '../icon/btn/btn3-hover.png' },
  { default: '../icon/btn/btn4.png', hover: '../icon/btn/btn4-hover.png' },
  { default: '../icon/btn/btn5.png', hover: '../icon/btn/btn5-hover.png' },
  { default: '../icon/btn/btn6.png', hover: '../icon/btn/btn6-hover.png' },
];

// 为每个按钮添加事件监听器
buttons.forEach((button, index) => {
  // 检查是否有对应的图片路径
  if (buttonImages[index]) {
    const { default: defaultImage, hover: hoverImage } = buttonImages[index];
    // 添加鼠标悬停事件监听器
    button.addEventListener('mouseenter', () => {
      button.setAttribute('xlink:href', hoverImage); // 切换到悬停图片
    });
    // 添加鼠标离开事件监听器
    button.addEventListener('mouseleave', () => {
      button.setAttribute('xlink:href', defaultImage); // 切换回默认图片
    });
  } else {
    console.error(`按钮 ${index} 没有对应的图片路径`);
  }
});


  document.getElementById('BackgroundImageBtn').addEventListener('click', function() {
    var img = document.getElementById('backgroundImage');
    var currentSrc = img.src;
    var newSrc;
    
    // 检查当前图片的src并决定下一个图片
    if (currentSrc.includes('Background1')) {
      newSrc = '../icon/background/Background2.png';
    } else if (currentSrc.includes('Background2')) {
      newSrc = '../icon/background/Background3.png';
    } else if (currentSrc.includes('Background3')) {
      newSrc = '../icon/background/Background1.png';
    } else {
      newSrc = '../icon/background/Background1.png';
    }
    
    img.src = newSrc;
  });

