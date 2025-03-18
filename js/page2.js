const channel1 = new BroadcastChannel('AnimationChannel');
const channel2 = new BroadcastChannel('SwitchWithFading');
//加载顶栏
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
//滚动效果变量
const container = document.getElementById('scrollContainer');
const content = document.getElementById('scrollContent');
const bigContainer = document.getElementById('bigContainer');
const myPage4 = document.getElementById('myPage4');
let isDown = false;
let startX;
let scrollLeft;
let velocity = 0;
let lastTime = 0;
let lastScroll = 0;
let rafId;
//加载page4
function loadPage4() {
  fetch('page4.html')
      .then(response => response.text())
      .then(html => {
          myPage4.srcdoc = html;
      })
      .catch(error => {
          console.error('加载侧栏失败:', error);
      });
}
loadPage4();
//加载专辑
function loadAlbum() {
  var myAlbumsContainer = new Array();
  var myAlbumsItem = new Array();
  for (var i = 1; i <= 16; i++) {
    myAlbumsContainer[i] = document.createElement('div');
    myAlbumsContainer[i].className = 'item-container';
    myAlbumsItem[i] = document.createElement('img');
    myAlbumsItem[i].src = "../icon/album/album" + i + ".png";
    console.log(myAlbumsItem[i].src);
    myAlbumsItem[i].className = 'item';
    myAlbumsItem[i].id = "album" + i;
    myAlbumsContainer[i].appendChild(myAlbumsItem[i]);
    content.appendChild(myAlbumsContainer[i]);
  }
}
loadAlbum();
//page2d淡出page4淡入
function clickAlbumEnter() {
  for (var i = 1; i <= 16; i++) {
    const myAlbumsItem = document.getElementById("album" + i);
    myAlbumsItem.addEventListener('click', function() {
      console.log('点击专辑' + i);
      setTimeout(() => {
        bigContainer.style.opacity="0";
        myPage4.style.opacity="1";
        setTimeout(() => {
            bigContainer.style.display="none";
        },500);
      }, 10);
    });
  }
}
//page2d淡R入page4淡出
function clickAlbumBack() {
  channel2.onmessage = function(e) {
    if (e.data.type === 'switchwithfading') {
      setTimeout(() => {
        bigContainer.style.display="block";
        setTimeout(() => {
          bigContainer.style.opacity="1";
          myPage4.style.opacity="0";
        },10);
      }, 10);
    };
  }
}
clickAlbumEnter();
clickAlbumBack();
// 滑动鼠标事件
container.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.clientX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  cancelAnimationFrame(rafId);
  container.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
  isDown = false;
  container.style.cursor = 'grab';
  applyMomentum();
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.clientX - container.offsetLeft;
  const walk = (x - startX) * 1.5; // 降低滑动系数
  container.scrollLeft = scrollLeft - walk;
  // 计算速度
  const time = Date.now();
  if (time > lastTime) {
    velocity = (container.scrollLeft - lastScroll) / (time - lastTime);
    lastTime = time;
    lastScroll = container.scrollLeft;
  }
});
// 滑动触摸事件
container.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].clientX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  cancelAnimationFrame(rafId);
  velocity = 0;
});

container.addEventListener('touchend', () => {
  isDown = false;
  applyMomentum();
});

container.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  
  const x = e.touches[0].clientX - container.offsetLeft;
  const walk = (x - startX) * 1.2; // 降低触摸滑动系数
  container.scrollLeft = scrollLeft - walk;
  // 计算速度
  const time = Date.now();
  if (time > lastTime) {
    velocity = (container.scrollLeft - lastScroll) / (time - lastTime);
    lastTime = time;
    lastScroll = container.scrollLeft;
  }
});
// 惯性滑动函数
function applyMomentum() {
  const minVelocity = 0.15;
  const friction = 0.99;
  if (Math.abs(velocity) > minVelocity) {
    container.scrollLeft += velocity * 3.5;
    velocity *= friction;
    rafId = requestAnimationFrame(applyMomentum);
  } 
  else {
    velocity = 0;
  }
}
//回弹效果
//返回主页
document.getElementById('backbutton').addEventListener('click', function() {
  channel.postMessage({ type: 'PlayAnimation' });
  console.log('开始游戏');
  setTimeout(() => {
      //跳转到其他界面
      window.location.href = "../html/index.html";
      }, 1600);
});

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
    channel1.postMessage({ type: 'PlayAnimation' });
    console.log('返回主页');
    setTimeout(() => {
        // 跳转到其他界面
        window.location.href = "../html/index.html";
    }, 1600);
});