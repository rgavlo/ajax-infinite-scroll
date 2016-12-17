"use strict"
function ajax( options ) {
    
    options = {
        type: options.type || "POST" , 
        url: options.url || "", 
        onComplete: options.onComplete || function () {},
        onError: options.onError || function () {},
        onSuccess: options.onSuccess || function () {},
        dataTypes: options.dataTypes || "text"
        
    };
    
    function httpSuccess ( httpRequest ) {
        try {
           return (httpReq.status >= 200 && httpReq.status < 300 || 
                httpRequest.status == 304 || 
                navigator.userAgent.indexOf('Safari') >= 0 && typeof 
                httpRequest.status == "undefined"); 
        } catch (e) {
            return false;
        }
    }
    
    
    
    var httpReq = new XMLHttpRequest();

    httpReq.open(options.type, options.url, true);


 
    
    httpReq.onreadystatechange = function () {


        //   jesli stan dokumentu zostal zmieniony -> httpReq.State
        //   0: polaczenie nie nawiazane,
        //   1: polaczenie nawiazane,
        //   2: żądanie odebrane, 
        //   3: przetwarzanie, 
        //   4: dane zwrócone i gotowe do użycia.



        if (httpReq.readyState == 4) {

            if (httpSuccess(httpReq)) {

                options.onSuccess(httpReq.responseText);



                httpReq = null;
            } else {
                options.onError(httpReq.statusText);
            }

        }

    }


    httpReq.send();

}








window.onscroll = function (ev) {
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		console.log('youre at the bottom of the page');




		ajax({

			type: "GET",
			url: "https://jsonplaceholder.typicode.com/users",
			onError: function (msg) {
				console.log(msg);
			},
			onSuccess: function (response) {



				var jsonObj = JSON.parse(response);

				for (var i in jsonObj) {

					console.log(jsonObj);

					var id = document.createElement('p');

					id.innerHTML = "User ID: " + jsonObj[i].id;

					document.body.appendChild(id);


					var name = document.createElement('p');

					name.innerHTML = "User name: " + jsonObj[i].name;

					document.body.appendChild(name);


					var website = document.createElement('p');

					website.innerHTML = "User URL: " + jsonObj[i].website;

					document.body.appendChild(website);


				}

			}
		});
	}
};


