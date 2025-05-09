chrome.storage.sync.get({blockedSites: []}, (data) => {
  const sites = data.blockedSites;
  const hostname = window.location.hostname;
  const today = new Date().getDay();
  for (const site of sites) {
    if (hostname.includes(site.url) && site.days.includes(today)) {
      document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;"><h1>This site is blocked today.</h1></div>';
      break;
    }
  }
});