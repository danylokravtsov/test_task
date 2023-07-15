class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  clickOnCategory(category) {
    cy.contains('.menu-list__link', category).click();
  };

  assertUrl() {
    cy.url().should('equal', 'https://makeup.com.ua/ua' + this.url);
  };

  addItemToBasket(item) {
    cy.contains('.simple-slider-list__link', item)
    .trigger('mouseover')

    cy.wait(1000);
    cy.contains('.simple-slider-list__link', item)
    .find('.button.buy')
    .click();
  }

  closeBasket() {
    cy.get('.popup__window')
    .find('.popup-close.close-icon')
    .click();
  }

  assertFirstItemInBasket(title, desc, price) {
    cy.get('.popup__window')
      .find('.product-list_product-item')
      .eq(1)
      .should('contain', title)
      .and('contain', desc)
      .and('contain', price)
  }

  assertSecondItemInBasket(title, desc, price) {
    cy.get('.popup__window')
      .find('.product-list_product-item')
      .eq(0)
      .should('contain', title)
      .and('contain', desc)
      .and('contain', price)
  }

  assertOrderPrice(firstItemPrice, secondItemPrice) {
    cy.get('.popup__window')
      .find('.order-price')
      .find('span')
      .find('strong')
      .should('contain', firstItemPrice + secondItemPrice);
  }

  assertDeleteButton(title) {
    cy.get('.product__button-remove').eq(0).click();
    cy.get('.popup__window')
      .find('.product-list_product-item')
      .eq(0)
      .should('not.contain', title)
  }

  searchItem(text) {
    cy.get('[data-popup-handler="search"]').click();
    cy.get('.search-input').type(text + '{enter}');
  }

  assertSearchedItems(text) {
    cy.get('.catalog-products')
    .find('.info-product-wrapper')
    .each(($item) => {
      expect($item.text()).to.include(text)
    })   
  }

  typeEmailInSubscribeFeld(email) {
    cy.get('[placeholder="Електронна пошта"]').click();
    cy.get('[placeholder="Електронна пошта"]').type(email);
  }

  clickOnSubmitBtn() {
    cy.contains('.footer-submit', 'підписатися').click();
  }

  assertSubscribing(message) {
    cy.get('#popup__window')
      .find('.popup-content')
      .should('contain', message);
  }
}

export default PageObject;