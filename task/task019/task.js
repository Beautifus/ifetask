/**
 * Created by Xiaodong on 2016/3/30.
 */
var inputarea=document.getElementById("input");
var inputbox=document.getElementById("input-box");
var printtext=document.getElementById("print");
var printsptext=document.getElementById("printsp");
var renew=document.getElementById("renew");
//获取节点
var data=[];
//存放数据
var textstr=function(){

        var temp=inputbox.value;
        var re=/^([1-9][0-9])$|^[1][0][0]$/;
        if (re.test(temp)&&temp!=""){
            return Number(temp);
        }else{
            alert("请输入符合要求的数字!");
            return false
        }


};
//验证文本
var rend =function(){
    printtext.innerHTML="";
    printsptext.innerHTML="";
    var owidth="";
    if (data.length<=30){
        owidth="30px"
    }else if (data.length>30&&data.length<=60){
        owidth="10px"
    }
    
    for (var datastr=0;datastr<data.length;datastr++){
    	var odiv=document.createElement("div");
    	var ospan=document.createElement("span");
    	var oheight=data[datastr];
    	if (oheight>20&&data.length<=30){
    		odiv.innerHTML=oheight;
    	}
        odiv.style.height=oheight+"px";
        odiv.style.width=owidth;
        odiv.setAttribute("name",datastr);
        odiv.setAttribute("title",oheight);
        odiv.style.background="#000000";
        printtext.appendChild(odiv)
        //fengexian
    	ospan.innerHTML=oheight; 
        ospan.setAttribute("name",datastr);
        ospan.setAttribute("title",oheight);
        ospan.style.background="#000000";
        printsptext.appendChild(ospan)
    }


};
//渲染图表
var leftinbtn=function(){
	if (textstr()!=false){
        if (data.length<60){
            data.unshift(textstr());
            rend();
        }else {
            alert("不能再添加了")
        }

	}

};
//左进

var leftoutbtn=function(){
   if (textstr()!=false){
           data.shift(textstr());
           rend();

	}
};
//左出
var rightinbtn=function(){
   if (textstr()!=false){
       if (data.length<60){
           data.push(textstr());

           rend();
       }else {
           alert("不能再添加了")
       }

	}
};
//右进
var rightoutbtn=function(){
    if (textstr()!=false){
		data.pop(textstr());
		printtext.innerHTML="";

		rend();
	}
};
//右出

var renewarr=function(){
	var min="";
    var times=setInterval(renn,300);
    var re=0;
    function renn() {
        re++;
        for (var i=0;i<data.length;i++){
            if (data[re]<data[i]){
                min=data[i];
                data[i]=data[re];
                data[re]=min;
                rend();
            }
        }
        if (re==data.length-1){
            clearInterval(times);
        }

    }
};

//排序
var randombtn=function(){

  for(var j=0;j<60;j++){
    data[j]=Math.ceil(Math.random()*100) ;
      rend();
  }
};
//随机
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
        }else if(event.target.id=="renew"){
        	renewarr();
        }else if (event.target.id=="random"){
            randombtn();
        }
    })
};
//事件绑定
var divclick=function(){
    printtext.addEventListener("click",function(event){
        var divstr=data[event.target.getAttribute("name")];
        data.splice(event.target.getAttribute("name"),1);
        rend();
        alert(divstr)

    })
};
var spanclick=function(){
    printsptext.addEventListener("click",function(event){
        var spanstr=event.target.textContent;
        data.splice(event.target.getAttribute("name"),1);
        rend();
        alert(spanstr);

    })
};
var init=function(){
    clickbutton();
    divclick();
    spanclick();
};
init();