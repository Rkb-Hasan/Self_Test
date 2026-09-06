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

// =======================================

function Me(name) {
  this.name = name;
}

Me.prototype.role = "live";

// newMe inherit the protoType of contructor Me; Me inherit inherit the prototype of Object
const newMe = new Me("rakib");
// shadows the prototype role
newMe.role = "enjoy";
console.log(newMe);
// but Me prototype role exists
console.log(Me.prototype.role);
console.log(Me);

// ===========inheritance==================
function Airmen(name) {
  this.name = name;
}

// writes into the proto of Airmen contruscor
Airmen.prototype.basic = function () {
  console.log(this.name + "Parade");
};
// newA inherits proto from Airmen
const newA = new Airmen("chodu");

function Officer(name, role) {
  // call the Airmen constructor to set the name property instead of writing again
  Airmen.call(this, name);
  this.role = role;
}

// rewrite the Ofiicer prototype with Airmen proto
Officer.prototype = Object.create(Airmen.prototype);
const newO = new Officer("modhu", "adjutant");
// look for basic in officer proto not found
// further look airmen proto found
newO.basic();

console.log(Officer);
