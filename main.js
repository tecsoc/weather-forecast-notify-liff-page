var mainView;
var resultView;

window.onload = function() {
    mainView = document.getElementById("main");
    resultView = document.getElementById("result");
    if (navigator.userAgent.indexOf("Line") !== -1) {
        alert("さては、、お前、LINEから開いたな？？");
    }else{
        mainView.style.display="none";
        resultView.innerHTML = "スマホアプリのLINEから開いてください！！<br>PCその他から設定することは出来ません。";
    }
}
