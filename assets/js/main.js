'use strict';

/* full screen test
var onFullScreenEnter=function() {
  console.log("Entered fullscreen!");
  elem.onwebkitfullscreenchange = onFullScreenExit;
  elem.onmozfullscreenchange = onFullScreenExit;
};

var enterFullscreen=function() {
  //console.log("enterFullscreen()");
  var elem = document.querySelector(document.webkitExitFullscreen ? "body" : "body");
  elem.onwebkitfullscreenchange = onFullScreenEnter;
  elem.onmozfullscreenchange = onFullScreenEnter;
  elem.onfullscreenchange = onFullScreenEnter;
  if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else {
      elem.requestFullscreen();
    }
  }
}
document.getElementById("full-screen").onclick=function(){
	enterFullscreen();
};
/* end full screen test */

var inArrayObject=function(nameArray,myArray,myValue){
	var inArrayObject=false;
	for(var i=0, iLength=myArray.length; i<iLength; i++){
		if(nameArray=="intruzi")
		{
			if(myArray[i].randomMove==myValue) inArrayObject=true;
		}
		else if(nameArray=="kladki")
		{
			if(myArray[i].isUp==myValue) inArrayObject=true;
		}
	}
	return inArrayObject;
};
var inArray=function(myArray,myValue){
    var inArray = false;
    myArray.map(function(key){
        if (key === myValue){
            inArray=true;
        }
    });
    return inArray;
};

