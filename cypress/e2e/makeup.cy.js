/// <reference types="cypress" />

import ForManPageObject from "../support/pages/forManCategory.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const homePage = new HomePageObject();
const forManPage = new ForManPageObject();

const categories = {
  forMan: "Чоловікам",
};
const filters = {
  firstFilter: Math.floor(Math.random() * 14),
  secondFilter: Math.floor(Math.random() * 14),
};

describe('Marketplace', () => {
  it('should provide an ability to sorting items by price', () => {
    homePage.visit();
    homePage.assertUrl();
    homePage.clickOnCategory(categories.forMan);

    forManPage.applyFilters(filters.firstFilter, filters.secondFilter);
    forManPage.sortByPrice();
    forManPage.assertPriceSortedAsc();
  });
});