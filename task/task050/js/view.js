/**
 * Created by joker on 16-4-28.
 */
function wrap(id,data,per,color){
    var can= document.getElementById(id);
    var cxt=can.getContext("2d");
    var begin=0;
    var end=0;
    for (var i=0;i<data.length;i++){
        end=begin+2*Math.PI*per[i];
        cxt.fillStyle=color[i];
        cxt.strokeStyle="#ccc";
        cxt.beginPath();
        cxt.moveTo(75,75);
        cxt.arc(75,75,75,begin,end,false);
        cxt.fill();
        cxt.stroke();
        //文字
        cxt.beginPath();
        cxt.strokeStyle="black";
        cxt.strokeRect(160,10+i*25,100,20);
        cxt.fillText(Math.round(per[i]*1000)/10+"%",170,25+i*25);
        begin=end;
    }

}

//var a=[1,2,3,4];
//var b=[0.1,0.2,0.3,0.4];
//var c=["red","yellow","blue","black"];
//wrap("can1",a,b,c);
var index=storage.index;
$("#title>h3").text(data[index].title);
for (var i=0;i<data[index].questions.length;i++){
    if (data[index].questions[i].typle=="radius"){
        var question=$(".question-list1").clone();
        $(question).appendTo($("#content")).attr({
            "display":"block",
            "class":"question-list"
        });
        $(question).find("div.left header span:first-of-type").text("Q"+(i+1));
        $(question).find("div.left header span:last-of-type").text(data[index].questions[i].text);
        var as=[];
        var totle=0;
        for (var j=0;j<data[index].questions[i].option.length;j++){
            as[j]=data[index].questions[i].option[j];
            $(question).find("div.left li").eq(j).text(data[index].questions[i].option[j]);
            totle+=data[index].questions[i].per[j];
        }
        for (var k=0;k<=j;k++){
            var width=Math.round((data[index].questions[i].per[k]/totle)*1000)/10;
            $(question).find("div.right ul li").eq(k).find(" div span:first-of-type").width(width+"%");
            $(question).find("div.right ul li:eq(k)>span").text(width+"%");
            //console.log($("div.right li").eq(k).find("span").eq(1).width)
        }
    }else if(data[index].questions[i].typle=="text"){
        var question=$(".question-list2").clone();
        $(question).appendTo($("#content")).attr({"display":"block", "class":"question-list"
        });
        $(question).find("div.left header span:first-of-type").text("Q"+(i+1));
        $(question).find("div.left header span:last-of-type").text(data[index].questions[i].text);
        var width=Math.round((data[index].questions[i].per[0]/data[index].questions[i].per[1])*1000)/10;
        $(question).find("div.right div span").width(width+"%");
        $(question).find("div.right li>span").text(width+"%");


    }else if (data[index].questions[i].typle=="checkbox"){
        var question=$(".question-list3").clone();
        $(question).appendTo($("#content")).attr({
            "display":"block",
            "class":"question-list"
        });
        $(question).find("canvas").attr("id","q"+i);
        $(question).find("div.left header span:first-of-type").text("Q"+(i+1));
        $(question).find("div.left header span:last-of-type").text(data[index].questions[i].text);
        var as=[];
        var totle=0;
        var color=["red","yellow","blue","black","#ccc","#676767"];
        var perl=[];
        for (var j=0;j<data[index].questions[i].option.length;j++){
            as[j]=data[index].questions[i].option[j];
            $(question).find("div.left li").eq(j).text(data[index].questions[i].option[j]);
            //console.log($(question).find("div.left li").eq(1))
            totle+=data[index].questions[i].per[j];
        }
        for (var k=0;k<data[index].questions[i].per.length;k++){
            perl[k]=data[index].questions[i].per[k]/totle;
        }
        wrap("q"+i,data[index].questions[i].option,perl,color);
        console.log(data[index].questions[i].option)
    }

}
