export class CatalogArray extends Array {
  select(req) {
    function checkCondition(item) {
      let keys = Object.keys(fields);
      let method;
      let value;
      let meaning;
      
      for (let cond of keys) {
        method = fields[cond]['method'];
        value = fields[cond]['value'];
        meaning =item[fieldsCase[cond]];

        if (!functionCase[method](meaning, value)) {
          return false;
        }
      }

      return true;
    }

    const functionCase = {
      'starts': (item, str) => item.toLowerCase().startsWith(str),
      'ends': (item, str) => item.toLowerCase().endsWith(str),
      'contains': (item, str) => item.toLowerCase().includes(str),
      '=': (item, num) => item == num,
      '>': (item, num) => item > num,
      '<': (item, num) => item < num,
      '>=': (item, num) => item >= num,
      '<=': (item, num) => item <= num, 
    };

    const fieldsCase = {
      'name': 'Название',
      'price': 'Цена',
      'quantity': 'Количество',
      'description': 'Описание',
    };

    let criteria = req.split('&');

    let fields = {};

    criteria.forEach((item, index) => {
      criteria[index] = item.split('-');
    });

    for (let i of criteria) {
      if (i[0] == 'name' || i[0] == 'description') {
        fields[i[0]] = {'method': i[1], 'value': i[2].toLowerCase()};
      };
      if (i[0] == 'price' || i[0] == 'quantity') {
        let operator = i[1].match(/^\D+/);
        let number = i[1].match(/\d+/);
        fields[i[0]] = {'method': operator.join(''), 'value': +number}
      };
    };

    return this.filter((item) => checkCondition(item));
  }
}