var FBPAGEPHOTOS = (function(){
	var pageURL;
	var nextURL;
	var divID;
	function renderPhotos(){
		console.log(this.response);
		nextURL = this.response.paging.next;
		var count = this.response.data.length;
		for(var i =0;i<count;i++){
			var elem = document.createElement("img");
			elem.setAttribute("class","myImage");
			elem.src = this.response.data[i].source;
			document.getElementById(divID).appendChild(elem);
		}
	}

    function handleError(){
    	document.getElementById(divID).innerHTML = "An error occured while fetching photos";
    }

	function fetchPhotos(){
		if(nextURL ===null || nextURL === undefined || nextURL==="")
			throw "URL not specified";
		var req = new XMLHttpRequest();
		req.open("GET",nextURL,true);
		req.responseType = "json";
		req.addEventListener('load',renderPhotos);
		req.addEventListener("error",handleError);
		req.send();

	}

	return{
		init : function(page_url,div_id){
			divID = div_id;
			nextURL = "http://graph.facebook.com/"+page_url+"/photos/uploaded";
			pageURL = page_url;
			document.getElementById(divID).innerHTML ="";
			fetchPhotos();
		

			window.addEventListener("scroll",function(){
				var YLeftToGo = document.body.offsetHeight - (window.pageYOffset + window.innerHeight);
				if(YLeftToGo<=0){
				fetchPhotos();
				}
			});
		}

	};
})();

window.addEventListener("onload",FBPAGEPHOTOS.init("cocacola","mydiv"));