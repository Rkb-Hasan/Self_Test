// Prevent the browser's default submission.
// Get the username and email.
// Get the selected country.
// Check whether the terms checkbox is checked.
// If username is empty → show an error and stop.
// If email is empty → show an error and stop.
// If no country is selected → show an error and stop.
// If terms aren't accepted → show an error and stop.
// If everything is valid, create a FormData object and log:
// username
// email
// country
// Log "Registration successful".

const form = document.querySelector("#registrationForm");

function handleSubmit(e) {
  e.preventDefault();

  const registrationData = new FormData(form);

  if (!registrationData.has("terms")) {
    console.error("Terms are not met!");
    return;
  }

  for (const [key, value] of registrationData) {
    if (!value) {
      console.error(`${key} is empty`);
      return;
    }
  }

  const formObj = Object.fromEntries(registrationData);
  const { username, email, country } = formObj;

  console.log(username, email, country);
  console.log("Registration successful");

  form.reset();
}

form.addEventListener("submit", handleSubmit);
