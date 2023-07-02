# Cinema


## File Structure

 - App  
	 - All of the pages are wrapped by this component, in this component the AppHeader comes at the top of the router view (If we wanted to have more layout we should dedicate the layout to the router file).  
	 
 -  components
	 - 	 Base
		 The basic components that are used in bigger components and are not related to the project specifically, come in this folder (Button, Modal, etc.).
	  -   Common
		 Contain our base reusable components besides the functionality to create logical components which are used among all the pages in our application. 
		 
	 -   Icons
		 The SVG elements are wrapped by Vue templates and come in this folder.
	 -   Pages
		 Each page has a specific folder that contains our non-reusable components.
		 

 -  main.ts
	In this file we initialize our Vue application and attach it to our HTML file, Also dependencies like state management stores should be initialized.
 - router.ts
	 All of our pages come should specify in this file, in bigger applications we can also specify different layouts for our different pages in our router options. some less important routes are loaded lazy-loaded to generate a separate chunk
 - stores       
	 Shared data across whole the application which consists of different modules (in our application we only have favorite shows), we can persist its data to local storage.
 - views
	 These components wrap our common and base components to create different views in our application. Mostly our API calls occur in these components and pass the data to their children.
 - assets
	 Static files like base styles and images come in this folder.    
 - composable
	  Reactive shared logic that can be used in our components.
 - models       
 - services
	 The shared service that will be called in our pages, composables. in our project we just put the network requests functionality.
	     
 -  utils
	 The shared functionality, modules (like HTTP client), configs, and constant variables come in this folder. in this way, we prevent inconsistency of calculation and configs in our application.

## Dependecies

 - pinia-plugin-persistedstate
	 help to persist our store data (like a favorite list, or application theme).
 - swiper
	 Lightweight and easy to use carousel, which is used to create vertical lists in our application.

## Deploy

Deployed by vercel.

## Running

    npm dev
    
## Unit tests

    npm test:unit
