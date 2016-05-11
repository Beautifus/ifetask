/**
 * Created by joker on 16-4-24.
 */
//日历
function calendar(year,month){
    this.year=year;
    this.month=month;
    this.days=[];
    this.date=new Date(year,month);
    this.day=[];
    this.months=["一月" , "二月" , "三月" , "四月" , "五月" , "六月" , "七月" , "八月" , "九月" , "十月" , "十一月" , "十二月"]
    this.chose_date=[];
}
calendar.prototype={
    initd: function () {
        this.date.setDate(29);
        if (this.date.getDate(29)=="29"){
            this.days=[31,29,31,30,31,30,31,31,30,31,30,31];
        }else {
            this.days=[31,28,31,30,31,30,31,31,30,31,30,31];
        }

        //console.log(this.date.getDay());

        //渲染日历
        document.getElementById("month").innerHTML=this.months[this.month];
        document.getElementById("year").innerHTML=this.year;
        this.date.setDate(1);
        console.log(this.days);
        console.log(this.date);
        console.log(this.date.getDay());
        var day=this.date.getDay();
        if (day==0){
            day=7;
        }
        var content=document.getElementById("date-content");
        var span=content.querySelectorAll("span");
        content.innerHTML="";
        var step1=1;
        var step2=1;
        var num=this.days[this.month-1];
        //跨年bug处理
        if (this.month==0){
            num=31
        }
        for (var j=0;j<day-1;j++){
            var node1=document.createElement("span");
            node1.style.color="#ccc";
            node1.innerHTML=num--;
            console.log(this.days);
            content.insertBefore(node1,content.children[0]);

            //span[j].style.color="#ccc";
            //span[j].innerHTML=((this.days[this.month-1])-day+2)+j;
        }
        for (var i=day-1;i<(this.days[this.month]+day-1);i++){
            var n_date=new Date();
            var date1=new Date(n_date.getFullYear(),n_date.getMonth(),n_date.getDate());
            var date2=new Date(this.year,this.month,step1);
            var node2=document.createElement("span");
            if (date1.getTime()==date2.getTime()){
                console.log(date1.getTime()+"---"+date2.getTime());
                node2.style.background="#ECB362";
                node2.style.color="#fff";
                node2.innerHTML=step1++;
                content.appendChild(node2);
            }else {
                node2.innerHTML=step1++;
                content.appendChild(node2);
            }

            //span[i].innerHTML=days++;
        }
        for (i;i<42;i++){
            var node3=document.createElement("span");
            node3.style.color="#ccc";
            node3.innerHTML=step2++;
            content.appendChild(node3);
            //span[i].style.color="#ccc";
            //span[i].innerHTML=step++;
        }
    },
    get_date: function (a) {
        var year=document.getElementById("year").textContent;
        var day=a.textContent;
        var month;
        //var date=new Date();
        //var now_year=date.getFullYear();
        //var now_month=date.getMonth();
        //var now_day=date.getDate();
        for (var i=0;i<12;i++){
            if (document.getElementById("month").textContent==this.months[i]){
                //document.getElementById("date").value=year+"/"+(i+1)+"/"+day;
                month=i+1;
            }
        }
        if (month.toString().length<2){
            month="0"+month;
        }
        if (day.toString().length<2){
            day="0"+day;
        }
        var d_date=year+"/"+month+"/"+day
        document.getElementById("date").value=d_date;
        if (this.chose_date.length>0){
            this.chose_date[0].style.background="#fff"
            this.chose_date[0].style.color="#666"
        }
        this.chose_date[0]=a;
        a.style.background="#ec7319"
        a.style.color="#fff"
        console.log(this.chose_date);
        //if (this.chose_date.length==0){
        //    this.chose_date.push({"year":year,"month":month,"day":day,"node":a});
        //    a.style.background="#ec7319";
        //    a.style.color="white";
        //}else if(this.chose_date.length==1) {
        //    this.chose_date.push({"year":year,"month":month,"day":day,"node":a});
        //    var _date1=new Date(this.chose_date[0].year,this.chose_date[0].month,this.chose_date[0].day);
        //    var _date2=new Date(this.chose_date[1].year,this.chose_date[1].month,this.chose_date[1].day);
        //    a.style.background="#ec7319";
        //    a.style.color="white";
        //    if (_date1.getTime()<=_date2.getTime()){
        //        document.getElementById("date").value=this.chose_date[0].year+"/"+(Number(this.chose_date[0].month)+1)+"/"+this.chose_date[0].day+"--"+this.chose_date[1].year+"/"+(Number(this.chose_date[1].month)+1)+"/"+this.chose_date[1].day
        //    }else {
        //        document.getElementById("date").value=this.chose_date[1].year+"/"+(Number(this.chose_date[1].month)+1)+"/"+this.chose_date[1].day+"--"+this.chose_date[0].year+"/"+(Number(this.chose_date[0].month)+1)+"/"+this.chose_date[0].day
        //
        //    }
            ////FD7B75
        //
        //}else {
        //    this.chose_date[0].node.style.background="#fff";
        //    this.chose_date[0].node.style.color="#666";
        //    this.chose_date[1].node.style.background="#fff";
        //    this.chose_date[1].node.style.color="#666";
        //    this.chose_date=[];
        //    this.get_date(a);
        //}

        console.log(this.chose_date);

    }
};


