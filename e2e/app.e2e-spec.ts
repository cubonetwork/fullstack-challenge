import { FrontEndChallengePage } from './app.po';

describe('front-end-challenge App', () => {
  let page: FrontEndChallengePage;

  beforeEach(() => {
    page = new FrontEndChallengePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
