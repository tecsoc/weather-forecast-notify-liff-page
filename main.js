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
    for(var i = 0; i< weekdayGroup.length; i++){
        weekdayGroup[i].checked = true;
    }
}

function deselectAll(){
    for(var i = 0; i< weekdayGroup.length; i++){
        weekdayGroup[i].checked = false;
    }
}

function selectWorkday(){
    selectALl();
    for(var i = weekdayGroup.length - 1; i >= weekdayGroup.length - 3; i--){
        weekdayGroup[i].checked = false;
    }
}

function sumbit(){
    var notifyWeekdayArray = [];
    for(var i = 0; i< weekdayGroup.length; i++){
        if (weekdayGroup[i].checked){
            notifyWeekdayArray[i] = 1;
        }else{
            notifyWeekdayArray[i] = 0;
        };
    }
    liff.sendMessages([
        {
            type: 'text',
            text: notifyWeekdayArray
        }
    ])
    .then(() => {
        liff.closeWindow();
    })
    .catch((err) => {
        alert('error', err);
    });
}
