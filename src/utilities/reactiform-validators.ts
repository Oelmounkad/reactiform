import { ReactiformValidatorParameters } from "../models/reactiform-validator-parameters.model";

const required = (field: any, reactiformValidatorParameters: ReactiformValidatorParameters ) => {
    const { formValues } = reactiformValidatorParameters;
    return !formValues.hasOwnProperty(field) || !formValues[field] ? {requiredError: true} : {requiredError: false};
}

const max = (field: any, reactiformValidatorParameters: ReactiformValidatorParameters ) => {
    const { formValues } = reactiformValidatorParameters;
    return formValues[field] ? {requiredError: true} : {requiredError: false};
}
const Validators = { required };
export default Validators;