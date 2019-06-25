
	let customizeTextBoxes = document.getElementById('customize-text-boxes');
	let customizeArea = document.querySelector('.customize-area');
	let customizeOptions = document.querySelector('.customize-options');
	let textBox = null;
	let textArea = null;
	var selectedFamily = document.getElementById('selected-family');
	let removeField = null;
	customizeTextBoxes.addEventListener('click', function(e) {
		if(e.target && e.target.nodeName == 'TEXTAREA') {
			textArea = e.target;
			let textareaStyle = getComputedStyle(textArea);
			setFontSize.value = parseInt(textareaStyle.fontSize);
			showFontSize.innerHTML = parseInt(textareaStyle.fontSize) + ' px';

			//resize text area
			textArea.style.setProperty('height', textArea.scrollHeight + 'px');
			textArea.addEventListener("input", OnInput, false);

			//change font family in box
			selectedFamily.style.setProperty('font-family', textareaStyle.fontFamily);
			selectedFamily.innerHTML = textareaStyle.fontFamily;

			//active class
			let activeBox = document.querySelectorAll('#customize-text-boxes .text-box');
			for(i = 0; i < activeBox.length; i++) {
				if (activeBox[i].classList.contains('active')) activeBox[i].classList.remove('active');
			}
	 		textArea.parentElement.classList.add('active');

	 		//show customize box
	 		if(e.target && e.target.nodeName == 'TEXTAREA'){
				customizeOptions.classList.add('active');
			}

			//customize box area position
			if(e.target.nodeName == 'TEXTAREA'){
				let topPosition = getComputedStyle(e.target.parentElement).top;
				customizeOptions.style.setProperty('top', topPosition);
				let leftPosition = parseInt(getComputedStyle(e.target.parentElement).left);
				let elWidth = parseInt(getComputedStyle(e.target.parentElement).width) / 2;
				customizeOptions.style.setProperty('left', leftPosition + elWidth + 10 + 'px');
			}

		}

		//remove text box
		if(e.target && e.target.classList.contains('remove')) {
			e.target.parentElement.remove();
		}

	});

	customizeTextBoxes.addEventListener('mouseover', function(e) {
		if(e.target && e.target.classList.contains('text-box')) {
			textBox = e.target.querySelector('.header')
			dragElement(e.target);
		}

	});

	//remove active class
	window.addEventListener('click', function(e){   
		if (!document.querySelector('.customize-area').contains(e.target) && !document.querySelector('.add-text').contains(e.target) && !document.querySelector('.customize-options').contains(e.target)){
			let activeBox = document.querySelectorAll('#customize-text-boxes .text-box');
			for(i = 0; i < activeBox.length; i++) {
				if (activeBox[i].classList.contains('active')) activeBox[i].classList.remove('active');
			}
		}
		if(!document.querySelector('.font-family').contains(e.target)){
			document.getElementById('family-list').classList.remove('open');
		}

		//hide customize box
		if(e.target && e.target.nodeName !== 'TEXTAREA' && !customizeOptions.contains(e.target)){
			customizeOptions.classList.remove('active');
		}
	});

	//add textfield 
	function addTextField() {
		let div = document.createElement('li');
		div.classList.add('text-box', 'active');
		let header = document.createElement('div');
		header.className = 'header';
		let remove = document.createElement('div');
		remove.className = 'remove';
		let area = document.createElement('textarea');
		area.setAttribute('rows', 1);
		div.appendChild(header);
		div.appendChild(area);
		div.appendChild(remove);
		document.getElementById('customize-text-boxes').appendChild(div);
		
	}


	//update font family
	var a = document.querySelectorAll("#family-list li");
	for (var i = 0, length = a.length; i < length; i++) {
	  a[i].onclick = function() {
	    var b = document.querySelector("#family-list li.active");
	    if (b) b.classList.remove("active");
	    this.classList.add('active');

	    let fontListStyle = getComputedStyle(this);
	    selectedFamily.innerHTML = fontListStyle.fontFamily;
	    if(textArea){
	    	textArea.style.setProperty('font-family', fontListStyle.fontFamily);
			textArea.style.setProperty('height', 'auto');
			textArea.style.setProperty('height', textArea.scrollHeight + 'px');
	    }
	    selectedFamily.style.setProperty('font-family', fontListStyle.fontFamily);
	  };
	}


	//update font size
	var setFontSize = document.getElementById('update-font-size');
	var showFontSize = document.getElementById('show-font-size');
	showFontSize.innerHTML = setFontSize.value + ' px';
	function updateFontSize() {
		if(textArea){
			textArea.style.setProperty('font-size', setFontSize.value + 'px');
			textArea.style.setProperty('height', 'auto');
			textArea.style.setProperty('height', textArea.scrollHeight + 'px');
		}
		showFontSize.innerHTML = setFontSize.value + ' px';
		
	}
	setFontSize.addEventListener('change', updateFontSize);
	setFontSize.addEventListener('mousemove', updateFontSize);


	//update color
	var colorBox = document.querySelectorAll(".color-box div");
	for(i = 0; i < colorBox.length; i++){
		colorBox[i].onclick = function() {
			const colorStyle = getComputedStyle(this);
			textArea.style.setProperty('color', colorStyle.backgroundColor);
		}
	}

	//update alignment
	function changeAlign(align){
		if(textArea){
			textArea.style.setProperty('text-align', align);
		}
	}

	//resize textarea
	window.addEventListener('load', function(e){
		let allTextFields = e.target.querySelectorAll('#customize-text-boxes textarea')
		for(i = 0; i < allTextFields.length; i++){
			allTextFields[i].style.setProperty('height', allTextFields[i].scrollHeight + 'px');
			allTextFields[i].addEventListener("input", OnInput, false);
		}
	});
	function OnInput() {
	  this.style.height = 'auto';
	  this.style.height = (this.scrollHeight) + 'px';
	}


	//Hide & Show family list
	function showFamilyList(){
		document.getElementById('family-list').classList.toggle('open');
	}


	//Make the DIV element draggagle:
	function dragElement(elmnt) {
	  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	  if (textBox) {
	    /* if present, the header is where you move the DIV from:*/
	    textBox.onmousedown = dragMouseDown;
	  } else {
	    /* otherwise, move the DIV from anywhere inside the DIV:*/
	    elmnt.onmousedown = dragMouseDown;
	  }

	  function dragMouseDown(e) {
	    e = e || window.event;
	    e.preventDefault();
	    // get the mouse cursor position at startup:
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    document.onmouseup = closeDragElement;
	    // call a function whenever the cursor moves:
	    document.onmousemove = elementDrag;
	  }

	  function elementDrag(e) {
	    e = e || window.event;
	    e.preventDefault();
	    // calculate the new cursor position:
	    pos1 = pos3 - e.clientX;
	    pos2 = pos4 - e.clientY;
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    // set the element's new position:
	    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	  }

	  function closeDragElement() {
	    /* stop moving when mouse button is released:*/
	    document.onmouseup = null;
	    document.onmousemove = null;
	  }
	}


	//Show image
	function showFullImage() {
		let node = document.querySelector(".customize-area");
		domtoimage.toPng(node)
		  	.then(function (dataUrl) {
		      	let img = new Image();
		      	img.src = dataUrl;
		      	img.id = 'full-image';
		      	if(!document.querySelector('.show-full-image').contains(document.getElementById('full-image'))){
		      		document.querySelector('.show-full-image').appendChild(img);
		      	}
		  	})
		  	.catch(function (error) {
		      	console.error('oops, something went wrong!', error);
		 	});
	}

	function showImageShare() {
		let node = document.querySelector(".customize-area");
		domtoimage.toPng(node)
		  	.then(function (dataUrl) {
		      	let img = new Image();
		      	img.src = dataUrl;
		      	img.id = 'share-image'
		      	if(!document.querySelector('.show-image-share').contains(document.getElementById('share-image'))){
		      		document.querySelector('.show-image-share').appendChild(img);
		      	}
		      	
		  	})
		  	.catch(function (error) {
		      	console.error('oops, something went wrong!', error);
		 	});
	}
	
	//Download image
	function downloadImage(){
		var node = document.querySelector(".customize-area");
		domtoimage.toJpeg(node, { quality: 0.95 })
	    .then(function (dataUrl) {
	        var link = document.createElement('a');
	        link.download = 'my-invitation-card.jpeg';
	        link.href = dataUrl;
	        link.click();
	    }); 
	}

