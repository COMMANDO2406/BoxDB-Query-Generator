function credentialsUpdate() {
  const textArea = document.getElementById("textArea");
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
