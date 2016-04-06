
/*
* 创建nodeTree
* */
function nodetree(){
    this.nodedata=[];
}

/*
*
*
* 添加nodetree方法
*
* */

nodetree.prototype={
  nodebl: function (bl) {
      this.nodedata.push(bl);
        for (var j=0;j<bl.children.length;j++){
            var nodechild=bl.children[j];
            if (nodechild.children.length>0){
                this.nodebl(nodechild);
            }else {
                this.nodedata.push(nodechild)
            }
        }
  },
    nodegd: function (gd) {
        var gdlength= gd.children.length;
        this.nodedata.push(gd);
        var gdtemp=[];
        for (var gdi=0;gdi<gdlength;gdi++){
            gdtemp.push(gd.children[gdi]);
        }//将第一层数据放入数据包
        while (gdtemp.length>0){
            var gdfirst=gdtemp.shift();
            this.nodedata.push(gdfirst);
            if (gdfirst.children.length>0){
                for (var chi=0;chi<gdfirst.children.length;chi++){
                    gdtemp.push(gdfirst.children[chi])
                }
            }
        }
    },
    nodesd: function (sd) {
        var sdlength=sd.children.length;
        this.nodedata.push(sd);
        var sdtemp=[];
        for (var sdi=0;sdi<sd.children.length;sdi++){
            sdtemp.push(sd.children[sdi]);
        }
        while (sdtemp.length>0){
            var  sdfirst=sdtemp.shift();
            this.nodedata.push(sdfirst);
            if (sdfirst.children.length>0){
                for (var chii=sdfirst.children.length-1;chii>=0;chii--){
                    sdtemp.unshift(sdfirst.children[chii]);

                }
            }
        }
    },
    /*
     * animation
     * */
    wrapdiv:function() {
        var data=this.nodedata;
        var lth=0;
        var time=setInterval(wrapfunc,400);
        function wrapfunc(){
            if (lth<1){
                data[lth].style.background="#ccc";
                lth++
            }else if (0<lth<data.length){
                data[lth-1].style.background="white";
                data[lth].style.background="#ccc";
                lth++;
            }else {
                clearInterval(time);
                lth=0;
            }

        }
    },
    clear: function () {
      this.nodedata=[];
    },
    search:function(dd) {
        var datas=this.nodedata;
        var lths=0;
        var times=setInterval(wrapfun,400);
        function wrapfun(){
            if (lths<1){
                datas[lths].style.background="#ccc";
                lths++;
                if (dd==datas[lths].textContent){
                    datas[lths].style.background="#ccc";
                    clearInterval(times);

                }

            }else if (0<lths<datas.length){
                datas[lths-1].style.background="white";
                datas[lths].style.background="#ccc";
                lths++;
                if (dd==datas[lths].textContent){
                    datas[lths-1].style.background="white";
                    datas[lths].style.background="#ccc";
                    clearInterval(times);

                }
            }else {
                clearInterval(times);
                lths=0;
            }

        }
    }

};
var btn=new nodetree;
var text=$("input");
$("btn").addEventListener("click", function (event) {
        switch (event.target.id){
            case "btn1":
                if (text.value==""){
                    btn.nodebl($("wrap"));
                    btn.wrapdiv();
                    btn.clear();
                }else {
                    btn.nodebl($("wrap"));
                    btn.search(text.value);
                    btn.clear();
                }

                    break;
            case "btn2":
                if (text.value==""){
                    btn.nodesd($("wrap"));
                    btn.wrapdiv();
                    btn.clear();
                }else {
                    btn.nodesd($("wrap"));
                    btn.search(text.value);
                    btn.clear();
                }

                    break;
            case "btn3":
                if (text.value==""){
                    btn.nodegd($("wrap"));
                    btn.wrapdiv();
                    btn.clear();
                }else {
                    btn.nodegd($("wrap"));
                    btn.search(text.value);
                    btn.clear();
                }

                    break;
        }
});


/*
*
* 初始化全局
* */

var init= function () {

};
/*
*
* 获取节点简便方法
*
* */
function $$(node){
    return document.querySelectorAll(node)
}
function $(id){
    return document.getElementById(id)
}