// Run with reduced-motion emulation to avoid smooth-scroll targeting races in the Chrome controller.
import assert from 'node:assert/strict';
export async function checkPortfolio(tab) {
  const others = tab.playwright.locator('details.archived-projects');
  const summary = others.locator('summary');
  assert.equal(await others.getAttribute('open'), null, 'Others starts collapsed');
  assert.equal(await tab.playwright.getByText('AI Orchestrator', {exact:true}).isVisible(), false);
  assert.equal(await tab.playwright.getByRole('link', {name:'Blackstock Fund',exact:true}).count(), 0);
  for (const name of ['Mesh Research','PixelHUD','Songs','Athlet']) {
    assert.equal(await tab.playwright.getByRole('link', {name,exact:true}).isVisible(), true, name);
    assert.equal(await tab.playwright.getByRole('img', {name:`Screenshot of ${name}`,exact:true}).count(), 1);
  }
  await summary.click();
  await tab.playwright.domSnapshot();
  assert.notEqual(await others.getAttribute('open'), null);
  assert.equal(await tab.playwright.getByText('AI Orchestrator', {exact:true}).isVisible(), true);
  assert.equal(await others.getByRole('link', {name:'LifePathPlaner',exact:true}).isVisible(), true, 'last archive entry');
  assert.equal(await others.getByRole('link', {name:'Built an AI-CTO',exact:true}).count(), 0, 'paused site not linked');
  await summary.press('Enter');
  await tab.playwright.domSnapshot();
  assert.equal(await others.getAttribute('open'), null, 'keyboard closes Others');
  const filter = tab.playwright.locator('.project-filters').getByRole('button',{name:'Software Development',exact:true});
  await filter.click();
  assert.equal(await others.getAttribute('open'), null, 'filtered Others remains collapsed');
  await filter.press('Space');
  assert.equal(await filter.getAttribute('aria-pressed'), 'false');
  const metrics = await tab.playwright.evaluate(() => ({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
  assert.ok(metrics.scroll <= metrics.width, 'no horizontal overflow');
  return 'Passed: project selection, screenshots, collapsed archive, keyboard, unavailable links, filtering and overflow.';
}
