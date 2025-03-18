const channel = new BroadcastChannel('LoginChannel');
const loginBthCont = document.getElementById('loginButtonContainer');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const btn1 = document.getElementById('login-after');
const btn2 = document.getElementById('login-before');
const btn3 = document.getElementById('loginGame');
const btn4 = document.getElementById('registerGame');
const btn5 = document.getElementById('myRegisterItem');
const btn6 = document.getElementById('registerAccount');
const btn7 = document.getElementById('myLoginItem');
const btn8 = document.getElementById('loginAccount');
function playImgAnimation1(){
	const img1 = document.getElementById('myImg1');
	const img2 = document.getElementById('myImg2');
	setTimeout(() => {
	img1.style.left = "0px";
	img1.style.opacity = "1";
	loginBthCont.style.opacity = "1";
	p1.style.opacity = "1";
	p2.style.opacity = "1";	
	setTimeout(() => {
		img2.style.left = "495px";	
		img2.style.opacity = "0.9";	
	}, 200);
	}, 10);
};
function playImgAnimation2(){
	const img1 = document.getElementById('myImg1');
	const img2 = document.getElementById('myImg2');
	setTimeout(()=>{
	img2.style.left = "100px";
	img2.style.opacity = "0";
	loginBthCont.style.opacity = "0";
	p1.style.opacity = "0";
	p2.style.opacity = "0";
	setTimeout(() => {
		img1.style.left = "-200px";
		img1.style.opacity = "0";
	}, 200);
	},30);
};

channel.onmessage = function(e) {
	if (e.data.type === 'LoginImageMove1') {
	  playImgAnimation1();
	  console.log('LoginImageMove1 已触发');
	};
	if (e.data.type === 'LoginImageMove2') {
	  playImgAnimation2();
	  console.log('LoginImageMove2 已触发');
	};
};
//按钮逻辑大全
btn3.addEventListener('click', function() {
	console.log('loginGame 已触发');
	btn2.style.display = 'none';
	btn7.style.display = 'block';
});
btn8.addEventListener('click', function() {
	console.log('loginAccount 已触发');
	btn7.style.display = 'none';
	btn1.style.display = 'block';
});
