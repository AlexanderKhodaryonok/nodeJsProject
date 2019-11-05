const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class SortOfVino {
  constructor(title, price, img){
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid();
  }

  toJSON = () => {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id
    }
  } 

  save = async () => {
    const sorts = await SortOfVino.getAll();
    sorts.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'vino.json'),
        JSON.stringify(sorts),
        (error) => {
          if(error) {
            reject(error)
          } else {
            resolve();
          }
        }
      )
    })
  }

  static getAll = () => {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'vino.json'),
        'utf-8',
        (error, content) => {
          if(error) {
            reject(error)
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    })
  }
}

module.exports = SortOfVino;