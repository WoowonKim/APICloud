import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Select, {
  ActionMeta,
  components,
  InputActionMeta,
  MultiValue,
  NonceProvider,
  SingleValue,
} from "react-select";
import "./SelectMethods.scss";

interface MethodType {
  value: string;
  label: string;
}

const SelectMethods = () => {
  const [selected, setSelected] = useState<MultiValue<MethodType>>([
    {
      value: "GET",
      label: "GET",
    },
  ]);
  const methods = [
    {
      value: "GET",
      label: "GET",
    },
    {
      value: "POST",
      label: "POST",
    },
    {
      value: "PUT",
      label: "PUT",
    },
    {
      value: "DELETE",
      label: "DELETE",
    },
    {
      value: "PATCH",
      label: "PATCH",
    },
    {
      value: "OPTIONS",
      label: "OPTIONS",
    },
    {
      value: "HEAD",
      label: "HEAD",
    },
  ];
  const multiValue = "test";
  const handleOnChange = (
    newValue: MultiValue<MethodType>,
    actionMeta: ActionMeta<MethodType>
  ) => {
    setSelected(newValue);
  };

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      border: "none",
    }),
  };

  const DropdownIndicator = (props: any) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <></>
        </components.DropdownIndicator>
      )
    );
  };

  const ClearIndicator = (props: any) => {
    return (
      components.ClearIndicator && (
        <components.ClearIndicator {...props}>
          <></>
        </components.ClearIndicator>
      )
    );
  };

  const IndicatorsContainer = (props: any) => {
    return (
      components.IndicatorsContainer && (
        <components.IndicatorsContainer {...props}>
          <></>
        </components.IndicatorsContainer>
      )
    );
  };

  return (
    <Select
      isMulti
      value={selected}
      onChange={handleOnChange}
      options={methods}
      styles={customStyles}
      placeholder={""}
      components={{ DropdownIndicator, ClearIndicator, IndicatorsContainer }}
    />
  );
};

export default SelectMethods;
