import { test, expect, type Page } from "@playwright/test";

/** Skip the boot sequence for tests that don't exercise it. */
async function gotoBooted(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem("ops-booted", "1"));
  await page.goto("/");
  await expect(page.locator(".hero-name")).toBeVisible();
}

test.describe("boot sequence", () => {
  test("plays terraform boot, can be skipped, then reveals the site", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".boot")).toBeVisible();
    await expect(page.locator(".boot-frame")).toContainText("terraform apply", { timeout: 15_000 });
    await page.locator(".boot-skip").click();
    await expect(page.locator(".hero-name")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator(".boot")).toHaveCount(0);
  });

  test("boot is skipped on reload within the same session", async ({ page }) => {
    await page.goto("/");
    await page.locator(".boot-skip").click();
    await expect(page.locator(".hero-name")).toBeVisible({ timeout: 10_000 });
    await page.reload();
    await expect(page.locator(".boot")).toHaveCount(0);
    await expect(page.locator(".hero-name")).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("reveal regression (the 'no text in middle' bug)", () => {
  test("hero content actually becomes visible (opacity 1, data-rv applied)", async ({ page }) => {
    await gotoBooted(page);
    // Playwright considers opacity:0 elements "visible", so assert the reveal attr + computed opacity.
    const name = page.locator(".hero-name");
    await expect(name).toHaveAttribute("data-rv", "1", { timeout: 10_000 });
    await expect(name).toHaveCSS("opacity", "1");
    await expect(name).toContainText(/shubham sharma/i);
    await expect(page.locator(".hero-tagline")).toHaveAttribute("data-rv", "1");
  });

  test("every section reveals when scrolled to (no stuck-invisible panels)", async ({ page }) => {
    await gotoBooted(page);
    for (const id of ["manifest", "deployments", "cluster", "services", "attestations", "uplink"]) {
      // Scroll the reveal element itself — tall sections can leave their head above the fold.
      const firstReveal = page.locator(`#${id} .reveal`).first();
      await firstReveal.scrollIntoViewIfNeeded();
      await expect(firstReveal).toHaveAttribute("data-rv", "1", { timeout: 10_000 });
      await expect(firstReveal).toHaveCSS("opacity", "1");
    }
  });

  test("profile photo loads in the manifest", async ({ page }) => {
    await gotoBooted(page);
    const img = page.locator(".holo-portrait img");
    await img.scrollIntoViewIfNeeded();
    await expect(img).toBeVisible();
    await expect
      .poll(async () => img.evaluate((el: HTMLImageElement) => el.naturalWidth), { timeout: 10_000 })
      .toBeGreaterThan(0);
  });
});

test.describe("career data — Tenstorrent + EllisDon promotion", () => {
  test("v4.x Tenstorrent is the live deployment", async ({ page }) => {
    await gotoBooted(page);
    const deployments = page.locator("#deployments");
    await deployments.scrollIntoViewIfNeeded();
    const live = deployments.locator(".deploy").first();
    await expect(live).toContainText("v4.x");
    await expect(live).toContainText("Tenstorrent");
    await expect(live).toContainText("Senior Engineer, Data Center Deployment");
    await expect(live).toContainText("STABLE · LIVE");
    await expect(live).toContainText("Ansible");
    await expect(live).toContainText("AWX");
  });

  test("EllisDon shows the promotion and superseded status", async ({ page }) => {
    await gotoBooted(page);
    await page.locator("#deployments").scrollIntoViewIfNeeded();
    const ellisdon = page.locator(".deploy", { hasText: "EllisDon" });
    await expect(ellisdon).toContainText("SUPERSEDED");
    await ellisdon.locator(".deploy-head").click();
    await expect(ellisdon).toContainText("Intermediate DevOps Engineer");
    await expect(ellisdon).toContainText("Promoted to Intermediate DevOps Engineer (May 2026)");
  });

  test("hero rotates through the AI Infrastructure role", async ({ page }) => {
    await gotoBooted(page);
    await expect(page.locator(".hero-role")).toContainText("AI Infrastructure Engineer", { timeout: 15_000 });
  });
});

test.describe("deploy history accordion (the blank-card bug)", () => {
  test("toggling a card never blanks it — close, reopen, still visible", async ({ page }) => {
    await gotoBooted(page);
    const card = page.locator("#deployments .deploy").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveCSS("opacity", "1", { timeout: 10_000 });
    const head = card.locator(".deploy-head");

    // v4.x starts open — click to CLOSE it (this used to wipe the reveal state → blank card)
    await head.click();
    await expect(head).toHaveAttribute("aria-expanded", "false");
    await expect(card).toHaveCSS("opacity", "1"); // must NOT vanish
    await expect(card).toContainText("v4.x");
    await expect(card).toContainText("Tenstorrent");

    // reopen — body content must come back and card stays solid
    await head.click();
    await expect(head).toHaveAttribute("aria-expanded", "true");
    await expect(card).toHaveCSS("opacity", "1");
    await expect(card.locator(".deploy-log li").first()).toBeVisible();

    // reveal every card first (scroll the last one into view), then rapid-toggle —
    // no card on the page may end up transparent afterwards
    const last = page.locator("#deployments .deploy").last();
    await last.scrollIntoViewIfNeeded();
    await expect(last).toHaveAttribute("data-rv", "1", { timeout: 10_000 });
    const second = page.locator("#deployments .deploy").nth(1);
    await second.locator(".deploy-head").click();
    await second.locator(".deploy-head").click();
    await second.locator(".deploy-head").click();
    await expect
      .poll(async () =>
        page
          .locator("#deployments .deploy")
          .evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity).every((o) => Number(o) === 1))
      )
      .toBe(true);
  });

  test("commit hashes look real (7 hex chars, unique, no zero-runs)", async ({ page }) => {
    await gotoBooted(page);
    await page.locator("#deployments .deploy").first().scrollIntoViewIfNeeded();
    const hashes = await page.locator(".deploy-commit").evaluateAll((els) =>
      els.map((el) => (el.textContent ?? "").trim())
    );
    expect(hashes.length).toBeGreaterThan(3);
    for (const h of hashes) {
      expect(h).toMatch(/^[0-9a-f]{7}$/);
      expect(h).not.toMatch(/^(.)\1{6}$/); // no "0000000" / "aaaaaaa" degenerates
    }
    expect(new Set(hashes).size).toBe(hashes.length); // all unique
  });
});

