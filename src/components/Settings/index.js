import React from 'react';
import Container from '../Container';
import Footer from '../Footer';
import Contractuploading from './entities/ContractUploading';
import NodeConnection from './entities/NodeConnection';
import SettingsBlock from './entities/SettingsBlock';

import styles from './Settings.scss';

const Settings = () => (
  <Container>
    <div className={styles.settings}>
      <NodeConnection />
      <Contractuploading />
      <SettingsBlock />
    </div>
    <Footer />
  </Container>
);

export default Settings;
