import fs from "fs";
import path from "path";

// Load env vars manually BEFORE other imports
const envPath = path.resolve(__dirname, "../.env.local");
console.log(`Loading env from ${envPath}`);
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const [key, ...values] = line.split("=");
    if (key && values.length > 0) {
      const value = values.join("=");
      // Simple quote removal
      const cleanValue = value.trim().replace(/^["']|["']$/g, "");
      process.env[key.trim()] = cleanValue;
    }
  });
} else {
  console.error("Env file not found!");
}

if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  console.error("ERROR: GOOGLE_GENERATIVE_AI_API_KEY is missing!");
  fs.appendFileSync(
    "debug-error.log",
    "ERROR: GOOGLE_GENERATIVE_AI_API_KEY is missing!\n"
  );
} else {
  console.log("GOOGLE_GENERATIVE_AI_API_KEY is present.");
}

async function main() {
  const { db } = await import("../firebase/admin");

  console.log("Fetching interviews...");
  try {
    const interviews = await db
      .collection("interviews")
      .orderBy("createdAt", "desc")
      .where("finalized", "==", true)
      .limit(10)
      .get();

    console.log(`Found ${interviews.docs.length} interviews.`);
    interviews.docs.forEach((doc) => {
      console.log(
        `ID: ${doc.id}, User: ${doc.data().userId}, Created: ${
          doc.data().createdAt
        }`
      );
    });
  } catch (error: any) {
    console.error("Error fetching latest interviews:", error);
    fs.appendFileSync(
      "debug-error.log",
      "Latest Interviews Error:\n" +
        JSON.stringify(error, null, 2) +
        "\n" +
        error.toString() +
        "\n\n"
    );
  }

  console.log("Fetching user interviews...");
  try {
    const userInterviews = await db
      .collection("interviews")
      .where("userId", "==", "test-user")
      .orderBy("createdAt", "desc")
      .get();
    console.log(`Found ${userInterviews.docs.length} user interviews.`);
  } catch (error: any) {
    console.error("Error fetching user interviews:", error);
    fs.appendFileSync(
      "debug-error.log",
      "User Interviews Error:\n" +
        JSON.stringify(error, null, 2) +
        "\n" +
        error.toString() +
        "\n\n"
    );
  }
}

main();
