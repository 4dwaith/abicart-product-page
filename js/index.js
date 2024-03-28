(function() {
    // Ideally we should get this from the URL
    const PRODUCT_ID = 210556947;
    getProductData(PRODUCT_ID).then(productData => {
        document.querySelector('h1').textContent = productData.name.en;

        const imageElement = document.querySelector('.main-image');
        imageElement.setAttribute('alt', productData.name.en);
        imageElement.setAttribute('src', productData.images[0]);
        
        document.querySelector('.introduction-text').textContent = productData.introductionText.en;
        document.querySelector('.description').textContent = productData.description.en;

        document.querySelector('.price-currency-value').textContent = `£${productData.price.current.GBP}`;
    });
}());