const fetch = require('node-fetch');
// https://github.com/tj/co
const co = require('co');

co(function* fetchTodo() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  const response = yield fetch(url);
  const todo = yield response.json();
  console.log(todo);
  // { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
});