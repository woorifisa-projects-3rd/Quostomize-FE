describe('투자 테스트', () => {
  beforeEach(() => {
    cy.visit('https://quostomizecard.site/login')

    cy.get('input[placeholder="아이디를 입력해주세요"]').type('w009982');

    cy.get('input[placeholder="비밀번호를 입력해주세요"]').type('Kj003852@');

    cy.get('button[type="submit"]').click();

    cy.contains('span', '투자').click();

  });

  it(`종목 추천 추가`, () => {
    cy.contains('button', '관심').click();

    cy.contains('button', '주식 추천').click();

    cy.get('.flex.justify-between.items-center.p-4.m-1').first().click(); // 추천종목 첫번째 클릭

    cy.contains('button', '관심 목록에 추가하기').click();
  })

  it(`종목 검색 및 추가`, () => {
    cy.get(`input[placeholder="관심 있는 주식을 검색해 보세요"]`).type(`sk하이닉스`).type('{enter}');;

    cy.get('div.flex.items-center.gap-3').contains('SK하이닉스').click(); // 검색종목 하이닉스 클릭

    cy.contains(`button`, `관심 목록 추가하기`).click();
  })

  it(`종목 삭제`, () => {
    cy.contains('button', '관심').click();

    cy.contains(`span`, '1').click();

    cy.contains('button', '삭 제').click();

    cy.contains(`span`, '1').click();

    cy.contains('button', '삭 제').click();
  })
})