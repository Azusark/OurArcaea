const channel = new BroadcastChannel('AnimationChannel');
let IsCanEscape = false;
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
                myLogin.style.display= "block";
                mask.style.display = 'block';
                window.dispatchEvent(new CustomEvent('LoginImageMove1'));
                console.log('加载登陆菜单');
                setTimeout(() => {
                    IsCanEscape = true;
                }, 990);
            }, 10);
        })
        .catch(error => {
            console.error('加载侧栏失败:', error);
            myLogin.innerHTML = '侧栏加载失败';
        });

}
//点击ESC关闭侧栏
document.addEventListener('keydown', function(event) {
    if (event.key == "Escape" && IsCanEscape==true) {
        IsCanEscape = false;
        document.getElementById('myRigister').style.width = "0";
        window.dispatchEvent(new CustomEvent('LoginImageMove2'));
        setTimeout(() => {
            document.getElementById('myLogin').style.display = "none";
        }, 1000);
        mask.style.display = 'none';
    }
});
//开始游戏-进入选关界面
document.getElementById('myBtn_StartGame').addEventListener('click', function() {
    channel.postMessage({ type: 'PlayAnimation' });
    console.log('开始游戏');
    setTimeout(() => {
        //跳转到其他界面
        window.location.href = "../html/page2.html";
        }, 2800);
});
// 绑定按钮点击事件
document.getElementById('myBtn_OrginLogin').addEventListener('click', loadSidebar);
document.getElementById('myBtn_Login').addEventListener('click', loadLogin);
