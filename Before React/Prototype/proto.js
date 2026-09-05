const userMethods = {
  sayName() {
    console.log(this.name);
  },
};

const user1 = Object.create(userMethods);
const user2 = Object.create(userMethods);

// these objects have sayname methods in their prototype which they get from userMethods
// the general methods like toString() they get from prototype chain of userMethods
user1.name = "Rakib";
user2.name = "Hasan";

user1.sayName();
user2.sayName();

// check if the obj itself has the property
console.log(user1.hasOwnProperty("name"));
console.log(user1.hasOwnProperty("sayName"));
// includes inherited property chack also
console.log("sayName" in user1);

// a null obj with no default prototype
const fresh = Object.create(null, {
  test: {
    value: "HI",
  },
});
console.log(fresh);
