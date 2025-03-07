function playImg2(){
	const img = document.getElementById('myImg2');
	setTimeout(() => {
		img.style.left = "495px";
		img.style.opacity = "0.9";
	}, 10);
};
document.addEventListener('loginLoaded', function() {
    playImg2();
});