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
    const body = document.body; // 获取 body 元素，用于设置背景图片
    const fixedBackground = document.getElementById('fixed-background'); // 获取固定的背景图片
  
    buttonItems.forEach(item => {
      item.addEventListener('click', function () {
        // 移除所有按钮的选中状态
        buttonItems.forEach(el => el.classList.remove('selected'));
  
        // 为当前点击的按钮添加选中状态
        this.classList.add('selected');
  
        // 获取当前按钮的背景图片路径
        const bgImage = this.getAttribute('data-bg');
        console.log(`Loading background image: ${bgImage}`); // 调试路径
  
        // 设置 body 的背景图片
        body.style.backgroundImage = `url(${bgImage})`;
        body.style.backgroundImage = `url(${bgImage})`;
        body.style.backgroundPosition = 'center 0%'; // 水平居中，垂直方向偏移 40%
        body.style.backgroundSize = 'cover'; // 保持背景图片比例，同时覆盖整个背景区域
       body.style.width = '100%';
      body.style.height = '100%';
        // 隐藏固定的背景图片
        fixedBackground.style.display = 'none';
      });
    });
  
    // 默认加载第一个按钮的背景图片
    
    body.style.backgroundImage = `url(${defaultBg})`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
  
    // 默认隐藏固定的背景图片
    fixedBackground.style.display = 'none';
  });