describe('로그인 테스트', () => {
  it('passes', () => {

    cy.visit('https://quostomizecard.site')

    cy.contains('span', '전체').click();
    
    cy.contains('div', '마이페이지').click();


    cy.get('input[placeholder="아이디를 입력해주세요"]').type('goood');

    cy.get('input[placeholder="비밀번호를 입력해주세요"]').type('abc12345@');

    cy.get('button[type="submit"]').click();

    cy.location("pathname").should("eq", "/home");
  })
})