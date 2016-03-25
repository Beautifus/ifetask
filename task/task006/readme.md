#记css画三角形和利用befor&after做标题前缀后缀发现（也是前面标题中间省略号后面跟文字）
>今天看学习笔记的时候发现以为同学说到标题的事情，正好我也在做这个地方；突发奇想，因为之前接触过befor和after这两个属性感觉比较实用，看能否完成这个东西，于是做了一个实验
##1.创建标题所在外围div
>创建标题外围div需要设置好相应width。
##2.创建标题标签
>我们这里就直接用p标签就行了，给p标签设置word-break属性为keep-all意思是不换行。在设置其overflow为hidden溢出隐藏。
##3.创建p标签前面三角形
>三角形的创建以及调整前缀位置，三角形创建是利用div的四个边框完成，有兴趣的同学可以百度纯css完成旋转陀螺，里面有详细的介绍；完成三角形的布局之后利用position&top调整到相对应的位置即可，这里我们只需要top：负的lineheight就可以了

            `.right-content>p:before{`
            
             `   position: relative;`
             
             `   content: '';`
             
             `   width: 0;`
             
             `   height: 0;`
             
             `   border-style: solid;`
             
             `   border-color: transparent;`
             
             `   border-bottom-color: #11456b;`
             
             `   border-width:0 6px 12px 6px;`
             
             `   top: -16px;`
             
             `   margin-right: 10px;`
             
            `}`
##4后缀内容添加
>后缀添加以及位置的调整，添加后缀也很简单，一样的position设置为relative，top为负的linheight；然后设置right为后缀字体数*font-size即可，因为我添加了斜体字所以在原来的基础之上多加了1px的距离；需要注意的是要给after添加display：block属性和background用来覆盖多出来的省略号，不然会和原来字体重叠
          
            `.right-content>p:after {`
          
            `    content: '前端';`
            
            `    display: block;`
            
            `    position: relative;`
            
            `    top: -12px;`
            
            `    right: calc(25px - 100%);`
            
            `    background: white;`
            
            `    font-style: italic;`
                
            `}`
#最后总结：
>其实这只是一个很小的技巧，希望大家多多分享自己的收获，每人一个苹果互相交换之后最后每人还是只有一个，但是每人一个知识点交换之后每人都有N个知识点......
三角形的方法大家可以自行百度，其实css不仅仅只能够简单布局，还有很多很强大的用法和技巧.......书面表达能力不行，各位看官将就将就看~。~最后附上自己做的陀螺[demo](http://microuncle.github.io/cssanimation.io/%E7%BA%AFcss%E6%97%8B%E8%BD%AC%E9%99%80%E8%9E%BA/demo-tuoluo.html)
