class Question {
  id;

  caption;

  groupId;

  text;

  methodSelector;

  status;

  target;

  params;

  formula;

  /**
   * @constructor
   * @param {object} data data about question
   * @param {number} data.id question id
   * @param {number} data.groupId id of group, which can start voting for this question
   * @param {string} data.caption question caption
   * @param {string} data.text description of the question
   * @param {Array} data.params parameters which will be used after voting
   */
  constructor(id, question, web3) {
    const {
      groupId, caption, text, target, status, methodSelector, _formula, _parameters,
    } = question;
    this.id = id;
    this.caption = caption;
    this.groupId = groupId;
    this.text = text;
    this.methodSelector = methodSelector;
    this.status = status;
    this.target = target;
    this.params = this.setParameters(_parameters, web3);
    this.formula = this.setFormula(_formula);
  }

  // eslint-disable-next-line class-methods-use-this
  setFormula(rawFormula) {
    const f = rawFormula.map((text) => Number(text));
    const r = [];
    let ready = '( )';
    r.push(f[0] === 0 ? 'group( ' : 'user(0x298e231fcf67b4aa9f41f902a5c5e05983e1d5f8) => condition(');
    r.push(f[1] === 1 ? 'Owner) => condition(' : 'Custom) => condition(');
    r.push(f[2] === 0 ? 'quorum ' : 'positive');
    r.push(f[3] === 0 ? ' <= ' : ' >= ');

    if (f.length === 6) {
      r.push(`${f[4]} %`);
      r.push(f[5] === 0 ? ' of quorum)' : ' of all)');
    } else {
      r.push(`${f[4]} % )`);
    }
    const formula = r.join('');
    ready = ready.replace(' ', formula);
    return ready;
  }

  // eslint-disable-next-line class-methods-use-this
  setParameters(rawParams, web3) {
    const s = rawParams;
    const SIZE = 2;

    const res = s.reduce((p, c) => {
      if (p[p.length - 1].length === SIZE) {
        p.push([]);
      }

      p[p.length - 1].push(web3.utils.hexToUtf8(c));
      return p;
    }, [[]]);
    return res;
  }

  getParameters() {
    return this.params;
  }

  getFormula() {
    return this.formula;
  }
}

export default Question;
