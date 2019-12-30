export default class Normalizer {
    constructor(idListIndex, entityObjectIndex, id = 'id') {
        this.idListIndex = idListIndex;
        this.entityObjectIndex = entityObjectIndex;
        this.id = id;
    }

    checkIdExistsInElement(element) {
        return this.id in element;
    }

    checkElementsAreValid(elements) {
        if (elements === null || elements === undefined || typeof elements !== 'object') {
            return false;
        }

        if (Array.isArray(elements)) {
            return elements.every(element => this.checkIdExistsInElement(element));
        }

        return this.checkIdExistsInElement(elements);
    }

    normalize(state, elements = [], append) {
        if (!this.checkElementsAreValid(elements)) {
            throw new Error('You should provide an array of object or a non null object with a valid identifier');
        }

        let elementList = elements;

        if (!Array.isArray(elements)) {
            elementList = [elements];
        }

        const ids = append ? state[this.idListIndex] : [];
        const newIds = elementList.map(element => element[this.id]).filter(id => !ids.includes(id));

        const entities = append ? state[this.entityObjectIndex] : {};
        const newEntities = elementList.reduce((acc, element) => {
            const id = element[this.id];
            return {
                ...acc,
                [id]: element,
            };
        }, {});

        return {
            ...state,
            [this.idListIndex]: [...ids, newIds],
            [this.entityObjectIndex]: { ...entities, ...newEntities },
        };
    }

    set(state, elements = []) {
        return this.normalize(state, elements, false);
    }

    append(state, elements = []) {
        return this.normalize(state, elements, true);
    }

    update(state, elements = []) {
        return this.normalize(state, elements, true);
    }

    delete(state, elementIds = []) {
        const ids = [...state[this.idListIndex]];
        const entities = { ...state[this.entityObjectIndex] };

        elementIds.forEach(id => {
            const index = ids.indexOf(id);

            if (index > -1) {
                ids.splice(index, 1);
            }

            if (id in entities) {
                delete entities[id];
            }
        });

        return {
            ...state,
            [this.idListIndex]: ids,
            [this.entityObjectIndex]: entities,
        };
    }
}
