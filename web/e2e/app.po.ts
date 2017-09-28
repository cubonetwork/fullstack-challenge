import { browser, element, by } from 'protractor';

export class FrontEndChallengePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getFieldNome() {
    return element(by.name('nome'));
  }

  getFieldSobrenome() {
    return element(by.name('sobrenome'));
  }

  getFieldParticipacao() {
    return element(by.name('participacao'));
  }

  getButtonEnviar() {
    return element(by.id('btnEnviar'));
  }

  getEmployeesCount() {
    return element.all(by.css('table tbody tr')).count();
  }
}
