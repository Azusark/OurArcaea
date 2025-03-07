const image = document.querySelector('.scroll-image');
const container = document.querySelector('.container');
const totalTime = 15000; // 总时长 15s
const accelerationTime = 2500; // 加速时间 2.5s
const decelerationTime = 2500; // 减速时间 2.5s
const startTime = Date.now();

// 图片高度和容器高度
const imageHeight = image.clientHeight;
const containerHeight = container.clientHeight;

// 总滚动距离
const totalDistance = imageHeight - containerHeight;

// 计算最大速度
const v_max = (2 * totalDistance) / (totalTime + accelerationTime);

function animate() {
  const currentTime = Date.now() - startTime;
  const progress = Math.min(currentTime / totalTime, 1); // 进度（0 到 1）

  let distance;
  if (currentTime < accelerationTime) {
    // 加速阶段：匀加速
    const t = currentTime / accelerationTime;
    distance = 0.5 * v_max * t * t * accelerationTime / 1000;
  } else if (currentTime > totalTime - decelerationTime) {
    // 减速阶段：匀减速
    const t = (currentTime - (totalTime - decelerationTime)) / decelerationTime;
    const decelerationDistance = v_max * decelerationTime / 1000 - 0.5 * v_max * t * t * decelerationTime / 1000;
    distance = (v_max * (totalTime - accelerationTime - decelerationTime) / 1000) + (v_max * accelerationTime / 1000) - decelerationDistance;
  } else {
    // 匀速阶段
    const t = (currentTime - accelerationTime) / (totalTime - accelerationTime - decelerationTime);
    distance = (v_max * accelerationTime / 1000) + (v_max * t * (totalTime - accelerationTime - decelerationTime) / 1000);
  }

  // 设置图片位置
  image.style.top = `-${distance}px`;

  // 如果动画未结束，继续执行
  if (currentTime < totalTime) {
    requestAnimationFrame(animate);
  }
}

// 启动动画
animate();