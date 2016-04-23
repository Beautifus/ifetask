/**
 * Created by joker on 16-4-18.
 */

//初始化
var table=$("table");
var newtable=$("newtable");
if(data.length<=0){
    newtable.style.display="flex";
    table.style.display="none"
}else {
    newtable.style.display="none";
    table.style.display="block"
}
//测试
function rl(data){
    this.data=data;
    this.chosedata=[];
    this.chosenode=[];
}
rl.prototype={
  init: function () {
      for (var i=0;i<this.data.length;i++){
          var li=$$("li");
          li.innerHTML="<div><label for=\"listq"+i+"\"><input name='listq' id=\"listq"+i+"\" type=\"checkbox\">"+this.data[i].title+"</label></div><div>"+this.data[i].times+"</div><div>"+this.data[i].stat+"</div><div><span class=\"edit\">编辑</span><span class=\"del\">删除</span><span class=\"view\">查看问卷</span></div>";
          $("ul").appendChild(li);
      }
  },
    check_chose: function (e) {
        this.chosedata=[];
        this.chosenode=[];
        //alert(e.checked);
        var li=$("ul").querySelectorAll("li");
        var step=0;
        for (var i=0;i<li.length;i++){
            if (li[i].children[0].children[0].children[0].checked==true){
                li[i].children[3].children[0].style.background="#ec7319";
                li[i].children[3].children[0].style.color="white";
                this.chosedata[step]=this.data[i];
                this.chosenode[step]=li[i];
                step++;
            }else {
                li[i].children[3].children[0].style.background="#fff";
                li[i].children[3].children[0].style.color="#666";
            }
        }
        if (step==0){
            $("choseall").checked=false;
        }else if(step==li.length){
            $("choseall").checked=true;

        }
        console.log(this.chosedata);
        console.log(this.chosedata.length);
    },
    choseall: function () {
        this.chosenode=[];
        this.chosedata=[];
        var nodes=$("ul").querySelectorAll("li");
        if ($("choseall").checked==false){
            for (var i=0;i<nodes.length;i++){
                this.chosenode=[];
                this.chosedata=[];
                $("listq"+i).checked=false;
                nodes[i].children[3].children[0].style.background="#fff";
                nodes[i].children[3].children[0].style.color="#666";
                console.log(this.chosedata);

            }
        }else {
            for (var i=0;i<nodes.length;i++){
                this.chosenode[i]=nodes[i];
                this.chosedata[i]=this.data[i];
                $("listq"+i).checked=true;
                nodes[i].children[3].children[0].style.background="#ec7319";
                nodes[i].children[3].children[0].style.color="white";
                console.log(this.chosedata)
            }
        }
    },
    del: function (e) {
        var li=$("ul").querySelectorAll("li");
        for (var i=0;i<li.length;i++){
            if (e.parentElement.parentElement===li[i]){
                li[i].parentElement.removeChild(li[i]);
                this.data.splice(i,1);
                console.log(this.data);
                console.log(this.data.length);
            }
        }
    },
    del_all: function () {
        if (this.chosedata.length>0){
            for (var i=this.chosedata.length-1;i>=0;i--){
                this.chosedata.splice(i,1);
                $("ul").removeChild(this.chosenode[i]);
                delete this.chosenode.splice(i,1);

            }
            console.log(this.chosedata+"|||"+this.chosenode);
            console.log(this.chosedata.length+"|||"+this.chosenode.length);
        }

    }
};

var initd=new rl(data);

initd.init();
$("choseall").onclick= function () {
    initd.choseall();
    initd.check_chose()
};
$("delall").onclick=function(){
    initd.del_all()
};
$("ul").addEventListener("click", function (ev) {
    var oevent=ev||event;
    if (oevent.target.nodeName.toLowerCase()=="input"){
        initd.check_chose(oevent.target)
    }else if(oevent.target.className=="del"){
        initd.del(oevent.target)
    }
});

