const ErrorHandler = require("../utils/ErrorHandler");

class Validation {
    /**
     * Validate payload data structure
     * @param {*} data 
     */
    static validatePayload (data) {
        //validate the rule and data properties of the payload
        this.verifyPayloadDataType(data)
        //validate required fields on the payload
        this.verifyRequiredFields(data)
    }

    /**
     * Verify that the rule property is an object
     * @param {*} data
     */
    static verifyPayloadDataType ({rule, data}) {
        this.validateRule(rule);
        this.validateData(data)
    }

    /**
     * Verify that required fields are passed
     * @param {*} data
     */
    static verifyRequiredFields ({rule}) {
        const fields = [
            "field",
            "condition",
            "condition_value"
        ]
        //verify that the rule object has all the required fields: field, condition and condition_value
        fields.forEach((field) => {
            if (!rule[field]) 
                throw new ErrorHandler(`${field} is required.`, 400)
        })
        return true;
    }

    /**
     * Validate the rule field to confirm it is of the correct data type
     * @param {*} data
     */
    static validateRule (data) {
        if(!(typeof data === "object") || Array.isArray(data) || data === null){
            throw new ErrorHandler(`rule should be an object.`, 400)
        }
        return true;
    }

    /**
     * Validate the data field to confirm it is of the correct data type
     * @param {*} data
     */
    static validateData (data) {
        if(
            (typeof data === "object" && data !== null) || 
            Array.isArray(data) ||
            typeof data === "string"
            ){
                return true;
            }
        
        throw new ErrorHandler(`data should be an object, array or string.`, 400)
    }

    /**
     * Perform the rule validation evaluation on the data
     * @param {*} data
     */
    static performEvaluation (data) {
        const field = this.checkIfFieldExists(data);
        if(!field){
            throw new ErrorHandler(`field ${data.rule.field} is missing from the data.`)
        }
        const result = this.evaluateRule(data, field)
        return {
            "validation": {
                "error": result ? false : true,
                "field": data.rule.field,
                "field_value": field,
                "condition": data.rule.condition,
                "condition_value": data.rule.condition_value
            }
        }
    }

    /**
     * Validate that the field to be evaluated exists
     * @param {*} data
     */
    static checkIfFieldExists ({data, rule}) {
        if(Number(rule.field)) return data[rule.field]

        const nestedFieldsArray = rule.field.split(".");
        if(nestedFieldsArray.length > 2) 
            throw new ErrorHandler("field should not be nested more than twice", 400)

        let result = data;
        for(let index = 0; index < nestedFieldsArray.length;index++){
            if(nestedFieldsArray[index] === ""){
                return result
            }
            result = result[nestedFieldsArray[index]]
        }
        return result === undefined ? false : result;
    }

    /**
     * Rule Evaluation
     * @param {*} data
     * @param {*} field
     */
    static evaluateRule ({data, rule}, field) {
        switch (rule.condition){
            case "eq": return ( field === rule.condition_value || field === Number(rule.condition_value) )
            case "neq": return ( field !== rule.condition_value && (parseInt(rule.condition_value) && field !== Number(rule.condition_value)) )
            case "gt": return field > rule.condition_value
            case "gte": return field >= rule.condition_value
            case "contains":  if(Array.isArray(field) || typeof field === "string"){
                    return field.includes(rule.condition_value)
                } else if (typeof field === "object") {
                    for(let prop in field){
                        if(field[prop] === rule.condition_value)
                            return true
                    }
                    return false
                }
            default: return false
        }
    }
}

module.exports = Validation;