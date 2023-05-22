// 의사 클래스 상속(pseudo classical inheritance) 패턴
var Animal = (function () {
  function Animal(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  Animal.prototype.eat = function () {
    return 'eat';
  };

  Animal.prototype.move = function () {
    return 'move';
  };

  return Animal;
}());

// Animal 생성자 함수를 상속하여 확장한 Bird 생성자 함수
var Bird = (function () {
  function Bird() {
    // Animal 생성자 함수에게 this와 인수를 전달하면서 호출
    Animal.apply(this, arguments);
  }

  // Bird.prototype을 Animal.prototype을 프로토타입으로 갖는 객체로 교체
  Bird.prototype = Object.create(Animal.prototype);
  // Bird.prototype.constructor을 Animal에서 Bird로 교체
  Bird.prototype.constructor = Bird;

  Bird.prototype.fly = function () {
    return 'fly';
  };

  return Bird;
}());

var bird = new Bird(1, 5);

console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird.eat());  // eat
console.log(bird.move()); // move
console.log(bird.fly());  // fly