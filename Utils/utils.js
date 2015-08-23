/**
 * 包含了通用的方法和组件
 */
define(['react'],function(React){
    'use strict';

    /*
     *  获取Url中的参数
     */
    function getUrlParm(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
            r = decodeURI(window.location.search).substr(1).match(reg);
        if (r !== null) {
            return r[2];
        }
        return null;
    }

    //兼容IE8的addEventListener
    function addEventListener(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function(){
                handler.call(el);
            });
        }
    }

    //兼容IE8的removeClass
    function removeClass(el,classname) {
        if (el.classList) {
            el.classList.remove(classname);
        } else {
            el.className = s.className.replace(new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    //控制滚动条,200ms滚动到指定位置
    function scroll(target) {
        var speed = Math.abs(window.pageYOffset - target) / 40;
        speed = Math.max(5, speed);
        //若目标位置超过底部,则滚动到底部为止
        var clientHeight = document.documentElement.clientHeight;
        var scrollHeight = document.body.scrollHeight;
        if(target + clientHeight > scrollHeight) {
            target = scrollHeight - clientHeight;
        }
        var scrollToTop = window.setInterval(function() {
            var pos = window.pageYOffset;
            if ( target == pos ) {
                window.clearInterval( scrollToTop );
            } else if ( pos - target > speed ) {
                window.scrollTo(0, pos - speed);
            } else if ( target - pos > speed ) {
                window.scrollTo(0, pos + speed);
            } else {
                window.scrollTo(0, target);
            }
        }, 5);
    }

    /**
     * 执行animate
     * 动画结束后移除Class
     * @param selector
     * @param animate
     * @param delay
     */
    function animate(selector, animate, delay) {
        var s = document.querySelectorAll(selector);
        var timeOut;
        var duration;
        if(delay ==='slow') {
            duration = 'animated-1s';
            timeOut = 1000;
        } else if(delay === 'medium') {
            duration = 'animated-05s';
            timeOut = 500;
        } else {
            duration = 'animated';
            timeOut = 250;
        }
        [].forEach.call(s,function(el){
            el.className += ' ' + duration + ' ' + animate;
            addEventListener(el, 'animationend', function() {
                removeClass(el,animate);
                removeClass(el,duration);
                el.removeEventListener('animationend',this);
            });
            //for IE8-9
            setTimeout(function(){
                removeClass(el,animate);
                removeClass(el,duration);
            },timeOut);
        });
    }

    var popup = {
        /**
         * 中间弹出框，插入到目标元素的前方或后方
         * @param selector 目标元素选择器
         * @param type success为绿色成功框，error为红色警告框，info为蓝色提示框
         * @param word 显示内容
         * @param position 默认为before
         */
        show: function(selector, type, word, position) {
            popup.hide();
            var s = document.querySelector(selector),
                node = document.createElement('p');
            node.className = 'popup-inline animated zoomIn popup-inline-' + type;
            node.innerHTML = word;
            if (position === 'after') {
                s.parentNode.insertBefore(node,s.nextSibling);
            } else {
                s.parentNode.insertBefore(node,s);
            }
        },
        hide: function() {
            [].forEach.call(document.querySelectorAll('.popup-inline'),function(el){
                el.parentNode.removeChild(el);
            });
        },
        /**
         * 顶部弹出框
         * @param word 显示内容
         * @param type success为绿色成功框，error为红色警告框
         * @param time 显示时间，默认值为1500
         */
        top: function(word,type,time) {
            var old = document.querySelectorAll('.popup-top'),
                box = document.createElement('div'),
                icon = '';
            [].forEach.call(old,function(el){
                el.parentNode.removeChild(el);
            });
            if (type === 'success') {
                icon = '<i class="fa fa-check"></i>';
            } else if (type === 'error') {
                icon = '<i class="fa fa-warning"></i>';
            } else if(type === 'info') {
                icon = '<i class="fa fa-leaf"></i>';
            }
            box.className = 'popup-top animated fadeInDownBig popup-top-' + type;
            box.innerHTML = icon + word;
            document.body.appendChild(box);
            setTimeout(function(){
                box.className = 'popup-top animated fadeOutUpBig popup-top-' + type;
                addEventListener(box, 'animationend', function() {
                    box.parentNode.removeChild(box);
                });
                //for IE8-9
                setTimeout(function(){
                    box.parentNode && box.parentNode.removeChild(box);
                },1000);
            },time || 1500);
        }
    };

    /*
     *  格式化
     */
    var format = {
        fromNow: function(date) {
            return date.replace('T', ' ').replace('-', '.').replace('-', '.').substr(0, 10);
        },
        date: function(date) {
            if (date) {
                return date.substr(0,7).replace('-','.');
            }
            return '';
        },
        salary: function(min, max) {
            if (!(min || max)) {
                return '面谈';
            } else if (min ===  max){
                return min + '000/月';
            } else {
                return min + '000-' + max + '000/月';
            }
        }
    };

    /**
     * cookie操作
     * cookie.get('name');
     * cookie.set('name', 'value');
     * cookie.set('name', 'value', { expires: 7, path: '' });
     * cookie.remove('name');
     */
    var cookie = {
        extend: function() {
            var i = 0;
            var result = {};
            for (; i < arguments.length; i++) {
                var attributes = arguments[ i ];
                for (var key in attributes) {
                    result[key] = attributes[key];
                }
            }
            return result;
        },
        set:function (key, value, attributes) {
            var result;
            if (arguments.length > 1) {
                attributes = cookie.extend({
                    path: '/'
                }, {}, attributes);
                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }
                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}
                value = encodeURIComponent(String(value));
                value = value.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);
                return (document.cookie = [
                    key, '=', value,
                    attributes.expires && '; expires=' + attributes.expires.toUTCString(),
                    attributes.path    && '; path=' + attributes.path,
                    attributes.domain  && '; domain=' + attributes.domain
                ].join(''));
            }
        },
        get: function (key) {
            var result;
            if (!key) {
                result = {};
            }
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;
            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var name = parts[0].replace(rdecode, decodeURIComponent);
                var cookie = parts.slice(1).join('=');
                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }
                cookie = cookie.replace(rdecode, decodeURIComponent);
                if (this.json) {
                    try {
                        cookie = JSON.parse(cookie);
                    } catch (e) {}
                }
                if (key === name) {
                    result = cookie;
                    break;
                }
                if (!key) {
                    result[name] = cookie;
                }
            }
            return result;
        },
        remove: function (key, attributes) {
            cookie.set(key, '', cookie.extend(attributes, {
                expires: -1
            }));
        }
    };

    /**
     * 封装ajax
     * 默认：GET，JSON
     * ajax({
     *     type: "post",
     *     url: "test",
     *     dataType: "json",
     *     data: {name:"name"},
     *     success: function(data){}
     *  });
     */
    function ajax(conf) {
        var type = conf.type;
        var url = conf.url;
        var dataType = conf.dataType;
        var success = conf.success;
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var s = [];
        for(var i in conf.data) {
            if(conf.data[i] !== undefined || conf.data[i] !== null) {
                s[s.length] = encodeURIComponent(i) + "=" + encodeURIComponent(conf.data[i]);
            } else {
                s[s.length] = encodeURIComponent(i) + "=";
            }
        }
        var data = s.join( "&" );
        if (dataType == null){
            dataType = "json";
        }
        if (type == "GET" || type == "get" || type == null) {
            xhr.open(type, url + '?' + data, true);
            xhr.setRequestHeader("If-Modified-Since","0");
            xhr.send(null);
        } else if (type == "POST" || type == "post") {
            xhr.open(type, url, true);
            xhr.setRequestHeader("If-Modified-Since","0");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data);
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if(dataType == "text" || dataType=="TEXT") {
                    if (success != null){
                        success(xhr.responseText);
                    }
                } else if(dataType=="xml" || dataType=="XML") {
                    if (success != null){
                        success(xhr.responseXML);
                    }
                } else if(dataType=="json" || dataType=="JSON") {
                    if (success != null){
                        success(eval("("+xhr.responseText+")"));
                    }
                }
            }
        };
    }

    //Nav组件 登陆框
    var LoginBox = React.createClass({
        getInitialState: function() {
            return {
                phone: '',
                psd: ''
            }
        },
        login: function(e) {
            e.preventDefault();
            if (this.state.phone.length < 11) {
                popup.show('#login-form', 'warning', '请输入正确的手机号');
            } else if (this.state.psd.length < 6) {
                popup.show('#login-form', 'warning', '密码长度不少于6位');
            } else {
                ajax({
                    url: "/api/user/login",
                    type: 'POST',
                    data: {
                        phone: this.state.phone,
                        password: this.state.psd
                    },
                    success: function (data) {
                        if (data.status === 0) {
                            cookie.set("id",data.id, {expires:30});
                            cookie.set("name",data.name, {expires:30});
                            cookie.set("phone",data.phone, {expires:30});
                            cookie.set("token",data.token, {expires:30});
                            cookie.set("avatar",data.avatar, {expires:30});
                            window.location.reload();
                        } else if (data.status === 1002) {
                            popup.show('#login-form', 'warning', '手机号或密码错误');
                        }
                    }.bind(this)
                });
            }
        },
        changePhone: function(e) {
            this.setState({phone: e.target.value})
        },
        changePsd: function(e) {
            this.setState({psd: e.target.value})
        },
        render: function() {
            return (
                <div className="lb-container" style={{display: this.props.toggle}}>
                    <div className="lb-wallpaper" onClick={this.props.hide}></div>
                    <div className="lb-box animated fadeInDown">
                        <h4>登录职圈</h4>
                        <i className="fa fa-times" onClick={this.props.hide}></i>
                        <form id="login-form" onSubmit={this.login}>
                            <div className="input-line">
                                <input type="text" className="form-control" placeholder="手机号" maxlength="11" value={this.state.phone} onChange={this.changePhone}/>
                                <i className="fa fa-mobile"></i>
                            </div>
                            <div className="input-line">
                                <input type="password" className="form-control" placeholder="密码" maxlength="16" value={this.state.psd} onChange={this.changePsd}/>
                                <i className="fa fa-lock"></i>
                            </div>
                            <button type="submit" className="login-btn">登 录</button>
                        </form>
                    </div>
                </div>
            )
        }
    });
    var Nav = React.createClass({
        getInitialState: function() {
            //判断是否登录
            if(cookie.get('id')) {
                return {
                    id: cookie.get('id'),
                    avatar: cookie.get('avatar'),
                    pcToggle: 'none',
                    qrToggle: 'none',
                    avatarToggle: 'block',
                    loginToggle: 'none',
                    loginBoxToggle: 'none'
                }
            } else {
                return {
                    id: '',
                    avatar: '',
                    pcToggle: 'none',
                    qrToggle: 'none',
                    avatarToggle: 'none',
                    loginToggle: 'block',
                    loginBoxToggle: 'none'
                }
            }
        },
        //点击简历弹出登录框
        clickResume: function() {
            if(this.state.id !== '') {
                window.location.href = 'resume';
            } else {
                this.setState({loginBoxToggle: 'block'});
            }
        },
        //显示个人中心
        showPc: function() {
            this.setState({pcToggle: 'block'});
            animate('.nav-pc','fadeInDown');
        },
        //隐藏个人中心
        hidePc: function() {
            this.setState({pcToggle: 'none'});
        },
        //显示二维码
        showQr: function() {
            this.setState({qrToggle: 'block'});
            animate('.nav-qr-box','fadeInDown');
        },
        //隐藏二维码
        hideQr: function() {
            this.setState({qrToggle: 'none'});
        },
        //显示登录框
        showLoginBox: function() {
            this.setState({loginBoxToggle: 'block'});
        },
        //隐藏登录框
        hideLoginBox: function() {
            this.setState({loginBoxToggle: 'none'});
        },
        //登出
        logout: function() {
            cookie.remove('id');
            cookie.remove('name');
            cookie.remove('phone');
            cookie.remove('avatar');
            window.location.href = '/';
        },
        render: function() {
            return (
                <nav className="nav">
                    <div className="container">
                        <a className="logo" href={cookie.get('id') ? 'myIndex' : '/'}>
                            <img src="http://static.51zhiquan.com/logo.png" alt="职圈科技"/>
                        </a>
                        <ul className="nav-left">
                            <li className={ this.props.active === 1 ? 'nav-active' : '' }>
                                <a href={cookie.get('id') ? 'myIndex' : '/'}>首页<div className="nav-line"></div></a>
                            </li>
                            <li className={ this.props.active === 2 ? 'nav-active' : '' }>
                                <a href="search">机会<div className="nav-line"></div></a>
                            </li>
                            <li className={ this.props.active === 3 ? 'nav-active' : '' }>
                                <a href="javascript:void(0)" onClick={this.clickResume}>简历<div className="nav-line"></div></a>
                            </li>
                        </ul>
                        <ul className="nav-right">
                            <li className="nav-qr" onMouseEnter={this.showQr} onMouseLeave={this.hideQr}>
                                <i className="fa fa-mobile"></i>
                                <div className="nav-qr-box" style={{display:this.state.qrToggle}}>
                                    <h2>职圈app下载</h2>
                                    <img src="http://static.51zhiquan.com/qrcode.png%3Fv=20150803" alt="安卓二维码"/>
                                    <div className="nav-qr-arrow"></div>
                                </div>
                            </li>
                            <li style={{display:this.state.loginToggle}} onClick={this.showLoginBox}>
                                <a className="nav-login-btn">登录<div className="nav-line"></div></a>
                            </li>
                            <li style={{display:this.state.loginToggle}}>
                                <a href="index?form=register" className="nav-reg-btn">注册<div className="nav-line"></div></a>
                            </li>
                            <li className="nav-avatar" onMouseEnter={this.showPc} onMouseLeave={this.hidePc}  style={{display:this.state.avatarToggle}}>
                                <img src={this.state.avatar}/>
                                <ul className="nav-pc" style={{display:this.state.pcToggle}}>
                                    <li><a href="account"><i className="fa fa-skyatlas"></i>账号设置</a></li>
                                    <li><a href="progress"><i className="fa fa-leaf"></i>求职进展</a></li>
                                    <li><a href="favourite"><i className="fa fa-heart"></i>职位收藏</a></li>
                                    <li>
                                        <a href="javascript:void(0)" onClick={this.logout}>
                                            <i className="fa fa-power-off"></i>退出登录
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <LoginBox toggle={this.state.loginBoxToggle} hide={this.hideLoginBox}/>
                </nav>
            )
        }
    });

    //企业端导航条
    var HrNav = React.createClass({
        getInitialState: function() {
            return {
                id: cookie.get('id'),
                pcToggle: 'none'
            }
        },
        //登出
        logout: function() {
            cookie.remove('id');
            cookie.remove('name');
            cookie.remove('phone');
            window.location.href = '/';
        },
        //显示个人中心
        showPc: function() {
            this.setState({pcToggle: 'block'});
            animate('.nav-pc','fadeInDown');
        },
        //隐藏个人中心
        hidePc: function() {
            this.setState({pcToggle: 'none'});
        },
        render: function() {
            return (
                <nav className="nav">
                    <div className="container">
                        <a className="logo" href='hrIndex'>
                            <img src="http://static.51zhiquan.com/logo.png" alt="职圈科技"/>
                        </a>
                        <ul className="nav-left">
                            <li className={ this.props.active === 1 ? 'nav-active' : '' }>
                                <a href="hrIndex">首页<div className="nav-line"></div></a>
                            </li>
                            <li className={ this.props.active === 2 ? 'nav-active' : '' }>
                                <a href="publishJob">发布职位<div className="nav-line"></div></a>
                            </li>
                            <li className={ this.props.active === 3 ? 'nav-active' : '' }>
                                <a href="searchResume">找简历<div className="nav-line"></div></a>
                            </li>
                            <li className={ this.props.active === 4 ? 'nav-active' : '' }>
                                <a href="manageJob">职位管理<div className="nav-line"></div></a>
                            </li>
                            <li className={ this.props.active === 5 ? 'nav-active' : '' }>
                                <a href="manageResume">简历管理<div className="nav-line"></div></a>
                            </li>
                        </ul>
                        <ul className="nav-right">
                            <li className="nav-cog" onMouseEnter={this.showPc} onMouseLeave={this.hidePc}>
                                <i className="fa fa-cog"></i><span>系统设置</span>
                                <ul className="nav-pc" style={{display:this.state.pcToggle}}>
                                    <li><a href="hrSetting?tab=1"><i className="fa fa-skyatlas"></i>账号设置</a></li>
                                    <li><a href="hrSetting?tab=2"><i className="fa fa-edit"></i>修改密码</a></li>
                                    <li><a href="hrSetting?tab=3"><i className="fa fa-envelope-o"></i>消息管理</a></li>
                                    <li><a href="hrSetting?tab=4"><i className="fa fa-home"></i>企业信息</a></li>
                                    <li>
                                        <a href="javascript:void(0)" onClick={this.logout}>
                                            <i className="fa fa-power-off"></i>退出登录
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
    });

    //页脚
    var Footer = React.createClass({
        getInitialState: function() {
            return { toTopToggle: 'none' }
        },
        componentDidMount: function() {
            //控制返回顶部按钮的显示/隐藏
            addEventListener(window,'scroll',function () {
                window.pageYOffset > 100 ? this.setState({toTopToggle: 'block'}) : this.setState({toTopToggle: 'none'});
            }.bind(this));
        },
        top: function() {
            scroll(0);
        },
        render: function() {
            return(
                <footer>
                    <div className="container">
                        <div className="link">
                            <ul className="clearfix">
                                <li><a href="about">关于我们</a></li>
                                <li><a href="contact">联系我们</a></li>
                                <li><a href="join">加入我们</a></li>
                                <li><a href="links">友情链接</a></li>
                                <li><a href="partner">合作伙伴</a></li>
                            </ul>
                        </div>
                        <div className="copyright">
                            <p>Copyright © 2015 职圈科技 All Rights Reserved. 京ICP备15020119号</p>
                        </div>
                        <div className="to-top fadeInDown animated" onClick={this.top} style={{display: this.state.toTopToggle}}>
                            <i className="fa fa-chevron-up"></i>
                        </div>
                    </div>
                </footer>
            )
        }
    });

    /**
     * 自定义Select组件
     * props:
     * id          必须,select的id
     * change      必须,选中值改变时的回调函数
     * width       不必须,宽度,缺省值为300
     * placeholder 不必须,默认提示,缺省值为空
     * data        不必须,下拉列表数组,缺省时select为disabled.形如[{text:'a',value:'1'}]
     * text        不必须,选中的text
     * value       不必须,选中的value,与text只需传一个
     */
    var Select = React.createClass({
        getInitialState: function() {
            //根据初始value显示相应text
            if(this.props.value) {
                var data = this.props.data;
                for(var i in data) {
                    if(data[i].value === this.props.value) {
                        return {
                            focusedOption: '',
                            isFocused: false,
                            text: data[i].text,
                            dropToggle: 'none',
                            chosenToggle: data[i].text ? 'block' : 'none',
                            placeholderToggle: data[i].text ? 'none' : 'block'
                        };
                    }
                }
            } else {
                return {
                    focusedOption: '',
                    isFocused: false,
                    text: this.props.text || '',
                    dropToggle: 'none',
                    chosenToggle: 'none',
                    placeholderToggle: 'block'
                }
            }
        },
        componentDidMount: function() {
            //点击页面其他区域时,隐藏下拉选项
            addEventListener(document,'click',function(e) {
                var elem = e.target || e.srcElement;
                var id = this.props.id;
                while(elem) {
                    if(elem.id === id) {
                        return;
                    }
                    elem = elem.parentNode;
                }
                this.setState({
                    dropToggle: 'none',
                    isFocused: false
                });
            }.bind(this));
        },
        componentWillReceiveProps: function(nextProps) {
            //当props改变时,判断data是否变化.如果data变化则重置select
            if(this.props.data !== nextProps.data) {
                //若只有一个选项 则默认选中该项
                if(nextProps.data.length === 1) {
                    this.props.change(nextProps.data[0].value,nextProps.data[0].text);
                } else {
                    this.props.change('','');
                }
            } else if(nextProps.value !== undefined) {
                //根据value显示text
                if(nextProps.value === '') {
                    this.setState({
                        text: '',
                        dropToggle: 'none',
                        chosenToggle: 'none',
                        placeholderToggle: 'block'
                    });
                } else {
                    var data = nextProps.data;
                    for(var i in data) {
                        if(data[i].value === nextProps.value) {
                            this.setState({
                                text: data[i].text,
                                dropToggle: 'none',
                                chosenToggle: data[i].text ? 'block' : 'none',
                                placeholderToggle: data[i].text ? 'none' : 'block'
                            });
                            break;
                        }
                    }
                }
            } else if (nextProps.text !== undefined) {
                //显示text
                this.setState({
                    text: nextProps.text,
                    dropToggle: 'none',
                    chosenToggle: nextProps.text ? 'block' : 'none',
                    placeholderToggle: nextProps.text ? 'none' : 'block'
                });
            }
        },
        //显示/隐藏下拉选项
        dropToggle: function() {
            //判断数据是否为空,为空则不显示
            if(this.props.data.length > 0) {
                this.setState({
                    isFocused: true,
                    dropToggle: this.state.dropToggle === 'block' ? 'none' : 'block'
                });
            }
        },
        //选择值改变
        change: function(value,text) {
            this.setState({
                isFocused: false
            });
            this.props.change(value,text);
        },
        //键盘事件
        handleKeyDown: function() {
            event.preventDefault();
            event.stopPropagation();
            switch (event.which) {
                //ESC
                case 27:
                    this.setState({ dropToggle: 'none' });
                    break;
                //down
                case 40:
                case 74:
                    if(this.state.dropToggle === 'none') {
                        this.setState({dropToggle: 'block'});
                    } else {
                        var index = this.state.focusedOption;
                        if(index === '' || index === this.props.data.length - 1) {
                            index = 0;
                        } else {
                            index++;
                        }
                        this.setState({ focusedOption: index });
                        this.refs[index].getDOMNode().focus();
                    }
                    break;
                //up
                case 38:
                case 74:
                    if(this.state.dropToggle === 'none') {
                        this.setState({dropToggle: 'block'});
                    } else {
                        var index = this.state.focusedOption;
                        if(index === '') {
                            index = 0;
                        } else if(index === 0) {
                            index = this.props.data.length - 1;
                        } else {
                            index--;
                        }
                        this.setState({ focusedOption: index });
                        this.refs[index].getDOMNode().focus();
                    }
                    break;
                //enter,space
                case 13:
                case 32:
                    if(this.state.focusedOption !== '') {
                        var data = this.props.data[this.state.focusedOption];
                        this.change(data.value,data.text);
                    }
                    break;
            }
        },
        render: function() {
            var rotate = this.state.dropToggle === 'block' ? 'select-arrow select-arrow-rotate' : 'select-arrow';
            var disabled = this.props.data.length ? "select-placeholder no-select" : "select-placeholder no-select select-disabled";
            //下拉选项
            var option = this.props.data.map(function(i,index){
                var className = index === this.state.focusedOption ? "select-option focused-option" : "select-option"
                return (
                    <li className={className}
                        tabIndex="-1"
                        ref={index}
                        onKeyDown={this.handleKeyDown}
                        onClick={this.change.bind(this,i.value,i.text)}>
                        {i.text}
                    </li>
                )
            }.bind(this));
            var ifFocused = this.state.isFocused ? "select-container select-focus" : "select-container";
            return (
                <div id={this.props.id} className={ifFocused} style={{width: this.props.width || 300}}>
                    <div className={rotate}></div>
                    <div ref="placeholder"
                         tabIndex="-1"
                         className={disabled}
                         style={{display: this.state.placeholderToggle}}
                         onKeyDown={this.handleKeyDown}
                         onClick={this.dropToggle}>
                        {this.props.placeholder}
                    </div>
                    <div ref="chosen"
                         tabIndex="-1"
                         className="select-chosen no-select"
                         style={{display: this.state.chosenToggle}}
                         onKeyDown={this.handleKeyDown}
                         onClick={this.dropToggle}>
                        {this.state.text}
                    </div>
                    <i className="fa fa-times select-cancel"
                       style={{display: this.state.chosenToggle}}
                       onClick={this.props.change.bind(this,'','')}>
                    </i>
                    <ul className="select-drop no-select" style={{display: this.state.dropToggle}}>
                        {option}
                    </ul>
                </div>
            )
        }
    });

    return {
        ajax: ajax,
        popup: popup,
        cookie: cookie,
        format: format,
        scroll: scroll,
        animate: animate,
        getUrlParam: getUrlParm,
        removeClass: removeClass,
        addEventListener: addEventListener,
        Header: Nav,
        HrHeader: HrNav,
        Footer: Footer,
        Select: Select
    }
});