import { test, expect } from "@playwright/test";

// Mock user credentials
const validEmail = "johnrobitm@gmail.com";
const validPassword = "P@s$w0rd";
const invalidEmail = "invaliduser@example.com";
const invalidPassword = "WrongPassword";

test.describe("Login Screen Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4000/sign-in");
  });

  test("Successful login", async ({ page }) => {
    await page.fill('input[name="email"]', validEmail);
    await page.fill('input[name="password"]', validPassword);
    await page.click('button:has-text("Log in")');

    // Check for successful login redirect (assuming /dashboard)
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test("Fail login with incorrect password", async ({ page }) => {
    await page.fill('input[name="email"]', validEmail);
    await page.fill('input[name="password"]', invalidPassword);
    await page.click('button:has-text("Log in")');

    // Check for error toast
    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "Invalid Credentials"
    );
  });

  test("Fail login with incorrect email", async ({ page }) => {
    await page.fill('input[name="email"]', invalidEmail);
    await page.fill('input[name="password"]', validPassword);
    await page.click('button:has-text("Log in")');

    // Check for error toast
    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "User Not Found"
    );
  });

  test("Fail login with both incorrect email and password", async ({
    page,
  }) => {
    await page.fill('input[name="email"]', invalidEmail);
    await page.fill('input[name="password"]', invalidPassword);
    await page.click('button:has-text("Log in")');

    // Check for error toast
    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "User Not Found"
    );
  });

  test("Fail login with empty fields", async ({ page }) => {
    await page.click('button:has-text("Log in")');

    // Check for validation messages
    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "Please provide email and password!"
    );
  });
});
