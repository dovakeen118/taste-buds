import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const users = [
      {
        username: "dovakeen",
        email: "user@example.com",
        password: "password",
      },
      {
        username: "bahamut",
        email: "user1@example.com",
        password: "password",
      },
    ];

    let seededCount = 0;
    for (const user of users) {
      const userRecord = await User.query().findOne({ email: user.email });
      if (!userRecord) {
        if (await User.query().insert(user)) {
          seededCount++;
        }
      }
    }

    console.log(`${seededCount} users seeded to the database`);
  }
}

export default UserSeeder;
