import PageObject from "../PageObject";

class ForManPageObject extends PageObject {
  url = "/categorys/20280/";

  applyFilters (firstFilter, secondFilter) {
    cy.get('.catalog-checkbox-list__item.popular')
      .eq(firstFilter)
      .click();

    cy.get('.catalog-checkbox-list__item.popular')
      .eq(secondFilter)
      .click();
  }

  sortByPrice () {
    cy.get('.catalog-sort__list-title').click();

    cy.get('[for="input-sort-1"]').click();
  }

  assertPriceSortedAsc () {
    cy.get('.catalog-products')
      .find('ul')
      .find('[data-price]')
      .first()
      .should('include.value', '9');
  }
};

export default ForManPageObject;