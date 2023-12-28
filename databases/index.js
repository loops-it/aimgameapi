import { connect } from "mongoose";
import { database } from "../config";

export async function connect() {
  try {
    const data = await connect(
      `mongodb+srv://${database.user}:${database.password}@${database.host}/${database.database}?retryWrites=true&w=majority`
    );
    console.log(`-----Connected to ${database.database} successfully-----`);
  } catch (error) {
    console.log("db connection error ", { error });
  }
}
