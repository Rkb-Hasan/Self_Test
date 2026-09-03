const button = document.querySelector("button");
// object curly baraces dont create a block scope
const user = {
  name: "Rakib",

  sayName: function () {
    // console.log(this.name);
  },
};

const fn = user.sayName;
user.sayName();
fn();

// this in lexical scope-------------------------

const user1 = {
  name: "Rakib",

  sayName() {
    const store = this;
    // console.log(this); //this is user1 here
    function inner() {
      //   console.log(store); //store got the value of sayName's this, and inner accesses store through lexical scope.
      //   console.log(this.name); //this is window here
    }

    inner(); //in plain call thsi is window
  },
};

user1.sayName();

// -this in arrow-------------------------------------------------------------------------------

// Arrow functions have no own this; they lexically capture this from their surrounding context.

const user2 = {
  name: "Rakib async",

  greet() {
    setTimeout(() => {
      //   console.log(this.name);
    }, 1000);
  },
};

user2.greet();

button.addEventListener("click", () => {
  //   console.log(this); //window
});
button.addEventListener("click", function () {
  //   console.log(this === button); //button
});

// ==================================================================================================================================

// call()
// → Set this + give arguments individually + execute NOW

// apply()
// → Set this + give arguments as an array + execute NOW

// bind()
// → Set this + optionally prepare arguments + DON'T execute
// → Get a NEW function

// call()=======================================================
const user3 = {
  name: "call",
};

function sayName() {
  //   console.log(this.name);
}
// plain call in global context
// sayName();
// says to bind this with user3
// sayName.call(user3);

const user4 = {
  name: "call with arrow",
};

const sayNameARR = () => {
  // this is window here
  //   console.log(this);
  //   console.log(this.name);
};
// call, apply, and bind can control this for regular functions, but they cannot change this for arrow functions.
sayNameARR.call(user4);

// bind()=========================================================================
const user5 = {
  name: "Rakib bind",

  sayName() {
    // console.log(this.name, "bind example");
  },
};

const fnUnBound = user5.sayName;
const fnBound = user5.sayName.bind(user5);

fnUnBound(); // loses user5 as this because it denoted to the sayName func but executed as plain call without user5

// unlike call() that executes immediately
// bind() Creates a new function whose this is permanently bound to user. Don't execute it yet unless called
fnBound();

// apply()===================================================
const user6 = {
  name: "Rakib apply",
};

function introduce(age, city) {
  console.log(this.name, age, city);
}

introduce.call(user, 28, "Dhaka");

introduce.apply(user, [28, "Dhaka"]);
