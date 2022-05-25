import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { atom, useRecoilState } from 'recoil';

export const chosenCountry = atom({
    key: "country",
    default: "",
  });

function CountrySelector() {
  const [value, setValue] = useRecoilState(chosenCountry);
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = (value: any) => {
    setValue(value)
  }

  return <Select className="w-80 mx-2" options={options} value={value} onChange={changeHandler} />
}

export default CountrySelector