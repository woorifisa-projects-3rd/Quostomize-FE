describe('혜택 변경 테스트', () => {
    it('passes', () => {
  
      cy.visit('https://quostomizecard.site')
  
      cy.contains('span', '전체').click();
      
      cy.contains('div', '마이페이지').click();
  
  
      cy.get('input[placeholder="아이디를 입력해주세요"]').type('w009982');
  
      cy.get('input[placeholder="비밀번호를 입력해주세요"]').type('Kj003852@');
  
      cy.get('button[type="submit"]').click();

      cy.contains('span', '전체').click();

      cy.contains('div', '카드 혜택 변경').click();

      cy.wait(500);

      cy.contains('div', '여행').click();

      cy.wait(500);

      cy.contains('p', '항공').click();

      cy.wait(500);

      cy.contains('button', '변경하기').click();

      cy.get('div.grid.grid-cols-3.text-center.text-white.w-full.h-full') // 부모 요소 선택
        .find('button.text-xl')
        .contains('1')
        .click();
      cy.wait(300);

      cy.get('div.grid.grid-cols-3.text-center.text-white.w-full.h-full') // 부모 요소 선택
        .find('button.text-xl')
        .contains('2')
        .click();
      cy.wait(300);

      cy.get('div.grid.grid-cols-3.text-center.text-white.w-full.h-full') // 부모 요소 선택
        .find('button.text-xl')
        .contains('3')
        .click();
      cy.wait(300);

      cy.get('div.grid.grid-cols-3.text-center.text-white.w-full.h-full') // 부모 요소 선택
        .find('button.text-xl')
        .contains('4')
        .click();
      cy.wait(300);

      cy.get('div.grid.grid-cols-3.text-center.text-white.w-full.h-full') // 부모 요소 선택
        .find('button.text-xl')
        .contains('5')
        .click();
      cy.wait(300);

      cy.get('div.grid.grid-cols-3.text-center.text-white.w-full.h-full') // 부모 요소 선택
        .find('button.text-xl')
        .contains('6')
        .click();
      
      cy.wait(1000);

      cy.contains('button', '확인').click();

      cy.wait(1000);

      cy.get('span.text-transparent.bg-clip-text.animate-gradient-text').contains('17');
    })
  })