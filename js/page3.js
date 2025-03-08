const container = document.querySelector('.container');
const image = document.querySelector('.scroll-image');

// 点击容器触发动画
container.addEventListener('click', () => {
  // 添加动画类
  image.classList.add('animate');

  // 监听动画结束事件
  image.addEventListener('animationend', () => {
    // 动画结束后，添加点击事件监听器
    container.addEventListener('click', () => {
      // 跳转到目标网页
      window.location.href = "../index.html"; // 替换为目标网页的 URL
    }, { once: true }); // 只触发一次
  }, { once: true }); // 只触发一次
});





// 图片淡入独立功能配置 (需要修改的参数)
const POPUP_CONFIG = {
  showDelay: 8000,   // X秒后显示 (单位：毫秒)
  hideDelay: 7000,   // 显示后Y秒隐藏 (单位：毫秒)
  position: {
    x: window.innerWidth * 0.5, // 水平居中
    y: window.innerHeight * 0.5 // 垂直居中
  }
};

// 独立事件监听器
document.querySelector('.container').addEventListener('click', function () {
  const popup = document.getElementById('independent-popup');

  // 第一次点击触发
  if (!this.dataset.popupActive) {
    this.dataset.popupActive = true;

    // 设置弹出定时
    setTimeout(() => {
      // 1. 先显示元素（不触发过渡）
      popup.style.display = 'block';
      popup.style.opacity = '0'; // 初始透明度为0

      // 2. 强制重绘，确保浏览器渲染
      void popup.offsetWidth;

      // 3. 触发淡入效果
      popup.style.opacity = '1';

      // 4. 设置淡出定时
      setTimeout(() => {
        popup.style.opacity = '0'; // 淡出

        // 5. 淡出完成后隐藏元素
        setTimeout(() => {
          popup.style.display = 'none';
        }, 500); // 等待淡出动画完成
      }, POPUP_CONFIG.hideDelay);
    }, POPUP_CONFIG.showDelay);
  }
});

// 音乐播放配置
const MUSIC_CONFIG = {
  volume: 0.5, // 音量 (0到1)
  fadeDuration: 1000 // 淡入淡出时间 (单位：毫秒)
};

// 获取音乐元素
const music = document.getElementById('background-music');

// 设置初始音量

// 独立事件监听器
document.addEventListener('click', function () {
  // 如果音乐未播放，则开始播放
  if (music.paused) {
    // 淡入效果
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

