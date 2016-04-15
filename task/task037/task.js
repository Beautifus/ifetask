/**
 * Created by joker on 16-4-15.
 */
var $= function (id) {
    if (document.getElementById(id)){
        return document.getElementById(id)
    }else {
        return false
    }



};
var wrap=$("wrap");
wrap.children[1].onclick= function () {
    if ($("odiv")){
        $("odiv").style.display="block"
    }else {
        var odiv=document.createElement("div");
        odiv.style.display="block";
        odiv.style.width="100%";
        odiv.style.height="100%";
        odiv.style. background="black";
        odiv.style.opacity="0.3";
        odiv.style.zIndex="2";
        odiv.style.position="absolute";
        odiv.style.top="0";
        odiv.style.left="0";
        odiv.setAttribute("id","odiv");
        document.body.appendChild(odiv);

    }

    var left=(document.body.clientWidth-400)/2+"px";
    wrap.children[0].style.display="block";
    wrap.children[0].style.position="absolute";
    wrap.children[0].style.top="20px";
    wrap.children[0].style.left=left;
    wrap.children[0].style.zIndex="3"

};
var close=$("header").children[1];
close.onclick= function () {
    wrap.children[0].style.display="none";
    $("odiv").style.display="none"
};
var dialog=$("dialog");
dialog.children[0].onmousedown=function(ev){
    var oeven=ev||event;
    dialog.children[0].style.cursor="move";
    var left=oeven.clientX-dialog.offsetLeft;
    var top=oeven.clientY-dialog.offsetTop;
    document.onmousemove= function (ev) {
        var oeven=ev||event;
        var dx=oeven.clientX-left;
        var dy=oeven.clientY-top;
        if (dx<0){
            dx=0;
        }else if (dx>(document.documentElement.clientWidth-dialog.offsetWidth)) {
            dx=document.documentElement.clientWidth-dialog.offsetWidth;

        }
        if (dy<0){
            dy=0;
        }else if (dy>(document.documentElement.clientHeight-dialog.offsetHeight)) {
            dy=document.documentElement.clientHeight-dialog.offsetHeight;

        }

        dialog.style.top=dy+"px";
        dialog.style.left=dx+"px";
        document.onmouseup= function () {
            document.onmousemove=null;
            document.onmouseup=null;
            dialog.children[0].style.cursor="default";

        };
        return false
    }

};