
export function getNextCivilId() {
  return cy.request('GET', 'http://localhost:3000/get/all').then((response) => {
    let data;
    data = JSON.parse(response.body);
  

    const allIds = data
      .map(civil => Number(civil.ID))
      .filter(id => !isNaN(id));

    let maxId = 0;
    if (allIds.length > 0) {
      maxId = Math.max(...allIds);
    }

    return maxId + 1;
  });
}

export function getFixtureWithNextId(fixtureName) {
  return cy.fixture(fixtureName).then(data => {
    return getNextCivilId().then(nextId => {
      return { ...data, civilId: nextId.toString() };
    });
  });
}