(function() {
    // Ideally we should get this from the URL
    const PRODUCT_ID = 210556947;
    getProductData(PRODUCT_ID).then(productData => {
        document.querySelector('h1').textContent = productData.name.en;
        setQuantityStep(productData.quantityInfo.divisibleBy);

        const imageElement = document.querySelector('.main-image');
        imageElement.setAttribute('alt', productData.name.en);
        imageElement.setAttribute('src', productData.images[0]);
        
        document.querySelector('.introduction-text').textContent = productData.introductionText.en;
        document.querySelector('.description').textContent = productData.description.en;

        document.querySelector('.price-currency-value.regular').textContent = `£${productData.price.regular.GBP}`;

        if (productData.price.regular.GBP !== productData.price.specialOffer.GBP) {
            document.querySelector('.price-currency-value.regular').classList.add('struck');
            document.querySelector('.price-currency-value.offer').textContent = `£${productData.price.specialOffer.GBP}`;
        }
    });
}());