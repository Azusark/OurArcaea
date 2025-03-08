//遮罩层
const mask = document.getElementById('myOverlay');
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
                mask.style.display = 'block';
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
                mask.style.display = 'block';
                setTimeout(() => {
                const event = new Event('loginLoaded');
                document.dispatchEvent(event);
                },100);  
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
        mask.style.display = 'none';
    }
});
//开始游戏-进入选关界面
document.getElementById('myBtn_StartGame').addEventListener('click', function() {
    const myLoading = document.getElementById('myLoading');
    const myLoadingImg1 = document.getElementById('myLoadingImg1');
    const myLoadingImg2 = document.getElementById('myLoadingImg2');
    myLoading.style.display = 'block';
    setTimeout(() => {
        
        myLoadingImg1.style.left = "0";
        myLoadingImg2.style.right = "0";
        setTimeout(() => {
            //跳转到其他界面
            window.location.href = "../html/page2.html?action=init";
            }, 3000);
    },10);
});
// 绑定按钮点击事件
document.getElementById('myBtn_OrginLogin').addEventListener('click', loadSidebar);
document.getElementById('myBtn_Login').addEventListener('click', loadLogin);
