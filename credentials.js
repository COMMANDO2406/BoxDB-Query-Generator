function credentialsUpdate() {
  const textArea = document.getElementById("textArea");

  const user = localStorage.getItem("user");
  const password = localStorage.getItem("password");
  const host = localStorage.getItem("host");
  const database = localStorage.getItem("database");

  if (user && password && host && database) {
    textArea.value = `Credentials \nUser: ${user}\nPassword: ${password}\nHost: ${host}\nDatabase: ${database}`;
  } else {
    console.log("No credentials found in localStorage.");
  }

  const credentials = prompt(
    "Enter credentials in format: USER PASSWORD HOST DATABASE"
  );

  if (credentials) {
    const [user, password, host, database] = credentials.split(" ");

    if (user && password && host && database) {
      alert(
        `User: ${user}\nPassword: ${password}\nHost: ${host}\nDatabase: ${database}`
      );

      localStorage.setItem("user", user);
      localStorage.setItem("password", password);
      localStorage.setItem("host", host);
      localStorage.setItem("database", database);

      textArea.value = `Credentials \nUser: ${user}\nPassword: ${password}\nHost: ${host}\nDatabase: ${database}`;
    } else {
      alert("Please enter all four values: USER PASSWORD HOST DATABASE");
    }
  }
}
