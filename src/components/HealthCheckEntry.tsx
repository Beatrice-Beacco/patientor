import React from "react";
import { useStateValue } from "../state";

import { Card, Icon } from "semantic-ui-react";
import { HealthCheck, HealthCheckRating } from "../types";

const HealthCheckEntry = ({ data }: { data: HealthCheck }): JSX.Element => {
  const [{ diagnosis }] = useStateValue();

  const healthRatingHeart = (value: HealthCheckRating) => {
    switch (value) {
      case 0:
        return <Icon color="green" name="heart" />;
      case 1:
        return <Icon color="yellow" name="heart" />;
      case 2:
        return <Icon color="orange" name="heart" />;
      case 3:
        return <Icon color="red" name="heart" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header>
            {data.date}
            <Icon name="stethoscope" />
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
          {healthRatingHeart(data.healthCheckRating)}
        </Card.Content>
      </Card>
    </div>
  );
};

export default HealthCheckEntry;
