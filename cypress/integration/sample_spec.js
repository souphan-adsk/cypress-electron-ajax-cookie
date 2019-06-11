describe('Cookie Test', function() {
	it('should send ajax cookie', function() {
		cy.visit('localhost:8880/get-cookie-test');
		cy.wait(500);
		cy.get('#ajax-cookie-value').invoke('text').then((value) => {
			expect(value).to.equal('test=OK')
		});
	});
})
