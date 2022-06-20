/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const navLinks = document.getElementsByClassName('menu__link');
const menu = document.querySelector('nav.navbar__menu');
const fragment = document.createDocumentFragment();

// Timer hold seconds to use it in hide navbar when unscrolling 
let timer = null;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Helper function to check if the element is in the viewport 
function isInViewPort(element){	
	//use getBoundingClintRect  
	const rect = element.getBoundingClientRect();
	//element is in viewPort only if 75% of it's Height appeared  
	if(	rect.top >= -3 && 
		rect.bottom <= (window.innerHeight + (window.innerHeight * 25)  / 100 ) ){
		return true;	
	} 

	return false;
}	

//set active class for selected element and remove active class from other elements
function toggleActiveClass(selectedElement, elements){
	
	
	if(!selectedElement){
		return null;
	}

	for(let el of elements){
		
		if(el.classList.contains('active')){
			el.classList.remove('active');	
		}		
	}

	if(!selectedElement.classList.contains('active')){
		selectedElement.classList.add('active');	
	}	

	
	
}

// scroll to most top handler
function scrollToMostTop(){
	
	window.scrollTo({
	 	 top: 0,  
	 	 behavior: 'smooth'
	});
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildMenu(sections){
    
    const navList = document.querySelector('#navbar__list');
    const navAnchorsList = []; 

    
    for(let section of sections){       

        let data = section.getAttribute("data-nav"); 

        let anchorStr =  `<a class="menu__link" data-section="${section.getAttribute('id')}">${data}</a>`;          

        const li = document.createElement('li');
        li.innerHTML = anchorStr;

		fragment.appendChild(li);
		
       
    } 

	navList.appendChild(fragment);        
}

// Add class 'active' to section when near top of viewport
function onScrollsetActiveClass(){
	
	for(let i=0; i< sections.length; i++){

		const section = sections[i];		
		const linkedNavItem = document.querySelector(`[data-section=${section.getAttribute('id')}]`);

		/*
		   Add active class to section in the viewport &&
		   then active class to navLinks linked to active section  
		   then toggle active class for others elments in both sections and navlinks
		   using helper function toggleActiveClass
		 */		

		if(isInViewPort(section)){									
			//Add active class to section in the viewport & toggle active class for others elments
			toggleActiveClass(section, sections);
			//get navLink linked to active section
			const linkedNavItem = document.querySelector(`[data-section=${section.getAttribute('id')}]`);
			//Add active class to navLink linked to active section & toggle active class for others elments
			toggleActiveClass(linkedNavItem, navLinks);			
		}






		

	}		
	
}
// Scroll to anchor ID using scrollTO event
function scrollToSection(section){
	
	//if tehre is section scroll to if not scroll to top 0
	if(section){
		const offSetTop = section.offsetTop;
		window.scrollTo({
			top: offSetTop,  
			behavior: 'smooth'	
		});
	}

}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildMenu(sections);    

//Scroll to section on link click event
menu.addEventListener('click', navLinkClickHandler );

function navLinkClickHandler(e){
 	
	if(e.target.className == "menu__link"){

		// console.log(e.target);
		let section =  document.getElementById(e.target.getAttribute('data-section'));
		
		scrollToSection(section);

		toggleActiveClass(e.target, navLinks); 	

	
	}

}

// Set sections as active
window.addEventListener('scroll', onScrollsetActiveClass);


//Up botton manipulation 
const up = document.getElementById('up');

//Show and hide up botton on scroll
window.addEventListener('scroll', showUpBtn);
function showUpBtn(){
	if(scrollY >= ((innerHeight * 30 ) / 100) || document.documentElement.clientHeight){
	   up.classList.remove("hidden")
	}else{
		up.classList.add("hidden")
	}
}

// Up btn oncLick scroll to top 
up.addEventListener('click', upClickHandler);

function upClickHandler(){
	// console.log("up clicked");	
	scrollToMostTop();  
}



//Hide fixed navigation bar while not scrolling
window.addEventListener('scroll',onScrollHandler );
function onScrollHandler(){
	
	let navBar = document.getElementById('navbar__list');

	if(navBar.classList.contains("hide")){
		navBar.classList.remove("hide");
	}

	if(timer !== null){
		clearTimeout(timer);  
	}	
	timer = setTimeout(()=>{		
		//console.log("timeOut");
		document.getElementById('navbar__list').classList.add('hide');

	}, 5000 );

	
}