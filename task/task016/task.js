/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var input1=document.querySelector("#aqi-city-input");
var input2=document.querySelector("#aqi-value-input");
var btn=document.querySelector("#add-btn");
var table=document.querySelector("#aqi-table");
var alert1=document.querySelector("#alert1");
var alert2=document.querySelector("#alert2");
var change="";

var citystr=function(citystr){
    var re = /^[\u4e00-\u9fa5a-z]+$/gi;
    if(re.test(citystr)){
        return true;
    }else {
        alert1.innerHTML="请输入中文字符!";
        return false;


    }
};
var airstr=function(airstr){
    if ( airstr%1 === 0){
        return true;
    }else {
        alert2.innerHTML="请输入数字!";
        return false;
    }

};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=input1.value.trim();
    var air=input2.value.trim();
    if (city!=""&&air!=""){
        if (citystr(city)){
            aqiData.city=city;
        }else {
            return false;
        }
        if (airstr(air)){
            aqiData.air=air;
        }else {
            return false;
        }

    }else {
        alert("请输入相应的字符");
        return false
    }
    return aqiData;
}

/**
 * 渲染aqi-table表格
 */


function renderAqiList(change,path) {
    if (change=="add"){
        if (table.children.length==0){
            var tr1=document.createElement("tr");
            tr1.innerHTML="<td>城市</td><td>空气质量</td><td>操作</td><br/>";
            table.appendChild(tr1);
        }
        var tr=document.createElement("tr");
        tr.innerHTML="<td>"+input1.value+"</td>"+"<td>"+input2.value+"</td>"+"<td><button>删除</button></td><br/>";
        table.appendChild(tr);
    }else if (change=="del"){
                table.removeChild(path.parentNode.parentNode);
    }

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    change="add";
    if (addAqiData()!=false){
    renderAqiList(change);
        alert1.innerHTML="";
        alert2.innerHTML="";
    }
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(path) {
    // do sth.
    change="del";
    renderAqiList(change,path);
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    btn.onclick=function(){
      addBtnHandle();
    };
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

    table.addEventListener("click",function(even){
        if(even.target.nodeName.toLowerCase()=="button"){
            var path=even.target;
            delBtnHandle(path);
        }
    });
}

init();