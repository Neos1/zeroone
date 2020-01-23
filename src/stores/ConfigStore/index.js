import { observable, action, computed } from 'mobx';
import {
  fs, PATH_TO_CONFIG,
} from '../../constants/windowModules';

class ConfigStore {
  @observable config

  constructor() {
    this.getConfig();
  }

  @action
  getConfig() {
    try {
      this.config = JSON.parse(fs.readFileSync(PATH_TO_CONFIG));
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
    console.log(PATH_TO_CONFIG);
    config.minGasPrice = minGasPrice < 1 ? 1 : Number(minGasPrice);
    config.maxGasPrice = maxGasPrice < 1 ? 1 : Number(maxGasPrice);
    config.interval = interval < 10 ? 10 : Number(interval);
    config.gasLimit = Number(gasLimit);
    this.updateConfig();
  }

  @action
  updateConfig() {
    const { config } = this;
    console.log(PATH_TO_CONFIG);
    fs.writeFileSync(PATH_TO_CONFIG, JSON.stringify(config, null, '\t'), 'utf8');
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
