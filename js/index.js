$(function () {
	var photos = {
		picCard:null,
		curPic:[],
		nextPageBtn:{},
		prevPageBtn:{},
		stop:false,
		config:{
			curPage:1,
			pageCount:0,
			pageNum:8,
			angle:17.5,
			offsetAngle:2,
			offsetAngleS:5,
			moreWidth:210,
			offsetX:20,
			offsetS:60,
		},
		//17.5 
		//启动
		ready:function () {
			this.picCard = $('.photos .pic-list li');
			this.nextPageBtn = $('.photos .btn-group>.next');
			this.prevPageBtn = $('.photos .btn-group>.prev');
			this.config.pageCount = Math.ceil(this.picCard.length/this.config.pageNum);
			console.log(this.config.pageCount);
			var parentObj = this;
			this.prevPageBtn.click(function(event) {
				parentObj.prevPage();
			});
			this.nextPageBtn.click(function(event) {
				parentObj.nextPage();
			});
			this.initCurPic();
			this.initPage();
		},
		initCurPic : function () {
			var curPage = this.config.curPage;
			var pageNum = this.config.pageNum;
			var parentObj = this;
			var angle = this.config.angle;
			var moreWidth= this.config.moreWidth;
			parentObj.curPic = [];
			var otherPic = [];
			//初始化当前相册页
			this.picCard.each(function(index, el) {
				
				if (index<curPage*pageNum&&index>=(curPage-1)*pageNum) {
					parentObj.curPic[parentObj.curPic.length] = el;
				}else{
					otherPic[otherPic.length]=$(el);
				}
			});
			for (var i = otherPic.length - 1; i >= 0; i--) {
				var symbolsX = Math.random()>0.5?1:-1;
				var numX = (Math.random()+0.01)/8*10+1;
				var numY = (Math.random()+0.01)/8*10+1;
				otherPic[i].css({
					transform: 'rotate('+Math.random()*360+'deg ) translate('+numX*600+'px,'+numY*600+'px) ',
				});
			}
			this.initPicPositon();
			for (var i = this.curPic.length - 2; i >= 0; i--) {
				$(this.curPic[i]).attr('data-th',i);
				$(this.curPic[i]).hover(function() {
					if (parentObj.stop) {
						return ;
					}
					var angle = parentObj.config.angle;
					var leftAngle = -angle;
					var moreWidth = parentObj.config.moreWidth;
					var leftmoreWidth = -moreWidth;
					var offsetAngle = parentObj.config.offsetAngle;
					var offsetX = parentObj.config.offsetX;
					var temp = $(this).attr('data-th');
					for (var j = parentObj.curPic.length - 1; j > temp; j--) {
						$(parentObj.curPic[j]).css({
							zIndex:'',
							transform: 'rotate('+angle+'deg) translate('+moreWidth+'px,-100px)',
						});
						angle -= offsetAngle;
						moreWidth -= offsetX;
					}
					for ( j = 0; j <= temp; j++) {
						$(parentObj.curPic[j]).css({
							transform: 'rotate('+leftAngle+'deg) translate('+leftmoreWidth+'px,-100px)',
						});
						// $(parentObj.curPic[j]).addClass('shrink');
						leftAngle += offsetAngle;
						leftmoreWidth += offsetX;
					}
		
				}, function() {
					if (parentObj.stop) {
						return ;
					}
					parentObj.initPicPositon();
				});
			}
		},
		initPage:function () {
			$('.photos .title-page #curPage').text(this.config.curPage);
			$('.photos .title-page #pageCount').text(this.config.pageCount);
		},
		initPicPositon:function () {
			var angle = this.config.angle;
			var moreWidth = this.config.moreWidth;
			var offsetAngleS = this.config.offsetAngleS;
			var offsetS = this.config.offsetS;
			var parentObj = this;
			for ( var j = this.curPic.length - 1; j >=0; j--) {
				// console.log(this.curPic.length);
				$(this.curPic[j]).css({
					transformOrigin:'50% 120%',
					zIndex:'',
					transform: 'rotate('+angle+'deg) translate('+moreWidth+'px,-100px)',
				});
				angle -= offsetAngleS;
				moreWidth -= offsetS;
				
				$(this.curPic[j]).unbind('click');
				$(this.curPic[j]).click(function() {
					var curObj = $(this);
					var shade = $('<div class="photoShade"></div>');
					$('body').append(shade);
					if ($(this).hasClass('showLayer')) {
						$('.photoShade').remove();
						$(this).css({
							transformOrigin:'50% 120%',
							transform: ' rotate('+(-parentObj.config.angle)+'deg) translate(-'+parentObj.config.moreWidth+'px,-100px)',	
						});
						setTimeout(function () {
							curObj.removeClass('showLayer');
							parentObj.stop = false;
							parentObj.initCurPic();
						}, 300);
					}else {
						shade.css({
							position : 'fixed',
							left: '0',
							top:'0',
							width :'100%',
							height:'100%',
							background:'rgba(0,0,0,.2)'
						});
						$(this).addClass('showLayer');
						parentObj.stop = true;
						$(this).attr('data-transform', $(this).css('transform'));
						$(this).css({
							transform: ' rotate('+(-parentObj.config.angle)+'deg) translate(-'+parentObj.config.moreWidth+'px,-100px)',
						});
						setTimeout(function () {
							curObj.css({
								transform: 'scale(1.5) ',
								transformOrigin:'',
								zIndex:1,
							});
						}, 300);
					}
				});
			}
		},
		// layer : function () {
			
		// },
		nextPage:function () {
			if (this.stop) {
				alert('请关闭图片后操作');
				return;
			}
			if (this.config.curPage>=this.config.pageCount) {
				this.config.curPage = this.config.pageCount;
			}else {
				this.config.curPage +=1;
				this.initCurPic();
				this.initPage();
			}
			
		},
		prevPage:function () {
			if (this.stop) {
				alert('请关闭图片后操作');
				return;
			}
			if (this.config.curPage<=1) {
				this.config.curPage = 1;
			}else {
				this.config.curPage -=1;
				this.initCurPic();
				this.initPage();
			}
			
		}
	};


	photos.ready();

});