//时间初始化
var date=new Date();
date.year=date.getFullYear();
date.month=date.getMonth();
function initd(){
    var calen=new calendar(date.year,date.month);
    calen.initd();
}
//初始化日历
initd();
//月份增减
document.getElementById("left").onclick= function () {
    if (date.month!=0){
        date.month--
    }else {
        date.month=11;
        date.year--;
    }
    console.log(date.year+"||"+date.month);
    initd();

};
document.getElementById("right").onclick= function () {
    if (date.month!=11){
        date.month++
    }else {
        date.month=0;
        date.year++;
    }
    console.log(date.year+"||"+date.month);
    initd();

};
//弹出日历
var input=document.getElementById("date");
input.onfocus= function (e) {
    var oevent=e||event;
    oevent.stopPropagation();
    oevent.cancelBubble=true;
    document.getElementById("getdate").style.display="block";

};
input.onclick=function(e){
    var oevent=e||event;
    oevent.stopPropagation();
    oevent.cancelBubble=true;
    return false
};
window.document.onclick= function (e) {
    var oevent=e||event;
    oevent.stopPropagation();
    oevent.cancelBubble=true;
        document.getElementById("getdate").style.display="none";


};
//input.onblur= function (e) {
//    //var oevent=e||event;
//    //oevent.stopPropagation();
//    document.getElementById("getdate").style.display="none"
//};
//获取时间加入input
var get_time=new calendar(date.year,date.month);
var content=document.getElementById("date-content");
var new_date=document.getElementById("new-date");
new_date.onclick= function (e) {
    var oevent=e||event;
    oevent.cancelBubble=true;
};
content.addEventListener("click", function (e) {
    var oevent=e||event;
    //oevent.cancelBubble=true;
    if (oevent.target.nodeName.toLowerCase()=="span"){
        if (oevent.target.style.color!="rgb(204, 204, 204)"){
            get_time.get_date(oevent.target)
        }

    }
});

