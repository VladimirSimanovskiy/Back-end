export class TextHandler {
  constructor(text) {
    this.text = text;
  }

  capitalize() {
    if (this.text && this.text.trim().length) {
      return this.text.trim()[0].toUpperCase() + this.text.trim().slice(1).toLowerCase();
    }
    return this.text;
  }

  punctuation() {
    if (this.text && this.text.trim().length) {
      let notSpace = this.text.split(' ').filter(item => item);

      for (let i = 0; i < notSpace.length; i++) {
        if (',.!?;:'.includes(notSpace[i])) {
          notSpace.splice(i - 1, 2, notSpace[i - 1] + notSpace[i]);
          continue;
        }
        for (let j = 0; j < notSpace[i].length - 1; j++) {
          if (',.!?;:'.includes(notSpace[i][j])) {
            notSpace.splice(i, 1, notSpace[i].slice(0, j + 1), notSpace[i].slice(j + 1));
            i--;
          }
        }
      }
      return notSpace.join(' ');
    }
    return this.text;
  }

  wordCounter() {
    if (this.text && this.text.trim().length) {
      let correctSentence = this.punctuation();
      return correctSentence.split(' ').length;
    }
    return 0;
  }

  wordsFrequency() {
    if (this.text && this.text.trim().length) {
      let words = {};
      let correctSentence  = this.punctuation();

      for (let word of correctSentence.toLowerCase().split(' ')) {
        if (',.!?;:'.includes(word.at(-1))) {
          (Object.keys(words).includes(word.slice(0, -1))) ? words[word.slice(0, -1)]++ : words[word.slice(0, -1)] = 1;
        } else {
          (Object.keys(words).includes(word)) ? words[word]++ : words[word] = 1;
        }
      }
      return words;
    }
  }
}