list组件
=====
list组件可以方便地给数据分页。
使用场景：想要分页又不需要使用table组件（jqGrid，datatable等）的情况。可以有更灵活的样式

###安装
1.引用js
    依赖：jquery handlebar
    组件
```html
        <script src="http://cdn.bootcss.com/jquery/3.0.0-alpha1/jquery.min.js"></script>
        <script src="http://cdn.bootcss.com/handlebars.js/3.0.3/handlebars.min.js"></script>
        <script src="../dist/list.js"></script>
```
    handlebar.js可以只使用runtime，如果使用webpack可以直接require相应模板。只需要保证可以使用的就好
2.引用css
```html
        <link rel="stylesheet" href="../dist/list.css">
        <!-- 分页组件适用于bootstrap3，如果已经引用了bootstrap3的css文件可以不需要加载list.ui.css -->
         <link rel="stylesheet" href="../dist/list.ui.css">
```
##使用

####前台代码
```javascript
//var t_table=require('listItemTpl.html');
var t_table= Handlebars.compile($("#list_tpl").html());
//后台action  直接访问需要跨域
//var url='http://127.0.0.1:8360/home/index/list';
var url='../data/page.json';
var options={
	url:url,
	dataName:'data',//默认值为：'result'
	rowLimit:10,
	tpl:t_table,
	//jquery 选择器
	element:'#list'
};
var pp=new List(options);

```

####后台代码
使用[thinkjs](http://thinkjs.org)写的一个简单的例子
```javascript
/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      //render View/Home/index_index.html file
      this.display();
    },
    listAction:function(){
      var self=this;
      var page=this.get('page');
      setTimeout(function(){
        D('test').page(page,5).countSelect().then(function(data){
          self.json(data);
        })
      },1000);

    },
    addTestPatchAction:function(){

    }
  };
});

```

##options(配置)
 *    url:请求的地址
 *    param:传参
 *    type:提交的类型 可以是"get","post"		默认值:"get"
 *    rowLimit:一页的行数
 *		tpl:Handlebars或者类似的模板函数的编译后的函数
 *		element:选中后用来填充html的目标元素
 *		onLoad:参数vo,加载过来的vo,对vo进行加工生成需要的结构体，**如果修改vo,必须返回值**
 *		width:要显示的区域的宽度
 *		height:要显示的区域的高度
 *		onRender:render完成后执行事件
 *    emptyText:'<div class="x-list-empty-text">暂无数据</div>' 当不存在数据的时候
 *		pagePosition:放置分页的位置 默认为"bottom" 可选项："top" ,"bottom"
 *		//后台交互的数据中可以自定义的参数----------------
 *		pageParam: 用来设置提交参数中的表示页数的参数名称
 *		totalName: 数据的总数，用来后台返回 默认值为 total
 *      dataName:  返回数据的参数  默认： result
 *      onItemClick  单击某一行的事件()
##api
page(num)
	
	显示某一页
	
setOpts(optionObject)

	设置参数

reload()

    重新加载

##todo
1.代码测试
2.浏览器兼容性测试和罗列
3.去除对bootstrapager的依赖。
