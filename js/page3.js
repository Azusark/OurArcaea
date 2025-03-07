const container = document.querySelector('.container');
const image = document.querySelector('.scroll-image');

// 点击容器触发动画
container.addEventListener('click', () => {
  // 添加动画类
  image.classList.add('animate');

  // 动画结束后移除动画类，以便再次触发
  image.addEventListener('animationend', () => {
    image.classList.remove('animate');
  }, { once: true });
});