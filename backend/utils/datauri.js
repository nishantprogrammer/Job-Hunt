import datauriparser from 'datauri/parser.js'
import path from 'path'
const getdatauri = (file)=>
{
    const parser = new datauriparser()
    const extname = path.extname(file.originalname).toString();
    return parser.format(extname,file.buffer);
}
export default getdatauri;