async page => {
  const target = new URL(page.url());
  if (!['http:', 'https:'].includes(target.protocol) || !['localhost', '127.0.0.1', '[::1]'].includes(target.hostname)) {
    throw new Error('La sesión debe estar en un servidor HTTP local de loopback.');
  }
  const base = target.origin;
  const results = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const check = async (name, test) => {
    try { await test(); results.push(`PASS ${name}`); }
    catch (error) { results.push(`FAIL ${name}: ${error.message}`); }
  };
  const home = async (width = 390) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
  };
  await check('S1 encabezado sin imágenes', async () => {
    await home();
    await page.locator('img').evaluateAll(images => images.forEach(img => img.style.visibility = 'hidden'));
    const heading = page.locator('main h1');
    assert((await heading.innerText()).includes('Suspensiones de Aire y Muelles'), 'H1 no explica el servicio con texto');
    assert(await heading.isVisible(), 'H1 oculto');
    assert(await page.locator('img[src*="sebasam-logo-light"]').count() === 1, 'Logo no conservado');
  });
  await check('S2 WhatsApp junto a propuesta, sin duplicación', async () => {
    for (const width of [320, 390, 768, 1440]) {
      await home(width);
      const links = page.locator('a[href="https://wa.me/525536239346"]');
      assert(await links.count() === 5, `${width}: cambió cantidad WhatsApp`);
      const primary = page.locator('.hero__copy a[href="https://wa.me/525536239346"]');
      assert(await primary.count() === 1, `${width}: WhatsApp separado de propuesta`);
      const box = await primary.boundingBox();
      assert(box && box.y >= 72 && box.y + box.height <= 844, `${width}: CTA fuera del primer viewport`);
    }
  });
  await check('S3 cinco servicios por desplazamiento vertical', async () => {
    for (const width of [320, 390, 768, 1440]) {
      await home(width);
      const cards = page.locator('#servicios article');
      assert(await cards.count() === 5, 'No hay cinco servicios');
      assert(JSON.stringify(await cards.locator('h3').allTextContents()) === JSON.stringify(['Alineación a ejes traseros', 'Brio a muelles', 'Refuerzos', 'Soldadura', 'Ajuste de quinta rueda']), 'Cambió contenido de servicios');
      for (const card of await cards.all()) {
        // Scroll vertical exclusivamente: no usar scrollIntoView que oculta un carril horizontal.
        await card.evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'instant' }));
        const box = await card.boundingBox();
        assert(box && box.x >= 0 && box.x + box.width <= width + 1, `${width}: tarjeta exige desplazamiento horizontal`);
        assert(await card.isVisible(), 'Tarjeta oculta');
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth === innerWidth), `${width}: desbordamiento`);
    }
  });
  await check('S4 idioma público es-MX', async () => {
    for (const route of ['/', '/muelles', '/info', '/404.html']) {
      await page.goto(base + route);
      assert(await page.locator('html').getAttribute('lang') === 'es-MX', `${route}: lang incorrecto`);
      const copy = await page.locator('body').innerText() + await page.locator('meta[name="description"]').getAttribute('content');
      assert(!/(notás|acercate|Mandá|necesitás|Cotizá|empezá|buscás|Volvé|consultá)/u.test(copy), `${route}: voseo público`);
    }
  });
  const keyboard = async (reducedMotion, focusRequired) => {
    await page.emulateMedia({ reducedMotion });
    await home();
    await page.keyboard.press('Tab');
    assert(await page.locator('.skip-link').evaluate(el => el === document.activeElement), 'Primer Tab no es salto');
    await page.keyboard.press('Tab');
    assert(await page.locator('.brand-link').evaluate(el => el === document.activeElement), 'Segundo Tab no es marca');
    await page.keyboard.press('Tab');
    const toggle = page.locator('#nav-toggle');
    assert(await toggle.evaluate(el => el === document.activeElement), 'Tercer Tab no es menú');
    if (focusRequired) {
      assert(await page.getByRole('checkbox', { name: 'Menú de navegación', exact: true }).count() === 1, 'Nombre no describe ambos estados');
      assert(await page.locator('.nav-toggle-label').evaluate(el => {
        const style = getComputedStyle(el);
        return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 3 && style.outlineColor !== 'rgba(0, 0, 0, 0)';
      }), 'Foco no perceptible en control visible');
    }
    await page.keyboard.press('Space');
    assert(await toggle.isChecked(), 'Espacio no abre');
    assert(await page.locator('#site-navigation').isVisible(), 'Navegación oculta al abrir');
    await page.waitForFunction(() => getComputedStyle(document.querySelectorAll('.nav-toggle-label__bar')[1]).opacity === '0');
    const bars = await page.locator('.nav-toggle-label__bar').evaluateAll(els => els.map(el => ({ transform: getComputedStyle(el).transform, opacity: getComputedStyle(el).opacity })));
    assert(bars[0].transform !== 'none' && bars[1].opacity === '0' && bars[2].transform !== 'none', 'No conserva X');
    const expected = ['/muelles', '/#servicios', '/#unidades', '/#refacciones', '/#contacto', 'https://wa.me/525536239346'];
    for (const href of expected) {
      await page.keyboard.press('Tab');
      assert(await page.evaluate(() => document.activeElement.getAttribute('href')) === href, `Orden Tab incorrecto: ${href}`);
    }
    for (let i = 0; i < expected.length; i++) await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Space');
    assert(!await toggle.isChecked() && !await page.locator('#site-navigation').isVisible(), 'Espacio no cierra');
    await page.keyboard.press('Tab');
    assert(!await page.evaluate(() => !!document.activeElement.closest('#site-navigation')), 'Enlace cerrado recibe Tab');
  };
  await check('S6 teclado y foco normal/reducido', async () => {
    await keyboard('no-preference', true);
    await keyboard('reduce', true);
  });
  await check('S5 PRESERVE contenido y estados con movimiento reducido', async () => {
    await keyboard('reduce', false);
    for (const card of await page.locator('#servicios article').all()) {
      await card.scrollIntoViewIfNeeded();
      assert(await card.evaluate(el => getComputedStyle(el).opacity === '1' && getComputedStyle(el).visibility === 'visible'), 'Servicio oculto con movimiento reducido');
    }
  });
  await check('S4 PRESERVE rutas, contactos y metadatos', async () => {
    const routes = [
      ['/', 'SEBASAM | Servicio de Muelles y Suspensión de Aire en Iztapalapa', 'Servicio de muelles, refacciones y suspensión de aire en Iztapalapa, CDMX. SEBASAM con 30 años de experiencia. Contacto por WhatsApp, teléfono o Google Maps.', [5, 3, 3]],
      ['/muelles', 'Servicio de Muelles en CDMX | SEBASAM', 'Servicio de muelles para camionetas, camiones y remolques en Iztapalapa, CDMX. Brio a muelles, refuerzos, cambio de tipo de suspensión y refacciones. SEBASAM, 30 años de experiencia.', [5, 3, 3]],
      ['/info', 'Información de contacto | SEBASAM', 'Tarjeta pública de SEBASAM con WhatsApp, teléfono, dirección, horarios y Google Maps.', [1, 1, 1]],
    ];
    for (const [route, title, description, counts] of routes) {
      const response = await page.goto(base + route);
      assert(response.status() === 200, `${route}: respuesta no exitosa`);
      assert(await page.title() === title, `${route}: título alterado`);
      assert(await page.locator('meta[name="description"]').getAttribute('content') === description, `${route}: descripción alterada`);
      assert(await page.locator('link[rel="canonical"]').getAttribute('href') === 'https://www.sebasam.online' + route, `${route}: canónica alterada`);
      for (const [index, href] of ['https://wa.me/525536239346', 'tel:+525556007675', 'https://maps.app.goo.gl/mPve4xkMJr73Lxya8'].entries()) {
        assert(await page.locator(`a[href="${href}"]`).count() === counts[index], `${route}: destino/cantidad alterados ${href}`);
      }
      assert(await page.locator('a[href="tel:+525536239346"]').count() === 0, 'Acción telefónica nueva fuera de #39');
      assert(await page.locator('meta[property="og:locale"]').getAttribute('content') === 'es_MX', 'Locale social alterado');
    }
    await page.goto(base + '/muelles');
    const faq = page.locator('.faq-item').nth(1);
    await faq.locator('summary').click();
    assert(await faq.getAttribute('open') !== null && (await faq.innerText()).includes('si notas altura baja'), 'FAQ no abre o conserva voseo');
    await page.goto(base + '/404.html');
    assert(await page.locator('main nav a').evaluateAll(els => els.map(el => el.getAttribute('href')).join(',')) === '/,/info,/muelles', 'Rutas 404 alteradas');
    await home(1440);
    assert(await page.locator('#site-navigation').isVisible(), 'Menú escritorio oculto');
    await page.getByRole('link', { name: 'Servicios', exact: true }).click();
    assert(page.url().endsWith('/#servicios'), 'Acción navegación alterada');
  });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const verdict = results.some(result => result.startsWith('FAIL')) ? 'ISSUE_39_FAILED' : 'ISSUE_39_OK';
  return results.join('\n') + '\n' + verdict;
}
