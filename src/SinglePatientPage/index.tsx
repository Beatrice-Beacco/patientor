import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { apiBaseUrl } from "../constants";

import { useStateValue, updatePatient } from "../state";

import { PatientWithEntries } from "../types";

export default function SinglePatientPage() {
  const [{ patients }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>(); ///////////////////

  const patientIsUpdated = (
    patientFromBackend: PatientWithEntries
  ): boolean => {
    return patients[id] === patientFromBackend;
  };

  //TODO: forse l'update della entry non compare al primo rendering
  useEffect(() => {
    const getSinglePatientData = async () => {
      try {
        const { data: patientFromBackend } =
          await axios.get<PatientWithEntries>(`${apiBaseUrl}/patients/${id}`);

        if (!patientIsUpdated(patientFromBackend)) {
          dispatch(updatePatient(patientFromBackend, id));
        }
      } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (axios.isAxiosError(error) && error.response) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          errorMessage += ` Error: ${error.response.data.message}`;
        }
        console.error(errorMessage);
      }
    };

    void getSinglePatientData();
  }, [dispatch]);

  if (!patients[id]) return <div>Loading...</div>;

  return (
    <div>
      <h1>
        {patients[id].name}
        {patients[id].gender == "male" ? (
          <i className="mars"></i>
        ) : (
          <i className="venus"></i>
        )}
      </h1>
      SSN: {patients[id].ssn}
      <br />
      Occupation {patients[id].occupation}
    </div>
  );
}
