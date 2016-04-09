
/*
* 创建nodeTree
* */
function nodetree(root){
    this.nodedata=[];
    this.root=root;
}

/*
*
*
* 添加nodetree方法
*
* */

nodetree.prototype={
  nodebl: function () {
      var bl=this.root;
      this.nodedata.push(bl);
      for (var j=0;j<bl.children.length;j++){
          var nodechild=bl.children[j];
          if (nodechild.children.length>0){
              this.root=nodechild;
              this.nodebl();
          }else {
              this.nodedata.push(nodechild)
          }
      }
  },
    nodegd: function () {
        var gd=this.root;
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
    nodesd: function () {
        var sd=this.root;
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
      this.root=$("wrap");
      if (this.choselement){

          delete this.choselement;
      }

    },
    search:function(dd) {
        var datas=this.nodedata;
        var lths=0;
        var times=setInterval(wrapfun,400);
        function wrapfun(){
            if (lths<1){
                datas[lths].style.background="#ccc";
                var string=[];
                for (var ii=0;ii<datas[lths].childNodes.length;ii++){
                    if (datas[lths].childNodes[ii].nodeType==3){
                        string.push(datas[lths].childNodes[ii])
                    }
                }
                for (var iii=0;iii<string.length;iii++){
                    var value=string[iii];
                    if (value.textContent.search(dd)>=0){
                        clearInterval(times);
                    }

                }
                lths++;

            }else if (0<lths<datas.length){
                datas[lths-1].style.background="white";
                datas[lths].style.background="#ccc";
                var string1=[];
                for (var iiii=0;iiii<datas[lths].childNodes.length;iiii++){
                    if (datas[lths].childNodes[iiii].nodeType==3){
                        string1.push(datas[lths].childNodes[iiii])
                    }
                }
                for (var iiiii=0;iiiii<string1.length;iiiii++){
                    var value1=string1[iiiii];
                    if (value1.textContent.search(dd)>=0){
                        clearInterval(times);
                    }

                }
                lths++;
            }else {
                clearInterval(times);
                lths=0;
            }

        }
    },
    chose: function (choseele) {
        if (this.choselement){
            this.choselement.style.outline="1px solid #ccc";
            this.choselement=choseele;
            this.choselement.style.outline="1px solid black";

        }else {
            this.choselement=choseele;
            this.choselement.style.outline="1px solid black";
        }

    }
    ,
    add: function (value) {
        if (this.choselement){
            if (value==""){
                var insertdiv1=document.createElement("div");
                insertdiv1.innerHTML="无内容节点";
                this.choselement.appendChild(insertdiv1);
            }else {
                var insertdiv2=document.createElement("div");
                insertdiv2.innerHTML=value;
                this.choselement.appendChild(insertdiv2);
            }

        }else {
            alert("请选择一个需要插入的节点！")
        }

    },
    del: function () {
        if (this.choselement&&this.choselement.id!="wrap"){
            this.choselement.parentNode.removeChild(this.choselement);
            delete this.choselement;
        }else if(this.choselement&&this.choselement.id=="wrap"){
            alert("不能删除根节点!")
        }else if(!this.choselement){
            alert("请选择需要删除的节点！")
        }
    },
    delcolor: function () {
        for (var nodei=0;nodei<this.nodedata.length;nodei++){
            this.nodedata[nodei].style.background="white"
        }
    }

};
/**
 *
 * 初始化
 * */
var btn=new nodetree($("wrap"));

/**
 * 按键功能
 * */
var text=$("input");
$("btn").addEventListener("click", function (event) {
        switch (event.target.id){
            case "btn1":
                if (text.value==""){
                    btn.nodebl();
                    btn.delcolor();
                    btn.wrapdiv();
                    btn.clear();
                }else {
                    btn.nodebl();
                    btn.delcolor();
                    btn.search(text.value);
                    btn.clear();
                }

                    break;
            case "btn2":
                if (text.value==""){
                    btn.nodesd();
                    btn.delcolor();
                    btn.wrapdiv();
                    btn.clear();
                }else {
                    btn.nodesd();
                    btn.delcolor();
                    btn.search(text.value);
                    btn.clear();
                }

                    break;
            case "btn3":
                if (text.value==""){
                    btn.nodegd();
                    btn.delcolor();
                    btn.wrapdiv();
                    btn.clear();
                }else {
                    btn.nodegd();
                    btn.delcolor();
                    btn.search(text.value);
                    btn.clear();
                }

                    break;
            case "add":
                btn.nodegd();
                btn.delcolor();
                btn.add(text.value);

                break;
            case "del":
                btn.nodegd();
                btn.del();
                btn.clear();

                break;
        }
});
$("wrap").addEventListener("click", function (event) {
   var element=event.target;
    btn.chose(element);
});




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