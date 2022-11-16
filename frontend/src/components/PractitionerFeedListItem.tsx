import React from 'react'

interface PractitionerFeedListItemParams { itemKey: string, resourceType: string, email: string, url: string }

const PractitionerFeedListItem: React.FC<PractitionerFeedListItemParams> = (props: PractitionerFeedListItemParams): JSX.Element => {
  return (
    <li key={props.itemKey} className="text-left mb-5 bg-amber-50 text-black p-3 rounded-2xl px-10 drop-shadow-md">
      <h1 className="text-xl font-bold">{props.resourceType}</h1>
      <a className="hover:text-amber-300 block text-blue-600" href={`mailto:${props.email}`}>{ props.email || ''}</a>
      <a className="hover:text-amber-300 block text-blue-600" href={props.url}>Website</a>
    </li>
  )
};

export default PractitionerFeedListItem;
