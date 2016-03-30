/**
 * Created by Xiaodong on 2016/3/30.
 */

var inputarea=document.getElementById("input");
var inputbox=document.getElementById("input-box");
var printtext=document.getElementById("print");
//获取节点


//获取span标签
var textstr=function(){
    var temp=inputbox.value;
    var re=new RegExp("^[0-9]*$" );
    if (re.test(temp)&&temp!=""){
        return temp;
    }else{
        return false
    }
};
//获取文本
var leftinbtn=function(){
    var leftinele=document.createElement("span");
    leftinele.innerText=textstr();
    if (textstr()!=false){
        if (printtext.firstElementChild){
            printtext.insertBefore(leftinele,printtext.firstElementChild);

        }else {
            printtext.appendChild(leftinele);
        }
    }else alert("请输入数字！")

};
//左进
var leftoutbtn=function(){
    var spansize=document.querySelectorAll("span");
    if (spansize.length>0){
        var str=printtext.firstElementChild.innerText;
      printtext.removeChild(printtext.firstElementChild);
        alert(str);
    }
};
//左出
var rightinbtn=function(){
    var rightinele=document.createElement("span");
     rightinele.innerText=textstr();
    if (textstr()!=false){
        if (printtext.lastElementChild){
            printtext.appendChild(rightinele);
        }else {
            printtext.appendChild(rightinele);
        }
    }else alert("请输入数字！")
};
//右进
var rightoutbtn=function(){
    var spansize=document.querySelectorAll("span");
    if (spansize.length>0){
        var str=printtext.lastElementChild.innerText;
        printtext.removeChild(printtext.lastElementChild);
        alert(str);
    }
};
//右出

var clickbutton=function(){
    inputarea.addEventListener("click",function(event){

        if (event.target.id=="left-in"){
            leftinbtn();
        }else if (event.target.id=="left-out"){
            leftoutbtn();
        }else if (event.target.id=="right-in"){
            rightinbtn();
        }else if (event.target.id=="right-out"){
            rightoutbtn();
        }
    })
};
//事件绑定
var spanclick=function(){
    printtext.addEventListener("click",function(event){
        var spanstr=event.target.textContent;
        printtext.removeChild(event.target);
        alert(spanstr);
    })
};
var init=function(){
    clickbutton();
    spanclick();
};
init();