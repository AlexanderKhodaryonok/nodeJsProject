const path = require('path');
const fs = require('fs');

const pathToFile = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {
    static async add (sort) {
        const card = await Card.fetch();     

        const idx = card.sorts.findIndex(s => s.id === sort.id);
        const condidate = card.sorts[idx];
        
        if (condidate) {
            condidate.count++;
            card.sorts[idx] = condidate;
        } else {
            sort.count = 1;
            card.sorts.push(sort)
        }

        card.price += +sort.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(pathToFile, JSON.stringify(card), error => {
                if(error) {
                    reject(error);
                } else {
                    resolve();
                }
            })
        })
    };

    static async fetch () {
        return new Promise((resolve, reject) => {
            fs.readFile(pathToFile, 'utf-8', (error, content) => {
                if (error) {
                    reject (error)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }

    static async remove(id) {
        const card = await Card.fetch();
        const idx = card.sorts.findIndex(s => s.id === id);
        const sort = card.sorts[idx];
        if(1 === sort.count) {
            card.sorts = card.sorts.filter(s => s.id !== id)
        } else {
            card.sorts[idx].count--;
        }

        card.price -= sort.price

        return new Promise((resolve, reject) => {
            fs.writeFile(pathToFile, JSON.stringify(card), error => {
                if(error) {
                    reject(error);
                } else {
                    resolve(card);
                }
            })
        })
    }
};

module.exports = Card;