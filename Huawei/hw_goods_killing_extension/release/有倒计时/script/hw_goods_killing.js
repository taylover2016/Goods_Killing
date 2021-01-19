
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




// 异步结算以应对页面加载问题
function CheckoutAsync(){
    //去结账
    //ec.product.orderNow();
    rush.business.clickBtn(1);

}



// 设置目标时间
    var target_time = new Date("2021-01-20 10:08:00");

    

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

    CheckElement("#checkoutSubmit", function(){
        var button = document.querySelector("#checkoutSubmit");

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
    if((href.indexOf("www.vmall.com/product") > -1)){
        /**
         * 等候开售
         */
        TimeCheckingLoop(CheckoutAsync);
    } else if((href.indexOf("www.vmall.com/order") > -1)){
        //已结算，提交订单
        SubmitOrder();
    }

}


main();

