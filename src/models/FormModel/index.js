import { extendObservable, action } from 'mobx';
import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import plugins from '../../utils/Validator';
import i18n from '../../i18n';
import { languages } from '../../constants';

class ExtendedForm extends Form {
  constructor(data) {
    const { hooks } = data || {};
    super();
    extendObservable(this, { loading: false });

    Object.keys(hooks).forEach((hook) => {
      this.addHook(hook, hooks[hook]);
    });

    this.addHook('onLangChange', () => {
      this.fields.forEach((field) => {
        field.set('placeholder', i18n.t(`fields:${field.label}`));
      });
    });
    window.ipcRenderer.on('change-language:confirm', (event, value) => {
      this.fireHook('onLangChangeHook');
      window.validator.useLang(languages[value]);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  plugins() {
    return { dvr: dvr(plugins.dvr) };
  }

  hooks() {
    const $this = this;
    return {
      onSubmit: (form) => {
        $this.setLoading(true);
        $this.fireHook('onSubmitHook', form);
        // Trigger hide mobile keyboard
        document.activeElement.blur();
      },
      onSuccess: (form) => {
        const promise = $this.fireHook('onSuccessHook', form);
        promise
          .finally(() => {
            $this.setLoading(false);
          });
      },
      onError: (form) => {
        $this.setLoading(false);
        $this.fireHook('onErrorHook', form);
      },
    };
  }

  @action addHook(hook, fn) {
    this[`${hook}Hook`] = fn;
  }

  @action setLoading(status) {
    this.loading = status;
  }

  fireHook(hook, form) {
    const fire = this[hook];
    if (fire && typeof fire === 'function') {
      return fire(form);
    }
    return null;
  }
}

export default ExtendedForm;
