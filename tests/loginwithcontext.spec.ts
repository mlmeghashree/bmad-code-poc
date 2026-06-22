import { test, expect } from '@playwright/test';

// Sauce Demo Login - covers "User logs in" step of the core user journey
// (see project-context.md, sections 3 and 4: Login functionality is in scope)
const BASE_URL = 'https://www.saucedemo.com';

test.describe('Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test('user logs in with valid credentials and reaches the inventory page', async ({ page }) => {
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    });

    test('user sees an error when credentials are invalid', async ({ page }) => {
        await page.locator('[data-test="username"]').fill('invalid_user');
        await page.locator('[data-test="password"]').fill('wrong_password');
        await page.locator('[data-test="login-button"]').click();

        await expect(page.locator('[data-test="error"]')).toContainText(
            'Username and password do not match any user in this service'
        );
    });

    test('locked out user is blocked from logging in', async ({ page }) => {
        await page.locator('[data-test="username"]').fill('locked_out_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page.locator('[data-test="error"]')).toContainText(
            'Sorry, this user has been locked out.'
        );
        await expect(page).toHaveURL(`${BASE_URL}/`);
    });
});
