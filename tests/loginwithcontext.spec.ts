import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const VALID_USER = 'standard_user';
const VALID_PASS = 'secret_sauce';

test.describe('Login — Sauce Demo', () => {

    test('logs in with valid credentials', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.waitForLoadState('domcontentloaded');

        await page.getByTestId('username').fill(VALID_USER);
        await page.getByTestId('password').fill(VALID_PASS);
        await page.getByTestId('login-button').dispatchEvent('click');

        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByTestId('inventory-container')).toBeVisible();
    });

    test('shows error with invalid credentials', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.waitForLoadState('domcontentloaded');

        await page.getByTestId('username').fill('wrong_user');
        await page.getByTestId('password').fill('wrong_pass');
        await page.getByTestId('login-button').dispatchEvent('click');

        await expect(
            page.getByText('Username and password do not match')
        ).toBeVisible();
    });

});