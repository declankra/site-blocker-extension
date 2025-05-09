document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('block-form');
  const siteUrlInput = document.getElementById('site-url');
  const blockedList = document.getElementById('blocked-list');

  function renderList() {
    chrome.storage.sync.get({blockedSites: []}, (data) => {
      blockedList.innerHTML = '';
      data.blockedSites.forEach((site, index) => {
        const entry = document.createElement('div');
        entry.className = 'site-entry';
        const text = document.createElement('span');
        const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const labels = site.days.map(d => dayNames[d]).join(', ');
        text.textContent = `${site.url} (${labels})`;
        const btn = document.createElement('button');
        btn.textContent = 'Remove';
        btn.className = 'remove-btn';
        btn.addEventListener('click', () => {
          chrome.storage.sync.get({blockedSites: []}, (res) => {
            res.blockedSites.splice(index, 1);
            chrome.storage.sync.set({blockedSites: res.blockedSites}, renderList);
          });
        });
        entry.appendChild(text);
        entry.appendChild(btn);
        blockedList.appendChild(entry);
      });
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = siteUrlInput.value.trim();
    const days = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
      .map(el => parseInt(el.value));
    if (!url || days.length === 0) return;
    chrome.storage.sync.get({blockedSites: []}, (data) => {
      data.blockedSites.push({url, days});
      chrome.storage.sync.set({blockedSites: data.blockedSites}, () => {
        siteUrlInput.value = '';
        form.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
        renderList();
      });
    });
  });

  renderList();
});