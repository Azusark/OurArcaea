// function MoveToPage2(){
// 	const myLoading = document.getElementById('myLoading');
//     const myLoadingImg1 = document.getElementById('myLoadingImg1');
//     const myLoadingImg2 = document.getElementById('myLoadingImg2');
//     setTimeout(() => {
// 		myLoadingImg1.style.left = '-1430px';
// 		myLoadingImg2.style.right = '-495px';
// 		setTimeout(() => {
// 			myLoading.style.display = 'block';
// 		}, 2010);
// 	},500);
// }
// document.addEventListener("DOMContentLoaded", () => {
// 	MoveToPage2();
// });

MoveToPage
    .init({
		myLoading: 'myLoading',
		myLoadingImg1:'myLoadingImg1',
		myLoadingImg2:'myLoadingImg2'
    })
    .EnterThisPage();