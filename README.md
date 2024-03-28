# Abicart Product page

A single product page that fetches a product details via API and displays its info, while managing the cart for just that one product

## Hosting

The website has been hosted [here](https://4dwaith.github.io/abicart-product-page/) using GitHub Pages

## Approach

1. The scope of the current assignment is to create a product page, and the details have to be fetched via the JSON RPC API.
2. This required an authentication token, which was fetched and stored in session storage
3. Once the details were fetched, the product title, image, description, price were populated in the page
4. The cart count was initialized to 0, and fetched/stored in local storage (this will need to evolve further when multiple products are introduced - we'll need to use IndexedDB, with the product key as the index)
5. The API interactions and cart interactions were separated into different JS files, for loose coupling and readability
6. The project was hosted as a public repository on GitHub, and deployed on GitHub pages

## Task implementation in detail

1. Abicart platform familiarization
    - A top level category was created
    - A product was added to this category
    - Added the basics - name, intro text, description, image, price
    - The description was a multi-paragraph piece of text that should be rendered on the front end with corresponding whitespaces
    - There was a special offer price for the product along with the regular price, that could be shown as a discount
    - The quantity step was modified such that products should be incremented/decremented by that amount
2. Develop a standalone webpage
    - A single static webpage was built with pure HTML, CSS, and JS (no SCSS or Typescript usage)
    - Data was fetched from the backend API **without** using the recommended Javascript client, since I did not want to introduce a jQuery dependency
    - The API layer was separated into its own file, called from the mmain index file. It is flexible enough that we can build on top of it (since we have a generic function that accepts a method name and parameters)
    - On completion of the product data fetch, the name, intro text, description, image, and price were populated in the HTML content
    - There is an "Add to Cart" button shown by default
    - I referenced the Abicart page, as well as Amazon and Shopify pages to get a reference for the product pages the customers are used to. The final design is clean and minimal that doesn't deviate from the standard design
    - The page was built mobile-first, and most of the CSS rules were kept size-agnostic, only introducing a grid system for the desktop screens
    - The HTML uses semantic elements wherever possible, for machine readability and accessibility
3. Addtional Javascript functionality
    - On clicking of the "Add to Cart" button, the button changes to a "Proceed to Checkout" button
    - This button has been visually indicated as not allowed, since there is no separate cart page
    - The cart icon on the top right of the page reflects the fact that the product has been added to cart
    - The cart functionality has been further separated into another file.
    - All DOM related operations have been wrapped inside an IIFE to ensure the page has been fully loaded before execution
    - All pure function operations have been kept outside the IIFE, and can be tested independently when testing is introduced
4. Advanced cart editor
    - The quantity of the amount being purchased is represented as an input box next to the "Proceed to checkout" button, with increment and decrement buttons.
    - The increment/decrement has been soft-coded such that it changes in step size by the product property that has been set in the backend
    - The number in the product page main area is synchronized with the count of the cart icon on the top right of the page.
    - The increment/decrement operations fully control the quantity, not allowing random user input. It also removes the item from the cart when the quantity reaches zero
5. Creative features
    - This same page can be opened across multiple tabs, and the cart data will be synchronized across all tabs. (Accomplished using Broadcast channel)
    - The cart count has been stored in local storage, so that the count is persisted across page refreshes
    - The animations/transitions have been kept to a minimum (such as a button highlight when you hover over it) since the the theme of shopping pages are snappy reaction times. Any animations/transitions the user is forced to go through will be detrimental to that. 
