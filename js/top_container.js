window.addEventListener('partnerChange', (e) => {
	console.log('事件触发成功，携带数据:', e.detail);
	const img = document.getElementById('myCharacterContainer');
	img.setAttribute('href', '../icon/topcontainer/character/' + e.detail + '.png');
});
window.addEventListener('titleChange', (e) => {
	console.log('事件触发成功:', e.detail);
	const title = document.getElementById('myTitle');
	title.textContent = "请选择一个专辑！";
});