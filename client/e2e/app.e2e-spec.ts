import { EmployeesPage } from './app.po';

describe('employees App', () => {
  let page: EmployeesPage;

  beforeEach(() => {
    page = new EmployeesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
