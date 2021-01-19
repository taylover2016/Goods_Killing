
// 检查元素
function CheckElement(path, callback){
    // 搜索目标元素
    var element = document.querySelector(path);
    if (element) {
        callback && callback();
    } else {
        console.log("元素加载中...");
        setTimeout(function(){
            CheckElement(path, callback);
        }, 200);
    }
}



// 去结算
function Checkout(){
    var button = document.getElementById("ljgm");
    
    if (button) {
        button.click();
        console.log("正在进入订单提交界面...");
    } else{
        console.log("结算按钮未找到");
    }
}


// 异步结算以应对页面加载问题
function CheckoutAsync(){

    //去结账
    CheckElement("#ljgm", Checkout);
}



// 设置目标时间
    var target_time = new Date("2021-01-18 15:33:00");

function TimeCheckingLoop(callback){
    
        callback && callback();

        console.log("开始抢购！\n");

    
}

//提交订单
function SubmitOrder(){
    console.log("开始提交订单...");

    CheckElement(".fr.submitBtn", function(){
        var button = document.querySelector(".fr.submitBtn");

        if(button){
            button.click();
        } else{
            console.log("订单提交按钮未找到");
        }

    })
}

function main(){
    
    console.log("***********抢购开始***********");

    //debugger;

    var href = window.location.href;

    // 检查当前页面
    if((href.indexOf("item.lenovo.com.cn") > -1)){
        /**
         * 已进入商品详情
         * 等候开售
         */
        TimeCheckingLoop(CheckoutAsync);
    } else if((href.indexOf("buy.lenovo.com.cn") > -1)){
        //已结算，提交订单
        SubmitOrder();

    }


}

main();

