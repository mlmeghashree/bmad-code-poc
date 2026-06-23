import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const VALID_USER = 'standard_user';
const VALID_PASS = 'secret_sauce';

test.use({ actionTimeout: 60000 });

test.describe('Login — Sauce Demo', () => {

    test('logs in with valid credentials', async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });

        await page.getByTestId('username').fill(VALID_USER);
        await page.getByTestId('password').fill(VALID_PASS);
        await page.getByTestId('login-button').click();

        await page.waitForURL(/inventory/, { timeout: 60000 });
        await expect(page.getByTestId('inventory-container')).toBeVisible();
    });

    test('shows error with invalid credentials', async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });

        await page.getByTestId('username').fill('wrong_user');
        await page.getByTestId('password').fill('wrong_pass');
        await page.getByTestId('login-button').click();

        await expect(
            page.getByText('Username and password do not match')
        ).toBeVisible({ timeout: 60000 });
    });

});