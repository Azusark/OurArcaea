// 定义动画配置的接口（用对象模拟）!config.loadingId || !config.img1Id || !config.img2Id
const MoveToPage = {
	// 初始化方法：绑定元素和参数
	init(config) {
	  // 必填参数检查
	//   if (!config.targetHtml|| !config.myBthID) {
	// 	throw new Error("Missing required DOM element IDs in config");
	//   }
	  // 获取元素
	  this.myLoading = document.getElementById(config.myLoading);
	  this.myLoadingImg1 = document.getElementById(config.myLoadingImg1);
	  this.myLoadingImg2 = document.getElementById(config.myLoadingImg2);
	  this.myBth = document.getElementById(config.myBthID);
	  this.targetHtml = config.targetHtml;
	  // 返回实例以支持链式调用
	  return this;
	},
  
	// 执行动画的方法
	ExitThisPage() {
	//   // 检查元素是否存在
	//   if (!this.myLoading || !this.myLoadingImg1 || !this.myLoadingImg2) {
	// 	console.error("Elements not initialized. Call init() first.");
	// 	return;
	//   }
		document.getElementById('myBth').addEventListener('click', function() {
			this.myLoading.style.display = "block";
			setTimeout(() => {
				this.myLoadingImg1.style.left = "0";
				this.myLoadingImg2.style.right = "0";
				setTimeout(() => {
					//跳转到其他界面
					window.location.href = this.targetHtml;
					}, 3000);
			},10);
		});
	},
	EnterThisPage() {
		document.addEventListener("DOMContentLoaded", () => {
			setTimeout(() => {
				this.myLoadingImg1.style.left = '-1430px';
				this.myLoadingImg2.style.right = '-495px';
				setTimeout(() => {
					this.myLoading.style.display = 'block';
				}, 2010);
			},500);
		});
	}
  };

  