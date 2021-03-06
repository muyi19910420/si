// JavaScript Document
            var canvasW = document.getElementById('RelaOfAPUser'); 
            var stage = new JTopo.Stage(canvasW); // 创建一个舞台对象
            var scene = new JTopo.Scene(stage); // 创建一个场景对象
            
			
			var ret=getHisTime();//获取选择的时间或此刻时间，函数在action.js里
			var startTime=ret.s;
			var endTime=ret.e;
			
			$.post("/classify/",
			    {"startTime":startTime,
				 "endTime":endTime,
				},function(data, status) {
					var obj = jQuery.parseJSON(data);
					var phoneUrl="/static/lib/img/phone.png"
					var apUrl="/static/lib/img/ap.png"
					var wNode=new Array();
					var wXLoc=0;
					var canvasLen=1400;
					for (var i=0;i<obj.wifi.length;i++){
						wNode[i] = new JTopo.Node(obj.wifi[i].name);    // 创建一个节点
						wXLoc+=canvasLen/obj.wifi.length;;
					    wNode[i].setLocation(wXLoc,100);    // 设置节点坐标  
					    wNode[i].setImage(apUrl);
						wNode[i].fontColor="black";     
						scene.add(wNode[i]); // 放入到场景中			
					}
					var uXLoc=0;
					var uNode=new Array();
					for (var i=0;i<obj.user.length;i++){
						uNode[i] = new JTopo.Node(obj.user[i].name);    // 创建一个节点
						uXLoc+= canvasLen/obj.user.length;
						uNode[i].setLocation(uXLoc,300);    // 设置节点坐标  
						uNode[i].setImage(phoneUrl);
						uNode[i].fontColor="black";     
						scene.add(uNode[i]); // 放入到场景中
						
						var linkAP=obj.user[i].linked.split(",");
						for(var j=0;j<linkAP.length;j++){
							var k=linkAP[j];
							var llink = new JTopo.Link(uNode[i], wNode[k-1]); // 增加连线
							llink.strokeColor="7,200,7";
						    scene.add(llink);
						 }
						
						  
						var  searchAP=obj.user[i].searched.split(",");
						for(var j=0;j<searchAP.length;j++){
							var k=searchAP[j];
							var slink = new JTopo.Link(uNode[i], wNode[k-1]); // 增加连线
							slink.strokeColor="225,204,0";
							scene.add(slink);
						 }
						}
					
				});