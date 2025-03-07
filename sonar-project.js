const scanner = require("sonarqube-scanner").default;

scanner(
  {
    serverUrl: "http://localhost:9000", // Tera SonarQube server
    token: "sqp_a6d6bb9b8369aa3545771bef5cb3a749ec245f6f", // Upar jo token mila, yaha paste kar
    options: {
      "sonar.projectKey": "voip-frontend-v1", // Dashboard pe jo key diya
      "sonar.projectName": "voip-frontend-v1", // Dashboard pe jo naam diya
      "sonar.sources": "src", // Tera backend code ka folder
      "sonar.exclusions": "**/*.test.js,**/node_modules/**,.env",
      "sonar.sourceEncoding": "UTF-8", // Encoding issues se bachne ke liye
    },
  },
  () => process.exit()
);
