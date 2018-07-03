suite('Test@ stranici "About..."', () => {
  test('stranica doljna soderjat ss@lku na stranicu kontaktov', () => {
    assert($('a[href="/contact"]').length);
  });
});