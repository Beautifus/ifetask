/**
 * Created by joker on 16-4-18.
 */
var data=[
    {
        title:"第一个问卷",
        times:"2016/04/19",
        stat:"发表中"
    },
    {
        title:"第二个问卷",
        times:"2016/04/19",
        stat:"发表中"
    },
    {
        title:"第三个问卷",
        times:"2016/04/19",
        stat:"未发表"
    },
    {
        title:"第四个问卷",
        times:"2016/04/19",
        stat:"未发表"
    },
    {
        title:"第五个问卷",
        times:"2016/04/19",
        stat:"未发表"
    },
    {
        title:"第六个问卷",
        times:"2016/04/19",
        stat:"未发表"
    }
];
//获取节点

//选择器
function $(id){
    if (document.getElementById(id)){
        return document.getElementById(id);
    }else return false
}

//创建器
function $$(ele){
    return document.createElement(ele);
}
//创建通用函数
var change= function (nodes,attr,value) {
        nodes.style[attr]=value;
};
//获取css属性
var getstyle= function (nodes,attr) {
  if (nodes.currentStyle){
      console.log(nodes.currentStyle[attr]);
      return nodes.currentStyle[attr];
  }  else {
      console.log(getComputedStyle(nodes,false)[attr]);
      return getComputedStyle(nodes,false)[attr]
  }

};
//创建运动框架
var startmove= function (nodes,attr,value) {
    if (nodes.tms){
        clearInterval(nodes.tms);
    }else {
        nodes.tms=null;
    }
    nodes.tms=setInterval(function () {
        if (attr=="opacity"){
            var opacity=getstyle(nodes,attr)*10;
            var speed=((value-opacity>0)?Math.ceil((value-opacity)/8):Math.floor((value-opacity)/8));
            if (opacity==value){
                clearInterval(nodes.tms);
            }else {
                    nodes.style[attr]=(opacity+speed)/10;
            }
        }else {
            var speed=((value-parseInt(getstyle(nodes,attr)))>0)?Math.ceil((value-parseInt(getstyle(nodes,attr)))/8):Math.floor((value-parseInt(getstyle(nodes,attr)))/8);
            if (getstyle(nodes,attr)==value){
                clearInterval(nodes.tms);
            }else {
                    nodes.style[attr]=parseInt(getstyle(nodes,attr))+speed+"px";
            }
        }
    },30);
};