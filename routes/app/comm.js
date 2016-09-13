/**
 * Created by mooner00 on 8/24/2016.
 */
function forEach(object,func)
{
    for (var info in object)
    {
        if(!object.hasOwnProperty(info)) continue
        else func(info,object[info])
    }
}
function parseISO8601(data)
{
    if (!data) return data
    if (!data.toString().match(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i)) return data
    else
    {
        data = data.toString().substr(0,10)

        return data
    }
}