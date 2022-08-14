import { toast, ToastContainer } from 'react-toastify';
import logo from '../images/book.png';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { AppBar, IconButton, InputAdornment, TableContainer, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Search = () => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const toastSettings = {
    position: "bottom-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { color: "white", backgroundColor: "#333" }
  }

  const searchContent = async (q) => {
    q = q.trim();

    if (!q || q.length < 2) {
      toast.info('Please enter a search term with length greater than one character', toastSettings);
      return;
    }

    setLoading(true);

    toast.info('Kindly wait while we fetch the results!', toastSettings);


    // Make api call for this query q
    const response = await fetch(`https://search-that-file.herokuapp.com/search?q=${q}`);

    if (response.status === 200) {
      const data = await response.json();
      setResults(data);
    } else if (response.status === 400) {
      setResults([]);
      toast.error('Kindly enter a valid search term', toastSettings);
    } else if (response.status === 500) {
      setResults([]);
      toast.info('Server Error Occured. Please try again later!', toastSettings);
    } else {
      setResults([]);
      toast.info('Error Occured. Please try again later!', toastSettings);
    }

    setSearched(true);
    setLoading(false);
  }

  return (

    <div>

      {/* Navbar */}
      <div className="navbar">
        <AppBar style={{ backgroundColor: '#333' }}>
          <Toolbar>
            <img src={logo} alt="Search Master" style={{
              maxWidth: 40,
              padding: '10px',
              marginTop: '5px',
              marginLeft: '20px'
            }} />
            <Typography variant="h5" style={{
              flexGrow: 1,
              marginLeft: '20px'
            }} >
              Search Master
            </Typography>
          </Toolbar>
        </AppBar>
      </div>


      {/* Main Container */}
      <div className="main-container">

        {/* Center Logo section */}
        <div className="logo-master">
          <img src={logo} alt="Search Master" style={{
            maxWidth: 200,
            marginTop: '5px',
          }} />
        </div>

        {/* Tagline */}
        <h2 style={{ textAlign: 'center', color: '#444' }}>Search through all your dropbox files!</h2>

        {/* Search Bar */}
        <div className='search-bar'>
          <TextField
            id="outlined-basic"
            label="Enter a search term"
            required
            size="medium"
            style={{ width: "70vw" }}
            variant="outlined"
            onChange={(e) => { setQuery(e.target.value) }}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                ev.preventDefault();
                searchContent(query);
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Search'
                    color="primary"
                    component="label"
                    onClick={() => { searchContent(query) }}
                  >
                    <SearchOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>


        {/* Results */}
        <div className="results">
          {!loading ? (results.length ? (<TableContainer component={Paper}>
            <Table aria-label="simple table" color="red">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row) => (
                  <TableRow
                    key={row.link}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">
                      <a target="_blank" rel="noreferrer" href={row.link}>{row.link}</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>)
            : searched ? <h2 style={{ color: "#333" }}>No matching files found :(</h2> : null)
            : <h2 style={{ color: "#333" }}>⏳ Loading...</h2>}
        </div>

      </div>

      <ToastContainer />
    </div>

  );
}

export default Search;