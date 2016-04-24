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
        $("month").innerHTML=this.months[this.month];
        $("year").innerHTML=this.year;
        this.date.setDate(1);
        console.log(this.days);
        console.log(this.date);
        console.log(this.date.getDay());
        var day=this.date.getDay();
        if (day==0){
            day=7;
        }
        var content=$("date-content");
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

                node2.style.background="#ec7319";
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
        var year=$("year").textContent;
        var day=a.textContent;
        var month;
        var date=new Date();
        var now_year=date.getFullYear();
        var now_month=date.getMonth();
        var now_day=date.getDate();
        for (var i=0;i<12;i++){
            if ($("month").textContent==this.months[i]){
                //$("date").value=year+"/"+(i+1)+"/"+day;
                month=i
            }
        }
        var _date1=new Date(year,month,day);
        var _date2=new Date(date.getFullYear(),date.getMonth(),date.getDate());
        if (_date1.getTime()>=_date2.getTime()){
            console.log(_date1.getTime()+"---"+_date2.getTime());
            $("date").value=now_year+"/"+now_month+"/"+now_day+"--"+year+"/"+(month+1)+"/"+day;
        }else {
            console.log(_date1.getTime()+"---"+_date2.getTime());
            alert("请输入正确的时间！")
        }

    }
    //get_day: function () {
    //    console.log(this.date.getDay());
    //    var day=this.date.getDay();
    //    if (day==0){
    //        day=7;
    //    }
    //    var span=$("date-content").querySelectorAll("span");
    //    var days=1;
    //    for (var j=0;j<day;j++){
    //        span[j].innerHTML="0"
    //    }
    //    for (var i=day-1;i<(this.days[this.month]+day-1);i++){
    //        span[i].innerHTML=days++;
    //    }
    //    for (i;i<42;i++){
    //        span[i].innerHTML="0";
    //    }
    //
    //
    //}
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
$("left").onclick= function () {
    if (date.month!=0){
        date.month--
    }else {
        date.month=11;
        date.year--;
    }
    console.log(date.year+"||"+date.month);
    initd();

};
$("right").onclick= function () {
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
var input=$("date");
input.onfocus= function () {
  $("getdate").style.display="block"
};
//input.onblur= function (e) {
//    //var oevent=e||event;
//    //oevent.stopPropagation();
//    $("getdate").style.display="none"
//};
//获取时间加入input
function get_time(e){
    var calen=new calendar(date.year,date.month);
    calen.get_date(e);
}
var content=$("date-content");
content.addEventListener("click", function (e) {
    var oevent=e||event;
    if (oevent.target.nodeName.toLowerCase()=="span"){
        get_time(oevent.target)
    }
});


//calen.get_day();