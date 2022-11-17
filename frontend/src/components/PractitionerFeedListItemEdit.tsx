import React, { useContext, useState } from "react";
import { getLabelNameFromPractitionerResult } from '../utils/helpers';
import { HapiPractitionerEntryItemParams } from './PractitionerFeedListItem';
import { HapiPractitionersResponse, HapiTelecomType } from '../types/Hapi.types';
import axios, { AxiosResponse } from 'axios';
import { HapiPractitionersFetchRequestUrl } from '../constants';
import { AppContext } from '../AppContext';
import { Button, Input, ListItemText } from '@mui/material';

interface PractitionerFeedListItemEdit extends HapiPractitionerEntryItemParams { setShowEdit: any }

const PractitionerFeedListItemEdit: React.FC<PractitionerFeedListItemEdit> = ({ practitioner, setShowEdit }: PractitionerFeedListItemEdit): JSX.Element => {
  const [input, setInput] = useState({
    firstName: practitioner.firstName,
    lastName: practitioner.lastName,
    phone: practitioner.phone,
    fax: practitioner.fax,
    email: practitioner.email,
    address: practitioner.address,
  })

  const appContext = useContext(AppContext);

  const payload = {
    resourceType: "Practitioner",
    id: practitioner.id,
    identifier: [
      {
        system: "http://fhir.de/NamingSystem/kbv/lanr",
        value: practitioner.id
      }
    ],
    name: [
      {
        use: "usual",
        family: input.lastName,
        given: input.firstName,
        prefix: ["Dr."]
      },
      {
        _family: {
          extension: [
            {
              url: "http://hl7.org/fhir/StructureDefinition/humanname-own-name",
              valueString: "Test 3"
            }
          ]
        }
      }
    ],
    telecom: [
      {
        system: HapiTelecomType.PHONE,
        value: input.phone
      },
      {
        system: HapiTelecomType.FAX,
        value: input.fax
      },
      {
        system: HapiTelecomType.EMAIL,
        value: input.email
      }
    ],
    address: [
      {
        text: input.address
      }
    ]
  }

  const submitInfo = () => {
    axios.put(`${HapiPractitionersFetchRequestUrl}/${practitioner.id}`, payload,{ headers: { 'Content-Type': 'application/fhir+json' }})
      .then((res: AxiosResponse<HapiPractitionersResponse>) => {
        appContext?.dispatch({
          type: 'update-practitioners',
          payload: res.data
        });
        setShowEdit();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
      <form>
        {
          Object.keys(practitioner).map((pk) => {
          return (
            <div className="flex justify-between mb-2">
              <label htmlFor="firstName">
              <ListItemText>
                {getLabelNameFromPractitionerResult(pk)}:
              </ListItemText>
              </label>
              <Input
                type="text"
                id={`${pk}Id`}
                name={`${pk}`}
                defaultValue={practitioner[pk]}
                onChange={(ev) => setInput({ ...input, [ev.target.name]: ev.target.value})}
              />
            </div>
          )
        })}
        <Button onClick={() => setShowEdit(false)}>Cancel</Button>
        <Button onClick={() => submitInfo()}>Submit</Button>
      </form>
  )
};

export default PractitionerFeedListItemEdit;
