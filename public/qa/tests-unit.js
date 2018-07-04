const fortune = require('../../lib/fortune');

const expect = require('chai').expect;

suite('Test@ pechenii-predskazanii', () => {
    test('getFortune() doljna vozvrashat predskazanie', () => {
        expect(typeof fortune.getFortune() === 'string');
    });
});
