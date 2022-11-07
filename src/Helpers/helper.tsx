const assignFieldNameValue = (resource: any) => {
  if (
    resource &&
    resource.name &&
    resource.name[0].given[0]
  ) {
    return resource.name[0].given[0];
  }

  return "";
};

const assignFieldEmailValue = (resource: any) => {
 if (
    resource &&
    resource.telecom &&
    resource.telecom[0].value
  ) {
    return resource.telecom[0].value;
  }

  return "";
};

const assignFieldTelecomSystem = (resource: any) => {
  if (
     resource &&
     resource.telecom &&
     resource.telecom[0].system
   ) {
     return resource.telecom[0].system;
   }

   return "";
 };



//combine all on this obj
const helper = {
  assignFieldNameValue: assignFieldNameValue,
  assignFieldEmailValue: assignFieldEmailValue,
  assignFieldTelecomSystem: assignFieldTelecomSystem
};

export default helper;