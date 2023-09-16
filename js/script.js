/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const ITEMS_PER_PAGE = 9

/*** 
 *    `showSearch` function will show the seach bar and results, if any from the user's input
 * 
 *    @param {array} list - array of student objects
 *    No return
 ***/
function showAndEnableSearch(list){
   const header = document.querySelector('header')
   const ul = document.querySelector('.student-list')
   const ulPagination = document.querySelector('.link-list')
   const html = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>`
   header.insertAdjacentHTML('beforeend', html)

   header.addEventListener('keyup', (e)=> {
      const filteredList = []
      const input = e.target.value.toLowerCase()

      for (let i = 0; i < list.length; i++){
         const fullName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`
         if (fullName.includes(input)){
            filteredList.push(list[i])
         }
      }

      if (filteredList.length > 0){
         addPagination(filteredList)
         showPage(filteredList, 1)
      } else {
         ul.innerHTML = `<h3>Sorry, no results found</h3>`
         ulPagination.innerHTML = ''
      }

   })
}


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

/*** 
 *    `showPage` function will display list of elements based on the user's selection
 *    
 *    @param {array} list - list of student objects
 *    @param {number} page - page number selected by user
 *    No return
 ***/
 function showPage(list, page){
   const startIndex = (page * ITEMS_PER_PAGE) - ITEMS_PER_PAGE
   const endIndex = page * ITEMS_PER_PAGE

   const ul = document.querySelector('.student-list')
   // To reset the screen, set innerHTML to empty string
   ul.innerHTML = ''
   for (let i = 0; i < list.length; i++){
      if (i >= startIndex && i < endIndex){
         const html = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `
         ul.insertAdjacentHTML('beforeend', html)
      }
   }
 }

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

/*** 
 *    `addPagination` function will display pagination buttons
 *    and when a button is clicked, will call `showPage` function
 *    
 *    @param {array} list - list of student objects
 *    No return
 ***/
function addPagination(list){
   const numberOfPages = Math.ceil (list.length / ITEMS_PER_PAGE)
   const ul = document.querySelector('.link-list')
   // To reset the pagination on screen, set innerHTML to empty string
   ul.innerHTML = ''

   for ( let i = 1; i <= numberOfPages; i++){
      const html = `
         <li>
            <button type='button'>${i}</button>
         </li>`
      ul.insertAdjacentHTML('beforeend', html)
   }

   const firstPageButton = ul.firstElementChild.querySelector('button')
   firstPageButton.classList.add('active')

   ul.addEventListener('click', (e)=> {
      const clickedPageButton = e.target.closest('button')
      const activePageButton = ul.querySelector('.active')

      if (activePageButton && clickedPageButton) {
         activePageButton.classList.remove('active')
      }

      if (clickedPageButton) {
         clickedPageButton.classList.add('active')
         showPage(list, clickedPageButton.innerHTML)

      }

      /***
       * Snippits of my inital solution is below... it was ugly bit I think I was resourcesful
       * 
       * if (e.target.tagName === 'BUTTON')
       *  const clickedPageNumber = e.target.textContent
       * const clickedPageButton = ul.querySelector(`li:nth-child(${clickedPageNumber}) button`)
       * showPage(list, clickedPageNumber)   
       * 
       * 
       */
      
   })
}


// Call functions
showPage(data, 1)
addPagination(data)
showAndEnableSearch(data)