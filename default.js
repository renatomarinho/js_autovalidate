
window.onload = function (){
	
	Validation.Starting();
	
}

var Utils = {
		
	iError	: 0,
	iInput	: new Array(),	
		
	dgeID : function (e){
		return document.getElementById(e);
	},
	
	dgeTN : function (e){
		return document.getElementsByTagName(e);
	},
	
	InArray : function (value, arr){
		
		for(i=0;i<arr.length;i++){
			
			if(value.toLowerCase() == arr[i].toLowerCase())
				return true;
		
		}
		
		return false;
		
	},
	
	IndexSum : function (){
		Mode.iError++;
	},
		
	WithBorder : function (e){
		
		if (Utils.dgeID(e))
			Utils.dgeID(e).style.border = '1px solid red';
		
	},
	
	WithoutBorder : function (e){
		
		if (!Utils.InArray(e,Mode.iInput) && Utils.dgeID(e))
			Utils.dgeID(e).style.border = '1px solid #c0c0c0';
		
	}
		
};

var Validation = {
		
	/* 
	 * Method name availables
	 * Add the new methods here 
	 */	
	Modes : new Array('NotNull', 'Email'),
		
	Message : new Array(),
	
	/* Property of input vars */
	iId 	: '',
	iName 	: '',
	iValue	: '',
	
	Starting : function (){
	
		var f = Utils.dgeTN("form");
	
		for(l=0;l<f.length;l++)
			f[l].onsubmit = function(){ return Validation.Base(); };
		
	},
	
	Base : function (){
		
		Validation.CleanAll();
		
		var input = Utils.dgeTN("input");
		
		for (i=0;i<input.length;i++){
			
			if (input[i].getAttribute("type")=="text" && input[i].getAttribute("accept")) {
				
				Validation.iId 		= input[i].getAttribute("name");
				Validation.iName 	= input[i].getAttribute("title");
				Validation.iValue 	= input[i].value;
				
				accept = input[i].getAttribute("accept");
				accept = accept.split(',');
				
				for( v in accept){
					
					if ( Utils.InArray(accept[v], Validation.Modes)){
						
						Validation.SelectedOption(accept[v]);
						
					}
					
				}
				
			}
	  	}
	  	
	  	Validation.ShowMessages();
	  	
	  	return false;
	},
	
	ShowMessages : function (){
		
		for (i=0;i<Mode.iError;i++){	
		
			if (Validation.Message[i]){
				
				var ni = Utils.dgeID('Errors');
				var ndiv = document.createElement('div');
			 	ndiv.setAttribute('id','FormMessages');
			 	ndiv.innerHTML = '<font color="red">'+Validation.Message[i]+'</font>';
			 	ni.appendChild(ndiv);
			 	
			}
	 	
		}
		
		Mode.iError = 0;
	
	},
	
	SelectedOption : function (option){
		
		for (i in Validation.Modes ){
			if (option.toLowerCase() == (Validation.Modes[i]).toLowerCase()){
				eval("Mode."+Validation.Modes[i]+"()");
			}
		}
		
	},
	
	DefineID : function (e){
		
		i = Utils.dgeTN('input');
        
		for (l=0;i<i.length;l++)
        	i[l].id = i[l].getAttribute("name");
		
	},
	
	CleanAll : function (){
		
		var d1 = Utils.dgeID('Errors').innerHTML='';
		
	}
		
	
};


var Mode = {
		
	NotNull : function (){
		
		if (!Validation.iValue){
			
			Validation.Message[Utils.iError] = "Not Null - <b>"+Validation.iName+"</b>";
			Utils.iInput[Utils.iError] = Validation.iId;
			Utils.WithBorder(Validation.iId);
			Utils.IndexSum();
			
		} else {
			
			Utils.iInput[Utils.iError] = '';
			Utils.WithoutBorder(Validation.iId);
			
		}
	
	},
	
	Email : function (){
		
		val = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
		
		if (!val.test(Validation.iValue)&&Validation.iValue) {
			
			Validation.Message[Utils.iError] = "E-mail - <b>"+Validation.iName+"</b>";
			Utils.iInput[Utils.iError] = Validation.iId;
			Utils.WithBorder(Validation.iId);
			Utils.IndexSum();
	  	
		} else {
	  	
			Utils.iInput[Mode.iError] = '';
			Utils.WithoutBorder(Validation.iId);
	  	
		}
	}

	
		
};
