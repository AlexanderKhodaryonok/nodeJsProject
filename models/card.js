const path = require('path');
const fs = require('fs');

const pathToFile = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {
    static add = async (sort) => {
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

    static fetch = async () => {
        return  new Promise((resolve, reject) => {
            fs.readFile(pathToFile, 'utf-8', (error, content) => {
                if (error) {
                    reject (error)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
};

module.exports = Card;