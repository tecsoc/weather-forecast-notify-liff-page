var mainView;
var resultView;
var weekdayGroup;

window.onload = function() {
    mainView = document.getElementById("main");
    resultView = document.getElementById("result");
    weekdayGroup = document.forms.chooseNotifyWeekday;
    if (navigator.userAgent.indexOf("Line") !== -1) {
        liff.init({ liffId: "1582624460-A8R9a3L8"})
        .then(() => {
            let userId = "";
            liff.getProfile().then(profile => {
                userId = profile.userId;
            });
            alert("ユーザーID：" + userId);
        }).catch((error) => {
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
    notifyWeekdayArray = "@詳細設定\n" + notifyWeekdayArray.join(",");
    
    
    liff.sendMessages([
        {
            type:'text',
            text: notifyWeekdayArray
        }
    ])
    .then(() => {
        liff.closeWindow();
    })
    .catch((error) => {
        alert(error);
    });
    
    
    /*try {
        liff.sendMessages([
            {
              type: "text",
              text: notifyWeekdayArray
            }
        ]);
        alert('送信完了\nウィンドウを閉じます');
        liff.closeWindow();
    }catch (error) {
        alert(error);
        return;
    }*/
    
    //setTimeout(function(){ liff.closeWindow(); }, 1000);
    
    /*.then(function() {
        window.alert("送信完了");
        // aleartでOKを押すと、自動でLIFFウィンドウが閉じる
        liff.closeWindow();
    
    */
}
