/**
 * Created by joker on 16-4-4.
 */
function tree(){
    this.stick=[];
    this.stus="";
    //先序排列
    this.f=function(nodename){
        this.stus="first";
        this.stick.push(nodename.className);
        if (nodename.firstElementChild){
            this.f(nodename.firstElementChild)
        }
        if (nodename.lastElementChild){
            this.f(nodename.lastElementChild)
        }
        return this.stick+this.stus;
    };
    //中序排列
    this.s=function(nodename){
        this.stus="scond";
        if (nodename.firstElementChild){
            this.s(nodename.firstElementChild)
        }
        this.stick.push(nodename.className);
        if (nodename.lastElementChild){
            this.s(nodename.lastElementChild)
        }
        return this.stick+this.stus;
    };
    //后序排列
    this.l=function(nodename){
        this.stus="last";
        if (nodename.firstElementChild){
            this.l(nodename.firstElementChild)
        }
        if (nodename.lastElementChild){
            this.l(nodename.lastElementChild)
        }
        this.stick.push(nodename.className);
        this.num++;

        return this.stick+this.stus;
    };
}
var exe=0;
var animation= function () {
    var length=treew.stick.length;
    var ii=0;
    var stime=setInterval(data,1000);
    function data(){
        exe++;
        if (ii>0){
            document.getElementsByClassName(treew.stick[ii-1])[0].style.background="#ffffff";
        }
        if(ii<length){
            document.getElementsByClassName(treew.stick[ii])[0].style.background="#cccccc";
            ii++;
        }else {
            clearInterval(stime);
            treew.stick=[];
            ii=0;
            exe=0;
        }

    }


};
var treew=new tree();
var div=document.getElementById("big");
document.addEventListener("click",function(event){
    switch (event.target.id){
        case "btn-f":
            if (exe!=0){
                alert("正在遍历，请稍等");
                break;
            }else {
                treew.f(div);
                animation();
                break;
            }

        case "btn-s":
            if (exe!=0){
                alert("正在遍历，请稍等");
                break;
            }else {
                treew.s(div);
                animation();
                break;
            }
        case "btn-l":
            if (exe!=0){
                alert("正在遍历，请稍等");
                break;
            }else {
                treew.l(div);
                animation();
                break;
            }
    }
});


