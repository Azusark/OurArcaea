const container = document.querySelector('.container');
const image = document.querySelector('.scroll-image');
const channel = new BroadcastChannel('AnimationChannel');

// 点击容器触发动画
container.addEventListener('click', () => {
  // 添加动画类
  image.classList.add('animate');

  // 监听动画结束事件
  image.addEventListener('animationend', () => {
    // 动画结束后，添加点击事件监听器到容器
    container.addEventListener('click', () => {
      channel.postMessage({ type: 'PlayAnimation' });
      console.log('跳转到主界面');
      setTimeout(() => {
        //跳转到其他界面
        window.location.href = "../html/index.html";
      }, 1600);
    }, { once: true }); // 只触发一次
  }, { once: true }); // 只触发一次
});

// 图片淡入独立功能配置 (需要修改的参数)
const POPUP_CONFIG = [
  {
    showDelay: 2000,   // X秒后显示 (单位：毫秒)
    hideDelay: 12000,   // 显示后Y秒隐藏 (单位：毫秒)
    position: {
      x: window.innerWidth * 0.34, // 水平位置34vw
      y: window.innerHeight * 0.60 // 垂直位置60vh
    }
  },
  {
    showDelay: 5000,   // X秒后显示 (单位：毫秒)
    hideDelay: 12000,   // 显示后Y秒隐藏 (单位：毫秒)
    position: {
      x: window.innerWidth * 0.24, // 水平位置24vw
      y: window.innerHeight * 0.40 // 垂直位置40vh
    }
  }
];

// 独立事件监听器
document.querySelector('.container').addEventListener('click', function () {
  // 第一个弹窗
  const popup1 = document.getElementById('independent-popup-1');
  // 第二个弹窗
  const popup2 = document.getElementById('independent-popup-2');

  // 第一次点击触发
  if (!this.dataset.popupActive) {
    this.dataset.popupActive = true;

    // 设置第一个弹出定时
    setTimeout(() => {
      // 1. 先显示元素（不触发过渡）
      popup1.style.display = 'block';
      popup1.style.opacity = '0'; // 初始透明度为0

      // 2. 强制重绘，确保浏览器渲染
      void popup1.offsetWidth;

      // 3. 触发淡入效果
      popup1.style.opacity = '1';
    }, POPUP_CONFIG[0].showDelay);

    // 设置第二个弹出定时
    setTimeout(() => {
      // 1. 先显示元素（不触发过渡）
      popup2.style.display = 'block';
      popup2.style.opacity = '0'; // 初始透明度为0

      // 2. 强制重绘，确保浏览器渲染
      void popup2.offsetWidth;

      // 3. 触发淡入效果
      popup2.style.opacity = '1';

      // 4. 设置淡出定时
      setTimeout(() => {
        popup1.style.opacity = '0'; // 淡出
        popup2.style.opacity = '0'; // 淡出

        // 5. 淡出完成后隐藏元素
        setTimeout(() => {
          popup1.style.display = 'none';      
          popup2.style.display = 'none';
        }, 500); // 等待淡出动画完成
      }, POPUP_CONFIG[1].hideDelay);
    }, POPUP_CONFIG[1].showDelay);
  }
});


// 音乐播放配置
const MUSIC_CONFIG = {
  volume: 0.7, // 音量 (0到1)
  fadeDuration: 1000 // 淡入淡出时间 (单位：毫秒)
};

// 获取音乐元素
const music = document.getElementById('background-music');

// 独立事件监听器
document.addEventListener('click', function () {
  // 如果音乐未播放，则开始播放
  if (music.paused) {
    // 淡入效果
    music.volume = MUSIC_CONFIG.volume;
    music.play();
    fadeVolume(music, 0, MUSIC_CONFIG.volume, MUSIC_CONFIG.fadeDuration);
  }
}, { once: true }); // 只触发一次

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
