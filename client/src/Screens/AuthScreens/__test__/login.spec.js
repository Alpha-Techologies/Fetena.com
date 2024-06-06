import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4000/login');
  });

  test('should render the login page correctly', async ({ page }) => {
    // Verify that the logo is visible
    const logo = page.locator('img[alt=""]');
    await expect(logo).toBeVisible();
    
    // Verify the presence of the login form
    const loginFormTitle = page.locator('h1:has-text("Log In")');
    await expect(loginFormTitle).toBeVisible();
    
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const loginButton = page.locator('button:has-text("Log in")');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test('should show validation errors if form is submitted without input', async ({ page }) => {
    await page.click('button:has-text("Log in")');

    // Verify error messages
    const emailErrorMessage = page.locator('.ant-form-item-explain:has-text("Please input your email!")');
    const passwordErrorMessage = page.locator('.ant-form-item-explain:has-text("Please input your password!")');

    await expect(emailErrorMessage).toBeVisible();
    await expect(passwordErrorMessage).toBeVisible();
  });

  test('should show error message on invalid login', async ({ page }) => {
    // Mock backend responses (if applicable)
    // Mock Redux state, e.g., using MSW (Mock Service Worker)

    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button:has-text("Log in")');

    // Verify toast error message
    const toastMessage = page.locator('.Toastify__toast:has-text("Something is wrong!")');
    await expect(toastMessage).toBeVisible();
  });

  test('should redirect to dashboard on successful login', async ({ page }) => {
    // Mock backend responses (if applicable)
    // Mock Redux state, e.g., using MSW (Mock Service Worker)

    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'correctpassword');
    await page.click('button:has-text("Log in")');

    // Verify redirection to dashboard
    await page.waitForURL('http://localhost:4000/dashboard');
    await expect(page).toHaveURL('http://localhost:4000/dashboard');
  });

  test('should navigate to sign up page when clicking "Sign up"', async ({ page }) => {
    await page.click('a:has-text("Sign up")');
    await page.waitForURL('http://localhost:4000/register');
    await expect(page).toHaveURL('http://localhost:4000/register');
  });
});