var removeA=function(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

var randZakres=function( min, max ){
    min = parseInt( min, 10 );
    max = parseInt( max, 10 );

    if ( min > max ){
        var tmp = min;
        min = max;
        max = tmp;
    }

    return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

var map, 
	bgMenu,
	levelFile={name:'level1', activeIdLevel:1, readyLoad:false, blockedKeys:false, backgroundLevel:false, backgroundColor:false, backgroundParallax:false},
	tileSize=16,
	tileX=500,
	tileY=38,
	layer,
	fispeed=[50,100,200],
	wspInkub=[],
	facing = 'right',
	cursors,
	jumpButton,
	fireButton,
	bg,
	oFog,
	ground,
	playGame={main:false},
	preloader,
	preloaderF=false,
	timeLoop = 1,
	timer,
	timerTotal = 0,
	fpsTest=0;

var triggerKeyboardEvent = function(el,keyC,typeKey){
	var eventObj=document.createEvent("Events");

	eventObj.initEvent(typeKey, true, true);
	eventObj.keyCode = keyC;
	eventObj.which = keyC;

	el.dispatchEvent(eventObj);   
}; 

// popinac ewentualnei do przycisku z przeladowaniem strony
var clearGameCache=function() {
    game.cache = new Phaser.Cache(game);
    game.load.reset();
    game.load.removeAll();
}
//clearGameCache();

var preload=function() {
    game.load.tilemap('level1', 'assets/images/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level2', 'assets/images/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level3', 'assets/images/level3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level4', 'assets/images/level4.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('level5', 'assets/images/level5.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('level6', 'assets/images/level6.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('level7', 'assets/images/level7.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('tiles-1', 'assets/images/tiles-1.png');

    game.load.spritesheet('dude', 'assets/images/dude_2.png', 35, 48);
    game.load.spritesheet('intruder', 'assets/images/intruder.png', 30, 30);
    game.load.image('backgroundMenu', 'assets/images/menu.png');
    game.load.image('boxMenu', 'assets/images/box-menu.png', 640, 290);
    game.load.image('background1', 'assets/images/background1.png');
    game.load.image('background2', 'assets/images/background2.png');
    game.load.image('background3', 'assets/images/background3.png');

    game.load.spritesheet('buttonStart', 'assets/images/buttons.png',112,48);
    game.load.spritesheet('buttonEnd', 'assets/images/buttons.png',112,48);
    game.load.spritesheet('buttonPauseMenu', 'assets/images/buttons.png',112,48);
    game.load.spritesheet('buttonsIcons', 'assets/images/icons.png',48,48);
    game.load.image('buttonLevel', 'assets/images/button-level.png');
    game.load.spritesheet('buttonNavigation', 'assets/images/navigations.png',80,80);

    game.load.image('yellowFog', 'assets/images/fog-yellow.png');
    game.load.image('whiteFog', 'assets/images/fog-white.png');
    game.load.image('ground', 'assets/images/ground.png');

    game.load.spritesheet('coin', 'assets/images/coin.png', 10, 10, 10);
    game.load.image('cactus', 'assets/images/cactus.png');
    game.load.image('bullet', 'assets/images/bullet.png');
    game.load.spritesheet('bullets_gun', 'assets/images/bullets2.png', 20, 20);
    game.load.spritesheet('end_level', 'assets/images/end_level.png', 100, 130);
    game.load.image('gun', 'assets/images/gun.png');

	game.load.image('cave', 'assets/images/cave.png');

    game.load.image('kladka', 'assets/images/kladka.png');
    game.load.image('kladka-short', 'assets/images/kladka-short.png');


	//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	//this.scale.pageAlignHorizontally = true;
	//this.scale.pageAlignVertically = true;
	
	//this.scale.updateLayout;

    this.scale.maxWidth = 800;
    this.scale.maxHeight = 450;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.windowConstraints.bottom = "visual";
    //this.scale.setScreenSize();
};


var bgSet=function(bgColor) {
	game.stage.backgroundColor = bgColor;
};


//FPS
var FrameCounter = {
    lastFrameTime: new Date().getTime(),
    updateFPS: function(){
        var currentTime = new Date().getTime();
        fpsTest = Math.floor(1000/(currentTime-this.lastFrameTime),2)+'fps';
        this.lastFrameTime = currentTime;
    }
};




var preloaderT=0;
var preloaderAnimation=function(){
    if(preloaderF)
    {
		preloader.lineTo((preloaderT), game.height-15);
		if(preloaderT<=game.width) preloaderT+=15;
	}
	else if(!preloaderF && preloader)
	{
		preloaderT=0;
		preloader.destroy(); 
	}
	//console.log(pF);
};

// nowy uklad gry - tu dodawac opcje!
var toolsGame={
	windows:{
		boxMenu:{
			obj:false,
			show:function(){
				//console.log(toolsGame.windows.boxMenu.obj);
				//console.log(this.obj);
		    	toolsGame.buttons.openBoxMenu.hide();
		    	if(playGame.main) {
		    		toolsGame.buttons.navigations.hide();
		    	}
				else 
				{
					toolsGame.buttons.levels.hide();
					toolsGame.buttons.play.hide();
				}

				//boxMenu.
				if(this.obj) this.obj.destroy();
		        this.obj=game.add.image(tileSize*2, tileSize*2, 'boxMenu');
		        this.obj.alpha = 0.8;
		        this.obj.fixedToCamera = true;
				
			    toolsGame.buttons.end.show();
			    toolsGame.buttons.closeBoxMenu.show();	
				setTimeout(function(){ 
					game.paused = true; 
				},100);

				/*
				game.input.onDown.add(function(event){

		            var x1 = tileSize*5, 
		            	x2 = game.width-tileSize*5,
		                y1 = tileSize*5, 
		                y2 = game.height-tileSize*5;

		            // Check if the click was inside the menu
		            if(!(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) && game.paused){
						//closeMenu();
						toolsGame.windows.boxMenu.hide();
					}
				}, self);
				*/


			},
			hide:function(){
				if(game.paused)
				{
					this.obj.destroy();
					this.obj=false;
					toolsGame.buttons.end.hide();
					toolsGame.buttons.closeBoxMenu.hide();
					//game.input.onDown.removeAll();
					game.paused = false;
					toolsGame.buttons.openBoxMenu.show();
			    	if(playGame.main) {
			    		toolsGame.buttons.navigations.show();
			    	}
					else 
					{
						toolsGame.buttons.levels.show();
						toolsGame.buttons.play.show();
					}
				}

			}
		}
	},
	buttons:{
		openBoxMenu:{
			obj:false,
			show:function(){
				//x
				//buttonPauseMenu
				//console.log(toolsGame.buttons.openBoxMenu);
				//console.log(this);
				
				if(this.obj) this.obj.destroy();
			    this.obj = game.add.button(tileSize, tileSize, 'buttonPauseMenu', function(){ toolsGame.windows.boxMenu.show() }, this,2,2);
			    this.obj.alpha = 0.4;
			    this.obj.fixedToCamera = true;	
			},
			hide:function(){
				this.obj.destroy();
				//toolsGame.buttons.openBoxMenu.obj.visible = false;
			}
		},
		//buttonsIcons
		closeBoxMenu:{
			obj:false,
			show:function(){
				//buttonPauseMenu
				//console.log(toolsGame.buttons.openBoxMenu);
				//console.log(this);

				if(this.obj) this.obj.destroy();
			    this.obj = game.add.button(44*tileSize, 3*tileSize, 'buttonsIcons', function(){ toolsGame.windows.boxMenu.hide() }, this,3,2);
			    this.obj.alpha = 0.4;
			    this.obj.fixedToCamera = true;
			},
			hide:function(){
				this.obj.destroy();
				//toolsGame.buttons.closeBoxMenu.obj.visible = false;
			}			
		},
		play: {
			obj:false,
			show:function(){
				//buttonPlay
				if(this.obj) this.obj.destroy();
			    this.obj = game.add.button(21*tileSize, 6*tileSize, 'buttonStart', startGame, this);
			    this.obj.alpha = 0.4;
			    this.obj.fixedToCamera = true;
			},
			hide:function(){
				this.obj.destroy();
				//toolsGame.buttons.play.obj.visible = false;
			}
		},
		end: {
			obj:false,
			show:function(){
				//buttonEnd
				if(this.obj) this.obj.destroy();
			    this.obj = game.add.button(3*tileSize, 3*tileSize, 'buttonEnd', function(){ 
			    	//game.paused = false;
			    	//closeMenu();
			    	toolsGame.windows.boxMenu.hide();
			    	endGame(); 
			    	levelFile.name='level1';
			    	levelFile.activeIdLevel=1; 
			    }, this,1,1);
			    this.obj.alpha = 0.4;
			    this.obj.fixedToCamera = true;
			},
			hide:function(){
				this.obj.destroy();
				//toolsGame.buttons.end.obj.visible = false;
			}
		},
		navigations: {
			left:false,
			right:false,
			up:false,
			shot:false,
			show:function(){
				if(this.left) this.left.destroy();
			    this.left = game.add.button(tileSize,(game.height-(6*tileSize)), 'buttonNavigation', function(){}, this,0,0); //#
			    this.left.alpha = 0.1;
			    this.left.fixedToCamera = true;
				this.left.onInputDown.add(function(){ triggerKeyboardEvent(window,37,"keydown"); });
				this.left.onInputUp.add(function(){ triggerKeyboardEvent(window,37,"keyup"); });

				if(this.right) this.right.destroy();
			    this.right = game.add.button(7*tileSize,game.height-(6*tileSize), 'buttonNavigation', function(){}, this,1,1); //#
			    this.right.alpha = 0.1;
			    this.right.fixedToCamera = true;
				this.right.onInputDown.add(function(){ triggerKeyboardEvent(window,39,"keydown"); });
				this.right.onInputUp.add(function(){ triggerKeyboardEvent(window,39,"keyup"); });

				if(this.up) this.up.destroy();
			    this.up = game.add.button((game.width-(6*tileSize)),(game.height-(6*tileSize)), 'buttonNavigation', function(){}, this,2,2); //#
			    this.up.alpha = 0.1;
			    this.up.fixedToCamera = true;
				this.up.onInputDown.add(function(){ triggerKeyboardEvent(window,38,"keydown"); });
				this.up.onInputUp.add(function(){ triggerKeyboardEvent(window,38,"keyup"); });
			
				if(this.shot) this.shot.destroy();
			    this.shot = game.add.button((game.width-(6*tileSize)),(game.height-(12*tileSize)), 'buttonNavigation', function(){}, this,3,3); //#
			    this.shot.alpha = 0.1;
			    this.shot.fixedToCamera = true;
				this.shot.onInputDown.add(function(){ triggerKeyboardEvent(window,17,"keydown"); });
				this.shot.onInputUp.add(function(){ triggerKeyboardEvent(window,17,"keyup"); });
			},
			hide:function(){
				this.left.destroy();
				this.right.destroy();
				this.up.destroy();
				this.shot.destroy();
			}
		},
		levels: {
			obj:[],
			text:[],
			show:function(){
				//toolsGame.buttons.levels
				var item=0;
				for (var key in game.cache._cacheMap[7]) {
					if (game.cache._cacheMap[7].hasOwnProperty(key)) {
						item++;
						//console.log(key + " - " + item);
						this.obj.push(item);
						this.text.push(item);
						this.obj[item] = game.add.button(5*tileSize*(item-1)+(5*tileSize), 18*tileSize, 'buttonLevel', function(){
								//console.log(this);
								levelFile.name='level'+this;
								levelFile.activeIdLevel=this; 
								startGame();
							}, item);
						this.text[item] = game.add.text(0, 0, item, {font: "24px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
						this.text[item].setTextBounds(0, 0, 4*tileSize, 4.5*tileSize);
						this.obj[item].alpha = 0.6;
						this.obj[item].addChild(this.text[item]);
						this.obj[item].fixedToCamera = true;
					}
				}
				//alert(this.start.length);
			},
			hide:function(){
				//alert(toolsGame.buttons.levels.obj.length);
				for(var i=1, iLength=this.obj.length; i<iLength; i++) {
					//console.log(this.obj[i]);
					this.obj[i].destroy();
				}
				this.obj=[];
				this.text=[];

			}
		}
	},
	text: {
		obj: [],
		show: function(typeText,x,y,opacitySpec,textSpec,fontSpec,colorSpec,cameraFixed,idName){
			if(this.obj[idName]) this.obj[idName].destroy();
			this.obj.push(idName);
			if(typeText=='center')
			{
			    this.obj[idName] = game.add.text(x, y, textSpec, { font: fontSpec, fill: colorSpec, boundsAlignH: "center", boundsAlignV: "middle"  });
			    this.obj[idName].setTextBounds(x, y, game.width, game.height);
			}
			else 
			{
				this.obj[idName] = game.add.text(x, y, textSpec, { font: fontSpec, fill: colorSpec });			
			}		
		    this.obj[idName].alpha = opacitySpec;
		    this.obj[idName].fixedToCamera = cameraFixed;	

		},
		hide: function(idName){
			this.obj[idName].destroy();
		}
	},
	mainElements: {
		player:{
			gun:{
				obj: false, //toolsGame.mainElements.player.gun.obj
				startGun: false, //toolsGame.mainElements.player.gun.startGun
				bullets:{
					obj: false, // toolsGame.mainElements.player.gun.bullets.obj
					restartBullets:function(){ // toolsGame.mainElements.player.gun.bullets.restartBullets()
						if(this.obj === true) 
						{
							this.obj.z=0;
							this.obj.destroy(true);
						}
					    this.obj = game.add.group();
					    this.obj.enableBody = true;
					    this.obj.createMultiple(9, 'bullet');
					    this.obj.setAll('anchor.x', 0.5);
					    this.obj.setAll('anchor.y', 1);

						/*
						if(typeof bullets === 'object') 
						{
							bullets.z=0;
							bullets.destroy(true);
						}
					    bullets = game.add.group();
					    bullets.enableBody = true;
					    bullets.createMultiple(9, 'bullet');
					    bullets.setAll('anchor.x', 0.5);
					    bullets.setAll('anchor.y', 1);
					    */

					}
				},
				visualGun:function(player){ // toolsGame.mainElements.player.gun.visualGun()
					if(this.obj)
					{
				    	if (player.obj.frame==0 || cursors.left.isDown) 
						{
						    this.obj.scale.x = -1;
						    this.obj.reset(player.obj.x + 8, player.obj.y + 20);
				    	}
				    	else if (player.obj.frame==4 || cursors.right.isDown) 
						{
						    this.obj.scale.x = 1;
						    this.obj.reset(player.obj.x + 22, player.obj.y + 20);
				    	}
				    }
				},
				shot:function(player){ // toolsGame.mainElements.player.gun.shot()
			        if (fireButton.isDown)
			        {
					    if (player.countBullets > 0 && game.time.now > player.bulletTime)
					    {
					        //  Grab the first bullet we can from the pool
					        player.bullet = player.gun.bullets.obj.getFirstExists(false);

					        if (player.bullet)
					        {
					    		player.countBullets--;

					        	clearTimeout(player.gun.startGun);
								if(!player.gun.obj)
								{ 
									player.gun.obj = game.add.image(player.obj.x, player.obj.y, "gun");
								}

					        	player.gun.startGun=setTimeout(function(){
					        		if(player.gun.obj)
					        		{
						        		player.gun.obj.destroy();
						        		player.gun.obj=false;
						        		clearTimeout(player.gun.startGun);
						        	}
					        	},2000);


						    	if (player.obj.frame==0 || cursors.left.isDown) 
								{
									player.bullet.reset(player.obj.x + 2, player.obj.y + 23);
						    		player.bullet.body.velocity.x = -1400;
						    	}
						    	else if (player.obj.frame==4 || cursors.right.isDown) 
								{
									player.bullet.reset(player.obj.x + 28, player.obj.y + 23);
						    		player.bullet.body.velocity.x = 1400;
						    	}
						    	//bullet.body.allowGravity = false;
					            player.bulletTime = game.time.now + 200;
					            //console.log(bullet.z);
					        }
					        else
					        {
					        	player.bullet=0;
					        	player.gun.bullets.restartBullets();
					        }
					    }
			        }
				}
			},
			bullet: false,//toolsGame.mainElements.player.bullet
			bulletTime: 0,//toolsGame.mainElements.player.bulletTime
			countBullets: 6, //toolsGame.mainElements.player.countBullets
			jumpTimer: 0, //toolsGame.mainElements.player.jumpTimer
			obj: false,
			add:function(x,y){ //add visual player
				if(this.obj==false)
				{
					//toolsGame.mainElements.player.obj =  player
				    this.obj = game.add.sprite((x*tileSize), ((y*tileSize)-(3*tileSize)), 'dude');
				    game.physics.enable(this.obj, Phaser.Physics.ARCADE);
				    this.obj.body.bounce.y = 0.3;
				    this.obj.body.collideWorldBounds = true;
				    this.obj.animations.add('left', [0, 1, 2, 3], 10, true);
				    this.obj.animations.add('right', [4, 5, 6, 7], 10, true);
				    //this.obj.body.allowGravity = false;
				    //game.camera.follow(this.obj);
				    game.camera.follow(this.obj, Phaser.Camera.FOLLOW_LOCKON, 0.1,0.1);
				    //console.log(game.camera.lerp);

				    this.gun.bullets.restartBullets();
				    this.countBullets=6;
				    this.gun.obj=false;
				}
			}
		},
		intruzi:{
			objects: true,
			add: function(x,y) {
				//toolsGame.mainElements.intruzi.objects =  intruzi
				var intruz = this.objects.create((x*tileSize), ((y*tileSize)-(2*tileSize)), 'intruder');
				game.physics.enable(intruz, Phaser.Physics.ARCADE);
				intruz.body.bounce.y = 0.4;
				intruz.body.collideWorldBounds = true;
				intruz.animations.add('left', [6, 7, 8, 9, 10, 11], 10, true); //12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 
				intruz.animations.add('right', [0, 1, 2, 3, 4, 5], 10, true);
				intruz.randomMove=parseInt(Math.random() * 2) ?  'intruzRight' : 'intruzLeft';
				intruz.randomSpeed=fispeed[Math.floor(Math.random() * fispeed.length)];	
			}
		},
		coins:{
			objects: true,
			add: function(x,y) {
				//toolsGame.mainElements.coins.objects = coins
		        var coin = this.objects.create(x*tileSize, y*tileSize, 'coin');
				coin.animations.add('run');
				coin.animations.play('run', 15, true);
				coin.body.allowGravity = false;
			}
		},
		bulletsGuns:{
			objects: true,
			add: function(x,y) {
				//toolsGame.mainElements.bulletsGuns.objects = bullets_guns
		        var bullets_gun = this.objects.create((x*tileSize)-5, (y*tileSize)-5, 'bullets_gun');
				bullets_gun.animations.add('run');
				bullets_gun.animations.play('run', 14, true);
				bullets_gun.body.allowGravity = false;
			}
		},
		cacti:{
			objects: true,
			add: function(x,y) {
		        var cactus = this.objects.create((x*tileSize)-22, (y*tileSize)-72, 'cactus');
				cactus.body.allowGravity = false;
			}
		},
		caves:{
			objects: true,
			add: function(x,y) {
		        var cave = this.objects.create((x*tileSize)+(2*tileSize), (y*tileSize)-240, 'cave');
				cave.body.allowGravity = false;
			}
		},
		endLevelS:{ //end_level_s
			obj: true, // toolsGame.mainElements.endLevelS.obj = end_level_s
			add: function(x,y) {
		        var end_level = this.obj.create((x*tileSize)-42, (y*tileSize)-110, 'end_level');
				end_level.animations.add('run');
				end_level.animations.play('run', 17, true);
				end_level.body.allowGravity = false;				
			}
		},
		kladki:{
			kladkaPlayerBounceReset: true, // toolsGame.mainElements.kladki.kladkaPlayerBounceReset
			poziom: {
				objects: true, // toolsGame.mainElements.kladki.poziom.objects = kladki
				add: function(x,y){
			        var kladkaPoz = this.objects.create(x*tileSize, y*tileSize, 'kladka');
			        game.physics.enable(kladkaPoz, Phaser.Physics.ARCADE);
			        kladkaPoz.body.collideWorldBounds = true;
					kladkaPoz.body.allowGravity = false;
					kladkaPoz.body.immovable = true;
				}
			},
			pion: {
				objects: true, // toolsGame.mainElements.kladki.pion.objects = kladkiPion
				add: function(x,y){
			        var kladkaPion = this.objects.create(x*tileSize, y*tileSize, 'kladka-short');
			        game.physics.enable(kladkaPion, Phaser.Physics.ARCADE);
			        kladkaPion.body.collideWorldBounds = true;
					kladkaPion.body.allowGravity = false;
					kladkaPion.body.immovable = true;
					kladkaPion.body.orginalY=y;				
				}
			}
		}
	}
}


var startGame=function() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	toolsGame.text.show('center',0,0,0.6,"Level " + levelFile.activeIdLevel + "\n" + 'Loading...','bold 46px Arial','#000000',true,'loading');
	preloader = game.add.graphics(0, 0);    
	preloader.lineStyle(30, 0xfe0000);
	preloader.moveTo(0, game.height-15);
	preloader.fixedToCamera = true;
	preloaderF=true;

	timer = game.time.create(false);
	timerTotal=0;
	timer.loop(1000, function(){ timerTotal++ }, this);
	timer.start();

	game.time.advancedTiming = true;
    game.time.desiredFps = ($(window).width()<800)?40:60;
    //game.time.desiredFps = 60;

	//reset inkubatorow
    wspInkub=[];
	
	//usuwanie przyciskow leveli
	toolsGame.buttons.levels.hide();

	//usuwanie logo text
	toolsGame.text.hide('logoText');

	// usuwanie tla menu
	bgMenu.destroy(); 

	//usuwanie przycisku menu
	toolsGame.buttons.openBoxMenu.hide();

    //game.time.slowMotion = 1.0;

    setTimeout(function(){	

	    map = game.add.tilemap(levelFile.name);
	    map.addTilesetImage('tiles-1');
	    //console.log(map.tilesets["0"].properties);

	    
	    map.setTileIndexCallback(9, function(objectCollision,mapElement){ 
	    	if(objectCollision.key=="dude")
	    	{
	    		//objectCollision.alpha=0.5; // to jest player
	    		//console.log(objectCollision.key);
	    		//console.log(map);
	    		//console.log(map + " | " + map.getTile(65, 75, layer, true).index);
	    	}
	    }, this);
	    map.setCollisionByExclusion([ 101, 102, 205, 206, 207, 201, 202, 203, 301, 302, 303, 401, 402, 403, 404, 405, 406, 407, 451, 452, 453, 454, 455, 456, 457, 459, 552 ]);

		//ladowanie background tla dla daenj mapy z jsona
		if(map.tilesets["0"].properties.backgroundColor)
		{
			levelFile.backgroundColor=map.tilesets["0"].properties.backgroundColor;
		}
		else
		{
			levelFile.backgroundColor='#4488AA';
		}
		bgSet(levelFile.backgroundColor);


	    if(map.tilesets["0"].properties.background=="none" || !map.tilesets["0"].properties.background)
	    {
	    	levelFile.backgroundLevel='none';
	    }
	    else // jesli jest to laduje obrazek
	    {
	    	levelFile.backgroundLevel=map.tilesets["0"].properties.background; 
		    // obrazek o rozmiarze 1600px specjalnie pod parallaxe...
		    bg = game.add.sprite(0, (game.height-(28.125*tileSize)), levelFile.backgroundLevel);
		    bg.width=100*tileSize;
		    bg.height=28.125*tileSize;
		    bg.fixedToCamera = true;

			if(map.tilesets["0"].properties.parallax=="true")
			{
				levelFile.backgroundParallax=true;
			}
			else
			{
				levelFile.backgroundParallax=false;
			}

	    }

	    if(map.tilesets["0"].properties.fog!="false")
	    {
	    	var algoPosit=25/(tileSize/10), 
	    		heightLessForGround=tileSize*4; // spolrzdna mgly do gruntu
			oFog = game.add.tileSprite(-(tileX*tileSize), ((tileY-algoPosit)*tileSize)-heightLessForGround, ((2*tileX)*tileSize), (algoPosit*tileSize), map.tilesets["0"].properties.fog);
			oFog.speed=0.25;
	    }
	    else
	    {
	    	oFog=false;
	    }
		ground = game.add.tileSprite(-(tileX*tileSize), (tileY*tileSize)-6*tileSize, ((2*tileX)*tileSize), 6*tileSize, 'ground');

	    //layer = map.createLayer('Tile Layer 1');
	    //console.log(map + " | " + map.getTile(65, 75, layer, true).index);
	    //  Un-comment this on to see the collision tiles
	    // layer.debug = true;
	    //layer.resizeWorld();

		//console.log(game.world.width + "x" + game.world.height);

	    game.physics.arcade.gravity.y = 750;
		
	    cursors = game.input.keyboard.createCursorKeys();
	    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);


	    //ustawianie obiektow wg indexow mapy
	    //kolejnosc wyznacza z-index warstwy 

		toolsGame.mainElements.caves.objects = game.add.group();
		toolsGame.mainElements.caves.objects.enableBody = true;

		toolsGame.mainElements.cacti.objects = game.add.group();
		toolsGame.mainElements.cacti.objects.enableBody = true;

	    toolsGame.mainElements.endLevelS.obj = game.add.group();
	    toolsGame.mainElements.endLevelS.obj.enableBody = true;

	    toolsGame.mainElements.coins.objects = game.add.group();
	    toolsGame.mainElements.coins.objects.enableBody = true;

	    toolsGame.mainElements.intruzi.objects = game.add.group();
	    toolsGame.mainElements.intruzi.objects.enableBody = true;

	    toolsGame.mainElements.kladki.poziom.objects = game.add.group();
	    toolsGame.mainElements.kladki.poziom.objects.enableBody = true;

	    toolsGame.mainElements.kladki.pion.objects = game.add.group();
	    toolsGame.mainElements.kladki.pion.objects.enableBody = true;


		toolsGame.mainElements.bulletsGuns.objects = game.add.group();
		toolsGame.mainElements.bulletsGuns.objects.enableBody = true;

		//player=false;
		toolsGame.mainElements.player.obj=false;
		
	    for(var x=0; x<map.width; x++)
	    {
	    	for(var y=0; y<map.height; y++)
	    	{

				//generowanie jaskini
	    		if (map.getTile(x, y, layer, true).index==1)
	    		{
					toolsGame.mainElements.caves.add(x,y);
					map.removeTile(x, y, layer);
				}

	    		//generowanie monet
	    		if (map.getTile(x, y, layer, true).index==502)
	    		{
					toolsGame.mainElements.coins.add(x,y);
					map.removeTile(x, y, layer);
				}
				//generowanie nabojow
	    		if (map.getTile(x, y, layer, true).index==503)
	    		{
					toolsGame.mainElements.bulletsGuns.add(x,y);
					map.removeTile(x, y, layer);
				}

				//generowanie kaktusow
	    		if (map.getTile(x, y, layer, true).index==504)
	    		{
					toolsGame.mainElements.cacti.add(x,y);
					map.removeTile(x, y, layer);
				}

				//generowanie konca levelu
	    		if (map.getTile(x, y, layer, true).index==601)
	    		{	
					toolsGame.mainElements.endLevelS.add(x,y);
					map.removeTile(x, y, layer);
				}

	    		//generowanie intruzow
	    		if (map.getTile(x, y, layer, true).index==551)
	    		{
				    toolsGame.mainElements.intruzi.add(x,y);
	    			map.removeTile(x, y, layer);
	    		}

				//generowanie kladki poziomej
				if (map.getTile(x, y, layer, true).index==505)
				{
					toolsGame.mainElements.kladki.poziom.add(x,y);
				    map.removeTile(x, y, layer);
				}

				//generowanie kladki pionowe
				if (map.getTile(x, y, layer, true).index==506)
				{
					toolsGame.mainElements.kladki.pion.add(x,y);
				    map.removeTile(x, y, layer);
				}

				//generowanie inkubatora
				if (map.getTile(x, y, layer, true).index==552)
				{
					wspInkub.push(x*tileSize + "," + y*tileSize);
				}

	    	}
	    }

	    layer = map.createLayer('Tile Layer 1');
	    layer.resizeWorld();

	    for(var x=0; x<map.width; x++)
	    {
	    	for(var y=0; y<map.height; y++)
	    	{				
	    		//generowanie playera
				if (map.getTile(x, y, layer, true).index==501)
				{
					//player moze byc tylko jeden wiec tylko raz jest genrowany
					toolsGame.mainElements.player.add(x,y);
				    map.removeTile(x, y, layer);
				}

	    	}
	    }

		playGame.main=true;
		//console.log(game.world.width + "x" + game.world.height);
		game.load.start();
	},1500);

	toolsGame.buttons.play.hide();
};

var create=function() {
	// ladowanie tla dla menu i domyslnego dla mapy gry
	bgSet('#dfe4ff');
    bgMenu = game.add.image(0, 0, 'backgroundMenu');
    bgMenu.fixedToCamera = true;

    toolsGame.buttons.play.show();
	
	toolsGame.text.show(false,game.width-110,game.height-25,.9,'semDesign Game', '400 12px Arial' ,'#000000',true,'logoText');


	//if(toolsGame.buttons.openBoxMenu.obj){
	//	toolsGame.buttons.openBoxMenu.hide();
	//}
	toolsGame.buttons.openBoxMenu.show();


	toolsGame.buttons.levels.show();

    game.load.onLoadComplete.add(function() { 
    	toolsGame.text.hide('loading');
    	toolsGame.buttons.openBoxMenu.show();
    	toolsGame.buttons.navigations.show();
    	preloaderF=false;
    }, this);

	//fullscreen...
	//game.input.onDown.add(gofull, this);

    //window.graphics = graphics;
};


var isEven=function(n) {
  return n == parseFloat(n)? !(n%2) : void 0;
}

var collisionIntruz=function(intruz,destiny){
	var ftf=setInterval(function(){

		if(isEven(Math.ceil(game.time.now/100)))
		{
			//if(destiny=="total-kill") intruz.alpha=0.2;
			intruz.body.velocity.y = -30;
		}
		else 
		{
			//intruz.alpha=1;
		}
		//intruz.scale.setTo(0.5,0.5);
		if(destiny!="total-kill") 
		{
			if(intruz.randomMove=='intruzRight' || intruz.randomMove=='intruzLeft') 
			{
				intruz.randomMove='intruzStop';	
		        toolsGame.mainElements.player.obj.body.velocity.y = -200;		
			}
		}

	},1000/60);
	if(destiny=="total-kill") 
	{
		intruz.animations.add('left', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 19, true);
		intruz.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 19, true);
		intruz.randomSpeed=0;
		setTimeout(function(){
			clearInterval(ftf);
		    intruz.animations.add('left', [6, 7, 8, 9, 10, 11], 10, true); //12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 
			intruz.animations.add('right', [0, 1, 2, 3, 4, 5], 10, true);
			intruz.randomSpeed=fispeed[Math.floor(Math.random() * fispeed.length)];
			intruz.randomMove='intruzDelete';
			//intruz.kill();
		},450);
	}
	else
	{
		setTimeout(function(){
			clearInterval(ftf);
			intruz.randomMove='intruzRight'
			//intruz.alpha=1;
		},100);
	}
	toolsGame.mainElements.player.obj.body.overlapY=0;	
}


// main loop the game
var update=function() {
	
	if(playGame.main)
	{
		FrameCounter.updateFPS();
		
	 	// position player
	    //console.log("x: " + toolsGame.mainElements.player.obj.body.x + " / " + "y: " + toolsGame.mainElements.player.obj.body.y);

		//game.physics.arcade.collide(toolsGame.mainElements.player.obj, layer);

		game.physics.arcade.collide(toolsGame.mainElements.player.obj, layer, function(player, layer){
			//console.log(player.body.checkCollision.down);
			//console.log(player.body.blocked.right);
			
			// wchodzeni pod gorke
			if((cursors.right.isDown || cursors.left.isDown) && (player.body.blocked.right || player.body.blocked.left) && !jumpButton.isDown && player.body.onFloor())
			{
				//console.log("up");
		        player.body.velocity.y = -12*tileSize;
			}
			//console.log("x: " + player.body.x + " / " + "y: " + player.body.y);
		},null, this);		
		game.physics.arcade.collide(toolsGame.mainElements.coins.objects, layer);
		game.physics.arcade.collide(toolsGame.mainElements.player.gun.bullets.obj, layer);

		game.physics.arcade.overlap(toolsGame.mainElements.player.gun.bullets.obj, toolsGame.mainElements.intruzi.objects, function(bullet, intruz){
			//jden strzal wywoluje jedna funkcje...
			if(!intruz.killing) collisionIntruz(intruz,"total-kill");
			intruz.killing=true;
			bullet.kill();
		}, null, this);

		game.physics.arcade.overlap(toolsGame.mainElements.player.gun.bullets.obj, layer, function(bullet, layer){
			if(bullet.body.blocked.right || bullet.body.blocked.left)
			{
				bullet.kill();
			}
		}, null, this);

		game.physics.arcade.overlap(toolsGame.mainElements.player.obj, toolsGame.mainElements.coins.objects, function(player, coin){
		    coin.kill();
		}, null, this);

		game.physics.arcade.overlap(toolsGame.mainElements.player.obj, toolsGame.mainElements.bulletsGuns.objects, function(player, bullets_gun){
		    toolsGame.mainElements.player.countBullets+=6;
		    bullets_gun.kill();
		}, null, this);

		//// Finishing the level
		game.physics.arcade.overlap(toolsGame.mainElements.player.obj, toolsGame.mainElements.endLevelS.obj, function(player, end_level){
			if(!levelFile.readyLoad)
			{
				levelFile.readyLoad=true;
				//setTimeout(function(){
					levelFile.blockedKeys=true;
					//console.log(toolsGame.mainElements.player.obj.position.y);
                    //toolsGame.mainElements.player.obj.position.y = toolsGame.mainElements.player.obj.position.y - 50;
                    toolsGame.mainElements.player.obj.body.bounce.y = .9;
				//},100);
				setTimeout(function(){
					levelFile.activeIdLevel=parseInt(map.tilesets["0"].properties.id)+1;
					//alert(id);
					endGame();
					levelFile.name='level'+levelFile.activeIdLevel;
					startGame();
					levelFile.readyLoad=false;
					levelFile.blockedKeys=false;
				},2000);
			}
		}, null, this);

		game.physics.arcade.collide(toolsGame.mainElements.intruzi.objects, layer);

		//// player collide intruder
		if(!levelFile.blockedKeys) {

            game.physics.arcade.overlap(toolsGame.mainElements.player.obj, toolsGame.mainElements.intruzi.objects, function(player, intruz){
                //alert(toolsGame.mainElements.intruzi.objects.getIndex(intruz));
                //intruz.alpha=0.2;
                //var idf=toolsGame.mainElements.intruzi.objects.getIndex(intruz);
                if(player.body.overlapY>0)
                {
                    collisionIntruz(intruz);
                }

            }, null, this);

            //console.log(game.physics.arcade.overlap(player, toolsGame.mainElements.intruzi.objects));

            game.physics.arcade.collide(toolsGame.mainElements.intruzi.objects, toolsGame.mainElements.player.obj);
		}



	


			
		if(timeLoop>=600) timeLoop=0;
		else timeLoop++;
		//console.log(timeLoop);


		game.physics.arcade.overlap(toolsGame.mainElements.intruzi.objects, layer, function(intruz,lay){
			//game.physics.arcade.collide(intruz, layer);
			//game.physics.arcade.collide(intruz, player);

			intruz.body.velocity.x = 0;
			
			if(intruz.randomMove=='intruzRight' || intruz.randomMove=='intruzLeft')
			{
				
				if(intruz.body.blocked.left) intruz.randomMove='intruzLeft';
				else if(intruz.body.blocked.right) intruz.randomMove='intruzRight';
				
				if(timeLoop==0)
				{
					if(intruz.randomMove=='intruzLeft') intruz.randomMove='intruzRight';
					else if(intruz.randomMove=='intruzRight') intruz.randomMove='intruzLeft';
				}

						
				if(intruz.randomMove=='intruzRight'){
					intruz.body.velocity.x = -intruz.randomSpeed;
					intruz.animations.play('left');
				}
				else if(intruz.randomMove=='intruzLeft')
				{
					intruz.body.velocity.x = intruz.randomSpeed;
					intruz.animations.play('right');			
				}
				//console.log(intruz.body.blocked.left + ' - ' + intruz.body.blocked.right);
			} 
			else if(intruz.randomMove=='intruzDelete'){
				intruz.randomMove=parseInt(Math.random() * 2) ?  'intruzRight' : 'intruzLeft';
				var wsp=[], wspX=150, wspY=100;
				if(wspInkub.length>0)
				{
					var losoweWspInk=randZakres(0,wspInkub.length-1);
					//console.log(losoweWspInk);
					wsp=wspInkub[losoweWspInk].split(",");
					wspX=parseInt(wsp[0]);
					wspY=parseInt(wsp[1]);
				}
				//console.log(wspInkub);
				//console.log(wspX + "," + wspY);
				//intruz.body.x=wspX;
				//intruz.body.y=wspY;
				intruz.kill();
				setTimeout(function(){
					toolsGame.mainElements.intruzi.add(wspX,wspY);
				}, 3000);
				//intruz.alpha=1;
			}
			else if(intruz.randomMove=='intruzStop'){
				intruz.frame = 12;
			}
			//console.log(intruz.randomMove);
		},null, this);

		game.physics.arcade.collide(toolsGame.mainElements.intruzi.objects, toolsGame.mainElements.intruzi.objects, function(intruz){ 
			var jumpTimerIntruz=0;
		    if (intruz.body.onFloor() && game.time.now > jumpTimerIntruz)
		    {
		        intruz.body.velocity.y = -350;
		        jumpTimerIntruz = game.time.now + 350;
		    }
		    if(jumpTimerIntruz!==0)
		    {
		    	if(intruz.randomMove=='intruzLeft') intruz.randomMove='intruzRight';
		    	else if(intruz.randomMove=='intruzRight') intruz.randomMove='intruzLeft';
			}
			//console.log(intruz.body.blocked.left);
		});
		

	    toolsGame.mainElements.player.obj.body.velocity.x = 0;
		if(!levelFile.blockedKeys) // zmiana levelu - blokowanie klawiszy
		{
		    if (cursors.left.isDown)
		    {

		        toolsGame.mainElements.player.obj.body.velocity.x = -200;
		       // console.log(game.camera.x);
		        //if() bg.cameraOffset.x+=1;

		        if (facing != 'left')
		        {
		            toolsGame.mainElements.player.obj.animations.play('left');
		            facing = 'left';
		        }

		    }
		    else if (cursors.right.isDown)
		    {
		        toolsGame.mainElements.player.obj.body.velocity.x = 200;
		        //console.log(game.camera.x);
		        //bg.cameraOffset.x-=1;

		        if (facing != 'right')
		        {
		            toolsGame.mainElements.player.obj.animations.play('right');
		            facing = 'right';
		        }
		    }
		    else
		    {
		        if (facing != 'idle')
		        {
		            toolsGame.mainElements.player.obj.animations.stop();

		            if (facing == 'left')
		            {
		                toolsGame.mainElements.player.obj.frame = 0;
		            }
		            else
		            {
		                toolsGame.mainElements.player.obj.frame = 4;
		            }

		            facing = 'idle';
		        }
		    }
		}
		else
		{
			toolsGame.mainElements.player.obj.frame = 4;
		}

		// camera and backing to other part screen
		//console.log(game.camera.x);
		// game.camera.follow();
		// game.camera.x+=10;

		/* aniamacja kladki itp */

		/*
		game.physics.arcade.collide(kladki, layer);
		//console.log(kladki.children[0].body.blocked.right);

		for (var i = 0, len = kladki.children.length; i < len; i++) {

			if(kladki.children[i].body.blocked.right) {
				kladki.children[i].direction="left";
			}
			else if(kladki.children[i].body.blocked.left) {
				kladki.children[i].direction="right";
			}

			if(kladki.children[i].direction=="right")
			{
				kladki.children[i].body.velocity.x = 100;
			}
			else
			{
				kladki.children[i].body.velocity.x = -100;
			}
			kladki.children[i].isUp=false;
		}
		*/
	
		game.physics.arcade.collide(toolsGame.mainElements.kladki.poziom.objects, layer);
		game.physics.arcade.overlap(toolsGame.mainElements.kladki.poziom.objects, layer, function(kladka,lay){
			if(kladka.body.blocked.right) {
				kladka.direction="left";
			}
			else if(kladka.body.blocked.left) {
				kladka.direction="right";
			}

			if(kladka.direction=="right")
			{
				kladka.body.velocity.x = 100;
			}
			else
			{
				kladka.body.velocity.x = -100;
			}
			kladka.isUp=false;
		},null, this);

		toolsGame.mainElements.player.obj.body.allowGravity = true;
		game.physics.arcade.collide(toolsGame.mainElements.kladki.poziom.objects, toolsGame.mainElements.player.obj, function(p,kladka){
			if(toolsGame.mainElements.player.obj.body.overlapY>0)
			{
				toolsGame.mainElements.player.obj.body.allowGravity = true;
				toolsGame.mainElements.player.obj.body.bounce.y = 0;	
				kladka.isUp=true;
				toolsGame.mainElements.player.obj.body.velocity.x += kladka.body.velocity.x;
				toolsGame.mainElements.player.obj.body.allowGravity = false;
				//console.log(toolsGame.mainElements.player.obj.body.allowGravity);
				clearTimeout(toolsGame.mainElements.kladki.kladkaPlayerBounceReset);
				toolsGame.mainElements.kladki.kladkaPlayerBounceReset=setTimeout(function(){
					toolsGame.mainElements.player.obj.body.bounce.y = 0.3;
				},200);
				//console.log(toolsGame.mainElements.player.obj.body.bounce.y + " / " + toolsGame.mainElements.player.obj.body.overlapY);
			}
			
		}, null, this);
		
		game.physics.arcade.collide(toolsGame.mainElements.kladki.poziom.objects, toolsGame.mainElements.intruzi.objects, function(kladka,intruz){
			//intruz.body.velocity.x += kladka.body.velocity.x;
		}, null, this);
		

		//console.log(toolsGame.mainElements.player.obj.body.bounce.y + " / " + toolsGame.mainElements.player.obj.body.overlapY);
		//console.log(toolsGame.mainElements.player.obj.body.blocked.down);
		/* end aniamacja kladki itp */


		game.physics.arcade.collide(toolsGame.mainElements.kladki.pion.objects, toolsGame.mainElements.kladki.poziom.objects);
		game.physics.arcade.collide(toolsGame.mainElements.kladki.pion.objects, toolsGame.mainElements.intruzi.objects);
		game.physics.arcade.collide(toolsGame.mainElements.kladki.pion.objects, layer, function(kladka,lay){
				kladka.body.velocity.y = -200;
				//console.log("w gore: " + kladka.y);
		}, null, this);
		game.physics.arcade.overlap(toolsGame.mainElements.kladki.pion.objects, layer, function(kladka,lay){
			//console.log("y: " + kladka.y);
			kladka.isUp=false;
		}, null, this);

		game.physics.arcade.collide(toolsGame.mainElements.kladki.pion.objects, toolsGame.mainElements.player.obj, function(p,kladka){
			if(toolsGame.mainElements.player.obj.body.overlapY>0)
			{
				toolsGame.mainElements.player.obj.body.bounce.y = 0;	
				kladka.isUp=true;
				//toolsGame.mainElements.player.obj.body.allowGravity = false;
				//console.log(toolsGame.mainElements.player.obj.body.allowGravity);

				kladka.body.velocity.y = 200;
				//console.log("w dol: " + kladka.y);

				setTimeout(function(){
					kladka.body.velocity.y = 0;
				},1000);

				clearTimeout(toolsGame.mainElements.kladki.kladkaPlayerBounceReset);
				toolsGame.mainElements.kladki.kladkaPlayerBounceReset=setTimeout(function(){
					toolsGame.mainElements.player.obj.body.bounce.y = 0.3;
				},200);
				//console.log(toolsGame.mainElements.player.obj.body.bounce.y + " / " + toolsGame.mainElements.player.obj.body.overlapY);
				//console.log(kladka.body.orginalY);
			}
			
		}, null, this);


		/* teleporter postaci
		console.log(toolsGame.mainElements.player.obj.body.x + " : " + toolsGame.mainElements.player.obj.body.y);
		if(toolsGame.mainElements.player.obj.body.x>1200) {
			//game.camera.follow(false);
			//game.camera.follow(toolsGame.mainElements.intruzi.objects.children[0]);
			toolsGame.mainElements.player.obj.body.x=100;
			toolsGame.mainElements.player.obj.body.y=100;
			//game.camera.follow(toolsGame.mainElements.player.obj);
			//game.camera.follow(toolsGame.mainElements.player.obj, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);

		}
		/* end teleporter postaci */





	    //toolsGame.mainElements.intruzi.objects.children
	    //(toolsGame.mainElements.intruzi.objects.children[0].indexOf("intruzStop") !== -1)
	    //console.log(toolsGame.mainElements.player.obj.body.onFloor());
	    if (
	    	jumpButton.isDown && 
	    	(toolsGame.mainElements.player.obj.body.onFloor() || inArrayObject('intruzi',toolsGame.mainElements.intruzi.objects.children,'intruzStop') || inArrayObject('kladki',toolsGame.mainElements.kladki.poziom.objects.children,true) || inArrayObject('kladki',toolsGame.mainElements.kladki.pion.objects.children,true)) && 
	    	game.time.now > toolsGame.mainElements.player.jumpTimer
	    )
	    {
	    	if(!levelFile.blockedKeys)
	    	{
		        toolsGame.mainElements.player.obj.body.velocity.y = -430;
		        toolsGame.mainElements.player.jumpTimer = game.time.now + 430;
		    }
	    }

	    if(jumpButton.isDown)
	    { 
	    	if (facing == 'right') toolsGame.mainElements.player.obj.frame = 9;
	    	else if (facing == 'left') toolsGame.mainElements.player.obj.frame = 8;
	    }

		// shot bullet whit gun 
		toolsGame.mainElements.player.gun.shot(toolsGame.mainElements.player);

		// visual gun
		toolsGame.mainElements.player.gun.visualGun(toolsGame.mainElements.player);

		// visual fog
		if(oFog)
		{
	    	if(oFog.x>=-2500) oFog.x=-3000;
	    	else oFog.x += oFog.speed;
	    	//console.log(oFog.x);
	    }

		//console.log(bg.position.x);

		// parallaxa backgroundu
		if(levelFile.backgroundParallax)
		{
			bg.cameraOffset.x=-game.camera.x/15;	
		}


				
		toolsGame.text.show(false,(toolsGame.windows.boxMenu.obj)?3*tileSize:tileSize,(toolsGame.windows.boxMenu.obj)?7*tileSize:5*tileSize,1,("level " + levelFile.activeIdLevel + "\n" + 'Timer: ' + timerTotal + "\n" + timer.duration.toFixed(0) + "\n" + "bullets: " + toolsGame.mainElements.player.countBullets + "\n" + "FPS: " + fpsTest), '400 12px Arial' ,'#000000',true,'infogame');	

	}
	preloaderAnimation();
	
 
};

/*
var gofull=function() {
    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }
}
*/

var endGame=function() {
	if(playGame.main) {
		game.world.removeAll();
		timer.destroy();
		playGame.main=false;
		create();
	}
	else
	{
		//navigator.app.exitApp();
	}
};
var render=function() {

    //game.debug.text(game.time.physicsElapsed, 32, 32);
    //game.debug.bodyInfo(toolsGame.mainElements.player.obj, 16, 24);
   	//if(toolsGame.mainElements.intruzi.objects.children[0]) game.debug.body(toolsGame.mainElements.intruzi.objects.children[0]);
    //if(toolsGame.mainElements.intruzi.objects.children[0]) game.debug.bodyInfo(toolsGame.mainElements.intruzi.objects.children[0], 16, 24);
	//console.log("x-game.load.onLoadStart");

	
};


var game = new Phaser.Game(800, 450, Phaser.CANVAS, 'game-content', { preload: preload, create: create, update: update, render: render });


jQuery(window).on("error", function(evt) {
    console.log("jQuery error event:", evt);
    var e = evt.originalEvent; // get the javascript event
    console.log("original event:", e);
    if (e.message) { 
        alert("Error:\n\t" + e.message + "\nLine:\n\t" + e.lineno + "\nFile:\n\t" + e.filename);
    } else {
        alert("Error:\n\t" + e.type + "\nElement:\n\t" + (e.srcElement || e.target));
    }
});
