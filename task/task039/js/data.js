/**
 * Created by joker on 16-4-15.
 */
var data={
    name:["张三","李四","王五","陈麻子","犀利哥"],
    s1:["18","19","20","88","66666666"],
    s2:["48","29","27","77","66666666"],
    s3:["58","69","29","66","66666666"]
};
for (var i=0;i<15;i++){
    var r=Math.ceil(Math.random()*100);
    data.name.push("同学"+r);
    data.s1.push(r);
    data.s2.push(r);
    data.s3.push(r);
}

