/**
 * Created by joker on 16-4-15.
 */
//选择器    
var $= function (id) {
    if (document.getElementById(id)){
        return document.getElementById(id)
    }else {
        return false
    }
};
function clone(obj){
    var a;
    if (typeof obj=="object"){
        if (obj==null){
            return a=null;
        }else {
            if (obj instanceof Array){
                a=[];
                for (var i=0;i<obj.length;i++){
                    a.push(clone(obj[i]));
                }
            }else {
                a={};
                for (var i in obj){
                    a[i]=clone(obj[i]);
                }
            }
        }
    }else {
        return a=obj;
    }
    return a;
}
//创建表格容器
var wrap=$("wrap");
function table(wrap,data){
    this.wrap=wrap;
    this.data=clone(data);
}
table.prototype={
    init: function () {
        var tb=document.createElement("table");
        tb.innerHTML="<thead><tr><th>姓名</th><th>语文 <i class='fa fa-caret-up'></i><i class='fa fa-caret-down'></i></th><th>数学 <i class='fa fa-caret-up'></i><i class='fa fa-caret-down'></i></th><th>英语 <i class='fa fa-caret-up'></i><i class='fa fa-caret-down'></i></th><th>总计 <i class='fa fa-caret-up'></i><i class='fa fa-caret-down'></i></th></tr></thead><tbody></tbody>";
        this.wrap.appendChild(tb);
    ////获取数据
        var lth=this.data.name.length;
        this.data.sum=[];
        for (var i=0; i<lth;i++){
            var tr=document.createElement("tr");
            var name=this.data.name[i];
            var s1=Number(this.data.s1[i]);
            var s2=Number(this.data.s2[i]);
            var s3=Number(this.data.s3[i]);
            this.data.sum[i]=s1+s2+s3;
            tr.innerHTML="<td>"+name+"</td><td>"+s1+"</td><td>"+s2+"</td><td>"+s3+"</td><td>"+(s1+s2+s3)+"</td>";
            tb.children[1].appendChild(tr);
        }
        window.onscroll= function () {
            if (document.body.scrollTop>101){
                if (document.body.scrollTop<tb.clientHeight){
                    tb.children[0].style.position="fixed";
                    tb.children[0].style.zIndex="6";
                    tb.children[0].style.top="0";
                    tb.children[1].style.position="absolute";
                    tb.children[1].style.top="37px";
                    tb.style.height=tb.children[1].clientHeight+50+"px";
                }else if(document.body.scrollTop<tb.clientHeight||document.body.scrollTop>=tb.clientHeight){
                    tb.children[0].style.top=(tb.clientHeight+15-document.body.scrollTop)+"px";
                }

                console.log(document.body.scrollTop+"|"+wrap.clientHeight);



            }else {
                tb.children[0].style.position="relative";
                tb.children[1].style.position="relative";
                tb.style.height="auto";
            }
        }
    },
    //排列数据
    sort: function (node,stat) {
        var key=node.trim();
        var sdata=this.data;
        switch (key){
            case "语文":
                sort("s1",stat);
                wrap.innerHTML="";
                this.init();
                break;
            case "数学":
                sort("s2",stat);
                wrap.innerHTML="";
                this.init();
                break;
            case "英语":
                sort("s3",stat);
                wrap.innerHTML="";
                this.init();
                break;
            case "总计":
                sort("sum",stat);
                wrap.innerHTML="";
                this.init();
                break;
        }

        function sort(a,b){
            var lth=sdata[a].length;
            if (b=="up"){
                for (var i=0;i<lth;i++){
                    for (var j=0;j<lth;j++){
                        if (Number(sdata[a][i])<Number(sdata[a][j])){
                            var temp=sdata[a][j];
                            sdata[a][j]=sdata[a][i];
                            sdata[a][i]=temp;
                            for(var k in sdata){
                                if (k!=a){
                                    var temp1=sdata[k][j];
                                    sdata[k][j]=sdata[k][i];
                                    sdata[k][i]=temp1;
                                }

                            }
                        }
                    }
                }
            }else {
                for (var i=0;i<lth;i++){
                    for (var j=0;j<lth;j++){
                        if (Number(sdata[a][i])>Number(sdata[a][j])){
                            var temp=sdata[a][j];
                            sdata[a][j]=sdata[a][i];
                            sdata[a][i]=temp;
                            for(var k in sdata){
                                if (k!=a){
                                    var temp1=sdata[k][j];
                                    sdata[k][j]=sdata[k][i];
                                    sdata[k][i]=temp1;
                                }

                            }
                        }
                    }
                }
            }
            
        }
    }
};
var source=new table(wrap,data);
source.init();
//source.getdata();
wrap.addEventListener("click", function (ev) {
   var oeven=ev||event;
    switch (oeven.target.className){
        case "fa fa-caret-up":
            source.sort(oeven.target.parentNode.textContent,"up");
            break;
        case "fa fa-caret-down":
            source.sort(oeven.target.parentNode.textContent,"down");
            break
    }


});
var dd=document.createElement("div");
dd.innerHTML="<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>";
document.body.appendChild(dd);