import React from "react";
import { useStateValue } from "../state";

import { Card, Icon } from "semantic-ui-react";

import { OccupationalHealthcare } from "../types";

const OccupationalHealthcareEntry = ({
  data,
}: {
  data: OccupationalHealthcare;
}): JSX.Element => {
  const [{ diagnosis }] = useStateValue();

  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header>
            {data.date}
            <Icon name="user md" />
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
        <Card.Content extra>
          {data.sickLeave
            ? "Sick leave start: " +
              data.sickLeave?.startDate +
              "\n" +
              "Sick leave end: " +
              data.sickLeave?.endDate
            : "No sick leave information"}
        </Card.Content>
      </Card>
    </div>
  );
};

export default OccupationalHealthcareEntry;
