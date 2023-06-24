# 45장. 프로미스

# 1. 비동기 처리를 위한 콜백 패턴의 단점

## 1. 콜백 헬

```jsx
// GET 요청을 위한 비동기 함수
const get = url => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버의 응답을 콘솔에 출력한다.
      console.log(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

// id가 1인 post를 취득
get('https://jsonplaceholder.typicode.com/posts/1');
/*
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere ...",
  "body": "quia et suscipit ..."
}
*/
```

- 비동기 함수 : 함수 내부에 비동기로 동작하는 코드를 포함한 함수
- 비동기 함수 호출 → 함수 내부의 비동기로 동작하는 코드가 완료되지 않았다 해도 기다리지 않고 즉시 종료
- 비동기 함수 내부의 비동기로 동작하는 코드 → 비동기 함수가 종료된 이후에 완료
- 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당 → 기대한 대로 동작하지 않음
    
    ```jsx
    let g = 0;
    
    // 비동기 함수인 setTimeout 함수는 콜백 함수의 처리 결과를 외부로 반환하거나
    // 상위 스코프의 변수에 할당하지 못한다.
    setTimeout(() => { g = 100; }, 0);
    console.log(g); // 0
    ```
    
    ```jsx
    // GET 요청을 위한 비동기 함수
    const get = url => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
    
      xhr.onload = () => {
        if (xhr.status === 200) {
          // ① 서버의 응답을 반환한다.
          return JSON.parse(xhr.response);
        }
        console.error(`${xhr.status} ${xhr.statusText}`);
      };
    };
    
    // ② id가 1인 post를 취득
    const response = get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(response); // undefined
    ```
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <input type="text">
      <script>
        document.querySelector('input').oninput = function () {
          console.log(this.value);
          // 이벤트 핸들러에서의 반환은 의미가 없다.
          return this.value;
        };
      </script>
    </body>
    </html>
    ```
    
    ```jsx
    let todos;
    
    // GET 요청을 위한 비동기 함수
    const get = url => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
    
      xhr.onload = () => {
        if (xhr.status === 200) {
          // ① 서버의 응답을 상위 스코프의 변수에 할당한다.
          todos = JSON.parse(xhr.response);
        } else {
          console.error(`${xhr.status} ${xhr.statusText}`);
        }
      };
    };
    
    // id가 1인 post를 취득
    get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(todos); // ② undefined
    ```
    
- 비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없고, 상위 스코프의 변수에 할당 불가
- 비동기 함수의 처리 결과에 대한 후속 처리 → 비동기 함수 내부에서 수행
- 비동기 함수를 범용적으로 사용하기 위해 비동기 함수에 비동기 처리 결과에 대한 후속 처리를 수행하는 콜백 함수를 전달하는 것이 일반적
- 필요에 따라 비동기 처리가 성공하면 호출될 콜백 함수와 비동기 처리가 실패하면 호출될 콜백 함수 전달 가능
    
    ```jsx
    // GET 요청을 위한 비동기 함수
    const get = (url, successCallback, failureCallback) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
    
      xhr.onload = () => {
        if (xhr.status === 200) {
          // 서버의 응답을 콜백 함수에 인수로 전달하면서 호출하여 응답에 대한 후속 처리를 한다.
          successCallback(JSON.parse(xhr.response));
        } else {
          // 에러 정보를 콜백 함수에 인수로 전달하면서 호출하여 에러 처리를 한다.
          failureCallback(xhr.status);
        }
      };
    };
    
    // id가 1인 post를 취득
    // 서버의 응답에 대한 후속 처리를 위한 콜백 함수를 비동기 함수인 get에 전달해야 한다.
    get('https://jsonplaceholder.typicode.com/posts/1', console.log, console.error);
    /*
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere ...",
      "body": "quia et suscipit ..."
    }
    */
    ```
    
- 콜백 헬(Callback Hell) : 콜백 함수를 통해 비동기 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가 비동기 처리 결과를 가지고 또다시 비동기 함수를 호출해야 한다면 콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상
    
    ```jsx
    // GET 요청을 위한 비동기 함수
    const get = (url, callback) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
    
      xhr.onload = () => {
        if (xhr.status === 200) {
          // 서버의 응답을 콜백 함수에 전달하면서 호출하여 응답에 대한 후속 처리를 한다.
          callback(JSON.parse(xhr.response));
        } else {
          console.error(`${xhr.status} ${xhr.statusText}`);
        }
      };
    };
    
    const url = 'https://jsonplaceholder.typicode.com';
    
    // id가 1인 post의 userId를 취득
    get(`${url}/posts/1`, ({ userId }) => {
      console.log(userId); // 1
      // post의 userId를 사용하여 user 정보를 취득
      get(`${url}/users/${userId}`, userInfo => {
        console.log(userInfo); // {id: 1, name: "Leanne Graham", username: "Bret",...}
      });
    });
    ```
    
    ```jsx
    get('/step1', a => {
      get(`/step2/${a}`, b => {
        get(`/step3/${b}`, c => {
          get(`/step4/${c}`, d => {
            console.log(d);
          });
        });
      });
    });
    ```
    

## 2. 에러 처리의 한계

```jsx
try {
  setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
  // 에러를 캐치하지 못한다
  console.error('캐치한 에러', e);
}
```

- 에러 → 호출자 방향으로 전파
- 콜 스택의 아래 방향(실행 중인 실행 컨텍스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향)으로 전파

# 2. 프로미스의 생성

- `Promise` 생성자 함수를 `new` 연산자와 함께 호출하여 프로미스 객체 생성
- ECMAScript 사양에 정의된 표준 빌트인 객체
- `Promise` 생성자 함수 → 비동기 처리를 수행할 콜백 함수를 인수로 전달받음
    - 콜백 함수는 `resolve` 와 `reject` 함수를 인수로 전달받음
    
    ```jsx
    // 프로미스 생성
    const promise = new Promise((resolve, reject) => {
      // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
      if (/* 비동기 처리 성공 */) {
        resolve('result');
      } else { /* 비동기 처리 실패 */
        reject('failure reason');
      }
    });
    ```
    
- 비동기 처리 성공 → 콜백 함수의 인수로 전달받은 `resolve` 함수 호출
- 비동기 처리 실패 → `reject` 함수 호출
    
    ```jsx
    // GET 요청을 위한 비동기 함수
    const promiseGet = url => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
    
        xhr.onload = () => {
          if (xhr.status === 200) {
            // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
            resolve(JSON.parse(xhr.response));
          } else {
            // 에러 처리를 위해 reject 함수를 호출한다.
            reject(new Error(xhr.status));
          }
        };
      });
    };
    
    // promiseGet 함수는 프로미스를 반환한다.
    promiseGet('https://jsonplaceholder.typicode.com/posts/1');
    ```
    
- 상태 정보
    - `pending` : 비동기 처리가 아직 수행되지 않은 상태, 프로미스가 생성된 직후 기본 상태
    - `fulfilled` : 비동기 처리가 수행된 상태(성공), `resolve` 함수 호출
    - `rejected` : 비동기 처리가 수행된 상태(실패), `reject` 함수 호출
- 비동기 처리 성공 → `resolve` 함수 호출 → 프로미스 `fulfilled` 상태로 변경
- 비동기 처리 실패 → `reject` 함수 호출 → 프로미스 `rejected` 상태로 변경
- 프로미스의 상태 → `resolve` 또는 `reject` 함수를 호출하는 것으로 결정
- `settled` 상태 : `fulfilled` 또는 `reject` 상태, `pending` 이 아닌 상태로 비동기 처리가 수행된 상태
    
    ```jsx
    // fulfilled된 프로미스
    const fulfilled = new Promise(resolve => resolve(1));
    ```
    
    ```jsx
    // rejected된 프로미스
    const rejected = new Promise((_, reject) => reject(new Error('error occurred')));
    ```
    
- 프로미스 : 비동기 처리 상태와 처리 결과를 관리하는 객체

# 3. 프로미스의 후속 처리 메서드

- 프로미스의 비동기 처리 상태가 변화하면 호속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출

## 1. `Promise.prototype.then`

- 첫 번째 콜백 함수 : 프로미스가 `fulfilled` 상태가 되면 호출
    - 콜백 함수는 프로미스의 비동기 처리 결과를 인수로 전달받음
    - 성공 처리 콜백 함수
- 두 번째 콜백 함수 : 프로미스가 `rejected` 상태가 되면 호출
    - 콜백 함수는 프로미스의 에러를 인수로 전달받음
    - 실패 처리 콜백 함수
    
    ```jsx
    // fulfilled
    new Promise(resolve => resolve('fulfilled'))
      .then(v => console.log(v), e => console.error(e)); // fulfilled
    
    // rejected
    new Promise((_, reject) => reject(new Error('rejected')))
      .then(v => console.log(v), e => console.error(e)); // Error: rejected
    ```
    

## 2. `Promise.prototype.catch`

- 한 개의 콜백 함수를 인수로 전달받음
- 콜백 함수는 프로미스가 `rejected` 상태인 경우만 호출
    
    ```jsx
    // rejected
    new Promise((_, reject) => reject(new Error('rejected')))
      .catch(e => console.log(e)); // Error: rejected
    ```
    
- `then(undefined, onRejected)` 과 동일하게 동작
    
    ```jsx
    // rejected
    new Promise((_, reject) => reject(new Error('rejected')))
      .then(undefined, e => console.log(e)); // Error: rejected
    ```
    

## 3. `Promise.prototype.finally`

- 한 개의 콜백 함수를 인수로 전달받음
- 콜백 함수는 프로미스의 성공 또는 실패와 상관없이 무조건 한 번 호출
- 공통적으로 수행해야 할 처리 내용이 있을 때 유용
    
    ```jsx
    new Promise(() => {})
      .finally(() => console.log('finally')); // finally
    ```
    
    ```jsx
    const promiseGet = url => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
    
        xhr.onload = () => {
          if (xhr.status === 200) {
            // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
            resolve(JSON.parse(xhr.response));
          } else {
            // 에러 처리를 위해 reject 함수를 호출한다.
            reject(new Error(xhr.status));
          }
        };
      });
    };
    
    // promiseGet 함수는 프로미스를 반환한다.
    promiseGet('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => console.log(res))
      .catch(err => console.error(err))
      .finally(() => console.log('Bye!'));
    ```
    

# 4. 프로미스의 에러 처리

- `then` 메서드의 두 번째 콜백 함수로 처리 가능
    
    ```jsx
    const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';
    
    // 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
    promiseGet(wrongUrl).then(
      res => console.log(res),
      err => console.error(err)
    ); // Error: 404
    ```
    
- 프로미스의 후속 처리 메서드 `catch` 를 사용해 처리 가능
    
    ```jsx
    const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';
    
    // 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
    promiseGet(wrongUrl)
      .then(res => console.log(res))
      .catch(err => console.error(err)); // Error: 404
    ```
    
- `catch` 메서드 호출 → 내부적으로 `then` 호출
    
    ```jsx
    const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';
    
    // 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
    promiseGet(wrongUrl)
      .then(res => console.log(res))
      .then(undefined, err => console.error(err)); // Error: 404
    ```
    
- `then` 메서드의 두 번째 콜백 함수 → 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못하고 코드가 복잡해짐 → 코드 가독성 떨어짐
    
    ```jsx
    promiseGet('https://jsonplaceholder.typicode.com/todos/1').then(
      res => console.xxx(res),
      err => console.error(err)
    ); // 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못한다.
    ```
    
- `catch` 메서드를 모든 `then` 메서드를 호출한 이후에 호출 → 비동기 처리에서 발생한 에러 뿐만 아니라 `then` 메서드 내부에서 발생한 에러까지 모두 캐치 가능
    
    ```jsx
    promiseGet('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => console.xxx(res))
      .catch(err => console.error(err)); // TypeError: console.xxx is not a function
    ```
    
- 에러 처리 → `catch` 메서드에서 하는 것을 권장

# 5. 프로미스 체이닝

```jsx
const url = 'https://jsonplaceholder.typicode.com';

// id가 1인 post의 userId를 취득
promiseGet(`${url}/posts/1`)
  // 취득한 post의 userId로 user 정보를 취득
  .then(({ userId }) => promiseGet(`${url}/users/${userId}`))
  .then(userInfo => console.log(userInfo))
  .catch(err => console.error(err));
```

- `then, catch, finally` 호속 처리 메서드는 언제나 프로미스를 반환 → 연속적으로 호출 가능
    - `then` : `promiseGet` 함수가 반환한 프로미스가 `resolve` 한 값, 콜백 함수가 반환한 프로미스
    - `then` : 첫 번째 `then` 메서드가 반환한 프로미스가 `resolve` 한 값, 콜백 함수가 반환한 값을 `resolve` 한 프로미스
    - `catch` : `promiseGet` 함수 또는 앞선 후속 처리 메서드가 반환한 프로미스가 `reject` 한 값, 콜백 함수가 반환한 값을 `resolve` 한 프로미스
    
    ```jsx
    const url = 'https://jsonplaceholder.typicode.com';
    
    (async () => {
      // id가 1인 post의 userId를 취득
      const { userId } = await promiseGet(`${url}/posts/1`);
    
      // 취득한 post의 userId로 user 정보를 취득
      const userInfo = await promiseGet(`${url}/users/${userId}`);
    
      console.log(userInfo);
    })();
    ```
    

# 6. 프로미스의 정적 메서드

## 1. `Promise.resolve / Promise.reject`

- 이미 존재하는 값을 래핑하여 프로미스를 생성하기 위해 사용
- `Promise.resolve` 메서드 → 인수로 전달받은 값을 `resolve` 하는 프로미스 생성
    
    ```jsx
    // 배열을 resolve하는 프로미스를 생성
    const resolvedPromise = Promise.resolve([1, 2, 3]);
    resolvedPromise.then(console.log); // [1, 2, 3]
    ```
    
    ```jsx
    const resolvedPromise = new Promise(resolve => resolve([1, 2, 3]));
    resolvedPromise.then(console.log); // [1, 2, 3]
    ```
    
- `Promise.reject` 메서드 → 인수로 전달받은 값을 `reject` 하는 프로미스 생성
    
    ```jsx
    // 에러 객체를 reject하는 프로미스를 생성
    const rejectedPromise = Promise.reject(new Error('Error!'));
    rejectedPromise.catch(console.log); // Error: Error!
    ```
    
    ```jsx
    const rejectedPromise = new Promise((_, reject) => reject(new Error('Error!')));
    rejectedPromise.catch(console.log); // Error: Error!
    ```
    

## 2. `Promise.all`

- 여러 개의 비동기 처리를 모두 병렬 처리할 때 사용
    
    ```jsx
    const requestData1 = () => new Promise(resolve => setTimeout(() => resolve(1), 3000));
    const requestData2 = () => new Promise(resolve => setTimeout(() => resolve(2), 2000));
    const requestData3 = () => new Promise(resolve => setTimeout(() => resolve(3), 1000));
    
    // 세 개의 비동기 처리를 순차적으로 처리
    const res = [];
    requestData1()
      .then(data => {
        res.push(data);
        return requestData2();
      })
      .then(data => {
        res.push(data);
        return requestData3();
      })
      .then(data => {
        res.push(data);
        console.log(res); // [1, 2, 3] ⇒ 약 6초 소요
      })
      .catch(console.error);
    ```
    
    ```jsx
    const requestData1 = () => new Promise(resolve => setTimeout(() => resolve(1), 3000));
    const requestData2 = () => new Promise(resolve => setTimeout(() => resolve(2), 2000));
    const requestData3 = () => new Promise(resolve => setTimeout(() => resolve(3), 1000));
    
    Promise.all([requestData1(), requestData2(), requestData3()])
      .then(console.log) // [ 1, 2, 3 ] ⇒ 약 3초 소요
      .catch(console.error);
    ```
    
    ```jsx
    Promise.all([
      new Promise((_, reject) => setTimeout(() => reject(new Error('Error 1')), 3000)),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Error 2')), 2000)),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Error 3')), 1000))
    ])
      .then(console.log)
      .catch(console.log); // Error: Error 3
    ```
    
- 인수로 전달받은 이터러블의 요소가 프로미스가 아닌 경우 `Promise.resolve` 메서드를 통해 프로미스로 래핑
    
    ```jsx
    Promise.all([
      1, // => Promise.resolve(1)
      2, // => Promise.resolve(2)
      3  // => Promise.resolve(3)
    ])
      .then(console.log) // [1, 2, 3]
      .catch(console.log);
    ```
    
    ```jsx
    // GET 요청을 위한 비동기 함수
    const promiseGet = url => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
    
        xhr.onload = () => {
          if (xhr.status === 200) {
            // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
            resolve(JSON.parse(xhr.response));
          } else {
            // 에러 처리를 위해 reject 함수를 호출한다.
            reject(new Error(xhr.status));
          }
        };
      });
    };
    
    const githubIds = ['jeresig', 'ahejlsberg', 'ungmo2'];
    
    Promise.all(githubIds.map(id => promiseGet(`https://api.github.com/users/${id}`)))
      // [Promise, Promise, Promise] => Promise [userInfo, userInfo, userInfo]
      .then(users => users.map(user => user.name))
      // [userInfo, userInfo, userInfo] => Promise ['John Resig', 'Anders Hejlsberg', 'Ungmo Lee']
      .then(console.log)
      .catch(console.error);
    ```
    

## 3. `Promise.race`

- 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받음
- 가장 먼저 `fulfilled` 상태가 된 프로미스의 처리 결과를 `resolve` 하는 새로운 프로미스 반환
    
    ```jsx
    Promise.race([
      new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
      new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
      new Promise(resolve => setTimeout(() => resolve(3), 1000)) // 3
    ])
      .then(console.log) // 3
      .catch(console.log);
    ```
    
- 프로미스가 `rejected` 상태가 되면 `Promise.all` 메서드와 동일하게 처리
- `Promise.race` 메서드에 전달된 프로미스가 하나라도 `rejected` 상태가 되면 에러를 `reject` 하는 새로운 프로미스 즉시 반환
    
    ```jsx
    Promise.race([
      new Promise((_, reject) => setTimeout(() => reject(new Error('Error 1')), 3000)),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Error 2')), 2000)),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Error 3')), 1000))
    ])
      .then(console.log)
      .catch(console.log); // Error: Error 3
    ```
    

## 4. `Promise.allSettled`

- 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받음
- 전달받은 프로미스가 모두 `settled` 상태가 되면 처리 결과를 배열로 반환
    
    ```jsx
    Promise.allSettled([
      new Promise(resolve => setTimeout(() => resolve(1), 2000)),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Error!')), 1000))
    ]).then(console.log);
    /*
    [
      {status: "fulfilled", value: 1},
      {status: "rejected", reason: Error: Error! at <anonymous>:3:54}
    ]
    */
    ```
    
- 프로미스가 `fulfilled` 상태인 경우 → 비동기 처리 상태를 나타내는 `status` 프로퍼티와 처리 결과를 나타내는 `value` 프로퍼티를 가짐
- 프로미스가 `rejected` 상태인 경우 → 비동기 처리 상태를 나타내는 `status` 프로퍼티와 에러를 나타내는 `reason` 프로퍼티를 가짐
    
    ```jsx
    [
      // 프로미스가 fulfilled 상태인 경우
      {status: "fulfilled", value: 1},
      // 프로미스가 rejected 상태인 경우
      {status: "rejected", reason: Error: Error! at <anonymous>:3:60}
    ]
    ```
    

# 7. 마이크로태스크 큐

```jsx
setTimeout(() => console.log(1), 0);

Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
```

- 프로미스의 후속 처리 메서드의 콜백 함수가 일시 저장
- 마이크로태스크 큐는 태스크 큐보다 우선순위가 높음
- 이벤트 루프는 콜 스택이 비면 먼저 마이크로태스크 큐에서 대기하고 있는 함수를 가져와 실행

# 8. `fetch`

- `XMLHttpRequest` 객체와 마찬가지로 HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API
- HTTP 요청을 전송할 URL, HTTP 요청 메서드, HTTP 요청 헤더, 페이로드 등을 설정한 객체 전달
    
    ```jsx
    const promise = fetch(url [, options])
    ```
    
- HTTP 응답을 나타내는 `Response` 객체를 래핑한 `Promise` 객체 반환
    
    ```jsx
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => console.log(response));
    ```
    
- `Response.prototype.json` 메서드 : `Response` 객체에서 HTTP 응답 몸체를 취득하여 역직렬화
    
    ```jsx
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      // response는 HTTP 응답을 나타내는 Response 객체이다.
      // json 메서드를 사용하여 Response 객체에서 HTTP 응답 몸체를 취득하여 역직렬화한다.
      .then(response => response.json())
      // json은 역직렬화된 HTTP 응답 몸체이다.
      .then(json => console.log(json));
      // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
    ```
    
    ```jsx
    const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';
    
    // 부적절한 URL이 지정되었기 때문에 404 Not Found 에러가 발생한다.
    fetch(wrongUrl)
      .then(() => console.log('ok'))
      .catch(() => console.log('error'));
    ```
    
- 기본적으로 404 Not Found나 500 Internal Server Error와 같은 HTTP 에러가 발생해도 에러를 `reject` 하지 않고 불리언 타입의 ok 상태를 `false` 로 설정한 `Response` 객체를 `resolve`
- 오프라인 등의 네트워크 장애나 CORS 에러에 의해 요청이 완료되지 못한 경우에만 프로미스를 `reject`
    
    ```jsx
    const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';
    
    // 부적절한 URL이 지정되었기 때문에 404 Not Found 에러가 발생한다.
    fetch(wrongUrl)
      // response는 HTTP 응답을 나타내는 Response 객체다.
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(todo => console.log(todo))
      .catch(err => console.error(err));
    ```
    
    ```jsx
    const request = {
      get(url) {
        return fetch(url);
      },
      post(url, payload) {
        return fetch(url, {
          method: 'POST',
          headers: { 'content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      },
      patch(url, payload) {
        return fetch(url, {
          method: 'PATCH',
          headers: { 'content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      },
      delete(url) {
        return fetch(url, { method: 'DELETE' });
      }
    };
    ```
    

## 1. `GET` 요청

```jsx
request.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then(todos => console.log(todos))
  .catch(err => console.error(err));
// {userId: 1, id: 1, title: "delectus aut autem", completed: false}
```

## 2. `POST` 요청

```jsx
request.post('https://jsonplaceholder.typicode.com/todos', {
  userId: 1,
  title: 'JavaScript',
  completed: false
}).then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then(todos => console.log(todos))
  .catch(err => console.error(err));
// {userId: 1, title: "JavaScript", completed: false, id: 201}
```

## 3. `PATCH` 요청

```jsx
request.patch('https://jsonplaceholder.typicode.com/todos/1', {
  completed: true
}).then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then(todos => console.log(todos))
  .catch(err => console.error(err));
// {userId: 1, id: 1, title: "delectus aut autem", completed: true}
```

## 4. `DELETE` 요청

```jsx
request.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then(todos => console.log(todos))
  .catch(err => console.error(err));
// {}
```
