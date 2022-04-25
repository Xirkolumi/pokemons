import { test, expect } from '@playwright/test';
import { ListPage } from './pages/list-page';

const rootUrl = 'https://proit.zone/pokemons';

test.describe('pokemon list', () => {
  let listPage: ListPage;
  test.beforeEach(async ({ page }) => {
    listPage = new ListPage(page);
    await listPage.goTo(rootUrl);
  });

  test('should contain 10 elements', async () => {
    await expect.soft(listPage.getGridRows()).toHaveCount(10);
  });
})