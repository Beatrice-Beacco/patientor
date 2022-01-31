import React from "react";
import { useStateValue } from "../state";

import { Card, Icon } from "semantic-ui-react";
import { Hospital } from "../types";

const HospitalEntry = ({ data }: { data: Hospital }): JSX.Element => {
  const [{ diagnosis }] = useStateValue();

  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header>
            {data.date}
            <Icon name="hospital" />
          </Card.Header>
          <Card.Description>
            {data.description}
            <ul>
              {(data.diagnosisCodes || []).map((code: string) => (
                <li key={code}>
                  {code} {diagnosis[code].name}
                </li>
              ))}
            </ul>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>{`Discharge date: ${data.discharge.date}\n
        Reason: ${data.discharge.criteria} `}</Card.Content>
      </Card>
    </div>
  );
};

export default HospitalEntry;
