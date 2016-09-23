var db=openDatabase('studentKu',"1.0","学社信息","200*1024"),
	ID=0;
//初始化函数
function init22222(){
	var addBtn=document.getElementById('addBtn');
	addBtn.addEventListener('click',saveData,false);
	loadTable();
	getData();
	/*db.transaction(function(tx){//删除表
		tx.executeSql('drop table address',[],success,error);
	})*/

}//end init22222();

//获取输入信息并添加到表中
function saveData(){
	var user=document.nameForm.user_name.value;
		mobile=document.nameForm.mobile_name.value;
		company=document.nameForm.company_name.value;
		ID++;
	var curTime=new Date().getTime();//new Date()*1;
		if(user==""||mobile==""||company==""){
			alert('请添加完整信息');
			return false;
		}
		db.transaction(function(tx){//添加数据
			tx.executeSql(
				'insert into address(name,mobile,company,Time) values(?,?,?,?)',
				[user,mobile,company,curTime],
				success,
				error
				);
		});
		//getData();
}//end saveData();

//查询(获取)数据渲染
function getData(){
	db.transaction(function(tx){
		tx.executeSql(
			"select * from address",
			[],		
			function(tx,result){//成功时回调
				//console.log(result.rows.length);
				if(result.rows.length>0){			
					//console.log(result.rows);
					rendpage(result.rows);
				}else{
					document.getElementById('list').innerHTML='数据库中无数据，请添加数据';
				}
			}
		);
	})
}//end getData()

//查询成功时的函数
function rendpage(data){
	//console.log(data);
	var str="<table><thead><tr><th>ID</th><th>姓名</th><th>电话</th><th>公司</th><th>时间</th><th>操作</th></tr><tbody>";
	for(var i=0,len=data.length;i<len;i++){
		str+="<tr><td>"+(i+1)+"</td><td>"+data.item(i).name+"</td><td>"+data.item(i).mobile+"</td><td>"+data.item(i).company+"</td><td>"+data.item(i).Time+"</td><td><button onclick='del(this)'>删除</button></td></tr>";
	}
	str+="</tbody></table>";
	document.getElementById('list').innerHTML=str;
}//end rendpage();

//点击删除删除对应行数据
function del(_this){
	var num=_this.parentNode.parentNode.children[1].innerHTML;
	alert(num);
	db.transaction(function(tx){
		tx.executeSql(
			"delete from address where name=?",
			[num],
			success,
			error
		);
	})
	//getData();//因上有success所以可以写到执行成功时的函数中
}//end del()

//创建数据表
function loadTable(){
	db.transaction(function(tx){
		tx.executeSql(
			'create table if not exists address(name TEXT,mobile INTEGER,company TEXT,Time INTEGER)',[])
	})
}//end loadTable()

//执行成功
function success(){
	alert('操作成功！');
	getData();
}
//执行失败
function error(tx,e){
	alert('操作失败！'+e.message);
}
init22222();