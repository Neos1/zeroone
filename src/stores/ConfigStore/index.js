import { observable, action, computed } from 'mobx';
import { fs, path, ROOT_DIR } from '../../constants/windowModules';

class ConfigStore {
  @observable config

  constructor() {
    this.getConfig();
  }

  @action
  getConfig() {
    try {
      this.config = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, './config.json')));
      this.updateValues(this.config);
    } catch {
      alert('Problems with config. Please check it.');
    }
  }

  @action
  updateValues({
    minGasPrice, maxGasPrice, interval, gasLimit,
  }) {
    const { config } = this;
    config.minGasPrice = minGasPrice < 1 ? 1 : minGasPrice;
    config.maxGasPrice = maxGasPrice < 1 ? 1 : maxGasPrice;
    config.interval = interval < 10 ? 10 : interval;
    config.gasLimit = gasLimit;
    this.updateConfig();
  }

  @action
  updateConfig() {
    const { config } = this;
    fs.writeFileSync(path.join(ROOT_DIR, './config.json'), JSON.stringify(config, null, '\t'), 'utf8');
  }

  @action
  addProject(project) {
    const { config } = this;
    config.projects.push(project);
    this.updateConfig();
  }

  @computed get MIN_GAS_PRICE() {
    const { config } = this;
    return config.minGasPrice * 1000000000;
  }

  @computed get MAX_GAS_PRICE() {
    const { config } = this;
    return config.maxGasPrice * 1000000000;
  }

  @computed get GAS_LIMIT() {
    const { config } = this;
    return config.gasLimit;
  }

  @computed get UPDATE_INTERVAL() {
    const { config } = this;
    return config.interval * 1000;
  }
}

export default ConfigStore;