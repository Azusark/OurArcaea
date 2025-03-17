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
      channel.postMessage({ type: 'PlayAnimation' });
      console.log('开始游戏');
      setTimeout(() => {
          // 跳转到其他界面
          window.location.href = "../html/index.html";
      }, 1600);
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
  
    buttonItems.forEach(item => {
      item.addEventListener('click', function () {
        // 移除所有按钮的选中状态
        buttonItems.forEach(el => el.classList.remove('selected'));
  
        // 为当前点击的按钮添加选中状态
        this.classList.add('selected');
      });
    });
  });

  