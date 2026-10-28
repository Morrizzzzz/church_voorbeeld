(() => {
  'use strict';

  const viewerButton = document.querySelector('#load-viewer');
  const viewerShell = document.querySelector('#viewer-shell');

  if (viewerButton && viewerShell) {
    viewerButton.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://sketchfab.com/models/f79936b9f5e74db8adef79e24a5e3800/embed?autostart=1&ui_infos=0&ui_watermark=1&ui_help=1&ui_settings=0';
      iframe.title = 'Interactief 3D-model van het interieur van St Bartholomew the Less';
      iframe.allow = 'autoplay; fullscreen; xr-spatial-tracking';
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      viewerShell.replaceChildren(iframe);
    });
  }

  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function activateTab(nextTab) {
    tabs.forEach((tab) => {
      const active = tab === nextTab;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== nextTab.getAttribute('aria-controls');
    });
    nextTab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let targetIndex = index;
      if (event.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') targetIndex = 0;
      if (event.key === 'End') targetIndex = tabs.length - 1;
      activateTab(tabs[targetIndex]);
    });
  });

  const searchForm = document.querySelector('#story-search');
  const searchInput = document.querySelector('#story-query');
  const searchStatus = document.querySelector('#search-status');
  const searchableSections = Array.from(document.querySelectorAll('.searchable'));

  if (searchForm && searchInput && searchStatus) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = searchInput.value.trim().toLocaleLowerCase('nl');
      searchableSections.forEach((section) => section.classList.remove('search-hit'));

      if (query.length < 2) {
        searchStatus.textContent = 'Vul ten minste twee tekens in.';
        return;
      }

      const matches = searchableSections.filter((section) =>
        section.textContent.toLocaleLowerCase('nl').includes(query)
      );

      if (!matches.length) {
        searchStatus.textContent = `Geen onderdeel gevonden voor “${searchInput.value.trim()}”.`;
        return;
      }

      const firstMatch = matches[0];
      firstMatch.classList.add('search-hit');
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const title = firstMatch.dataset.searchTitle || firstMatch.querySelector('h2')?.textContent || 'onderdeel';
      searchStatus.textContent = `${matches.length} onderdeel${matches.length === 1 ? '' : 'en'} gevonden. Eerste resultaat: ${title}.`;
      window.setTimeout(() => firstMatch.classList.remove('search-hit'), 1600);
    });
  }

  const copyButton = document.querySelector('#copy-citation');
  const copyStatus = document.querySelector('#copy-status');
  const citation = 'artfletch (2021). St Bartholomew-the-Less Interior [3D-model]. Sketchfab. CC BY 4.0. https://sketchfab.com/3d-models/st-bartholomew-the-less-interior-f79936b9f5e74db8adef79e24a5e3800';

  if (copyButton && copyStatus) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(citation);
        copyStatus.textContent = 'De modelverwijzing is gekopieerd.';
      } catch {
        const field = document.createElement('textarea');
        field.value = citation;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        copyStatus.textContent = copied
          ? 'De modelverwijzing is gekopieerd.'
          : `Kopiëren lukte niet. Verwijzing: ${citation}`;
      }
    });
  }
})();
