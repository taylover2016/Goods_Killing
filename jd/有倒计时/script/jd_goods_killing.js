
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

// 购物车全选
function select_all(){
    
    var checkbox = document.getElementById("J_SelectAllCbx1");
    
    if (checkbox) {
        {
            checkbox.click();
        }
        console.log("目标已全选");
    } else{
        console.log("全选框未找到");
    }
    
}

// 购物车结算
function Checkout(){
    var button = document.getElementsByClassName("common-submit-btn");
    
    if (button.length > 0) {
        button[0].click();
        console.log("正在进入订单提交界面...");
    } else{
        console.log("结算按钮未找到");
    }
}

// 异步结算以应对页面加载问题
function CheckoutAsync(){
    //先确认已经全选
    //CheckElement("#J_SelectAllCbx1",select_all);

    //然后去结账
    CheckElement(".common-submit-btn", Checkout);
}



// 设置目标时间
// 记得更改目标时间之后重新加载扩展！！！
    var target_time = new Date("2021-01-18 20:13:00");

function TimeCheckingLoop(callback){
    var current_time = new Date();

    var diff = Date.parse(target_time) - Date.parse(current_time);

    if (diff < - 500) {
        console.log("时间过了！\n");

    } else if (diff < 500) {
        //时机已到，开始抢购
        callback && callback();

        console.log("开始抢购！\n");

    } else{
        //时候未到，继续等待
        setTimeout(function(){
            TimeCheckingLoop(callback);
        }, 300);
    }
}

//提交订单
function SubmitOrder(){
    console.log("开始提交订单...");

    CheckElement("#order-submit", function(){
        var button = document.querySelector("#order-submit");

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
    if((href.indexOf("cart.jd.com") > -1)){
        /**
         * 已进入购物车界面
         * 等候开售
         */
        TimeCheckingLoop(CheckoutAsync);
    } else if((href.indexOf("trade.jd.com") > -1)){
        //已结算，提交订单
        SubmitOrder();

    }


}


main();

