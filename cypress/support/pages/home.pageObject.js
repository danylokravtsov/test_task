import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/';

  clickOnCategory (category) {
    cy.contains('.menu-list__link', category).click();
  };

  assertUrl () {
    cy.url().should('equal', 'https://makeup.com.ua/ua/');
  };
};

export default HomePageObject;