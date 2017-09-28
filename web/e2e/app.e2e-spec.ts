import { FrontEndChallengePage } from './app.po';

describe('front-end-challenge App', () => {
  let page: FrontEndChallengePage;

  beforeEach(() => {
    page = new FrontEndChallengePage();
    page.navigateTo();
  });

  it('should contains an element h1 with text CADASTRE-SE', () => {
    expect<any>(page.getParagraphText()).toEqual('CADASTRE-SE');
  });

  it('should submit form and register a new employee when every fields are filled correctly', () => {
    page.getEmployeesCount().then(employeesCountBeforeAdd => {
        // adding new employee
        page.getFieldNome().sendKeys('Fulano');
        page.getFieldSobrenome().sendKeys('da Silva');
        page.getFieldParticipacao().sendKeys('10');
        
        page.getButtonEnviar().click().then(() => {

          page.getEmployeesCount().then(employeesCountAfterAdd => {
            expect(employeesCountAfterAdd).toBeGreaterThan(employeesCountBeforeAdd);
            expect(employeesCountAfterAdd).toEqual(employeesCountBeforeAdd + 1);
          });

        });
    })
  });

  it('should disable submit button when some form field is invalid', () => {
    page.getFieldParticipacao().sendKeys('101'); // greater than 100
    expect(page.getButtonEnviar().getAttribute('disabled')).not.toBeNull();
  });

  it('should enable submit button when all form fields are valid', () => {
    page.getFieldNome().sendKeys('Fulano');
    page.getFieldSobrenome().sendKeys('da Silva');
    page.getFieldParticipacao().sendKeys('10');
    expect(page.getButtonEnviar().getAttribute('disabled')).toBeNull();
  });

});
