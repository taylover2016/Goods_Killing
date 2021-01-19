
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
    ec.product.orderNow();
    //rush.business.clickBtn(1);
}



function TimeCheckingLoop(callback){

        console.log("开始抢购！\n");

    
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

