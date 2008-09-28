
window.onload = function (){
	
	Validation.Starting();
	
}

var Utils = {
		
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
		
	}
		
};

var Validation = {
		
	/* 
	 * Method name availables
	 * Add the new methods here 
	 */	
	Modes : new Array('NotNull', 'Email', 'AZ', '09', 'CPF'),
		
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
		
		if ( option.toLowerCase() == (Validation.Modes[0]).toLowerCase() ){
			Mode.NotNull();
		} else if ( option.toLowerCase() == (Validation.Modes[1]).toLowerCase() ) { 
			Mode.Email();
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
		
	iError	: 0,
	iInput	: new Array(),
		
	NotNull : function (){
		
		if (!Validation.iValue){
			
			Validation.Message[Mode.iError] = "Not Null - <b>"+Validation.iName+"</b>";
			Mode.iInput[Mode.iError] = Validation.iId;
			Mode.WithBorder(Validation.iId);
			Mode.IndexSum();
			
		} else {
			
			Mode.iInput[Mode.iError] = '';
			Mode.WithoutBorder(Validation.iId);
			
		}
	
	},
	
	Email : function (){
		
		val = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
		
		if (!val.test(Validation.iValue)&&Validation.iValue) {
			
			Validation.Message[Mode.iError] = "E-mail - <b>"+Validation.iName+"</b>";
			Mode.iInput[Mode.iError] = Validation.iId;
			Mode.WithBorder(Validation.iId);
			Mode.IndexSum();
	  	
		} else {
	  	
			Mode.iInput[Mode.iError] = '';
	  		Mode.WithoutBorder(Validation.iId);
	  	
		}
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
