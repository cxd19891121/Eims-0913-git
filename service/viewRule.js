var infoRule = 
{
    viewPrivateInfo: ["ssn","marital_status"],
    viewSalaryBenefit: ["salary","job_title","job_level","health_ins","regional_subsides","payrise_percentage","reimbursement"],
    viewVisaInfo: ["start_time","end_time","visa_type"],
    putData: function(arr,authObj)
    {
        for (let key in infoRule)
        {
            if (key != "putData" && !authObj[key])
            {
                arr = arr.concat(infoRule[key])
            }
        }
        return arr
    }
}

exports.rule = infoRule