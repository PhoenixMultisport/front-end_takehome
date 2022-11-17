import React, { useState } from 'react';
import {
  getLabelNameFromPractitionerResult,
  NormalizedPractitioner
} from '../utils/helpers';
import PractitionerFeedListItemEdit from './PractitionerFeedListItemEdit';
import { Button, Card, ListItemText } from '@mui/material';
import { faker } from '@faker-js/faker';

export interface HapiPractitionerEntryItemParams {
  practitioner: NormalizedPractitioner,
}

const PractitionerFeedListItem: React.FC<HapiPractitionerEntryItemParams> = ({ practitioner }: HapiPractitionerEntryItemParams): JSX.Element => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <li key={faker.datatype.uuid()}>
    <Card className="text-left mb-5 bg-white text-black p-3 rounded-2xl px-10 drop-shadow-md" key={faker.datatype.uuid()}>
      { !showEdit ?
        <>
          {Object.keys(practitioner).map((pi) => {
            return (
              <div className="flex justify-between mb-2" key={faker.datatype.uuid()}>
                <ListItemText>
                  {getLabelNameFromPractitionerResult(pi)}:
                </ListItemText>
                <p>
                  {practitioner[pi]}
                </p>
              </div>
            )
          })}
          <Button
            onClick={() => setShowEdit(true)}
          >
            Edit
          </Button>
        </> :
        <PractitionerFeedListItemEdit practitioner={practitioner} setShowEdit={() => setShowEdit(false)} />
      }
    </Card>
    </li>
  )
};

export default PractitionerFeedListItem;
