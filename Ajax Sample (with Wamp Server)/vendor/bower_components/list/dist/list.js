(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define(['jquery'], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(jQuery);
    }
}(function ($) {

    /**
     * bootstrap-paginator.js v0.5
     * --
     * Copyright 2013 Yun Lai <lyonlai1984@gmail.com>
     * --
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    (function ($) {

        "use strict"; // jshint ;_;


        /* Paginator PUBLIC CLASS DEFINITION
         * ================================= */

        /**
         * Boostrap Paginator Constructor
         *
         * @param element element of the paginator
         * @param options the options to config the paginator
         *
         * */
        var BootstrapPaginator = function (element, options) {
                this.init(element, options);
            },
            old = null;

        BootstrapPaginator.prototype = {

            /**
             * Initialization function of the paginator, accepting an element and the options as parameters
             *
             * @param element element of the paginator
             * @param options the options to config the paginator
             *
             * */
            init: function (element, options) {

                this.$element = $(element);

                this.currentPage = 1;

                this.lastPage = 1;

                this.setOptions(options);

                this.initialized = true;
            },

            /**
             * Update the properties of the paginator element
             *
             * @param options options to config the paginator
             * */
            setOptions: function (options) {

                this.options = $.extend({}, (this.options || $.fn.bootstrapPaginator.defaults), options);

                this.totalPages = parseInt(this.options.totalPages, 10);  //setup the total pages property.
                this.numberOfPages = parseInt(this.options.numberOfPages, 10); //setup the numberOfPages to be shown

                //move the set current page after the setting of total pages. otherwise it will cause out of page exception.
                if (options && typeof (options.currentPage)  !== 'undefined') {

                    this.setCurrentPage(options.currentPage);
                }

                this.listen();

                //render the paginator
                this.render();

                if (!this.initialized && this.lastPage !== this.currentPage) {
                    this.$element.trigger("page-changed", [this.lastPage, this.currentPage]);
                }

            },

            /**
             * Sets up the events listeners. Currently the pageclicked and pagechanged events are linked if available.
             *
             * */
            listen: function () {

                this.$element.off("page-clicked");

                this.$element.off("page-changed");// unload the events for the element

                if (typeof (this.options.onPageClicked) === "function") {
                    this.$element.bind("page-clicked", this.options.onPageClicked);
                }

                if (typeof (this.options.onPageChanged) === "function") {
                    this.$element.on("page-changed", this.options.onPageChanged);
                }

            },


            /**
             *
             *  Destroys the paginator element, it unload the event first, then empty the content inside.
             *
             * */
            destroy: function () {

                this.$element.off("page-clicked");

                this.$element.off("page-changed");

                $.removeData(this.$element, 'bootstrapPaginator');

                this.$element.empty();

            },

            /**
             * Shows the page
             *
             * */
            show: function (page) {

                this.setCurrentPage(page);

                this.render();

                if (this.lastPage !== this.currentPage) {
                    this.$element.trigger("page-changed", [this.lastPage, this.currentPage]);
                }
            },

            /**
             * Shows the next page
             *
             * */
            showNext: function () {
                var pages = this.getPages();

                if (pages.next) {
                    this.show(pages.next);
                }

            },

            /**
             * Shows the previous page
             *
             * */
            showPrevious: function () {
                var pages = this.getPages();

                if (pages.prev) {
                    this.show(pages.prev);
                }

            },

            /**
             * Shows the first page
             *
             * */
            showFirst: function () {
                var pages = this.getPages();

                if (pages.first) {
                    this.show(pages.first);
                }

            },

            /**
             * Shows the last page
             *
             * */
            showLast: function () {
                var pages = this.getPages();

                if (pages.last) {
                    this.show(pages.last);
                }

            },

            /**
             * Internal on page item click handler, when the page item is clicked, change the current page to the corresponding page and
             * trigger the pageclick event for the listeners.
             *
             *
             * */
            onPageItemClicked: function (event) {

                var type = event.data.type,
                    page = event.data.page;

                this.$element.trigger("page-clicked", [event, type, page]);

                //show the corresponding page and retrieve the newly built item related to the page clicked before for the event return
                switch (type) {

                    case "first":
                        this.showFirst();
                        break;
                    case "prev":
                        this.showPrevious();
                        break;
                    case "next":
                        this.showNext();
                        break;
                    case "last":
                        this.showLast();
                        break;
                    case "page":
                        this.show(page);
                        break;
                }

            },

            /**
             * Renders the paginator according to the internal properties and the settings.
             *
             *
             * */
            render: function () {

                //fetch the container class and add them to the container
                var containerClass = this.getValueFromOption(this.options.containerClass, this.$element),
                    size = this.options.size || "normal",
                    alignment = this.options.alignment || "left",
                    pages = this.getPages(),
                    listContainer = $("<ul class='pagination'></ul>"),
                    listContainerClass =  this.getValueFromOption(this.options.listContainerClass, listContainer),
                    first = null,
                    prev = null,
                    next = null,
                    last = null,
                    p = null,
                    i = 0;


                // this.$element.prop("class", "");

                // this.$element.addClass("pagination");

                switch (size.toLowerCase()) {
                    case "large":
                        this.$element.addClass("pagination-large");
                        break;
                    case "small":
                        this.$element.addClass("pagination-small");
                        break;
                    case "mini":
                        this.$element.addClass("pagination-mini");
                        break;
                    default:
                        break;
                }

                switch (alignment.toLowerCase()) {

                    case "center":
                        this.$element.addClass("pagination-centered");
                        break;
                    case "right":
                        this.$element.addClass("pagination-right");
                        break;
                    default:
                        break;

                }

                this.$element.addClass(containerClass);

                //empty the outter most container then add the listContainer inside.
                this.$element.empty();

                this.$element.append(listContainer);

                listContainer.addClass(listContainerClass);

                //update the page element reference
                this.pageRef = [];

                if (pages.first) {//if the there is first page element
                    first = this.buildPageItem("first", pages.first);

                    if (first) {
                        listContainer.append(first);
                    }

                }

                if (pages.prev) {//if the there is previous page element

                    prev = this.buildPageItem("prev", pages.prev);

                    if (prev) {
                        listContainer.append(prev);
                    }

                }


                for (i = 0; i < pages.length; i = i + 1) {//fill the numeric pages.

                    p = this.buildPageItem("page", pages[i]);

                    if (p) {
                        listContainer.append(p);
                    }
                }

                if (pages.next) {//if there is next page

                    next = this.buildPageItem("next", pages.next);

                    if (next) {
                        listContainer.append(next);
                    }
                }

                if (pages.last) {//if there is last page

                    last = this.buildPageItem("last", pages.last);

                    if (last) {
                        listContainer.append(last);
                    }
                }



            },

            /**
             *
             * Creates a page item base on the type and page number given.
             *
             * @param page page number
             * @param type type of the page, whether it is the first, prev, page, next, last
             *
             * @return Object the constructed page element
             * */
            buildPageItem: function (type, page) {

                var itemContainer = $("<li></li>"),//creates the item container
                    itemContent = $("<a></a>"),//creates the item content
                    text = "",
                    title = "",
                    itemContainerClass = this.options.itemContainerClass(type, page, this.currentPage),
                    itemContentClass = this.getValueFromOption(this.options.itemContentClass, type, page, this.currentPage),
                    tooltipOpts = null;


                switch (type) {

                    case "first":
                        if (!this.getValueFromOption(this.options.shouldShowPage, type, page, this.currentPage)) { return; }
                        text = this.options.itemTexts(type, page, this.currentPage);
                        title = this.options.tooltipTitles(type, page, this.currentPage);
                        break;
                    case "last":
                        if (!this.getValueFromOption(this.options.shouldShowPage, type, page, this.currentPage)) { return; }
                        text = this.options.itemTexts(type, page, this.currentPage);
                        title = this.options.tooltipTitles(type, page, this.currentPage);
                        break;
                    case "prev":
                        if (!this.getValueFromOption(this.options.shouldShowPage, type, page, this.currentPage)) { return; }
                        text = this.options.itemTexts(type, page, this.currentPage);
                        title = this.options.tooltipTitles(type, page, this.currentPage);
                        break;
                    case "next":
                        if (!this.getValueFromOption(this.options.shouldShowPage, type, page, this.currentPage)) { return; }
                        text = this.options.itemTexts(type, page, this.currentPage);
                        title = this.options.tooltipTitles(type, page, this.currentPage);
                        break;
                    case "page":
                        if (!this.getValueFromOption(this.options.shouldShowPage, type, page, this.currentPage)) { return; }
                        text = this.options.itemTexts(type, page, this.currentPage);
                        title = this.options.tooltipTitles(type, page, this.currentPage);
                        break;
                }

                itemContainer.addClass(itemContainerClass).append(itemContent);

                itemContent.addClass(itemContentClass).html(text).on("click", null, {type: type, page: page}, $.proxy(this.onPageItemClicked, this));

                if (this.options.pageUrl) {
                    itemContent.attr("href", this.getValueFromOption(this.options.pageUrl, type, page, this.currentPage));
                }

                if (this.options.useBootstrapTooltip) {
                    tooltipOpts = $.extend({}, this.options.bootstrapTooltipOptions, {title: title});

                    itemContent.tooltip(tooltipOpts);
                } else {
                    itemContent.attr("title", title);
                }

                return itemContainer;

            },

            setCurrentPage: function (page) {
                if (page > this.totalPages || page < 1) {// if the current page is out of range, throw exception.

                    throw "Page out of range";

                }

                this.lastPage = this.currentPage;

                this.currentPage = parseInt(page, 10);

            },

            /**
             * Gets an array that represents the current status of the page object. Numeric pages can be access via array mode. length attributes describes how many numeric pages are there. First, previous, next and last page can be accessed via attributes first, prev, next and last. Current attribute marks the current page within the pages.
             *
             * @return object output objects that has first, prev, next, last and also the number of pages in between.
             * */
            getPages: function () {

                var totalPages = this.totalPages,// get or calculate the total pages via the total records
                    pageStart = (this.currentPage % this.numberOfPages === 0) ? (parseInt(this.currentPage / this.numberOfPages, 10) - 1) * this.numberOfPages + 1 : parseInt(this.currentPage / this.numberOfPages, 10) * this.numberOfPages + 1,//calculates the start page.
                    output = [],
                    i = 0,
                    counter = 0;

                pageStart = pageStart < 1 ? 1 : pageStart;//check the range of the page start to see if its less than 1.

                for (i = pageStart, counter = 0; counter < this.numberOfPages && i <= totalPages; i = i + 1, counter = counter + 1) {//fill the pages
                    output.push(i);
                }

                if (this.currentPage > 1) {//add the first when the current page leaves the 1st page.
                    output.first = 1;
                } else {
                    output.first = null;
                }

                if (this.currentPage > 1) {// add the previous when the current page leaves the 1st page
                    output.prev = this.currentPage - 1;
                } else {
                    output.prev = null;
                }

                if (this.currentPage < totalPages) {// add the next page when the current page doesn't reach the last page
                    output.next = this.currentPage + 1;
                } else {
                    output.next = null;
                }

                if (this.currentPage < totalPages) {// add the last page when the current page doesn't reach the last page
                    output.last = totalPages;
                } else {
                    output.last = null;
                }

                output.current = this.currentPage;//mark the current page.

                output.total = totalPages;

                output.numberOfPages = this.options.numberOfPages;

                return output;

            },

            /**
             * Gets the value from the options, this is made to handle the situation where value is the return value of a function.
             *
             * @return mixed value that depends on the type of parameters, if the given parameter is a function, then the evaluated result is returned. Otherwise the parameter itself will get returned.
             * */
            getValueFromOption: function (value) {

                var output = null,
                    args = Array.prototype.slice.call(arguments, 1);

                if (typeof value === 'function') {
                    output = value.apply(this, args);
                } else {
                    output = value;
                }

                return output;

            }

        };


        /* TYPEAHEAD PLUGIN DEFINITION
         * =========================== */

        old = $.fn.bootstrapPaginator;

        $.fn.bootstrapPaginator = function (option) {

            var args = arguments,
                result = null;

            $(this).each(function (index, item) {
                var $this = $(item),
                    data = $this.data('bootstrapPaginator'),
                    options = (typeof option !== 'object') ? null : option;

                if (!data) {
                    $this.data('bootstrapPaginator', (data = new BootstrapPaginator(this, options)));
                    return;
                }

                if (typeof option === 'string') {

                    if (data[option]) {
                        result = data[option].apply(data, Array.prototype.slice.call(args, 1));
                    } else {
                        throw "Method " + option + " does not exist";
                    }

                } else {
                    result = data.setOptions(option);
                }
            });

            return result;

        };

        $.fn.bootstrapPaginator.defaults = {
            containerClass: "",
            size: "normal",
            alignment: "left",
            listContainerClass: "",
            itemContainerClass: function (type, page, current) {
                return (page === current) ? "active" : "";
            },
            itemContentClass: function (type, page, current) {
                return "";
            },
            currentPage: 1,
            numberOfPages: 5,
            totalPages: 1,
            pageUrl: function (type, page, current) {
                return null;
            },
            onPageClicked: null,
            onPageChanged: null,
            useBootstrapTooltip: false,
            shouldShowPage: true,
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "&lt;&lt;";
                    case "prev":
                        return "&lt;";
                    case "next":
                        return "&gt;";
                    case "last":
                        return "&gt;&gt;";
                    case "page":
                        return page;
                }
            },
            tooltipTitles: function (type, page, current) {

                switch (type) {
                    case "first":
                        return "跳到首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "最后一页";
                    case "page":
                        return (page === current) ? "当前页为 " + page : "转到 " + page;
                }
            },
            bootstrapTooltipOptions: {
                animation: true,
                html: true,
                placement: 'top',
                selector: false,
                title: "",
                container: false
            }
        };

        $.fn.bootstrapPaginator.Constructor = BootstrapPaginator;



    }(window.jQuery));




    /**
     * 依赖于jquery  bootstrap-paginator
     * pager对象
     *
     * @param opts
     * @return
     *
     * opts
     * {
 *     	url:请求的地址
 *     	param:传参
 *     	type:提交的类型 可以是"get","post"		默认值:"get"
 *    	rowLimit:一页的行数
		//
 *		tpl:用于展示的script模板的id
 *		voName:模板中each循环的变量名    默认值为：list
 *		element:选中后用来填充html的目标元素
		//
 *		render:自定义的显示效果  有两个参数，data表示为vo数据，view是用于展示模板的jQuery对象  render(vo,view)
 *		width:要显示的区域的宽度
 *		height:要显示的区域的高度
 *		emptyText:'暂无数据' 当不存在数据的时候

 *		onrender:render完成后执行事件
 *		pagePosition:放置分页的位置 默认为"bottom" 可选项："top" ,"bottom"
 *

 *		//后台交互的数据中可以自定义的参数----------------
 *
 *		pageParam:用来设置提交参数中的表示页数的参数名称
 *		totalName:页数的总数，用来后台返回
 *
 * }
     *
     *
     *常用方法
     *var pp=new pager();
     *pp.setUrl(url,param,type) 重新设置来源
     */
    var pager=function(opts){
        if(!opts.url){return false;}
        this.isInit=true;
        var self=this;
        var opts_default={
            currentPage:1,
            //primaryKey:'id',
            dataName:'result',
            rowLimit:25,
            rowParam:'limit',
            pageParam:"page",
            totalName:"total",
            pageOption:null,
            type:"get",
            param:{},
            pagePosition:"bottom",
            width:"auto",
            height:"auto",
            element:".x-list",
            tpl:null,
            emptyText:'<div class="x-list-empty-text">暂无数据</div>',
            //loading:"http://i.azpdl.com/pdl-static/images/zzc.gif",
            loading:' <div class="x-list-zzc-img" title="1">'+
            ' <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" '+
            ' width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">'+
            ' <path fill="#blue" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">'+
            ' <animateTransform attributeType="xml"'+
            ' attributeName="transform"'+
            ' type="rotate"'+
            ' from="0 25 25"'+
            ' to="360 25 25"'+
            ' dur="0.6s"'+
            ' repeatCount="indefinite"/>'+
            ' </path>'+
            ' </svg>'+
            ' </div>',
            onItemClick:function(list,data,node,index,event){
            }

        };
        //获取参数
        self.options=$.extend(opts_default,opts);
        this.init();
    }
    pager.prototype={
        currentPage:1
        ,total:0
        ,isInit:false
        ,viewDom:null
        ,templateView:null
        ,style:{}
        ,init:function(){
            if(this.isInit==false){return;}
            var url=this.options.url;
            var opts=this.options;
            //将this指针赋给self，避免在getJSON中的this冲突
            var self=this;
            //根据options中的currentPage参数来初始化分页组件，默认开始页面是1
            self.currentPage=self.options.currentPage;
            //TODO 应该保证viewDom只有一个
            self.viewDom=$(opts.element);
            self.viewDom.addClass("x-list");

            //添加一个内部的div用来放置模板
            var innerHtml='<div class="x-list-outer"><div class="x-list-inner"></div>'+
                    //初始化过渡效果
                '<div class="x-list-zzc">'+opts.loading+'</div>'+
                '</div>';
            self.viewDom.html(innerHtml);
            var viewOut=self.viewDom.find(".x-list-outer");
            //根据参数判断页码在哪里放置
            if (self.options.pagePosition=="top") {
                viewOut.prepend('<div class="x-list-pagebar"></div>');
            }else{
                viewOut.append('<div class="x-list-pagebar"></div>');
            }
            self.templateView=self.viewDom.find(".x-list-inner");
            self.templateView.css({
                height:opts.height,
                width:opts.width
            });
            //注册单击事件
            self.templateView.on('click','.x-list-item',function(e){
                var item=$(this);
                var itemData=self.vo[item.attr('data-index')];
                self.options.onItemClick.call(self,this,itemData, e.target,item.attr('data-index'),e);
            });
            //增加touch时间效果
            self.templateView.on('touchstart','.x-list-item',function(e){
                var item=$(this);
                item.addClass('active-state')
            });
            self.templateView.on('touchend','.x-list-item',function(e){
                var item=$(this);
                item.removeClass('active-state')
            });
            self.pageBar=viewOut.find(".x-list-pagebar");
            fetch(response);
            function fetch(callback){
                //请求开始
                var view_panel=self.viewDom;
                var innerPanel=self.viewDom.find('.x-list-inner');
                var mask_width=view_panel.outerWidth();
                var mask_height=view_panel.outerHeight();
                if(mask_height==0){
                    mask_height=100;
                }
                self.viewDom.find(".x-list-zzc").show();
                //请求开始
                var url=self.options.url;
                var params={};
                params[self.options.rowParam]=self.options.rowLimit;
                params[self.options.pageParam]=self.currentPage;
                params['start']=((self.currentPage-1)*self.options.rowLimit);
                var param=$.extend({},params,self.options.param)
                $.ajax({
                    type: self.options.type,
                    url: url,
                    dataType:'json',
                    data:param,
                    success:callback,
                    error:function(xhr){
                        //if(xhr.readyState==0){
                        //
                        //}else{
                        //
                        //}
                        responseError()
                    }
                })
            }
            function responseError(){
                self.viewDom.find(".x-list-zzc").hide();
                self.viewDom.find('.x-list-inner').html(
                    '<div class="x-list-error">请求失败，请检查网络</div><div class="x-list-refresh">刷新</div>'
                );
                self.viewDom.find('.x-list-refresh').click(function(){
                    self.init();
                });
                if( self.pageBar.data('bootstrapPaginator')){
                    self.pageBar.data('bootstrapPaginator').destroy();
                }
            }
            function response(data){
                self.rawData=data;
                if(!self.options.dataName){
                    throw 'options error: dataName undefined';
                }else{
                    var vo=data[self.options.dataName];
                }
                if(typeof vo=='undefined'){
                    responseError();
                    return false;
                }
                self.data=vo;
                self.total=data[self.options.totalName];
                var total=self.total;
                init_render(vo,Math.ceil(total/self.options.rowLimit));
            }
            function show_list(e,op,np){
                //不能用this,这里的this指的是页码div的dom对象
                self.currentPage=np;
                fetch(function(data){
                    if(null==self.options.dataName){
                        var vo=data;
                    }else{
                        var vo=data[self.options.dataName];
                    }
                    self.render(vo);
                });
            }

            function init_render(vo,total){
                //是数组
                if(vo.length>0){
                    //分页
                    var options = {
                        totalPages:  total
                        ,onPageChanged:show_list
                        ,currentPage:self.currentPage
                    }
                    options=$.extend(options,self.options.pageOption);
                    if( self.pageBar.data('bootstrapPaginator')){
                        self.pageBar.data('bootstrapPaginator').destroy();
                    }
                    self.pageBar.bootstrapPaginator(options);
                }else{
                    //清空列表，当列表从有数据变为无数据时，应当把原来的那排导航清除
                    self.pageBar.empty();
                }
                self.render(vo);
            }


        },
        render:function(vo){
            //请求结束
            this.viewDom.find(".x-list-zzc").hide();
            //请求结束-code ----end
            //vo :数据
            //view:用于填充模板的div对象
            if(typeof this.options.onLoad=="function"){
                var new_vo=this.options.onLoad(vo);
                if(typeof new_vo!=='undefined'){
                    vo=new_vo;
                }
            }
            //将vo注册到page，用于onItemClick
            this.vo=vo;
            this._render(vo,this.templateView);
            if(typeof this.options.onrender=="function"){
                this.options.onrender($(this.options.element));
            }

        },

        _render:function(vo,view){
            var self=this;
            var html='';
            for(var i=0;i<vo.length;i++){
                html+='<div class="x-list-item" data-index="'+i+'">'+self.options.tpl(vo[i])+'</div>'
            }
            if(html){
                view.html(html);
            }else{
                view.html(self.options.emptyText)
            }

        },

//todo 应该有理想的修改地址和参数的方法。dept.jsp需要
        setOption:function(opts){
            //没有初始化，无法重新设置options
            if(!this.isInit){
                return false;
            }
            $.extend(this.options,opts);
            // this.options.url=opts.url;
            // this.options.param=opts.param;
            // this.options.type=opts.type;
            this.init();
            //this.page(1);
        }
        ,getCurrentPage:function(){
            return this.currentPage;
        },
        reload:function(){
            this.page(this.currentPage);
        },
        /**
         * 显示某一页
         * @param page_num
         */
        page:function(page_num){
            var before_num=this.currentPage;
            if(page_num>0&&page_num<this.total+1){
                this.currentPage=page_num;
            }
            var pager=  this.pageBar.data('bootstrapPaginator');
            if(pager){
                pager.show(page_num);
            }else{
                console.log('list:page fail,reInit');
                this.init();
            }
            //避免页数相同的时候不请求后台
            if(before_num==page_num){
                this.pageBar.trigger('page-changed',[before_num,page_num]);
            }
        },
        destory : function(){

        }


    };

    window.List=pager;

    //requirejs
    return pager

}));