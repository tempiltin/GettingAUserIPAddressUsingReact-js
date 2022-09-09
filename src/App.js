import './App.css';
import { useState,useEffect} from 'react'
import axios from 'axios'
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




const App = ()=>{
  const notify = () => toast("IP manzilingiz aniqlanmoqda ...");
  const [ip, setIP] = useState('');
  const [counterCode, setCounterCode] = useState('');
  const [counterName, setCounterName] = useState('');
  const [iptrue, setIpTrue] = useState(false);
  const [ipData, setIpData] = useState({ip:"",code:"",countre:""})
  const onclick = () => {
    notify();
    setTimeout(() => {setIpTrue(true);setIpData({ip: ip,code: counterCode,countre: counterName,})}, 5500)
  }
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
    setCounterCode(res.data.country_code)
    setCounterName(res.data.country_name)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
          <div className="App" >
            <ToastContainer />
            <h1> Siz ip Addressingizni aniqlashni istaysizmi ? </h1> 
            <button className='btn btn-primary' onClick = {onclick} > IPni aniqlash </button>
            {
              iptrue ?
              <>
                 <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-sm-9">
                      <TableContainer component={Paper}>
                     <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                       <TableHead>
                         <TableRow>
                           <StyledTableCell>Davlat Nomi</StyledTableCell>
                           <StyledTableCell >Davlat Codi</StyledTableCell>
                           <StyledTableCell >IP</StyledTableCell>
                         </TableRow>
                       </TableHead>
                       <TableBody>
                       <StyledTableRow>
                             <StyledTableCell component="th" scope="row">
                             {ipData.countre}
                             </StyledTableCell>
                             <StyledTableCell >{ipData.code}</StyledTableCell>
                             <StyledTableCell >{ipData.ip}</StyledTableCell>

                           </StyledTableRow>
                       </TableBody>
                     </Table>
                   </TableContainer>
                      </div>
                    </div>
                 </div>
              </> 
              : ""
            }
          </div>
     )
}
export default App;