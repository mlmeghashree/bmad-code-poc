import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

test.describe('Saucedemo Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test('logs in successfully with valid credentials', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
        await expect(page.locator('.inventory_list')).toBeVisible();
        await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    });

    test('shows an error for a locked out user', async ({ page }) => {
        await page.locator('#user-name').fill('locked_out_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page.locator('[data-test="error"]')).toContainText(
            'Sorry, this user has been locked out.'
        );
        await expect(page).toHaveURL(`${BASE_URL}/`);
    });

    test('shows an error for invalid credentials', async ({ page }) => {
        await page.locator('#user-name').fill('invalid_user');
        await page.locator('#password').fill('wrong_password');
        await page.locator('#login-button').click();

        await expect(page.locator('[data-test="error"]')).toContainText(
            'Username and password do not match any user in this service'
        );
    });

    test('shows an error when fields are empty', async ({ page }) => {
        await page.locator('#login-button').click();

        await expect(page.locator('[data-test="error"]')).toContainText(
            'Username is required'
        );
    });

    test('logs out successfully after login', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);

        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#logout_sidebar_link').click();

        await expect(page.locator('#login-button')).toBeVisible();
    });
});