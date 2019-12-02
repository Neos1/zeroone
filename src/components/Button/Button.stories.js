import React from 'react';
import Button from './Button';
import { BackIcon, AddIcon, EyeIcon } from '../Icons';


export default { title: 'Button' };

export const defaultButton = () => (
  <Button>
  hello
  </Button>
);

export const whiteButton = () => (
  <Button theme="white">
  hello
  </Button>
);

export const iconButton = () => (
  <Button
    icon={<AddIcon />}
  >
  hello
  </Button>
);

export const iconTopButton = () => (
  <Button
    theme="white"
    icon={<AddIcon />}
    iconTop
  >
  hello
  </Button>
);

export const linkButton = () => (
  <Button
    theme="link"
  >
  hello
  </Button>
);

export const BackButton = () => (
  <Button
    icon={<BackIcon />}
    theme="back"
    size="noborder"
  >
  hello
  </Button>
);

export const addProjectButton = () => (
  <Button
    icon={<AddIcon />}
    theme="addproject"
  >
  Добавить проект
  </Button>
);

export const projectButton = () => (
  <Button
    theme="project"
  >
  hello
  </Button>
);

export const showSeed = () => (
  <Button
    theme="showseed"
    icon={<EyeIcon />}
  >
  hello
  </Button>
);
