// 动态加载侧栏
function loadSidebar() {
	// 创建容器
	const sidebarContainer = document.getElementById('sidebar-container');
	   // 使用 fetch 加载外部 HTML 文件
	   fetch('register.html') // 修改为你的 HTML 文件路径
		   .then(response => response.text())
		   .then(html => {
			   // 创建侧栏容器
			   const sidebar = document.createElement('div');
			   sidebar.className = 'sidebar';
			   sidebar.innerHTML = html;
			   sidebarContainer.innerHTML = '';
			   sidebarContainer.appendChild(sidebar);
		   })
		   .catch(error => {
			   console.error('加载侧栏失败:', error);
			   sidebarContainer.innerHTML = '侧栏加载失败'; // 错误提示
		   });
   }
	// 绑定按钮点击事件
	document.getElementById('openBtn').addEventListener('click', loadSidebar);