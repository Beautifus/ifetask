//简便方法
function $(id){
    return document.getElementById(id);
}
var wrap=$("wrap");
var search=$("search");
//节点创建

//创建树函数
function tree(wrap){
    this.rootnode=wrap;
    this.nodevalue="";
    this.parentnode=wrap.children[0];
    this.nodes=[];
    this.rootlist="";
}
//创建函数方法
tree.prototype={
    initul: function () {
        var rootul=document.createElement("ul");
        rootul.innerHTML="<li><div><span class='fa fa-chevron-right'>根目录</span></div><div><span class='fa fa-plus-square'>添加</span></div></li>";
        this.rootnode.appendChild(rootul);
        this.rootlist=this.rootnode.children[0];

        //<li><div><span class='fa fa-chevron-right'>根目录</span></div><div><span class='fa fa-plus-square'>添加</span><span class='fa fa-trash '>删除</span><span class='fa fa-repeat'>重命名</span></div></li>
    },
    //选择方法
  chose: function (chose) {
          this.chosenode=chose;
  } ,

    //添加方法
    add:function (){
        var addul=document.createElement("ul") ;
        var addli=document.createElement("li") ;
        var name=prompt("请输入添加名称","");
        var addroot=this.chosenode.parentNode.parentNode;
        var addlist="";
        var addacl=0;
        for (var addi=0;addi<this.nodes.length;addi++){
            if (this.nodes[addi].children[0].children[0].textContent.toLowerCase()==name){
                addacl++
            }
        }
        if (addacl==0){
            for (var h=0;h<addroot.children.length;h++){
                if (addroot.children[h].nodeName.toLowerCase()=="ul"){
                    addlist=addroot.children[h];
                }
            }
            if (name!=null&&name!=""){
                if (addlist==""){
                    var time=null;
                    var times=null;
                    addul.innerHTML="<li><div><span>"+name+"</span></div><div><span class='fa fa-plus-square'>添加</span><span class='fa fa-trash'>删除</span><span class='fa fa-repeat'>重命名</span></div></li>";
                    addul.children[0].children[1].style.display="none";
                    addul.children[0].firstElementChild.onmouseenter= function (event) {
                        event.stopPropagation();
                        addul.children[0].children[1].style.display="inline-block";
                    };
                    addul.children[0].firstElementChild.onmouseleave= function (event) {
                        event.stopPropagation();
                        times=setTimeout(ggg,300);
                        function ggg(){
                            addul.children[0].children[1].style.display="none";
                        }
                    };
                    addul.children[0].children[1].onmouseenter= function () {
                        clearTimeout(times);
                    };
                    addul.children[0].children[1].onmouseleave= function () {
                        addul.children[0].children[1].style.display="none";
                    };
                    this.chosenode.parentNode.parentNode.appendChild(addul);
                }else {
                    addli.innerHTML="<div><span>"+name+"</span></div><div><span class='fa fa-plus-square'>添加</span><span class='fa fa-trash'>删除</span><span class='fa fa-repeat'>重命名</span></div>"
                    addli.children[1].style.display="none";
                    addli.firstElementChild.onmouseenter= function (event) {
                        event.stopPropagation();
                        clearTimeout(time);
                        addli.children[1].style.display="inline-block";
                    };
                    addli.firstElementChild.onmouseleave= function (event) {
                        event.stopPropagation();
                        time=setTimeout(gg,300);
                        function gg(){
                            addli.children[1].style.display="none"
                        }
                    };
                    addli.children[1].onmouseenter= function () {
                        clearTimeout(time);
                    };
                    addli.children[1].onmouseleave= function () {
                        addli.children[1].style.display="none";
                    };
                    addlist.appendChild(addli);
                }

            }

        }else {
            alert("已经存在该节点！")
        }

    },
    rename:function (){
    var name=prompt("请输入修改名称","");
    if (name!=null&&name!=""){
       this.chosenode.parentNode.previousSibling.children[0].innerHTML=name
        }

    },
    del: function () {
        var delnode=this.chosenode.parentNode.parentNode;
        if (delnode.parentNode.children.length>1){
            delnode.parentNode.removeChild(delnode);
        }else {
            delnode.parentNode.parentNode.removeChild(delnode.parentNode);
        }
    },
    //遍历节点
    view: function () {
        var rendlist=this.rootlist.children;
        var temp=[];
        for (var li=0;li<rendlist.length;li++){
            temp.push(this.rootlist.children[li])
        }
        while (temp.length>0){
            var templi=temp.shift();
            if (templi.children.length>2){
                for(var vi=0;vi<templi.children[2].children.length;vi++){
                    temp.push(templi.children[2].children[vi]);
                }

                this.nodes.push(templi)

            }else {
                this.nodes.push(templi)
            }
        }
    },
    clear: function () {
      this.nodes=[]
    },
    render: function () {
        var rendlist=this.nodes;
        for (var e=0;e<rendlist.length;e++){
            if (rendlist[e].children.length>2){
                rendlist[e].children[0].onclick= function (event) {
                    event.stopPropagation();
                    var eve=this.nextElementSibling.nextElementSibling;
                    if (eve.style.display==""||eve.style.display=="block"){
                        eve.style.display="none";
                        eve.previousElementSibling.previousElementSibling.firstElementChild.className="fa fa-chevron-right"
                    }else {
                        eve.style.display="block";
                        eve.previousElementSibling.previousElementSibling.firstElementChild.className="fa fa-chevron-down"
                    }
                }
            }

        }
        for (var li=0;li<rendlist.length;li++){
            if (rendlist.length<2){
                rendlist[li].children[0].children[0].className="fa fa-chevron-right"
            }else {
                if (rendlist[li].children.length<=2){
                    rendlist[li].children[0].children[0].className="fa fa-file"
                }else{

                    if(rendlist[li].children[2].style.display.toLowerCase()==""){
                        rendlist[li].children[0].children[0].className="fa fa-chevron-down"
                    }else {
                        rendlist[li].children[0].children[0].className="fa fa-chevron-right"
                    }

                }
            }


            }


        },
    search: function (values) {
        var texts=values;
        for (var tt=0;tt<this.nodes.length;tt++){
            var searchnode=this.nodes[tt];
            var colornode=this.nodes[tt].children[0].children[0];
            if (this.nodes[tt].children[0].children[0].textContent.toLowerCase()==texts){
                while (searchnode.parentNode.parentNode.nodeName.toLowerCase()=="li") {
                    searchnode.parentNode.style.display="block";
                    searchnode=searchnode.parentNode.parentNode;
                }
                colornode.style.color="yellow";
                var color=setTimeout(colorfn,1000);
                function colorfn(){
                    colornode.style.color="black";
                }

            }
        }
    }


};
var rend=new tree(wrap);
rend.initul();
wrap.addEventListener("click", function (event) {
    switch (event.target.className){
        case "fa fa-plus-square":
            rend.clear();
            rend.view();
            rend.chose(event.target);
            rend.add();
            rend.clear();
            rend.view();
            rend.render();
            break;
        case "fa fa-repeat" :
            rend.chose(event.target);
            rend.rename();
            break;
        case "fa fa-trash" :
            rend.clear();
            rend.chose(event.target);
            rend.del();
            rend.view();
            rend.render();
            break;

    }

});
search.addEventListener("click", function (event) {
    if (event.target.nodeName.toLowerCase()=="button"){
        rend.clear();
        rend.view();
        rend.search(search.children[0].value);
    }

});