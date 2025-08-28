function getElements(links, link_parent, element_parent, id = 0, span =0) {
    const elements = {};

    Object.keys(links).forEach((key) => {
        elements[key] = () => {
            if (id) {
                cy.get(element_parent).click({ force: true })
            }
            else {
                cy.getDataTest(element_parent).click({ force: true })
            }
            if(span == 1 ){
                return cy.get(link_parent).find(`a:contains(${key})`)
            }
            return cy.get(link_parent).find('span').contains(key)
        };
    });
    return elements;
}

export default getElements;
