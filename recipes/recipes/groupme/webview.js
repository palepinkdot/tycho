module.exports = Ferdi => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll('.badge-count:not(.ng-hide)').length;

    // set Ferdi badge
    Ferdi.setBadge(directMessages);
  };

  Ferdi.loop(getMessages);
};
