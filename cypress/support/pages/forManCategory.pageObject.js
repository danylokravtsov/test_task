import PageObject from "../PageObject";

class ForManPageObject extends PageObject {
  url = "/categorys/20280/";

  applyFilters(firstFilter, secondFilter) {
    cy.get('.catalog-checkbox-list__item.popular')
      .eq(firstFilter)
      .click();

    cy.get('.catalog-checkbox-list__item.popular')
      .eq(secondFilter)
      .click();
  }

  sortByPrice() {
    cy.get('.catalog-sort__list-title').click();

    cy.get('[for="input-sort-1"]').click();
  }

  assertPriceSortedAsc() {
    cy.get('.simple-slider-list__price')
    .find('.price_item')
    .then(($prices) => {
      const pricesArray = $prices.toArray().map((el) => parseFloat(el.innerText))
      
      for (let i = 1; i < pricesArray.length; i++) {        
        expect(pricesArray[i]).to.be.greaterThan(pricesArray[i - 1]);
      }
    })

    // const pricesArray = [];

    // cy.get('.simple-slider-list__price')
    //   .find('.price_item')
    //   .each(($price) => {
    //     const price = parseFloat($price.text());
    //     pricesArray.push(price);
    //   })
    //   .then(() => {
    //     for (let i = 1; i < pricesArray.length; i++) {
    //       expect(pricesArray[i]).to.be.greaterThan(pricesArray[i - 1]);
    //     }
    //   });
  }
};

export default ForManPageObject;