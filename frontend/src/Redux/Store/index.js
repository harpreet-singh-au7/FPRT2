const cards = [
    {
      id: 'todo_1',
      title: 'Complete making the frontend',
    },
    {
      id: 'todo_2',
      title: 'Deploy the App',
    },
    {
      id: 'todo_3',
      title: 'Push code to github',
    },
  ];
  
  const data = {
    lists: {
      'list-1': {
        id: 'list-1',
        title: 'Todo',
        cards,
      },
      'list-2': {
        id: 'list-2',
        title: 'In Progress',
        cards: [],
      },
      'list-3': {
        id: 'list-3',
        title: 'Completed',
        cards: [],
      },
    },
    Ids: ['list-1', 'list-2','list-3'],
  };
  
  export default data;