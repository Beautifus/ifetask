/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
};
//数据处理函数
var day=function(){
    chartData[pageState.nowSelectCity]=aqiSourceData[pageState.nowSelectCity];
};
var week=function(){
    var temp={};
    var weeks=0;
    var step=1;
    var week=0;
    for (var tempstr in aqiSourceData[pageState.nowSelectCity]){
        var datestr=new Date(tempstr);
        weeks+=aqiSourceData[pageState.nowSelectCity][tempstr];
        step++;
        if (datestr.getDay()==0){
            week++;
            temp["week"+week]=(weeks/step);
            chartData[pageState.nowSelectCity]=temp;
            weeks=0;
            step=0;

        }else if (tempstr=="2016-03-31"){
            week++;
            temp["week"+week]=(weeks/step);
            chartData[pageState.nowSelectCity]=temp;
            weeks=0;
            step=0;
        }

    }
};
var month=function(){
    var temp={};
    var months=0;
    var step=1;
    var month=0;
    for (var monthstr in aqiSourceData[pageState.nowSelectCity]){
        var datestr=new Date(monthstr);
        months+=aqiSourceData[pageState.nowSelectCity][monthstr];
        step++;
        if (datestr.getMonth()==0&&datestr.getDate()==31){
            month++;
            temp["month"+month]=(months/step);
            chartData[pageState.nowSelectCity]=temp;
            months=0;
            step=0;

        }else if (datestr.getMonth()==1&&datestr.getDate()==29){
            month++;
            temp["month"+month]=(months/step);
            chartData[pageState.nowSelectCity]=temp;
            months=0;
            step=0;
        }else if (datestr.getMonth()==2&&datestr.getDate()==29){
            month++;
            temp["month"+month]=(months/step);
            chartData[pageState.nowSelectCity]=temp;
            months=0;
            step=0;
        }

    }
};

// 获取节点
var inputstr=document.querySelectorAll("input");
var selcticstr=document.getElementById("city-select");
var wrap=document.getElementById("aqi-chart-wrap");
/**
 * 渲染图表
 */
var randoncolor=function(){
    var colorsize=["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f"];
    var recolor="#";
    for (var i=0;i<6;i++){

        recolor+=colorsize[Math.floor(Math.random()*16)]
    }
    return recolor;
};

function renderChart() {
    for (var temp in chartData[pageState.nowSelectCity]){
        var div1=document.createElement("div");
        if (pageState.nowGraTime=="day"){
            div1.style.width="12px";
            div1.style.margin="0 1px";
        }else if (pageState.nowGraTime=="week"){
            div1.style.width="50px";
            div1.style.margin="0 10px";

        }else {
            div1.style.width="120px";
            div1.style.margin="0 120px";

        }

        div1.style.height=chartData[pageState.nowSelectCity][temp]+"px";
        div1.setAttribute("title",temp+":"+"空气质量"+chartData[pageState.nowSelectCity][temp]);
        div1.style.background=randoncolor();
        wrap.appendChild(div1);

    }



}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(time) {
    // 确定是否选项发生了变化

    var timestr=time;
    if (timestr!=pageState.nowGraTime){
        pageState.nowGraTime=timestr;
        initAqiChartData();
    }




    // 设置对应数据

    // 调用图表渲染函数

}
/**
 * select发生变化时的处理函数
 */
function citySelectChange(city) {
    // 确定是否选项发生了变化
    if (city!=pageState.nowSelectCity){
        pageState.nowSelectCity=city;
        initAqiChartData();
    }




    // 设置对应数据




    // 调用图表渲染函数

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */


function initGraTimeForm() {
    for (var tem=0;tem<inputstr.length;tem++){
        inputstr[tem].addEventListener("click",function(){
            var time=event.target.value;
           graTimeChange(time);
        })
    }

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    selcticstr.addEventListener("change",function(){
        var city=selcticstr.value;
        citySelectChange(city);
    });
    // 给select设置事件，当选项发生变化时调用函数citySelectChange


}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式

    // 处理好的数据存到 chartData 中
    if (pageState.nowGraTime=="day"){
        day()
    }else if (pageState.nowGraTime=="week"){
        week()
    }else {
        month()
    }
    wrap.innerHTML="";

    renderChart();
}
//测试程序
/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();
