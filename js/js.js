$(document).ready(function(){
    /*滑动事件*/
    (function(w,d){
        var slider = document.getElementById('slider');
        var showcase = document.getElementById('showcase');
        var footer = document.getElementById('footer');
        var nav = document.getElementById('nav');
        var navul = document.getElementById('navul');
        var menublock = document.getElementById('menublock');
        var cause = document.getElementById('cause');
        var $nav = $(nav);
        var $slider = $(slider);
        var $b = $('body');
        var $hb = $('html,body');
        var srollFace;

        /*不允许再扩展第二个函数*/
        var Anchor=[0,cause.offsetTop,showcase.offsetTop,footer.offsetTop];//用来存储锚点;

        /*窗口缩放事件的添加*/
        w.addEventListener('resize',function(){
            /*更新窗口尺寸*/
            var $contents = $('.content');
            $contents.each(function(){
                var $this=$(this);
                var heights = [];
                $this.find('img').each(function(){
                    var $img = $(this);
                    $img.load(function(){
                        /*1.重设content高度*/
                        $this.children().each(function(){
                            heights.push($(this).height());
                        });
                        console.log('父元素高度为'+$this.parent().height());
                        $this.css({
                            height:Math.max.apply(Math,heights), //1 .将最大子元素高度设置为父框架高度
                            top:($this.parent().height()+110-Math.max.apply(Math,heights))/2  // 3.根据父框架调整居中
                        });
                    });
                });

                /*1.重设content高度*/
                $this.children().each(function(){
                    heights.push($(this).height());
                });
                console.log('父元素高度为'+$this.parent().height());
                $this.css({
                    height:Math.max.apply(Math,heights), //1 .将最大子元素高度设置为父框架高度
                    top:($this.parent().height()+110-Math.max.apply(Math,heights))/2  // 3.根据父框架调整居中
                });
            });
            /*更新锚点位置*/
            Anchor[0] = 0;
            Anchor[1]=cause.offsetTop;
            Anchor[2]=showcase.offsetTop;
            Anchor[3]=footer.offsetTop;


        });

        /*下箭头显示*/
        var PControl = $('#btnPageControl');
        PControl.click(function(){
            if(!$hb.is(':animated')){
                if(w.scrollY<=footer.offsetTop-20){
                    srollFace = 'down';
//                        $nav.slideUp();
                    $hb.animate({
                        scrollTop:Anchor.getAnchorByY(w.scrollY+ w.innerHeight)+'px'//滚动到下一屏
                    },500,'easeInOutCirc');
                }else{
//                        $nav.slideDown();
                    srollFace='up';
                    $hb.animate({
                        scrollTop:Anchor.getAnchorByY(0)//滚动到下一屏
                    },500,'easeInOutCirc')
                }

            }
        });

        /*每页添加动画事件*/
        /*各屏元素动画*/
        var page_1_Introboxes=$('.introbox');
        var page_2_teachers = $('.teacherBox');
        var page_3_linkins = $('#contactdown').children('div');
        var page_3_contactup = $('#bottonIntro,#bottonIntroImg');
        w.addEventListener('scroll',function(e){
            if(srollFace=='down'){
                var pagenow = getNowPage(Anchor, w.scrollY);
                var distance = w.innerHeight;
                var Ystar = Anchor[pagenow-1];
                switch (getNowPage(Anchor, w.scrollY)){
                    case 1:
                        if(page_1_Introboxes.is(':animated'))return;
                        page_1_Introboxes.eq(0).css({
                            left:-100
                        }).stop().animate({
                            left:0
                        },1000);
                        page_1_Introboxes.eq(1).css({
                            left:100
                        }).stop().animate({
                            left:0
                        },1000);

                        break;
                    case 2:
                        if(page_2_teachers.is(':animated'))return;
                        page_2_teachers.each(function(i){
                            $(this).css({
                                left:(i-2)*100
                            }).stop().animate({
                                left:0
                            },1000);
                        });
                        break;
                    case 3:
                        if(page_3_linkins.is(':animated'))return;
                        page_3_linkins.css({
                            bottom:-200
                        }).stop().animate({
                            bottom:0
                        },1000);
                        page_3_contactup.eq(0).css({
                            left:-200
                        }).stop().animate({
                            left:0
                        },1000);
                        page_3_contactup.eq(1).css({
                            right:-200
                        }).stop().animate({
                            right:0
                        },1000);
                        break;
                }
            }
        });

        /*判断当前屏幕*/
        function getNowPage(Anchor,y){
            for(var i=0;i<Anchor.length-1;i++){
                if(y<=Anchor[0]){
                    return 0
                }

                if(y>=Anchor[-2]){
                    return Anchor.length-2
                }

                if(y>Anchor[i]&&y<Anchor[i+1]){
                    return i+1;
                }
            }
        }

//        /*滚动事件的添加*/
//        w.addEventListener('mousewheel',function(e){
//            if($nav.is(':animated'))return;
//            if(e.wheelDelta<0){
//                /*如果向下滚动*/
//                $nav.slideUp();//收起nav
//                if(w.scrollY<Anchor[1]){
//                    /*如果在第一屏*/
//                    if(!$b.is(':animated')){
//                        $b.animate({//滚动到第二屏
//                            scrollTop:Anchor.getAnchorByY(Anchor[1])+'px'
//                        },500,'easeInOutCirc');
//                    }
//                    document.body.style.overflowY='hidden';
////                    scrollToY(Anchor.getAnchorByY(Anchor[1]),500);//滚动到第二屏
//                }else{
//                    document.body.style.overflowY='scroll';
//                }
//            }
//            if(e.wheelDelta>0){
//                /*如果向下滚动*/
//                $nav.slideDown();//放下nav
//                if(w.scrollY<Anchor[1]&&w.scrollY>0){
//                    if(!$b.is(':animated')){
//                        $b.animate({
//                            scrollTop:Anchor.getAnchorByY(Anchor[0])+'px'
//                        },500,'easeInOutCirc');
//                    }
//                    /*如果在第一屏*/
//                    document.body.style.overflowY='hidden';
////                    scrollToY(Anchor.getAnchorByY(Anchor[0]),500);//滚动到第0屏
//                }else{
//                    document.body.style.overflowY='scroll';
//                }
//            }
//        });

        /*滚动事件的添加*/
        var mouseWheelfunc = function(e){
            //兼容火狐
            var eWhellDelta = e.wheelDelta||-e.detail;
            srollFace = eWhellDelta<0?'down':'up';
            if($nav.is(':animated'))return;
            if(eWhellDelta<0){
                /*如果向下滚动*/
//                    $nav.slideUp();//收起nav
                if(!$hb.is(':animated')){
                    $hb.animate({
                        scrollTop:Anchor.getAnchorByY(w.scrollY + w.innerHeight)+'px'
                    },500,'easeInOutCirc');
                    console.log(Anchor.getAnchorByY(w.scrollY + w.innerHeight));

                }
            }
            if(eWhellDelta>0){
                /*如果向上滚动*/
//                    $nav.slideDown();//放下nav
                if(!$hb.is(':animated')){
                    $hb.animate({
                        scrollTop:Anchor.getAnchorByY(w.scrollY - w.innerHeight)+'px'
                    },500,'easeInOutCirc');
                }
            }
        };
        w.addEventListener('mousewheel',mouseWheelfunc);
        w.addEventListener('DOMMouseScroll',mouseWheelfunc);

        w.addEventListener('scroll',function(e){
            navFade();
            if(w.scrollY<=footer.offsetTop-20){
                PControl.css({
                    transform:'scaleY(1)'
                })
            }else{
                PControl.css({
                    transform:'scaleY(-1)'
                })
            }

        });

        /*计算锚点的方法*/
        Anchor.getAnchorByY = function(x){
            var arr = this;
            var MaxV,MinV;
            for(var i=0;i<arr.length;i++){
                if(x<=arr[i]&&i>0) {
                    MaxV = arr[i];
                    MinV = arr[i-1];
                    return Math.abs(MaxV-x)-Math.abs(MinV-x)>=0?MinV:MaxV;
                }else if(x<=arr[i]&&i==0){
                    return arr[i]
                }
            }
            return arr[arr.length-1];
        };

        /*根据滚动渐变的方法*/
        function navFade(){
            var per = Math.min(1,w.scrollY/slider.offsetHeight);
            /*导航条背景变动*/
            nav.style.opacity = per;
            /*阴影范围变动*/
//            var shadowArea=per*10;
            /*滑块透明度变动*/
//                menublock.style.opacity = per;
//            nav.style.boxShadow = 'black 0px 0px '+shadowArea+'px';
        }

        /*首页*/
    })(window,document);

    /*slider 部分*/
    (function($){
        var defaults = {
            'auto': false,
            'speed': 250,
            'duration': 1000
        };
        var methods={
            nowindex:0,
            pices:[],
            isAnimated:false
        };

        $.fn.myslider = function(){
            var $this = $(this);
            $this.find('.pice').each(function(id){
                var $this = $(this);
                $this.css({
                    'z-index':0,
                    'left':0,
                    'height':'100%',
                    'overflow':'hidden',
                    'position':'absolute'
                });
                methods.pices.push($this);
            });
            methods.pices[methods.nowindex].css({'z-index':methods.pices.length});
            methods.turnTo = function(tarindex){
                /*原地或者跳没有的则不变*/
                var nowindex = methods.nowindex;
                if(tarindex == nowindex||tarindex>=methods.pices.length)return;

                methods.pices[tarindex].css({
                    'z-index':methods.pices.length-1,
                    'transform':'scale(1.2)',
                    'opacity':0.1
                });
                methods.isAnimated=true;
                methods.pices[nowindex].stop().css({
                    'z-index':methods.pices.length
                }).css({
                    'transform':'scale(1.2)',
                    'opacity':0.1
                }).delay(900).queue(function(){
                    methods.pices[tarindex].css({
                        'z-index': methods.pices.length,
                        'transform':'scale(1)',
                        'opacity':1
                    });
                    methods.pices[nowindex].css({
                        'z-index':0,
                        'transform':'scale(1)',
                        'opacity':0.1
                    });
                    methods.isAnimated=false;
                });
                /*重设当前标志*/
                methods.nowindex=tarindex;
            };
            return methods;
        };

    })($);

    /*slider自动播放*/
    var slider = $('#slider').myslider();
    var i=1;
    var sliderCtrl =$('#sliderCtrl');
    sliderCtrl.find('li').eq(0).css({background:'#E83420'});
    sliderCtrl.find('li').each(function(){
        var li = $(this);
        if(li.attr('data-tar')==sliderCtrl.nowindex)return;
        if(sliderCtrl.isAnimated)return;

        li.click(function(){
            sliderCtrl.find('li').removeAttr('style');
            li.css({background:'#E83420'});
            slider.turnTo(li.attr('data-tar'));
        });
    });
    setInterval(function(){
        sliderCtrl.find('li').removeAttr('style');
        sliderCtrl.find('li').eq(i).css({background:'#E83420'});
        slider.turnTo(i++);
        if(i>=slider.pices.length){
            i=0;
        }
    },8000);

    /*首页菜单滑块*/
    var current = $('#current');
    var menublock = $('#menublock');
    var nav = $('#navul');
    /*下面被减掉的值是滑块的宽度，对于定宽滑块，此值要确定为固定值或者实时计算值*/
    menublock.stop().animate({
        'width':current.find('a').width(),
        'left':parseInt(current.find('a').position().left+(current.find('a').width()-current.find('a').width())/2)
    },1000,'easeOutBack');
    nav.find('ul').find('li').not('#menublock').each(function(){
        $(this).mouseover(function(){
            var a=$(this).find('a');

            a[0].innerHTML = a.attr('data-cn');
            a.eq(0).css({
                'font-size':'14px',
                'color':'#E83420'
            });

            menublock.stop().animate({
                'left':parseInt(a.position().left+(a.width()-a.width())/2),
                'width':a.width()
            },500,'easeOutBack');
        });

        $(this).mouseout(function(){
            var $this=$(this);
            var a = $this.find('a');

            a[0].innerHTML = a.attr('data-en');
            a.eq(0).css({
                'font-size':'16px',
                'color':'white'
            });

            var crt = $('#current');
            if($this.attr('id')!='current'){
                menublock.stop().animate({
                    'left':parseInt(crt.find('a').position().left+(crt.find('a').width()-crt.find('a').width())/2),
                    'width':crt.find('a').width()
                },700,'easeOutExpo');
            }
        });
    });

    /*窗口content居中*/
    var $contents = $('.content');
    $contents.each(function(){
        var $this=$(this);
        var heights = [];
        $this.find('img').each(function(){
            var $img = $(this);
            $img.load(function(){
                /*1.重设content高度*/
                $this.children().each(function(){
                    heights.push($(this).height());
                });
                console.log('父元素高度为'+$this.parent().height());
                $this.css({
                    height:Math.max.apply(Math,heights), //1 .将最大子元素高度设置为父框架高度
                    /**

                     加110是为了排除蓝条，为了防止坑爹乐又改需求，此处先留着，要是
                     他要恢复蓝条自动隐藏，那就要吧110去掉来重新居中。
                     上面窗口缩放的事件也要做相同的处理。

                     */
                    top:($this.parent().height()+110-Math.max.apply(Math,heights))/2  // 3.根据父框架调整居中
                });
            });
        });

        /*1.重设content高度*/
        $this.children().each(function(){
            heights.push($(this).height());
        });
        console.log('父元素高度为'+$this.parent().height());
        $this.css({
            height:Math.max.apply(Math,heights), //1 .将最大子元素高度设置为父框架高度
            top:($this.parent().height()+110-Math.max.apply(Math,heights))/2  // 3.根据父框架调整居中
        });
    });
});