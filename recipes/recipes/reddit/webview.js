const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const getMessages = () => {
    const elements = document.querySelectorAll(
      '#HeaderUserActions--Messages > a > span',
    );
    let count = 0;

    if (elements[0]) {
      count = Ferdi.safeParseInt(elements[0].textContent);
    }

    Ferdi.setBadge(count);
  };

  if (document.querySelectorAll('.promotedlink').length > 0) {
    for (const sponsoredLink of document.querySelectorAll('.promotedlink')) {
      if (
        sponsoredLink.parentElement &&
        sponsoredLink.parentElement.parentElement
      ) {
        sponsoredLink.parentElement.parentElement.style.display = 'none';
      }
    }
  }

  Ferdi.loop(getMessages);

  // Use CSS to hide Google Ads
  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));

  Ferdi.handleDarkMode(isEnabled => {
    // Open dropdown menu if not already open
    const menu = document.querySelector('#USER_DROPDOWN_ID');
    if (menu && menu.getAttribute('aria-expanded') === 'false') {
      menu.click();
    }

    setTimeout(() => {
      // Check if service is already in right mode
      const btn = document.querySelector('[role=menu] button button');
      const checked = btn && btn.getAttribute('aria-checked') === 'true';

      if (
        ((checked && !isEnabled) || (!checked && isEnabled)) && // Click the button to switch between modes
        btn
      ) {
        btn.click();
      }
    }, 50);
  });
};