//以上程序未使用jquery！！-------------------------------------------------------------------------------
//接下来用jquery放大招-----------------------------------------------------------------------------------
$(".to-del").click(function () {
    $(this).closest("div.question").fadeOut(function () {
        $(this).remove();
        setid();
    });

});
$(".to-top").click(function () {
    if ($(this).closest("div.question").prev("div.question").length!=0){
        $(this).closest("div.question").fadeOut(function () {
            $(this).prev().before($(this).detach());
            $(this).fadeIn();
            setid();
        });
        //$(this).closest("div.question").prev().before($(this).closest("div.question").detach());
    }

});
$(".to-bottom").click(function () {
    if ($(this).closest("div.question").next("div.question").length!=0){
        $(this).closest("div.question").fadeOut(function () {
            $(this).next().after($(this).detach());
            $(this).fadeIn();
            setid();
        });
    }

});
$(".to-copy").click(function () {
    $(this).closest("div.question").after($(this).closest("div.question").clone(true).css("display","none"));
    $(this).closest("div.question").next().fadeIn();
    setid();

});
function setid(){
    var questions=$("#question div.question");
    for (var i=0;i<questions.length;i++){
        var num=Number(i)+1;
        $(questions.eq(i)).find("header").children(":eq(0)").html("Q"+num);
        $(questions.eq(i)).find("header>span>label").attr("for","q"+num);
        $(questions.eq(i)).find("header>span>label>input").attr("id","q"+num);
        $(questions.eq(i)).find("section").attr("id","q"+num+"-content");
        if ($(questions.eq(i)).find("section>label>textarea").length>0){
            $(questions.eq(i)).find("section>label").attr("for","a"+num);
            $(questions.eq(i)).find("section>label>textarea").attr("id","a"+num);
        }else {
            for (var j=0;j<$(questions.eq(i)).find("ul").length;j++){
                $(questions.eq(i)).find("section>ul>li>label:nth-of-type(1)>input").attr("name","a"+num);
                $(questions.eq(i)).find("section>ul>li>label:nth-of-type(2)").attr("for","a"+num+"-"+j);
                $(questions.eq(i)).find("section>ul>li>label:nth-of-type(2)>input").attr("id","a"+num+"-"+j);
            }

        }
    }
}
$("#addquestion").click(function () {
    $("#questionclass").fadeIn()
});
$("#radius").click(function () {
    $("#question").append($("div.question1").clone(true).attr("class","question").fadeIn());
    setid();
});
$("#checkbox").click(function () {
    $("#question").append($("div.question2").clone(true).attr("class","question").fadeIn());
    setid();
});
$("#text").click(function () {
    $("#question").append($("div.question3").clone(true).attr("class","question").fadeIn());
    setid();
});
//$("#question-btn button:nth-of-type(1)").click(function () {
//    if (tc("确定保存？")){
//
//    }else {
//
//    }
//});
//$("#question-btn button:nth-of-type(2)").click(function () {
//    if (tc("确定发表？")){
//
//    }else {
//
//    }
//});
$(window).ready(function () {
    if (storage.new=="edit"){
        $("#title").val(data[storage.index].title)
        for(var i=0;i<data[storage.index].questions.length;i++){
            if (data[storage.index].questions[i].typle=="radius"){
                $("#radius").click();
                $(".question").eq(i).find("header input").val(data[storage.index].questions[i].text);
                for (var j=0;j<data[storage.index].questions[i].option.length;j++){
                    $(".question section").eq(i).find("input[type=text]").eq(j).val(data[storage.index].questions[i].option[j])
                }
            }else if (data[storage.index].questions[i].typle=="text"){
                $("#text").click();
                $(".question").eq(i).find("header input").val(data[storage.index].questions[i].text);
            }else if (data[storage.index].questions[i].typle=="checkbox"){
                $("#checkbox").click();
                $(".question").eq(i).find("header input").val(data[storage.index].questions[i].text);
                for (var j=0;j<data[storage.index].questions[i].option.length;j++){
                    $(".question section").eq(i).find("input[type=text]").eq(j).val(data[storage.index].questions[i].option[j]);
                }

            }
        }
        $("#date").val(data[storage.index].times)


        var newdata={};
        $("#question-btn button").eq(0).click(function () {
            if (tc("是否保存？")){
                //delete date[storage.index]
                //var q_data=$(".question");
                //data[storage.index].title=$("#title").val();
                //data[storage.index].times=$("#date").val();
                //for (var i=0;i<q_data.length;i++){
                //    if ($(q_data).eq(i).find("input[type=radio]").length>1){
                //        if (!data[storage.index].questions[i]){
                //            data[storage.index].questions[i]={};
                //        }
                //        data[storage.index].questions[i].typle="radius";
                //        var tid="#q"+(i+1);
                //        data[storage.index].questions[i].text=$(tid).val();
                //        for (var j=0;j<$("#q2-content input[type=text]").length;j++){
                //            data[storage.index].questions[i].option[j]=$(q_data).eq(i).find("section input[type=text]").eq(j).val();
                //        }
                //
                //    }else if($(q_data).eq(i).find("input[type=checkbox]").length>1){
                //        if (!data[storage.index].questions[i]){
                //            data[storage.index].questions[i]={};
                //        }
                //        data[storage.index].questions[i].typle="checkbox"
                //        var tid="#q"+(i+1);
                //        data[storage.index].questions[i].text=$(tid).val();
                //        for (var j=0;j<$("#q2-content input[type=text]").length;j++){
                //            data[storage.index].questions[i].option[j]=$(q_data).eq(i).find("section input[type=text]").eq(j).val();
                //
                //        }
                //    }else if($(q_data).eq(i).find("textarea").length>0){
                //        if (!data[storage.index].questions[i]){
                //            data[storage.index].questions[i]={};
                //        }
                //        data[storage.index].questions[i].typle="text";
                //        var tid="#q"+(i+1);
                //        data[storage.index].questions[i].text=$(tid).val();
                //    }
                //
                //}
                if ($(".question").length<=0){
                    alert("请至少添加一个问题！")
                    return false
                }else if ($("#date").val()==""){
                    alert("请填写合理日期！")
                    return false
                }
                do_data();
                data[storage.index]=newdata;
                changdata(1)
                location.href="index.html"
            }

        })
        $("#question-btn button").eq(1).click(function () {
            if (tc("是否发表？")){
                //var q_data=$(".question");
                //data[storage.index].title=$("#title").val();
                //data[storage.index].times=$("#date").val();
                //for (var i=0;i<q_data.length;i++){
                //    if ($(q_data).eq(i).find("input[type=radio]").length>1){
                //        if (!data[storage.index].questions[i]){
                //            data[storage.index].questions[i]={};
                //        }
                //        data[storage.index].questions[i].typle="radius";
                //        var tid="#q"+(i+1);
                //        data[storage.index].questions[i].text=$(tid).val();
                //        for (var j=0;j<$("#q2-content input[type=text]").length;j++){
                //            data[storage.index].questions[i].option[j]=$(q_data).eq(i).find("section input[type=text]").eq(j).val();
                //        }
                //
                //    }else if($(q_data).eq(i).find("input[type=checkbox]").length>1){
                //        if (!data[storage.index].questions[i]){
                //            data[storage.index].questions[i]={};
                //        }
                //        data[storage.index].questions[i].typle="checkbox"
                //        var tid="#q"+(i+1);
                //        data[storage.index].questions[i].text=$(tid).val();
                //        for (var j=0;j<$("#q2-content input[type=text]").length;j++){
                //            data[storage.index].questions[i].option[j]=$(q_data).eq(i).find("section input[type=text]").eq(j).val();
                //
                //        }
                //    }else if($(q_data).eq(i).find("textarea").length>0){
                //        if (!data[storage.index].questions[i]){
                //            data[storage.index].questions[i]={};
                //        }
                //        data[storage.index].questions[i].typle="text";
                //        var tid="#q"+(i+1);
                //        data[storage.index].questions[i].text=$(tid).val();
                //    }
                //
                //}
                if ($(".question").length<=0){
                    alert("请至少添加一个问题！")
                    return false
                }else if ($("#date").val()==""){
                    alert("请填写合理日期！")
                    return false
                }
                do_data();
                newdata.stat="0"
                data[storage.index]=newdata;
                changdata(1)
                location.href="index.html"
            }

        })
    }else if(storage.new=="new") {
        var newdata={};
        var length=data.length;
        $("#question-btn button").eq(0).click(function () {
            if (tc("是否保存？")){
                //newdata={};
                //newdata.questions=[];
                //var q_data=$(".question");
                //newdata.title=$("#title").val();
                //newdata.times=$("#date").val();
                //for (var i=0;i<q_data.length;i++){
                //    if ($(q_data).eq(i).find("input[type=radio]").length>1){
                //        if (!newdata.questions[i]){
                //            newdata.questions[i]={};
                //        }
                //        newdata.questions[i].typle="radius";
                //        var tid="#q"+(i+1);
                //        newdata.questions[i].text=$(tid).val();
                //        for (var j=0;j<$("#q"+(i+1)+"-content input[type=text]").length;j++){
                //            if (!newdata.questions[i].option){
                //                newdata.questions[i].option=[];
                //            }
                //            newdata.questions[i].option[j]=$(q_data).eq(i).find("section input[type=text]").eq(j).val();
                //        }
                //
                //    }else if($(q_data).eq(i).find("input[type=checkbox]").length>1){
                //        if (!newdata.questions[i]){
                //            newdata.questions[i]={};
                //        }
                //        newdata.questions[i].typle="checkbox"
                //        var tid="#q"+(i+1);
                //        newdata.questions[i].text=$(tid).val();
                //        for (var j=0;j<$("#q"+(i+1)+"-content input[type=text]").length;j++){
                //            if (!newdata.questions[i].option){
                //                newdata.questions[i].option=[];
                //            }
                //            newdata.questions[i].option[j]=$(q_data).eq(i).find("section input[type=text]").eq(j).val();
                //
                //        }
                //    }else if($(q_data).eq(i).find("textarea").length>0){
                //        if (!newdata.questions[i]){
                //            newdata.questions[i]={};
                //        }
                //        newdata.questions[i].typle="text";
                //        var tid="#q"+(i+1);
                //        newdata.questions[i].text=$(tid).val();
                //    }
                //
                //}
                if ($(".question").length<=0){
                    alert("请至少添加一个问题！")
                    return false
                }else if ($("#date").val()==""){
                    alert("请填写合理日期！")
                    return false
                }
                do_data();
                console.log(newdata)
                data[length]=newdata;
                changdata(1)
                location.href="index.html"

            }

        })
        $("#question-btn button").eq(1).click(function () {
            if (tc("是否发表？")){
                //newdata={};
                //newdata.questions=[];
                //var q_data=$(".question");
                //newdata.title=$("#title").val();
                //newdata.times=$("#date").val();
                //for (var i=0;i<q_data.length;i++){
                //    if ($(q_data).eq(i).find("input[type=radio]").length>1){
                //        if (!newdata.questions[i]){
                //            newdata.questions[i]={};
                //        }
                //        newdata.questions[i].typle="radius";
                //        var tid="#q"+(i+1);
                //        newdata.questions[i].text=$(tid).val();
                //        for (var j=0;j<$("#q"+(i+1)+"-content input[type=text]").length;j++){
                //            newdata.questions[i].option[j]=$(q_data).eq(i).find("section input[type=text]").eq(j).val();
                //        }
                //
                //    }else if($(q_data).eq(i).find("input[type=checkbox]").length>1){
                //        if (!newdata.questions[i]){
                //            newdata.questions[i]={};
                //        }
                //        newdata.questions[i].typle="checkbox"
                //        var tid="#q"+(i+1);
                //        newdata.questions[i].text=$(tid).val();
                //        for (var j=0;j<$("#q"+(i+1)+"-content input[type=text]").length;j++){
                //            newdata.questions[i].option[j]=$(q_data).eq(i).find("section input[type=text]").eq(j).val();
                //
                //        }
                //    }else if($(q_data).eq(i).find("textarea").length>0){
                //        if (!newdata.questions[i]){
                //            newdata.questions[i]={};
                //        }
                //        newdata.questions[i].typle="text";
                //        var tid="#q"+(i+1);
                //        newdata.questions[i].text=$(tid).val();
                //    }
                //
                //}
                if ($(".question").length<=0){
                    alert("请至少添加一个问题！")
                    return false
                }else if ($("#date").val()==""){
                    alert("请填写合理日期！")
                    return false
                }
                do_data();
                newdata.stat="0"
                data[length]=newdata;
                changdata(1);
                location.href="index.html"

            }

        })
    }
    function do_data(){

        newdata={};
        newdata.questions=[];
        var q_data=$(".question");
        newdata.title=$("#title").val();
        newdata.times=$("#date").val();
        for (var i=0;i<q_data.length;i++){
            if ($(q_data).eq(i).find("input[type=radio]").length>1){
                if (!newdata.questions[i]){
                    newdata.questions[i]={};
                }
                newdata.questions[i].typle="radius";
                var tid="#q"+(i+1);
                newdata.questions[i].text=$(tid).val();
                for (var j=0;j<$("#q"+(i+1)+"-content input[type=text]").length;j++){
                    if (!newdata.questions[i].option){
                        newdata.questions[i].option=[];
                    }
                    newdata.questions[i].option[j]=$(q_data).eq(i).find("section input[type=text]").eq(j).val();
                }

            }else if($(q_data).eq(i).find("input[type=checkbox]").length>1){
                if (!newdata.questions[i]){
                    newdata.questions[i]={};
                }
                newdata.questions[i].typle="checkbox"
                var tid="#q"+(i+1);
                newdata.questions[i].text=$(tid).val();
                for (var j=0;j<$("#q"+(i+1)+"-content input[type=text]").length;j++){
                    if (!newdata.questions[i].option){
                        newdata.questions[i].option=[];
                    }
                    newdata.questions[i].option[j]=$(q_data).eq(i).find("section input[type=text]").eq(j).val();

                }
            }else if($(q_data).eq(i).find("textarea").length>0){
                if (!newdata.questions[i]){
                    newdata.questions[i]={};
                }
                newdata.questions[i].typle="text";
                var tid="#q"+(i+1);
                newdata.questions[i].text=$(tid).val();
                if ($(q_data).eq(i).find("checkbox").checked){
                    newdata.questions[i].checkbox="true"
                }else {
                    newdata.questions[i].checkbox="false"
                }
            }

        }
    }
});

