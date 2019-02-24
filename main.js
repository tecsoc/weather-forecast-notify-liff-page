var mainView;
var resultView;
var weekdayGroup;

window.onload = function() {
    mainView = document.getElementById("main");
    resultView = document.getElementById("result");
    weekdayGroup = document.forms.chooseNotifyWeekday;
    if (navigator.userAgent.indexOf("Line") !== -1 || true) {
        liff.init(function (data) {
            var userId = data.context.userId;
            alert("ユーザーID：" + userId);
        }, function(error) {
            alert(error);
        });
    }else{
        mainView.style.display="none";
        resultView.innerHTML = "スマホアプリのLINEから開いてください！！<br>PCその他から設定することは出来ません。";
    }
}

function selectALl(){
    weekdayGroup.forEach(function(weekday){
        weekday.checked = true;
    });
}

function deselectAll(){
    
}

function selectWorkday(){
    
}

function sumbit(){
    liff.closeWindow();
}
