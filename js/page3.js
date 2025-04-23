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
// 预加载所有图片资源
async function preloadAllImages() {
  try {
    // 1. 获取所有需要预加载的图片路径
    const imageList = await getAllImagePaths();
    
    // 2. 显示进度条
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    let loadedCount = 0;
    
    // 3. 预加载所有图片
    const loadPromises = imageList.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          const progress = Math.round((loadedCount / imageList.length) * 100);
          progressBar.style.width = `${progress}%`;
          progressText.textContent = `${progress}%`;
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load: ${src}`);
          loadedCount++;
          const progress = Math.round((loadedCount / imageList.length) * 100);
          progressBar.style.width = `${progress}%`;
          progressText.textContent = `${progress}%`;
          resolve(); // 即使失败也继续
        };
      });
    });
    
    // 4. 等待所有图片加载完成
    await Promise.all(loadPromises);
    
    // 5. 隐藏预加载界面，显示内容
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    
    // 6. 自动播放音乐（如果需要）
    const music = document.getElementById('background-music');
    music.volume = 0.3;
    music.play().catch(e => console.log('自动播放被阻止:', e));
    
  } catch (error) {
    console.error('预加载出错:', error);
    // 出错时也继续显示内容
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }
}

// 获取所有需要预加载的图片路径
async function getAllImagePaths() {
  // 这里列出所有需要预加载的图片
  // 实际项目中可以通过API获取或使用构建工具生成
  return [
    // 主界面图片
    'icon/arcaea.png',
    'icon/backbutton-pressed.png',
    'icon/backbutton.png',
    'icon/half.png',
    'icon/long.png',
    'icon/page3touch.png',
    'icon/shard.png',
    'icon/album/album1.png',
    'icon/album/album10.png',
    'icon/album/album11.png',
    'icon/album/album12.png',
    'icon/album/album13.png',
    'icon/album/album14.png',
    'icon/album/album15.png',
    'icon/album/album16.png',
    'icon/album/album2.png',
    'icon/album/album3.png',
    'icon/album/album4.png',
    'icon/album/album5.png',
    'icon/album/album6.png',
    'icon/album/album7.png',
    'icon/album/album8.png',
    'icon/album/album9.png',
    'icon/album/story.png',
    'icon/background/background.jpg',
    'icon/background/Background1.png',
    'icon/background/Background2.png',
    'icon/background/Background3.png',
    'icon/background/Background4.png',
    'icon/background/back_startgame.png',
    'icon/background/bg1.jpg',
    'icon/background/bg2.jpg',
    'icon/background/bg3.jpg',
    'icon/background/BlackBackground.png',
    'icon/background/WhiteBackground.png',
    'icon/btn/btn1-hover.png',
    'icon/btn/btn1.png',
    'icon/btn/btn2-hover.png',
    'icon/btn/btn2.png',
    'icon/btn/btn3-hover.png',
    'icon/btn/btn3.png',
    'icon/btn/btn4-hover.png',
    'icon/btn/btn4.png',
    'icon/btn/btn5-hover.png',
    'icon/btn/btn5.png',
    'icon/btn/btn6-hover.png',
    'icon/btn/btn6.png',
    'icon/loading/loading1.png',
    'icon/loading/loading2.png',
    'icon/login/button1.png',
    'icon/login/button2.png',
    'icon/login/login1.png',
    'icon/login/login2.png',
    'icon/partner/partner1.png',
    'icon/partner/partner2.png',
    'icon/partner/partner3.png',
    'icon/partner/partner4.png',
    'icon/partner/partner5.png',
    'icon/partner/partner6.png',
    'icon/partner/partner7.png',
    'icon/songs/1.jpg',
    'icon/songs/2.jpg',
    'icon/songs/3.jpg',
    'icon/songselect/difficulty_selector_0.png',
    'icon/songselect/difficulty_selector_0_selected.png',
    'icon/songselect/difficulty_selector_1.png',
    'icon/songselect/difficulty_selector_1_selected.png',
    'icon/songselect/difficulty_selector_2.png',
    'icon/songselect/difficulty_selector_2_selected.png',
    'icon/songselect/difficulty_selector_3.png',
    'icon/songselect/difficulty_selector_3_selected.png',
    'icon/songselect/levelbg.png',
    'icon/songselect/song_cell_corner_0.png',
    'icon/songselect/song_cell_corner_1.png',
    'icon/songselect/song_cell_corner_2.png',
    'icon/songselect/song_cell_corner_3.png',
    'icon/songselect/song_cell_corner_lephon.png',
    'icon/songselect/song_cell_right_beyond_selected.png',
    'icon/songselect/song_cell_right_selected.png',
    'icon/songselect/song_cell_selected_piece.png',
    'icon/songselect/song_cell_selected_piece_beyond.png',
    'icon/songselect/song_currentpack.png',
    'icon/songselect/song_currentpack_selected.png',
    'icon/songselect/start.png',
    'icon/topcontainer/15648912w.png',
    'icon/topcontainer/back1.png',
    'icon/topcontainer/back2.png',
    'icon/topcontainer/back3.png',
    'icon/topcontainer/background.png',
    'icon/topcontainer/background2.png',
    'icon/topcontainer/canpian.png',
    'icon/topcontainer/character_container.png',
    'icon/topcontainer/setting.png',
    'icon/topcontainer/star.png',
    'icon/topcontainer/yudian.png',
    'icon/topcontainer/残片.png',
    'icon/topcontainer/记忆源点.png',
    'icon/topcontainer/character/1.png',
    'icon/topcontainer/character/2.png',
    'icon/topcontainer/character/3.png',
    'icon/topcontainer/character/4.png',
    'icon/topcontainer/character/5.png',
    'icon/topcontainer/character/6.png',
    'icon/topcontainer/character/7.png',
    // 其他页面可能用到的图片
    '../html/index.html', // 预加载下一页HTML
    '../css/index.css',
    '../js/index.js',
    
    // 添加更多需要预加载的图片路径...
    // 可以通过脚本自动扫描icon文件夹生成这个列表
  ];
}

// 启动预加载
document.addEventListener('DOMContentLoaded', preloadAllImages);