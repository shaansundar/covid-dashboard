import {
  db,
  getCountryIndividualData,
  getData,
  updateDb,
} from "../../Data/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import DataCard from "../Dynamic/DataCard";
import { collection } from "firebase/firestore";
import React, { useEffect, useState, useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import CountrySelector, { chosenCountry } from "../Static/CountrySelector";
import ChartCard from "../Dynamic/ChartCard";

const defaultDataListState = atom({
  key: "defaultData",
  default: {},
});
export const defaultChartListState = atom({
  key: "chartData",
  default: [],
});
const dataListState = atom({
  key: "listData",
  default: [],
});

export default function Home() {
  const [getdefaultData, setDefaultData] = useRecoilState(defaultDataListState);
  const [getchartData, setchartData] = useRecoilState(defaultChartListState);
  const [getlistData, setListData] = useRecoilState(dataListState);
  const [Country, setChosenCountry] = useRecoilState(chosenCountry);
  const [value, loading, error] = useCollection(collection(db, "hooks"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    async function getCountry() {
      var x = getlistData.find((e) => e.Country === Country.label);
      if (x) {
        setDefaultData(x);
        let y = await getCountryIndividualData(Country.label);
        let z:any[] = [];
        y.forEach((e:any) => {
          z.push(e.Confirmed);
        });
        setchartData(z);
      } else {
        setDefaultData({
          TotalConfirmed: "N/A",
          TotalDeaths: "N/A",
          TotalRecovered: "N/A",
        });
      }
    }
    getCountry();
  }, [Country]);

  useEffect(() => {
    getArray();
    async function getArray() {
      await getAllData().catch(err=>alert(err));
    }
    async function getAllData() {
      await updateDb();
      await getData().then((x) => {
        for (let i = 0; i < x.length; i++) {
          if (x[i].CountryCode == undefined) {
            setDefaultData(x[i]);
          }
        }
        setListData(x);
      });
    }
  }, [value]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      {loading && <div>Loading...</div>}
      {!loading && value && (
        <div className="mx-8 w-full h-full max-w-7xl flex flex-col items-center justify-start">
          <div className="flex flex-col lg:flex-row w-full h-full lg:h-80 items-center justify-start lg:justify-between">
            <DataCard name="Confirmed" value={getdefaultData.TotalConfirmed} />
            <DataCard name="Death" value={getdefaultData.TotalDeaths} />
            <DataCard name="Recovered" value={getdefaultData.TotalRecovered} />
          </div>
          <div className="flex w-full mt-4 lg:mt-0 mb-4 items-center justify-center">
            <CountrySelector />
            {/* <button
              onClick={() => updateDb()}
              className="w-40 h-10 bg-blue-600 hover:bg-blue-800 text-white rounded-lg"
            >
              Update DB
            </button> */}
          </div>
          <div className="flex items-center origin-top scale-50 sm:scale-75 lg:scale-100 justify-center mx-2 mt-4 p-8 bg-white rounded-xl">
            <ChartCard className="" data={getchartData} />
          </div>
        </div>
      )}
    </div>
  );
}
