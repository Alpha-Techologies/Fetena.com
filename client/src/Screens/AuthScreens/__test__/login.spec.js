import { test, expect } from '@playwright/test';

test.describe('LoginScreen tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:8080/api/users/login'); // Change this URL to the correct one for your app
  });

  test('should display login form', async ({ page }) => {
    // Check if the login form and necessary elements are visible
    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
  });

  test('should display validation messages for empty fields', async ({ page }) => {
    // Click the login button without entering email and password
    await page.getByRole('button', { name: 'Log in' }).click();

    // Check for validation messages
    await expect(page.getByText('Please input your email!')).toBeVisible();
    await expect(page.getByText('Please input your password!')).toBeVisible();
  });

  test('should display validation message for invalid email', async ({ page }) => {
    // Enter invalid email and a password
    await page.getByPlaceholder('Email').fill('invalid-email');
    await page.getByPlaceholder('Password').fill('password123');

    // Click the login button
    await page.getByRole('button', { name: 'Log in' }).click();

    // Check for validation message for invalid email
    await expect(page.getByText('Please input a valid email address!')).toBeVisible();
  });

  test('should login successfully with correct credentials', async ({ page }) => {
    // Mock the API response for login
    await page.route('**/login', route =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({ status: 'fulfilled' }),
      })
    );

    // Enter valid email and password
    await page.getByPlaceholder('Email').fill('test@example.com');
    await page.getByPlaceholder('Password').fill('password123');

    // Click the login button
    await page.getByRole('button', { name: 'Log in' }).click();

    // Check if redirected to dashboard
    await page.waitForURL('http://localhost:3000/dashboard'); // Change this URL to the correct one for your app
  });

  test('should show error toast on login failure', async ({ page }) => {
    // Mock the API response for login failure
    await page.route('**/login', route =>
      route.fulfill({
        status: 401,
        body: JSON.stringify({ status: 'rejected', message: 'Invalid credentials' }),
      })
    );

    // Enter valid email and password
    await page.getByPlaceholder('Email').fill('test@example.com');
    await page.getByPlaceholder('Password').fill('wrongpassword');

    // Click the login button
    await page.getByRole('button', { name: 'Log in' }).click();

    // Check for error toast message
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});
