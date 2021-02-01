import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    froot: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    fmain: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    vl :{
        borderLeft: '2px solid #b2bec3',
        height:' 200px',
        paddingLeft:'25px',
        margin:'10px'
      },
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    p:{
        textDecoration:'none'
    },
    link:{
        textDecoration:'none'
    },
    nolink:{
        
            listStyleType:' none',
            margin: 0,
            padding: 0,
          
    }
  }));
  
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.froot}>
      
      <footer className={classes.footer}>
      <Grid container spacing={3}>
        <Grid item xs={4}>

          <h4>Most Popular Category</h4>
          <ul className={classes.nolink}>
              <li >
              <a href="#"className={classes.link}>Top Category</a>
              </li>
              <li>
              <a href="#" className={classes.link}>Top Brands</a>
                            </li>
                            <li>
                            <a href="#"className={classes.link}>Top Products</a>          
                                </li>
                            <li>
                        <a href="#"className={classes.link}>New Deals</a>
              </li>
          </ul>
         
        </Grid>
        <Grid item xs={4}>
        <div className={classes.vl}>

        <h4>Customor Service</h4>
        <ul className={classes.nolink}>
             
              <li>
              <a href="#" className={classes.link}>About us</a>
                            </li>
                            <li>
                            <a href="#"className={classes.link}>Faq</a>          
                                </li>
                            <li>
                             <a href="#"className={classes.link}>Term and Condition</a>
              </li>
              <li>
                             <a href="#"className={classes.link}>Private policy</a>
              </li>
          </ul>
        
         </div>
        </Grid>

        <Grid item xs={4}>
        <div className={classes.vl}>
          <h4>Contact us</h4>
          <ul className={classes.nolink} style={{color:'#636e72'}}>
            <li>Phone No- 9039399964</li>
            <li>Email us- ashrath619@gmail.com</li>
            <li>Address- B-16 Police Radio Colony<br/> Kampoo,Lashkar Gwalior</li>

          </ul>

          </div>
        </Grid>
        </Grid>

        <Container maxWidth="lg">
          {/* <Typography variant="body1">My sticky footer can be found here.</Typography> */}
          <hr></hr>
          <div style={{textAlign: 'center'}}>

          <Copyright />
                  </div>

        </Container>
      </footer>
    </div>
  );
}