module.exports = Ferdi => class Mattermost extends Ferdi {
  async validateUrl(url) {
    try {
      const resp = await window.fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return resp.status.toString().startsWith('2');
    } catch (error) {
      console.error(error);
    }

    return false;
  }
};
