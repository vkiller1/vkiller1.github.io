g_l=[];
g_l.MONTHS=["Janaury","February","March","April","May","June","July","August","September","October","November","December"];
g_l.DAYS_3=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
g_l.MONTH_FWD="Move a month forward";
g_l.MONTH_BCK="Move a month backward";
g_l.YEAR_FWD="Move a year forward";
g_l.YEAR_BCK="Move a year backward";
g_l.CLOSE="Close the calendar";
g_l.ERROR_2=g_l.ERROR_1="Date object invalid!";
g_l.ERROR_4=g_l.ERROR_3="Target invalid!";
g_jsDatePickImagePath="img/";
g_jsDatePickDirectionality="ltr";
g_arrayOfUsedJsDatePickCalsGlobalNumbers=[];
g_arrayOfUsedJsDatePickCals=[];
g_currentDateObject={};
g_currentDateObject.dateObject=new Date();
g_currentDateObject.day=g_currentDateObject.dateObject.getDate();
g_currentDateObject.month=g_currentDateObject.dateObject.getMonth()+1;
g_currentDateObject.year=g_currentDateObject.dateObject.getFullYear();
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};
String.prototype.ltrim=function(){return this.replace(/^\s+/,"")};
String.prototype.rtrim=function(){return this.replace(/\s+$/,"")};
String.prototype.strpad=function(){return(!isNaN(this)&&this.toString().length==1)?"0"+this:this};
JsDatePick=function(a){if(document.all){
	this.isie=true;
	this.iever=JsDatePick.getInternetExplorerVersion()
	}else{
		this.isie=false
	}
	this.oConfiguration={};
	this.oCurrentDay=g_currentDateObject;
	this.monthsTextualRepresentation=g_l.MONTHS;
	this.lastPostedDay=null;
	this.initialZIndex=2;
	this.globalNumber=this.getUnUsedGlobalNumber();
	g_arrayOfUsedJsDatePickCals[this.globalNumber]=this;
	this.setConfiguration(a);
	this.makeCalendar()};
	JsDatePick.getCalInstanceById=function(a){
		return g_arrayOfUsedJsDatePickCals[parseInt(a,10)]
		};
	JsDatePick.getInternetExplorerVersion=function(){
		var c=-1,a,b;
		if(navigator.appName=="Microsoft Internet Explorer"){
			a=navigator.userAgent;
			b=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
			if(b.exec(a)!=null){
				c=parseFloat(RegExp.$1)}return c
			}
	};
	JsDatePick.prototype.setC=function(a,b){
		if(this.isie&&this.iever>7){
			$(a).attr("class",b)
		}else{
			a.className=b
			}
	};
	JsDatePick.prototype.getUnUsedGlobalNumber=function(){
		var a=Math.floor(Math.random()*1000);
		while(!this.isUnique_GlobalNumber(a)){
			a=Math.floor(Math.random()*1000)
		}
		return a
	};
	JsDatePick.prototype.isUnique_GlobalNumber=function(b){
		var a;
		for(a=0;a<g_arrayOfUsedJsDatePickCalsGlobalNumbers.length;a++){
			if(g_arrayOfUsedJsDatePickCalsGlobalNumbers[a]==b){
				return false
				}
			}return true
	};
	JsDatePick.prototype.addOnSelectedDelegate=function(a){
		if(typeof(a)=="function"){
			this.addonSelectedDelegate=a
		}
		return false
	};
	JsDatePick.prototype.setOnSelectedDelegate=function(a){
		if(typeof(a)=="function"){
			this.onSelectedDelegate=a;
			return true
		}
		return false
	};
	JsDatePick.prototype.executeOnSelectedDelegateIfExists=function(){
		if(typeof(this.onSelectedDelegate)=="function"){
			this.onSelectedDelegate()
		}if(typeof(this.addonSelectedDelegate)=="function"){
			this.addonSelectedDelegate()
			}
		};
	JsDatePick.prototype.setRepopulationDelegate=function(a){
		if(typeof(a)=="function"){
			this.repopulationDelegate=a;
			return true
		}return false
	};
	JsDatePick.prototype.setConfiguration=function(a){
		this.oConfiguration.isStripped=(a.isStripped!=null)?a.isStripped:false;
		this.oConfiguration.useMode=(a.useMode!=null)?a.useMode:1;
		this.oConfiguration.selectedDate=(a.selectedDate!=null)?a.selectedDate:null;
		this.oConfiguration.target=(a.target!=null)?a.target:null;
		this.oConfiguration.yearsRange=(a.yearsRange!=null)?a.yearsRange:[1971,2100];
		this.oConfiguration.limitToToday=(a.limitToToday!=null)?a.limitToToday:false;
		this.oConfiguration.field=(a.field!=null)?a.field:false;
		this.oConfiguration.cellColorScheme=(a.cellColorScheme!=null)?a.cellColorScheme:"ocean_blue";
		this.oConfiguration.dateFormat=(a.dateFormat!=null)?a.dateFormat:"%m-%d-%Y";
		this.oConfiguration.imgPath=(g_jsDatePickImagePath.length!=null)?g_jsDatePickImagePath:"img/";
		this.oConfiguration.weekStartDay=(a.weekStartDay!=null)?a.weekStartDay:1;
		this.selectedDayObject={};this.flag_DayMarkedBeforeRepopulation=false;
		this.flag_aDayWasSelected=false;this.lastMarkedDayObject=null;
		if(!this.oConfiguration.selectedDate){
			this.currentYear=this.oCurrentDay.year;
			this.currentMonth=this.oCurrentDay.month;
			this.currentDay=this.oCurrentDay.day
			}
		};
	JsDatePick.prototype.resizeCalendar=function(){
		this.leftWallStrechedElement.style.height="0px";
		this.rightWallStrechedElement.style.height="0px";
		var a=this.JsDatePickBox.offsetHeight,
		b=a-16;
		if(b<0){
			return
		}
		this.leftWallStrechedElement.style.height=b+"px";
		this.rightWallStrechedElement.style.height=b+"px";
		return true
	};
	JsDatePick.prototype.closeCalendar=function(){
		this.JsDatePickBox.style.display="none";
		document.onclick=function(){}
	};
	JsDatePick.prototype.populateFieldWithSelectedDate=function(){
		$("#"+this.oConfiguration.target).val(this.getSelectedDayFormatted());
		if(this.lastPickedDateObject){
			delete (this.lastPickedDateObject)
			}
		this.lastPickedDateObject={};
		this.lastPickedDateObject.day=this.selectedDayObject.day;
		this.lastPickedDateObject.month=this.selectedDayObject.month;
		this.lastPickedDateObject.year=this.selectedDayObject.year;
		this.closeCalendar()
	};
	JsDatePick.prototype.makeCalendar=function(){
		var j=document,e,a,b,k,g,h,f,o,i,m,n,l,c;
		e=j.createElement("div");
		a=j.createElement("div");
		b=j.createElement("div");
		this.setC(e,"JsDatePickBox");
		this.setC(a,"clearfix");
		this.setC(b,"jsDatePickCloseButton");
		b.setAttribute("globalNumber",this.globalNumber);
		b.onmouseover=function(){
			var d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
			d.setTooltipText(g_l.CLOSE);
			d.setC(this,"jsDatePickCloseButtonOver")};
			b.onmouseout=function(){
				var d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
				d.setTooltipText("");
				d.setC(this,"jsDatePickCloseButton")
			};
			b.onmousedown=function(){
				var d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
				d.setTooltipText(g_l.CLOSE);
				d.setC(this,"jsDatePickCloseButtonDown")};
				b.onmouseup=function(){
					var d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
					d.setTooltipText("");
					d.setC(this,"jsDatePickCloseButton");
					d.closeCalendar()
				};
				this.JsDatePickBox=e;
				k=j.createElement("div");
				g=j.createElement("div");
				h=j.createElement("div");
				f=j.createElement("div");
				this.setC(h,"topWall");
				this.setC(f,"bottomWall");
				if(this.isie&&this.iever==6){
					f.style.bottom="-2px"
				}
				o=j.createElement("div");
				i=j.createElement("div");
				m=j.createElement("div");
				this.setC(o,"leftTopCorner");
				this.setC(i,"leftBottomCorner");
				this.setC(m,"leftWall");
				this.leftWallStrechedElement=m;
				this.leftWall=k;
				this.rightWall=g;
				k.appendChild(o);
				k.appendChild(m);
				k.appendChild(i);
				o=j.createElement("div");
				i=j.createElement("div");
				m=j.createElement("div");
				this.setC(o,"rightTopCorner");
				this.setC(i,"rightBottomCorner");
				this.setC(m,"rightWall");
				this.rightWallStrechedElement=m;g.appendChild(o);
				g.appendChild(m);
				g.appendChild(i);
				if(this.oConfiguration.isStripped){
					this.setC(k,"hiddenBoxLeftWall");
					this.setC(g,"hiddenBoxRightWall")
				}else{
					this.setC(k,"boxLeftWall");
					this.setC(g,"boxRightWall")
				}
				e.appendChild(k);
				e.appendChild(this.getDOMCalendarStripped());
				e.appendChild(g);
				e.appendChild(a);
				if(!this.oConfiguration.isStripped){
					e.appendChild(b);
					e.appendChild(h);
					e.appendChild(f)
				}if(this.oConfiguration.useMode==2){
					if(this.oConfiguration.target!=false){
						if(typeof($("#"+this.oConfiguration.target))!=null){
							n=document.getElementById(this.oConfiguration.target);
							l=document.createElement("span");
							n.parentNode.replaceChild(l,n);
							l.appendChild(n);
							n.setAttribute("globalNumber",this.globalNumber);
							n.onclick=function(){
								JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")).showCalendar()
							};
							n.onfocus=function(){
								JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")).showCalendar()
							};
							l.style.position="relative";
							this.initialZIndex++;
							e.style.zIndex=this.initialZIndex.toString();
							e.style.position="absolute";
							e.style.top="18px";
							e.style.left="0px";
							e.style.display="none";
							l.appendChild(e);
							c=new Function("g_arrayOfUsedJsDatePickCals["+this.globalNumber+"].populateFieldWithSelectedDate();");
							this.setOnSelectedDelegate(c)
						}else{
							alert(g_l.ERROR_3)
							}
					}
				}else{   //
					if(this.oConfiguration.target!=null){
						$("#"+this.oConfiguration.target).append(e);
						$("#"+this.oConfiguration.target).css("position","relative");
						e.style.position="absolute";
						e.style.top="0px";
						e.style.left="0px";
						this.resizeCalendar();
						this.executePopulationDelegateIfExists()
					}else{
						alert(g_l.ERROR_4)
						}
					}
					};
					JsDatePick.prototype.determineFieldDate=function(){
						var b,c,e,g,l,d,a,h,k,f=false,
						j=false;
						if(this.lastPickedDateObject){
							this.setSelectedDay({
								year:parseInt(this.lastPickedDateObject.year),
								month:parseInt(this.lastPickedDateObject.month,10),
								day:parseInt(this.lastPickedDateObject.day,10)
								})
						}else{
							b=$("#"+this.oConfiguration.target);
							if(jQuery.trim(b.val()).length==0){
								this.unsetSelection();
								if(typeof(this.oConfiguration.selectedDate)=="object"&&this.oConfiguration.selectedDate){
									this.setSelectedDay({
										year:parseInt(this.oConfiguration.selectedDate.year),
										month:parseInt(this.oConfiguration.selectedDate.month,10),
										day:parseInt(this.oConfiguration.selectedDate.day,10)
									})
								}
							}else{
								if(jQuery.trim(b.val()).length>5){
									c=this.senseDivider(this.oConfiguration.dateFormat);
									e=this.oConfiguration.dateFormat;
									g=jQuery.trim(b.val()).split(c);l=e.trim().split(c);d=a=h=k=0;
									for(d=0;d<l.length;d++){
										switch(l[d]){
										case"%d":case"%j":a=d;
										break;
										case"%m":case"%n":k=d;
										break;
										case"%M":k=d;f=true;
										break;
										case"%F":k=d;
										j=true;
										break;
										case"%Y":case"%y":h=d
										}
									}if(f){
										for(d=0;d<12;d++){
											if(g_l.MONTHS[d].substr(0,3).toUpperCase()==g[k].toUpperCase()){
												k=d+1;
												break
											}
										}
									}else{
										if(j){
											for(d=0;d<12;d++){
												if(g_l.MONTHS[d].toLowerCase()==g[k].toLowerCase()){
													k=d+1;
													break
												}
											}
										}else{
											k=parseInt(g[k],10)
										}
									}
									this.setSelectedDay({
										year:parseInt(g[h],10),
										month:k,
										day:parseInt(g[a],10)})
								}else{
									this.unsetSelection();
									return
									}
								}
							}
					};
					JsDatePick.prototype.senseDivider=function(a){
						return a.replace("%d","").replace("%j","").replace("%m","").replace("%M","").replace("%n","").replace("%F","").replace("%Y","").replace("%y","").substr(0,1)
					};
					JsDatePick.prototype.showCalendar=function(){
						if(this.JsDatePickBox.style.display=="none"){
							this.determineFieldDate();
							this.JsDatePickBox.style.display="block";
							this.resizeCalendar();
							this.executePopulationDelegateIfExists();
							$(this.JsDatePickBox).mouseover(function(){
								document.onclick=function(){}
							});
							$(this.JsDatePickBox).attr("globalCalNumber",this.globalNumber);
							$(this.JsDatePickBox).mouseout(function(){
								document.onclick=new Function("g_arrayOfUsedJsDatePickCals["+this.getAttribute("globalCalNumber")+"].closeCalendar();")
							})
						}else{
							return
							}
					};
					JsDatePick.prototype.isAvailable=function(c,a,b){
						if(c>this.oCurrentDay.year){
							return false
						}
						if(a>this.oCurrentDay.month&&c==this.oCurrentDay.year){
							return false
						}
						if(b>this.oCurrentDay.day&&a==this.oCurrentDay.month&&c==this.oCurrentDay.year){
							return false
						}return true
						};
					JsDatePick.prototype.getDOMCalendarStripped=function(){
						var h=document,e,i,b,a,f,c,g;e=h.createElement("div");
						if(this.oConfiguration.isStripped){
							this.setC(e,"boxMainStripped")
						}else{
							this.setC(e,"boxMain")
						}
						this.boxMain=e;
						i=h.createElement("div");
						b=h.createElement("div");
						a=h.createElement("div");
						f=h.createElement("div");
						c=h.createElement("div");
						g=h.createElement("div");
						this.setC(b,"clearfix");
						this.setC(g,"clearfix");
						this.setC(i,"boxMainInner");
						this.setC(a,"boxMainCellsContainer");
						this.setC(f,"tooltip");
						this.setC(c,"weekDaysRow");
						this.tooltip=f;
						e.appendChild(i);
						this.controlsBar=this.getDOMControlBar();
						this.makeDOMWeekDays(c);
						i.appendChild(this.controlsBar);
						i.appendChild(b);
						i.appendChild(f);
						i.appendChild(c);
						i.appendChild(a);
						i.appendChild(g);
						this.boxMainCellsContainer=a;
						this.populateMainBox(a);
						return e
					};
					JsDatePick.prototype.makeDOMWeekDays=function(a){
						var c=0,g=document,f=g_l.DAYS_3,e,b;
						for(c=this.oConfiguration.weekStartDay;c<7;c++){
							b=g.createElement("div");
							e=g.createTextNode(f[c]);
							this.setC(b,"weekDay");
							b.appendChild(e);
							a.appendChild(b)
						}if(this.oConfiguration.weekStartDay>0){
							for(c=0;c<this.oConfiguration.weekStartDay;c++){
								b=g.createElement("div");
								e=g.createTextNode(f[c]);
								this.setC(b,"weekDay");
								b.appendChild(e);
								a.appendChild(b)
							}
						}
						b.style.marginRight="0px"
					};
					JsDatePick.prototype.repopulateMainBox=function(){
						while(this.boxMainCellsContainer.firstChild){
							this.boxMainCellsContainer.removeChild(this.boxMainCellsContainer.firstChild)
						}
						this.populateMainBox(this.boxMainCellsContainer);
						this.resizeCalendar();
						this.executePopulationDelegateIfExists()
					};
					JsDatePick.prototype.executePopulationDelegateIfExists=function(){
						if(typeof(this.repopulationDelegate)=="function"){
							this.repopulationDelegate()
						}
					};
					JsDatePick.prototype.populateMainBox=function(h){
						var f=document,g,l,c=1,k=false,n=this.currentMonth-1,j,a,m,e,b;
						j=new Date(this.currentYear,n,1,1,0,0);
						a=j.getTime();
						this.flag_DayMarkedBeforeRepopulation=false;
						this.setControlBarText(this.monthsTextualRepresentation[n]+", "+this.currentYear);
						m=parseInt(j.getDay())-this.oConfiguration.weekStartDay;
						if(m<0){
							m=m+7
						}e=0;
						for(e=0;e<m;e++){
							g=f.createElement("div");
							this.setC(g,"skipDay");
							h.appendChild(g);
							if(c==7){
								c=1
							}else{
								c++
							}
						}while(j.getMonth()==n){
							k=false;
							g=f.createElement("div");
							if(this.lastPostedDay){
								if(this.lastPostedDay==j.getDate()){
									l=parseInt(this.lastPostedDay,10)+1
								}else{
									l=f.createTextNode(j.getDate())
									}
								}else{
									l=f.createTextNode(j.getDate())
								}
								g.appendChild(l);
								h.appendChild(g);
								g.setAttribute("globalNumber",this.globalNumber);
								if(c==7){
									if(g_jsDatePickDirectionality=="ltr"){
										g.style.marginRight="0px"
									}else{
										g.style.marginLeft="0px"
									}
								}
								if(this.isToday(j)){
									g.setAttribute("isToday",1)
								}
								if(this.oConfiguration.limitToToday){
									if(!this.isAvailable(this.currentYear,this.currentMonth,parseInt(j.getDate()))){
										k=true;
										g.setAttribute("isJsDatePickDisabled",1)
									}
								}g.onmouseover=function(){
									var d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),i;
									i=d.getCurrentColorScheme();
									if(parseInt(this.getAttribute("isSelected"))==1){
										return
									}
									if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
										return
									}
									if(parseInt(this.getAttribute("isToday"))==1){
										d.setC(this,"dayOverToday");
										this.style.background="url("+d.oConfiguration.imgPath+i+"_dayOver.gif) left top no-repeat"
									}else{
										d.setC(this,"dayOver");
										this.style.background="url("+d.oConfiguration.imgPath+i+"_dayOver.gif) left top no-repeat"
									}
								};
								g.onmouseout=function(){
									var d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),i;
									i=d.getCurrentColorScheme();
									if(parseInt(this.getAttribute("isSelected"))==1){
										return
									}
									if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
										return
									}
									if(parseInt(this.getAttribute("isToday"))==1){
										d.setC(this,"dayNormalToday");
										this.style.background="url("+d.oConfiguration.imgPath+i+"_dayNormal.gif) left top no-repeat"
									}else{
										d.setC(this,"dayNormal");
										this.style.background="url("+d.oConfiguration.imgPath+i+"_dayNormal.gif) left top no-repeat"
									}
								};
								g.onmousedown=function(){
									var d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),i;
									i=d.getCurrentColorScheme();
									if(parseInt(this.getAttribute("isSelected"))==1){
										return
									}
									if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
										return
									}
									if(parseInt(this.getAttribute("isToday"))==1){
										d.setC(this,"dayDownToday");
										this.style.background="url("+d.oConfiguration.imgPath+i+"_dayDown.gif) left top no-repeat"
									}else{
										d.setC(this,"dayDown");
										this.style.background="url("+d.oConfiguration.imgPath+i+"_dayDown.gif) left top no-repeat"
									}
								};
								g.onmouseup=function(){
									var d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),i;
									i=d.getCurrentColorScheme();
									if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
										return
									}
									if(parseInt(this.getAttribute("isToday"))==1){
										d.setC(this,"dayNormalToday");
										this.style.background="url("+d.oConfiguration.imgPath+i+"_dayNormal.gif) left top no-repeat"
									}else{
										d.setC(this,"dayNormal");
										this.style.background="url("+d.oConfiguration.imgPath+i+"_dayNormal.gif) left top no-repeat"
									}
									d.setDaySelection(this);
									d.executeOnSelectedDelegateIfExists()
								};
								if(this.isSelectedDay(j.getDate())){
									g.setAttribute("isSelected",1);
									this.flag_DayMarkedBeforeRepopulation=true;
									this.lastMarkedDayObject=g;
									if(parseInt(g.getAttribute("isToday"))==1){
										this.setC(g,"dayDownToday");
										g.style.background="url("+this.oConfiguration.imgPath+this.oConfiguration.cellColorScheme+"_dayDown.gif) left top no-repeat"
									}
									else{
										this.setC(g,"dayDown");
										g.style.background="url("+this.oConfiguration.imgPath+this.oConfiguration.cellColorScheme+"_dayDown.gif) left top no-repeat"
									}
								}else{
									b=this.getCurrentColorScheme();
									if(parseInt(g.getAttribute("isToday"))==1){
										if(k){
											this.setC(g,"dayDisabled");
											g.style.background="url("+this.oConfiguration.imgPath+this.oConfiguration.cellColorScheme+"_dayNormal.gif) left top no-repeat"
										}else{
											this.setC(g,"dayNormalToday");g.style.background="url("+this.oConfiguration.imgPath+this.oConfiguration.cellColorScheme+"_dayNormal.gif) left top no-repeat"
										}
									}else{if(k){this.setC(g,"dayDisabled");g.style.background="url("+this.oConfiguration.imgPath+this.oConfiguration.cellColorScheme+"_dayNormal.gif) left top no-repeat"}else{this.setC(g,"dayNormal");g.style.background="url("+this.oConfiguration.imgPath+this.oConfiguration.cellColorScheme+"_dayNormal.gif) left top no-repeat"}}}if(c==7){c=1}else{c++}a+=86400000;j.setTime(a)}this.lastPostedDay=null;return h};JsDatePick.prototype.unsetSelection=function(){this.flag_aDayWasSelected=false;this.selectedDayObject={};this.repopulateMainBox()};JsDatePick.prototype.setSelectedDay=function(a){this.flag_aDayWasSelected=true;this.selectedDayObject.day=parseInt(a.day,10);this.selectedDayObject.month=parseInt(a.month,10);this.selectedDayObject.year=parseInt(a.year);this.currentMonth=a.month;this.currentYear=a.year;this.repopulateMainBox()};JsDatePick.prototype.isSelectedDay=function(a){if(this.flag_aDayWasSelected){if(parseInt(a)==this.selectedDayObject.day&&this.currentMonth==this.selectedDayObject.month&&this.currentYear==this.selectedDayObject.year){return true}else{return false}}return false};JsDatePick.prototype.getSelectedDay=function(){if(this.flag_aDayWasSelected){return this.selectedDayObject}else{return false}};JsDatePick.prototype.getSelectedDayFormatted=function(){if(this.flag_aDayWasSelected){var a=this.oConfiguration.dateFormat;a=a.replace("%d",this.selectedDayObject.day.toString().strpad());a=a.replace("%j",this.selectedDayObject.day);a=a.replace("%m",this.selectedDayObject.month.toString().strpad());a=a.replace("%M",g_l.MONTHS[this.selectedDayObject.month-1].substr(0,3).toUpperCase());a=a.replace("%n",this.selectedDayObject.month);a=a.replace("%F",g_l.MONTHS[this.selectedDayObject.month-1]);a=a.replace("%Y",this.selectedDayObject.year);a=a.replace("%y",this.selectedDayObject.year.toString().substr(2,2));return a}else{return false}};JsDatePick.prototype.setDaySelection=function(a){var b=this.getCurrentColorScheme();if(this.flag_DayMarkedBeforeRepopulation){$(this.lastMarkedDayObject).attr("isSelected",0);if(parseInt(this.lastMarkedDayObject.getAttribute("isToday"))==1){this.setC(this.lastMarkedDayObject,"dayNormalToday");this.lastMarkedDayObject.style.background="url("+this.oConfiguration.imgPath+b+"_dayNormal.gif) left top no-repeat"}else{this.setC(this.lastMarkedDayObject,"dayNormal");this.lastMarkedDayObject.style.background="url("+this.oConfiguration.imgPath+b+"_dayNormal.gif) left top no-repeat"}}this.flag_aDayWasSelected=true;this.selectedDayObject.year=this.currentYear;this.selectedDayObject.month=this.currentMonth;this.selectedDayObject.day=parseInt(a.innerHTML);this.flag_DayMarkedBeforeRepopulation=true;this.lastMarkedDayObject=a;$(a).attr("isSelected",1);if(parseInt(a.getAttribute("isToday"))==1){this.setC(a,"dayDownToday");a.style.background="url("+this.oConfiguration.imgPath+b+"_dayDown.gif) left top no-repeat"}else{this.setC(a,"dayDown");a.style.background="url("+this.oConfiguration.imgPath+b+"_dayDown.gif) left top no-repeat"}};JsDatePick.prototype.isToday=function(a){var b=this.oCurrentDay.month-1;if(a.getDate()==this.oCurrentDay.day&&a.getMonth()==b&&a.getFullYear()==this.oCurrentDay.year){return true}return false};JsDatePick.prototype.setControlBarText=function(a){var b=document.createTextNode(a);$(this.controlsBarTextCell).empty();this.controlsBarTextCell.appendChild(b)};JsDatePick.prototype.setTooltipText=function(a){$(this.tooltip).empty();var b=document.createTextNode(a);this.tooltip.appendChild(b)};JsDatePick.prototype.moveForwardOneYear=function(){var a=this.currentYear+1;if(a<parseInt(this.oConfiguration.yearsRange[1])){this.currentYear++;this.repopulateMainBox();return true}else{return false}};JsDatePick.prototype.moveBackOneYear=function(){var a=this.currentYear-1;if(a>parseInt(this.oConfiguration.yearsRange[0])){this.currentYear--;this.repopulateMainBox();return true}else{return false}};JsDatePick.prototype.moveForwardOneMonth=function(){if(this.currentMonth<12){this.currentMonth++}else{if(this.moveForwardOneYear()){this.currentMonth=1}else{this.currentMonth=12}}this.repopulateMainBox()};JsDatePick.prototype.moveBackOneMonth=function(){if(this.currentMonth>1){this.currentMonth--}else{if(this.moveBackOneYear()){this.currentMonth=12}else{this.currentMonth=1}}this.repopulateMainBox()};JsDatePick.prototype.getCurrentColorScheme=function(){return this.oConfiguration.cellColorScheme};JsDatePick.prototype.getDOMControlBar=function(){var h=document,c,f,g,b,a,e;c=h.createElement("div");f=h.createElement("div");g=h.createElement("div");b=h.createElement("div");a=h.createElement("div");e=h.createElement("div");this.setC(c,"controlsBar");this.setC(f,"monthForwardButton");this.setC(g,"monthBackwardButton");this.setC(b,"yearForwardButton");this.setC(a,"yearBackwardButton");this.setC(e,"controlsBarText");$(c).attr("globalNumber",this.globalNumber);$(f).attr("globalNumber",this.globalNumber);$(g).attr("globalNumber",this.globalNumber);$(a).attr("globalNumber",this.globalNumber);$(b).attr("globalNumber",this.globalNumber);this.controlsBarTextCell=e;c.appendChild(f);c.appendChild(g);c.appendChild(b);c.appendChild(a);c.appendChild(e);f.onmouseover=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}d=this.parentNode;while(d.className!="controlsBar"){d=d.parentNode}i=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));i.setTooltipText(g_l.MONTH_FWD);i.setC(this,"monthForwardButtonOver")};f.onmouseout=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText("");d.setC(this,"monthForwardButton")};f.onmousedown=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}d=this.parentNode;while(d.className!="controlsBar"){d=d.parentNode}i=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));i.setTooltipText(g_l.MONTH_FWD);i.setC(this,"monthForwardButtonDown")};f.onmouseup=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText(g_l.MONTH_FWD);d.setC(this,"monthForwardButton");d.moveForwardOneMonth()};g.onmouseover=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText(g_l.MONTH_BCK);d.setC(this,"monthBackwardButtonOver")};g.onmouseout=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText("");d.setC(this,"monthBackwardButton")};g.onmousedown=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText(g_l.MONTH_BCK);d.setC(this,"monthBackwardButtonDown")};g.onmouseup=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText(g_l.MONTH_BCK);d.setC(this,"monthBackwardButton");d.moveBackOneMonth()};b.onmouseover=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText(g_l.YEAR_FWD);d.setC(this,"yearForwardButtonOver")};b.onmouseout=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText("");d.setC(this,"yearForwardButton")};b.onmousedown=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText(g_l.YEAR_FWD);d.setC(this,"yearForwardButtonDown")};b.onmouseup=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText(g_l.YEAR_FWD);d.setC(this,"yearForwardButton");d.moveForwardOneYear()};a.onmouseover=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText(g_l.YEAR_BCK);d.setC(this,"yearBackwardButtonOver")};a.onmouseout=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText("");d.setC(this,"yearBackwardButton")};a.onmousedown=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText(g_l.YEAR_BCK);d.setC(this,"yearBackwardButtonDown")};a.onmouseup=function(){var i,d;if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){return}i=this.parentNode;while(i.className!="controlsBar"){i=i.parentNode}d=JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));d.setTooltipText(g_l.YEAR_BCK);d.setC(this,"yearBackwardButton");d.moveBackOneYear()};return c};