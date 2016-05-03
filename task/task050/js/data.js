/**
 * Created by joker on 16-4-18.
 */
var storage=window.localStorage;
var data=[
    {
        title:"第一个问卷",
        times:"2016/04/19",
        stat:"0",
        //0:发表中
        //1：未发表
        //2：已过期
        questions:[
            {typle:"radius",text:"你好吗？", option:["好得很","并不","非常不行","还可以"],per:[10,9,3,4]},
            {typle:"text",text:"你是男是女？",per:[5,10]},
            {typle:"checkbox",text:"你最近好吗？", option:["好得很","并不","非常不行","还可以"],per:[10,2,3,4]},
            {typle:"checkbox",text:"你最近好吗？", option:["好得很","并不","非常不行","还可以"],per:[10,3,3,4]},
            {typle:"checkbox",text:"你最近好吗？", option:["好得很","并不","非常不行","还可以"],per:[10,2,8,4]},
            {typle:"checkbox",text:"你最近好吗？", option:["好得很","并不","非常不行","还可以"],per:[10,12,3,4]}

        ]

    },
    {
        title:"第一个问卷",
        times:"2016/04/19",
        stat:"0",
        //0:发表中
        //1：未发表
        //2：已过期
        questions:[
            {typle:"radius",text:"你好吗？", option:["好得很","并不","非常不行","还可以"],per:[10,9,3,4]},
            {typle:"text",text:"nnishiyigegui？",per:[5,10]},
            {typle:"checkbox",text:"你最近好吗？", option:["好很","并不","非常不行","还可以"],per:[10,2,3,4]},
            {typle:"checkbox",text:"你最近好吗？", option:["好得很","并不","非常不行","还可以"],per:[10,3,3,4]},
            {typle:"checkbox",text:"你最近好吗？", option:["好得很","并不","非常不行","还可以"],per:[10,2,8,4]},
            {typle:"checkbox",text:"你最近好吗？", option:["好得很","并不","非常不行","还可以"],per:[10,12,3,4]}

        ]

    }
];
//获取节点

//选择器
function $$(id){
    if (document.getElementById(id)){
        return document.getElementById(id);
    }else return false
}

//创建器
function $$$(ele){
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
//创建弹窗
function tc(a) {
    if ($$("zz")){
        $$("zz").style.display="block";
        if (confirm(a)){
            $$("zz").style.display="none";
            return true;
        }else {
            $$("zz").style.display="none";
            return false;
        }

    }else {
        var zz=document.createElement("div");
        zz.style.width="100%";
        zz.style.height="100%";
        zz.style.background="#ccc";
        zz.style.opacity="0.5";
        zz.style.zIndex="10";
        zz.style.position="absolute";
        zz.style.left="0";
        zz.style.top=window.document.body.scrollTop;
        zz.setAttribute("id","zz");
        document.body.appendChild(zz);
        if (confirm(a)){
            $$("zz").style.display="none";
            return true;
        }else {
            $$("zz").style.display="none";
            return false;
        }

    }
}