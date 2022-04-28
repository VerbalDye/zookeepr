const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');

test('create zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Daniel', id: 'fdiuhghougen' },
        zookeepers
    );

    expect(zookeeper.name).toBe('Daniel');
    expect(zookeeper.id).toBe('fdiuhghougen');
});

test('filter by query', () => {
    const originalZookeepers = [
        {
            id: '2',
            name: 'Cheryl',
            age: 31,
            favoriteAnimal: 'dog'
        },
        {
            id: '3',
            name: 'Kyle',
            age: 5,
            favoriteAnimal: 'shark'
        }
    ]

    const filteredZookeepers = filterByQuery({ age: 31 }, originalZookeepers);

    expect(filteredZookeepers.length).toEqual(1);
    expect(filteredZookeepers[0].name).toBe('Cheryl');
});

test('finds by id', () => {
    const originalZookeepers = [
        {
            id: '2',
            name: 'Cheryl',
            age: 31,
            favoriteAnimal: 'dog'
        },
        {
            id: '3',
            name: 'Kyle',
            age: 5,
            favoriteAnimal: 'shark'
        }
    ]

    const result = findById('3', originalZookeepers);

    expect(result.name).toBe('Kyle');
});

test('validates zookeeper', () => {
    const zookeeper1 = {
        id: '2',
        name: 'Cheryl',
        age: 31,
        favoriteAnimal: 'dog'
    }

    const invalidZookeeper1 = {
        id: '2',
        name: 'Cheryl',
        age: '31',
        favoriteAnimal: 'dog'
    }

    const invalidZookeeper2 = {
        id: '2',
        age: 31,
        favoriteAnimal: 'dog'
    }

    const result = validateZookeeper(zookeeper1);
    const result2 = validateZookeeper(invalidZookeeper1);
    const result3 = validateZookeeper(invalidZookeeper2);

    expect(result).toBe(true);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
})