test.describe("skill cluster", () => {
  test("kubectl grep filter finds the AWX pod", async ({ page }) => {
    await gotoBooted(page);
    await page.locator("#cluster").scrollIntoViewIfNeeded();
    await page.locator(".cluster-input").fill("awx");
    const pods = page.locator(".pod");
    await expect(pods).toHaveCount(1);
    await expect(pods.first()).toContainText("AWX");
    await page.locator(".cluster-input").fill("");
    expect(await pods.count()).toBeGreaterThan(50);
  });
});

test.describe("terminal", () => {
  test("opens with backtick, git log shows Tenstorrent, exit closes", async ({ page }) => {
    await gotoBooted(page);
    await page.keyboard.press("Backquote");
    const term = page.locator(".term");
    await expect(term).toBeVisible();
    const input = term.locator(".term-input");
    await input.fill("git log");
    await input.press("Enter");
    await expect(term.locator(".term-body")).toContainText("Tenstorrent");
    await expect(term.locator(".term-body")).toContainText("EllisDon");
    await input.fill("whoami");
    await input.press("Enter");
    await expect(term.locator(".term-body")).toContainText("Shubham Sharma");
    await input.fill("exit");
    await input.press("Enter");
    await expect(term).toHaveCount(0);
  });

  test("neofetch reports the Tenstorrent host", async ({ page }) => {
    await gotoBooted(page);
    await page.keyboard.press("Backquote");
    const input = page.locator(".term-input");
    await input.fill("neofetch");
    await input.press("Enter");
    await expect(page.locator(".term-body")).toContainText("Tenstorrent");
  });
});

test.describe("command palette", () => {
  test("Cmd/Ctrl+K opens palette and navigates to uplink", async ({ page }) => {
    await gotoBooted(page);
    await page.keyboard.press("ControlOrMeta+k");
    const palette = page.locator(".palette");
    await expect(palette).toBeVisible();
    await palette.locator("input").fill("uplink");
    await page.keyboard.press("Enter");
    await expect(palette).toHaveCount(0);
    await expect(page.locator("#uplink")).toBeInViewport({ timeout: 10_000 });
  });
});

test.describe("chaos mode", () => {
  test("full break → self-heal → resolved cycle", async ({ page }) => {
    test.slow();
    await gotoBooted(page);
    await page.locator(".sb-chaos").click();
    await expect(page.locator(".chaos-stamp")).toBeVisible({ timeout: 5_000 });
    await expect(page.locator(".heal-console")).toBeVisible({ timeout: 8_000 });
    await expect(page.locator(".chaos-resolved")).toBeVisible({ timeout: 12_000 });
    await expect(page.locator(".chaos-resolved")).toBeHidden({ timeout: 10_000 });
  });
});

test.describe("attestations", () => {
  test("renders all 31 certs and filters by issuer", async ({ page }) => {
    await gotoBooted(page);
    await page.locator("#attestations").scrollIntoViewIfNeeded();
    const cards = page.locator(".att");
    await expect(cards).toHaveCount(31);
    await page.locator(".att-filter", { hasText: "AWS" }).first().click();
    const filtered = await cards.count();
    expect(filtered).toBeGreaterThan(0);
    expect(filtered).toBeLessThan(31);
  });
});

test.describe("uplink + chrome", () => {
  test("contact links are wired correctly", async ({ page }) => {
    await gotoBooted(page);
    await page.locator("#uplink").scrollIntoViewIfNeeded();
    await expect(page.locator('#uplink a[href*="linkedin.com"]').first()).toBeVisible();
    await expect(page.locator('#uplink a[href*="github.com"]').first()).toBeVisible();
    await expect(page.locator('#uplink a[href^="tel:"]').first()).toBeVisible();
    await expect(page.locator('a[href^="mailto:sharmashubham33@gmail.com"]').first()).toBeAttached();
    await expect(page.locator('a[href$="/Shubham_Sharma_Resume.pdf"]').first()).toBeAttached();
  });

  test("log ticker is rendering ops lines", async ({ page }) => {
    await gotoBooted(page);
    await expect(page.locator(".logticker")).toBeVisible();
    await expect(page.locator(".logticker")).toContainText(/reconciler|awx|finops|ansible/i);
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("burger menu opens and navigates", async ({ page }) => {
    await gotoBooted(page);
    await page.locator(".sb-burger").click();
    await page.locator(".sb-nav.open a", { hasText: "Deploy History" }).click();
    await expect(page.locator("#deployments")).toBeInViewport({ timeout: 10_000 });
  });

  test("hero content visible on small screens", async ({ page }) => {
    await gotoBooted(page);
    await expect(page.locator(".hero-name")).toHaveCSS("opacity", "1");
    await expect(page.locator(".metric").first()).toBeVisible();
  });
});
