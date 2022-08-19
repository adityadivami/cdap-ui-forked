const fetchConnectors = () => {
  return Promise.resolve([
    {
      artifact: { name: 'words', scope: '', version: 'ten' },
      category: 'hello',
      classname: 'yolo',
      description: 'hello',
      name: 'HeMan',
      type: 'js',
    },
    {
      artifact: { name: 'words', scope: '', version: 'ten' },
      category: 'hello',
      classname: 'yolo',
      description: 'hello',
      name: 'BatMan',
      type: 'js',
    },
    {
      artifact: { name: 'words', scope: '', version: 'ten' },
      category: 'hello',
      classname: 'yolo',
      description: 'hello',
      name: 'SuperMan',
      type: 'js',
    },
  ]);
};

export default fetchConnectors;
