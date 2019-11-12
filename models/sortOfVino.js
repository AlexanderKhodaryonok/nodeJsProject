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
  };

  static async update(sort) {
    const sorts = await   SortOfVino.getAll();

    const idx = sorts.findIndex(s => s.id === sort.id);
    sorts[idx] = sort;
    
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

  async save () {
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

  static getById = async (id) => {
    const sorts = await SortOfVino.getAll();
    return sorts.find(s => s.id === id);
  }
}

module.exports = SortOfVino;