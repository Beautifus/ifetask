/**
 *
 * Created by wanxiaodong on 2016/7/7.
 */
window.onload=function () {


    var p_width=1290;//相册宽度
    var col=8; //相册列数
    var add=10; //照片距离
    var pic_box=document.getElementById("pic");
    var demo=pic_box.getElementsByTagName("img");
//          图片路径  相册宽度  相册列数  图片间距离
    function pic( p_width, col,add) {
        this.width=(p_width-add*(col+1))/col;
        this.add=add;
        this.all_width=p_width;
        this.sum=[];
    };
    pic.prototype={
        init:function () {
            pic_box.style.width=(p_width+"px");
            for(var i=0;i<col;i++){
                demo[i].style.left=(this.width*i+add*(i+1)+"px");
                demo[i].style.width =(this.width+"px");
                this.sum[i]=demo[i].offsetHeight;
            }
            for(var k=col;k<demo.length;k++){
                var min=Math.min.apply(null,this.sum);
                var index=getmin(this.sum,min)
                demo[k].style.width=(this.width+"px");
                demo[k].style.left=(this.width*index+add*(index+1)+"px");
                demo[k].style.top=(min+add+"px");
                this.sum[index]+=demo[k].offsetHeight+add;
                pic_box.style.height=(this.sum[index]+100+"px")
            }
        }
    }
    var pt=new pic(p_width,col,add);
    pt.init();
    function getmin(arr, min) {
        for(var i=0;i<col;i++){
            if (arr[i]==min){
                return i
            }
        }
    }

}
