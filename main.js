var mainView;

window.onload = function() {
    mainView = document.getElementById("main");
    if (navigator.userAgent.indexOf("Line") !== -1) {
        alert("さては、、お前、LINEから開いたな？？");
    }else{
        alert("PCは非対応です");
        mainView.style.display="none";
    }
}
