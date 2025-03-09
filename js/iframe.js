function updateScale() {
	const container = document.querySelectorAll('.iframe-container');
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;
	const scaleX = windowWidth / 1536;
	const scaleY = windowHeight / 864;
	const scale = Math.min(scaleX, scaleY); // 95% to add some margin
	container.forEach(function(item){
		item.style.setProperty('--scale-factor', scale);
	});
}
//转场动画的函数
function MyAnimation(){
	const myLoading = document.getElementById('myLoading');
    const myLoadingImg1 = document.getElementById('myLoadingImg1');
    const myLoadingImg2 = document.getElementById('myLoadingImg2');
	if (!myLoading || !myLoadingImg1 || !myLoadingImg2) {
		console.error('元素未找到！');
		return;
	  }
	myLoading.style.display = 'block';
	setTimeout(() => {
		myLoadingImg1.style.left = "0";
		myLoadingImg2.style.right = "0";
		setTimeout(() => {
			myLoadingImg1.style.left = '-1470px';
			myLoadingImg2.style.right = '-520px';
			setTimeout(() => {
				myLoading.style.display = 'none';
			}, 2600);
		},3200);
	},10);
}
window.addEventListener('load', updateScale);
window.addEventListener('resize', updateScale);
//转场动画
const channel = new BroadcastChannel('AnimationChannel');
channel.onmessage = function(e) {
  if (e.data.type === 'PlayAnimation') {
	MyAnimation();
	console.log('PlayAnimation 已触发');
  };
}


