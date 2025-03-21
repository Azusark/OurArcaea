const channel = new BroadcastChannel('SwitchWithFading');
// //顶栏
// function topContainer() {
//   const myTopContainer = document.getElementById('myTopContainer');
//   fetch('top_container.html')
//       .then(response => response.text())
//       .then(html => {
//           myTopContainer.srcdoc = html;
//       })
//       .catch(error => {
//           console.error('加载侧栏失败:', error);
//       });
// }
// topContainer();
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
      setTimeout(() => {
          // 跳转到其他界面
          channel.postMessage({type:'switchwithfading'});
      }, 10);
  });

// 默认选中第一个按钮
document.addEventListener('DOMContentLoaded', function () {
    // 默认选中第一个按钮
    document.querySelector('.level-item').classList.add('selected');
  
    // 为所有按钮添加点击事件
    document.querySelectorAll('.level-item').forEach(item => {
      item.addEventListener('click', function () {
        // 移除所有按钮的选中状态
        document.querySelectorAll('.level-item').forEach(el => el.classList.remove('selected'));
  
        // 为当前点击的按钮添加选中状态
        this.classList.add('selected');
  
        // 获取选中的等级
        const selectedLevel = this.getAttribute('data-level');
        console.log('Selected Level:', selectedLevel);
      });
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    const buttonItems = document.querySelectorAll('.button-item');
    const body = document.body;
    const fixedBackground = document.getElementById('fixed-background');
    let currentAudio = null;
    let selectedButton = null; // 新增：跟踪当前选中按钮

    buttonItems.forEach(item => {
        item.addEventListener('click', function () {
            // 判断是否点击的是已选中的按钮
            if (this === selectedButton) {
                // 选中状态下再次点击 - 执行跳转
                const targetUrl = this.getAttribute('data-url');
                if (targetUrl) {
                    if (currentAudio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0;
                    }
                    window.location.href = targetUrl;
                }
                return; // 直接返回，不执行后续逻辑
            }

            // 以下是原有第一次点击逻辑
            // 移除所有选中状态
            buttonItems.forEach(el => el.classList.remove('selected'));
            
            // 设置当前选中按钮
            selectedButton = this;
            this.classList.add('selected');

            // 更新背景
            const bgImage = this.getAttribute('data-bg');
            body.style.backgroundImage = `url(${bgImage})`;
            body.style.backgroundPosition = 'center 0%';
            body.style.backgroundSize = 'cover';
            body.style.width = '100%';
            body.style.height = '100%';

            // 隐藏固定背景
            fixedBackground.style.display = 'none';

            // 显示对应song元素
            const index = this.getAttribute('data-index');
            document.querySelectorAll('[id^="song"]').forEach(el => {
                el.style.display = 'none';
            });
            const songElement = document.getElementById(`song${index}`);
            if (songElement) songElement.style.display = 'block';

            // 处理音乐
            const audioSrc = this.getAttribute('data-audio');
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            currentAudio = new Audio(audioSrc);
            currentAudio.loop = true;
            currentAudio.play();
        });
    });

    // 以下初始化逻辑保持不变...
    // 默认加载第一个按钮的配置
    const defaultBg = '../icon/background/bg1.png';
    body.style.backgroundImage = `url(${defaultBg})`;
    body.style.backgroundPosition = 'center 0%';
    body.style.backgroundSize = 'cover';
    body.style.width = '100%';
    body.style.height = '100%';
    fixedBackground.style.display = 'none';
    
    const firstSongElement = document.getElementById('song1');
    if (firstSongElement) firstSongElement.style.display = 'block';

    const firstButton = document.querySelector('.button-item');
    if (firstButton) {
        
        currentAudio = new Audio(firstAudioSrc);
        currentAudio.loop = true;
        currentAudio.play();
    }
});