//简便方法
function $(id){
    return document.getElementById(id);
}
//创建树函数
function tree(root){
    this.root=root;
    this.parent="none";
    this.value=this.root.value;


}