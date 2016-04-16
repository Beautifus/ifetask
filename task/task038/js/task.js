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
//创建表格容器
var wrap=$("wrap");
function table(wrap){
    this.wrap=wrap;
    this.data={};
}
table.prototype={
    init: function () {
        var tb=document.createElement("table");
        tb.innerHTML="<tr><th>姓名</th><th>语文 <i class='fa fa-caret-up'></i><i class='fa fa-caret-down'></i></th><th>数学 <i class='fa fa-caret-up'></i><i class='fa fa-caret-down'></i></th><th>英语 <i class='fa fa-caret-up'></i><i class='fa fa-caret-down'></i></th><th>总计 <i class='fa fa-caret-up'></i><i class='fa fa-caret-down'></i></th></tr>";
        this.wrap.appendChild(tb);
    },
    //获取数据
    getdata: function (data) {
        this.data=data;
        var lth=this.data.name.length;
        for (var i=0; i<lth;i++){
            var tr=document.createElement("tr");
            var name=data.name[i];
            var s1=Number(data.s1[i]);
            var s2=Number(data.s2[i]);
            var s3=Number(data.s3[i]);
            tr.innerHTML="<td>"+name+"</td><td>"+s1+"</td><td>"+s2+"</td><td>"+s3+"</td><td>"+(s1+s2+s3)+"</td>";
            this.wrap.children[0].appendChild(tr);
        }
    },
    //排列数据
    sort: function (node,stat) {
        var key=node.trim();
        var sdata=this.data;
        if (stat=="up"){
            switch (key){
                case "语文":
                    alert(this.data.s2);
                    sdata.s2=sdata.s2.sort(up);
                    //ssort(sdata,"s2");
                    alert(sdata.s2);
                    alert(this.data.s2);
                    break;
                case "数学":
                    alert("数学");
                    break;
                case "英语":
                    alert("英语");
                    break;
                case "总计":
                    alert("总计");
                    break;
            }
        }
        function up(a,b){
            return a-b;
        }
        function down(a,b){
            return b-a;
        }
        //function ssort(data,svalue){
        //    var s=data;
        //    var val=[];
        //    for (var i in data){
        //        if (i!=svalue){
        //            val.push(i)
        //        }
        //    }
        //    while (this.data[svalue].length>0){
        //        var ss=this.data[svalue].shift();
        //        alert(ss)
        //    }
        //
        //
        //
        //    console.log(data)
        //
        //
        //
        //}

    }
};
var source=new table(wrap);
source.init();
source.getdata(data);
wrap.addEventListener("click", function (ev) {
   var oeven=event||ev;
    switch (oeven.target.className){
        case "fa fa-caret-up":
            source.sort(oeven.target.parentNode.textContent,"up");
            break;
        case "fa fa-caret-down":
            source.sort(oeven.target.parentNode.textContent,"down");
            break
    }


});