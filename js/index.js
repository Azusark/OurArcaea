// 动态加载侧栏
function loadSidebar() {
    const sidebarContainer = document.getElementById('myRigister');
    fetch('register.html')
        .then(response => response.text())
        .then(html => {
            sidebarContainer.innerHTML = html;
            // 通过修改容器宽度触发过渡动画
            setTimeout(() => {
                sidebarContainer.style.width = "600px";
            }, 10); // 微小的延迟确保DOM更新
        })
        .catch(error => {
            console.error('加载侧栏失败:', error);
            sidebarContainer.innerHTML = '侧栏加载失败';
        });
}
//加载出登陆菜单
function loadLogin() {
    const myLogin = document.getElementById('myLogin');
    fetch('login.html')
        .then(response => response.text())
        .then(html => {
            myLogin.innerHTML = html;
            setTimeout(() => {
                myLogin.style.width = "1000px";
                const event = new Event('loginLoaded');
                document.dispatchEvent(event);
            }, 10);
        })
        .catch(error => {
            console.error('加载侧栏失败:', error);
            myLogin.innerHTML = '侧栏加载失败';
        });
}
//点击ESC关闭侧栏
document.addEventListener('keydown', function(event) {
    if (event.key == "Escape") {
        document.getElementById('myRigister').style.width = "0";
        document.getElementById('myLogin').style.width = "0";
    }
});
// 绑定按钮点击事件
document.getElementById('openBtn').addEventListener('click', loadSidebar);
document.getElementById('myBtn_Login').addEventListener('click', loadLogin);
