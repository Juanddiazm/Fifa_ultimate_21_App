//Import axios
import axios from "axios";
//Import MongoClient
import { MongoClient, Db } from "mongodb";

const url = "mongodb://database/fifa_ultimate_21";
const dataBaseName = "fifa_ultimate_21";
const collectionName = "player";

//Get petition using axios
export let extractData = async () => {
  try {
    let mongoClient = await connect();
    let db = mongoClient.db(dataBaseName);

    let data = await firtsCall();
    let totalResults = Number(data.totalResults);
    console.log("TotalResult:", totalResults);
    let countPlayer = await getNumberDocuments(db);

    // If you want all pages comment the next line and un-comment the next one
    let totalPages = 10;
    //let totalPages = data.totalPages;

    if (totalResults > countPlayer) {
      // Drop collection when is not all players
      db.collection(collectionName).drop();
      console.log("Extracting data from EA...");
      // iterate using totalPages
      for (let i = 1; i <= totalPages; i++) {
        let items = await getItemsForPage(i);
        // iterate using items for each
        addItemsInDb(items, db);
      }
      console.log("Data extracted successfully!");
    } else {
      console.log("Data already extracted!");
    }
    mongoClient.close();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

let connect = async () => {
  return await MongoClient.connect(url);
};

// Insert one document to collection, using connectionObject
let insertOne = async (db: Db, document: any) => {
  try {
    db.collection(collectionName).insertOne(document);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

let insertMany = async (db: Db, documentList: []) => {
  try {
    db.collection(collectionName).insertMany(documentList);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
// Find all documents in collection
let findAll = async (db: Db) => {
  try {
    let cursor = db.collection(collectionName).find();
    let items = await cursor.toArray();
    console.log(items);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

let getNumberDocuments = async (db: Db) => {
  try {
    let cursor = db.collection(collectionName).find();
    let items = await cursor.toArray();
    let count = items.length;
    console.log("The number of documents is : ", count);
    return count;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

let firtsCall = async () => {
  try {
    let response = await axios.get(
      "https://www.easports.com/fifa/ultimate-team/api/fut/item?page=1"
    );
    let data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

let getItemsForPage = async (page: number) => {
  try {
    let response = await axios.get(
      "https://www.easports.com/fifa/ultimate-team/api/fut/item?page=" + page
    );
    let data = response.data;
    let items = data.items;
    console.log("Extracting page:", page);
    return items;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Function named addItemsInDb, recive a items array and a db
let addItemsInDb = (items: any[], db: Db) => {
  let playerList: any = [];
  items.forEach((item: any) => {
    let player = {
      id: item.id,
      name: item.name,
      position: item.position,
      nation: item.nation.name,
      team: item.club.name,
    };
    playerList.push(player);
  });
  insertMany(db, playerList);
};
