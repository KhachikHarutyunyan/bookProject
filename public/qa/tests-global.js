suite('Global Tests', () => {
  test('U dannoi stranici dopustim@ zagolovok', () => {
    assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'TODO');
  });
});


