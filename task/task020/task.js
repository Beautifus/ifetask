/**
 * Created by Xiaodong on 2016/3/30.
 */
var inputarea=document.getElementById("input");
var inputbox=document.getElementById("input-box");
var printsptext=document.getElementById("printsp");
var searchbox=document.getElementById("search-box");

//获取节点
var data=[];
var inputdata=[];
//存放数据
var textstr=function(){
        var restr=/[\s\n,，]+/g;
        var areastr=inputbox.value.trim().split(restr);
        function test(){
            var ii=0;
            for(var txt=0;txt<areastr.length;txt++){
                var re=/[\w\u4e00-\u9fa5]/;
                if (!re.test(areastr[txt])){
                    ii++
                }
            }
            if (ii!=0){
                return false
            }else {
                inputdata=areastr;
                return true
            }
        }

        if (test()&&areastr!=""){
            return areastr;
        }else{
            alert("请输入符合要求的数字!");
            return false
        }


};
//验证文本
var rend =function(){
    printsptext.innerHTML="";
    for (var datastr=0;datastr<data.length;datastr++){
    	var ospan=document.createElement("span");
    	var otitle=data[datastr];
        //fengexian
    	ospan.innerHTML=otitle;
        ospan.setAttribute("title",otitle);
        ospan.setAttribute("name",datastr);
        ospan.style.background="#000000";
        printsptext.appendChild(ospan)
    }


};
//渲染图表
var leftinbtn=function(){

	if (textstr()!=false){
        var inputlth=inputdata.length;
        if (data.length<60){
            for (var li=inputlth-1;li>=0;li--){
                data.unshift(inputdata[li]);
            }
            rend();

        }else {
            alert("不能再添加了")
        }

	}

};
//左进

var leftoutbtn=function(){

           data.shift();
           rend();


};
//左出
var rightinbtn=function(){
    if (textstr()!=false){
        var inputlth=inputdata.length;
        if (data.length<60){
            for (var ri=0;ri<inputlth;ri++){
                data.push(inputdata[ri]);
            }
            rend();

        }else {
            alert("不能再添加了")
        }

    }
};
//右进

var rightoutbtn=function(){

		data.pop();

		rend();

};
//右出
var searchbtn=function(){
    var seaspan=printsptext.querySelectorAll("span");
    var seastr=searchbox.value;
    for (var sea=0;sea<seaspan.length;sea++){
        if (seaspan[sea].textContent.search(seastr)>=0){
            var content="<b style='color:red'>"+seastr+"</b>";
            seaspan[sea].innerHTML= seaspan[sea].textContent.replace(seastr,content);
        }
    }

};
//搜索
var clickbutton=function(){
    inputarea.addEventListener("click",function(event){
        switch (event.target.id){
            case ("left-in"):
                leftinbtn();
                break;
            case ("left-out"):
                leftoutbtn();
                break;
            case ("right-out"):
                rightoutbtn();
                break;
            case ("right-in"):
                rightinbtn();
                break;
            case ("search"):
                searchbtn();
        }
    })
};
//事件绑定

var spanclick=function(){

        printsptext.addEventListener("click",function(event){
           if (event.target.nodeName.toLowerCase()=="span"){

               var spanstr=event.target.textContent;
               data.splice(event.target.getAttribute("name"),1);
               rend();
               alert(spanstr);
           }



        })

};
var init=function(){
    clickbutton();
    spanclick();
};
init();