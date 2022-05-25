import { firebaseConfig } from "./config";
import {
  collection,
  onSnapshot,
  query,
  where,
  getFirestore,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

initializeApp(firebaseConfig);
export const db = getFirestore();
export const collectionReference = collection(db, "Countries");
export async function getQuery() {
  const q = query(collectionReference, where("NewDeaths", ">=", 1));
  getDataQuery(q);
}

export async function updateDb() {
  let apiData: any = await fetch("https://api.covid19api.com/summary").then(
    (res) => res.json()
  );
  console.log("Updating DB");
  setDoc(doc(db, "Countries", "TOTAL"), apiData.Global).then(() => {});
  apiData.Countries.forEach((element: any) => {
    setDoc(doc(db, "Countries", element.CountryCode), element);
  });
  console.log("Completed Updating DB");
}

export async function getData() {
  let x;
  await getDocs(collectionReference).then((snapshot) => {
		x=snapshot.docs.map((doc:any)=>doc.data());
		// console.log(x);
  });
  return x;
}

export async function getCountryIndividualData(country : String){
  let apiData: any = await fetch("https://api.covid19api.com/dayone/country/"+ country).then(
    (res) => res.json()
  )
  .then((val)=>(val.slice(-6,-1)))
  return(apiData);
}

export async function getDataQuery(reference: any) {
  let data;
  onSnapshot(reference || collectionReference, (snapshot: any) => {
    data = snapshot.docs.map((doc: any) => {
      return doc.data();
    });
  });
  return data;
}
