# JavaScript `this`

## 1. Core Rule

For a **regular function**, `this` is determined mainly by **how the function is called**.

```js
function show() {
  console.log(this);
}
```

Don't ask:

> Where was the function defined?

Ask:

> How was the function called?

---

## 2. Object Method

```js
const user = {
  name: "Rakib",

  sayName() {
    console.log(this.name);
  },
};

user.sayName();
```

```text
this → user
this.name → user.name
```

`{}` creates an **object**, not a block scope.

---

## 3. Extracting a Method

```js
const fn = user.sayName;

fn();
```

The connection to `user` is lost.

It's now a **plain function call**.

```text
non-strict browser → this === window
strict mode        → this === undefined
```

Important:

> Functions don't get `window` because they're "inside window".
> A plain function call in non-strict browser code gets `window` as `this`.

---

## 4. Nested Regular Function

```js
const user = {
  name: "Rakib",

  sayName() {
    function inner() {
      console.log(this.name);
    }

    inner();
  },
};

user.sayName();
```

Two separate `this` values:

```text
sayName()
  this → user

inner()
  this → window (non-strict browser)
```

A regular nested function does **not automatically inherit** its outer function's `this`.

---

## 5. Arrow Function

Arrow functions have **no own `this`**.

They capture `this` from the surrounding scope.

```js
const user = {
  name: "Rakib",

  sayName() {
    const inner = () => {
      console.log(this.name);
    };

    inner();
  },
};
```

```text
sayName() → this = user
arrow     → captures that this
```

Therefore:

```text
Rakib
```

Remember:

> Arrow `this` is lexical; regular-function `this` depends on the call.

---

## 6. Lexical Scope ≠ Lexical `this`

These are different concepts.

```js
const user = {
  name: "Rakib",

  sayName() {
    const store = this;

    function inner() {
      console.log(store); // lexical variable
      console.log(this); // inner's own this
    }

    inner();
  },
};
```

`store` is captured through **lexical scope**.

`this` inside `inner()` is determined by **how `inner()` is called**.

---

## 7. Callback

Arrow callback:

```js
const user = {
  name: "Rakib",

  greet() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  },
};
```

Arrow captures `greet()`'s `this`.

Regular callback:

```js
setTimeout(function () {
  console.log(this);
}, 1000);
```

The regular function gets its **own `this`** according to its invocation rules.

---

## 8. DOM Event Listener

Regular function:

```js
button.addEventListener("click", function () {
  console.log(this === button);
});
```

Browser invokes the listener with:

```text
this → button
```

So:

```text
true
```

Arrow function:

```js
button.addEventListener("click", () => {
  console.log(this === button);
});
```

Arrow does not receive the element as its own `this`.

It captures surrounding `this`.

---

## 9. `call()`

```js
function introduce(age, city) {
  console.log(this.name, age, city);
}

introduce.call(user, 28, "Dhaka");
```

`call()`:

```text
sets this → user
passes arguments individually
executes immediately
```

It does **not** add `age` or `city` to `user`.

---

## 10. `apply()`

```js
introduce.apply(user, [28, "Dhaka"]);
```

Same `this` behavior as `call()`.

Difference:

```text
call(user, 28, "Dhaka")
apply(user, [28, "Dhaka"])
```

Both execute immediately.

---

## 11. `bind()`

```js
const boundFn = user.sayName.bind(user);
```

`bind()`:

```text
sets this → user
returns a NEW function
doesn't execute immediately
```

Then:

```js
boundFn();
```

### Important mistake to avoid

If you have:

```js
const user = {
  sayName() {},
};
```

This is valid:

```js
user.sayName.bind(user);
```

This is NOT:

```js
sayName.bind(user);
```

unless a standalone variable named `sayName` actually exists.

---

# `call` vs `apply` vs `bind`

```text
call()
→ set this
→ arguments individually
→ execute now

apply()
→ set this
→ arguments as array
→ execute now

bind()
→ set this
→ returns new function
→ execute later
```

---

# Final Mental Model

For every `this` question, first identify the function type:

```text
Regular function?
    ↓
How was it called?

Arrow function?
    ↓
Where did it capture this from?
```

Then remember:

```text
obj.method()          → this = obj

const fn = obj.method
fn()                   → plain call

arrow function        → lexical this

function callback()   → its own this rules

call(obj, ...)        → this = obj, execute now

apply(obj, [...])     → this = obj, execute now

bind(obj)             → this = obj, execute later
```
