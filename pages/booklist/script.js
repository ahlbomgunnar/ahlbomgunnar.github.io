
// TAB SIZE:2

var apiKey;
var localKey = localStorage.getItem('apiKey');
var keyRequestUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
var data = [];

var editID = null;






let getID = id => document.getElementById(id);

function manipulateDOM(action, id) {
	let obj = getID(id);
	switch(action) {
		case 'display': 
			obj.style.opacity = '1';
			obj.style.visibility ='visible';
			break;
		case 'hide': 
			obj.style.opacity = '0';
			obj.style.visibility ='hidden';
			break;
	}
}


// KEY FUNCTIONS

// SELF-INVOKING FUNCTION TO CHECK IF USER HAS A KEY
(function hasKey() {
	if (localKey) {
		apiKey = localKey;
		viewData(); 
		getID('currentApiKey').innerHTML = apiKey;
	}
	else {
		getNewKey();
	}
})();

// SETS API KEY
let setKey = key => {
	log('Success. New API key recieved: ' + key);
	apiKey = key;
	localStorage.setItem("apiKey", key);
	getID('currentApiKey').innerHTML = apiKey;
}

// REQUESTS A NEW KEY
function getNewKey() {
	log('Requested a new API key...')
	getHttp('GET', keyRequestUrl)
		.then(function(response) {
			if(response.status === 'success') {
				setKey(response.key);
				viewData();
			}
	  		else {
	  			log('Server response error, trying again...');
	  			getNewKey();
	  		}
		})
		.catch(function(error) {
	  		log('Error recieved: ' + error);
	    });
}

// HIDES OVERLAYS
function hideOverlays() {
	manipulateDOM('hide', 'module');
	manipulateDOM('hide', 'textedit');
	manipulateDOM('hide', 'loadingOverlay');
}

function openEventLog() {
	console.log('opened eventlog')
	let eList = getID('eventList');
	eList.onclick = function() {
   		closeEventLog();
	};
	eList.style.bottom = '0';
	eList.style.opacity = '1';
	eList.style.visibility = 'visible';
}

function closeEventLog() {
	console.log('closed eventlog')
	let eList = getID('eventList');
	eList.onclick = function() {
    	openEventLog();
	};
	eList.style.bottom = '-250px';
	eList.style.opacity = '0';
	eList.style.visibility = 'hidden';
}

// LOGS THE DATA TO EVENT LOG
function log(text) {
	let time = new Date().toLocaleTimeString('en-GB', {hour:'numeric', minute:'numeric'});
	let textNode = document.createElement('p');
		textNode.innerHTML = time + ' - ' + text;
	getID('eventList').appendChild(textNode);
}




// LOCAL DATA
function updateLocalData(response) {
	data = [];
	getID('displayfield').innerHTML = '';
	for(let i in response.data) {
		let obj = {
			author: response.data[i].author,
			title: response.data[i].title, 
			id: response.data[i].id
		}
		data.push(obj);
	}
	for(let i in data) {
		createBookObject(data[i]);
	}
	log('Data updated.');
}


// DATA VISUALIZATION
function createBookObject(obj) {
	let container = getID('displayfield');
		let card = document.createElement('div');
				card.className = 'book col s6 m4 l3';
			let cardTitle = document.createElement('h3');
					cardTitle.innerHTML = obj.title;
					cardTitle.addEventListener('click', function() {
						openEditMenu(obj.id, obj.title, obj.author);
					});
			let cardAuthor = document.createElement('h5');
					cardAuthor.innerHTML = obj.author;
					cardAuthor.addEventListener('click', function() {
						openEditMenu(obj.id, obj.title, obj.author);
					});
			let cardDelete = document.createElement('span');
					cardDelete.innerHTML = '<i class="fa fa-close" aria-hidden="true"></i>';
					cardDelete.addEventListener('click', function() {
						deleteData(obj.id);
					});
		card.appendChild(cardDelete); 
		card.appendChild(cardTitle); 
		card.appendChild(cardAuthor); 
	container.appendChild(card);
}


// GETS VALUES FROM OBJECT TO USE IN EDIT MENU
function openEditMenu(id, title, author) {
	editID = id;
	manipulateDOM('display','textedit');
	getID('editTitle').value = title;
	getID('editAuthor').value = author;
}



// DATA REQUESTS
function getRandomBooks() {
	let titles = ['A','B'];
	for(let i=0; i<titles.length; i++) {
		fetch('https://www.googleapis.com/books/v1/volumes?q='+titles[i])  
		  .then(  
		    function(response) {  
		      if (response.status !== 200) {  
		        log('Error recieved: ' + response.status); return;
		      }
		      response.json().then(function(data) {  
		        for(let i=0; i<data.items.length; i++) {
		        	if(data.items[i].volumeInfo.authors) {
		        		let title = data.items[i].volumeInfo.title;
		        		let author = data.items[i].volumeInfo.authors[0];
		        		let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key='+apiKey+'&title='+title+'&author='+author;
		        		manipulateData(url,'add');
		        	}
		        }
		    	});
		  })
		  .catch(function(error) {  
		    log('Error recieved: ', error);
		  });
	}
}

// SEND EDITED DATA
function sendData() {
	manipulateDOM('hide', 'textedit');
	let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=update&id='+currentID+'&title='+getID('editTitle').value+'&author='+getID('editAuthor').value+'&key='+apiKey;
	log('Sent edit request...');
	manipulateData(url,'edit');
}

// SENDS NEW DATA
function viewData() {
	let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key='+apiKey;
	log('Sent data fetch request...');
	manipulateData(url,'view');
}

// SENDS DELETE REQUEST
function deleteData(objID) {
	let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&id='+objID+'&key='+apiKey;
	log('Sent delete request...');
	manipulateData(url,'del');
}

// SENDS NEW DATA
function addData(title, author) {
	let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key='+apiKey+'&title='+getID('newTitle').value+'&author='+getID('newAuthor').value;
	log('Sent insert request...');
	manipulateData(url,'add');
}






// HTTP AND PROMISES

function manipulateData(url,method) {
	//Display loading animation
	hideOverlays();
	manipulateDOM('display', 'loadingOverlay');
	// Send HTTP request
	getHttp('GET', url)
		.then(function(response) {
			// If successful
			if(response.status === 'success') {
				// If method is to view data
				if(method === 'view') {
					// Hide overlays, update local data and log it to console.
					manipulateDOM('hide', 'loadingOverlay');
					log('Successful response recieved.');
					updateLocalData(response);
				}
				// Else, view data
				else {
					log('Server response error, trying again...');
					viewData();}
				}
			// If unsuccessful, induce recursion
		  else {
		  	manipulateData(url, method);
		  }
		})
		.catch(function(error) {
			// If failed, hide overlays and display error on event log
			manipulateDOM('hide', 'loadingOverlay');
			log('Error recieved: ' + error);
		});
}

function getHttp(method, url) {
	// Returns a promise for an XMLHttpRequest
  return new Promise(function(resolve, reject) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (this.readyState === 4) {
      	if(this.status === 200) {
      		resolve(JSON.parse(this.responseText));
      	}
      	else {
      		reject(Error(this.statusText));
      	}
      }
    }
    http.open(method, url); 
    http.send();
  });
}

		

