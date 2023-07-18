/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
import ForManPageObject from "../support/pages/forManCategory.pageObject";
import GiftsPageObject from "../support/pages/giftsCategory.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const homePage = new HomePageObject();
const forManPage = new ForManPageObject();
const giftsPage = new GiftsPageObject();

describe('Marketplace', () => {
  const categories = {
    forMan: "Чоловікам",
    gifts: "Подарунки"
  }
  const items = {
    firstItem: {
      title: "Твердий дезодорант",
      desc: "Old Spice Wolfthorn Deodorant Stick",
      price: 171
    },

    secondItem: {
      title: "Trussardi My Land",
      desc: "Туалетна вода",
      price: 768
    },

    searchedItem: "NIVEA"
  }
  const email = faker.internet.email();
  const subscribeMessage = 'Ви вдало підписались на цю розсилку!';

  beforeEach(() => {
    homePage.visit();
    homePage.assertUrl();
  });

  it('should provide an ability to sort items by price', () => {
    homePage.clickOnCategory(categories.forMan);

    forManPage.applyFilters(4, 7);
    forManPage.sortByPrice();
    cy.wait(7000)
    forManPage.assertPriceSortedAsc();
  });

  it('should provide an ability to add items to the basket', () => {
    homePage.clickOnCategory(categories.forMan);

    forManPage.addItemToBasket(items.firstItem.title);
    cy.wait(7000);
    forManPage.closeBasket();

    forManPage.clickOnCategory(categories.gifts);
    giftsPage.addItemToBasket(items.secondItem.title);
    cy.wait(7000);
    giftsPage.assertFirstItemInBasket(items.firstItem.title, items.firstItem.desc, items.firstItem.price);
    giftsPage.assertSecondItemInBasket(items.secondItem.title, items.secondItem.desc, items.secondItem.price);
    giftsPage.assertOrderPrice(items.firstItem.price, items.secondItem.price);
    giftsPage.assertDeleteButton(items.secondItem.title);
  });

  it('should provide an ability to add items to the basket', () => {
    homePage.searchItem(items.searchedItem);
    homePage.assertSearchedItems(items.searchedItem);
  });

  it('should provide an ability to subscribe to the news', () => {
    homePage.typeEmailInSubscribeFeld(email);
    homePage.clickOnSubmitBtn();
    cy.wait(2000);
    homePage.assertSubscribing(subscribeMessage);
  });
});