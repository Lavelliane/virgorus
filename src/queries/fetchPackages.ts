import axios from "axios";

export async function fetchPackages(){
    const res = await axios.get('/api/package')
    return res.data
}